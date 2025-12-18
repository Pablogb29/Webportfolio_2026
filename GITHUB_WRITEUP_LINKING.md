# GitHub Writeup Linking - Implementation Summary

## ✅ Completed Implementation

### Overview
The HTB solved machines fetcher now automatically links each solved machine to its writeup stored in the GitHub repository `https://github.com/Pablogb29/HackTheBox`.

### Features

1. **GitHub API Integration**
   - Fetches repository tree using GitHub REST API
   - Supports optional `GITHUB_TOKEN` environment variable for higher rate limits
   - Uses native `fetch` (Node.js 18+)
   - Handles errors gracefully (continues without writeups if GitHub API fails)

2. **Writeup Matching Logic**
   - **Priority Order:**
     1. `EASY/<MachineName>/README.md`
     2. `MEDIUM/<MachineName>/README.md`
     3. `HARD/<MachineName>/README.md`
     4. `EASY/<MachineName>.md`
     5. `MEDIUM/<MachineName>.md`
     6. `HARD/<MachineName>.md`
     7. `<MachineName>/README.md` (fallback)
   
   - **Name Normalization:** Machine names are normalized by:
     - Converting to lowercase
     - Removing spaces, hyphens, and underscores
   
   - **Priority Selection:** If multiple patterns match, the highest priority match is selected

3. **Data Structure**
   - Added `writeupUrl: string | null` to each machine
   - Added `hasWriteup: boolean` flag
   - Writeup URLs format: `https://github.com/Pablogb29/HackTheBox/blob/main/<path>`

4. **Frontend Integration**
   - **MachineCard Component:** Shows "View Writeup" button (purple) when `hasWriteup === true`
   - **MachineListItem Component:** Shows "View Writeup" link (purple) when `hasWriteup === true`
   - Both components maintain the existing "View on HTB" button/link

5. **Logging & Statistics**
   - Logs total solved machines
   - Logs writeups matched count
   - Logs unmatched machine names (for fixing naming issues)
   - Example output:
     ```
     Writeup Matching Summary:
       Total solved machines: 36
       Writeups matched: 33
       Unmatched: 3
     
     Unmatched machine names:
       - RedPanda
       - Support
       - ServMon
     ```

## 📊 Current Results

From the latest run:
- ✅ **33 out of 36 machines** have writeups matched
- ✅ Writeup URLs correctly formatted
- ✅ Frontend displays "View Writeup" buttons for matched machines

## 🔧 Configuration

### Environment Variables

**Optional (for higher rate limits):**
```bash
GITHUB_TOKEN=your_github_token_here
```

**Required:**
```bash
HTB_TOKEN=your_htb_token_here
```

### GitHub Token Setup (Optional)

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `public_repo` scope (or `repo` for private repos)
3. Add to `.env.local`:
   ```bash
   GITHUB_TOKEN=ghp_xxxxxxxxxxxx
   ```

**Note:** Without `GITHUB_TOKEN`, the script uses unauthenticated requests (60 requests/hour limit). With a token, you get 5,000 requests/hour.

## 📁 Files Modified

1. **`scripts/fetchSolvedMachines.js`**
   - Added `fetchGitHubRef()` - Fetches repository ref SHA
   - Added `fetchGitHubTree()` - Fetches recursive tree
   - Added `buildWriteupLookupMap()` - Builds writeup lookup map with priority
   - Added `findWriteupUrl()` - Finds writeup URL for a machine
   - Added `normalizeMachineName()` - Normalizes machine names for matching
   - Updated `extractMachineData()` - Includes writeup fields
   - Updated `main()` - Fetches GitHub tree and logs statistics

2. **`lib/types/htb.ts`**
   - Added `writeupUrl?: string | null` to `MachineSolved` interface
   - Added `hasWriteup?: boolean` to `MachineSolved` interface

3. **`app/api/htb/ctf/route.ts`**
   - Updated `transformMachines()` to include `writeupUrl` and `hasWriteup`

4. **`components/MachineCard.tsx`**
   - Added "View Writeup" button (purple) when `hasWriteup === true`

5. **`components/MachineListItem.tsx`**
   - Added "View Writeup" link (purple) when `hasWriteup === true`

## 🚀 Usage

### Run the Script:
```bash
npm run fetch-htb
```

### Output:
- JSON: `public/htb/solved-machines.json`
- API: `/api/htb/ctf`
- Frontend: `/ctf`

## 🐛 Troubleshooting

### Unmatched Machines

If machines show as unmatched, check:

1. **Name Normalization:** The script normalizes names by removing spaces, hyphens, and underscores. Make sure your GitHub folder/file names match:
   - HTB Machine: "Red Panda" → Normalized: "redpanda"
   - GitHub: Should be `EASY/RedPanda/README.md` or `EASY/RedPanda.md`

2. **Case Sensitivity:** GitHub paths are case-sensitive. Ensure the folder/file name matches exactly (after normalization).

3. **Pattern Matching:** Ensure your writeup follows one of the priority patterns:
   - `EASY/MachineName/README.md` (highest priority)
   - `MEDIUM/MachineName/README.md`
   - `HARD/MachineName/README.md`
   - `EASY/MachineName.md`
   - `MEDIUM/MachineName.md`
   - `HARD/MachineName.md`
   - `MachineName/README.md` (fallback)

### Rate Limiting

If you see rate limit errors:
- Add `GITHUB_TOKEN` to `.env.local`
- The script will automatically use it for higher rate limits

## ✨ Features

- ✅ Automatic writeup linking
- ✅ Priority-based pattern matching
- ✅ Name normalization for flexible matching
- ✅ Graceful error handling (continues if GitHub API fails)
- ✅ Frontend integration with "View Writeup" buttons
- ✅ Detailed logging and statistics
- ✅ Optional GitHub token support for higher rate limits

