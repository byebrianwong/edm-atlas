import type { Preview } from "@storybook/react-vite";
import { useAtlas } from "../src/state/store";
import theme from "./theme";

// The real app's design system — tokens, typography, and every component class.
// Importing it here makes Storybook render pixel-identical to production.
import "../src/index.css";
import "../src/styles/app.css";
import "../src/styles/ui.css";

/**
 * The atlas store's data fields at their initial values. `beforeEach` resets to
 * these in merge mode (so the store's action methods survive) and then layers on
 * each story's `parameters.atlas` patch — giving every story a clean, declarative
 * starting state instead of leaking selection/filter state between stories.
 */
const ATLAS_DEFAULTS = {
  selectedId: null,
  hoveredId: null,
  familyFilter: null,
  introSeen: false,
  reducedMotion: false,
  webglOk: true,
  view: "atlas" as const,
  searchOpen: false,
  synthId: null,
};

const preview: Preview = {
  parameters: {
    // Most of these components are fixed-position HUD overlays, so they want the
    // full canvas. Flow components override this to "centered" per story.
    layout: "fullscreen",
    // The deep-space backdrop is painted by the decorator below; don't let the
    // backgrounds toolbar flatten it.
    backgrounds: { disable: true },
    a11y: { test: "todo" },
    docs: { theme },
    options: {
      storySort: {
        order: ["Introduction", "Overview", "HUD", "Components", "*"],
      },
    },
  },

  async beforeEach({ parameters }) {
    useAtlas.setState({ ...ATLAS_DEFAULTS, ...(parameters.atlas ?? {}) });
  },

  decorators: [
    (Story) => (
      <>
        {/* The app's body backdrop, reproduced as a full-bleed layer so every
            story sits on the real deep-space gradient regardless of layout. */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
            background: "#03040a",
            backgroundImage:
              "radial-gradient(120% 90% at 50% -10%, #0b1024 0%, transparent 55%)," +
              "radial-gradient(90% 70% at 100% 110%, #120a24 0%, transparent 60%)",
          }}
        />
        <Story />
      </>
    ),
  ],
};

export default preview;
