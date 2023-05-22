import { allOrigins, makeRequest } from '@/utils/make-request';

import {
  API_URL,
  PODCAST_EPISODES_LIMIT,
  PODCAST_LOOKUP_LOCAL_STORAGE_KEY,
  TOP_PODCASTS_LIMIT,
  TOP_PODCASTS_LOCAL_STORAGE_KEY
} from './constants';
import { getLocalStorageData } from './helpers';
import { PodcastLookupResponse, PodcastLookupResult, TopPodcastsFeedEntry, TopPodcastsResponse } from './types';

/**
 * API raw data functions
 */

// get top podcasts raw data
export async function getTopPodcasts(limit = TOP_PODCASTS_LIMIT): Promise<TopPodcastsResponse> {
  const url = `${API_URL}/us/rss/toppodcasts/limit=${limit}/json`;
  const data = await makeRequest(allOrigins(url));

  return data;
}

// get podcast lookup raw data, results array 1st element is the podcast itself and the rest are the podcast episodes
export async function getPodcastLookup(id: number, limit = PODCAST_EPISODES_LIMIT): Promise<PodcastLookupResponse> {
  const url = `${API_URL}/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=${limit}`;
  const data = await makeRequest(allOrigins(url));

  return data;
}

/**
 * Get formatted data from local storage or api
 */

// get top podcasts array
export async function getTopPodcastsData(): Promise<Array<TopPodcastsFeedEntry>> {
  const localStorageData = getLocalStorageData(TOP_PODCASTS_LOCAL_STORAGE_KEY);
  const data = (localStorageData as TopPodcastsResponse) || (await getTopPodcasts());

  if (!localStorageData) {
    localStorage.setItem(TOP_PODCASTS_LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  return data?.feed?.entry || [];
}

// get podcast data from top podcasts array because podcast lookup data is not complete
export async function getPodcastData(id: string): Promise<TopPodcastsFeedEntry> {
  const podcasts = await getTopPodcastsData();
  const podcast = podcasts.find((el) => el.id.attributes['im:id'] === id);

  return podcast;
}

// get podcast lookup episodes array
export async function getPodcastEpisodesData(id: string): Promise<Array<PodcastLookupResult>> {
  const localStorageKey = `${PODCAST_LOOKUP_LOCAL_STORAGE_KEY}-${id}`;
  const localStorageData = getLocalStorageData(localStorageKey);
  const data = (localStorageData as PodcastLookupResponse) || (await getPodcastLookup(Number(id)));

  if (!localStorageData) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }

  // remove first element because it is the podcast itself
  const episodes = data?.results?.slice?.(1) || [];

  return episodes;
}

// get podcast lookup episode
export async function getPodcastEpisodeData(podcastId: string, episodeId: string): Promise<PodcastLookupResult> {
  const episodes = await getPodcastEpisodesData(podcastId);
  const episode = episodes.find((el) => el.trackId === Number(episodeId));

  return episode;
}
