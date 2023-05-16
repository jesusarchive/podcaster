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

// get top podcasts data from local storage or fetch
export async function getTopPodcastsData(): Promise<TopPodcastsResponse> {
  const key = 'top-podcasts-response';
  const topPodcastsData = localStorage.getItem(key);
  const data = (topPodcastsData && (JSON.parse(topPodcastsData) as TopPodcastsResponse)) || (await getTopPodcasts());

  if (!topPodcastsData) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  return data;
}

// get podcast lookup data from local storage or fetch
export async function getPodcastLookupData(id: number): Promise<PodcastLookupResponse> {
  const key = `podcast-lookup-response-${id}`;
  const podcastLookupData = localStorage.getItem(key);
  const data =
    (podcastLookupData && (JSON.parse(podcastLookupData) as PodcastLookupResponse)) || (await getPodcastLookup(id));

  if (!podcastLookupData) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  return data;
}
