import '@testing-library/jest-dom/extend-expect';
import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
