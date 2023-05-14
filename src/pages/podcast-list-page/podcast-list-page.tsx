import './podcast-list-page.css';

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import Badge from '@/components/badge';
import Card from '@/components/card';
import Input from '@/components/input';

import { filterPodcasts, podcastsMock } from './helpers';

export default function PodcastListPage() {
  const podcasts = podcastsMock;
  const [search, setSearch] = React.useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const visiblePodcasts = useMemo(() => filterPodcasts(podcasts, search), [podcasts, search]);

  return (
    <div className="podcast-list-page">
      <header>
        <Badge>{visiblePodcasts.length}</Badge>
        <Input placeholder="Filter podcasts..." type="search" value={search} onChange={handleSearchChange} />
      </header>
      <main>
        {visiblePodcasts.length === 0 ? (
          <p>No podcasts found</p>
        ) : (
          <ul>
            {visiblePodcasts.map((podcast) => (
              <li key={podcast.id}>
                <Link to={`/podcast/${podcast.id}`}>
                  <Card>
                    <Card.Image src={podcast.logo}></Card.Image>
                    <Card.Body>
                      <Card.Title tag="h2">{podcast.title}</Card.Title>
                      <span>{`Author: ${podcast.author}`}</span>
                    </Card.Body>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
