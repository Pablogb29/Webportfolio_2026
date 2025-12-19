#!/bin/bash
# Quick deployment verification script
# Run this after uploading files to Hostinger

echo "=== Next.js Deployment Verification ==="
echo ""

# Check if .next folder exists
if [ -d ".next" ]; then
    echo "✓ .next folder exists"
else
    echo "✗ .next folder NOT FOUND - Run 'npm run build' first"
    exit 1
fi

# Check if CSS files exist
CSS_COUNT=$(find .next/static/css -name "*.css" 2>/dev/null | wc -l)
if [ "$CSS_COUNT" -gt 0 ]; then
    echo "✓ Found $CSS_COUNT CSS file(s)"
else
    echo "✗ No CSS files found in .next/static/css/"
fi

# Check if standalone server exists
if [ -f ".next/standalone/server.js" ]; then
    echo "✓ Standalone server.js exists"
else
    echo "⚠ Standalone server.js not found (may need to rebuild)"
fi

# Check if public folder exists
if [ -d "public" ]; then
    echo "✓ public folder exists"
else
    echo "✗ public folder NOT FOUND"
fi

# Check if .htaccess exists
if [ -f ".htaccess" ]; then
    echo "✓ .htaccess exists"
else
    echo "⚠ .htaccess not found (Apache rewrites may not work)"
fi

# Check if package.json exists
if [ -f "package.json" ]; then
    echo "✓ package.json exists"
else
    echo "✗ package.json NOT FOUND"
fi

echo ""
echo "=== Testing Asset Paths ==="
echo ""

# Test if CSS is accessible (if running on server)
if command -v curl &> /dev/null; then
    CSS_FILE=$(find .next/static/css -name "*.css" | head -1)
    if [ -n "$CSS_FILE" ]; then
        CSS_PATH="/_next/static/css/$(basename $CSS_FILE)"
        echo "Test CSS path: $CSS_PATH"
        echo "Run: curl -I http://yourdomain.com$CSS_PATH"
        echo "Should return: 200 OK"
    fi
fi

echo ""
echo "=== Next Steps ==="
echo "1. Ensure Node.js app is running on port 3000"
echo "2. Verify /_next/static/css/*.css returns 200 OK"
echo "3. Check browser console for [CSS Debug] messages"
echo "4. Test /projects and /ctf pages"

