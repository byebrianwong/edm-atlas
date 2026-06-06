import type { Meta, StoryObj } from "@storybook/react-vite";
import Intro from "./Intro";

/**
 * The first-load welcome overlay. It explains the controls and fades out when
 * the visitor hits "Enter the atlas" (or selects their first star). Once
 * `introSeen` flips true it renders nothing.
 */
const meta = {
  title: "HUD/Intro Overlay",
  component: Intro,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Gated on `store.introSeen`. Clicking the CTA in this story dismisses " +
          "it for real — reload the story to see it again.",
      },
    },
  },
} satisfies Meta<typeof Intro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { atlas: { introSeen: false } },
};
