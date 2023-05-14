import './podcast-detail-card.css';

import React from 'react';

import Card from '@/components/ui/card';

interface PodcastDetailCardProps {
  podcast: {
    id: string;
    logo: string;
    title: string;
    author: string;
    description: string;
  };
}

export default function PodcastDetailCard({ podcast }: PodcastDetailCardProps) {
  return (
    <Card className="podcast-detail-card">
      <img src={podcast.logo} alt="logo"></img>
      <hr />
      <div>
        <h2>{podcast.title}</h2>
        <span>{`Author: ${podcast.author}`}</span>
      </div>
      <hr />
      <div>
        <h3>Description</h3>
        <p>{podcast.description}</p>
      </div>
    </Card>
  );
}
