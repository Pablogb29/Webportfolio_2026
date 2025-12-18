/**
 * HTB API Client
 * Server-side only utility for fetching data from Hack The Box API
 */

import type { HTBUserProfile, HTBMachineOwn, HTBMachineDetail } from "./types/htb";

// Try multiple base URLs as HTB API structure may vary
// Note: www.hackthebox.com returns JSON 404s (API exists), app.hackthebox.com returns HTML (auth issue)
const HTB_API_BASE_URLS = [
  "https://www.hackthebox.com/api/v4",  // Try www first - returns JSON responses
  "https://app.hackthebox.com/api/v4",
  "https://www.hackthebox.com/api/v5",
  "https://app.hackthebox.com/api/v5",
];

const HTB_API_BASE_URL = HTB_API_BASE_URLS[0]; // Default to first one
const DEFAULT_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

interface HTBClientConfig {
  token: string;
  timeout?: number;
  maxRetries?: number;
}

class HTBClient {
  private token: string;
  private timeout: number;
  private maxRetries: number;

  constructor(config: HTBClientConfig) {
    this.token = config.token;
    this.timeout = config.timeout || DEFAULT_TIMEOUT;
    this.maxRetries = config.maxRetries || MAX_RETRIES;
  }

  private async fetchWithRetry(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0,
    baseUrlIndex = 0
  ): Promise<Response> {
    const baseUrl = HTB_API_BASE_URLS[baseUrlIndex] || HTB_API_BASE_URL;
    const url = `${baseUrl}${endpoint}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      console.log(`[HTB Client] Fetching: ${baseUrl}${endpoint} (attempt ${retryCount + 1}, baseUrlIndex ${baseUrlIndex})`);
      
      const response = await fetch(url, {
        ...options,
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
          "User-Agent": "HTB-Portfolio/1.0",
          ...options.headers,
        },
        signal: controller.signal,
        redirect: "manual", // Don't follow redirects automatically
      });

      clearTimeout(timeoutId);

      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      
      console.log(`[HTB Client] Response: ${endpoint} - ${response.status} ${response.statusText}, Content-Type: ${contentType}`);

      // Check if response is HTML instead of JSON (authentication issue)
      if (!isJson && response.status === 200) {
        const text = await response.text().catch(() => "");
        if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
          console.error(`[HTB Client] Received HTML instead of JSON from ${endpoint}.`);
          console.error(`[HTB Client] This usually means: 1) Token is invalid/expired, 2) API endpoint doesn't exist, or 3) API structure has changed.`);
          throw new Error(`HTB API authentication failed - received HTML instead of JSON. Please verify your API token is valid and not expired. Visit https://app.hackthebox.com/profile/settings to regenerate your token.`);
        }
      }

      // Handle rate limiting (429)
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : RETRY_DELAY * (retryCount + 1);
        
        if (retryCount < this.maxRetries) {
          console.log(`[HTB Client] Rate limited, retrying after ${delay}ms`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          return this.fetchWithRetry(endpoint, options, retryCount + 1);
        }
        throw new Error("HTB API rate limit exceeded. Please try again later.");
      }

      // Handle authentication errors (401)
      if (response.status === 401) {
        const errorText = await response.text().catch(() => "");
        console.error(`[HTB Client] Authentication failed: ${errorText}`);
        throw new Error("HTB API authentication failed. Please check your token. The token may be invalid or expired.");
      }

      // Handle other errors
      if (!response.ok) {
        // If 404 and we haven't tried all base URLs, try next one
        if (response.status === 404 && baseUrlIndex < HTB_API_BASE_URLS.length - 1) {
          console.log(`[HTB Client] 404 with base URL ${baseUrlIndex}, trying next base URL...`);
          return this.fetchWithRetry(endpoint, options, retryCount, baseUrlIndex + 1);
        }
        
        const errorText = await response.text().catch(() => "Unknown error");
        console.error(`[HTB Client] API error ${response.status} from ${baseUrl}: ${errorText.substring(0, 200)}`);
        throw new Error(`HTB API error: ${response.status} ${response.statusText} - ${errorText.substring(0, 200)}`);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      
      // Retry on network errors
      if (
        (error instanceof Error && error.name === "AbortError") ||
        (error instanceof TypeError && error.message.includes("fetch"))
      ) {
        if (retryCount < this.maxRetries) {
          console.log(`[HTB Client] Network error, retrying (${retryCount + 1}/${this.maxRetries})`);
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY * (retryCount + 1)));
          return this.fetchWithRetry(endpoint, options, retryCount + 1);
        }
      }
      
      console.error(`[HTB Client] Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Fetch user profile information
   */
  async getUserProfile(): Promise<HTBUserProfile> {
    // Try multiple endpoint variations based on HTB API documentation
    // Based on Postman API docs: https://documenter.getpostman.com/view/13129365/TVeqbmeq
    const endpoints = [
      "/user/info",           // Most common HTB API endpoint
      "/user/profile",        // Alternative profile endpoint
      "/user/profile/basic",  // Basic profile info
      "/user",                // Root user endpoint
      "/profile",             // Generic profile
    ];
    
    for (const endpoint of endpoints) {
      try {
        console.log(`[HTB Client] Trying user profile endpoint: ${endpoint}`);
        const response = await this.fetchWithRetry(endpoint);
        
        // Check content type before parsing
        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await response.text().catch(() => "");
          if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
            console.warn(`[HTB Client] Received HTML from ${endpoint} - likely authentication/redirect issue`);
            // Check if it's a redirect or login page
            if (text.includes("login") || text.includes("sign in") || text.includes("redirect")) {
              console.error(`[HTB Client] Authentication may have failed - received login/redirect page`);
            }
          } else {
            console.warn(`[HTB Client] Non-JSON response from ${endpoint}: ${text.substring(0, 200)}`);
          }
          continue; // Try next endpoint
        }
        
        const data = await response.json();
        
        console.log(`[HTB Client] Response structure from ${endpoint}:`, Object.keys(data));
        
        // Handle different response structures
        if (data.info) {
          return data.info;
        }
        if (data.data) {
          return data.data;
        }
        if (data.profile) {
          return data.profile;
        }
        if (data.id) {
          // If data itself has an id, it's likely the profile
          return data as HTBUserProfile;
        }
        
        // If we got here, try the next endpoint
        console.warn(`[HTB Client] Unexpected structure from ${endpoint}, trying next...`);
      } catch (error) {
        console.error(`[HTB Client] Endpoint ${endpoint} failed:`, error instanceof Error ? error.message : String(error));
        // Try next endpoint if this one fails
        continue;
      }
    }
    
    throw new Error("Failed to fetch user profile from all attempted endpoints");
  }

  /**
   * Fetch list of machines owned/solved by the user
   */
  async getUserOwns(userId?: number): Promise<HTBMachineOwn[]> {
    // Try multiple endpoint variations based on HTB API documentation
    // Based on Postman API docs: https://documenter.getpostman.com/view/13129365/TVeqbmeq
    const endpoints = userId
      ? [
          `/user/machines/owns`,           // Standard endpoint
          `/user/machines/owns/user`,      // User owns
          `/user/machines/owns/root`,      // Root owns
          `/user/machines/owns/system`,    // System owns
          `/user/profile/${userId}/owns`,  // Profile-specific
          "/user/machines/owned",          // Alternative naming
          "/user/owns",                    // Short form
        ]
      : [
          "/user/machines/owns",           // Standard endpoint
          "/user/machines/owns/user",      // User owns
          "/user/machines/owned",          // Alternative naming
          "/user/owns",                    // Short form
        ];
    
    for (const endpoint of endpoints) {
      try {
        console.log(`[HTB Client] Trying endpoint: ${endpoint}`);
        const response = await this.fetchWithRetry(endpoint);
        
        // Check content type before parsing
        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await response.text().catch(() => "");
          if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
            console.warn(`[HTB Client] Received HTML from ${endpoint} - likely authentication/redirect issue`);
            // Check if it's a redirect or login page
            if (text.includes("login") || text.includes("sign in") || text.includes("redirect")) {
              console.error(`[HTB Client] Authentication may have failed - received login/redirect page`);
            }
          } else {
            console.warn(`[HTB Client] Non-JSON response from ${endpoint}: ${text.substring(0, 200)}`);
          }
          continue; // Try next endpoint
        }
        
        const data = await response.json();
        
        console.log(`[HTB Client] Response structure from ${endpoint}:`, Object.keys(data));
        
        // HTB API may return data in different formats
        if (Array.isArray(data)) {
          console.log(`[HTB Client] Found array with ${data.length} items`);
          return data;
        }
        if (data.profile && Array.isArray(data.profile.machines)) {
          console.log(`[HTB Client] Found machines in profile: ${data.profile.machines.length}`);
          return data.profile.machines;
        }
        if (data.machines && Array.isArray(data.machines)) {
          console.log(`[HTB Client] Found machines array: ${data.machines.length}`);
          return data.machines;
        }
        if (data.data && Array.isArray(data.data)) {
          console.log(`[HTB Client] Found data array: ${data.data.length}`);
          return data.data;
        }
        if (data.info && Array.isArray(data.info.machines)) {
          console.log(`[HTB Client] Found machines in info: ${data.info.machines.length}`);
          return data.info.machines;
        }
        
        // Log the structure for debugging
        console.warn(`[HTB Client] Unexpected response structure from ${endpoint}:`, JSON.stringify(data).substring(0, 500));
      } catch (error) {
        console.error(`[HTB Client] Endpoint ${endpoint} failed:`, error instanceof Error ? error.message : String(error));
        // Try next endpoint if this one fails
        continue;
      }
    }
    
    console.warn("[HTB Client] All endpoints failed, returning empty array");
    return [];
  }

  /**
   * Fetch detailed information about a specific machine
   */
  async getMachineDetails(machineId: number): Promise<HTBMachineDetail> {
    // Try multiple endpoint variations
    const endpoints = [
      `/machine/${machineId}`,
      `/machine/profile/${machineId}`,
      `/machines/${machineId}`,
    ];
    
    for (const endpoint of endpoints) {
      try {
        const response = await this.fetchWithRetry(endpoint);
        const data = await response.json();
        
        // Handle different response structures
        if (data.info) {
          return data.info;
        }
        if (data.machine) {
          return data.machine;
        }
        if (data.data) {
          return data.data;
        }
        return data;
      } catch (error) {
        // Try next endpoint if this one fails
        continue;
      }
    }
    
    throw new Error(`Failed to fetch machine ${machineId} details`);
  }

  /**
   * Fetch multiple machine details in parallel (with concurrency limit)
   */
  async getMultipleMachineDetails(
    machineIds: number[],
    concurrency = 5
  ): Promise<Map<number, HTBMachineDetail>> {
    const results = new Map<number, HTBMachineDetail>();
    
    // Process in batches to avoid overwhelming the API
    for (let i = 0; i < machineIds.length; i += concurrency) {
      const batch = machineIds.slice(i, i + concurrency);
      const promises = batch.map(async (id) => {
        try {
          const details = await this.getMachineDetails(id);
          return { id, details };
        } catch (error) {
          console.error(`Failed to fetch machine ${id}:`, error);
          return null;
        }
      });
      
      const batchResults = await Promise.all(promises);
      batchResults.forEach((result) => {
        if (result) {
          results.set(result.id, result.details);
        }
      });
      
      // Small delay between batches to be respectful
      if (i + concurrency < machineIds.length) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }
    
    return results;
  }
}

export default HTBClient;

