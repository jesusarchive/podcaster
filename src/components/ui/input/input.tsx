/* eslint-disable react/prop-types */
import './input.css';

import clsx from 'clsx';
import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  bordered?: boolean;
}
const Input: React.FC<InputProps> = ({ bordered = true, className, ...props }) => {
  return <input {...props} className={clsx('input', className, { 'input-bordered': bordered })} />;
};

export default Input;
