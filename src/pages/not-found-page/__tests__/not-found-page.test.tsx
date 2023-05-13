import { render } from '@testing-library/react';
import React from 'react';

import NotFoundPage from '../not-found-page';

describe('<NotFoundPage />', () => {
  test('NotFoundPage mounts properly', () => {
    const wrapper = render(<NotFoundPage />);
    expect(wrapper).toBeTruthy();
  });
});
