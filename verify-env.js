/**
 * Quick script to verify .env.local is set up correctly
 * Run: node verify-env.js
 */

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');

console.log('🔍 Checking .env.local file...\n');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file NOT FOUND!');
  console.log('\n📝 Create it with:');
  console.log('   HTB_TOKEN=your_token_here\n');
  process.exit(1);
}

console.log('✅ .env.local file exists');

const content = fs.readFileSync(envPath, 'utf8');
const lines = content.split('\n').filter(line => line.trim());

console.log(`📄 File has ${lines.length} line(s)\n`);

const tokenLine = lines.find(line => line.startsWith('HTB_TOKEN='));

if (!tokenLine) {
  console.error('❌ HTB_TOKEN not found in .env.local');
  console.log('\n📝 File should contain:');
  console.log('   HTB_TOKEN=your_token_here\n');
  process.exit(1);
}

const token = tokenLine.split('=')[1];

if (!token || token.trim().length === 0) {
  console.error('❌ HTB_TOKEN is empty');
  process.exit(1);
}

if (token.startsWith('"') || token.startsWith("'")) {
  console.warn('⚠️  Warning: Token appears to have quotes. Remove quotes from .env.local');
}

console.log('✅ HTB_TOKEN found');
console.log(`📏 Token length: ${token.length} characters`);
console.log(`🔤 Token starts with: ${token.substring(0, 20)}...`);

if (token.length < 100) {
  console.warn('⚠️  Warning: Token seems too short. Make sure you copied the full token.');
}

console.log('\n✅ .env.local looks good!');
console.log('\n⚠️  IMPORTANT: Restart your Next.js dev server for changes to take effect:');
console.log('   1. Press Ctrl+C to stop the server');
console.log('   2. Run: npm run dev');
console.log('   3. Visit: http://localhost:3000/api/htb/test\n');

