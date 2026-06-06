import type { Meta, StoryObj } from "@storybook/react-vite";
import FamilyLegend from "./FamilyLegend";

/**
 * Bottom-left legend that doubles as a filter. Each chip is one of the eight
 * families; clicking it dims everything outside that family (and lights the chip
 * with its family glow), clicking again clears the filter.
 */
const meta = {
  title: "HUD/Family Legend",
  component: FamilyLegend,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Anchored bottom-left over the 3D atlas. The active chip uses its " +
          "family color for the border + glow; the rest dim to 42% opacity.",
      },
    },
  },
} satisfies Meta<typeof FamilyLegend>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No filter applied — every family at full strength. */
export const Default: Story = {};

/** A family selected: "Bass music" is lit, the others dim. */
export const Filtered: Story = {
  parameters: { atlas: { familyFilter: "Bass music" } },
};
