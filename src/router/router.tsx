import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import NotFoundPage from '@/pages/not-found-page';
import PodcastDetailPage from '@/pages/podcast-detail-page/podcast-detail-page';
import PodcastList from '@/pages/podcast-list-page';

import Layout from '../layout';

export default createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);
