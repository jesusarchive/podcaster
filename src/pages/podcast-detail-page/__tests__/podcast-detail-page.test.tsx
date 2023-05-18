import { render } from '@testing-library/react';
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { routesConfig } from '@/routes';
import podcastLookupResponseMockfrom from '@/services/podcast/__mocks__/podcast-lookup-response-mock.json';
import topPodcastsResponseMock from '@/services/podcast/__mocks__/top-podcasts-response-mock.json';
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

  it('new podcast detail page test', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcast: topPodcastsResponseMock.feed.entry[0],
          episodes: podcastLookupResponseMockfrom.results.slice(1)
        }
      }
    };
    const router = createBrowserRouter(
      createRoutesFromElements(<Route path="/" element={<PodcastDetailPage />}></Route>),
      {
        window: getWindow('/')
      }
    );

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });

  it('new podcast detail page test podcast null', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcast: null,
          episodes: []
        }
      }
    };
    const router = createBrowserRouter(
      createRoutesFromElements(<Route path="/" element={<PodcastDetailPage />}></Route>),
      {
        window: getWindow('/')
      }
    );

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });

  it('new podcast detail page test episodes empty', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcast: topPodcastsResponseMock.feed.entry[0],
          episodes: []
        }
      }
    };
    const router = createBrowserRouter(
      createRoutesFromElements(<Route path="/" element={<PodcastDetailPage />}></Route>),
      {
        window: getWindow('/')
      }
    );

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });
});
