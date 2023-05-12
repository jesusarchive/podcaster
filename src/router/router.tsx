import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/home/home';
import NotFound from '@/pages/not-found';

import Layout from '../layout';

export default createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);
