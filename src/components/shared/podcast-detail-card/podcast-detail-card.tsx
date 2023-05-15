import './podcast-detail-card.css';

import React from 'react';

import Card from '@/components/ui/card';
import { PodcastDetailType } from '@/services/podcasts';

export default function PodcastDetailCard({ podcast }: { podcast: PodcastDetailType }) {
  return Object.values(podcast).length > 0 ? (
    <Card className="podcast-detail-card">
      <div>
        <img src={podcast.artworkUrl600} alt="logo"></img>
      </div>
      <div>
        <h2>{podcast.trackName}</h2>
        <span>{`by ${podcast.artistName}`}</span>
      </div>
      <div>
        <h3>Description:</h3>
        <p>{''}</p>
      </div>
    </Card>
  ) : null;
}
