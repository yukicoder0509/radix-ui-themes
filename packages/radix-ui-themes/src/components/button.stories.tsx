import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

const meta = {
  title: 'radix-ui-themes/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['1', '2', '3', '4'],
    },
    variant: {
      control: 'select',
      options: ['classic', 'solid', 'soft', 'surface', 'outline', 'ghost'],
    },
    radius: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large', 'full'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    children: 'Button',
    size: '2',
    variant: 'solid',
    loading: false,
    radius: 'medium',
  },
};

export const Outline: Story = {
  args: {
    ...Solid.args,
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    ...Solid.args,
    variant: 'ghost',
  },
};

export const Surface: Story = {
  args: {
    ...Solid.args,
    variant: 'surface',
  },
};

export const Soft: Story = {
  args: {
    ...Solid.args,
    variant: 'soft',
  },
};

export const Classic: Story = {
  args: {
    ...Solid.args,
    variant: 'classic',
  },
};
