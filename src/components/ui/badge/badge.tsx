/* eslint-disable react/prop-types */
import './badge.css';

import clsx from 'clsx';
import React from 'react';

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * Badge component
 *
 * Small numerical value or status descriptor.
 */
export default function Badge({ className, ...props }: BadgeProps) {
  return (
    <span className={clsx('badge', className)} {...props}>
      {props.children}
    </span>
  );
}
