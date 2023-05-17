import { render } from '@testing-library/react';
import React from 'react';

import Input from '..';

describe('Input', () => {
  it('should render the input component', () => {
    const { container } = render(<Input />);

    expect(container).toMatchSnapshot();
  });

  it('should render the input component with props', () => {
    const { container } = render(<Input placeholder="input" type="text" value="input" />);

    expect(container).toMatchSnapshot();
  });

  it('should render the input component with a custom class name', () => {
    const { container } = render(<Input className="custom-class" />);

    expect(container.firstChild).toHaveClass('custom-class');
    expect(container).toMatchSnapshot();
  });

  it('should render the input component without bordered prop', () => {
    const { container } = render(<Input bordered={false} />);

    expect(container.firstChild).not.toHaveClass('input-bordered');
    expect(container).toMatchSnapshot();
  });
});
