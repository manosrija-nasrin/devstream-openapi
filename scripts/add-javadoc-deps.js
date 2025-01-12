const fs = require("fs");
const path = require("path");
const { XMLParser, XMLBuilder } = require("fast-xml-parser");

/**
 * @param {any} obj
 */
function isPlainObject(obj) {
  return typeof obj === "object" && obj !== null && obj.constructor === Object;
}

function arePluginsSame(plugin_1, plugin_2, checkVersion = false) {
  if (
    plugin_1.groupId === plugin_2.groupId &&
    plugin_1.artifactId === plugin_2.artifactId &&
    (!checkVersion || (checkVersion && plugin_1.version === plugin_2.version))
  ) {
    return true;
  }
  return false;
}

/**
 * @param {fs.PathOrFileDescriptor} pomPath
 */
function addJavadocPlugin(pomPath) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    allowBooleanAttributes: true,
  });

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    format: true,
    indentBy: "    ",
    suppressEmptyNode: true,
  });

  try {
    const xmlData = fs.readFileSync(pomPath, "utf-8");
    const pom = parser.parse(xmlData);

    pom.project = pom.project ?? {};
    pom.project.build = pom.project.build ?? {};
    pom.project.build.plugins = pom.project.build.plugins ?? {};
    pom.project.build.plugins.plugin = pom.project.build.plugins.plugin ?? [];

    if (isPlainObject(pom.project.build.plugins.plugin)) {
      // if the plugins contain only one plugin, it is considered as an object
      // hence we need to map that into an array containing only a single object
      pom.project.build.plugins.plugin = [pom.project.build.plugins.plugin];
    }

    const javadocPluginGroupId = "org.apache.maven.plugins";
    const javadocPluginArtifactId = "maven-javadoc-plugin";
    const javadocPluginVersion = "3.6.0";

    const javadocPlugin = {
      groupId: javadocPluginGroupId,
      artifactId: javadocPluginArtifactId,
      version: javadocPluginVersion,
      executions: {
        execution: {
          id: "attach-javadocs",
          goals: {
            goal: "jar",
          },
        },
      },
    };

    // Check if the plugin already exists
    const pluginExists = pom.project.build.plugins.plugin.some((p) => {
      const isSame = arePluginsSame(p, javadocPlugin);
      if (isSame) {
        const MsgAlreadyPresent = `${javadocPlugin.groupId}:${javadocPlugin.artifactId} already present, skipping`;
        console.log(MsgAlreadyPresent);
      }
      return isSame;
    });

    if (!pluginExists) {
      pom.project.build.plugins.plugin.push(javadocPlugin);
      const updatedXml = builder.build(pom);
      fs.writeFileSync(pomPath, updatedXml);
      console.log("Javadoc plugin added to pom.xml");
    }
  } catch (error) {
    console.error("Error adding Javadoc plugin:", error);
  }
}

function main() {
  // "./build/server/spring/pom.xml";
  const FILEPATH = process.argv[2];

  if (!FILEPATH) {
    console.error("Error: File path argument is required.");
    const MsgUsageString = "Usage: node ./scripts/hash-server-maven-deps.js <path-to-pom.xml>";
    console.error(MsgUsageString);
    process.exit(1);
  }

  const pomPath = path.resolve(FILEPATH);
  addJavadocPlugin(pomPath);
}

main();
