#!/bin/bash
# Hostinger Deployment Cleanup Script
# This script performs a complete cleanup of deployment artifacts
# Use with caution - it deletes files!

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PUBLIC_HTML="${PUBLIC_HTML:-~/public_html}"
BACKUP_DIR="${BACKUP_DIR:-~/backups}"
APP_NAME="${APP_NAME:-portfolio}"

echo -e "${YELLOW}Hostinger Deployment Cleanup Script${NC}"
echo "=========================================="
echo ""

# Confirm before proceeding
read -p "This will delete all files in $PUBLIC_HTML. Continue? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo -e "${RED}Aborted.${NC}"
    exit 1
fi

# Step 1: Stop Node.js application
echo -e "${YELLOW}Step 1: Stopping Node.js application...${NC}"
if command -v pm2 &> /dev/null; then
    pm2 stop "$APP_NAME" 2>/dev/null || pm2 stop all 2>/dev/null || true
    echo -e "${GREEN}✓ PM2 stopped${NC}"
else
    echo -e "${YELLOW}⚠ PM2 not found, skipping...${NC}"
fi

# Step 2: Create backup
echo -e "${YELLOW}Step 2: Creating backup...${NC}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="$BACKUP_DIR/backup_$TIMESTAMP"
mkdir -p "$BACKUP_PATH"

if [ -d "$PUBLIC_HTML" ] && [ "$(ls -A $PUBLIC_HTML 2>/dev/null)" ]; then
    cp -r "$PUBLIC_HTML"/* "$BACKUP_PATH"/ 2>/dev/null || true
    echo -e "${GREEN}✓ Backup created at $BACKUP_PATH${NC}"
else
    echo -e "${YELLOW}⚠ No files to backup${NC}"
fi

# Step 3: Navigate to public_html
cd "$PUBLIC_HTML" || {
    echo -e "${RED}✗ Cannot access $PUBLIC_HTML${NC}"
    exit 1
}

# Step 4: List current contents (for reference)
echo -e "${YELLOW}Step 3: Current directory contents:${NC}"
ls -la | head -20
echo ""

# Step 5: Remove build artifacts
echo -e "${YELLOW}Step 4: Removing build artifacts...${NC}"

# Remove Next.js build output
[ -d ".next" ] && rm -rf .next && echo -e "${GREEN}✓ Removed .next/${NC}"
[ -d "_next" ] && rm -rf _next && echo -e "${GREEN}✓ Removed _next/${NC}"

# Remove public directory
[ -d "public" ] && rm -rf public && echo -e "${GREEN}✓ Removed public/${NC}"

# Remove node_modules if it exists
[ -d "node_modules" ] && rm -rf node_modules && echo -e "${GREEN}✓ Removed node_modules/${NC}"

# Remove configuration files (will be re-uploaded)
[ -f ".htaccess" ] && rm -f .htaccess && echo -e "${GREEN}✓ Removed .htaccess${NC}"
[ -f "package.json" ] && rm -f package.json && echo -e "${GREEN}✓ Removed package.json${NC}"
[ -f "package-lock.json" ] && rm -f package-lock.json && echo -e "${GREEN}✓ Removed package-lock.json${NC}"

# Remove problematic route directories if they exist as static files
[ -d "ctf" ] && rm -rf ctf && echo -e "${GREEN}✓ Removed ctf/ directory${NC}"
[ -d "projects" ] && rm -rf projects && echo -e "${GREEN}✓ Removed projects/ directory${NC}"
[ -f "ctf.html" ] && rm -f ctf.html && echo -e "${GREEN}✓ Removed ctf.html${NC}"
[ -f "projects.html" ] && rm -f projects.html && echo -e "${GREEN}✓ Removed projects.html${NC}"

# Remove cache directories
[ -d ".cache" ] && rm -rf .cache && echo -e "${GREEN}✓ Removed .cache/${NC}"
[ -d "cache" ] && rm -rf cache && echo -e "${GREEN}✓ Removed cache/${NC}"

# Remove any leftover HTML files
find . -maxdepth 1 -name "*.html" -type f -delete 2>/dev/null && echo -e "${GREEN}✓ Removed HTML files${NC}"

# Step 6: Verify cleanup
echo -e "${YELLOW}Step 5: Verifying cleanup...${NC}"
REMAINING=$(find . -maxdepth 1 -type f -o -type d | grep -v "^\.$" | grep -v "^\.\.$" | wc -l)
if [ "$REMAINING" -eq 0 ]; then
    echo -e "${GREEN}✓ Directory is clean${NC}"
else
    echo -e "${YELLOW}⚠ Some files remain:${NC}"
    ls -la | grep -v "^\.$" | grep -v "^\.\.$" | head -10
fi

# Step 7: Instructions for next steps
echo ""
echo -e "${GREEN}==========================================${NC}"
echo -e "${GREEN}Cleanup Complete!${NC}"
echo -e "${GREEN}==========================================${NC}"
echo ""
echo "Next steps:"
echo "1. Rebuild your application locally:"
echo "   npm run build"
echo ""
echo "2. Upload fresh files to $PUBLIC_HTML:"
echo "   - .next/ folder (entire folder)"
echo "   - public/ folder (entire folder)"
echo "   - .htaccess file"
echo "   - package.json"
echo "   - package-lock.json"
echo ""
echo "3. Restart your Node.js application:"
echo "   pm2 start $PUBLIC_HTML/.next/standalone/server.js --name $APP_NAME"
echo "   OR"
echo "   Start via Hostinger control panel"
echo ""
echo -e "${YELLOW}Backup location: $BACKUP_PATH${NC}"
echo ""

