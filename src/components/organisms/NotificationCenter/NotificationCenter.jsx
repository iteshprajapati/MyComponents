import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import './NotificationCenter.scss';

// Single Toast Alert Component
export const Toast = ({
  id,
  title,
  message,
  type = 'info', // 'info' | 'success' | 'warning' | 'danger'
  onClose,
  duration = 4000
}) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="toast-icon success" size={18} />;
      case 'warning': return <AlertTriangle className="toast-icon warning" size={18} />;
      case 'danger': return <XCircle className="toast-icon danger" size={18} />;
      default: return <Info className="toast-icon info" size={18} />;
    }
  };

  return (
    <div className={`toast-item toast-${type}`}>
      {getIcon()}
      <div className="toast-body">
        {title && <h5 className="toast-title">{title}</h5>}
        {message && <p className="toast-message">{message}</p>}
      </div>
      <button type="button" className="toast-close" onClick={() => onClose(id)}>
        <X size={14} />
      </button>
    </div>
  );
};

// Global Toast Stack Overlay
export const ToastContainer = ({ toasts = [], onCloseToast }) => {
  return (
    <div className="toast-stack-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={onCloseToast}
        />
      ))}
    </div>
  );
};

// Header Notifications Bell with Dropdown History Menu
export const NotificationsBell = ({
  notifications = [], // [{ id, title, description, time, unread }]
  onClearAll,
  onMarkRead,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`bell-notification-hub ${className}`} {...props}>
      <button
        type="button"
        className={`bell-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell size={20} />
        {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="bell-dropdown-card">
          <div className="dropdown-header">
            <h4>Notifications</h4>
            <div className="header-actions">
              {unreadCount > 0 && (
                <button className="text-action" onClick={onMarkRead}>
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button className="text-action clear" onClick={onClearAll}>
                  Clear all
                </button>
              )}
            </div>
          </div>
          <div className="dropdown-body">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <div key={n.id} className={`notification-feed-item ${n.unread ? 'unread' : ''}`}>
                  <div className="feed-item-dot" />
                  <div className="feed-item-content">
                    <h5 className="feed-title">{n.title}</h5>
                    <p className="feed-desc">{n.description}</p>
                    <span className="feed-time">{n.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="dropdown-empty-state">
                <Bell size={28} className="empty-icon" />
                <p>All caught up! No notifications.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
