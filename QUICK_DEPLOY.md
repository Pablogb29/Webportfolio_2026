# Quick Deployment Checklist for Hostinger

## Pre-Deployment

```bash
# 1. Build the application
npm run build

# 2. Verify build output
ls -la .next/standalone/server.js  # Should exist
ls -la .next/static/css/*.css      # Should have CSS files
```

## Files to Upload

Upload these to Hostinger `public_html/`:

```
✓ .next/                    (entire folder)
✓ public/                   (entire folder)  
✓ .htaccess                 (Apache config)
✓ package.json              (for reference)
✓ package-lock.json         (for reference)
```

**Do NOT upload:**
- `node_modules/` (install on server or use standalone)
- `.git/`
- `src/`, `components/`, `app/` (already in .next)

## Hostinger Configuration

### Node.js App Settings:
- **App Root Directory:** `public_html` (or your domain root)
- **App Startup File:** `.next/standalone/server.js`
- **App Port:** `3000` (or assigned port)
- **Node.js Version:** 18+ (check: `node --version`)

### Environment Variables:
```
NODE_ENV=production
PORT=3000
```

## Start Application

**Option 1: Via Hostinger Control Panel**
- Click "Start App" in Node.js App settings

**Option 2: Via SSH**
```bash
cd /path/to/public_html/.next/standalone
PORT=3000 node server.js
```

**Option 3: Via PM2 (Production)**
```bash
npm install -g pm2
cd /path/to/public_html/.next/standalone
pm2 start server.js --name "portfolio" --env production
pm2 save
pm2 startup
```

## Verification

1. **Check CSS Loading:**
   ```
   https://yourdomain.com/_next/static/css/[hash].css
   ```
   Should return 200 OK with CSS content.

2. **Check Pages:**
   - `/projects` - Should be styled
   - `/ctf` - Should be styled
   - Footer should NOT show CSS warning

3. **Check API:**
   ```
   https://yourdomain.com/api/htb/ctf
   ```
   Should return JSON data.

4. **Browser Console:**
   - Should see: `[CSS Debug] Tailwind CSS loaded successfully`
   - No 404 errors for `/_next/static/*`

## Common Issues

### CSS Not Loading
- ✅ Verify `.next/static/css/` folder uploaded
- ✅ Check `.htaccess` exists and has correct rewrites
- ✅ Ensure `/_next/static/*` is NOT proxied to Node.js
- ✅ Clear browser cache

### API Routes 404
- ✅ Verify Node.js app is running
- ✅ Check `.htaccess` proxies `/api/*` to `localhost:3000`
- ✅ Verify port number matches

### 500 Internal Server Error
- ✅ Check Node.js version (18+)
- ✅ Verify `server.js` exists in `.next/standalone/`
- ✅ Check server error logs

## File Permissions

```bash
chmod 755 .next/
chmod 755 public/
chmod 644 .htaccess
```

## Support

If issues persist:
1. Check browser console for errors
2. Check Hostinger error logs
3. Verify all files uploaded correctly
4. Test `/_next/static/css/*.css` URL directly
5. See `DEPLOYMENT.md` for detailed troubleshooting

