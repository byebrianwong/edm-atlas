import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  // Stories live next to the components they document.
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    // Autodocs + the docs tab.
    "@storybook/addon-docs",
    // Accessibility checks — the atlas leans hard on keyboard/SR support, so
    // surface a11y violations right in the toolbar.
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    // Pull prop tables straight from the component TS types for the docs tab.
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;
