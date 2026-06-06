import type { Meta, StoryObj } from "@storybook/react-vite";
import { FAMILY_BY_ID } from "../data/families";
import { ATLAS_BY_ID } from "../data/atlas";
import SynthButton from "./SynthButton";

const house = ATLAS_BY_ID.house;
const houseColor = FAMILY_BY_ID[house.family].color;

/**
 * "Play the building blocks" — synthesizes a genre's signature rhythm, bass, and
 * effect with Tone.js (lazy-loaded on first press). The button cycles through
 * idle ▸ loading (spinner) ▸ playing (animated EQ bars), tinted by the genre's
 * family color.
 *
 * Pressing it really starts audio (it's the live component) — the **Playing**
 * story instead just seeds the playing state so you can see the EQ animation
 * without sound.
 */
const meta = {
  title: "Components/Synth Button",
  component: SynthButton,
  parameters: { layout: "centered" },
  args: { genreId: "house", color: houseColor },
  argTypes: {
    genreId: { control: "text" },
    color: { control: "color" },
  },
} satisfies Meta<typeof SynthButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Resting state — a play triangle and the family-tinted label. */
export const Idle: Story = {};

/** The playing state (EQ bars), seeded via the store without starting audio. */
export const Playing: Story = {
  parameters: { atlas: { synthId: "house" } },
};
