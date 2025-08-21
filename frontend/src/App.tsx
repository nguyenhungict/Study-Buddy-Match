import React from 'react';
import './styles/global.css';
import './styles/header.css';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <DashboardPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
