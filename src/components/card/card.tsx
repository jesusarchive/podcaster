/* eslint-disable react/prop-types */
import './card.css';

import clsx from 'clsx';
import React from 'react';

import CardActions from './card-actions';
import CardBody from './card-body';
import CardImage from './card-image';
import CardTitle from './card-title';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

const Card: React.FC<CardProps> = ({ className, ...props }) => {
  return <div className={clsx('card', className)} {...props}></div>;
};

export default Object.assign(Card, {
  Actions: CardActions,
  Body: CardBody,
  Title: CardTitle,
  Image: CardImage
});
