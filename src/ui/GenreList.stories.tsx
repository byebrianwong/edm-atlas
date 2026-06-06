import type { Meta, StoryObj } from "@storybook/react-vite";
import GenreList from "./GenreList";

/**
 * The 2D fallback view: all 31 genres as cards, grouped by family. This is the
 * no-WebGL / accessible / crawlable path — keyboard navigable and full of real
 * text content. Selecting a card opens the same {@link DetailPanel} the 3D atlas
 * uses (see the **List Experience** story for that wired together).
 */
const meta = {
  title: "Overview/Genre List",
  component: GenreList,
  parameters: {
    layout: "fullscreen",
    atlas: { view: "list" },
    docs: {
      description: {
        component:
          "Renders whenever WebGL is unavailable or the user toggles to List. " +
          "Every family is a section; every genre is a focusable card.",
      },
    },
  },
} satisfies Meta<typeof GenreList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
