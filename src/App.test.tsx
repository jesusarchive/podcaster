import { render } from '@testing-library/react';
import React from 'react';

import App from './App';

describe('App', () => {
  test('renders App', () => {
    const wrapper = render(<App />);
    expect(wrapper).toBeTruthy();
  });
});
