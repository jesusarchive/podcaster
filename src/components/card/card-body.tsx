/* eslint-disable react/prop-types */
import clsx from 'clsx';
import React from 'react';

type CardBodyProps = React.HTMLAttributes<HTMLDivElement>;

const CardBody: React.FC<CardBodyProps> = ({ className, ...props }) => {
  return <div {...props} className={clsx('card-body', className)} />;
};

export default CardBody;
