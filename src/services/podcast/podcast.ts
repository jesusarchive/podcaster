import { PodcastLookupResponse, PodcastLookupResult, TopPodcastsFeedEntry, TopPodcastsResponse } from './types';

/**
 * API functions
 */

const API_URL = 'https://itunes.apple.com';

// wrap url in allorigins
export function allOrigins(url: string): string {
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
}

// get top podcasts
export async function getTopPodcasts(limit = 100): Promise<TopPodcastsResponse> {
  const response = await fetch(allOrigins(`${API_URL}/us/rss/toppodcasts/limit=${limit}/json`));
  const data = await response.json();

  return data;
}

// get podcast lookup data, it returns a simplified version of podcast data and episodes
export async function getPodcastLookup(id: number, limit = 200): Promise<PodcastLookupResponse> {
  const response = await fetch(
    allOrigins(`${API_URL}/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=${limit}`)
  );
  const data = await response.json();

  return data;
}

/**
 * Local storage functions
 *
 * Get data from local storage or api.
 */

// get top podcasts data from local storage or fetch
export async function getTopPodcastsDataRaw(): Promise<TopPodcastsResponse> {
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
export async function getPodcastLookupDataRaw(id: number): Promise<PodcastLookupResponse> {
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

/**
 * Helper functions
 *
 * Get formatted data from local storage or api.
 */

// get top podcasts array
export async function getTopPodcastsData(): Promise<Array<TopPodcastsFeedEntry>> {
  const data = await getTopPodcastsDataRaw();

  return data?.feed?.entry || [];
}

// get podcast data from top podcasts array because podcast lookup data is not complete
export async function getPodcastData(id: string): Promise<TopPodcastsFeedEntry> {
  const data = await getTopPodcastsDataRaw();
  const podcast = data?.feed?.entry?.find?.((el) => el.id.attributes['im:id'] === id);

  return podcast;
}

// get podcast lookup episode array
export async function getPodcastEpisodesData(id: string): Promise<Array<PodcastLookupResult>> {
  const data = await getPodcastLookupDataRaw(Number(id));
  // remove first element because it is the podcast itself
  const episodes = data?.results?.slice?.(1) || [];

  return episodes;
}

// get podcast lookup episode
export async function getPodcastEpisodeData(podcastId: string, episodeId: string): Promise<PodcastLookupResult> {
  const data = await getPodcastLookupDataRaw(Number(podcastId));
  const episode = data?.results?.find?.((el) => el.trackId === Number(episodeId));

  return episode;
}
