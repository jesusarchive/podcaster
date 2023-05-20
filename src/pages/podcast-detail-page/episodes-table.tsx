import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Card from '@/components/ui/card';
import { PodcastLookupResult } from '@/services/podcast';
import { formatDate, millisToHms } from '@/utils/date';

type EpisodesTableProps = {
  episodes: Array<PodcastLookupResult>;
};

export default function EpisodesTable({ episodes }: EpisodesTableProps) {
  return Array.isArray(episodes) && episodes.length > 0 ? (
    <Fragment>
      <Card>
        <h2>Episodes: {episodes.length}</h2>
      </Card>
      <Card>
        <table className="episodes-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode) => (
              <tr key={episode.trackId}>
                <td>
                  <Link to={`episode/${episode.trackId}`}>{episode.trackName}</Link>
                </td>
                <td>{formatDate(episode.releaseDate)}</td>
                <td>{millisToHms(episode.trackTimeMillis)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Fragment>
  ) : (
    /* FALLBACK MESSAGE */
    <span>No episodes found for this podcast.</span>
  );
}
