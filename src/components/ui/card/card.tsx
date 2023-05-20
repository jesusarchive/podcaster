/* eslint-disable react/prop-types */
import './card.css';

import clsx from 'clsx';
import React from 'react';

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Card component
 *
 * A flexible container for displaying content.
 */
export default function Card({ className, ...props }: CardProps) {
  return <div className={clsx('card', className)} {...props}></div>;
}
