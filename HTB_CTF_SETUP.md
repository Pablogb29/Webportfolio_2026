# HTB CTF Automated Setup Guide

This guide explains how to set up automated fetching of solved Hack The Box machines.

## Overview

The CTF section automatically displays your solved HTB machines by:
1. Running a daily script that fetches data from the HTB API v4
2. Saving the data to `public/solved-machines.json`
3. The frontend consumes this JSON file (no direct API calls)

## Prerequisites

- Node.js 18+ (for native `fetch` support)
- A valid HTB API token

## Step 1: Set Up Environment Variable

Create or update `.env.local` in the project root:

```env
HTB_TOKEN=your_htb_api_token_here
```

**Important:** 
- No quotes around the token
- No spaces before or after the `=`
- The entire token should be on one line

## Step 2: Test the Script

Run the script manually to test:

```bash
npm run fetch-htb
```

Or directly:

```bash
node scripts/fetchSolvedMachines.js
```

The script will:
- Fetch all active machines from `/api/v4/machine/paginated`
- Fetch all retired machines from `/api/v4/machine/list/retired/paginated`
- Filter machines where both `authUserInUserOwns === true` AND `authUserInRootOwns === true`
- Extract only: `name`, `os`, and `difficultyText`
- Save to `public/solved-machines.json`

## Step 3: Set Up Daily Cron Job

### Option A: Linux/macOS Cron

Edit your crontab:

```bash
crontab -e
```

Add this line to run the script daily at 2 AM:

```cron
0 2 * * * cd /path/to/web_portfolio_dec25 && /usr/bin/node scripts/fetchSolvedMachines.js >> /tmp/htb-fetch.log 2>&1
```

**Important:** Replace `/path/to/web_portfolio_dec25` with your actual project path.

### Option B: Windows Task Scheduler

1. Open Task Scheduler
2. Create Basic Task
3. Set trigger: Daily at 2:00 AM
4. Set action: Start a program
5. Program: `node.exe`
6. Arguments: `scripts/fetchSolvedMachines.js`
7. Start in: `C:\Users\pablo\Documents\Code Projects\web_portfolio_dec25`
8. Check "Run whether user is logged on or not"

**Note:** For Windows, you may need to set the `HTB_TOKEN` environment variable in System Environment Variables, or create a batch file that loads `.env.local`:

Create `scripts/fetchSolvedMachines.bat`:

```batch
@echo off
cd /d "%~dp0\.."
for /f "tokens=1,* delims==" %%a in ('type .env.local ^| findstr /v "^#"') do set %%a=%%b
node scripts/fetchSolvedMachines.js
```

Then schedule the `.bat` file instead.

### Option C: GitHub Actions (for GitHub-hosted projects)

Create `.github/workflows/fetch-htb.yml`:

```yaml
name: Fetch HTB Machines

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
  workflow_dispatch:  # Allow manual trigger

jobs:
  fetch:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Fetch HTB Machines
        env:
          HTB_TOKEN: ${{ secrets.HTB_TOKEN }}
        run: |
          node scripts/fetchSolvedMachines.js
      - name: Commit and push
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add public/solved-machines.json
          git diff --staged --quiet || git commit -m "Update HTB machines [skip ci]"
          git push
```

Add `HTB_TOKEN` to your GitHub repository secrets.

## Step 4: Verify It Works

1. Run the script manually: `npm run fetch-htb`
2. Check that `public/solved-machines.json` was created
3. Visit `http://localhost:3000/ctf` to see your machines
4. Check the API endpoint: `http://localhost:3000/api/htb/ctf`

## Troubleshooting

### Script fails with "HTB_TOKEN not set"

- Ensure `.env.local` exists in the project root
- Verify the token is on one line with no quotes
- For cron jobs, ensure environment variables are loaded (see Option B for Windows)

### Script fails with authentication error

- Verify your HTB API token is valid and not expired
- Get a new token from: https://app.hackthebox.com/profile/settings
- Update `.env.local` with the new token

### No machines appear

- Check that you have machines solved (both user and root)
- Verify the script ran successfully
- Check `public/solved-machines.json` exists and has data
- Check browser console and server logs for errors

### Pagination issues

- The script fetches all pages automatically
- If you see warnings about unexpected response structure, the HTB API may have changed
- Check the script logs for details

## API Endpoints Used

- **Active machines:** `GET https://labs.hackthebox.com/api/v4/machine/paginated?page={page}`
- **Retired machines:** `GET https://labs.hackthebox.com/api/v4/machine/list/retired/paginated?page={page}`

## Data Format

The script generates `public/solved-machines.json`:

```json
{
  "lastUpdated": "2025-01-XX...",
  "total": 33,
  "machines": [
    {
      "name": "Machine Name",
      "os": "Linux",
      "difficulty": "Easy"
    }
  ]
}
```

## Security Notes

- **Never commit `.env.local`** - it contains your API token
- The token is only used server-side in the script
- The frontend never makes direct API calls to HTB
- The JSON file can be committed (it only contains public machine names)

## Manual Update

To manually update the machines data:

```bash
npm run fetch-htb
```

This is useful for testing or immediate updates without waiting for the cron job.

