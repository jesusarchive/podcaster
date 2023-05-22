// PODCAST LIST PAGE
describe('podcast list page', () => {
  beforeEach(() => {
    const podcastId = '1545953110';
    cy.fixture('top-podcasts-response').then((topPodcasts) => {
      localStorage.setItem('local-storage-created-at', String(new Date()));
      localStorage.setItem('top-podcasts-response', JSON.stringify(topPodcasts));
    });

    cy.fixture(`podcast-lookup-response-${podcastId}`).then((podcastLookup) => {
      localStorage.setItem(`podcast-lookup-response-${podcastId}`, JSON.stringify(podcastLookup));
    });
    cy.intercept(
      'https://api.allorigins.win/raw?url=https%3A%2F%2Fitunes.apple.com%2Fus%2Frss%2Ftoppodcasts%2Flimit%3D100%2Fjson'
    ).as('getPodcasts');

    cy.visit('http://localhost:3000');
  });

  it('displays podcasts list', () => {
    // cy.wait('@getPodcasts');
    cy.get('.podcast-list').should('exist');
    cy.get('.podcast-list li').should('have.length', 100);
  });

  it('filters podcasts', () => {
    // cy.wait('@getPodcasts');
    cy.get('input[type="search"]').type('Huberman');
    cy.get('.podcast-list li').should('have.length', 1);
    cy.get('.podcast-list li').should('contain', 'Huberman');
  });

  it('stores data in local storage', () => {
    // cy.wait('@getPodcasts');
    expect(localStorage.getItem('local-storage-created-at')).to.exist;
  });

  it('navigates to podcast detail page', () => {
    // cy.wait('@getPodcasts');
    cy.get('input[type="search"]').type('Huberman');
    cy.get('.podcast-list li').should('have.length', 1);
    cy.get('.podcast-list li').should('contain', 'Huberman');
    cy.get('.podcast-list li').first().click();
    cy.url().should('include', '/podcast/');
  });
});

// PODCAST DETAIL PAGE
describe('podcast detail page', () => {
  beforeEach(() => {
    const podcastId = '1545953110';
    cy.fixture('top-podcasts-response').then((topPodcasts) => {
      localStorage.setItem('local-storage-created-at', String(new Date()));
      localStorage.setItem('top-podcasts-response', JSON.stringify(topPodcasts));
    });

    cy.fixture(`podcast-lookup-response-${podcastId}`).then((podcastLookup) => {
      localStorage.setItem(`podcast-lookup-response-${podcastId}`, JSON.stringify(podcastLookup));
    });
    cy.intercept(
      `https://api.allorigins.win/raw?url=https%3A%2F%2Fitunes.apple.com%2Flookup%3Fid%3D${podcastId}%26media%3Dpodcast%26entity%3DpodcastEpisode%26limit%3D50`
    ).as('getPodcastLookup');

    cy.visit(`http://localhost:3000/podcast/${podcastId}`);
  });

  it('displays podcasts detail and episodes table', () => {
    // cy.wait('@getPodcastLookup');
    cy.get('.podcast-detail-card').should('exist');
    cy.get('.podcast-detail-card').within(() => {
      cy.get('img').should('exist');
      cy.get('h2').should('exist');
      cy.get('span').should('exist');
      cy.get('h3').should('exist');
      cy.get('pre').should('exist');
    });
    cy.get('.podcast-detail-page').should('contain', 'Episodes');
    cy.get('.episodes-table').should('exist');
    cy.get('.episodes-table').within(() => {
      cy.get('thead').should('contain', 'Title');
      cy.get('thead').should('contain', 'Date');
      cy.get('thead').should('contain', 'Duration');
      cy.get('tbody tr').should('have.length', 50);
    });
  });

  it('navigates to episode detail page', () => {
    // cy.wait('@getPodcastLookup');
    cy.get('.episodes-table tbody tr a').first().click();
    cy.url().should('include', '/episode/');
  });
});

// EPISODE DETAIL PAGE
describe('episode detail page', () => {
  beforeEach(() => {
    const podcastId = '1545953110';
    cy.fixture('top-podcasts-response').then((topPodcasts) => {
      localStorage.setItem('local-storage-created-at', String(new Date()));
      localStorage.setItem('top-podcasts-response', JSON.stringify(topPodcasts));
    });

    cy.fixture(`podcast-lookup-response-${podcastId}`).then((podcastLookup) => {
      localStorage.setItem(`podcast-lookup-response-${podcastId}`, JSON.stringify(podcastLookup));
    });
    const episodeId = '1000613037781';
    cy.intercept(
      `https://api.allorigins.win/raw?url=https%3A%2F%2Fitunes.apple.com%2Flookup%3Fid%3D${podcastId}%26media%3Dpodcast%26entity%3DpodcastEpisode%26limit%3D50`
    ).as('getPodcastLookup');

    cy.visit(`http://localhost:3000/podcast/${podcastId}/episode/${episodeId}`);
  });

  it('displays episode detail and audio player', () => {
    // cy.wait('@getPodcastLookup');
    cy.get('.podcast-detail-card').should('exist');
    cy.get('.episode-listener').should('exist');
    cy.get('.episode-listener').within(() => {
      cy.get('h2').should('exist');
      cy.get('pre').should('exist');
      cy.get('audio').should('exist');
    });
  });

  it('displays audio timestamp controls', () => {
    // cy.wait('@getPodcastLookup');
    cy.get('.episode-listener').should('exist');
    cy.get('.episode-listener pre').within(() => {
      cy.get('.timestamp-control').first('exist');
    });
  });

  it('timestamp control changes audio time', () => {
    // cy.wait('@getPodcastLookup');
    cy.get('.episode-listener').should('exist');
    cy.get('.timestamp-control').eq(1).click();
    cy.get('.episode-listener audio').should('have.prop', 'currentTime').should('be.greaterThan', 0);
  });

  it('navigates to podcast detail page', () => {
    // cy.wait('@getPodcastLookup');
    cy.get('.podcast-detail-card').should('exist');
    cy.get('.podcast-detail-card').within(() => {
      cy.get('a').first().click();
    });
    cy.url().should('include', '/podcast/');
    cy.url().should('not.include', '/episode/');
  });
});
