import React from 'react';

import Card from '@/components/card';

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
      <Card.Body>
        <Card.Image src={podcast.logo}></Card.Image>
        <hr />
        <div>
          <Card.Title tag="h2">{podcast.title}</Card.Title>
          <span>{`Author: ${podcast.author}`}</span>
        </div>
        <hr />
        <div>
          <Card.Title tag="h3">Description</Card.Title>
          <p>{podcast.description}</p>
        </div>
      </Card.Body>
    </Card>
  );
}
