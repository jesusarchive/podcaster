import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import NotFoundPage from '@/pages/not-found-page';
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
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);
