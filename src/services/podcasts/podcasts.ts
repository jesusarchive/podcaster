import { PodcastLookupResponse, TopPodcastsResponse } from './types';

const API_URL = 'https://itunes.apple.com';

// get top podcasts
export async function getTopPodcasts(limit = 100): Promise<TopPodcastsResponse> {
  const response = await fetch(`${API_URL}/us/rss/toppodcasts/limit=${limit}/json`);
  const data = await response.json();

  return data;
}

// get podcast lookup, returns episode array
export async function getPodcastLookup(id: number, limit = 200): Promise<PodcastLookupResponse> {
  const response = await fetch(`${API_URL}/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=${limit}`);
  const data = await response.json();

  return data;
}
