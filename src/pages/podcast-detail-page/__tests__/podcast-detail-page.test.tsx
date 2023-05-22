import { render } from '@testing-library/react';
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import podcastLookupResponseMockfrom from '@/services/podcast/__mocks__/podcast-lookup-response-mock.json';
import topPodcastsResponseMock from '@/services/podcast/__mocks__/top-podcasts-response-mock.json';

import PodcastDetailPage, { podcastDetailPageLoader } from '..';

describe('<PodcastDetailPage />', () => {
  beforeAll(() => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({})
      })
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should call podcastDetailPageLoader', async () => {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <PodcastDetailPage />,
        loader: podcastDetailPageLoader
      }
    ]);

    render(<RouterProvider router={router} />);
    expect(router).toBeTruthy();
  });

  it('render with loader data', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcast: topPodcastsResponseMock.feed.entry[0],
          episodes: podcastLookupResponseMockfrom.results.slice(1)
        }
      }
    };
    const router = createBrowserRouter(
      createRoutesFromElements(<Route path="/" element={<PodcastDetailPage />}></Route>)
    );

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });

  it('render with loader data podcast value null', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcast: null,
          episodes: []
        }
      }
    };
    const router = createBrowserRouter(
      createRoutesFromElements(<Route path="/" element={<PodcastDetailPage />}></Route>)
    );

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });

  it('render with loader data episodes value empty array', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcast: topPodcastsResponseMock.feed.entry[0],
          episodes: []
        }
      }
    };
    const router = createBrowserRouter(
      createRoutesFromElements(<Route path="/" element={<PodcastDetailPage />}></Route>)
    );

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });
});
