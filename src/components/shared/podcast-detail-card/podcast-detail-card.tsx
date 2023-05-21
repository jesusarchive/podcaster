import './podcast-detail-card.css';

import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@/components/ui/card';
import { TopPodcastsFeedEntry } from '@/services/podcast';
import { linkify } from '@/utils/linkify';

type PodcastDetailCardProps = {
  podcast: TopPodcastsFeedEntry;
};

/**
 * Podcast detail card component
 *
 * Shows podcast detailed information.
 */
function PodcastDetailCard({ podcast }: PodcastDetailCardProps) {
  const podcastDetailUrl = podcast ? `/podcast/${podcast.id.attributes['im:id']}` : '';

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Prevent navigation if the user is already in the same page
    if (event.currentTarget.pathname === window.location.pathname) {
      event.preventDefault();
    }
  };

  return podcast && Object.values(podcast).length > 0 ? (
    <Card className="podcast-detail-card">
      <div>
        <Link to={podcastDetailUrl} onClick={handleClick}>
          <img src={podcast['im:image'][2].label} alt="logo"></img>
        </Link>
      </div>
      <div>
        <Link to={podcastDetailUrl} onClick={handleClick}>
          <h2>{podcast['im:name'].label}</h2>
        </Link>
        <span>{`by ${podcast['im:artist'].label}`}</span>
      </div>
      <div>
        <h3>Description:</h3>
        <pre
          dangerouslySetInnerHTML={{
            __html: linkify(podcast.summary.label)
          }}
        />
      </div>
    </Card>
  ) : null;
}

export default React.memo(PodcastDetailCard);
