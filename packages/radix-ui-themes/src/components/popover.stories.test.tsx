import { describe, it, expect } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { composeStories } from '@storybook/react-vite';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import * as stories from './popover.stories';

// Compose all stories
const {
  Default,
  SizeOne,
  SizeTwo,
  SizeThree,
  SizeFour,
  WithClose,
  CustomWidth,
  CustomMaxWidth,
  RichContent,
} = composeStories(stories);

// Helper function to render components in browser mode
async function render(component: React.ReactElement) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(component);
  // Wait for rendering to complete
  await new Promise((resolve) => setTimeout(resolve, 0));
  return { container, root };
}

describe('Popover Stories', () => {
  describe('Default', () => {
    it('should render the trigger button', async () => {
      await render(<Default />);
      const button = page.getByRole('button', { name: /open popover/i });
      await expect.element(button).toBeInTheDocument();
    });

    it('should open popover when trigger is clicked', async () => {
      await render(<Default />);
      const button = page.getByRole('button', { name: /open popover/i });

      await userEvent.click(button);

      const popoverContent = page.getByText(/popover title/i);
      await expect.element(popoverContent).toBeInTheDocument();
    });

    it('should display popover content', async () => {
      await render(<Default />);
      const button = page.getByRole('button', { name: /open popover/i });

      await userEvent.click(button);

      const contentText = page.getByText(/this is the popover content/i);
      await expect.element(contentText).toBeInTheDocument();
    });
  });

  describe('SizeOne', () => {
    it('should render with size 1', async () => {
      await render(<SizeOne />);
      const button = page.getByRole('button', { name: /small popover/i });
      await expect.element(button).toBeInTheDocument();
    });

    it('should display compact content', async () => {
      await render(<SizeOne />);
      const button = page.getByRole('button', { name: /small popover/i });

      await userEvent.click(button);

      const content = page.getByText(/compact popover content/i);
      await expect.element(content).toBeInTheDocument();
    });
  });

  describe('SizeTwo', () => {
    it('should render with size 2', async () => {
      await render(<SizeTwo />);
      const button = page.getByRole('button', { name: /medium popover/i });
      await expect.element(button).toBeInTheDocument();
    });
  });

  describe('SizeThree', () => {
    it('should render with size 3', async () => {
      await render(<SizeThree />);
      const button = page.getByRole('button', { name: /large popover/i });
      await expect.element(button).toBeInTheDocument();
    });
  });

  describe('SizeFour', () => {
    it('should render with size 4', async () => {
      await render(<SizeFour />);
      const button = page.getByRole('button', { name: /extra large popover/i });
      await expect.element(button).toBeInTheDocument();
    });
  });

  describe('WithClose', () => {
    it('should render with close button', async () => {
      await render(<WithClose />);
      const button = page.getByRole('button', { name: /open with close button/i });

      await userEvent.click(button);

      const closeButton = page.getByRole('button', { name: /close/i });
      await expect.element(closeButton).toBeInTheDocument();
    });

    it('should close when close button is clicked', async () => {
      await render(<WithClose />);
      const openButton = page.getByRole('button', { name: /open with close button/i });

      await userEvent.click(openButton);

      const closeButton = page.getByRole('button', { name: /close/i });
      await userEvent.click(closeButton);

      // Wait a bit for the close animation
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Content should be removed from the document
      const contentElement = document.querySelector('body');
      expect(contentElement?.textContent).not.toMatch(/popover with close/i);
    });
  });

  describe('CustomWidth', () => {
    it('should render with custom width', async () => {
      await render(<CustomWidth />);
      const button = page.getByRole('button', { name: /custom width/i });

      await userEvent.click(button);

      const content = page.getByText(/custom width of 300px/i);
      await expect.element(content).toBeInTheDocument();
    });
  });

  describe('CustomMaxWidth', () => {
    it('should render with custom max width', async () => {
      await render(<CustomMaxWidth />);
      const button = page.getByRole('button', { name: /custom max width/i });

      await userEvent.click(button);

      const content = page.getByText(/custom max width of 200px/i);
      await expect.element(content).toBeInTheDocument();
    });
  });

  describe('RichContent', () => {
    it('should render rich content with multiple elements', async () => {
      await render(<RichContent />);
      const button = page.getByRole('button', { name: /rich content/i });

      await userEvent.click(button);

      const settingsTitle = page.getByText(/settings/i);
      const notificationsOption = page.getByText(/enable notifications/i);
      const darkModeOption = page.getByText(/dark mode/i);

      await expect.element(settingsTitle).toBeInTheDocument();
      await expect.element(notificationsOption).toBeInTheDocument();
      await expect.element(darkModeOption).toBeInTheDocument();
    });

    it('should render cancel and save buttons', async () => {
      await render(<RichContent />);
      const button = page.getByRole('button', { name: /rich content/i });

      await userEvent.click(button);

      const cancelButton = page.getByRole('button', { name: /cancel/i });
      const saveButton = page.getByRole('button', { name: /save/i });

      await expect.element(cancelButton).toBeInTheDocument();
      await expect.element(saveButton).toBeInTheDocument();
    });

    it('should close when save button is clicked', async () => {
      await render(<RichContent />);
      const openButton = page.getByRole('button', { name: /rich content/i });

      await userEvent.click(openButton);

      const saveButton = page.getByRole('button', { name: /save/i });
      await userEvent.click(saveButton);

      // Wait a bit for the close animation
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Content should be removed from the document
      const contentElement = document.querySelector('body');
      expect(contentElement?.textContent).not.toMatch(/settings/i);
    });
  });
});
