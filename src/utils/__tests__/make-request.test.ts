import fetchMock from 'jest-fetch-mock';

import { makeRequest } from '../make-request';

describe('makeRequest', () => {
  it('should return a promise', () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));
    const promise = makeRequest('https://jsonplaceholder.typicode.com/todos/1');
    expect(promise).toBeInstanceOf(Promise);
  });

  it('should return a promise that resolves to the data', async () => {
    const mockData = {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    const data = await makeRequest('https://jsonplaceholder.typicode.com/todos/1');
    expect(data).toEqual(mockData);
  });

  it('should throw an error when response data has error', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ error: 'error message' }));
    await expect(makeRequest('https://jsonplaceholder.typicode.com/todos/1')).rejects.toThrow('error message');
  });
});
