# Quick Start: HTB CTF Integration

## 🚀 Quick Setup (3 Steps)

### 1. Set Environment Variable

Create `.env.local` in the project root:

```env
HTB_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiZGI3OWQyOWRiN2Q3MWYyNjFiNzE4YWE5YWQ5Njg3NzdjYTI1ZWE5NDVmNDQ0ZTFjZjI4OWVlZTM3OWMxMTEwMTc2ZDA2OTk1MTMxN2ZmZmYiLCJpYXQiOjE3NjU5NTY2NzYuNDA1MjI1LCJuYmYiOjE3NjU5NTY2NzYuNDA1MjI3LCJleHAiOjE3OTc0OTI2NzYuMzk2NzQsInN1YiI6IjY1MzI4MSIsInNjb3BlcyI6W119.wfrdIPc56qpDtVo45Kbj87GdQg7k0CC6wcNdHfMadxbSg0zNGLjV0c9tmPAmk8LwzkGC10GEHtxQ3U2uOWTh0nVfiIsH3zYXPa3o59cmGcn2fKOupjoMIB3oAzzBbTlxG5zk0ua8loODmjZCRRVgjPOD9eFTm5zjAq-oTyiKM838aH1rtPjxQQ8wyZxpjsLyIkJJWOKiHc_ICNBDJjuUitpQDerp9kplBGfe2nI2RZHaqvfjLKHaymrZi4dohIVhsRwtw_-AkA-y1Oyn_70Psnq0jlloQscricCU8FD7R494EDrDchfMOAslbRX9DyZH1mPQy6ZqVNARajoQZE8WZRFWT6hmxRVuCM_wU2melg4KUyZlawyy3s_vUkNrajn_Dg1TyaXEuq8oKMJzfyseTCQAE4h9UzueWju4da-SGcdEBi4Kk1SskGtUO_rUxo-NUIJEKMHyrV8XoE2WReFnqJ2DtkDarIKvftIA5sKcyPwjy23nNTtngZNUF0sQjlQ1eIeoITn9hCjSgMUbyMDwZOjS5RfGUkk0jgVRd8vsfgWBklgrQaMrLS4NnmXWnrmVsBqNmkgHf8VTu0CpBtgKwCE1y3Kh9a5qdLyvK-lmNGUX_iy0ly-U1Dd_D4TA2KRjSNfiaUGAHqUY_j9jPr1x8jqZzsNqmYSYZYU8Pj7sYlM
```

### 2. Fetch Machines Data

Run the script to fetch your solved machines:

```bash
npm run fetch-htb
```

This creates `public/solved-machines.json` with your solved machines.

### 3. View Results

Start your dev server and visit:

```bash
npm run dev
```

Then open: `http://localhost:3000/ctf`

## 📅 Set Up Daily Updates

### Windows (Task Scheduler)

1. Open Task Scheduler
2. Create Basic Task → Daily at 2:00 AM
3. Action: Start a program
4. Program: `node.exe`
5. Arguments: `scripts/fetchSolvedMachines.js`
6. Start in: `C:\Users\pablo\Documents\Code Projects\web_portfolio_dec25`

### Linux/macOS (Cron)

```bash
crontab -e
```

Add:
```cron
0 2 * * * cd /path/to/project && node scripts/fetchSolvedMachines.js
```

## 📋 What Gets Fetched?

The script fetches machines where:
- ✅ `authUserInUserOwns === true` 
- ✅ `authUserInRootOwns === true`

And extracts only:
- Machine name
- Operating System (os)
- Difficulty (difficultyText)

## 🔍 Troubleshooting

**Script fails?**
- Check `.env.local` exists and has `HTB_TOKEN`
- Verify token is valid at https://app.hackthebox.com/profile/settings

**No machines showing?**
- Run `npm run fetch-htb` manually
- Check `public/solved-machines.json` exists
- Verify you have machines solved (both user and root)

**Need help?**
See `HTB_CTF_SETUP.md` for detailed documentation.

