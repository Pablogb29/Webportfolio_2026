/**
 * Test endpoint to verify HTB token is configured correctly
 * Access at /api/htb/test
 */

import { NextResponse } from "next/server";
import HTBClient from "@/lib/htb-client";

export async function GET() {
  try {
    // Check if token exists
    const token = process.env.HTB_TOKEN;
    
    // Debug: Check all env vars that start with HTB
    const allEnvVars = Object.keys(process.env)
      .filter(key => key.includes('HTB') || key.includes('TOKEN'))
      .reduce((acc, key) => {
        acc[key] = process.env[key] ? `${process.env[key]?.substring(0, 20)}...` : 'undefined';
        return acc;
      }, {} as Record<string, string>);
    
    if (!token) {
      return NextResponse.json(
        {
          error: "HTB_TOKEN not found",
          message: "Please create .env.local file with HTB_TOKEN=your_token",
          hasToken: false,
          envVars: allEnvVars,
          nodeEnv: process.env.NODE_ENV,
          allKeys: Object.keys(process.env).filter(k => k.includes('HTB') || k.includes('TOKEN')),
        },
        { status: 500 }
      );
    }

    // Try to fetch user profile
    const client = new HTBClient({ token });
    
    try {
      const profile = await client.getUserProfile();
      
      return NextResponse.json({
        success: true,
        hasToken: true,
        tokenLength: token.length,
        tokenPrefix: token.substring(0, 20) + "...",
        profile: {
          id: profile.id,
          name: profile.name,
        },
        message: "Token is valid and working!",
      });
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          hasToken: true,
          tokenLength: token.length,
          tokenPrefix: token.substring(0, 20) + "...",
          error: error instanceof Error ? error.message : String(error),
          message: "Token exists but API call failed",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "Test failed",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

