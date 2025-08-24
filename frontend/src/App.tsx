import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './styles/global.css';
import './styles/header.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResourcesPage from './pages/ResourcesPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Login/SignUpPage';
import ResetPasswordPage from './pages/Login/ResetPassPage';   
import ResetPass from './pages/Login/resetpassrouter';               

function AppContent() {
  const location = useLocation();
  const hideFooter = ['/login', '/signup', '/reset-password', '/resetpass'].includes(location.pathname);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Route cũ: trang nhập email để nhận link */}
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        {/* Route mới: trang đặt mật khẩu (đọc ?token=...) */}
        <Route path="/resetpass" element={<ResetPass />} />
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
