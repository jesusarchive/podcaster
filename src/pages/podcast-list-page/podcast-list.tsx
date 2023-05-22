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
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, to: string) => {
    // prevent multiple navigation requests for the same podcast
    if (navigation.state === 'loading' && navigation.location.pathname === to) {
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
            {visiblePodcasts.map((podcast) => {
              const to = `/podcast/${podcast.id.attributes['im:id']}`;

              return (
                <li key={podcast.id.attributes['im:id']}>
                  <Link to={to} onClick={(event) => handleLinkClick(event, to)}>
                    <PodcastCard podcast={podcast} />
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <span>No podcasts found.</span>
        )}
      </article>
    </Fragment>
  );
}
