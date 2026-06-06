import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Track } from "../data/genres";
import SpotifyEmbed from "./SpotifyEmbed";

const resolved: Track = {
  artist: "Daft Punk",
  title: "One More Time",
  spotifyId: "0DiWol3AO6WpXZgp0goxAV",
};

const unresolved: Track = {
  artist: "Frankie Knuckles",
  title: "Your Love",
  spotifyId: null,
};

/**
 * A single track player used inside the detail panel. With a resolved Spotify ID
 * it renders the official embed (full size, or `compact` for secondary tracks);
 * without one it degrades to a tasteful "open in Spotify" search link.
 */
const meta = {
  title: "Components/Spotify Embed",
  component: SpotifyEmbed,
  parameters: { layout: "centered" },
  args: { track: resolved, compact: false },
  argTypes: {
    track: { control: "object" },
    compact: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360, maxWidth: "90vw" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SpotifyEmbed>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Resolved track → the full Spotify player (152px). */
export const Resolved: Story = {};

/** Resolved track in compact form (80px) — used for the 2nd+ examples. */
export const Compact: Story = {
  args: { compact: true },
};

/** No resolved ID → a fallback link that searches Spotify for the track. */
export const Fallback: Story = {
  args: { track: unresolved },
};
