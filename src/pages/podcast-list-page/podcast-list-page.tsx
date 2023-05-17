import './podcast-list-page.css';

import React, { Fragment, Suspense, useState } from 'react';
import { Await, defer, Link, useLoaderData } from 'react-router-dom';

import Badge from '@/components/ui/badge';
import Card from '@/components/ui/card';
import Input from '@/components/ui/input';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { getTopPodcastsData, TopPodcastsFeedEntry } from '@/services/podcast';

import { filterPodcasts } from './helpers';

/**
 * Podcast list page loader
 *
 * Get data from local storage or fetch from API.
 *
 * @see https://reactrouter.com/en/main/route/loader
 */
export async function podcastListPageLoader() {
  const podcastsPromise = getTopPodcastsData();

  return defer({ podcastsPromise });
}

/**
 * Podcast list page
 *
 * Shows a list of top podcasts.
 */
export default function PodcastListPage() {
  const { podcastsPromise } = useLoaderData() as { podcastsPromise: Promise<Array<TopPodcastsFeedEntry>> };
  const [search, setSearch] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useDocumentTitle('Top Podcasts | Podcaster');

  return (
    <main className="podcast-list-page">
      <Suspense fallback={<p>Loading top podcasts...</p>}>
        <Await resolve={podcastsPromise}>
          {(podcasts) => {
            const visiblePodcasts = filterPodcasts(podcasts, search);

            return (
              <Fragment>
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
              </Fragment>
            );
          }}
        </Await>
      </Suspense>
    </main>
  );
}
