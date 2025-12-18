# HTB API Authentication Issue

## Problem
The HTB API is returning HTML pages instead of JSON responses, which indicates authentication is failing.

## Symptoms
- All API endpoints return `200 OK` status
- Content-Type is `text/html; charset=utf-8` instead of `application/json`
- Response body contains HTML (HTB homepage) instead of JSON data

## Root Cause
This typically means:
1. **Token is invalid or expired** - Most common cause
2. **API endpoints have changed** - HTB may have updated their API structure
3. **Token doesn't have required permissions** - Token might be valid but lacks necessary scopes

## Solution Steps

### Step 1: Verify Token is Valid
1. Go to https://app.hackthebox.com/profile/settings
2. Navigate to the API section
3. Check if your current token is still active
4. If expired or invalid, generate a new token

### Step 2: Test Token Manually
Use curl to test if the token works:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
     -H "Accept: application/json" \
     https://app.hackthebox.com/api/v4/user/profile
```

If this returns HTML, the token is invalid.

### Step 3: Check HTB API Documentation
HTB's API structure may have changed. Check:
- Official HTB API documentation
- HTB community forums for API updates
- GitHub repositories with HTB API examples

### Step 4: Alternative Approaches
If the official API doesn't work, consider:
1. **Web scraping** (with permission/terms compliance)
2. **HTB's public profile pages** (if they expose machine data)
3. **Manual data entry** (less ideal but reliable)

## Current Status
The code is correctly configured to:
- Use `Bearer` token authentication
- Send proper `Accept: application/json` headers
- Handle errors gracefully
- Try multiple endpoint variations

The issue is with the token or API availability, not the code implementation.

## Next Steps
1. Regenerate your HTB API token
2. Update `.env.local` with the new token
3. Restart the dev server
4. Test again

If the issue persists after regenerating the token, HTB's API structure may have changed and we'll need to find the correct endpoints.

