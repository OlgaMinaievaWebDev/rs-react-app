import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { useTheme } from './ThemeContext';
import { ThemeProvider } from './ThemeProvider';

function ThemeConsumer() {
  const { theme, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>{theme}</button>;
}

describe('ThemeProvider', () => {
  it('toggles between light and dark themes', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: 'light' });
    await user.click(button);
    expect(button).toHaveTextContent('dark');

    await user.click(button);
    expect(button).toHaveTextContent('light');
  });
});
