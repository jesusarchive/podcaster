import { render } from '@testing-library/react';
import React from 'react';

import Card from '..';

describe('Card', () => {
  it('should render the card component', () => {
    const { container } = render(<Card>Card</Card>);

    expect(container).toMatchSnapshot();
  });

  it('should render the card component with a custom class name', () => {
    const { container } = render(<Card className="custom-class">Card</Card>);

    expect(container.firstChild).toHaveClass('custom-class');
    expect(container).toMatchSnapshot();
  });
});
