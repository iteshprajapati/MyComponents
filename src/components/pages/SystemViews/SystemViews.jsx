import React from 'react';
import { ArrowLeft, AlertOctagon, HelpCircle, ShieldAlert } from 'lucide-react';
import { Button } from '../../atoms/Button/Button';
import './SystemViews.scss';

export const SystemViews = ({
  type = '404', // '404' | '500' | '403'
  onBack,
  className = '',
  ...props
}) => {
  const getDetails = () => {
    switch (type) {
      case '500':
        return {
          code: '500',
          title: 'Internal Server Error',
          desc: 'Our servers are experiencing unexpected database connection drops. Please retry.',
          icon: <AlertOctagon size={48} className="system-icon error" />
        };
      case '403':
        return {
          code: '403',
          title: 'Access Restricted',
          desc: 'Your operator role credentials do not possess read permissions for financial reporting panels.',
          icon: <ShieldAlert size={48} className="system-icon forbidden" />
        };
      default:
        return {
          code: '404',
          title: 'Page Not Found',
          desc: 'The requested logistics dashboard route does not exist or has been relocated.',
          icon: <HelpCircle size={48} className="system-icon info" />
        };
    }
  };

  const details = getDetails();

  return (
    <div className={`system-view-wrapper ${className}`} {...props}>
      <div className="system-view-card animation-scale-up">
        <div className="system-icon-wrapper">{details.icon}</div>
        <h1 className="system-code-title">{details.code}</h1>
        <h3 className="system-heading">{details.title}</h3>
        <p className="system-description">{details.desc}</p>
        <Button
          variant="solid"
          color="primary"
          leftIcon={<ArrowLeft size={16} />}
          onClick={onBack}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};
export default SystemViews;
