import './podcast-list-page.css';

import React, { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

import { useDocumentTitle } from '@/hooks/use-document-title';
import { getTopPodcastsData, TopPodcastsFeedEntry } from '@/services/podcast';

import PodcastList from './podcast-list';

/**
 * Podcast list page loader
 *
 * Get data from local storage or fetch from API.
 *
 * @see https://reactrouter.com/en/main/route/loader
 * @see https://reactrouter.com/en/main/guides/deferred
 */
export async function podcastListPageLoader() {
  const podcasts = getTopPodcastsData();

  return defer({ podcasts });
}

/**
 * Podcast list page
 *
 * Shows a list of top podcasts.
 */
export default function PodcastListPage() {
  const { podcasts } = useLoaderData() as {
    podcasts: Promise<Array<TopPodcastsFeedEntry>>;
  };

  useDocumentTitle('Top Podcasts | Podcaster');

  return (
    <main className="podcast-list-page">
      <Suspense fallback={<p>Loading top podcasts...</p>}>
        {podcasts ? (
          <Await resolve={podcasts} errorElement={<p>Could not load podcasts 😬</p>}>
            {(podcasts) => <PodcastList podcasts={podcasts} />}
          </Await>
        ) : (
          <span>No podcasts found.</span>
        )}
      </Suspense>
    </main>
  );
}
