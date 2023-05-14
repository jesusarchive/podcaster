import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import Header from '@/layouts/header';
import EpisodeDetailPage from '@/pages/episode-detail-page';
import NotFoundPage from '@/pages/not-found-page';
import PodcastDetailPage from '@/pages/podcast-detail-page';
import PodcastList from '@/pages/podcast-list-page';

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
        element: <PodcastList />
      },
      {
        path: 'podcast/:podcastId',
        element: <PodcastDetailPage />
      },
      {
        path: 'podcast/:podcastId/episode/:episodeId',
        element: <EpisodeDetailPage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);
