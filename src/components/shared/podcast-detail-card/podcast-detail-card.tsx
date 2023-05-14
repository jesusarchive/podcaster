import './podcast-detail-card.css';

import React from 'react';

import Card from '@/components/ui/card';

type PodcastDetailCardProps = {
  podcast: {
    id: string;
    logo: string;
    title: string;
    author: string;
    description: string;
  };
};

export default function PodcastDetailCard({ podcast }: PodcastDetailCardProps) {
  return (
    <Card className="podcast-detail-card">
      <div>
        <img src={podcast.logo} alt="logo"></img>
      </div>
      <div>
        <h2>{podcast.title}</h2>
        <span>{`by ${podcast.author}`}</span>
      </div>
      <div>
        <h3>Description:</h3>
        <p>{podcast.description}</p>
      </div>
    </Card>
  );
}
