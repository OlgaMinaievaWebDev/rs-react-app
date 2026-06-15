import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';

afterEach(() => {
  cleanup();
});

describe('Modal', () => {
  it('renders title and children', () => {
    const { getByRole, getByText } = render(
      <Modal title="Test modal" onClose={() => undefined}>
        <p>Modal content</p>
      </Modal>
    );

    expect(getByRole('dialog', { name: 'Test modal' })).toBeTruthy();
    expect(getByText('Modal content')).toBeTruthy();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { getByRole } = render(
      <Modal title="Test modal" onClose={onClose}>
        <p>Modal content</p>
      </Modal>
    );

    await user.click(getByRole('button', { name: /close modal/i }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal title="Test modal" onClose={onClose}>
        <p>Modal content</p>
      </Modal>
    );

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { getByRole } = render(
      <Modal title="Test modal" onClose={onClose}>
        <p>Modal content</p>
      </Modal>
    );
    const backdrop = getByRole('dialog').parentElement;

    if (!backdrop) {
      throw new Error('Backdrop not found');
    }

    await user.click(backdrop);

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not call onClose when dialog content is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { getByRole } = render(
      <Modal title="Test modal" onClose={onClose}>
        <p>Modal content</p>
      </Modal>
    );

    await user.click(getByRole('dialog'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('focuses the close button when opened', () => {
    const { getByRole } = render(
      <Modal title="Test modal" onClose={() => undefined}>
        <button>First action</button>
      </Modal>
    );

    expect(document.activeElement).toBe(
      getByRole('button', { name: /close modal/i })
    );
  });

  it('keeps keyboard focus inside the modal', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <Modal title="Test modal" onClose={() => undefined}>
        <button>First action</button>
      </Modal>
    );

    const firstAction = getByRole('button', { name: /first action/i });
    const closeButton = getByRole('button', { name: /close modal/i });

    await user.keyboard('{Tab}');

    expect(document.activeElement).toBe(firstAction);

    await user.keyboard('{Shift>}{Tab}{/Shift}');

    expect(document.activeElement).toBe(closeButton);
  });
});
