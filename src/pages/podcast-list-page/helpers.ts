import { Podcast } from '@/services/podcasts/podcasts';

export function filterPodcasts(podcasts: Array<Podcast>, search: string) {
  return podcasts.filter((podcast) => {
    if (!search) {
      return true;
    }

    return (
      podcast['im:name'].label.toLowerCase().includes(search.toLowerCase()) ||
      podcast['im:artist'].label.toLowerCase().includes(search.toLowerCase())
    );
  });
}
