import { PodcastLookupResponse, TopPodcastsResponse } from './types';

const API_URL = 'https://itunes.apple.com';

// get top podcasts
export async function getTopPodcasts(limit = 100): Promise<TopPodcastsResponse> {
  const response = await fetch(`${API_URL}/us/rss/toppodcasts/limit=${limit}/json`);
  const data = await response.json();

  return data;
}

// get podcast lookup data
export async function getPodcastLookup(id: number, limit = 200): Promise<PodcastLookupResponse> {
  const response = await fetch(`${API_URL}/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=${limit}`);
  const data = await response.json();

  return data;
}

// get top podcasts data from local storage or fetch
export async function getTopPodcastsData(): Promise<TopPodcastsResponse> {
  const localStorageKey = 'top-podcasts-response';
  // get local storage data
  const rawTopPodcastsData = localStorage.getItem(localStorageKey);
  // parse local storage data
  const parsedTopPodcastsData = rawTopPodcastsData && JSON.parse(rawTopPodcastsData);
  // get data from api or local storage
  const data = (parsedTopPodcastsData as TopPodcastsResponse) || (await getTopPodcasts());

  // if no local storage data, set local storage data
  if (!rawTopPodcastsData) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }

  return data;
}

// get podcast lookup data from local storage or fetch
export async function getPodcastLookupData(id: number): Promise<PodcastLookupResponse> {
  const localStorageKey = 'podcast-lookup-responses';
  // get local storage data
  const rawPodcastLookupResponsesData = localStorage.getItem(localStorageKey);
  // parse local storage data
  const parsedPodcastLookupResponsesData =
    (rawPodcastLookupResponsesData && JSON.parse(rawPodcastLookupResponsesData)) || {};
  // get local storage data for current podcast
  const podcastLookupData = parsedPodcastLookupResponsesData[id];
  // get data from api or local storage
  const data = (podcastLookupData as PodcastLookupResponse) || (await getPodcastLookup(id));

  // if no local storage data, set local storage data
  if (!podcastLookupData) {
    localStorage.setItem(localStorageKey, JSON.stringify({ ...parsedPodcastLookupResponsesData, [id]: data }));
  }

  return data;
}
