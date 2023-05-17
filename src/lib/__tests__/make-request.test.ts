import { makeRequest } from '../make-request';

const mockData = {
  userId: 1,
  id: 1,
  title: 'delectus aut autem',
  completed: false
};

describe('makeRequest', () => {
  beforeAll(() => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    );
  });

  it('should return a promise', () => {
    const promise = makeRequest('https://jsonplaceholder.typicode.com/todos/1');
    expect(promise).toBeInstanceOf(Promise);
  });

  it('should return a promise that resolves to the data', async () => {
    const data = await makeRequest('https://jsonplaceholder.typicode.com/todos/1');
    expect(data).toEqual(mockData);
  });

  it('should throw an error when response data has error', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            error: 'error message'
          })
      })
    );

    await expect(makeRequest('https://jsonplaceholder.typicode.com/todos/1')).rejects.toThrow('error message');
  });
});
