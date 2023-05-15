import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import ErrorBoundary from '@/components/error-boundary';
import Header from '@/layouts/header';
import EpisodeDetailPage, { episodeDetailPageLoader } from '@/pages/episode-detail-page';
import NotFoundPage from '@/pages/not-found-page';
import PodcastDetailPage, { podcastDetailPageLoader } from '@/pages/podcast-detail-page';
import PodcastList, { podcastListPageLoader } from '@/pages/podcast-list-page';

export default createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        element: <PodcastList />,
        loader: podcastListPageLoader,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'podcast/:podcastId',
        element: <PodcastDetailPage />,
        loader: podcastDetailPageLoader,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'podcast/:podcastId/episode/:episodeId',
        element: <EpisodeDetailPage />,
        loader: episodeDetailPageLoader,
        errorElement: <ErrorBoundary />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);
