import React from 'react';
import './StatCard.scss';

export const StatCard = ({
  title,
  value,
  icon = null,
  trend = null,
  trendDirection = 'neutral', // 'up' | 'down' | 'neutral'
  trendLabel = '',
  className = '',
  ...props
}) => {
  const getTrendClass = () => {
    switch (trendDirection) {
      case 'up':
        return 'trend-up';
      case 'down':
        return 'trend-down';
      default:
        return 'trend-neutral';
    }
  };

  const getTrendIcon = () => {
    switch (trendDirection) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '•';
    }
  };

  return (
    <div className={`stat-card ${className}`} {...props}>
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        {icon && <span className="stat-card-icon">{icon}</span>}
      </div>
      <div className="stat-card-body">
        <h3 className="stat-card-value">{value}</h3>
        {(trend || trendLabel) && (
          <div className="stat-card-trend-container">
            {trend && (
              <span className={`stat-card-trend ${getTrendClass()}`}>
                <span className="trend-arrow">{getTrendIcon()}</span> {trend}
              </span>
            )}
            {trendLabel && <span className="stat-card-trend-label">{trendLabel}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
