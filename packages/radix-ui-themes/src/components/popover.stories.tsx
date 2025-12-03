import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import * as Popover from './popover';
import { Button } from './button';
import { Flex } from './flex';
import { Text } from './text';
import { Box } from './box';

const meta: Meta<typeof Popover.Content> = {
  title: 'radix-ui-themes/Popover',
  component: Popover.Content,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['1', '2', '3', '4'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '3rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: '2',
  },
  render: (args) => (
    <Popover.Root>
      <Popover.Trigger>
        <Button>Open Popover</Button>
      </Popover.Trigger>
      <Popover.Content {...args}>
        <Flex direction="column" gap="3">
          <Text size="2" weight="bold">
            Popover Title
          </Text>
          <Text size="2">This is the popover content. You can add any content here.</Text>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  ),
};

export const SizeOne: Story = {
  args: {
    ...Default.args,
    size: '1',
  },
  render: (args) => (
    <Popover.Root>
      <Popover.Trigger>
        <Button size="1">Small Popover</Button>
      </Popover.Trigger>
      <Popover.Content {...args}>
        <Text size="1">Compact popover content.</Text>
      </Popover.Content>
    </Popover.Root>
  ),
};

export const SizeTwo: Story = {
  args: {
    ...Default.args,
    size: '2',
  },
  render: (args) => (
    <Popover.Root>
      <Popover.Trigger>
        <Button size="2">Medium Popover</Button>
      </Popover.Trigger>
      <Popover.Content {...args}>
        <Text size="2">Standard popover content.</Text>
      </Popover.Content>
    </Popover.Root>
  ),
};

export const SizeThree: Story = {
  args: {
    ...Default.args,
    size: '3',
  },
  render: (args) => (
    <Popover.Root>
      <Popover.Trigger>
        <Button size="3">Large Popover</Button>
      </Popover.Trigger>
      <Popover.Content {...args}>
        <Text size="3">Large popover content with more space.</Text>
      </Popover.Content>
    </Popover.Root>
  ),
};

export const SizeFour: Story = {
  args: {
    ...Default.args,
    size: '4',
  },
  render: (args) => (
    <Popover.Root>
      <Popover.Trigger>
        <Button size="4">Extra Large Popover</Button>
      </Popover.Trigger>
      <Popover.Content {...args}>
        <Text size="4">Extra large popover content with even more space.</Text>
      </Popover.Content>
    </Popover.Root>
  ),
};

export const WithClose: Story = {
  args: {
    ...Default.args,
    size: '2',
  },
  render: (args) => (
    <Popover.Root>
      <Popover.Trigger>
        <Button>Open with Close Button</Button>
      </Popover.Trigger>
      <Popover.Content {...args}>
        <Flex direction="column" gap="3">
          <Text size="2" weight="bold">
            Popover with Close
          </Text>
          <Text size="2">This popover has a close button.</Text>
          <Popover.Close>
            <Button size="1" variant="soft">
              Close
            </Button>
          </Popover.Close>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  ),
};

export const CustomWidth: Story = {
  args: {
    ...Default.args,
    size: '2',
    width: '300px',
  },
  render: (args) => (
    <Popover.Root>
      <Popover.Trigger>
        <Button>Custom Width</Button>
      </Popover.Trigger>
      <Popover.Content {...args}>
        <Text size="2">This popover has a custom width of 300px.</Text>
      </Popover.Content>
    </Popover.Root>
  ),
};

export const CustomMaxWidth: Story = {
  args: {
    ...Default.args,
    size: '2',
    maxWidth: '200px',
  },
  render: (args) => (
    <Popover.Root>
      <Popover.Trigger>
        <Button>Custom Max Width</Button>
      </Popover.Trigger>
      <Popover.Content {...args}>
        <Text size="2">
          This popover has a custom max width of 200px. The content will wrap when it exceeds this
          width.
        </Text>
      </Popover.Content>
    </Popover.Root>
  ),
};

export const RichContent: Story = {
  args: {
    ...Default.args,
    size: '2',
  },
  render: (args) => (
    <Popover.Root>
      <Popover.Trigger>
        <Button>Rich Content</Button>
      </Popover.Trigger>
      <Popover.Content {...args}>
        <Flex direction="column" gap="3">
          <Text size="2" weight="bold">
            Settings
          </Text>
          <Box>
            <Text size="2">Enable notifications</Text>
          </Box>
          <Box>
            <Text size="2">Dark mode</Text>
          </Box>
          <Flex gap="2" justify="end">
            <Popover.Close>
              <Button size="1" variant="soft">
                Cancel
              </Button>
            </Popover.Close>
            <Popover.Close>
              <Button size="1" variant="solid">
                Save
              </Button>
            </Popover.Close>
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  ),
};
