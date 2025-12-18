# CTF Section Troubleshooting

## ✅ JSON File Created Successfully

The script ran successfully and created `public/solved-machines.json` with **36 solved machines**.

## 🔄 Next Steps to See Your Machines

### 1. Restart Your Dev Server

The dev server needs to be restarted to pick up the new JSON file:

1. **Stop the current server**: Press `Ctrl+C` in the terminal where `npm run dev` is running
2. **Start it again**: Run `npm run dev`
3. **Refresh your browser**: Visit `http://localhost:3000/ctf`

### 2. Clear Browser Cache (if needed)

If you still see 0 machines after restarting:

1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Or open DevTools → Network tab → Check "Disable cache"

### 3. Verify the API is Working

Visit this URL directly in your browser:
```
http://localhost:3000/api/htb/ctf
```

You should see JSON data with 36 machines.

## 🐛 React Error Fix

If you see this error:
```
Error: Event handlers cannot be passed to Client Component props
```

This is a Next.js hydration issue. Try:

1. **Clear `.next` folder**:
   ```powershell
   Remove-Item -Recurse -Force .next
   ```

2. **Restart dev server**:
   ```powershell
   npm run dev
   ```

3. **Clear browser cache** and refresh

## 📊 Expected Results

After restarting, you should see:
- **36 machines** displayed on `/ctf` page
- Stats showing breakdown by difficulty and OS
- Machine cards with names, OS, and difficulty

## 🔍 Verify Script Output

Check that the JSON file exists:
```powershell
Test-Path "public\solved-machines.json"
```

Should return: `True`

View the file:
```powershell
Get-Content "public\solved-machines.json" | Select-Object -First 10
```

## 🚀 Quick Test

Run this to verify everything:
```powershell
# 1. Check JSON file exists
Test-Path "public\solved-machines.json"

# 2. Count machines in file
(Get-Content "public\solved-machines.json" | ConvertFrom-Json).total

# Should output: 36
```

## Still Not Working?

1. Check server console for errors
2. Verify `.env.local` has `HTB_TOKEN` set
3. Check browser console (F12) for client-side errors
4. Try accessing `/api/htb/ctf` directly to see the API response

