import { render } from '@testing-library/react';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { getWindow } from '@/utils/testing';

import router, { routesConfig } from '..';

describe('<Router />', () => {
  it('should load index route', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcasts: [],
          episodes: []
        }
      }
    };

    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });

  it('should load podcast detail page route', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcast: {},
          episodes: []
        }
      }
    };
    const testRouter = createBrowserRouter(routesConfig, {
      window: getWindow('/podcast/1')
    });

    const { container } = render(<RouterProvider router={testRouter} />);
    expect(container).toBeTruthy();
  });

  it('should episode detail page route', () => {
    window.__staticRouterHydrationData = {
      loaderData: {
        '0': {
          podcast: {},
          episodes: []
        }
      }
    };
    const testRouter = createBrowserRouter(routesConfig, {
      window: getWindow('/podcast/1/episode/1')
    });

    const { container } = render(<RouterProvider router={testRouter} />);
    expect(container).toBeTruthy();
  });
});
