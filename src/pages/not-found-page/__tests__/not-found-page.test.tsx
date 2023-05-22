import { render } from '@testing-library/react';
import React from 'react';

import NotFoundPage from '..';

describe('<NotFoundPage />', () => {
  it('renders not found page', () => {
    const wrapper = render(<NotFoundPage />);
    expect(wrapper).toBeTruthy();
    expect(wrapper.getByText('Page not found')).toBeTruthy();
  });
});
