# Self-Service Cleanup Guide - Fix /ctf and /projects Routes

This guide will help you clean up deployment artifacts and fix the blank `/ctf` and `/projects` routes issue.

## Prerequisites

- SSH access to your Hostinger server, OR
- File Manager access via Hostinger control panel
- Node.js app should be stopped before cleanup

---

## Method 1: Complete Cleanup via SSH (Recommended)

### Step 1: Connect via SSH

```bash
ssh your-username@your-server-ip
cd ~/public_html  # or wherever your domain root is
```

### Step 2: Stop Node.js Application

```bash
# If using PM2:
pm2 stop portfolio
# or
pm2 stop all

# If running via Hostinger control panel:
# Stop it there first

# If running as a service:
# Check how it's running and stop it
```

### Step 3: Backup Current State (Optional but Recommended)

```bash
# Create a backup directory
mkdir -p ~/backup_$(date +%Y%m%d_%H%M%S)
cp -r ~/public_html/* ~/backup_$(date +%Y%m%d_%H%M%S)/
```

### Step 4: Complete Cleanup

```bash
cd ~/public_html

# List what's currently there (for reference)
ls -la

# Remove ALL contents including hidden files
# BE CAREFUL - This deletes everything!
rm -rf .next
rm -rf public
rm -rf node_modules
rm -rf .htaccess
rm -rf package.json
rm -rf package-lock.json

# Remove any leftover static HTML files that might exist
find . -name "*.html" -type f -delete
find . -name "ctf" -type d -exec rm -rf {} +
find . -name "projects" -type d -exec rm -rf {} +

# Remove any _next directories that might exist at root
rm -rf _next

# Clear any cache directories (if they exist)
rm -rf .cache
rm -rf cache

# Verify cleanup
ls -la
# Should be empty or only contain files you want to keep
```

### Step 5: Check for Hidden Files/Directories

```bash
# Show all hidden files
ls -la | grep "^\."

# Remove any .next, .cache, or other build-related hidden directories
rm -rf .next .cache .nextjs
```

### Step 6: Rebuild and Redeploy

```bash
# On your local machine, rebuild:
npm run build

# Upload fresh files:
# - .next/ folder (entire folder)
# - public/ folder (entire folder)
# - .htaccess file
# - package.json
# - package-lock.json
```

### Step 7: Restart Node.js Application

```bash
# Via PM2:
cd ~/public_html/.next/standalone
pm2 start server.js --name "portfolio" --env production

# Or via Hostinger control panel:
# Start the Node.js app with startup file: .next/standalone/server.js
```

---

## Method 2: Cleanup via File Manager (Hostinger Control Panel)

### Step 1: Access File Manager

1. Log into Hostinger control panel
2. Navigate to **File Manager**
3. Go to `public_html` directory

### Step 2: Stop Node.js App

1. Go to **Node.js App** settings
2. Click **Stop** or **Restart**

### Step 3: Enable Hidden Files View

1. In File Manager, look for **Settings** or **View Options**
2. Enable **"Show Hidden Files"** or **"Show Dot Files"**

### Step 4: Delete Build Artifacts

Delete these folders/files (if they exist):

**Folders to Delete:**
- `.next/` (entire folder - this is the build output)
- `public/` (we'll re-upload it fresh)
- `node_modules/` (if it exists in public_html)
- `_next/` (if it exists at root level)
- `ctf/` (if it exists as a static folder)
- `projects/` (if it exists as a static folder)
- `.cache/` (if it exists)

**Files to Delete:**
- `.htaccess` (we'll re-upload it)
- `package.json` (we'll re-upload it)
- `package-lock.json` (we'll re-upload it)
- Any `.html` files at root level

**How to Delete:**
1. Select the folder/file
2. Right-click → **Delete** or use **Delete** button
3. Confirm deletion

### Step 5: Verify Cleanup

1. Check that `public_html` is empty (or only contains files you want to keep)
2. Make sure hidden files are visible and check for any `.next`, `.cache` directories

### Step 6: Rebuild and Upload Fresh Files

**On your local machine:**

```bash
# Clean local build first
rm -rf .next
npm run build

# Verify build succeeded
ls -la .next/standalone/server.js  # Should exist
ls -la .next/static/css/  # Should have CSS files
```

**Upload via File Manager:**

1. Upload `.next/` folder (entire folder)
2. Upload `public/` folder (entire folder)
3. Upload `.htaccess` file
4. Upload `package.json`
5. Upload `package-lock.json`

**Important:** Make sure to upload the entire `.next` folder, not just parts of it.

### Step 7: Restart Node.js App

1. Go to **Node.js App** settings
2. Verify:
   - **App Root Directory:** `public_html`
   - **App Startup File:** `.next/standalone/server.js`
   - **App Port:** `3000` (or your assigned port)
3. Click **Start** or **Restart**

---

## Method 3: Selective Cleanup (If You Can't Delete Everything)

If you can't delete everything, try this targeted cleanup:

### Via SSH:

```bash
cd ~/public_html

# Remove only the problematic build artifacts
rm -rf .next/server/app/ctf
rm -rf .next/server/app/projects
rm -rf .next/server/pages/ctf
rm -rf .next/server/pages/projects

# Remove any static HTML files for these routes
rm -f ctf.html
rm -f projects.html
rm -rf ctf/
rm -rf projects/

# Clear Next.js cache
rm -rf .next/cache

# Restart the app
pm2 restart portfolio
```

### Via File Manager:

1. Navigate to `.next/server/app/` and delete `ctf/` and `projects/` folders if they exist
2. Navigate to `.next/server/pages/` and delete `ctf/` and `projects/` folders if they exist
3. Delete any `ctf.html` or `projects.html` files at root
4. Delete any `ctf/` or `projects/` directories at root
5. Restart Node.js app

---

## Method 4: Nuclear Option - Complete Reset

If nothing else works:

### Via SSH:

```bash
cd ~/public_html

# Stop the app
pm2 stop all

# Remove EVERYTHING
rm -rf * .[^.]*  # Removes all files including hidden ones

# Verify it's empty
ls -la  # Should only show . and ..

# Now rebuild and redeploy from scratch
```

### Via File Manager:

1. Select ALL files and folders in `public_html`
2. Delete everything
3. Verify directory is empty
4. Rebuild and upload fresh files

---

## After Cleanup: Verification Steps

### 1. Check Node.js App is Running

```bash
# Via SSH:
pm2 list
# or
ps aux | grep node

# Should show your Node.js process running
```

### 2. Test Routes Directly

```bash
# Test if Node.js server responds:
curl http://localhost:3000/ctf
curl http://localhost:3000/projects

# Should return HTML, not 404
```

### 3. Check Browser DevTools

1. Visit `https://yourdomain.com/ctf`
2. Open DevTools → Network tab
3. Check:
   - Status code for `/ctf` request (should be 200)
   - `/_next/static/*` assets load (should be 200)
   - No 404/403 errors

4. Repeat for `/projects`

### 4. Check Server Logs

```bash
# Via SSH, check PM2 logs:
pm2 logs portfolio

# Or check Hostinger error logs:
# Look for any errors related to /ctf or /projects
```

---

## Common Issues After Cleanup

### Issue: Node.js app won't start

**Solution:**
```bash
# Check if server.js exists:
ls -la .next/standalone/server.js

# Check Node.js version:
node --version  # Should be 18+

# Check permissions:
chmod +x .next/standalone/server.js
```

### Issue: Routes still blank after cleanup

**Possible causes:**
1. Server-side cache not cleared (LiteSpeed cache)
2. CDN cache (if using CDN)
3. Browser cache (try incognito mode)
4. `.htaccess` rewrite rules incorrect
5. Node.js app not routing correctly

**Solutions:**
- Clear browser cache completely (Ctrl+Shift+Delete)
- Try incognito/private browsing
- Check `.htaccess` file is correct
- Verify Node.js app logs for errors

### Issue: CSS/JS not loading

**Solution:**
```bash
# Verify static files exist:
ls -la .next/static/css/
ls -la .next/static/chunks/

# Check file permissions:
chmod -R 755 .next/static/
```

---

## Prevention: Clean Deployment Script

Create a script to automate clean deployments:

```bash
#!/bin/bash
# save as: deploy-clean.sh

echo "Stopping Node.js app..."
pm2 stop portfolio

echo "Cleaning public_html..."
cd ~/public_html
rm -rf .next public .htaccess package*.json

echo "Uploading fresh build..."
# Add your upload commands here (scp, rsync, etc.)

echo "Starting Node.js app..."
pm2 start ~/public_html/.next/standalone/server.js --name "portfolio"

echo "Deployment complete!"
```

---

## Still Not Working?

If cleanup doesn't fix it, the issue is likely:

1. **Server-side caching** (LiteSpeed/Hostinger cache) - requires support to purge
2. **Server-level rewrite rules** - requires support to check
3. **mod_security or security rules** - requires support to check
4. **CDN caching** - requires CDN cache purge

In these cases, you'll need to escalate to Hostinger support with specific requests for cache purging and rule checking.

---

