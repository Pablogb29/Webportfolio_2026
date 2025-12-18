/**
 * Test endpoint based on HTB Postman API documentation
 * Tests common endpoint patterns from the official API docs
 */

import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.HTB_TOKEN;
  
  if (!token) {
    return NextResponse.json({ error: "HTB_TOKEN not set" }, { status: 500 });
  }

  // Based on HTB API Postman documentation: https://documenter.getpostman.com/view/13129365/TVeqbmeq
  const endpoints = [
    // User endpoints (most common)
    "/user/info",
    "/user/profile",
    "/user/profile/basic",
    "/user/profile/activity",
    
    // User machine endpoints (for solved machines)
    "/user/machines/owns",
    "/user/machines/owns/user",
    "/user/machines/owns/root",
    "/user/machines/owns/system",
    "/user/machines",
    
    // Machine endpoints (for machine details)
    "/machine/list",
    "/machine/list/retired",
    "/machine/list/active",
    "/machine/list/all",
    
    // Profile endpoints
    "/profile/activity",
    
    // Root endpoints
    "/",
  ];

  const baseUrl = "https://www.hackthebox.com/api/v4";
  const results: any[] = [];

  for (const endpoint of endpoints) {
    // Skip endpoints that require IDs for now
    if (endpoint.includes("{id}")) {
      continue;
    }

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
          bodyPreview = JSON.stringify(json).substring(0, 500);
        } catch {
          bodyPreview = "Failed to parse JSON";
        }
      } else {
        const text = await response.text();
        bodyPreview = text.substring(0, 200);
      }

      results.push({
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
        endpoint,
        url,
        error: error instanceof Error ? error.message : String(error),
        success: false,
      });
    }
  }

  const successful = results.filter(r => r.success);
  
  return NextResponse.json({
    summary: {
      totalTests: results.length,
      successful: successful.length,
    },
    successfulEndpoints: successful,
    allResults: results,
    note: "Based on HTB API Postman documentation patterns. Check successfulEndpoints for working endpoints.",
  });
}

