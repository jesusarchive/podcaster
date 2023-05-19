import '@testing-library/jest-dom/extend-expect';

require('jest-fetch-mock').enableMocks();

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
