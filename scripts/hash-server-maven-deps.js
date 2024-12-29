// "./build/server/spring/pom.xml";
const FILEPATH = process.argv[2];
if(!FILEPATH) {
  console.error("Error: File path argument is required.");
  console.error("Usage: node ./scripts/hash-server-maven-deps.js <path-to-pom.xml>")
  process.exit(1);
}

const fs = require("fs");
const crypto = require("crypto");
const {XMLParser} = require("fast-xml-parser");

const parser = new XMLParser({
  ignoreAttributes: true, // Ignore attributes as we only care about tags
  allowBooleanAttributes: true,
});

const pomContent = fs.readFileSync(FILEPATH, "utf-8");
const parsedXml = parser.parse(pomContent);

const hash = crypto.createHash("sha256");
const dependencies = parsedXml?.project?.dependencies?.dependency || [];

/**
 * @type {string[]}
 */
const depStrings = dependencies.map((dep) => {
  const groupId = dep.groupId || "unspecified-group";
  const artifactId = dep.artifactId || "unspecified-artifact";
  const version = dep.version || "unspecified-version";
  return `${groupId}:${artifactId}:${version}`;
});

depStrings.sort();
const parent = parsedXml?.project?.parent || {
  groupId: "",
  artifactId: "",
  version: "",
};
hash.update(`${parent.groupId}:${parent.artifactId}:${parent.version}`);
depStrings.forEach((val) => hash.update(val));
const digest = hash.digest("hex");
console.log(digest);
