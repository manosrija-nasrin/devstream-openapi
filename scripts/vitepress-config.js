const fs = require("fs");
const path = require("path");
// const vitepress = require("vitepress");

const BasePath = "./build/client/typescript/docs/.vitepress";
const SidebarJSONPathString = "../typedoc-sidebar.json";
const VitepressConfigPathString = "./config.mts";
const configFilePath = path.resolve(path.join(process.cwd(), BasePath, VitepressConfigPathString));
// const SidebarJSONPath = path.resolve(path.join(process.cwd(), BasePath, SidebarJSONPathString));
// const sidebarContent = fs.readFileSync(SidebarJSONPath, "utf-8");
// const typedocSidebar = JSON.parse(sidebarContent);

// /**@type {vitepress.UserConfig<vitepress.DefaultTheme.Config>} */
const configObject = `{
  title: "Devstream Typescript Client",
  themeConfig: {
    nav: [{ text: "Home", link: "/" }],
    sidebar: [
      {
        text: "API",
        items: typedocSidebar,
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/adityamayukhsom/devstream",
      },
    ],
  },
}`;

// Stringify the config object for writing
const configContent = `import { defineConfig } from "vitepress";
import typedocSidebar from "${SidebarJSONPathString}";

export default defineConfig(${configObject});
`;

// Ensure directories exist
fs.mkdir(path.dirname(configFilePath), { recursive: true }, (err) => {
  if (err) {
    console.error("Error creating directories:", err);
    process.exit(1);
  }

  // Write the content to the file
  fs.writeFile(configFilePath, configContent, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      process.exit(1);
    }

    console.log("File successfully written to", configFilePath);
  });
});
