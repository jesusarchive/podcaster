/**
 * Make request
 *
 * Centralize api utility functions, independent of the library used. E.g. fetch, axios, etc.
 *
 * Fetch data from api and handle errors.
 */
export async function makeRequest(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, init);
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}
