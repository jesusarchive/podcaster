import { render } from '@testing-library/react';
import React from 'react';

import EpisodeDetailPage from '../episode-detail-page';

describe('<EpisodeDetailPage />', () => {
  test('EpisodeDetailPage mounts properly', () => {
    const wrapper = render(<EpisodeDetailPage />);
    expect(wrapper).toBeTruthy();
  });
});
