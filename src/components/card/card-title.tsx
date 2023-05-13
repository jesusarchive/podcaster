import clsx from 'clsx';
import React from 'react';

interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  tag?: React.ElementType;
}

const CardTitle: React.FC<CardTitleProps> = ({ children, tag = 'div', className, ...props }) => {
  const Tag = tag;

  return (
    <Tag {...props} className={clsx('card-title', className)}>
      {children}
    </Tag>
  );
};

export default CardTitle;
