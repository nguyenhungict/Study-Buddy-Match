import React from 'react';

const MatchCard = ({ match, onConnect, onReject }) => {
  const {
    id,
    name,
    avatar,
    major,
    university,
    studyInterests,
    matchScore,
    availability
  } = match || {};

  return (
    <div className="match-card">
      <div className="match-header">
        <img 
          src={avatar || '/default-avatar.png'} 
          alt={name} 
          className="match-avatar"
        />
        <div className="match-info">
          <h3 className="match-name">{name || 'Student Name'}</h3>
          <p className="match-major">{major || 'Computer Science'}</p>
          <p className="match-university">{university || 'University Name'}</p>
          <div className="match-score">
            <span className="score-label">Match Score:</span>
            <span className="score-value">{matchScore || '85%'}</span>
          </div>
        </div>
      </div>
      
      <div className="match-details">
        <div className="study-interests">
          <h4>Study Interests</h4>
          <div className="tags">
            {studyInterests?.map((interest, index) => (
              <span key={index} className="tag">{interest}</span>
            )) || ['Programming', 'Mathematics']}
          </div>
        </div>
        
        <div className="availability">
          <h4>Available</h4>
          <p>{availability || 'Weekdays 6-9 PM'}</p>
        </div>
      </div>
      
      <div className="match-actions">
        <button 
          className="btn-connect"
          onClick={() => onConnect?.(id)}
        >
          Connect
        </button>
        <button 
          className="btn-reject"
          onClick={() => onReject?.(id)}
        >
          Pass
        </button>
      </div>
    </div>
  );
};

export default MatchCard; 