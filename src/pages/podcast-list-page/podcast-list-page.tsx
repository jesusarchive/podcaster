import './podcast-list-page.css';

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import Badge from '@/components/ui/badge';
import Card from '@/components/ui/card';
import Input from '@/components/ui/input';

import { filterPodcasts, podcastsMock } from './helpers';

export default function PodcastListPage() {
  const podcasts = podcastsMock;
  const [search, setSearch] = React.useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const visiblePodcasts = useMemo(() => filterPodcasts(podcasts, search), [podcasts, search]);

  return (
    <main className="podcast-list-page">
      <article className="search-bar">
        <Badge>{visiblePodcasts.length}</Badge>
        <Input placeholder="Filter podcasts..." type="search" value={search} onChange={handleSearchChange} />
      </article>
      <article>
        {visiblePodcasts.length === 0 ? (
          <p>No podcasts found</p>
        ) : (
          <ul>
            {visiblePodcasts.map((podcast) => (
              <li key={podcast.id}>
                <Link to={`/podcast/${podcast.id}`}>
                  <Card>
                    <img src={podcast.logo} alt="logo"></img>
                    <div>
                      <h2>{podcast.title}</h2>
                      <span>{`Author: ${podcast.author}`}</span>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </article>
    </main>
  );
}
