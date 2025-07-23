import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div className="user-avatar">
        {/* Placeholder avatar, you can replace with user image */}
        <span role="img" aria-label="User" style={{ fontSize: 24, color: 'white' }}>👤</span>
      </div>
      <div className="user-info">
        <span className="user-name" style={{ color: 'Black', fontWeight: '500', fontSize: '16px' }}>
          {user?.name || 'Admin'}
        </span>
      </div>
    </div>
  );
};

export default UserProfile;
