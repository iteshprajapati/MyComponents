import React from 'react';
import './Timeline.scss';

export const Timeline = ({
  items = [],
  orientation = 'vertical',
  className = '',
  ...props
}) => {
  return (
    <div className={`timeline timeline-${orientation} ${className}`} {...props}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`timeline-item timeline-status-${item.status || 'upcoming'}`}
        >
          <div className="timeline-connector-wrapper">
            <div className="timeline-node">
              {item.icon ? (
                <span className="timeline-node-icon">{item.icon}</span>
              ) : (
                <div className="timeline-node-dot" />
              )}
            </div>
            {index < items.length - 1 && <div className="timeline-connector" />}
          </div>
          <div className="timeline-content-wrapper">
            <div className="timeline-header">
              <span className="timeline-title">{item.title}</span>
              {item.date && <span className="timeline-date">{item.date}</span>}
            </div>
            {item.subtitle && <div className="timeline-subtitle">{item.subtitle}</div>}
            {item.description && (
              <p className="timeline-description">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
