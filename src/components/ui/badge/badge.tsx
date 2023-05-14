/* eslint-disable react/prop-types */
import './badge.css';

import clsx from 'clsx';
import React from 'react';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

const Badge: React.FC<BadgeProps> = ({ className, children, ...props }) => {
  return (
    <span className={clsx('badge', className)} {...props}>
      {children}
    </span>
  );
};

export default Badge;
