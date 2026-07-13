import React, { useState } from 'react';
import './Tooltip.scss';

export const Tooltip = ({
  content,
  position = 'top',
  children,
  className = '',
  ...props
}) => {
  const [active, setActive] = useState(false);

  const showTooltip = () => setActive(true);
  const hideTooltip = () => setActive(false);

  return (
    <div
      className={`tooltip-wrapper ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      {...props}
    >
      {children}
      {active && (
        <div className={`tooltip-bubble tooltip-${position}`}>
          <div className="tooltip-content">{content}</div>
          <div className="tooltip-arrow" />
        </div>
      )}
    </div>
  );
};
export default Tooltip;
