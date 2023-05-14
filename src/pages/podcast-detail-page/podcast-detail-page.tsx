import './podcast-detail-page.css';

import React from 'react';
import { useParams } from 'react-router-dom';

import EpisodeList from './episode-list';
import PodcastDetailCard from './podcast-detail-card';

export default function PodcastDetailPage() {
  const { podcastId } = useParams();

  const podcastMock = {
    id: podcastId || '1',
    logo: `https://picsum.photos/seed/${podcastId}/200/200`,
    title: `Podcast ${podcastId}`,
    author: `Author ${podcastId}`,
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex blanditiis vero voluptatem voluptatum,
                porro et excepturi provident unde quae earum error, ipsam expedita. Vero perspiciatis eius ad rem esse
                dolore.`
  };

  const episodesMock = Array.from({ length: 66 }, (_, index) => ({
    id: index,
    title: `Episode ${index} - Lorem ipsum dolor sit amet consectetur`,
    date: new Date(),
    duration: 3600
  }));

  const podcast = podcastMock;

  return (
    <div className="podcast-detail-page">
      <div>
        <PodcastDetailCard podcast={podcast} />
      </div>
      <EpisodeList episodes={episodesMock} />
    </div>
  );
}
