import React, { useEffect, useRef, useState } from 'react';
import './TabStrip.scss';

export const TabStrip = ({
  tabs = [], // [{ id, label, badge }]
  activeTabId,
  onChange,
  variant = 'line', // 'line' | 'pills'
  className = '',
  ...props
}) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef({});
  const containerRef = useRef(null);

  useEffect(() => {
    const activeTab = tabsRef.current[activeTabId];
    if (activeTab && containerRef.current && variant === 'line') {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      
      setIndicatorStyle({
        width: tabRect.width,
        left: tabRect.left - containerRect.left,
      });
    }
  }, [activeTabId, variant, tabs]);

  return (
    <div
      ref={containerRef}
      className={`tab-strip-container tab-strip-${variant} ${className}`}
      {...props}
    >
      <div className="tab-strip-scrollable">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => (tabsRef.current[tab.id] = el)}
            type="button"
            className={`tab-item ${activeTabId === tab.id ? 'is-active' : ''}`}
            onClick={() => onChange && onChange(tab.id)}
          >
            <span className="tab-label">{tab.label}</span>
            {tab.badge !== undefined && tab.badge !== null && (
              <span className="tab-badge">{tab.badge}</span>
            )}
          </button>
        ))}
        {variant === 'line' && (
          <div className="tab-active-indicator" style={indicatorStyle} />
        )}
      </div>
    </div>
  );
};
