import type { Meta, StoryObj } from "@storybook/react-vite";
import AtlasLoading from "./AtlasLoading";

/**
 * The pulsing-star loader shown while the heavy 3D scene chunk (three / r3f /
 * drei / postprocessing) streams in behind the intro.
 */
const meta = {
  title: "HUD/Atlas Loading",
  component: AtlasLoading,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AtlasLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
