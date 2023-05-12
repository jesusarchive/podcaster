import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Layout from '../layout';

describe('Layout', () => {
  test('renders home link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    const linkElement = getByText(/App/i);
    expect(linkElement).toBeTruthy();
  });
});
