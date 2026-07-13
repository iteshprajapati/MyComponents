import React from 'react';
import './AvatarGroup.scss';

export const Avatar = ({
  src,
  name,
  size = 'md',
  className = '',
  ...props
}) => {
  const getInitials = (fullName) => {
    if (!fullName) return '';
    const parts = fullName.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <div
      className={`avatar-circle avatar-${size} ${className}`}
      title={name}
      {...props}
    >
      {src ? (
        <img src={src} alt={name} className="avatar-img" />
      ) : (
        <span className="avatar-initials">{getInitials(name)}</span>
      )}
    </div>
  );
};

export const AvatarGroup = ({
  users = [], // [{ name, src }]
  max = 4,
  size = 'md',
  className = '',
  ...props
}) => {
  const visibleUsers = users.slice(0, max);
  const extraCount = users.length - max;

  return (
    <div className={`avatar-group-container ${className}`} {...props}>
      {visibleUsers.map((user, index) => (
        <Avatar
          key={index}
          name={user.name}
          src={user.src}
          size={size}
          className="avatar-stacked"
          style={{ zIndex: visibleUsers.length - index }}
        />
      ))}
      {extraCount > 0 && (
        <div
          className={`avatar-circle avatar-stacked avatar-overflow avatar-${size}`}
          style={{ zIndex: 0 }}
        >
          <span className="avatar-initials">+{extraCount}</span>
        </div>
      )}
    </div>
  );
};
