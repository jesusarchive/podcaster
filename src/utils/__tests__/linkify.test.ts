// test linkify util

import { linkify } from '../linkify';

describe('linkify', () => {
  it('should linkify text with url', () => {
    const test = 'https://www.google.com';

    expect(linkify(test)).toEqual(
      '<a href="https://www.google.com" target="_blank" rel="noopener noreferrer">https://www.google.com</a>'
    );
  });

  it('should linkify text with url without protocol', () => {
    const test = 'www.google.com';

    expect(linkify(test)).toEqual(
      '<a href="http://www.google.com" target="_blank" rel="noopener noreferrer">www.google.com</a>'
    );
  });

  it('should linkify text with http url', () => {
    const test = 'http://www.google.com';

    expect(linkify(test)).toEqual(
      '<a href="http://www.google.com" target="_blank" rel="noopener noreferrer">http://www.google.com</a>'
    );
  });

  it('should linkify text with email', () => {
    const test = 'user@email.com';

    expect(linkify(test)).toEqual('<a href="mailto:user@email.com">user@email.com</a>');
  });
});
