import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@/components/card';

interface EpisodeListProps {
  episodes: {
    id: number;
    title: string;
    date: Date;
    duration: number;
  }[];
}

export default function EpisodeList({ episodes }: EpisodeListProps) {
  return (
    <div className="episode-list">
      <Card>
        <Card.Title>Episodes: {episodes.length}</Card.Title>
      </Card>
      <Card>
        <table id="episodes">
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
                  <Link to={`/episode/${episode.id}`}>{episode.title}</Link>
                </td>
                <td>{episode.date.toLocaleDateString()}</td>
                <td>{episode.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
