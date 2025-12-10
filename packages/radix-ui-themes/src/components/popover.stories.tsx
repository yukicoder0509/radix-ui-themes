import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, screen } from '@storybook/test';
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
  play: async ({ canvas }) => {
    // Check that the trigger button is rendered
    const button = canvas.getByRole('button', { name: /open popover/i });
    await expect(button).toBeInTheDocument();

    // Click the trigger to open the popover
    await userEvent.click(button);

    // Check that popover content is displayed
    const popoverTitle = screen.getByText(/popover title/i);
    await expect(popoverTitle).toBeInTheDocument();

    const contentText = screen.getByText(/this is the popover content/i);
    await expect(contentText).toBeInTheDocument();
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', { name: /small popover/i });
    await expect(button).toBeInTheDocument();

    await userEvent.click(button);

    const content = screen.getByText(/compact popover content/i);
    await expect(content).toBeInTheDocument();
  },
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
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /medium popover/i });
    await expect(button).toBeInTheDocument();

    await userEvent.click(button);

    const contentText = screen.getByText(/standard popover content/i);
    await expect(contentText).toBeInTheDocument();
  },
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
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /large popover/i });
    await expect(button).toBeInTheDocument();

    await userEvent.click(button);

    const contentText = screen.getByText(/large popover content with more space/i);
    await expect(contentText).toBeInTheDocument();
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', { name: /extra large popover/i });
    await expect(button).toBeInTheDocument();

    await userEvent.click(button);

    const contentText = screen.getByText(/extra large popover content with even more space/i);
    await expect(contentText).toBeInTheDocument();
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const openButton = canvas.getByRole('button', { name: /open with close button/i });
    await userEvent.click(openButton);

    const closeButton = screen.getByRole('button', { name: /^close$/i });
    await expect(closeButton).toBeInTheDocument();

    await userEvent.click(closeButton);

    // Wait for close animation
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', { name: /custom width/i });
    await userEvent.click(button);

    const content = screen.getByText(/custom width of 300px/i);
    await expect(content).toBeInTheDocument();
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', { name: /custom max width/i });
    await userEvent.click(button);

    const content = screen.getByText(/custom max width of 200px/i);
    await expect(content).toBeInTheDocument();
  },
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
            Settings Popover
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const openButton = canvas.getByRole('button', { name: /rich content/i });
    await userEvent.click(openButton);

    // Check all rich content elements are present
    const settingsTitle = screen.getByText(/settings popover/i);
    await expect(settingsTitle).toBeInTheDocument();

    const notificationsOption = screen.getByText(/enable notifications/i);
    await expect(notificationsOption).toBeInTheDocument();

    const darkModeOption = screen.getByText(/dark mode/i);
    await expect(darkModeOption).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await expect(cancelButton).toBeInTheDocument();

    const saveButton = screen.getByRole('button', { name: /save/i });
    await expect(saveButton).toBeInTheDocument();

    // Click save to close
    await userEvent.click(saveButton);

    // Wait for close animation
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
};
