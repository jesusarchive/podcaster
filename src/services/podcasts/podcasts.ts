interface ImreleaseDate {
  label: string;
  attributes: Imname;
}

interface Category {
  attributes: Attributes7;
}

interface Attributes7 {
  'im:id': string;
  term: string;
  scheme: string;
  label: string;
}

interface Imartist {
  label: string;
  attributes: Attributes6;
}

interface Attributes6 {
  href: string;
}

interface Id {
  label: string;
  attributes: Attributes5;
}

interface Attributes5 {
  'im:id': string;
}

interface Link {
  attributes: Attributes4;
}

interface Attributes4 {
  rel: string;
  type: string;
  href: string;
}

interface ImcontentType {
  attributes: Attributes3;
}

interface Attributes3 {
  term: string;
  label: string;
}

interface Imprice {
  label: string;
  attributes: Attributes2;
}

interface Attributes2 {
  amount: string;
  currency: string;
}

interface Imimage {
  label: string;
  attributes: Attributes;
}

interface Attributes {
  height: string;
}

interface Imname {
  label: string;
}

export interface Podcast {
  'im:name': Imname;
  'im:image': Imimage[];
  summary: Imname;
  'im:price': Imprice;
  'im:contentType': ImcontentType;
  rights: Imname;
  title: Imname;
  link: Link;
  id: Id;
  'im:artist': Imartist;
  category: Category;
  'im:releaseDate': ImreleaseDate;
}

export interface PodcastDetail {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  collectionHdPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  artworkUrl600: string;
  genreIds: string[];
  genres: string[];
}

export interface Episode {
  country: string;
  artworkUrl600: string;
  feedUrl: string;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  trackTimeMillis: number;
  contentAdvisoryRating: string;
  artworkUrl60: string;
  genres: Genre[];
  episodeGuid: string;
  description: string;
  trackId: number;
  trackName: string;
  releaseDate: string;
  shortDescription: string;
  artworkUrl160: string;
  episodeFileExtension: string;
  episodeContentType: string;
  previewUrl: string;
  episodeUrl: string;
  kind: string;
  wrapperType: string;
  artistIds: any[];
}

interface Genre {
  name: string;
  id: string;
}

export async function getPodcasts(): Promise<{ feed: { entry: Array<Podcast> } }> {
  const response = await fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/json`);
  const data = await response.json();

  return data;
}

export async function getPodcast(id: number): Promise<{ results: Array<PodcastDetail | Episode> }> {
  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20/json`
  );
  const data = await response.json();

  return data;
}
