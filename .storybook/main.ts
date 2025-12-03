import type { StorybookConfig } from '@storybook/react-vite';

import { dirname } from 'path';

import { fileURLToPath } from 'url';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
const config: StorybookConfig = {
  stories: [
    {
      directory: '../stories',
      files: '**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)',
      titlePrefix: 'Examples',
    },
    {
      // Sets the base directory (relative to .storybook/)
      directory: '../packages/radix-ui-themes/src/components',

      // Storybook will find all files matching this glob inside the directory
      files: '**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)',

      // Automatically groups all these stories under 'Radix Theme' in the sidebar
      titlePrefix: 'Radix Theme',
    },
  ],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-vitest'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
};
export default config;
