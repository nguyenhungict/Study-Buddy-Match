// LandingPage.tsx ( trang khởi đầu khi người dùng bấm vào link )
import React from 'react';
import '../styles/LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="logo">
          <h1>Study Buddy Match</h1>
        </div>
        <div className="auth-buttons">
          <button className="sign-in">Sign In</button>
          <button className="sign-up">Sign Up</button>
        </div>
      </header>

      <main className="main-content">
        <div className="text">
          <h2>Study Buddy Match help you find your best learning partner</h2>
          <p>
            You can talk to your study buddy anytime
          </p>
        </div>
       
      </main>
    </div>
  );
};

export default LandingPage;
