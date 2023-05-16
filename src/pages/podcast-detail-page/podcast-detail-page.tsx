import './podcast-detail-page.css';

import React from 'react';
import { defer, Link, useLoaderData } from 'react-router-dom';

import PodcastDetailCard from '@/components/shared/podcast-detail-card';
import Card from '@/components/ui/card';
import { getPodcastLookup, getTopPodcasts } from '@/services/podcasts/podcasts';
import { PodcastLookupResult, TopPodcastsFeedEntry } from '@/services/podcasts/types';
import { formatDate, millisToHms } from '@/utils/date';

export async function podcastDetailPageLoader({ params }) {
  const { podcastId } = params;
  const topPodcastsResponse = await getTopPodcasts();
  const podcastLookupResponse = await getPodcastLookup(podcastId);
  console.log(podcastLookupResponse);
  const podcast = topPodcastsResponse?.feed?.entry?.find?.((el) => el.id.attributes['im:id'] === podcastId) || {};
  const episodes = podcastLookupResponse?.results?.slice?.(1) || [];

  return defer({ podcast, episodes });
}

export default function PodcastDetailPage() {
  const { podcast, episodes } = useLoaderData() as {
    podcast: TopPodcastsFeedEntry;
    episodes: Array<PodcastLookupResult>;
  };

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
