import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import topPodcastsResponseMock from '@/services/podcast/__mocks__/top-podcasts-response-mock.json';

import PodcastListPage from '..';
import { filterPodcasts } from '../helpers';

describe('<PodcastListPage />', () => {
  beforeAll(() => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({})
      })
    );
  });

  it('render with loader data', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcasts: topPodcastsResponseMock.feed.entry
        }
      }
    };
    const router = createBrowserRouter(
      createRoutesFromElements(<Route path="/" element={<PodcastListPage />}></Route>)
    );

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });

  it('render with loader data podcasts null', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcasts: null
        }
      }
    };
    const router = createBrowserRouter(
      createRoutesFromElements(<Route path="/" element={<PodcastListPage />}></Route>)
    );

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });

  it('render with loader data podcasts empty array', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcasts: []
        }
      }
    };
    const router = createBrowserRouter(
      createRoutesFromElements(<Route path="/" element={<PodcastListPage />}></Route>)
    );

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });

  it('render with loader data search changet', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcasts: topPodcastsResponseMock.feed.entry
        }
      }
    };
    const router = createBrowserRouter(
      createRoutesFromElements(<Route path="/" element={<PodcastListPage />}></Route>)
    );

    const { container, getByText } = render(<RouterProvider router={router} />);

    const input = container.querySelector('input');
    fireEvent.change(input, { target: { value: 'CounterClock' } });

    expect(getByText('CounterClock')).toBeInTheDocument();
  });

  it('render with loader data test link prevent default on navigation state loading', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcasts: topPodcastsResponseMock.feed.entry
        }
      }
    };
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<PodcastListPage />}>
          <Route path="/podcast/:id" element={<div />} loader={() => 'test'}></Route>
        </Route>
      )
    );

    const { container } = render(<RouterProvider router={router} />);

    const link = container.querySelector('a');
    fireEvent.click(link);
    fireEvent.click(link);

    expect(container).toBeTruthy();
  });

  it('filter podcasts helper should return empty array', () => {
    const results = filterPodcasts(null, 'not found');
    expect(results).toEqual([]);
  });
});
