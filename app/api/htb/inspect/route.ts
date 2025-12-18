/**
 * Inspect endpoint to see what HTML is being returned
 * Access at /api/htb/inspect
 */

import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.HTB_TOKEN;
  
  if (!token) {
    return NextResponse.json({ error: "HTB_TOKEN not set" }, { status: 500 });
  }

  const url = "https://app.hackthebox.com/api/v4/user/profile";
  
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "HTB-Portfolio/1.0",
      },
    });

    const contentType = response.headers.get("content-type") || "";
    const text = await response.text();
    
    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      contentType,
      headers: Object.fromEntries(response.headers.entries()),
      isJson: contentType.includes("application/json"),
      isHtml: text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html"),
      preview: text.substring(0, 1000),
      url,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
      url,
    }, { status: 500 });
  }
}

