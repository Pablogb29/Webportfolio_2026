# Hostinger Deployment Guide

This guide covers deploying the Next.js portfolio to Hostinger hosting.

## Prerequisites

- Hostinger account with Node.js hosting (VPS or Business/Cloud plan)
- SSH access or File Manager access
- Node.js 18+ installed on server

## Deployment Options

### Option 1: Node.js Hosting (Recommended - Required for API Routes)

Since this app uses API routes (`/api/htb/*`), you **must** use Node.js hosting.

#### Step 1: Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

#### Step 2: Upload Files to Hostinger

Upload the following to your Hostinger `public_html` directory (or your domain's root):

**Required files/folders:**
- `.next/` (entire folder - contains built application)
- `public/` (entire folder - contains static assets)
- `package.json`
- `package-lock.json`
- `node_modules/` (or run `npm install --production` on server)
- `.htaccess` (for Apache configuration)

**Do NOT upload:**
- `node_modules/` (install on server instead)
- `.git/`
- `*.md` files (optional)
- `scripts/` (optional, unless you need fetch-htb)

#### Step 3: Configure Hostinger Node.js App

1. **In Hostinger Control Panel:**
   - Go to Node.js App settings
   - Set **App Root Directory** to your domain root (e.g., `public_html`)
   - Set **App Startup File** to: `.next/standalone/server.js`
   - Set **App Port** to: `3000` (or your assigned port)
   - Set **App URL** to your domain

2. **Set Environment Variables** (if needed):
   - `NODE_ENV=production`
   - `PORT=3000` (or your assigned port)
   - `HTB_TOKEN=your_token` (if using HTB API)

   **Note:** With `output: 'standalone'` in next.config.js, the build creates a minimal server in `.next/standalone/` that includes only necessary files.

#### Step 4: Configure Apache/Nginx Reverse Proxy

**For Apache (.htaccess already included):**

The `.htaccess` file handles:
- Proxying API routes to Node.js server
- Serving `/_next/static/*` assets correctly
- Handling client-side routing

**For Nginx** (if using Nginx instead of Apache):

Add to your Nginx configuration:

```nginx
location /_next/static/ {
    alias /path/to/public_html/.next/static/;
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location /api/ {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

#### Step 5: Start the Application

**Via Hostinger Control Panel:**
- Use the "Start App" button in Node.js App settings

**Via SSH:**
```bash
cd /path/to/public_html

# Option 1: Use standalone server (recommended - minimal dependencies)
cd .next/standalone
PORT=3000 node server.js

# Option 2: Use full Next.js server (requires all node_modules)
cd /path/to/public_html
npm install --production
PORT=3000 node .next/standalone/server.js
```

**Important:** The standalone build includes a minimal `node_modules` in `.next/standalone/node_modules/`. You can use this directly without installing all dependencies in the root.

**Or use PM2 (recommended for production):**
```bash
npm install -g pm2
cd /path/to/public_html
pm2 start .next/standalone/server.js --name "portfolio" --env production
pm2 save
pm2 startup
```

#### Step 6: Verify Deployment

1. **Check CSS Loading:**
   - Visit `https://yourdomain.com/_next/static/css/[hash].css`
   - Should return 200 OK with CSS content
   - Check browser console for `[CSS Debug]` messages

2. **Check Pages:**
   - Visit `https://yourdomain.com/projects` - should be styled
   - Visit `https://yourdomain.com/ctf` - should be styled
   - Visit `https://yourdomain.com/api/htb/ctf` - should return JSON

3. **Check Footer Debug:**
   - If CSS fails to load, footer will show warning message
   - Check browser console for detailed error messages

---

### Option 2: Static Export (NOT RECOMMENDED - API Routes Won't Work)

⚠️ **Warning:** This app uses API routes which require a Node.js server. Static export will break `/api/htb/*` endpoints.

If you still want to try static export (for testing):

#### Step 1: Update next.config.js

```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

#### Step 2: Build Static Export

```bash
npm run build
```

#### Step 3: Upload `out/` Folder

Upload the entire `out/` folder contents to `public_html/`.

#### Step 4: Configure .htaccess for SPA

Update `.htaccess` to handle client-side routing:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

## Troubleshooting

### Issue: CSS Not Loading (Unstyled Pages)

**Symptoms:**
- Pages render but look unstyled
- Footer shows CSS warning
- Browser console shows 404 for `/_next/static/css/*.css`

**Solutions:**

1. **Verify .next folder uploaded:**
   ```bash
   ls -la .next/static/css/
   ```
   Should show CSS files.

2. **Check file permissions:**
   ```bash
   chmod -R 755 .next/
   chmod -R 755 public/
   ```

3. **Verify .htaccess is present:**
   - Ensure `.htaccess` is in root directory
   - Check Apache mod_rewrite is enabled

4. **Check reverse proxy:**
   - Ensure `/_next/static/*` is not being proxied to Node.js
   - Should be served directly by Apache/Nginx

5. **Clear browser cache:**
   - Hard refresh (Ctrl+Shift+R)
   - Clear site cache

### Issue: API Routes Return 404

**Symptoms:**
- `/api/htb/ctf` returns 404
- CTF page shows error loading machines

**Solutions:**

1. **Verify Node.js app is running:**
   ```bash
   curl http://localhost:3000/api/htb/ctf
   ```

2. **Check reverse proxy configuration:**
   - Ensure `/api/*` routes proxy to `http://localhost:3000`
   - Check `.htaccess` or Nginx config

3. **Verify port number:**
   - Ensure Node.js app runs on correct port
   - Update proxy_pass URL if different

### Issue: Images Not Loading

**Symptoms:**
- Images show broken/placeholder
- Case study images don't display

**Solutions:**

1. **Check public folder:**
   - Verify `public/` folder uploaded correctly
   - Check file paths match `src` attributes

2. **For static export:**
   - Ensure `unoptimized: true` in next.config.js
   - Use regular `<img>` instead of `next/image` if needed

### Issue: 500 Internal Server Error

**Symptoms:**
- Pages return 500 error
- Server logs show errors

**Solutions:**

1. **Check Node.js version:**
   ```bash
   node --version
   ```
   Should be 18+.

2. **Check dependencies:**
   ```bash
   npm install --production
   ```

3. **Check server logs:**
   - Hostinger error logs
   - PM2 logs: `pm2 logs portfolio`

4. **Verify environment variables:**
   - Check all required env vars are set

---

## File Structure After Deployment

```
public_html/
├── .next/
│   ├── static/
│   │   ├── css/
│   │   │   └── [hash].css  ← CSS files must be accessible
│   │   └── chunks/
│   └── standalone/
│       └── server.js  ← Node.js server entry point
├── public/
│   ├── htb/
│   ├── case-studies/
│   └── thesis/
├── .htaccess  ← Apache configuration
├── package.json
├── package-lock.json
└── node_modules/  ← Install on server
```

---

## Quick Deployment Checklist

- [ ] Build application: `npm run build`
- [ ] Upload `.next/` folder
- [ ] Upload `public/` folder
- [ ] Upload `package.json` and `package-lock.json`
- [ ] Upload `.htaccess` file
- [ ] Install dependencies on server: `npm install --production`
- [ ] Configure Node.js app in Hostinger panel
- [ ] Set correct port and startup file
- [ ] Start Node.js application
- [ ] Verify `/_next/static/css/*.css` is accessible
- [ ] Test `/projects` and `/ctf` pages
- [ ] Check footer for CSS debug messages
- [ ] Test API routes: `/api/htb/ctf`

---

## Support

If issues persist:
1. Check browser console for errors
2. Check server logs (Hostinger error logs)
3. Verify all files uploaded correctly
4. Test `/_next/static/*` URLs directly
5. Contact Hostinger support if reverse proxy issues

