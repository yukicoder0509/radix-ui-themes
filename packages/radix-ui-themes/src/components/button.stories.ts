import type { Meta } from '@storybook/react-vite';
import { Button } from './button';

const meta = {
  title: 'radix-ui-themes/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;
