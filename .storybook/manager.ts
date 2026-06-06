import { addons } from "storybook/manager-api";
import theme from "./theme";

// Apply the EDM Atlas dark theme to the Storybook UI (sidebar, toolbar, addons).
addons.setConfig({ theme });
