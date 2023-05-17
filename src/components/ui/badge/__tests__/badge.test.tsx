import { render } from '@testing-library/react';
import React from 'react';

import Badge from '..';

describe('Badge', () => {
  it('should render the badge component', () => {
    const { container } = render(<Badge>Badge</Badge>);

    expect(container).toMatchSnapshot();
  });

  it('should render the badge component with a custom class name', () => {
    const { container } = render(<Badge className="custom-class">Badge</Badge>);

    expect(container.firstChild).toHaveClass('custom-class');
    expect(container).toMatchSnapshot();
  });
});
