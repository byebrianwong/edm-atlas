import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent, expect } from "storybook/test";
import SearchBox from "./SearchBox";

/**
 * Search-and-fly. Collapsed it's a pill in the top center; pressing `/`
 * (or clicking it) opens a field that filters the 31 genres by name or family.
 * `Enter` selects the top hit, `Esc` closes.
 */
const meta = {
  title: "HUD/Search",
  component: SearchBox,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Top-center overlay. Results are capped at seven and show each genre's " +
          "family dot + short label.",
      },
    },
  },
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The resting state: a compact pill with the `/` shortcut hint. */
export const Collapsed: Story = {};

/** Opened and focused, awaiting a query. */
export const Open: Story = {
  parameters: { atlas: { searchOpen: true } },
};

/** Opened with a query typed in, showing live results. */
export const WithResults: Story = {
  parameters: { atlas: { searchOpen: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByPlaceholderText(/Search genres/i);
    await userEvent.type(input, "house", { delay: 40 });
    // The matching genres surface as a result list (capped at the top hits).
    await expect(await canvas.findByText("Deep house")).toBeInTheDocument();
  },
};
