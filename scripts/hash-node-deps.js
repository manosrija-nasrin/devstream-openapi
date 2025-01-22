// "./package.json";
const FILEPATH = process.argv[2];
if (!FILEPATH) {
  console.error("Error: File path argument is required.");
  console.error("Usage: node ./scripts/hash-root-node-deps.js <path-to-package.json>");
  process.exit(1);
}

const crypto = require("crypto");
const fs = require("fs");
const packageJSON = JSON.parse(fs.readFileSync(FILEPATH, "utf8"));
const { dependencies = {}, devDependencies = {} } = packageJSON;
const hash = crypto.createHash("sha256");
hash.update(JSON.stringify(dependencies));
// hash.update(JSON.stringify(devDependencies));
const digest = hash.digest("hex");
console.log(digest);
