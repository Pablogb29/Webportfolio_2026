# HTB API Token Issue - Summary

## Current Status

Based on the exploration results:

### Key Findings:

1. **MCP API Response**: `https://mcp.hackthebox.ai/v1/ctf/mcp/` returns:
   - Status: `401 Unauthorized`
   - Error: `"invalid_token"` - "Authentication failed. The provided bearer token is invalid, expired, or no longer recognized by the server."

2. **Regular API Responses**:
   - `app.hackthebox.com/api/v4` → Returns HTML (200 OK) - Authentication failing
   - `www.hackthebox.com/api/v4` → Returns JSON 404s - Endpoints don't exist

## The Problem

**Your token is invalid or expired.**

The MCP API clearly states: "The provided bearer token is invalid, expired, or no longer recognized by the server."

## Solution

### Step 1: Get a Valid Token

You need to get a **valid API token** from HTB. There are two types:

1. **Regular API Token** (for `www.hackthebox.com/api/v4`)
   - Go to: https://app.hackthebox.com/profile/settings
   - Look for "API Access" section
   - Generate/copy your API token

2. **MCP Token** (for `mcp.hackthebox.ai/v1/ctf/mcp/`)
   - Go to: https://app.hackthebox.com/profile/settings
   - Look for "MCP Access" section
   - Generate/copy your MCP token

### Step 2: Update `.env.local`

1. Open `.env.local` in VS Code (`Ctrl+P` → type `.env.local`)
2. Replace the token value:
   ```
   HTB_TOKEN=your_new_valid_token_here
   ```
3. Save the file

### Step 3: Restart Server

```bash
# Stop: Ctrl+C
# Start: npm run dev
```

### Step 4: Test

Visit: `http://localhost:3000/api/htb/postman-test`

This will test endpoints based on the official HTB API Postman documentation.

## Next Steps

Once you have a valid token:

1. The code will automatically try the correct endpoints
2. If it's an MCP token, we may need to adjust the base URL
3. If it's a regular API token, the current endpoints should work

## Reference

- HTB API Documentation: https://documenter.getpostman.com/view/13129365/TVeqbmeq
- The code has been updated to try endpoints from the official documentation

