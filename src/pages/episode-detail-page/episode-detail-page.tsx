/* eslint-disable jsx-a11y/media-has-caption */
import './episode-detail-page.css';

import React, { useRef } from 'react';
import { useLoaderData } from 'react-router-dom';

import PodcastDetailCard from '@/components/shared/podcast-detail-card';
import Card from '@/components/ui/card';
import {
  getPodcastLookupData,
  getTopPodcastsData,
  PodcastLookupResult,
  TopPodcastsFeedEntry
} from '@/services/podcasts';
import { linkify } from '@/utils/linkify';

import { useAudioTimestampControls } from './use-audio-timestamp-controls';

export async function episodeDetailPageLoader({ params }) {
  const { podcastId, episodeId } = params;
  const topPodcastsResponse = await getTopPodcastsData();
  const podcastLookupResponse = await getPodcastLookupData(podcastId);
  const podcast = topPodcastsResponse.feed.entry.find((el) => el.id.attributes['im:id'] === podcastId);
  const episode = podcastLookupResponse.results.find((el) => el.trackId === Number(episodeId));

  return { podcast, episode };
}

export default function EpisodeDetailPage() {
  const { podcast, episode } = useLoaderData() as {
    podcast: TopPodcastsFeedEntry;
    episode: PodcastLookupResult;
  };
  const audioRef = useRef(null);
  const { addAudioTimestampControls } = useAudioTimestampControls(audioRef);

  return (
    <main className="episode-detail-page">
      <article>
        <PodcastDetailCard podcast={podcast} />
      </article>
      <article>
        <Card>
          <div>
            <h2>{episode.trackName}</h2>
            <pre
              dangerouslySetInnerHTML={{
                __html: addAudioTimestampControls(linkify(episode.description))
              }}
            />
          </div>
          <div>
            <audio ref={audioRef} controls>
              <source src={`${episode.episodeUrl}`} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </Card>
      </article>
    </main>
  );
}
