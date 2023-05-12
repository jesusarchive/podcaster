import { render } from '@testing-library/react';
import React from 'react';

import NotFound from '../not-found';

describe('<NotFound />', () => {
  test('NotFound mounts properly', () => {
    const wrapper = render(<NotFound />);
    expect(wrapper).toBeTruthy();
  });
});
