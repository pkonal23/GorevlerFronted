import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TaskArea from './components/TaskArea';
import Loginauth from './components/Loginauth';
import Addtask from './components/Addtask'; 
import AddVoicetask from './components/AddVoicetask';
import Aboutme from './components/Aboutme';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [addTask, setAddTask] = useState(false);
  const [addVoiceTask, setAddVoiceTask] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.hash);

  useEffect(() => {
    const storedIsLoggedIn = window.localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }

    // Listen for hash changes and update state
    const handleHashChange = () => setCurrentPath(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    console.log('logged out');
  };

  // If the path is #/about, render Aboutme
  if (currentPath === '#/about') {
    return <Aboutme />;
  }

  return (
    <>
      {!isLoggedIn && <Loginauth onLoginSuccess={handleLoginSuccess} />}
      {isLoggedIn && (
        <div className="angry-grid">
          <div id="item-0">
            <Sidebar 
              onLogout={handleLogout} 
              setAddTask={setAddTask} 
              setAddVoiceTask={setAddVoiceTask} 
            />
          </div>
          <div id="item-1"><Navbar onSearchChange={setSearchQuery} /></div>
          <div id="item-2"><TaskArea searchQuery={searchQuery} /></div>
        </div>
      )}
      {addTask && <Addtask onClose={() => setAddTask(false)} />}
      {addVoiceTask && <AddVoicetask onClose={() => setAddVoiceTask(false)} />}
    </>
  );
}

export default App;
