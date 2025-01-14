import { generateSidebar } from "vitepress-sidebar";

/**@type {import('vitepress').UserConfig<import('vitepress').DefaultTheme.Config>} */
const vitepressConfig = {
  title: "Devstream Typescript Client",
  base: "/client/",
  themeConfig: {
    nav: [{ text: "Home", link: "/" }],
    sidebar: generateSidebar({
      hyphenToSpace: true,
      underscoreToSpace: true,
      capitalizeFirst: true,
      capitalizeEachWords: true,
      collapsed: true,
      collapseDepth: 2,
    }),
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/adityamayukhsom/devstream",
      },
    ],
  },
  vite: {
    build: {
      reportCompressedSize: true,
      // rollupOptions: {
      // output: {
      // esModule: true,
      // entryFileNames: `assets/[name].js`,
      // chunkFileNames: `[name].js`,
      // assetFileNames: `[name].[ext]`,
      // },
      // },
    },
  },
};

export default vitepressConfig;
