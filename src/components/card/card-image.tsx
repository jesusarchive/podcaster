/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

type CardImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const CardImage: React.FC<CardImageProps> = (props) => {
  return <img {...props} />;
};

export default CardImage;
