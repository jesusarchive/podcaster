import { render } from '@testing-library/react';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PodcastDetailPage from '..';

describe('<PodcastDetailPage />', () => {
  it('renders podcast detail page', () => {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <PodcastDetailPage />
      }
    ]);

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });
});
