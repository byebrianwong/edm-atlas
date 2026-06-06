import type { Meta, StoryObj } from "@storybook/react-vite";
import ViewToggle from "./ViewToggle";

/**
 * The Atlas ⇄ List switch (top-right). When WebGL is unavailable the Atlas
 * option is disabled and the app stays on the accessible list view.
 */
const meta = {
  title: "HUD/View Toggle",
  component: ViewToggle,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Reflects and drives `store.view`. The Atlas button is disabled when " +
          "`webglOk` is false.",
      },
    },
  },
} satisfies Meta<typeof ViewToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The 3D atlas is active (the default). */
export const AtlasActive: Story = {
  parameters: { atlas: { view: "atlas" } },
};

/** The list view is active. */
export const ListActive: Story = {
  parameters: { atlas: { view: "list" } },
};

/** No WebGL: the Atlas option is disabled and greyed out. */
export const WebGLUnavailable: Story = {
  parameters: { atlas: { view: "list", webglOk: false } },
};
