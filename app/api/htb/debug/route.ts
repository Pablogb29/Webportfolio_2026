/**
 * Debug endpoint to test HTB API connectivity
 * Access at /api/htb/debug
 */

import { NextResponse } from "next/server";

const baseUrls = [
  "https://app.hackthebox.com/api/v4",
  "https://www.hackthebox.com/api/v4",
  "https://app.hackthebox.com/api/v5",
  "https://www.hackthebox.com/api/v5",
];

const endpoints = [
  "/user/info",
  "/user/profile",
  "/user",
  "/profile",
  "/user/machines/owned",
  "/user/owns",
  "/machines",
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
            "Content-Type": "application/json",
            "User-Agent": "HTB-Portfolio/1.0",
          },
        });

        const contentType = response.headers.get("content-type") || "";
        const isJson = contentType.includes("application/json");
        
        let body = "";
        if (isJson) {
          body = await response.json().then(d => JSON.stringify(d).substring(0, 200)).catch(() => "");
        } else {
          body = await response.text().then(t => t.substring(0, 200)).catch(() => "");
        }

        results.push({
          baseUrl,
          endpoint,
          url,
          status: response.status,
          statusText: response.statusText,
          contentType,
          isJson,
          bodyPreview: body,
          success: response.ok,
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

  // Find successful endpoints
  const successful = results.filter(r => r.success);
  const jsonResponses = results.filter(r => r.isJson && r.status === 200);

  return NextResponse.json({
    summary: {
      totalTests: results.length,
      successful: successful.length,
      jsonResponses: jsonResponses.length,
    },
    successfulEndpoints: successful,
    jsonResponses,
    allResults: results,
  });
}

