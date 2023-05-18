import { render } from '@testing-library/react';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routesConfig } from '@/routes';
import { getWindow } from '@/utils/testing';

import PodcastDetailPage, { podcastDetailPageLoader } from '..';

// const loaders = { podcastDetailPageLoader };

// jest.spyOn(loaders, 'podcastDetailPageLoader').mockReturnValue(
//   Promise.resolve({ podcast: {}, episodes: [] }) as Promise<{
//     podcast: TopPodcastsFeedEntry;
//     episodes: Array<PodcastLookupResult>;
//   }>
// );

describe('<PodcastDetailPage />', () => {
  beforeAll(() => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({})
      })
    );
  });

  it('renders podcast detail page', () => {
    const router = createBrowserRouter(routesConfig, {
      window: getWindow('/podcast/1'),
      hydrationData: {
        loaderData: {
          podcast: {},
          episodes: []
        }
      }
    });

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });

  it('should call podcastDetailPageLoader', async () => {
    const router = createBrowserRouter(
      [
        {
          path: '/',
          element: <PodcastDetailPage />,
          loader: podcastDetailPageLoader
        }
      ],
      { window: getWindow('/') }
    );

    render(<RouterProvider router={router} />);
    expect(router).toBeTruthy();
  });
});
