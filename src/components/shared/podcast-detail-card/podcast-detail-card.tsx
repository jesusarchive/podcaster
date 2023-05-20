import './podcast-detail-card.css';

import React from 'react';

import Card from '@/components/ui/card';
import { TopPodcastsFeedEntry } from '@/services/podcast';
import { linkify } from '@/utils/linkify';

type PodcastDetailCardProps = {
  podcast: TopPodcastsFeedEntry;
};

/**
 * Podcast detail card component
 *
 * Shows podcast information.
 */
export default function PodcastDetailCard({ podcast }: PodcastDetailCardProps) {
  return podcast && Object.values(podcast).length > 0 ? (
    <Card className="podcast-detail-card">
      <div>
        <img src={podcast['im:image'][2].label} alt="logo"></img>
      </div>
      <div>
        <h2>{podcast['im:name'].label}</h2>
        <span>{`by ${podcast['im:artist'].label}`}</span>
      </div>
      <div>
        <h3>Description:</h3>
        <pre
          dangerouslySetInnerHTML={{
            __html: linkify(podcast.summary.label)
          }}
        />
      </div>
    </Card>
  ) : null;
}
