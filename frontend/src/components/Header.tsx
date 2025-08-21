import React, { useState } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      // TODO: Implement logout logic
    } else {
      setIsLoggedIn(true);
      // TODO: Implement login logic
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Left: Logo/App Name */}
        <div className="header-left">
          <div className="logo">
            <h1>Study Buddy Match</h1>
          </div>
        </div>

        {/* Center: Navigation Tabs (Facebook Style) */}
        <div className="header-center">
          <nav className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => handleTabClick('home')}
            >
              <span className="tab-icon">🏠</span>
              <span className="tab-label">Home</span>
            </button>
            
            <button
              className={`nav-tab ${activeTab === 'quiz' ? 'active' : ''}`}
              onClick={() => handleTabClick('quiz')}
            >
              <span className="tab-icon">❓</span>
              <span className="tab-label">Quiz</span>
            </button>
            
            <button
              className={`nav-tab ${activeTab === 'resources' ? 'active' : ''}`}
              onClick={() => handleTabClick('resources')}
            >
              <span className="tab-icon">📚</span>
              <span className="tab-label">Resources</span>
            </button>
          </nav>
        </div>

        {/* Right: Auth Actions */}
        <div className="header-right">
          <button 
            className={`auth-btn ${isLoggedIn ? 'logout' : 'login'}`}
            onClick={handleAuthClick}
          >
            {isLoggedIn ? (
              <>
                <span className="auth-icon">👤</span>
                <span className="auth-text">Logout</span>
              </>
            ) : (
              <>
                <span className="auth-icon">🔐</span>
                <span className="auth-text">Login</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 