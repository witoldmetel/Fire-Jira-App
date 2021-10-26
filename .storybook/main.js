// @todo: Check https://storybook.js.org/blog/storybook-for-vite/
const path = require('path');

module.exports = {
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    config.resolve.modules = [...(config.resolve.modules || []), path.resolve('./')];

    // return the customized config
    return config;
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials']
};
