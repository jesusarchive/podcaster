// loader component tests using react-testing-library

import { render } from '@testing-library/react';
import React from 'react';

import Loader from '..';

describe('<Loader />', () => {
  it('should render the loader component', () => {
    const { container } = render(<Loader />);

    expect(container).toMatchSnapshot();
  });
});
