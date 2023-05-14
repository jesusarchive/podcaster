import { render } from '@testing-library/react';
import React from 'react';

import PodcastDetailPage from '../podcast-detail-page';

describe('<PodcastDetailPage />', () => {
  test('PodcastDetailPage mounts properly', () => {
    const wrapper = render(<PodcastDetailPage />);
    expect(wrapper).toBeTruthy();
  });
});
