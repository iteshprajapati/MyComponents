import React from 'react';
import './Progress.scss';

export const Spinner = ({
  size = 'md',
  color = 'primary',
  className = '',
  ...props
}) => {
  return (
    <div className={`spinner-container spinner-${size} spinner-${color} ${className}`} {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="spinner-track" />
        <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="spinner-head" />
      </svg>
    </div>
  );
};

export const LinearProgress = ({
  value, // 0 to 100
  indeterminate = false,
  color = 'primary',
  height = '6px',
  showValue = false,
  className = '',
  ...props
}) => {
  const percentValue = Math.min(Math.max(value || 0, 0), 100);

  return (
    <div className={`linear-progress-container ${className}`} {...props}>
      {showValue && !indeterminate && (
        <div className="progress-value-label">{percentValue}%</div>
      )}
      <div className="progress-track" style={{ height }}>
        <div
          className={`progress-bar progress-bar-${color} ${indeterminate ? 'progress-bar-indeterminate' : ''}`}
          style={{ width: indeterminate ? 'auto' : `${percentValue}%` }}
        />
      </div>
    </div>
  );
};
