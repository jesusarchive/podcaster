import './podcast-list-page.css';

import React, { Fragment, Suspense, useState } from 'react';
import { Await, defer, Link, useLoaderData, useNavigation } from 'react-router-dom';

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
  console.warn('podcastListPageLoader');
  const podcastsPromise = getTopPodcastsData();
  console.warn('podcastListPageLoader', podcastsPromise);

  return defer({ podcastsPromise });
}

/**
 * Podcast list page
 *
 * Shows a list of top podcasts.
 */
export default function PodcastListPage() {
  const data = useLoaderData() as {
    podcastsPromise: Promise<Array<TopPodcastsFeedEntry>>;
  };
  console.warn('INIT', data);
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

  useDocumentTitle('Top Podcasts | Podcaster');

  return (
    <main className="podcast-list-page">
      <span>{state}</span>
      <span>{JSON.stringify(data)}</span>
      <span>{JSON.stringify(typeof data)}</span>
      <Suspense fallback={<p>Loading top podcasts...</p>}>
        {data?.podcastsPromise ? (
          <Await resolve={data.podcastsPromise} errorElement={<p>Could not load podcasts 😬</p>}>
            {(podcasts) => {
              const visiblePodcasts = filterPodcasts(podcasts, search);

              return (
                <Fragment>
                  <span>TEST PODCASTS</span>
                  {/* SEARCH BAR */}
                  <article className="search-bar">
                    <Badge>{visiblePodcasts.length}</Badge>
                    <Input
                      placeholder="Filter podcasts..."
                      type="search"
                      value={search}
                      onChange={handleSearchChange}
                    />
                  </article>
                  {/* TOP PODCASTS LIST */}
                  <article>
                    {visiblePodcasts?.length > 0 ? (
                      <ul>
                        {visiblePodcasts.map((podcast) => (
                          <li key={podcast.id.attributes['im:id']}>
                            <Link to={`/podcast/${podcast.id.attributes['im:id']}`} onClick={handleLinkClick}>
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
                      <span>No podcasts found. 2</span>
                    )}
                  </article>
                </Fragment>
              );
            }}
          </Await>
        ) : (
          <span>
            No podcasts found. 1<>{JSON.stringify(data)}</>
          </span>
        )}
      </Suspense>
    </main>
  );
}
