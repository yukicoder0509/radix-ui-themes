import type { Preview } from '@storybook/react-vite';
// import '../packages/radix-ui-themes/src/styles/index.css';
// import '../packages/radix-ui-themes/styles.css';
// import { Theme } from '../packages/radix-ui-themes/src/components/theme';
import * as React from 'react';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        style={{
          maxHeight: '10vh',
        }}
      >
        {/* <Theme> */}
        <Story />
        {/* </Theme> */}
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
