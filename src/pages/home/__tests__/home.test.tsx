import { render } from '@testing-library/react';
import React from 'react';

import Home from '../home';

describe('<Home />', () => {
  test('Home mounts properly', () => {
    const wrapper = render(<Home />);
    expect(wrapper).toBeTruthy();
  });
});
