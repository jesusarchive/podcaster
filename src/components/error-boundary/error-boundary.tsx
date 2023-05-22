import './error-boundary.css';

import React from 'react';
import { useRouteError } from 'react-router-dom';

/**
 * Error boundary component
 *
 * Used with react-router-dom errorElement prop to display a fallback UI when a route fails to load.
 *
 * @see https://reactrouter.com/en/6.11.1/route/error-element
 */
export default function ErrorBoundary() {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div>
      <h1>Uh oh, something went terribly wrong 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = '/')}>Click here to reload the app</button>
    </div>
  );
}
