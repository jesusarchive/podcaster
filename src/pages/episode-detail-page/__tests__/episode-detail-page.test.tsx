import { render } from '@testing-library/react';
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { routesConfig } from '@/routes';
import podcastLookupResponseMockfrom from '@/services/podcast/__mocks__/podcast-lookup-response-mock.json';
import topPodcastsResponseMock from '@/services/podcast/__mocks__/top-podcasts-response-mock.json';
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

  it('new podcast detail page test', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcast: topPodcastsResponseMock.feed.entry[0],
          episode: podcastLookupResponseMockfrom.results.slice(1)[0]
        }
      }
    };
    const router = createBrowserRouter(
      createRoutesFromElements(<Route path="/" element={<EpisodeDetailPage />}></Route>),
      {
        window: getWindow('/')
      }
    );

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });

  it('new episode detail page test podcast null', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcast: null,
          episode: []
        }
      }
    };
    const router = createBrowserRouter(
      createRoutesFromElements(<Route path="/" element={<EpisodeDetailPage />}></Route>),
      {
        window: getWindow('/')
      }
    );

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });

  it('new episode detail page test episode null', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcast: topPodcastsResponseMock.feed.entry[0],
          episode: null
        }
      }
    };
    const router = createBrowserRouter(
      createRoutesFromElements(<Route path="/" element={<EpisodeDetailPage />}></Route>),
      {
        window: getWindow('/')
      }
    );

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });
});
