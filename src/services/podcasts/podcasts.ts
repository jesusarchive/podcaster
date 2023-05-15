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

export async function getPodcasts(): Promise<{ feed: { entry: Array<Podcast> } }> {
  const response = await fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`);
  const data = await response.json();

  return data;
}
