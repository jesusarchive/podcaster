/* eslint-disable react/prop-types */
import './badge.css';

import clsx from 'clsx';
import React from 'react';

/**
 * Badge component
 *
 * Small numerical value or status descriptor.
 */
export default function Badge(props: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={clsx('badge', props.className)} {...props}>
      {props.children}
    </span>
  );
}
