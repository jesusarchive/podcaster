import './not-found-page.css';

import React from 'react';

import { useDocumentTitle } from '@/hooks/use-document-title';

export default function NotFoundPage() {
  useDocumentTitle('Podcaster');

  return (
    <main className="not-found">
      <h1>Not Found</h1>
    </main>
  );
}
