/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef } from 'react';

import Card from '@/components/ui/card';
import { PodcastLookupResult } from '@/services/podcast';
import { linkify } from '@/utils/linkify';

import { useAudioTimestampControls } from './use-audio-timestamp-controls';

type EpisodeDetailProps = {
  episode: PodcastLookupResult;
};

export default function EpisodeListener({ episode }: EpisodeDetailProps) {
  const audioRef = useRef(null);
  const { addAudioTimestampControls } = useAudioTimestampControls(audioRef);

  return episode ? (
    <Card className="episode-listener">
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
  ) : (
    <div>No episode data.</div>
  );
}
