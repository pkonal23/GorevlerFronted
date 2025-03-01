import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TaskArea from './components/TaskArea';
import Loginauth from './components/Loginauth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const storedIsLoggedIn = window.localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    console.log('logged out')
  };




  return (
    <>
      {!isLoggedIn && (
        <>
          <Loginauth onLoginSuccess={handleLoginSuccess} />
        </>
      )}
      {isLoggedIn && (
        <div className="angry-grid">
          <div id="item-0"><Sidebar onLogout={handleLogout} /></div>
          <div id="item-1"><Navbar onSearchChange={handleSearchChange} /></div>
          <div id="item-2"><TaskArea searchQuery={searchQuery} /></div>
        </div>
      )}
    </>
  );
}

export default App;
