const propFilter = require("./utils/prop-filter");

/** @type {import("@storybook/core-common").StorybookConfig} */
const config = {
  stories: [],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],

  /* Enables extraction of properties from external libraries */
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter,
    },
  },
};

module.exports = config;
