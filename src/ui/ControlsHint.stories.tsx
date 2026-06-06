import type { Meta, StoryObj } from "@storybook/react-vite";
import ControlsHint from "./ControlsHint";

/**
 * The subtle bottom-center "drag / scroll / click" hint. It only appears after
 * the intro is dismissed and before the first genre is opened, so it needs
 * `introSeen: true` and `selectedId: null` to show.
 */
const meta = {
  title: "HUD/Controls Hint",
  component: ControlsHint,
  parameters: {
    layout: "fullscreen",
    atlas: { introSeen: true, selectedId: null },
  },
} satisfies Meta<typeof ControlsHint>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
