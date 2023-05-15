interface Imname {
  label: string;
}

interface Atributes {
  height: string;
}

interface Imimage {
  label: string;
  attributes: Atributes;
}

interface Attributes2 {
  amount: string;
  currency: string;
}

interface Imprice {
  label: string;
  attributes: Attributes2;
}

interface Attributes3 {
  term: string;
  label: string;
}

interface ImcontentType {
  attributes: Attributes3;
}

interface ImreleaseDate {
  label: string;
  attributes: Imname;
}

interface Attributes4 {
  rel: string;
  type: string;
  href: string;
}

interface Link {
  attributes: Attributes4;
}

interface Attributes5 {
  'im:id': string;
}

interface Id {
  label: string;
  attributes: Attributes5;
}

interface Attributes6 {
  href: string;
}

interface Imartist {
  label: string;
  attributes: Attributes6;
}

interface Attributes7 {
  'im:id': string;
  term: string;
  scheme: string;
  label: string;
}

interface Category {
  attributes: Attributes7;
}

export interface PodcastType {
  'im:name': Imname;
  'im:image': Array<Imimage>;
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

export interface PodcastDetailType {
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

interface Genre {
  name: string;
  id: string;
}

export interface EpisodeType {
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
