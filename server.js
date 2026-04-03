const { createServer } = require("http");
const { parse } = require("url");
const fs = require("fs");
const next = require("next");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// path to error log file
const logFile = path.join(__dirname, "error.log");

// function to log errors
function logError(err) {
  const message = `[${new Date().toISOString()}] ${err.stack || err}\n`;
  fs.appendFileSync(logFile, message, "utf8");
  console.error(err); // also log to console
}

app.prepare().then(() => {
  createServer((req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl).catch(logError);
    } catch (err) {
      logError(err);
      res.statusCode = 500;
      res.end("Server error");
    }
  }).listen(process.env.PORT || 3000, () => {
    console.log(`Next.js server running on port ${process.env.PORT || 3000}`);
  });
});

// catch uncaught exceptions & unhandled rejections
process.on("uncaughtException", logError);
process.on("unhandledRejection", logError);
