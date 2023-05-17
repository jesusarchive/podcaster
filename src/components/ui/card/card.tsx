/* eslint-disable react/prop-types */
import './card.css';

import clsx from 'clsx';
import React from 'react';

/**
 * Card component
 *
 * A flexible container for displaying content.
 */
export default function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('card', className)} {...props}></div>;
}
