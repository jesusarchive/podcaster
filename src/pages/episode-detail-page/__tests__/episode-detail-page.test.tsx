import { render } from '@testing-library/react';
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import podcastLookupResponseMockfrom from '@/services/podcast/__mocks__/podcast-lookup-response-mock.json';
import topPodcastsResponseMock from '@/services/podcast/__mocks__/top-podcasts-response-mock.json';
import { getWindow } from '@/utils/testing';

import EpisodeDetailPage, { episodeDetailPageLoader } from '..';

describe('<EpisodeDetailPage />', () => {
  beforeAll(() => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({})
      })
    );
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

  it('render with loader data', () => {
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

  it('render with loader data podcast value null', () => {
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

  it('render with loader data episode value null', () => {
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
