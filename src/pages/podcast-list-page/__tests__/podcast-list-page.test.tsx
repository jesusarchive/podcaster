import { render } from '@testing-library/react';
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { routesConfig } from '@/routes';
import topPodcastsResponseMock from '@/services/podcast/__mocks__/top-podcasts-response-mock.json';
import { getWindow } from '@/utils/testing';

import { filterPodcasts } from '../helpers';
import PodcastListPage from '../podcast-list-page';

describe('<PodcastListPage />', () => {
  beforeAll(() => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({})
      })
    );
  });

  it('renders podcast list page', async () => {
    const router = createBrowserRouter(routesConfig, {
      window: getWindow('/'),
      hydrationData: {
        loaderData: {
          podcastPromise: []
        }
      }
    });

    const { container } = render(<RouterProvider router={router} />);

    expect(container).toBeTruthy();
  });

  it('should filter podcasts', () => {
    const podcasts = topPodcastsResponseMock.feed.entry;
    const result = filterPodcasts(podcasts, 'counterclock');
    expect(result).toEqual([podcasts[0]]);
  });

  it('should return all podcasts', () => {
    const podcasts = topPodcastsResponseMock.feed.entry;
    const result = filterPodcasts(podcasts, '');
    expect(result).toEqual(podcasts);
  });

  it('renders', () => {
    window.__staticRouterHydrationData = {
      loaderData: { hello: 'world' }
    };

    const router = createBrowserRouter(createRoutesFromElements(<Route path="/" element={<PodcastListPage />} />));

    render(<RouterProvider router={router} />);
    expect(router).toBeTruthy();
  });

  it('new podcast list page test', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcastPromise: Promise.resolve(topPodcastsResponseMock.feed.entry)
        }
      }
    };
    const router = createBrowserRouter(
      createRoutesFromElements(<Route path="/" element={<PodcastListPage />}></Route>),
      {
        window: getWindow('/')
      }
    );
    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });
});
