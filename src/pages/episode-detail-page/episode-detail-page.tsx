/* eslint-disable jsx-a11y/media-has-caption */
import './episode-detail-page.css';

import React from 'react';
import { useParams } from 'react-router-dom';

import PodcastDetailCard from '@/components/shared/podcast-detail-card';
import Card from '@/components/ui/card';

export default function EpisodeDetailPage() {
  const { episodeId } = useParams();

  const podcastId = '1';

  const podcastMock = {
    id: podcastId,
    logo: `https://picsum.photos/seed/${podcastId}/200/200`,
    title: `Podcast ${podcastId}`,
    author: `Author ${podcastId}`,
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex blanditiis vero voluptatem voluptatum,
                porro et excepturi provident unde quae earum error, ipsam expedita. Vero perspiciatis eius ad rem esse
                dolore.`
  };

  const episodeMock = {
    id: episodeId,
    title: `Episode ${episodeId} - Lorem ipsum dolor sit amet consectetur`,
    date: new Date(),
    duration: 3600,
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex blanditiis vero voluptatem voluptatum,
                porro et excepturi provident unde quae earum error, ipsam expedita. Vero perspiciatis eius ad rem esse
                dolore.`,
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  };

  const podcast = podcastMock;
  const episode = episodeMock;

  return (
    <main className="episode-detail-page">
      <article>
        <PodcastDetailCard podcast={podcast} />
      </article>
      <article>
        <Card>
          <div>
            <h2>{episode.title}</h2>
            <p>{episode.description}</p>
          </div>
          <div>
            <audio controls>
              <source src={episode.src} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </Card>
      </article>
    </main>
  );
}
