import { render, screen } from '@testing-library/react';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Header from '..';

describe('Header', () => {
  it('renders the header', () => {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <Header />
      }
    ]);

    const { container } = render(<RouterProvider router={router} />);
    expect(screen.getByText('Podcaster')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
