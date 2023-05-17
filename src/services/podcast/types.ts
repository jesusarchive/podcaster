/**
 * Types for the podcast service
 */

// Top podcasts
export type TopPodcastsFeedEntry = {
  'im:name': {
    label: string;
  };
  'im:image': Array<{
    label: string;
    attributes: {
      height: string;
    };
  }>;
  summary: {
    label: string;
  };
  'im:price': {
    label: string;
    attributes: {
      amount: string;
      currency: string;
    };
  };
  'im:contentType': {
    attributes: {
      term: string;
      label: string;
    };
  };
  rights?: {
    label: string;
  };
  title: {
    label: string;
  };
  link: {
    attributes: {
      rel: string;
      type: string;
      href: string;
    };
  };
  id: {
    label: string;
    attributes: {
      'im:id': string;
    };
  };
  'im:artist': {
    label: string;
    attributes?: {
      href: string;
    };
  };
  category: {
    attributes: {
      'im:id': string;
      term: string;
      scheme: string;
      label: string;
    };
  };
  'im:releaseDate': {
    label: string;
    attributes: {
      label: string;
    };
  };
};

export type TopPodcastsResponse = {
  feed: {
    author: {
      name: {
        label: string;
      };
      uri: {
        label: string;
      };
    };
    entry: Array<TopPodcastsFeedEntry>;
    updated: {
      label: string;
    };
    rights: {
      label: string;
    };
    title: {
      label: string;
    };
    icon: {
      label: string;
    };
    link: Array<{
      attributes: {
        rel: string;
        type?: string;
        href: string;
      };
    }>;
    id: {
      label: string;
    };
  };
};

// Podcast lookup
export type PodcastLookupResult = {
  wrapperType: string;
  kind: string;
  artistId?: number;
  collectionId: number;
  trackId: number;
  artistName?: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName?: string;
  trackCensoredName?: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30?: string;
  artworkUrl60: string;
  artworkUrl100?: string;
  collectionPrice?: number;
  trackPrice?: number;
  collectionHdPrice?: number;
  releaseDate: string;
  collectionExplicitness?: string;
  trackExplicitness?: string;
  trackCount?: number;
  trackTimeMillis: number;
  country: string;
  currency?: string;
  primaryGenreName?: string;
  contentAdvisoryRating: string;
  artworkUrl600: string;
  genreIds?: Array<string>;
  genres: Array<unknown>;
  episodeUrl?: string;
  artistIds?: Array<number>;
  closedCaptioning?: string;
  previewUrl?: string;
  episodeGuid?: string;
  description?: string;
  shortDescription?: string;
  artworkUrl160?: string;
  episodeFileExtension?: string;
  episodeContentType?: string;
};

export type PodcastLookupResponse = {
  resultCount: number;
  results: Array<PodcastLookupResult>;
};
