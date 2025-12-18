# Quick Setup Guide - Fix HTTP 500 Error

## The Problem
Your `.env.local` file is missing, which is why you're getting the HTTP 500 error.

## Solution - Create .env.local File

### Step 1: Create the file
Create a new file named `.env.local` in the root of your project (same folder as `package.json`).

**Location:** `c:\Users\pablo\Documents\Code Projects\web_portfolio_dec25\.env.local`

### Step 2: Add your HTB token
Open `.env.local` and add this line (replace with your actual token):

```
HTB_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiZGI3OWQyOWRiN2Q3MWYyNjFiNzE4YWE5YWQ5Njg3NzdjYTI1ZWE5NDVmNDQ0ZTFjZjI4OWVlZTM3OWMxMTEwMTc2ZDA2OTk1MTMxN2ZmZmYiLCJpYXQiOjE3NjU5NTY2NzYuNDA1MjI1LCJuYmYiOjE3NjU5NTY2NzYuNDA1MjI3LCJleHAiOjE3OTc0OTI2NzYuMzk2NzQsInN1YiI6IjY1MzI4MSIsInNjb3BlcyI6W119.wfrdIPc56qpDtVo45Kbj87GdQg7k0CC6wcNdHfMadxbSg0zNGLjV0c9tmPAmk8LwzkGC10GEHtxQ3U2uOWTh0nVfiIsH3zYXPa3o59cmGcn2fKOupjoMIB3oAzzBbTlxG5zk0ua8loODmjZCRRVgjPOD9eFTm5zjAq-oTyiKM838aH1rtPjxQQ8wyZxpjsLyIkJJWOKiHc_ICNBDJjuUitpQDerp9kplBGfe2nI2RZHaqvfjLKHaymrZi4dohIVhsRwtw_-AkA-y1Oyn_70Psnq0jlloQscricCU8FD7R494EDrDchfMOAslbRX9DyZH1mPQy6ZqVNARajoQZE8WZRFWT6hmxRVuCM_wU2melg4KUyZlawyy3s_vUkNrajn_Dg1TyaXEuq8oKMJzfyseTCQAE4h9UzueWju4da-SGcdEBi4Kk1SskGtUO_rUxo-NUIJEKMHyrV8XoE2WReFnqJ2DtkDarIKvftIA5sKcyPwjy23nNTtngZNUF0sQjlQ1eIeoITn9hCjSgMUbyMDwZOjS5RfGUkk0jgVRd8vsfgWBklgrQaMrLS4NnmXWnrmVsBqNmkgHf8VTu0CpBtgKwCE1y3Kh9a5qdLyvK-lmNGUX_iy0ly-U1Dd_D4TA2KRjSNfiaUGAHqUY_j9jPr1x8jqZzsNqmYSYZYU8Pj7sYlM
```

**Important:**
- No quotes around the token
- No spaces before or after the `=`
- The entire token should be on one line
- Make sure the file is saved as `.env.local` (not `.env.local.txt`)

### Step 3: Restart your dev server
1. Stop the current server (Ctrl+C in the terminal)
2. Start it again: `npm run dev`
3. Navigate to `/ctf` again

### Step 4: Test the setup
Visit: `http://localhost:3000/api/htb/test`

This will tell you if:
- The token is found
- The token is valid
- The API connection works

## Quick PowerShell Command (Optional)

If you want to create the file quickly via PowerShell:

```powershell
cd "c:\Users\pablo\Documents\Code Projects\web_portfolio_dec25"
@"
HTB_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiZGI3OWQyOWRiN2Q3MWYyNjFiNzE4YWE5YWQ5Njg3NzdjYTI1ZWE5NDVmNDQ0ZTFjZjI4OWVlZTM3OWMxMTEwMTc2ZDA2OTk1MTMxN2ZmZmYiLCJpYXQiOjE3NjU5NTY2NzYuNDA1MjI1LCJuYmYiOjE3NjU5NTY2NzYuNDA1MjI3LCJleHAiOjE3OTc0OTI2NzYuMzk2NzQsInN1YiI6IjY1MzI4MSIsInNjb3BlcyI6W119.wfrdIPc56qpDtVo45Kbj87GdQg7k0CC6wcNdHfMadxbSg0zNGLjV0c9tmPAmk8LwzkGC10GEHtxQ3U2uOWTh0nVfiIsH3zYXPa3o59cmGcn2fKOupjoMIB3oAzzBbTlxG5zk0ua8loODmjZCRRVgjPOD9eFTm5zjAq-oTyiKM838aH1rtPjxQQ8wyZxpjsLyIkJJWOKiHc_ICNBDJjuUitpQDerp9kplBGfe2nI2RZHaqvfjLKHaymrZi4dohIVhsRwtw_-AkA-y1Oyn_70Psnq0jlloQscricCU8FD7R494EDrDchfMOAslbRX9DyZH1mPQy6ZqVNARajoQZE8WZRFWT6hmxRVuCM_wU2melg4KUyZlawyy3s_vUkNrajn_Dg1TyaXEuq8oKMJzfyseTCQAE4h9UzueWju4da-SGcdEBi4Kk1SskGtUO_rUxo-NUIJEKMHyrV8XoE2WReFnqJ2DtkDarIKvftIA5sKcyPwjy23nNTtngZNUF0sQjlQ1eIeoITn9hCjSgMUbyMDwZOjS5RfGUkk0jgVRd8vsfgWBklgrQaMrLS4NnmXWnrmVsBqNmkgHf8VTu0CpBtgKwCE1y3Kh9a5qdLyvK-lmNGUX_iy0ly-U1Dd_D4TA2KRjSNfiaUGAHqUY_j9jPr1x8jqZzsNqmYSYZYU8Pj7sYlM
"@ | Out-File -FilePath .env.local -Encoding utf8 -NoNewline
```

## Verify It Works

After creating `.env.local` and restarting:

1. Visit `http://localhost:3000/api/htb/test` - Should show success
2. Visit `http://localhost:3000/ctf` - Should load your machines

## Still Having Issues?

If you still get errors after creating `.env.local`:

1. Check the file name is exactly `.env.local` (not `.env.local.txt`)
2. Verify the token is on one line with no line breaks
3. Check server console for detailed error messages
4. Visit `/api/htb/test` to see what the test endpoint says

