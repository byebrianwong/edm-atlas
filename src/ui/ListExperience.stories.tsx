import type { Meta, StoryObj } from "@storybook/react-vite";
import Brand from "./Brand";
import SearchBox from "./SearchBox";
import ViewToggle from "./ViewToggle";
import GenreList from "./GenreList";
import DetailPanel from "./DetailPanel";

/**
 * The complete no-WebGL experience, wired together exactly as `App` composes it
 * for the list view: brand, search, the Atlas/List toggle, the genre grid, and
 * the detail panel. Everything is interactive — search with `/`, click a card to
 * open a genre, follow its "Connects to" chips, close with `Esc`.
 */
const meta = {
  title: "Overview/List Experience",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A page-level composition (not a single component) showing how the HUD " +
          "pieces and the detail panel work together in the accessible list view.",
      },
    },
  },
  render: () => (
    <>
      <Brand />
      <SearchBox />
      <ViewToggle />
      <GenreList />
      <DetailPanel />
    </>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The grid as you first land on it. Try the search trigger or a genre card. */
export const Browse: Story = {
  parameters: { atlas: { view: "list" } },
};

/** A genre already open — the detail panel floats over the grid. */
export const GenreOpen: Story = {
  parameters: { atlas: { view: "list", selectedId: "dnb" } },
};
