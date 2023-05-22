// test use document title hook

import { render } from '@testing-library/react';
import React from 'react';

import { useDocumentTitle } from '../use-document-title';

const TestComponent = ({ title }: { title: string }) => {
  useDocumentTitle(title);

  return <div />;
};

describe('useDocumentTitle', () => {
  it('should set document title', () => {
    render(<TestComponent title="test title" />);
    expect(document.title).toEqual('test title');
  });
});
