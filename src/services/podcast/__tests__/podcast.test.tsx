import podcastLookupResponseMock from '../__mocks__/podcast-lookup-response-mock.json';
import topPodcastsResponseMock from '../__mocks__/top-podcasts-response-mock.json';
import { getPodcastData, getPodcastEpisodeData, getPodcastEpisodesData, getTopPodcastsData } from '../podcast';

describe('podcast service', () => {
  test('get top podcasts data', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({
          json: () => {
            return topPodcastsResponseMock;
          }
        });
      });
    });

    const data = await getTopPodcastsData();
    expect(data).toEqual(topPodcastsResponseMock.feed.entry);
  });

  test('get podcast data', async () => {
    const podcastId = '1489482036';

    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({
          json: () => {
            return topPodcastsResponseMock;
          }
        });
      });
    });

    const podcast = await getPodcastData(podcastId);
    expect(podcast.id.attributes['im:id']).toEqual(podcastId);
  });

  test('get podcast episodes data', async () => {
    const podcastId = '1685691481';

    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({
          json: () => {
            return podcastLookupResponseMock;
          }
        });
      });
    });

    const episodes = await getPodcastEpisodesData(podcastId);
    expect(episodes.length).toBeTruthy();
  });

  test('get podcast episode data', async () => {
    const podcastId = '1685691481';
    const episodeId = '1000613106312';

    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({
          json: () => {
            return podcastLookupResponseMock;
          }
        });
      });
    });

    const episode = await getPodcastEpisodeData(podcastId, episodeId);
    expect(episode.trackId).toEqual(Number(episodeId));
  });
});
