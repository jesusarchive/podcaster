/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { ThemeProvider, useTheme } from '../theme-context';

function TestComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={theme}>
      <div>{theme}</div>
      <button onClick={() => toggleTheme()}>Toggle theme</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  it('should render children', () => {
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should toggle theme', async () => {
    const { container } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('light')).toBeInTheDocument();
    screen.getByRole('button').click();
    await waitFor(() => {
      expect(screen.getByText('dark')).toBeInTheDocument();
      expect(container.firstChild).toHaveClass('dark');
    });

    expect(screen.getByText('dark')).toBeInTheDocument();
    screen.getByRole('button').click();
    await waitFor(() => {
      expect(screen.getByText('light')).toBeInTheDocument();
      expect(container.firstChild).toHaveClass('light');
    });
  });

  it('should throw error if used outside of ThemeProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrowError('useTheme must be used within a ThemeProvider');

    spy.mockRestore();
  });
});
