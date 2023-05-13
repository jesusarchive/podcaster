export const podcastsMock = Array.from({ length: 100 }, (_, index) => ({
  id: index,
  logo: `https://picsum.photos/seed/${index}/200/200`,
  title: `Podcast ${index}`,
  author: `Author ${index}`
}));

export function filterPodcasts(podcasts: typeof podcastsMock, search: string) {
  return podcasts.filter((podcast: (typeof podcasts)[0]) => {
    if (!search) {
      return true;
    }

    return (
      podcast.title.toLowerCase().includes(search.toLowerCase()) ||
      podcast.author.toLowerCase().includes(search.toLowerCase())
    );
  });
}
