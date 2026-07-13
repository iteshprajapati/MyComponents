import React from 'react';
import './Selection.scss';

export const Checkbox = ({
  label,
  id,
  checked = false,
  onChange,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <label className={`selection-label checkbox-container ${disabled ? 'is-disabled' : ''} ${className}`}>
      <div className="selection-input-wrapper">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="real-checkbox"
          {...props}
        />
        <div className="custom-checkbox">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="checkmark">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
      {label && <span className="selection-text">{label}</span>}
    </label>
  );
};

export const Radio = ({
  label,
  id,
  name,
  value,
  checked = false,
  onChange,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <label className={`selection-label radio-container ${disabled ? 'is-disabled' : ''} ${className}`}>
      <div className="selection-input-wrapper">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="real-radio"
          {...props}
        />
        <div className="custom-radio">
          <div className="radio-dot" />
        </div>
      </div>
      {label && <span className="selection-text">{label}</span>}
    </label>
  );
};

export const Switch = ({
  label,
  id,
  checked = false,
  onChange,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <label className={`selection-label switch-container ${disabled ? 'is-disabled' : ''} ${className}`}>
      <div className="selection-input-wrapper">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="real-switch"
          {...props}
        />
        <div className="custom-switch">
          <div className="switch-thumb" />
        </div>
      </div>
      {label && <span className="selection-text">{label}</span>}
    </label>
  );
};
