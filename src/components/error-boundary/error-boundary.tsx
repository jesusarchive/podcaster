import React from 'react';
import { useRouteError } from 'react-router-dom';

import { useDocumentTitle } from '@/hooks/use-document-title';

export default function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  useDocumentTitle('Podcaster');

  return <div style={{ padding: '1rem' }}>Oops! Something went wrong.</div>;
}
