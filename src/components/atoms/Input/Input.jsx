import React from 'react';
import './Input.scss';

export const Input = ({
  label,
  error,
  helperText,
  id,
  type = 'text',
  leftIcon = null,
  rightIcon = null,
  fullWidth = false,
  className = '',
  disabled = false,
  required = false,
  ...props
}) => {
  const hasIconLeft = !!leftIcon;
  const hasIconRight = !!rightIcon;

  return (
    <div className={`form-group ${fullWidth ? 'full-width' : ''} ${error ? 'has-error' : ''} ${disabled ? 'is-disabled' : ''} ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="label-required">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {leftIcon && <span className="input-icon icon-left">{leftIcon}</span>}
        <input
          id={id}
          type={type}
          disabled={disabled}
          required={required}
          className={`form-input ${hasIconLeft ? 'with-left-icon' : ''} ${hasIconRight ? 'with-right-icon' : ''}`}
          {...props}
        />
        {rightIcon && <span className="input-icon icon-right">{rightIcon}</span>}
      </div>
      {error && <span className="input-error-msg">{error}</span>}
      {!error && helperText && <span className="input-helper-msg">{helperText}</span>}
    </div>
  );
};
