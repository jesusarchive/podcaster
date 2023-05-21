import { makeRequest } from '@/utils/make-request';

import { PodcastLookupResponse, PodcastLookupResult, TopPodcastsFeedEntry, TopPodcastsResponse } from './types';

/**
 * API functions
 */

const API_URL = 'https://itunes.apple.com';
const TOP_PODCASTS_LIMIT = 100;
const PODCAST_EPISODES_LIMIT = 50;

// wrap url in allorigins
export function allOrigins(url: string): string {
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
}

// get top podcasts
export async function getTopPodcasts(limit = TOP_PODCASTS_LIMIT): Promise<TopPodcastsResponse> {
  const url = `${API_URL}/us/rss/toppodcasts/limit=${limit}/json`;
  const data = await makeRequest(url);

  return data;
}

// get podcast lookup data, results array 1st element is the podcast itself and the rest are the podcast episodes
export async function getPodcastLookup(id: number, limit = PODCAST_EPISODES_LIMIT): Promise<PodcastLookupResponse> {
  const url = `${API_URL}/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=${limit}`;
  const data = await makeRequest(allOrigins(url));

  return data;
}

/**
 * Local storage functions
 *
 * Get data from local storage or api.
 */

// handle local storage cleanup
function handleLocalStorageCleanup() {
  const localStorageKey = 'local-storage-created-at';
  const createdAt = localStorage.getItem(localStorageKey);

  if (!createdAt) {
    // set created at
    localStorage.setItem(localStorageKey, String(new Date()));
  } else {
    // check if storage was created more than a day ago and clear it
    const now = new Date();
    const parsedCreatedAt = new Date(createdAt);
    // get date difference in days
    const diffDays = Math.floor((Number(now) - Number(parsedCreatedAt)) / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      localStorage.clear();
      localStorage.setItem(localStorageKey, String(new Date()));
      window.location.href = '/';
    }
  }
}

// get top podcasts data from local storage or fetch
export async function getTopPodcastsDataRaw(): Promise<TopPodcastsResponse> {
  handleLocalStorageCleanup();
  const localStorageKey = 'top-podcasts-response';
  const rawTopPodcastsData = localStorage.getItem(localStorageKey);
  const parsedTopPodcastsData = rawTopPodcastsData && JSON.parse(rawTopPodcastsData);
  // get data from api or local storage
  const data = (parsedTopPodcastsData as TopPodcastsResponse) || (await getTopPodcasts());

  // if no local storage data, set local storage data
  if (!rawTopPodcastsData) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }

  return data;
}

// get podcast lookup data from local storage or api
export async function getPodcastLookupDataRaw(id: number): Promise<PodcastLookupResponse> {
  handleLocalStorageCleanup();
  const localStorageKey = `podcast-lookup-response-${id}`;
  const rawPodcastLookupResponsesData = localStorage.getItem(localStorageKey);
  const parsedPodcastLookupResponsesData = rawPodcastLookupResponsesData && JSON.parse(rawPodcastLookupResponsesData);
  const podcastLookupData = parsedPodcastLookupResponsesData;
  // get data from api or local storage
  const data = (podcastLookupData as PodcastLookupResponse) || (await getPodcastLookup(id));

  // if no local storage data, set local storage data
  if (!podcastLookupData) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
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
  const episodes = await getPodcastEpisodesData(podcastId);
  const episode = episodes?.find?.((el) => el.trackId === Number(episodeId));

  return episode;
}
