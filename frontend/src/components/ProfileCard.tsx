import React from 'react';

const ProfileCard = ({ profile }) => {
  const {
    name,
    avatar,
    major,
    university,
    studyInterests,
    availability
  } = profile || {};

  return (
    <div className="profile-card">
      <div className="profile-header">
        <img 
          src={avatar || '/default-avatar.png'} 
          alt={name} 
          className="profile-avatar"
        />
        <div className="profile-info">
          <h3 className="profile-name">{name || 'User Name'}</h3>
          <p className="profile-major">{major || 'Computer Science'}</p>
          <p className="profile-university">{university || 'University Name'}</p>
        </div>
      </div>
      
      <div className="profile-details">
        <div className="study-interests">
          <h4>Study Interests</h4>
          <div className="tags">
            {studyInterests?.map((interest, index) => (
              <span key={index} className="tag">{interest}</span>
            )) || ['Programming', 'Mathematics', 'Physics']}
          </div>
        </div>
        
        <div className="availability">
          <h4>Availability</h4>
          <p>{availability || 'Weekdays 6-9 PM'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard; 