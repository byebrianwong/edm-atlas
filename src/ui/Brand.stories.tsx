import type { Meta, StoryObj } from "@storybook/react-vite";
import Brand from "./Brand";

/**
 * Top-left wordmark with the eight-point star mark. Clicking it clears the
 * current selection and family filter — i.e. returns to the overview.
 */
const meta = {
  title: "HUD/Brand",
  component: Brand,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Brand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
