import { addons } from '@storybook/addons';
import theme from "./theme";

export function createManager() {
  addons.setConfig({
    theme,
  });
}

createManager();
