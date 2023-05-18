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
