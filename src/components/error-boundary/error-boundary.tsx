import React from 'react';
import { useRouteError } from 'react-router-dom';

import { useDocumentTitle } from '@/hooks/use-document-title';

/**
 * Error boundary component
 *
 * Used with react-router-dom errorElement prop to display a fallback UI when a route fails to load.
 *
 * @see https://reactrouter.com/en/6.11.1/route/error-element
 */
export default function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  useDocumentTitle('Podcaster');

  return <div style={{ padding: '1rem' }}>Oops! Something went wrong.</div>;
}
