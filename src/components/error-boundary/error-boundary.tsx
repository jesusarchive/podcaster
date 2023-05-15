import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return <div style={{ padding: '1rem' }}>Oops! Something went wrong.</div>;
}
