import './podcast-list-page.css';

import React, { useMemo, useState } from 'react';
import { defer, Link, useLoaderData } from 'react-router-dom';

import Badge from '@/components/ui/badge';
import Card from '@/components/ui/card';
import Input from '@/components/ui/input';
import { getTopPodcastsData } from '@/services/podcasts';
import { TopPodcastsFeedEntry } from '@/services/podcasts/types';

import { filterPodcasts } from './helpers';

export async function podcastListPageLoader() {
  const topPodcastsResponse = await getTopPodcastsData();

  return defer({ podcasts: topPodcastsResponse.feed.entry });
}

export default function PodcastListPage() {
  const { podcasts } = useLoaderData() as { podcasts: Array<TopPodcastsFeedEntry> };
  const [search, setSearch] = useState('');

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
        {visiblePodcasts?.length > 0 ? (
          <ul>
            {visiblePodcasts.map((podcast) => (
              <li key={podcast.id.attributes['im:id']}>
                <Link to={`/podcast/${podcast.id.attributes['im:id']}`}>
                  <Card>
                    <img src={podcast['im:image'][2].label} alt="logo"></img>
                    <div>
                      <h2 title={podcast['im:name'].label.toUpperCase()}>{podcast['im:name'].label}</h2>
                      <h3 title={podcast['im:artist'].label}>{`by ${podcast['im:artist'].label}`}</h3>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <span>No podcasts found.</span>
        )}
      </article>
    </main>
  );
}
