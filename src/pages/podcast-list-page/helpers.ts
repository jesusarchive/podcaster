import { TopPodcastsFeedEntry } from '@/services/podcast';

export function filterPodcasts(podcasts: Array<TopPodcastsFeedEntry>, search: string) {
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
