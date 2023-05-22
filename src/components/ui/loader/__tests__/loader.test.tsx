import { render } from '@testing-library/react';
import React from 'react';

import Loader from '..';

describe('<Loader />', () => {
  it('should render the loader component', () => {
    const { container } = render(<Loader />);

    expect(container).toMatchSnapshot();
  });

  it('should render the loader component with a custom class', () => {
    const { container } = render(<Loader className="custom-class" />);

    expect(container.firstChild).toHaveClass('custom-class');
    expect(container).toMatchSnapshot();
  });

  it('should not render the loader component when loading is false', () => {
    const { container } = render(<Loader loading={false} />);

    expect(container).toBeEmptyDOMElement();
    expect(container).toMatchSnapshot();
  });
});
