import React, { useState } from 'react';
import { Menu, ChevronLeft, LayoutDashboard, Truck, FileText, Settings, LogOut } from 'lucide-react';
import { NotificationsBell } from '../../organisms/NotificationCenter/NotificationCenter';
import { Avatar } from '../../molecules/AvatarGroup/AvatarGroup';
import './DashboardLayout.scss';

export const DashboardLayout = ({
  children,
  user = { name: 'Alexander Wright', role: 'Support Eng.', avatar: '' },
  notifications = [
    { id: 1, title: 'New Dispatch', description: 'Route B assignment approved.', time: '10m ago', unread: true }
  ],
  sidebarItems = [
    { id: 'dash', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'trips', label: 'Trips & Dispatch', icon: <Truck size={18} /> },
    { id: 'reports', label: 'Reports', icon: <FileText size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
  ],
  activeItemId = 'dash',
  onItemClick,
  onLogout,
  className = '',
  ...props
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`dashboard-layout-shell ${collapsed ? 'sidebar-collapsed' : ''} ${className}`} {...props}>
      {/* 1. Left Sidebar Navigation */}
      <aside className="layout-sidebar">
        <div className="sidebar-brand-header">
          <span className="brand-logo-icon">▲</span>
          <span className="brand-logo-text">Platform</span>
          <button type="button" className="sidebar-toggle-btn" onClick={() => setCollapsed(!collapsed)}>
            <ChevronLeft size={16} />
          </button>
        </div>

        <nav className="sidebar-nav-links">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClick && onItemClick(item.id)}
              className={`sidebar-nav-item ${activeItemId === item.id ? 'is-active' : ''}`}
            >
              <span className="nav-item-icon">{item.icon}</span>
              <span className="nav-item-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer-row">
          <button type="button" className="sidebar-nav-item logout-btn" onClick={onLogout}>
            <span className="nav-item-icon"><LogOut size={18} /></span>
            <span className="nav-item-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. Right Main Layout Area */}
      <div className="layout-main-wrapper">
        <header className="layout-top-navbar">
          <button type="button" className="sidebar-hamburger-menu" onClick={() => setCollapsed(!collapsed)}>
            <Menu size={20} />
          </button>
          <div className="navbar-search-placeholder">
            <span className="navbar-quick-title">Operations Control</span>
          </div>
          <div className="navbar-right-actions">
            <NotificationsBell notifications={notifications} />
            <div className="navbar-divider-line" />
            <div className="navbar-user-badge">
              <div className="user-text-info">
                <span className="user-name">{user.name}</span>
                <span className="user-role">{user.role}</span>
              </div>
              <Avatar name={user.name} src={user.avatar} size="md" />
            </div>
          </div>
        </header>
        <main className="layout-content-body">{children}</main>
      </div>
    </div>
  );
};
export default DashboardLayout;
