import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, waitForElementToBeRemoved, within, fn } from 'storybook/test';
import * as React from 'react';
import * as Dialog from './dialog';
import { Button } from './button';

const meta: Meta<typeof Dialog.Root> = {
  title: 'radix-ui-themes/Dialog',
  component: Dialog.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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

export const OpenDialog: Story = {
  render: () => {
    return (
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Edit profile</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>First Dialog</Dialog.Title>
          <Dialog.Description>
            This is the first dialog. Click the button to open the second dialog.
          </Dialog.Description>
          <Dialog.Close>
            <Button>Close</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    );
  },

  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button');
    await userEvent.click(button);

    await expect(
      screen.getByText('This is the first dialog. Click the button to open the second dialog.'),
    ).toBeInTheDocument();
  },
};

export const CloseDialog: Story = {
  render: () => {
    return (
      <Dialog.Root defaultOpen>
        <Dialog.Content>
          <Dialog.Title>First Dialog</Dialog.Title>
          <Dialog.Description>
            This is the first dialog. Click the button to close the dialog.
          </Dialog.Description>
          <Dialog.Close>
            <Button>Close</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    );
  },

  play: async ({ canvas, userEvent }) => {
    const button = screen.getByRole('button', { name: 'Close' });
    await userEvent.click(button);

    await waitForElementToBeRemoved(
      screen.queryByText('This is the first dialog. Click the button to close the dialog.'),
    );
  },
};

export const RecursiveDialog: Story = {
  render: () => {
    return (
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>First Dialog</Dialog.Title>
          <Dialog.Description>
            This is the first dialog. Click the button to open the second dialog.
          </Dialog.Description>
          <Dialog.Close>
            <Button>Close</Button>
          </Dialog.Close>
          <Dialog.Root>
            <Dialog.Trigger>
              <Button>Open Second Dialog</Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Title>Second Dialog</Dialog.Title>
              <Dialog.Description>This is the second dialog.</Dialog.Description>
              <Dialog.Close>
                <Button>Close</Button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Root>
        </Dialog.Content>
      </Dialog.Root>
    );
  },

  play: async ({ canvas, userEvent }) => {
    const firstDialogButton = canvas.getByRole('button', { name: /open dialog/i });
    await userEvent.click(firstDialogButton);

    const dialog1 = await screen.findByRole('dialog', { name: /first dialog/i });

    const secondDialogButton = within(dialog1).getByRole('button', { name: /open second dialog/i });
    await userEvent.click(secondDialogButton);

    const dialog2 = await screen.findByRole('dialog', { name: /second dialog/i });

    const closeButtonInSecond = within(dialog2).getByRole('button', { name: 'Close' });

    await expect(closeButtonInSecond).toHaveFocus();
    await expect(screen.getByText('Second Dialog')).toBeInTheDocument();
    expect(
      dialog1.compareDocumentPosition(dialog2) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  },
};
