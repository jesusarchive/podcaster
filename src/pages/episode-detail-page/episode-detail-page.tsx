/* eslint-disable jsx-a11y/media-has-caption */
import './episode-detail-page.css';

import React, { useRef } from 'react';
import { useLoaderData } from 'react-router-dom';

import PodcastDetailCard from '@/components/shared/podcast-detail-card';
import Card from '@/components/ui/card';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { getPodcastData, getPodcastEpisodeData, PodcastLookupResult, TopPodcastsFeedEntry } from '@/services/podcast';
import { linkify } from '@/utils/linkify';

import { useAudioTimestampControls } from './use-audio-timestamp-controls';

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
  const audioRef = useRef(null);
  const { addAudioTimestampControls } = useAudioTimestampControls(audioRef);

  useDocumentTitle(`${episode.trackName} | Podcaster`);

  return (
    <main className="episode-detail-page">
      {/* PODCAST DETAIL CARD */}
      <article>
        <PodcastDetailCard podcast={podcast} />
      </article>
      {/* EPISODE DATA AND AUDIO PLAYER */}
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
