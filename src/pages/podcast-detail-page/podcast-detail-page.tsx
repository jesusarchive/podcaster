import './podcast-detail-page.css';

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import PodcastDetailCard from '@/components/shared/podcast-detail-card';
import Card from '@/components/ui/card';
import { Episode, getPodcast, PodcastDetail } from '@/services/podcasts/podcasts';

import { formatDate } from './format-date';
import { msToMin } from './ms-to-min';

export default function PodcastDetailPage() {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState({} as PodcastDetail);
  const [episodes, setEpisodes] = useState([] as Array<Episode>);

  useEffect(() => {
    (async () => {
      const response = await getPodcast(Number(podcastId));
      console.log(response);
      const [podcast, ...episodes] = response.results;
      setPodcast(podcast as PodcastDetail);
      setEpisodes(episodes as Array<Episode>);
    })();
  }, []);

  return (
    <main className="podcast-detail-page">
      <article>
        <PodcastDetailCard podcast={podcast} />
      </article>
      <article>
        <Card>
          <h2>Episodes: {episodes.length}</h2>
        </Card>
        <Card>
          <table>
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
                  <td>{msToMin(episode.trackTimeMillis)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </article>
    </main>
  );
}
