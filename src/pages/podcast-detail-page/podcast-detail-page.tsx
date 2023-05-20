import './podcast-detail-page.css';

import React, { Fragment } from 'react';
import { useLoaderData } from 'react-router-dom';

import PodcastDetailCard from '@/components/shared/podcast-detail-card';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { getPodcastData, getPodcastEpisodesData, PodcastLookupResult, TopPodcastsFeedEntry } from '@/services/podcast';

import EpisodesTable from './episodes-table';

/**
 * Podcast detail page loader
 *
 * Get data from local storage or fetch from API.
 *
 * @see https://reactrouter.com/en/main/route/loader
 */
export async function podcastDetailPageLoader({ params }) {
  const { podcastId } = params;
  const podcast = await getPodcastData(podcastId);
  const episodes = await getPodcastEpisodesData(podcastId);

  return { podcast, episodes };
}

/**
 * Podcast detail page
 *
 * Shows podcast information and a list of episodes.
 */
export default function PodcastDetailPage() {
  const { podcast, episodes } = useLoaderData() as {
    podcast: TopPodcastsFeedEntry;
    episodes: Array<PodcastLookupResult>;
  };
  const documentTitle = podcast ? `${podcast['im:name'].label} | Podcaster` : 'Podcaster';

  useDocumentTitle(documentTitle);

  return (
    <main className="podcast-detail-page">
      {podcast ? (
        <Fragment>
          <article>
            <PodcastDetailCard podcast={podcast} />
          </article>
          <article>
            <EpisodesTable episodes={episodes} />
          </article>
        </Fragment>
      ) : (
        <div>No podcast data.</div>
      )}
    </main>
  );
}
