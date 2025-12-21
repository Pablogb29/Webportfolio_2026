# Hostinger Support Message - Deployment Issue

## 1. Full Support Message

---

**Subject:** Hosting/Deployment Issue: Selective Route Failure (`/ctf` and `/projects`) - Server-Side Caching/Artifacts

**Message:**

Hello Hostinger Support Team,

I am experiencing a deployment issue that I believe is related to hosting configuration, server-side caching, or deployment artifacts—not web development. I would appreciate your assistance in resolving this.

**Issue Summary:**
- **Application:** Next.js 14 (App Router) portfolio website deployed via Node.js hosting
- **Deployment Mode:** Using `output: 'standalone'` with reverse proxy via Apache `.htaccess`
- **Symptom:** Only two routes (`/ctf` and `/projects`) fail to render in production (blank pages), while all other routes work correctly
- **Local Environment:** Everything works perfectly, including `/ctf` and `/projects`
- **Critical Detail:** Rolling back to a previous Git commit that previously worked does NOT resolve the issue, indicating this is a server-side caching/deployment artifact problem, not a code issue

**Evidence:**
1. **Selective Failure:** Only `/ctf` and `/projects` are affected; all other routes (`/`, `/contact`, `/labs`, `/case-studies/*`, etc.) work correctly
2. **Persistent Across Environments:** Issue occurs on multiple devices and networks (tested on different computers and mobile 5G), ruling out local browser cache
3. **Rollback Ineffective:** Deploying an older commit that previously worked does not fix the issue, strongly suggesting leftover build artifacts or server-side caching
4. **Build Verification:** Local build output (`npm run build`) successfully generates both `/ctf` and `/projects` routes

**Technical Context:**
- **Deployment Method:** Node.js app running `.next/standalone/server.js` on port 3000
- **Reverse Proxy:** Apache `.htaccess` proxies non-static requests to `localhost:3000`
- **Static Assets:** `/_next/static/*` served directly from `.next/static/` directory
- **Routes Affected:** `/ctf` and `/projects` (both are Next.js App Router pages)

**Requested Actions:**

I need your team to perform the following server-side checks and actions:

**1. Deployment Mode Confirmation:**
   - Please confirm whether the application is running as:
     a) A Node.js application behind Apache reverse proxy (expected), OR
     b) Static files being served directly from `public_html` (incorrect for this setup)
   - Verify the Node.js app is running and accessible on the configured port

**2. Complete Clean Deployment:**
   - Please guide me through or perform a FULL clean deployment:
     - Remove ALL contents of `public_html` directory (including `/_next`, `/ctf`, `/projects` folders if they exist as static artifacts)
     - Clear any `.next` build artifacts
     - Ensure no leftover static HTML files for `/ctf` or `/projects` exist
     - Then redeploy fresh build artifacts

**3. Server-Side Cache Purge:**
   - Purge all LiteSpeed/Hostinger server-side caching
   - Clear any CDN cache if enabled for the domain
   - Clear any Apache/Nginx proxy cache
   - Verify cache rules are not blocking or serving stale content for `/ctf` and `/projects` specifically

**4. Routing/Rewrite Rules Check:**
   - Review `.htaccess` rewrite rules to ensure `/ctf` and `/projects` are not being intercepted incorrectly
   - Verify no conflicting rewrite rules exist in parent directories or server-level configuration
   - Check if any security rules or mod_security rules are blocking these specific paths
   - Confirm that requests to `/ctf` and `/projects` are being proxied to the Node.js server (not served as static files)

**5. File Permissions & Security:**
   - Verify file permissions on `.next/` directory and subdirectories
   - Check if any security rules (mod_security, .htaccess in parent directories) are blocking `/ctf` or `/projects`
   - Confirm no directory-level `.htaccess` files are interfering

**6. Server Logs:**
   - Please provide access logs showing requests to `/ctf` and `/projects`
   - Check for any 404, 403, or 500 errors for these routes
   - Verify if `/_next/static/*` assets are loading correctly when visiting `/ctf` and `/projects`
   - Check error logs for any routing or proxy-related errors

**Evidence I Can Provide:**
- Screenshots of browser DevTools Network tab showing:
  - HTTP status codes for `/ctf` and `/projects` requests
  - Whether `/_next/static/*` assets load or fail (404/403) when visiting these pages
  - Response headers and content types
- Build output verification showing `/ctf` and `/projects` routes are generated successfully
- Exact deployment steps and directory structure used
- `.htaccess` configuration file

**Why This Is a Hosting Issue:**
- The selective nature (only two routes affected) suggests server-side routing/caching, not application code
- Rollback not fixing the issue indicates stale deployment artifacts or server-side cache
- The fact that it works locally but fails in production across all networks points to server configuration

I understand that web development issues are out of scope, but this appears to be a hosting/deployment artifact issue that requires server-side intervention. I have verified the application code and build process, and the issue persists regardless of code changes.

Thank you for your assistance. I am happy to provide any additional information or access needed to resolve this.

Best regards,
[Your Name]

---

## 2. TL;DR Version

---

**Subject:** Hosting Issue: Routes `/ctf` and `/projects` Blank - Server Cache/Artifacts

**Message:**

Next.js app deployed to Hostinger Node.js hosting. Only `/ctf` and `/projects` routes fail (blank pages); all other routes work. Issue persists after rolling back to previous working commit, indicating server-side caching/deployment artifacts, not code.

**Request:**
1. Confirm deployment mode (Node.js app vs static files)
2. Perform FULL clean deploy (remove all `public_html` contents, clear `.next` artifacts)
3. Purge all server-side caches (LiteSpeed/Hostinger/CDN)
4. Check `.htaccess`/rewrite rules for `/ctf` and `/projects` interception
5. Check security rules/permissions blocking these paths
6. Provide server logs (404/403/500) for `/ctf` and `/projects` requests

**Evidence available:** DevTools screenshots, build verification, deployment steps.

This is a hosting/deployment issue requiring server-side intervention, not web development.

---

## 3. Attachment Checklist

---

### Screenshots to Attach:

- [ ] **Browser DevTools - Network Tab (visiting `/ctf`):**
  - Show HTTP status code for `/ctf` request (200/404/403/500?)
  - Show all `/_next/static/*` asset requests and their status codes
  - Show response headers (Content-Type, Cache-Control, etc.)
  - Show any failed requests (red entries)

- [ ] **Browser DevTools - Network Tab (visiting `/projects`):**
  - Same as above for `/projects` route

- [ ] **Browser DevTools - Console Tab:**
  - Show any JavaScript errors when visiting `/ctf` or `/projects`
  - Show any 404/403 errors for assets

- [ ] **Browser DevTools - Elements Tab:**
  - Show HTML structure of `/ctf` page (is it blank/empty?)
  - Show HTML structure of `/projects` page

- [ ] **Working Route Comparison:**
  - Screenshot of Network tab for a working route (e.g., `/contact` or `/`) for comparison

### Logs/Text Files to Attach:

- [ ] **Build Output Verification:**
  ```
  Terminal output showing:
  - npm run build completion
  - Routes listed including /ctf and /projects
  - Build success confirmation
  ```

- [ ] **Deployment Steps Documentation:**
  ```
  List of exact steps taken:
  - Files uploaded to public_html
  - Node.js app configuration
  - Port number used
  - Startup command/file
  ```

- [ ] **`.htaccess` File Contents:**
  ```
  Full contents of .htaccess file (already available in repo)
  ```

- [ ] **Directory Structure:**
  ```
  Output of: ls -la public_html/ (or equivalent)
  Showing what files/folders exist in deployment directory
  ```

- [ ] **Node.js App Status:**
  ```
  Confirmation that Node.js app is running:
  - Process status
  - Port listening confirmation
  - Any error messages from app startup
  ```

### Additional Information to Include:

- [ ] **Domain/URL:** Your domain name
- [ ] **Hosting Plan:** Type of Hostinger plan (VPS/Business/Cloud)
- [ ] **Node.js Version:** `node --version` output from server
- [ ] **Next.js Version:** From `package.json` (14.2.33)
- [ ] **Deployment Method:** How files were uploaded (FTP/SSH/File Manager)
- [ ] **Previous Working State:** When did it last work? (approximate date)

---

## Quick Reference: Key Points to Emphasize

1. **Selective Failure:** Only 2 routes affected, not all routes
2. **Rollback Doesn't Fix:** Proves it's server-side, not code
3. **Works Locally:** Proves code is correct
4. **Cross-Device:** Proves it's not browser cache
5. **Request Server Actions:** Be specific about what you need them to do
6. **Provide Evidence:** Show you've done your due diligence

---

## 4. If Support Refuses to Help

If support says "this is web development" and refuses to help, see:

- **`HOSTINGER_ESCALATION_RESPONSE.md`** - Stronger response that clarifies this IS hosting
- **`SELF_SERVICE_CLEANUP_GUIDE.md`** - Step-by-step guide to fix it yourself via SSH/File Manager
- **`cleanup-deployment.sh`** - Automated cleanup script you can run via SSH

**Key Points for Escalation:**
- Their own diagnosis ("leftover files or cached routes") confirms it's hosting
- You don't have access to server-side caches (LiteSpeed/Hostinger cache)
- You need SSH access or File Manager instructions to clean up server-side artifacts
- This is deployment/hosting maintenance, not web development

---

