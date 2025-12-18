# How to Update HTB Token in .env.local

## Quick Guide

### Step 1: Open the File

**In VS Code:**
1. Press `Ctrl+P` (or `Cmd+P` on Mac)
2. Type: `.env.local`
3. Press Enter

**Or manually:**
- File path: `C:\Users\pablo\Documents\Code Projects\web_portfolio_dec25\.env.local`
- You may need to enable "Show hidden files" in File Explorer

### Step 2: Edit the Token

The file should contain one line:
```
HTB_TOKEN=your_current_token_here
```

**To update:**
1. Replace everything after `HTB_TOKEN=` with your new token
2. Make sure there are NO spaces around the `=`
3. Make sure there are NO quotes around the token
4. Save the file (`Ctrl+S`)

### Step 3: Restart Server

**IMPORTANT:** After updating, you MUST restart your dev server:
1. Stop the server: Press `Ctrl+C` in the terminal
2. Start it again: Run `npm run dev`

## Example

**Before:**
```
HTB_TOKEN=old_token_here
```

**After:**
```
HTB_TOKEN=new_token_here
```

## Getting a New Token

1. Go to: https://app.hackthebox.com/profile/settings
2. Scroll to "API Access" section
3. Click "Generate New Token" or copy existing token
4. Copy the full token (it's very long, starts with `eyJ...`)
5. Paste it in `.env.local` after `HTB_TOKEN=`

## Verify It Works

After updating and restarting:
1. Visit: `http://localhost:3000/api/htb/test`
2. Should show `"success": true` if token is valid
3. Visit: `http://localhost:3000/api/htb/explore` to see which endpoints work

## Troubleshooting

- **File not found?** Make sure you're in the project root directory
- **Changes not working?** Restart the dev server!
- **Still getting errors?** Check that the token doesn't have extra spaces or quotes

