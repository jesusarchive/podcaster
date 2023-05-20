import React, { Fragment, useMemo, useState } from 'react';
import { Link, useNavigation } from 'react-router-dom';

import Badge from '@/components/ui/badge';
import Input from '@/components/ui/input';
import { TopPodcastsFeedEntry } from '@/services/podcast';

import { filterPodcasts } from './helpers';
import PodcastCard from './podcast-card';

type PodcastListProps = {
  podcasts: Array<TopPodcastsFeedEntry>;
};

export default function PodcastList({ podcasts }: PodcastListProps) {
  const { state } = useNavigation();
  const [search, setSearch] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // prevent navigation when loading podcast detail page
    if (state === 'loading') {
      event.preventDefault();
    }
  };

  const visiblePodcasts = useMemo(() => filterPodcasts(podcasts, search), [podcasts, search]);

  return (
    <Fragment>
      {/* SEARCH BAR */}
      <article className="search-bar">
        <Badge>{visiblePodcasts.length}</Badge>
        <form role="search">
          <Input placeholder="Filter podcasts..." type="search" value={search} onChange={handleSearchChange} />
        </form>
      </article>
      {/* TOP PODCASTS LIST */}
      <article>
        {visiblePodcasts.length > 0 ? (
          <ul className="podcast-list">
            {visiblePodcasts.map((podcast) => (
              <li key={podcast.id.attributes['im:id']}>
                <Link to={`/podcast/${podcast.id.attributes['im:id']}`} onClick={handleLinkClick}>
                  <PodcastCard podcast={podcast} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <span>No podcasts found.</span>
        )}
      </article>
    </Fragment>
  );
}
