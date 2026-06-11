/**
 * After `next build` with output: "standalone", copy assets required at runtime.
 * Without this, standalone/server.js starts but cannot serve static files correctly.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const standaloneDir = path.join(root, ".next", "standalone");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`[postbuild] skip missing: ${src}`);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const from = path.join(src, name);
    const to = path.join(dest, name);
    if (fs.statSync(from).isDirectory()) {
      copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

const serverJs = path.join(standaloneDir, "server.js");
if (!fs.existsSync(serverJs)) {
  console.error("[postbuild] FATAL: .next/standalone/server.js not found");
  process.exit(1);
}

copyDir(path.join(root, "public"), path.join(standaloneDir, "public"));
copyDir(path.join(root, ".next", "static"), path.join(standaloneDir, ".next", "static"));

console.log("[postbuild] standalone ready (.next/standalone)");
