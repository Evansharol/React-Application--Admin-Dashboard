import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <div className="user-avatar">
        {/* Placeholder avatar, you can replace with user image */}
        <span role="img" aria-label="User" style={{ fontSize: 28 }}>👤</span>
      </div>
      <div className="user-info">
        <span className="user-name">{user?.name || 'Admin'}</span>
      </div>
    </div>
  );
};

export default UserProfile;
