import React from 'react';
import { DollarSign, Users, TrendingUp, Activity, Check, CircleAlert, Clock } from 'lucide-react';
import { StatCard } from '../../molecules/StatCard/StatCard';
import { Badge } from '../../atoms/Badge/Badge';
import { LinearProgress } from '../../atoms/Progress/Progress';
import './AnalyticsDashboard.scss';

export const AnalyticsDashboard = ({
  stats = [
    { title: 'Total Revenue', value: '$84,250.00', trend: '+14.2%', trendDirection: 'up', icon: <DollarSign /> },
    { title: 'Active Users', value: '1,420', trend: '+5.6%', trendDirection: 'up', icon: <Users /> },
    { title: 'Tasks Completed', value: '1,280', trend: '-2.1%', trendDirection: 'down', icon: <TrendingUp /> },
    { title: 'System Incidents', value: '0', trend: 'Optimal', trendDirection: 'neutral', icon: <Activity /> }
  ],
  recentActivities = [
    { id: 1, title: 'Task Completed', desc: 'Developer John Doe completed deployment task #8472', time: '5m ago', status: 'success' },
    { id: 2, title: 'Server Space Low', desc: 'Storage server node #3 is reaching 90% capacity', time: '1h ago', status: 'danger' },
    { id: 3, title: 'Invoice Approved', desc: 'Operational invoice approved for $120.50', time: '3h ago', status: 'success' },
    { id: 4, title: 'User Session Started', desc: 'User Jane Smith logged in to the control portal', time: '4h ago', status: 'info' }
  ],
  systemLoads = [
    { name: 'Server CPU Utilization', value: 84 },
    { name: 'API On-Time Response', value: 92 },
    { name: 'Database Optimization Goal', value: 68 }
  ],
  className = '',
  ...props
}) => {
  const getActivityIcon = (status) => {
    switch (status) {
      case 'success':
        return <div className="activity-icon-bullet bullet-success"><Check size={12} /></div>;
      case 'danger':
        return <div className="activity-icon-bullet bullet-danger"><CircleAlert size={12} /></div>;
      default:
        return <div className="activity-icon-bullet bullet-info"><Clock size={12} /></div>;
    }
  };

  return (
    <div className={`analytics-dashboard-template ${className}`} {...props}>
      {/* 1. Stat cards Row */}
      <div className="analytics-stats-grid">
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            trendDirection={stat.trendDirection}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* 2. Visual Graphs & Operations Panel Row */}
      <div className="analytics-visual-panels">
        {/* Left Side: Mock Charts */}
        <div className="analytics-chart-panel card-panel">
          <div className="panel-header">
            <h4 className="panel-title">System Request Traffic</h4>
            <Badge variant="soft" color="primary">Weekly Feed</Badge>
          </div>
          <div className="mock-chart-visualizer">
            <div className="chart-bar-columns">
              <div className="chart-bar-col" style={{ '--height': '45%' }}><span className="bar-label">Mon</span></div>
              <div className="chart-bar-col" style={{ '--height': '70%' }}><span className="bar-label">Tue</span></div>
              <div className="chart-bar-col" style={{ '--height': '85%' }}><span className="bar-label">Wed</span></div>
              <div className="chart-bar-col" style={{ '--height': '60%' }}><span className="bar-label">Thu</span></div>
              <div className="chart-bar-col" style={{ '--height': '92%' }}><span className="bar-label">Fri</span></div>
              <div className="chart-bar-col" style={{ '--height': '30%' }}><span className="bar-label">Sat</span></div>
              <div className="chart-bar-col" style={{ '--height': '20%' }}><span className="bar-label">Sun</span></div>
            </div>
          </div>
        </div>

        {/* Right Side: Performance Status & System Load */}
        <div className="analytics-performance-panel card-panel">
          <div className="panel-header">
            <h4 className="panel-title">System Performance Diagnostics</h4>
          </div>
          <div className="system-metrics-list">
            {systemLoads.map((metric, idx) => (
              <div key={idx} className="system-metric-row">
                <div className="metric-row-labels">
                  <span className="metric-name">{metric.name}</span>
                  <span className="metric-value">{metric.value}%</span>
                </div>
                <LinearProgress value={metric.value} color={metric.value > 80 ? 'success' : metric.value > 60 ? 'primary' : 'warning'} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Activity History Row */}
      <div className="analytics-activity-panel card-panel">
        <div className="panel-header">
          <h4 className="panel-title">Real-Time Platform Logs</h4>
          <span className="live-pulse"><span className="pulse-dot" /> Live Updates</span>
        </div>
        <div className="activity-feed-list">
          {recentActivities.map((act) => (
            <div key={act.id} className="activity-feed-row">
              {getActivityIcon(act.status)}
              <div className="activity-row-text">
                <span className="activity-row-title">{act.title}</span>
                <p className="activity-row-desc">{act.desc}</p>
              </div>
              <span className="activity-row-time">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AnalyticsDashboard;
