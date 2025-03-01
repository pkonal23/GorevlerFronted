import React from 'react'
import logo2 from '../images/logo2.png'

const Authnavbar = () => {
  return (
    <div className='authdiv' >
        <nav className='authnav' >
            <div>
                <img src={logo2} ></img>
            </div>
            <div className='authlinks' >
            <button href='/'>Learn More</button>
            <button id='auth_btn' href='/'>About the creator</button>
            </div>
        </nav>
    </div>
  )
}

export default Authnavbar