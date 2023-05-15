/* eslint-disable jsx-a11y/media-has-caption */
import './episode-detail-page.css';

import React from 'react';
import { defer, useLoaderData } from 'react-router-dom';

import PodcastDetailCard from '@/components/shared/podcast-detail-card';
import Card from '@/components/ui/card';
import { getPodcastLookup, getTopPodcasts, PodcastLookupResult, TopPodcastsFeedEntry } from '@/services/podcasts';

export async function episodeDetailPageLoader({ params }) {
  const { podcastId, episodeId } = params;
  const topPodcastsResponse = await getTopPodcasts();
  const podcastLookupResponse = await getPodcastLookup(podcastId);
  const podcast = topPodcastsResponse.feed.entry.find((el) => el.id.attributes['im:id'] === podcastId);
  const episode = podcastLookupResponse.results.find((el) => el.trackId === Number(episodeId));

  return defer({ podcast, episode });
}

export default function EpisodeDetailPage() {
  const { podcast, episode } = useLoaderData() as {
    podcast: TopPodcastsFeedEntry;
    episode: PodcastLookupResult;
  };

  return (
    <main className="episode-detail-page">
      <article>
        <PodcastDetailCard podcast={podcast} />
      </article>
      <article>
        <Card>
          <div>
            <h2>{episode.trackName}</h2>
            <p>{episode.description}</p>
          </div>
          <div>
            <audio controls>
              <source src={episode.episodeUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </Card>
      </article>
    </main>
  );
}
