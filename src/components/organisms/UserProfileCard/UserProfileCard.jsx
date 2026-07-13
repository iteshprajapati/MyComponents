import React, { useState } from 'react';
import { Mail, Briefcase, MapPin, Edit2, Check, X, Shield } from 'lucide-react';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import './UserProfileCard.scss';

export const UserProfileCard = ({
  user = {
    name: 'Alexander Wright',
    role: 'Lead Systems Engineer',
    email: 'alexander.w@example.com',
    location: 'San Francisco, CA',
    avatar: '',
    coverImage: ''
  },
  onSave,
  className = '',
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (field, val) => {
    setEditedUser(prev => ({ ...prev, [field]: val }));
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) onSave(editedUser);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({ ...user });
  };

  return (
    <div className={`user-profile-card ${className}`} {...props}>
      <div
        className="profile-cover-img"
        style={{
          backgroundImage: `url(${user.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60'})`
        }}
      />
      <div className="profile-details-wrapper">
        <div className="profile-avatar-row">
          <div className="profile-avatar-holder">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <div className="profile-avatar-fallback">
                {user.name ? user.name.split(' ').map(n=>n[0]).join('') : 'U'}
              </div>
            )}
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Edit2 size={14} />}
              onClick={() => setIsEditing(true)}
              className="edit-profile-btn"
            >
              Edit Profile
            </Button>
          )}
        </div>

        {isEditing ? (
          <div className="profile-edit-form">
            <Input
              label="Full Name"
              value={editedUser.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              fullWidth
            />
            <Input
              label="Job Role"
              value={editedUser.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              fullWidth
            />
            <Input
              label="Email Address"
              value={editedUser.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              fullWidth
            />
            <Input
              label="Location"
              value={editedUser.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              fullWidth
            />
            <div className="edit-form-actions">
              <Button
                variant="ghost"
                color="danger"
                leftIcon={<X size={16} />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                color="success"
                leftIcon={<Check size={16} />}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="profile-info-display">
            <div className="profile-identity">
              <h3 className="profile-name">{user.name}</h3>
              <span className="profile-role-badge">
                <Shield size={12} style={{ marginRight: '4px' }} /> Verified Member
              </span>
            </div>
            
            <div className="profile-meta-list">
              <div className="profile-meta-item">
                <Briefcase size={16} />
                <span>{user.role}</span>
              </div>
              <div className="profile-meta-item">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
              <div className="profile-meta-item">
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserProfileCard;
