import { render } from '@testing-library/react';
import React from 'react';

import Badge from '../badge';

describe('Badge', () => {
  it('should render the badge component', () => {
    const { container } = render(<Badge>Badge</Badge>);

    expect(container).toMatchSnapshot();
  });
});
