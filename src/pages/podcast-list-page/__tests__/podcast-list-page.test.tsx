import { render } from '@testing-library/react';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PodcastListPage from '@/pages/episode-detail-page';

describe('<PodcastListPage />', () => {
  it('renders podcast list page', () => {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <PodcastListPage />
      }
    ]);

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });
});
