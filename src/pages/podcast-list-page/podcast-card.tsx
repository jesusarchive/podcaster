import React from 'react';

import Card from '@/components/ui/card';
import { TopPodcastsFeedEntry } from '@/services/podcast';

type PodcastCardProps = {
  podcast: TopPodcastsFeedEntry;
};

/**
 * Podcast card component
 *
 * Simple podcast card component with image, title and author
 */
export default function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <Card className="podcast-card">
      <img src={podcast['im:image'][2].label} alt="logo"></img>
      <div>
        <h2 title={podcast['im:name'].label.toUpperCase()}>{podcast['im:name'].label}</h2>
        <h3 title={podcast['im:artist'].label}>{`by ${podcast['im:artist'].label}`}</h3>
      </div>
    </Card>
  );
}
