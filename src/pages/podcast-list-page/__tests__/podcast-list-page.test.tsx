import { prettyDOM, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  useLoaderData,
  useLocation
} from 'react-router-dom';

import { routesConfig } from '@/routes';
import topPodcastsResponseMock from '@/services/podcast/__mocks__/top-podcasts-response-mock.json';
import { createDeferred, getWindow } from '@/utils/testing';

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

  it('new podcast list page test', async () => {
    const dfd = createDeferred();

    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcastPromise: () => dfd.promise
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
    await dfd.resolve(topPodcastsResponseMock.feed.entry);
    // await waitFor(() => screen.getByText('TEST PODCASTS'));

    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('new podcast list page test2', async () => {
    const dfd = createDeferred();

    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          test: 'test',
          test2: () => dfd.promise
          // podcastPromise: topPodcastsResponseMock.feed.entry
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
    await dfd.resolve('test2');
    // await dfd.resolve(topPodcastsResponseMock.feed.entry);
    await waitFor(async () => await dfd.resolve('test2'));

    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('new podcast list page test3', async () => {
    const dfd = createDeferred();

    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          test: 'test',
          test2: () => dfd.promise
          // podcastPromise: topPodcastsResponseMock.feed.entry
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
    await dfd.resolve('test2');
    // await dfd.resolve(topPodcastsResponseMock.feed.entry);
    await waitFor(async () => await dfd.resolve('test2'));

    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  // it('new new podcast list page test', async () => {
  //   const dfd = createDeferred();

  //   const router = createBrowserRouter([
  //     {
  //       path: '/',
  //       element: <PodcastListPage />,
  //       loader: () => ({ podcastPromise: () => dfd.promise })
  //     }
  //   ]);

  //   const { container } = render(<RouterProvider router={router} />);
  //   await dfd.resolve(topPodcastsResponseMock.feed.entry);
  //   // await waitFor(() => screen.getByText('TEST PODCASTS'));
  //   expect(container).toBeTruthy();
  //   expect(container).toMatchSnapshot();
  // });

  it('renders fallbackElement within router contexts', async () => {
    const fooDefer = createDeferred();
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Outlet />}>
          <Route path="foo" loader={() => fooDefer.promise} element={<Foo />} />
        </Route>
      ),
      { window: getWindow('/foo') }
    );
    const { container } = render(<RouterProvider router={router} fallbackElement={<FallbackElement />} />);

    function FallbackElement() {
      const location = useLocation();

      return <p>Loading{location.pathname}</p>;
    }

    function Foo() {
      const data = useLoaderData() as { message: string };

      return <h1>Foo:{data?.message}</h1>;
    }

    function getHtml(container: HTMLElement) {
      return prettyDOM(container, undefined, {
        highlight: false,
        theme: {
          comment: null,
          content: null,
          prop: null,
          tag: null,
          value: null
        }
      });
    }

    expect(getHtml(container)).toMatchSnapshot();

    fooDefer.resolve({ message: 'From Foo Loader' });
    await waitFor(() => screen.getByText('Foo:From Foo Loader'));
    expect(getHtml(container)).toMatchSnapshot();
  });
});
