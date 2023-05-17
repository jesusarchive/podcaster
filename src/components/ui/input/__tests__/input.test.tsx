import { render } from '@testing-library/react';
import React from 'react';

import Input from '../input';

describe('Input', () => {
  it('should render the input component', () => {
    const { container } = render(<Input />);

    expect(container).toMatchSnapshot();
  });

  it('should render the input component with props', () => {
    const { container } = render(<Input placeholder="input" type="text" value="input" />);

    expect(container).toMatchSnapshot();
  });
});
