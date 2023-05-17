// podcast detail card component tests

import { render } from '@testing-library/react';
import React from 'react';

import { TopPodcastsFeedEntry } from '@/services/podcast';
import topPodcastsResponseMock from '@/services/podcast/__mocks__/top-podcasts-response-mock.json';

import PodcastDetailCard from '..';

const podcastMock = topPodcastsResponseMock.feed.entry[0];

describe('<PodcastDetailCard />', () => {
  test('renders podcast detail card', () => {
    const { container } = render(<PodcastDetailCard podcast={podcastMock} />);

    expect(container.querySelector('.podcast-detail-card h2')).toHaveTextContent(podcastMock['im:name'].label);
    expect(container.querySelector('.podcast-detail-card span')).toHaveTextContent(podcastMock['im:artist'].label);
    expect(container.querySelector('.podcast-detail-card img')).toHaveAttribute(
      'src',
      podcastMock['im:image'][2].label
    );
    expect(container.querySelector('.podcast-detail-card pre')).toHaveTextContent(podcastMock.summary.label);
  });

  test('does not render podcast detail card', () => {
    const { container } = render(<PodcastDetailCard podcast={{} as TopPodcastsFeedEntry} />);
    expect(container.querySelector('.podcast-detail-card')).toBeFalsy();
  });
});
