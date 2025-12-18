/**
 * Explore endpoint to discover working HTB API endpoints
 * Access at /api/htb/explore
 */

import { NextResponse } from "next/server";

const baseUrls = [
  "https://www.hackthebox.com/api/v4",  // Returns JSON 404s (API exists, endpoints wrong)
  "https://app.hackthebox.com/api/v4",  // Returns HTML (auth issue)
  "https://mcp.hackthebox.ai/v1/ctf/mcp",  // MCP API (newer?)
  "https://www.hackthebox.com/api/v5",
  "https://app.hackthebox.com/api/v5",
];

const endpoints = [
  // Common API patterns
  "/user/profile",
  "/user/info",
  "/user",
  "/profile",
  "/user/machines/owned",
  "/user/owns",
  "/machines",
  "/machines/list",
  "/profile/machines",
  "/profile/owns",
  // Alternative patterns
  "/api/user/profile",
  "/api/user/info",
  "/api/profile",
  "/api/machines",
  "/api/user/machines",
  "/api/user/owns",
  // HTB-specific patterns
  "/profile/machines/owned",
  "/user/profile/machines",
  "/user/profile/owns",
  "/machines/owned",
  "/machines/solved",
  // Try root endpoints
  "/",
  "/api",
];

export async function GET() {
  const token = process.env.HTB_TOKEN;
  
  if (!token) {
    return NextResponse.json({ error: "HTB_TOKEN not set" }, { status: 500 });
  }

  const results: any[] = [];

  for (const baseUrl of baseUrls) {
    for (const endpoint of endpoints) {
      const url = `${baseUrl}${endpoint}`;
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          redirect: "manual",
        });

        const contentType = response.headers.get("content-type") || "";
        const isJson = contentType.includes("application/json");
        
        let bodyPreview = "";
        if (isJson) {
          try {
            const json = await response.json();
            bodyPreview = JSON.stringify(json).substring(0, 300);
          } catch {
            bodyPreview = "Failed to parse JSON";
          }
        } else {
          const text = await response.text();
          bodyPreview = text.substring(0, 200);
        }

        results.push({
          baseUrl,
          endpoint,
          url,
          status: response.status,
          statusText: response.statusText,
          contentType,
          isJson,
          bodyPreview,
          success: isJson && response.status === 200,
        });
      } catch (error) {
        results.push({
          baseUrl,
          endpoint,
          url,
          error: error instanceof Error ? error.message : String(error),
          success: false,
        });
      }
    }
  }

  const successful = results.filter(r => r.success);
  const jsonResponses = results.filter(r => r.isJson);

  return NextResponse.json({
    summary: {
      totalTests: results.length,
      successful: successful.length,
      jsonResponses: jsonResponses.length,
    },
    successfulEndpoints: successful,
    allJsonResponses: jsonResponses,
    allResults: results,
  });
}

