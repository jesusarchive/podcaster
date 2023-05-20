/* eslint-disable jsx-a11y/media-has-caption */
import './episode-detail-page.css';

import React, { Fragment } from 'react';
import { useLoaderData } from 'react-router-dom';

import PodcastDetailCard from '@/components/shared/podcast-detail-card';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { getPodcastData, getPodcastEpisodeData, PodcastLookupResult, TopPodcastsFeedEntry } from '@/services/podcast';

import EpisodeListener from './episode-listener';

/**
 * Episode detail page loader
 *
 * Get data from local storage or fetch from API
 *
 * @see https://reactrouter.com/en/main/route/loader
 */
export async function episodeDetailPageLoader({ params }) {
  const { podcastId, episodeId } = params;
  const podcast = await getPodcastData(podcastId);
  const episode = await getPodcastEpisodeData(podcastId, episodeId);

  return { podcast, episode };
}

/**
 * Episode detail page
 *
 * Shows episode information and audio player
 */
export default function EpisodeDetailPage() {
  const { podcast, episode } = useLoaderData() as {
    podcast: TopPodcastsFeedEntry;
    episode: PodcastLookupResult;
  };

  const documentTitle = episode ? `${episode.trackName} | Podcaster` : 'Podcaster';

  useDocumentTitle(documentTitle);

  return (
    <main className="episode-detail-page">
      {podcast ? (
        <Fragment>
          <article>
            <PodcastDetailCard podcast={podcast} />
          </article>
          <article>
            <EpisodeListener episode={episode} />
          </article>
        </Fragment>
      ) : (
        <div>No podcast data</div>
      )}
    </main>
  );
}
