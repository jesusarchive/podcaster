// test error boundary component used inside router errorElement

import { render } from '@testing-library/react';
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import ErrorBoundary from '..';

describe('<ErrorBoundary />', () => {
  it('renders error boundary', () => {
    window.__staticRouterHydrationData = {
      errors: {
        '0': {
          status: 404,
          statusText: 'Not Found',
          internal: false,
          data: { not: 'found' },
          __type: 'RouteErrorResponse'
        }
      }
    };

    const router = createBrowserRouter(
      createRoutesFromElements(<Route path="/" element={<h1>Nope</h1>} errorElement={<ErrorBoundary />} />)
    );

    render(<RouterProvider router={router} />);
    expect(router).toBeTruthy();
  });

  it('should reload page', () => {
    window.__staticRouterHydrationData = {
      errors: {
        '0': {
          status: 404,
          statusText: 'Not Found',
          internal: false,
          data: { not: 'found' },
          __type: 'RouteErrorResponse'
        }
      }
    };

    const router = createBrowserRouter(
      createRoutesFromElements(<Route path="/" element={<h1>Nope</h1>} errorElement={<ErrorBoundary />} />)
    );

    const { getByText } = render(<RouterProvider router={router} />);
    const button = getByText('Click here to reload the app');
    button.click();
    expect(window.location.pathname).toBe('/');
  });
});
