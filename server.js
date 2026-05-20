/**
 * Hostinger Passenger entry (PassengerStartupFile server.js).
 * Same runtime as `npm start` / next start — required for Passenger; not in the April repo.
 */
const http = require("http");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOSTNAME || "0.0.0.0";
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

function log(msg) {
  console.error(`[startup] ${msg}`);
}

log(`node=${process.version} dir=${__dirname} PORT=${port}`);

app
  .prepare()
  .then(() => {
    http
      .createServer((req, res) => handle(req, res, parse(req.url, true)))
      .listen(port, hostname, () => log(`Ready http://${hostname}:${port}`));
  })
  .catch((err) => {
    log(`prepare failed: ${err.stack || err.message}`);
    process.exit(1);
  });
