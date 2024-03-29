/* eslint-disable react/prop-types */
import './input.css';

import clsx from 'clsx';
import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  bordered?: boolean;
}

/**
 * Input component
 *
 * A basic input field with styles.
 */
export default function Input({ bordered = true, className, ...props }: InputProps) {
  return <input {...props} className={clsx('input', className, { 'input-bordered': bordered })} />;
}
