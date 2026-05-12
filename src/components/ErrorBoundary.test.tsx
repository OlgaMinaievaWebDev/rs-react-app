import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import ErrorButton from './ErrorButton';
import userEvent from '@testing-library/user-event';

describe('ErrorBoundary component', () => {
  it('renders children before error', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );
    const triggerErrorButton = screen.getByRole('button', {
      name: /trigger Error/i,
    });
    expect(triggerErrorButton).toBeInTheDocument();
  });

  it('shows fallback UI when child throws error', async () => {
    const event = userEvent.setup();
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );
    const triggerErrorButton = screen.getByRole('button', {
      name: /trigger Error/i,
    });
    await event.click(triggerErrorButton);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });
});
