import { render } from '@testing-library/react';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routesConfig } from '@/routes';
import { getWindow } from '@/utils/testing';

import EpisodeDetailPage, { episodeDetailPageLoader } from '..';

// const loaders = { episodeDetailPageLoader };

// jest.spyOn(loaders, 'episodeDetailPageLoader').mockReturnValue(
//   Promise.resolve({ podcast: {}, episode: {} }) as Promise<{
//     podcast: TopPodcastsFeedEntry;
//     episode: PodcastLookupResult;
//   }>
// );

describe('<EpisodeDetailPage />', () => {
  beforeAll(() => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({})
      })
    );
  });

  it('renders episode detail page', () => {
    const router = createBrowserRouter(routesConfig, {
      window: getWindow('/podcast/1/episode/1'),
      hydrationData: {
        loaderData: {
          podcast: {},
          episode: {}
        }
      }
    });
    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });

  it('should call episodeDetailPageLoader', async () => {
    const router = createBrowserRouter(
      [
        {
          path: '/',
          element: <EpisodeDetailPage />,
          loader: episodeDetailPageLoader
        }
      ],
      { window: getWindow('/') }
    );

    render(<RouterProvider router={router} />);
    expect(router).toBeTruthy();
  });
});
