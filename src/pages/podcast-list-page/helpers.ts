import { PodcastType } from '@/services/podcasts';

export function filterPodcasts(podcasts: Array<PodcastType>, search: string) {
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
