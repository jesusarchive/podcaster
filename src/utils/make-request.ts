/**
 * Make request
 *
 * Centralize api utility functions, independent of the library used. E.g. fetch, axios, etc.
 *
 * Fetch data from api and handle errors.
 */
export async function makeRequest(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, init);

  let data = null;

  try {
    data = await response.json();
  } catch (error) {
    throw new Error('Error parsing response');
  }

  if (data && data.error) {
    throw new Error(data.error);
  }

  return data;
}

// wrap url in allorigins
export function allOrigins(url: string): string {
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
}
