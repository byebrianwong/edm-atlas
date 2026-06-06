import { create } from "storybook/theming/create";

/**
 * Storybook chrome themed to the EDM Atlas design system (see src/index.css):
 * near-black space canvas, neon-cyan primary, glass borders, Inter + JetBrains
 * Mono. Used by both the manager (manager.ts) and the docs pages (preview.tsx).
 */
export default create({
  base: "dark",

  brandTitle: "EDM Atlas — Component Library",
  brandUrl: "/",
  brandTarget: "_self",

  // space + ink
  appBg: "#05060a",
  appContentBg: "#070a12",
  appPreviewBg: "#03040a",
  appBorderColor: "rgba(150, 180, 255, 0.16)",
  appBorderRadius: 12,

  // neon family accents
  colorPrimary: "#22d3ee",
  colorSecondary: "#8ea2ff",

  textColor: "#eaeefb",
  textInverseColor: "#05060a",
  textMutedColor: "rgba(234, 238, 251, 0.5)",

  // top + tool bars
  barBg: "#070a12",
  barTextColor: "rgba(234, 238, 251, 0.66)",
  barSelectedColor: "#22d3ee",
  barHoverColor: "#8ea2ff",

  // inputs
  inputBg: "rgba(11, 15, 27, 0.66)",
  inputBorder: "rgba(150, 180, 255, 0.16)",
  inputTextColor: "#eaeefb",
  inputBorderRadius: 8,

  fontBase: '"Inter", system-ui, -apple-system, sans-serif',
  fontCode: '"JetBrains Mono", ui-monospace, "SF Mono", monospace',
});
