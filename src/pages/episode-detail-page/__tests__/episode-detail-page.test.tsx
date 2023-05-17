import { render } from '@testing-library/react';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import EpisodeDetailPage from '..';

describe('<EpisodeDetailPage />', () => {
  it('renders episode detail page', () => {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <EpisodeDetailPage />
      }
    ]);

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });
});
