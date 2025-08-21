import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import MatchCard from '../components/MatchCard';

const DashboardPage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [potentialMatches, setPotentialMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: Fetch user profile and potential matches from API
    // fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API calls
      // const profile = await profileService.getProfile();
      // const matches = await matchService.getPotentialMatches();
      
      // TODO: Add your own data structure here
      setUserProfile(null);
      setPotentialMatches([]);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = (matchId) => {
    console.log('Connecting with match:', matchId);
    // TODO: Implement connection logic
  };

  const handleReject = (matchId) => {
    console.log('Rejecting match:', matchId);
    // TODO: Implement rejection logic
  };

  if (isLoading) {
    return (
      <div className="dashboard-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome to Study Buddy Match!</h1>
          <p>Design your perfect study partner experience</p>
        </div>
        
        <div className="dashboard-content">
          {/* TODO: Add your own content here */}
          <div className="empty-state">
            <h2>🎯 Ready to Build!</h2>
            <p>This is your blank canvas. Add your own components and content here.</p>
            <div className="suggestions">
              <h3>💡 Suggestions:</h3>
              <ul>
                <li>User profile section</li>
                <li>Study partner matching</li>
                <li>Study resources</li>
                <li>Chat functionality</li>
                <li>Quiz system</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 