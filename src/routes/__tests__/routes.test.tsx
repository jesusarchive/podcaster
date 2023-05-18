import { render } from '@testing-library/react';
import React from 'react';
import { RouterProvider } from 'react-router-dom';

import router from '..';

describe('<Router />', () => {
  it('renders router', () => {
    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });
});
