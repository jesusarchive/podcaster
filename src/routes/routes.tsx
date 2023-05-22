import React, { Fragment } from 'react';
import { createBrowserRouter, Outlet, ScrollRestoration } from 'react-router-dom';

import ErrorBoundary from '@/components/error-boundary';
import Header from '@/layouts/header';
import NotFoundPage from '@/pages/not-found-page';

export const routesConfig = [
  {
    path: '/',
    element: (
      <Fragment>
        <Header />
        <Outlet />
        <ScrollRestoration />
      </Fragment>
    ),
    children: [
      {
        index: true,
        async lazy() {
          const { podcastListPageLoader, default: PodcastListPage } = await import('@/pages/podcast-list-page');

          return {
            loader: podcastListPageLoader,
            Component: PodcastListPage
          };
        },
        errorElement: <ErrorBoundary />
      },
      {
        path: 'podcast/:podcastId',
        async lazy() {
          const { podcastDetailPageLoader, default: PodcastDetailPage } = await import('@/pages/podcast-detail-page');

          return {
            loader: podcastDetailPageLoader,
            Component: PodcastDetailPage
          };
        },
        errorElement: <ErrorBoundary />
      },
      {
        path: 'podcast/:podcastId/episode/:episodeId',
        async lazy() {
          const { episodeDetailPageLoader, default: EpisodeDetailPage } = await import('@/pages/episode-detail-page');

          return {
            loader: episodeDetailPageLoader,
            Component: EpisodeDetailPage
          };
        },
        errorElement: <ErrorBoundary />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
];

export default createBrowserRouter(routesConfig);
