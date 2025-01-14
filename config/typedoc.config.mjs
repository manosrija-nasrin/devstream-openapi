import { OptionDefaults } from "typedoc";

/**
 * @type {Partial<import('typedoc').TypeDocOptions & import('typedoc-plugin-markdown').PluginOptions>}
 */
const typedocConfig = {
  entryPoints: ["index.ts"],
  out: "docs",
  plugin: ["typedoc-plugin-markdown", "typedoc-vitepress-theme"],
  blockTags: [...OptionDefaults.blockTags, "@memberof", "@export"],
  readme: "none",
  useCodeBlocks: true,
  disableSources: true,
  suppressCommentWarningsInDeclarationFiles: true,
  expandObjects: true,
  expandParameters: true,
  flattenOutputFiles: false,
  indexFormat: "htmlTable",
  parametersFormat: "htmlTable",
  enumMembersFormat: "htmlTable",
  interfacePropertiesFormat: "htmlTable",
  classPropertiesFormat: "htmlTable",
  propertyMembersFormat: "htmlTable",
  typeDeclarationFormat: "htmlTable",
  typeDeclarationVisibility: "compact",
  sanitizeComments: true,
  useHTMLEncodedBrackets: true,
};

export default typedocConfig;
