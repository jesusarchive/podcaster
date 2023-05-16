/* eslint-disable jsx-a11y/media-has-caption */
import './episode-detail-page.css';

import React, { useRef } from 'react';
import { defer, useLoaderData } from 'react-router-dom';

import PodcastDetailCard from '@/components/shared/podcast-detail-card';
import Card from '@/components/ui/card';
import {
  getPodcastLookup,
  getTopPodcasts,
  PodcastLookupResponse,
  PodcastLookupResult,
  TopPodcastsFeedEntry,
  TopPodcastsResponse
} from '@/services/podcasts';
import { linkify } from '@/utils/linkify';

import { useAudioTimestampControls } from './use-audio-timestamp-controls';

export async function episodeDetailPageLoader({ params }) {
  const { podcastId, episodeId } = params;
  const localStorageTopPodcastsResponse = window?.localStorage?.getItem?.('top-podcasts-response');
  const localStoragePodcastLookupResponse = window?.localStorage?.getItem?.(`podcast-lookup-response-${podcastId}`);
  const topPodcastsResponse =
    (localStorageTopPodcastsResponse && (JSON.parse(localStorageTopPodcastsResponse) as TopPodcastsResponse)) ||
    (await getTopPodcasts());
  const podcastLookupResponse =
    (localStoragePodcastLookupResponse && (JSON.parse(localStoragePodcastLookupResponse) as PodcastLookupResponse)) ||
    (await getPodcastLookup(podcastId));
  const podcast = topPodcastsResponse.feed.entry.find((el) => el.id.attributes['im:id'] === podcastId);
  const episode = podcastLookupResponse.results.find((el) => el.trackId === Number(episodeId));
  console.log(episode);

  if (!localStorageTopPodcastsResponse) {
    window?.localStorage?.setItem?.('top-podcasts-response', JSON.stringify(topPodcastsResponse));
  }

  if (!localStoragePodcastLookupResponse) {
    window?.localStorage?.setItem?.(`podcast-lookup-response-${podcastId}`, JSON.stringify(podcastLookupResponse));
  }

  return defer({ podcast, episode });
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
