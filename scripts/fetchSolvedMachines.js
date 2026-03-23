/**
 * HTB Solved Machines Fetcher with Advanced Profile Enrichment
 * 
 * Fetches solved Hack The Box machines from the official HTB API v4,
 * enriches them with profile data (skills, tags, attack paths, difficulty ratings),
 * and saves them to a JSON file for consumption by the frontend.
 * 
 * This script should be run daily via cron job:
 * 0 2 * * * cd /path/to/project && node scripts/fetchSolvedMachines.js
 */

const { writeFileSync, mkdirSync, readFileSync, existsSync } = require("fs");
const { join, dirname, resolve } = require("path");
const pLimit = require("p-limit").default || require("p-limit");

// Load environment variables from .env.local if it exists
const envPath = join(__dirname, "..", ".env.local");
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...valueParts] = trimmed.split("=");
      if (key && valueParts.length > 0) {
        const value = valueParts.join("=").trim();
        process.env[key.trim()] = value;
      }
    }
  });
}

// Configuration
const HTB_API_BASE_URL = "https://labs.hackthebox.com/api/v4";
const HTB_API_BASE_URL_WWW = "https://www.hackthebox.com/api/v4"; // For tags endpoint
const GITHUB_API_BASE_URL = "https://api.github.com";
const GITHUB_REPO_OWNER = "Pablogb29";
const GITHUB_REPO_NAME = "HackTheBox";
const GITHUB_REPO_BRANCH = "main";
const PROJECT_ROOT = resolve(__dirname, "..");
const OUTPUT_DIR = join(PROJECT_ROOT, "public", "htb");
const OUTPUT_FILE = join(OUTPUT_DIR, "solved-machines.json");
const SKILLS_MAP_FILE = join(__dirname, "skills-map.json");
const REQUEST_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 500; // Start with 500ms
const CONCURRENCY_LIMIT = 4; // 3-5 parallel requests

// Load skills mapping
let skillsMap = {};
try {
  if (existsSync(SKILLS_MAP_FILE)) {
    const skillsMapContent = readFileSync(SKILLS_MAP_FILE, "utf8");
    skillsMap = JSON.parse(skillsMapContent);
    console.log(`Loaded skills mapping with ${Object.keys(skillsMap).length} tag mappings`);
  } else {
    console.warn(`Skills map file not found at ${SKILLS_MAP_FILE}, skills will be empty`);
  }
} catch (error) {
  console.warn(`Failed to load skills map: ${error.message}, skills will be empty`);
}

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch with timeout, retry logic, and exponential backoff
 */
async function fetchWithRetry(url, options, retryCount = 0) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle rate limiting (429)
    if (response.status === 429 && retryCount < MAX_RETRIES) {
      const retryAfter = response.headers.get("Retry-After");
      const delay = retryAfter 
        ? parseInt(retryAfter) * 1000 
        : INITIAL_RETRY_DELAY * Math.pow(2, retryCount); // Exponential backoff
      
      console.log(`  Rate limited, retrying after ${delay}ms... (attempt ${retryCount + 1}/${MAX_RETRIES})`);
      await sleep(delay);
      return fetchWithRetry(url, options, retryCount + 1);
    }

    // Handle server errors (5xx)
    if (response.status >= 500 && retryCount < MAX_RETRIES) {
      const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
      console.log(`  Server error ${response.status}, retrying after ${delay}ms... (attempt ${retryCount + 1}/${MAX_RETRIES})`);
      await sleep(delay);
      return fetchWithRetry(url, options, retryCount + 1);
    }

    // Handle authentication errors (401)
    if (response.status === 401) {
      throw new Error("HTB API authentication failed. Please check your API token.");
    }

    // Handle other errors
    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 200)}`);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    // Retry on network errors or abort errors
    if (
      (error instanceof Error && (error.name === "AbortError" || error.message.includes("fetch"))) &&
      retryCount < MAX_RETRIES
    ) {
      const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
      console.log(`  Network error, retrying after ${delay}ms... (attempt ${retryCount + 1}/${MAX_RETRIES})`);
      await sleep(delay);
      return fetchWithRetry(url, options, retryCount + 1);
    }

    throw error;
  }
}

/**
 * Fetch all pages from a paginated endpoint
 */
async function fetchAllPages(endpoint, token) {
  const allMachines = [];
  let page = 1;
  let hasMore = true;

  console.log(`Fetching from ${endpoint}...`);

  while (hasMore) {
    const url = `${HTB_API_BASE_URL}${endpoint}?page=${page}`;
    
    try {
      const response = await fetchWithRetry(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "HTB-Portfolio/1.0",
        },
      });

      const data = await response.json();

      // HTB API may return data in data.data or data.message
      // According to requirements: continue until data.message.length === 0
      const machines = data.data || data.message || [];
      
      if (!Array.isArray(machines)) {
        console.warn(`Unexpected response structure on page ${page}:`, Object.keys(data));
        break;
      }

      console.log(`  Page ${page}: ${machines.length} machines`);

      // Add machines to our collection
      allMachines.push(...machines);

      // Check if there are more pages
      // According to requirements: continue until data.message.length === 0
      const messageArray = data.message || data.data || [];
      if (messageArray.length === 0) {
        hasMore = false;
      } else {
        page++;
      }

      // Safety check to prevent infinite loops
      if (page > 1000) {
        console.warn("Reached maximum page limit (1000), stopping pagination");
        break;
      }

      // Small delay between requests to be respectful
      await sleep(200);
    } catch (error) {
      console.error(`Error fetching page ${page} from ${endpoint}:`, error.message);
      throw error;
    }
  }

  console.log(`  Total machines fetched: ${allMachines.length}`);
  return allMachines;
}

/**
 * Filter machines that are solved (both user and root owns)
 */
function filterSolvedMachines(machines) {
  return machines.filter((machine) => {
    // A machine is considered solved only if:
    // authUserInUserOwns === true && authUserInRootOwns === true
    const isUserOwned = machine.authUserInUserOwns === true;
    const isRootOwned = machine.authUserInRootOwns === true;
    
    return isUserOwned && isRootOwned;
  });
}

/**
 * Fetch machine profile with advanced information
 */
async function fetchMachineProfile(machineId, token) {
  try {
    const url = `${HTB_API_BASE_URL}/machine/profile/${machineId}`;
    const response = await fetchWithRetry(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "HTB-Portfolio/1.0",
      },
    });

    const data = await response.json();
    // HTB API may return data in different structures
    const profile = data.data || data.info || data.machine || data;
    
    return profile;
  } catch (error) {
    console.warn(`  Warning: Could not fetch profile for machine ID ${machineId}:`, error.message);
    return null;
  }
}

/**
 * Fetch machine tags from separate endpoint
 */
async function fetchMachineTags(machineId, token, debug = false) {
  // Try multiple endpoint variations
  const endpoints = [
    `${HTB_API_BASE_URL_WWW}/machine/tags/${machineId}`,
    `${HTB_API_BASE_URL}/machine/tags/${machineId}`,
    `${HTB_API_BASE_URL_WWW}/machines/${machineId}/tags`,
    `${HTB_API_BASE_URL}/machines/${machineId}/tags`,
  ];
  
  for (const url of endpoints) {
    try {
      const response = await fetchWithRetry(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "HTB-Portfolio/1.0",
        },
      });

      const data = await response.json();
      
      // Debug: Log structure for first machine
      if (debug && machineId) {
        console.log(`\n  [DEBUG] Machine ${machineId} tags from ${url}:`);
        console.log(`    Response keys:`, Object.keys(data || {}));
        console.log(`    Full response:`, JSON.stringify(data).substring(0, 800));
      }
      
      // If we got valid data, return it
      if (data && (data.groups || data.types || data.info || Array.isArray(data) || data.data || data.tags)) {
        return data;
      }
    } catch (error) {
      // Try next endpoint if this one fails
      if (error.message.includes("404")) {
        continue; // Try next endpoint
      }
      // For other errors, log and try next
      if (debug) {
        console.log(`    Endpoint ${url} failed: ${error.message}`);
      }
      continue;
    }
  }
  
  // If all endpoints failed, return null
  if (debug) {
    console.warn(`  Warning: Could not fetch tags for machine ID ${machineId} from any endpoint`);
  }
  return null;
}

/**
 * Parse and normalize tags from tags endpoint response
 */
function parseTagsResponse(tagsData) {
  if (!tagsData) {
    return {
      tags: [],
      attackPaths: [],
      tagGroups: {},
    };
  }

  let tags = [];
  let attackPaths = [];
  const tagGroups = {};

  // Handle different response structures
  // Structure 1: { groups: { "Attack Path": [...], "Sub": [...], ... } }
  if (tagsData.groups && typeof tagsData.groups === "object") {
    Object.entries(tagsData.groups).forEach(([groupName, groupTags]) => {
      if (Array.isArray(groupTags)) {
        const normalizedTags = groupTags.map((tag) => {
          if (typeof tag === "string") return tag;
          if (tag && typeof tag === "object") {
            return tag.name || tag.title || tag.label || String(tag);
          }
          return String(tag);
        }).filter(Boolean);

        tagGroups[groupName] = normalizedTags;
        
        // Extract attack paths from "Attack Path" group
        if (groupName.toLowerCase().includes("attack") || groupName.toLowerCase().includes("path")) {
          attackPaths = [...attackPaths, ...normalizedTags];
        }
        
        // Add all tags to main tags array
        tags = [...tags, ...normalizedTags];
      }
    });
  }
  // Structure 2: { types: { "Attack Path": [...], ... } }
  else if (tagsData.types && typeof tagsData.types === "object") {
    Object.entries(tagsData.types).forEach(([typeName, typeTags]) => {
      if (Array.isArray(typeTags)) {
        const normalizedTags = typeTags.map((tag) => {
          if (typeof tag === "string") return tag;
          if (tag && typeof tag === "object") {
            return tag.name || tag.title || tag.label || String(tag);
          }
          return String(tag);
        }).filter(Boolean);

        tagGroups[typeName] = normalizedTags;
        
        // Extract attack paths
        if (typeName.toLowerCase().includes("attack") || typeName.toLowerCase().includes("path")) {
          attackPaths = [...attackPaths, ...normalizedTags];
        }
        
        tags = [...tags, ...normalizedTags];
      }
    });
  }
  // Structure 3: Direct array
  else if (Array.isArray(tagsData)) {
    tags = tagsData.map((tag) => {
      if (typeof tag === "string") return tag;
      if (tag && typeof tag === "object") {
        return tag.name || tag.title || tag.label || String(tag);
      }
      return String(tag);
    }).filter(Boolean);
  }
  // Structure 4: { info: [{ name: "...", category: "..." }, ...] } - HTB API v4 format
  else if (tagsData.info && Array.isArray(tagsData.info)) {
    tagsData.info.forEach((tagObj) => {
      if (tagObj && typeof tagObj === "object") {
        const tagName = tagObj.name || tagObj.title || tagObj.label || String(tagObj);
        const category = tagObj.category || tagObj.type || "Other";
        
        if (tagName) {
          // Group by category
          if (!tagGroups[category]) {
            tagGroups[category] = [];
          }
          tagGroups[category].push(tagName);
          
          // Extract attack paths from "Attack Path" category
          if (category.toLowerCase().includes("attack") || category.toLowerCase().includes("path")) {
            attackPaths.push(tagName);
          }
          
          // Add to main tags array
          tags.push(tagName);
        }
      }
    });
  }
  // Structure 5: { data: [...] } or { tags: [...] }
  else if (tagsData.data && Array.isArray(tagsData.data)) {
    tags = tagsData.data.map((tag) => {
      if (typeof tag === "string") return tag;
      if (tag && typeof tag === "object") {
        return tag.name || tag.title || tag.label || String(tag);
      }
      return String(tag);
    }).filter(Boolean);
  }
  else if (tagsData.tags && Array.isArray(tagsData.tags)) {
    tags = tagsData.tags.map((tag) => {
      if (typeof tag === "string") return tag;
      if (tag && typeof tag === "object") {
        return tag.name || tag.title || tag.label || String(tag);
      }
      return String(tag);
    }).filter(Boolean);
  }

  // Remove duplicates
  tags = [...new Set(tags)];
  attackPaths = [...new Set(attackPaths)];

  return {
    tags,
    attackPaths,
    tagGroups,
  };
}

/**
 * Derive skills from tags using skills mapping
 */
function deriveSkillsFromTags(tags) {
  if (!Array.isArray(tags) || tags.length === 0) {
    return [];
  }

  const derivedSkills = new Set();
  
  tags.forEach((tag) => {
    // Check if tag exists in mapping (case-insensitive, partial match)
    const tagLower = tag.toLowerCase();
    
    // Exact match first
    Object.entries(skillsMap).forEach(([mappedTag, skills]) => {
      const mappedTagLower = mappedTag.toLowerCase();
      if (mappedTagLower === tagLower) {
        skills.forEach((skill) => derivedSkills.add(skill));
      }
      // Partial match - check if tag contains mapped tag or vice versa
      else if (tagLower.includes(mappedTagLower) || mappedTagLower.includes(tagLower)) {
        skills.forEach((skill) => derivedSkills.add(skill));
      }
    });
    
    // Also check if tag itself contains keywords that map to skills
    if (tagLower.includes("sql") || tagLower.includes("injection")) {
      derivedSkills.add("Web Exploitation");
    }
    if (tagLower.includes("kerberos") || tagLower.includes("active directory") || tagLower.includes("ad")) {
      derivedSkills.add("Active Directory");
    }
    if (tagLower.includes("suid") || tagLower.includes("linux") || tagLower.includes("privilege")) {
      derivedSkills.add("Linux PrivEsc");
    }
    if (tagLower.includes("windows") && tagLower.includes("privilege")) {
      derivedSkills.add("Windows PrivEsc");
    }
    if (tagLower.includes("network") || tagLower.includes("smb") || tagLower.includes("ftp")) {
      derivedSkills.add("Network");
    }
    if (tagLower.includes("crypto") || tagLower.includes("encryption") || tagLower.includes("hash")) {
      derivedSkills.add("Crypto");
    }
    if (tagLower.includes("forensics") || tagLower.includes("log") || tagLower.includes("memory")) {
      derivedSkills.add("Forensics");
    }
    if (tagLower.includes("reverse") || tagLower.includes("binary") || tagLower.includes("ghidra")) {
      derivedSkills.add("Reverse Engineering");
    }
    if (tagLower.includes("buffer") || tagLower.includes("overflow") || tagLower.includes("rop")) {
      derivedSkills.add("Exploit Development");
    }
    if (tagLower.includes("web") || tagLower.includes("xss") || tagLower.includes("ssrf")) {
      derivedSkills.add("Web Exploitation");
    }
  });

  return Array.from(derivedSkills).sort();
}

/**
 * Extract difficulty ratings from profile
 */
function extractDifficultyRatings(profile) {
  if (!profile) {
    return null;
  }

  // Check various possible locations for difficulty ratings
  if (profile.feedbackForChart) {
    return profile.feedbackForChart;
  }
  if (profile.difficulty_ratings) {
    return profile.difficulty_ratings;
  }
  if (profile.difficultyCharts) {
    return profile.difficultyCharts;
  }
  if (profile.difficulty_charts) {
    return profile.difficulty_charts;
  }

  return null;
}

/**
 * Normalize machine name for matching (lowercase, remove spaces, -, _)
 */
function normalizeMachineName(name) {
  if (!name) return "";
  return name.toLowerCase().replace(/[\s\-_]/g, "");
}

/**
 * Fetch GitHub repo ref (to get latest commit SHA)
 */
async function fetchGitHubRef(token = null) {
  const url = `${GITHUB_API_BASE_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/git/ref/heads/${GITHUB_REPO_BRANCH}`;
  
  const headers = {
    "Accept": "application/vnd.github.v3+json",
  };
  
  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  try {
    const response = await fetchWithRetry(url, { headers });
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.object.sha;
  } catch (error) {
    console.error(`Failed to fetch GitHub ref: ${error.message}`);
    throw error;
  }
}

/**
 * Fetch GitHub repo tree recursively
 */
async function fetchGitHubTree(sha, token = null) {
  const url = `${GITHUB_API_BASE_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/git/trees/${sha}?recursive=1`;
  
  const headers = {
    "Accept": "application/vnd.github.v3+json",
  };
  
  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  try {
    const response = await fetchWithRetry(url, { headers });
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.tree || [];
  } catch (error) {
    console.error(`Failed to fetch GitHub tree: ${error.message}`);
    throw error;
  }
}

/**
 * Build writeup lookup map from GitHub tree
 * Stores all matching patterns, then findWriteupUrl will prioritize correctly
 */
function buildWriteupLookupMap(tree) {
  const lookupMap = new Map(); // normalizedName -> { path, priority }
  
  if (!Array.isArray(tree)) {
    return lookupMap;
  }

  // Process each file in the tree
  tree.forEach((item) => {
    if (item.type !== "blob" || !item.path) {
      return;
    }

    const path = item.path;
    const pathLower = path.toLowerCase();
    
    let normalizedName = null;
    let priority = 999; // Lower = higher priority
    
    // Priority 1-3: DIFFICULTY/<MachineName>/README.md
    const difficultyReadmePattern = /^(easy|medium|hard|insane)\/([^/]+)\/readme\.md$/i;
    const difficultyReadmeMatch = path.match(difficultyReadmePattern);
    if (difficultyReadmeMatch) {
      const difficulty = difficultyReadmeMatch[1].toUpperCase();
      const machineName = difficultyReadmeMatch[2];
      normalizedName = normalizeMachineName(machineName);
      // Priority: EASY=1, MEDIUM=2, HARD=3, INSANE=4
      const priorityMap = { EASY: 1, MEDIUM: 2, HARD: 3, INSANE: 4 };
      priority = priorityMap[difficulty] || 5;
    }
    
    // Priority 4-6: DIFFICULTY/<MachineName>.md
    if (!normalizedName) {
      const difficultyMdPattern = /^(easy|medium|hard|insane)\/([^/]+)\.md$/i;
      const difficultyMdMatch = path.match(difficultyMdPattern);
      if (difficultyMdMatch) {
        const difficulty = difficultyMdMatch[1].toUpperCase();
        const machineName = difficultyMdMatch[2];
        normalizedName = normalizeMachineName(machineName);
        const priorityMap = { EASY: 4, MEDIUM: 5, HARD: 6, INSANE: 7 };
        priority = priorityMap[difficulty] || 8;
      }
    }
    
    // Priority 7: <MachineName>/README.md (fallback)
    if (!normalizedName && pathLower.endsWith("/readme.md")) {
      const parts = path.split("/");
      if (parts.length === 2) {
        normalizedName = normalizeMachineName(parts[0]);
        priority = 7;
      }
    }
    
    // Store in map (keep highest priority match)
    if (normalizedName) {
      const existing = lookupMap.get(normalizedName);
      if (!existing || priority < existing.priority) {
        lookupMap.set(normalizedName, { path, priority });
      }
    }
  });

  return lookupMap;
}

/**
 * Find writeup URL for a machine
 */
function findWriteupUrl(machineName, difficulty, writeupLookupMap) {
  if (!writeupLookupMap || writeupLookupMap.size === 0) {
    return null;
  }

  const normalizedName = normalizeMachineName(machineName);
  const writeupEntry = writeupLookupMap.get(normalizedName);
  
  if (writeupEntry && writeupEntry.path) {
    return `https://github.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/blob/${GITHUB_REPO_BRANCH}/${writeupEntry.path}`;
  }

  return null;
}

/**
 * Extract required fields from machine data
 */
function extractMachineData(machine, profileData = null, tagsData = null, writeupLookupMap = null) {
  // Parse tags from tags endpoint
  const { tags, attackPaths, tagGroups } = parseTagsResponse(tagsData);
  
  // Derive skills from tags
  const skills = deriveSkillsFromTags(tags);
  
  // Extract difficulty ratings from profile
  const difficultyRatings = extractDifficultyRatings(profileData);
  
  // Get solve date if available (from user owns data)
  let solveDate = null;
  if (machine.user_owns_date) {
    solveDate = machine.user_owns_date;
  } else if (machine.root_owns_date) {
    solveDate = machine.root_owns_date;
  } else if (machine.date) {
    solveDate = machine.date;
  }

  // Format solve date to YYYY-MM-DD
  if (solveDate) {
    try {
      const date = new Date(solveDate);
      solveDate = date.toISOString().split("T")[0];
    } catch (e) {
      solveDate = null;
    }
  }

  // Find writeup URL
  const machineDifficulty = machine.difficultyText || machine.difficulty || "Easy";
  const writeupUrl = findWriteupUrl(machine.name, machineDifficulty, writeupLookupMap);
  const hasWriteup = writeupUrl !== null;

  return {
    id: machine.id,
    name: machine.name || "Unknown",
    os: machine.os || "Other",
    difficulty: machineDifficulty,
    solveDate: solveDate,
    htbUrl: `https://app.hackthebox.com/machines/${machine.id}`,
    tags: tags,
    attackPaths: attackPaths,
    skills: skills,
    difficultyRatings: difficultyRatings,
    writeupUrl: writeupUrl,
    hasWriteup: hasWriteup,
  };
}

/**
 * Main function
 */
async function main() {
  console.log("=".repeat(60));
  console.log("HTB Solved Machines Fetcher with Profile Enrichment");
  console.log("=".repeat(60));

  // Get token from environment
  const token = process.env.HTB_TOKEN;
  if (!token) {
    console.error("ERROR: HTB_TOKEN environment variable is not set");
    console.error("Please set HTB_TOKEN in your environment or .env.local file");
    process.exit(1);
  }

  try {
    // Fetch active machines
    console.log("\n[1/3] Fetching active machines...");
    const activeMachines = await fetchAllPages("/machine/paginated", token);

    // Fetch retired machines
    console.log("\n[2/3] Fetching retired machines...");
    const retiredMachines = await fetchAllPages("/machine/list/retired/paginated", token);

    // Combine all machines
    const allMachines = [...activeMachines, ...retiredMachines];
    console.log(`\nTotal machines fetched: ${allMachines.length}`);

    // Filter solved machines
    console.log("\nFiltering solved machines...");
    const solvedMachines = filterSolvedMachines(allMachines);
    console.log(`Solved machines found: ${solvedMachines.length}`);

    if (solvedMachines.length === 0) {
      console.log("\nNo solved machines found. Exiting.");
      process.exit(0);
    }

    // Fetch machine profiles and tags with concurrency control
    console.log(`\n[3/4] Fetching machine profiles (concurrency: ${CONCURRENCY_LIMIT})...`);
    const limit = pLimit(CONCURRENCY_LIMIT);
    const machineIds = solvedMachines.map((m) => m.id);
    
    // Fetch profiles
    const profilePromises = machineIds.map((id, index) =>
      limit(async () => {
        const profile = await fetchMachineProfile(id, token);
        if ((index + 1) % 10 === 0) {
          console.log(`  Progress: ${index + 1}/${machineIds.length} profiles fetched`);
        }
        return { id, profile };
      })
    );

    const profileResults = await Promise.all(profilePromises);
    const profileMap = new Map();
    profileResults.forEach(({ id, profile }) => {
      if (profile) {
        profileMap.set(id, profile);
      }
    });

    console.log(`  Fetched ${profileMap.size} profiles successfully`);

    // Fetch tags
    console.log(`\n[4/4] Fetching machine tags (concurrency: ${CONCURRENCY_LIMIT})...`);
    let tagsSchemaLogged = false;
    const tagsPromises = machineIds.map((id, index) =>
      limit(async () => {
        const debug = index === 0 && !tagsSchemaLogged; // Log first response structure
        const tagsData = await fetchMachineTags(id, token, debug);
        
        // Log schema once if we haven't seen it
        if (debug && tagsData && !tagsSchemaLogged) {
          console.log(`\n  [TAGS SCHEMA] First tags response structure logged above`);
          tagsSchemaLogged = true;
        }
        
        if ((index + 1) % 10 === 0) {
          console.log(`  Progress: ${index + 1}/${machineIds.length} tags fetched`);
        }
        return { id, tags: tagsData };
      })
    );

    const tagsResults = await Promise.all(tagsPromises);
    const tagsMap = new Map();
    tagsResults.forEach(({ id, tags }) => {
      if (tags) {
        tagsMap.set(id, tags);
      }
    });

    console.log(`  Fetched ${tagsMap.size} tag sets successfully`);

    // Fetch GitHub writeup index
    console.log(`\n[5/5] Fetching GitHub writeup index...`);
    let writeupLookupMap = new Map();
    try {
      const githubToken = process.env.GITHUB_TOKEN || null;
      if (githubToken) {
        console.log("  Using GITHUB_TOKEN for higher rate limits");
      } else {
        console.log("  No GITHUB_TOKEN found, using unauthenticated requests (lower rate limits)");
      }
      
      const refSha = await fetchGitHubRef(githubToken);
      console.log(`  Fetched ref SHA: ${refSha.substring(0, 7)}...`);
      
      const tree = await fetchGitHubTree(refSha, githubToken);
      console.log(`  Fetched tree with ${tree.length} items`);
      
      // Build lookup map (matches all patterns, prioritizes correctly)
      writeupLookupMap = buildWriteupLookupMap(tree);
      console.log(`  Built writeup lookup map with ${writeupLookupMap.size} entries`);
    } catch (error) {
      console.warn(`  WARNING: Failed to fetch GitHub writeups: ${error.message}`);
      console.warn(`  Continuing without writeup linking...`);
      writeupLookupMap = new Map();
    }

    // Extract required fields
    console.log("\nExtracting machine data...");
    const extractedMachines = solvedMachines.map((machine) => {
      const profile = profileMap.get(machine.id);
      const tags = tagsMap.get(machine.id);
      return extractMachineData(machine, profile, tags, writeupLookupMap);
    });

    // Prepare output data
    const outputData = {
      lastUpdated: new Date().toISOString(),
      total: extractedMachines.length,
      machines: extractedMachines,
    };

    // Ensure output directory exists
    try {
      mkdirSync(OUTPUT_DIR, { recursive: true });
    } catch (error) {
      if (error.code !== "EEXIST") {
        throw error;
      }
    }

    // Write to file
    console.log(`\nWriting to ${OUTPUT_FILE}...`);
    writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2), "utf8");

    // Log writeup matching summary
    const writeupsMatched = extractedMachines.filter((m) => m.hasWriteup).length;
    const unmatchedMachines = extractedMachines
      .filter((m) => !m.hasWriteup)
      .map((m) => m.name)
      .sort();

    console.log("\n" + "=".repeat(60));
    console.log("SUCCESS!");
    console.log(`Saved ${extractedMachines.length} solved machines to ${OUTPUT_FILE}`);
    console.log("=".repeat(60));
    console.log("\nWriteup Matching Summary:");
    console.log(`  Total solved machines: ${extractedMachines.length}`);
    console.log(`  Writeups matched: ${writeupsMatched}`);
    console.log(`  Unmatched: ${extractedMachines.length - writeupsMatched}`);
    if (unmatchedMachines.length > 0 && unmatchedMachines.length <= 20) {
      console.log(`\nUnmatched machine names:`);
      unmatchedMachines.forEach((name) => console.log(`  - ${name}`));
    } else if (unmatchedMachines.length > 20) {
      console.log(`\nUnmatched machine names (first 20):`);
      unmatchedMachines.slice(0, 20).forEach((name) => console.log(`  - ${name}`));
      console.log(`  ... and ${unmatchedMachines.length - 20} more`);
    }
    console.log("=".repeat(60));
  } catch (error) {
    console.error("\n" + "=".repeat(60));
    console.error("ERROR:", error.message);
    console.error("=".repeat(60));
    if (error.stack) {
      console.error("\nStack trace:", error.stack);
    }
    process.exit(1);
  }
}

// Run the script
main();
