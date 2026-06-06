import type { Meta, StoryObj } from "@storybook/react-vite";
import DetailPanel from "./DetailPanel";

/**
 * The right-hand detail panel — the heart of the atlas. It opens when a genre is
 * selected and renders that genre's family chip, BPM, the "why it sounds like
 * this" line, signature elements, two Spotify players, the synth "building
 * blocks" demo, and chips for every connected genre.
 *
 * Each story below just seeds `selectedId` in the store via `parameters.atlas`;
 * the panel reads it like it does in the real app. The **Connects to** chips are
 * live — click one to fly to that genre without leaving the story.
 */
const meta = {
  title: "Overview/Detail Panel",
  component: DetailPanel,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Selecting a star (or a genre card in the list view) opens this panel. " +
          "Press `Esc`, the close button, or the brand mark to dismiss it. The " +
          '"Connects to" chips re-select live, so you can wander the graph from here.',
      },
    },
  },
} satisfies Meta<typeof DetailPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The genre at the center of the map — cyan House, six connections, an anchor. */
export const House: Story = {
  parameters: { atlas: { selectedId: "house" } },
};

/** A sparse, hypnotic genre — purple Techno with just a few cross-family links. */
export const Techno: Story = {
  parameters: { atlas: { selectedId: "techno" } },
};

/** Pink "Bass music" family — halftime wobble at 140 BPM. */
export const Dubstep: Story = {
  parameters: { atlas: { selectedId: "dubstep" } },
};

/** An edge of the atlas — indigo Retro, the smallest cluster. */
export const Synthwave: Story = {
  parameters: { atlas: { selectedId: "synthwave" } },
};
