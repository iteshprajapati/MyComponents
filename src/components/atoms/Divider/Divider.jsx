import React from 'react';
import './Divider.scss';

export const Divider = ({
  children,
  orientation = 'horizontal',
  type = 'solid',
  className = '',
  textAlign = 'center',
  ...props
}) => {
  const hasContent = !!children && orientation === 'horizontal';

  return (
    <div
      className={`divider divider-${orientation} divider-${type} ${hasContent ? `divider-with-text divider-text-${textAlign}` : ''} ${className}`}
      role="separator"
      {...props}
    >
      {hasContent && <span className="divider-text-content">{children}</span>}
    </div>
  );
};
