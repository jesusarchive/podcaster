import { render } from '@testing-library/react';
import React from 'react';

import PodcastList from '../podcast-list-page';

describe('<PodcastList />', () => {
  test('PodcastList mounts properly', () => {
    const wrapper = render(<PodcastList />);
    expect(wrapper).toBeTruthy();
  });
});
