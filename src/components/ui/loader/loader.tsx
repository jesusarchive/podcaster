import './loader.css';

import clsx from 'clsx';
import React from 'react';

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
}

/**
 * Loader component
 *
 * A loading indicator.
 */
export default function Loader({ loading = true, className, ...props }: LoaderProps) {
  return loading ? (
    <div className={clsx('loader', className)} {...props}>
      <div></div>
      <div></div>
    </div>
  ) : null;
}
