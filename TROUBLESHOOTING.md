# CTF Section Troubleshooting Guide

## HTTP 500 Error - "Error loading machines"

If you're seeing a 500 error, follow these steps:

### Step 1: Check Environment Variable

1. Verify `.env.local` exists in the project root
2. Check that it contains:
   ```
   HTB_TOKEN=your_full_token_here
   ```
3. Make sure there are no quotes around the token value
4. Ensure there are no extra spaces

### Step 2: Check Server Console Logs

When you access `/ctf`, check the terminal where you ran `npm run dev`. You should see detailed logs like:

```
[HTB API] Initializing HTB client...
[HTB API] Fetching user profile...
[HTB Client] Fetching: /user/info (attempt 1)
[HTB Client] Response: /user/info - 200 OK
```

**Look for error messages** - they will tell you exactly what's wrong.

### Step 3: Common Error Messages

#### "HTB_TOKEN environment variable is not set"
- **Solution**: Create `.env.local` file with `HTB_TOKEN=your_token`
- **Note**: Restart the dev server after creating/updating `.env.local`

#### "HTB API authentication failed"
- **Solution**: Your token may be invalid or expired
- **Steps**:
  1. Go to https://app.hackthebox.com/profile/settings
  2. Regenerate your API token
  3. Update `.env.local` with the new token
  4. Restart the dev server

#### "HTB API error: 404 Not Found"
- **Solution**: The API endpoint might have changed
- **Check**: Look at the server logs to see which endpoint failed
- **Note**: The code tries multiple endpoint variations automatically

#### "Failed to fetch user profile"
- **Possible causes**:
  - Invalid token
  - Network connectivity issues
  - HTB API is down
- **Solution**: 
  1. Verify token is correct
  2. Check internet connection
  3. Try accessing HTB website directly

### Step 4: Verify Token Format

Your HTB token should:
- Start with `eyJ` (JWT format)
- Be very long (several hundred characters)
- Not have quotes around it in `.env.local`

Example (don't use this, get your own):
```
HTB_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoi...
```

### Step 5: Test API Directly

You can test if your token works by running this in your terminal (replace YOUR_TOKEN):

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" https://www.hackthebox.com/api/v4/user/info
```

If this returns your profile data, the token is valid. If it returns 401, the token is invalid.

### Step 6: Check HTB Subscription

- Ensure your HTB subscription is active
- Some API endpoints may require an active subscription
- Free accounts may have limited API access

### Step 7: Clear Cache

If you've been testing, the cache might have stale data:

1. Stop the dev server
2. Restart it (cache is in-memory, so restart clears it)
3. Try accessing `/ctf` again

### Step 8: Check Network/Firewall

- Ensure you can access `https://www.hackthebox.com`
- Check if any firewall/proxy is blocking API requests
- Try from a different network if possible

## Getting More Detailed Error Information

The error handling has been improved to show detailed messages. Check:

1. **Browser Console** (F12 → Console tab) - Shows the error message from the API
2. **Server Terminal** - Shows detailed logs with `[HTB API]` and `[HTB Client]` prefixes
3. **Network Tab** (F12 → Network tab) - Check the `/api/htb/ctf` request:
   - Status code
   - Response body (will show the error message)

## Still Having Issues?

If none of the above helps:

1. **Check the exact error message** in the server console
2. **Verify the HTB API is working** by testing with curl (see Step 5)
3. **Check HTB status** - The API might be temporarily down
4. **Try regenerating your token** - Tokens can expire

## Debug Mode

To see even more detailed logs, the code already logs:
- Each API endpoint being called
- Response status codes
- Response structures
- Any errors encountered

All logs are prefixed with `[HTB API]` or `[HTB Client]` for easy filtering.

