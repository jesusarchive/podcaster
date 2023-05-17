import { render } from '@testing-library/react';
import React from 'react';

import Card from '../card';

describe('Card', () => {
  it('should render the card component', () => {
    const { container } = render(<Card>Card</Card>);

    expect(container).toMatchSnapshot();
  });
});
