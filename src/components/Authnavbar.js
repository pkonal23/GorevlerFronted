import React from 'react';
import logo2 from '../images/logo2.png';

const Authnavbar = () => {
  const goToAboutMe = () => {
    window.location.href = '#/about'; // Navigates to About Me
  };

  const goToLearntMore = () => {
    window.location.href = '#/learnmore'; // Navigates to About Me
  };

  return (
    <div className='authdiv'>
      <nav className='authnav'>
        <div>
          <img src={logo2} alt="Logo" />
        </div>
        <div className='authlinks'>
          <button onClick={goToLearntMore}>Learn More</button>
          <button id='auth_btn' onClick={goToAboutMe}>About the Creator</button>
        </div>
      </nav>
    </div>
  );
};

export default Authnavbar;
