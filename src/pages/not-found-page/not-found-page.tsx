import './not-found-page.css';

import React from 'react';

import { useDocumentTitle } from '@/hooks/use-document-title';

/**
 * Not found page
 *
 * Shows a 404 page when a route is not found.
 */
export default function NotFoundPage() {
  useDocumentTitle('Podcaster');

  return (
    <main className="not-found">
      <h1>Page not found</h1>
    </main>
  );
}
