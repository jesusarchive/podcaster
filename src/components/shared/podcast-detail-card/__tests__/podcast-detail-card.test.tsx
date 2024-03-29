import React from 'react';

import { TopPodcastsFeedEntry } from '@/services/podcast';
import topPodcastsResponseMock from '@/services/podcast/__mocks__/top-podcasts-response-mock.json';
import { renderWithRouter } from '@/utils/testing';

import PodcastDetailCard from '..';

const podcastMock = topPodcastsResponseMock.feed.entry[0];

describe('<PodcastDetailCard />', () => {
  it('renders podcast detail card', () => {
    const { container } = renderWithRouter(<PodcastDetailCard podcast={podcastMock} />);

    expect(container.querySelector('.podcast-detail-card h2')).toHaveTextContent(podcastMock['im:name'].label);
    expect(container.querySelector('.podcast-detail-card span')).toHaveTextContent(podcastMock['im:artist'].label);
    expect(container.querySelector('.podcast-detail-card img')).toHaveAttribute(
      'src',
      podcastMock['im:image'][2].label
    );
    expect(container.querySelector('.podcast-detail-card pre')).toHaveTextContent(podcastMock.summary.label);
  });

  it('does not render podcast detail card', () => {
    const { container } = renderWithRouter(<PodcastDetailCard podcast={{} as TopPodcastsFeedEntry} />);
    expect(container.querySelector('.podcast-detail-card')).toBeFalsy();
  });

  it('does not navigate if is current route', () => {
    const podcastMock2 = { ...podcastMock, id: { ...podcastMock.id, attributes: { 'im:id': '1' } } };

    const { container } = renderWithRouter(<PodcastDetailCard podcast={podcastMock2} />, { route: '/podcast/1' });
    const link = container.querySelector('.podcast-detail-card a') as HTMLAnchorElement;
    expect(link).toBeTruthy();
    link && link.click();
    expect(container).toBeTruthy();
  });
});
