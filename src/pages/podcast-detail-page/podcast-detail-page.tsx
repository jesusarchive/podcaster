import './podcast-detail-page.css';

import React from 'react';
import { Link, useParams } from 'react-router-dom';

import PodcastDetailCard from '@/components/shared/podcast-detail-card';
import Card from '@/components/ui/card';

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

  const episodes = episodesMock;

  return (
    <main className="podcast-detail-page">
      <article>
        <PodcastDetailCard podcast={podcast} />
      </article>
      <article>
        <Card>
          <h2>Episodes: {episodes.length}</h2>
        </Card>
        <Card>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {episodes.map((episode) => (
                <tr key={episode.id}>
                  <td>
                    <Link to={`episode/${episode.id}`}>{episode.title}</Link>
                  </td>
                  <td>{episode.date.toLocaleDateString()}</td>
                  <td>{episode.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </article>
    </main>
  );
}
