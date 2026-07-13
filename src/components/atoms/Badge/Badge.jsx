import React from 'react';
import './Badge.scss';

export const Badge = ({
  children,
  variant = 'soft',
  color = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  return (
    <span
      className={`badge badge-${variant} badge-${color} badge-${size} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
