import './podcast-list-page.css';

import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Badge from '@/components/ui/badge';
import Card from '@/components/ui/card';
import Input from '@/components/ui/input';
import { getPodcasts, Podcast } from '@/services/podcasts/podcasts';

import { filterPodcasts } from './helpers';

export default function PodcastListPage() {
  const [podcasts, setPodcasts] = useState([] as Array<Podcast>);
  const [search, setSearch] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const visiblePodcasts = useMemo(() => filterPodcasts(podcasts, search), [podcasts, search]);

  useEffect(() => {
    (async () => {
      const response = await getPodcasts();
      setPodcasts(response.feed.entry);
    })();
  }, []);

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
              <li key={podcast.id.attributes['im:id']}>
                <Link to={`/podcast/${podcast.id.attributes['im:id']}`}>
                  <Card>
                    <img src={podcast['im:image'][2].label} alt="logo"></img>
                    <div>
                      <h2 title={podcast['im:name'].label.toUpperCase()}>{podcast['im:name'].label}</h2>
                      <span title={podcast['im:artist'].label}>{`by ${podcast['im:artist'].label}`}</span>
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
