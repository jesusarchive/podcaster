import './podcast-detail-page.css';

import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import PodcastDetailCard from '@/components/shared/podcast-detail-card';
import Card from '@/components/ui/card';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { getPodcastData, getPodcastEpisodesData, PodcastLookupResult, TopPodcastsFeedEntry } from '@/services/podcast';
import { formatDate, millisToHms } from '@/utils/date';

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

  useDocumentTitle(`${podcast?.['im:name'].label} | Podcaster`);

  return (
    <main className="podcast-detail-page">
      <article>
        <PodcastDetailCard podcast={podcast} />
      </article>
      <article>
        {episodes?.length > 0 ? (
          <>
            <Card>
              <h2>Episodes: {episodes.length}</h2>
            </Card>
            <Card>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {episodes.map((episode) => (
                    <tr key={episode.trackId}>
                      <td>
                        <Link to={`episode/${episode.trackId}`}>{episode.trackName}</Link>
                      </td>
                      <td>{formatDate(episode.releaseDate)}</td>
                      <td>{millisToHms(episode.trackTimeMillis)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </>
        ) : (
          <span>No episodes found for this podcast.</span>
        )}
      </article>
    </main>
  );
}
