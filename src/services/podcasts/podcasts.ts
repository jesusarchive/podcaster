import { EpisodeType, PodcastDetailType, PodcastType } from './types';

const API_URL = 'https://itunes.apple.com';

export async function getPodcasts(): Promise<{ feed: { entry: Array<PodcastType> } }> {
  const response = await fetch(`${API_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`);
  const data = await response.json();

  return data;
}

export async function getPodcast(id: number): Promise<{ results: Array<PodcastDetailType | EpisodeType> }> {
  const response = await fetch(`${API_URL}/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20/json`);
  const data = await response.json();

  return data;
}
