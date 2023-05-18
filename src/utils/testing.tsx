/**
 * Testing utilities
 *
 * Centrailize testing utilities for unit tests indepedent of the testing library used.
 */

// Render a component with react-router-dom BrowserRouter wrapper
// export function renderWithRouter(ui, { route = '/' } = {}) {
//   window.history.pushState({}, 'Test page', route);

//   return {
//     ...render(ui, { wrapper: BrowserRouter })
//   };
// }

// export function renderWithRouter(element, loader) {
//   const routes = [
//     {
//       path: '/',
//       element,
//       loader
//     }
//   ];

//   const router = createMemoryRouter(routes, { initialEntries: ['/'] });

//   return {
//     ...render(<RouterProvider router={router} />)
//   };
// }

export function getWindow(initialUrl: string): Window {
  window.history.replaceState(null, '', initialUrl);

  return window as unknown as Window;
}

export function createDeferred() {
  let resolve: (val?: any) => Promise<void>;
  let reject: (error?: Error) => Promise<void>;
  const promise = new Promise((res, rej) => {
    resolve = async (val: any) => {
      console.warn('RESOLVE', val);
      res(val);
      try {
        await promise;
      } catch (e) {}
    };
    reject = async (error?: Error) => {
      rej(error);
      try {
        await promise;
      } catch (e) {}
    };
  });

  return {
    promise,
    resolve,
    reject
  };
}
