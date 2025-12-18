# HTB API Status & Findings

## Current Situation

Based on the exploration results:

### `app.hackthebox.com/api/v4`
- **Status**: Returns `200 OK` but **HTML** instead of JSON
- **Meaning**: Authentication is failing - API doesn't recognize the token
- **Response**: HTB homepage HTML

### `www.hackthebox.com/api/v4`
- **Status**: Returns `404 Not Found` but **JSON** responses
- **Meaning**: API exists and responds properly, but endpoints don't exist
- **Response**: `{"message":""}` (JSON error)

## Possible Issues

1. **Token Type Mismatch**
   - You might have an **MCP token** instead of a regular API token
   - HTB now uses MCP (Model Context Protocol) for some APIs
   - MCP tokens use: `https://mcp.hackthebox.ai/v1/ctf/mcp/`

2. **Token Invalid/Expired**
   - Token might be expired or revoked
   - Need to regenerate from HTB settings

3. **API Structure Changed**
   - HTB may have deprecated v4 API
   - New endpoints might be different

## Next Steps

### Option 1: Check Token Type
1. Go to: https://app.hackthebox.com/profile/settings
2. Look for **"API Access"** section
3. Check if there's an **"MCP Access"** section
4. Verify which type of token you have

### Option 2: Try MCP API
If you have an MCP token, the API might be at:
- Base URL: `https://mcp.hackthebox.ai/v1/ctf/mcp/`
- Endpoints might be different

### Option 3: Manual Data Entry (Fallback)
If the API doesn't work, you can:
1. Manually enter your solved machines
2. Use static data instead of API
3. Update the data periodically

## Recommendation

**Most likely issue**: The token you have might be an MCP token, not a regular API token. Check your HTB settings to see what type of token you generated.

If it's an MCP token, we'll need to update the code to use the MCP API endpoints instead.

