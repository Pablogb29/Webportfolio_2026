/**
 * Hostinger entry point — run from project root after `npm run build`.
 * Starts Next standalone from `.next/standalone` (correct cwd for assets).
 */
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const standaloneDir = path.join(root, ".next", "standalone");
const serverEntry = path.join(standaloneDir, "server.js");

function log(msg) {
  console.error(`[server.js] ${msg}`);
}

log(`cwd=${process.cwd()}`);
log(`root=${root}`);
log(`PORT=${process.env.PORT || "(not set, default 3000)"}`);

if (!fs.existsSync(serverEntry)) {
  log(`FATAL: missing ${serverEntry}`);
  try {
    const nextDir = path.join(root, ".next");
    if (fs.existsSync(nextDir)) {
      log(`.next contents: ${fs.readdirSync(nextDir).join(", ")}`);
    } else {
      log("FATAL: .next/ does not exist — build did not run in this directory");
    }
  } catch (e) {
    log(`list error: ${e.message}`);
  }
  process.exit(1);
}

log(`starting ${serverEntry}`);

const child = spawn(process.execPath, [serverEntry], {
  cwd: standaloneDir,
  stdio: "inherit",
  env: {
    ...process.env,
    HOSTNAME: process.env.HOSTNAME || "0.0.0.0",
    PORT: process.env.PORT || "3000",
  },
});

child.on("error", (err) => {
  log(`spawn error: ${err.message}`);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  log(`exited code=${code} signal=${signal}`);
  process.exit(code ?? 1);
});
