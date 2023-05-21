import podcastLookupResponseMock from '../__mocks__/podcast-lookup-response-mock.json';
import topPodcastsResponseMock from '../__mocks__/top-podcasts-response-mock.json';
import { getPodcastData, getPodcastEpisodeData, getPodcastEpisodesData, getTopPodcastsData } from '../podcast';

describe('podcast service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('get top podcasts data', async () => {
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

  it('get podcast data', async () => {
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

  it('get podcast episodes data', async () => {
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

  it('get podcast episode data', async () => {
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

  it('clean local stoage when it is older than a day', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({
          json: () => {
            return topPodcastsResponseMock;
          }
        });
      });
    });

    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 2);
    localStorage.setItem('local-storage-created-at', String(oldDate));

    await getTopPodcastsData();
    expect(localStorage.getItem('local-storage-created-at')).not.toEqual(oldDate);
  });

  it('should return default values', async () => {
    localStorage.clear();
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({
          json: () => {
            return null;
          }
        });
      });
    });

    await getTopPodcastsData();
    await getPodcastData('123');
    await getPodcastEpisodesData('123');
    await getPodcastEpisodeData('123', '123');
  });
});
