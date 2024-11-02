import React from 'react';
import './Header.css';
import dramaLogo from './assets/drama.png'; 

const Header = () => {
  return (
    <div className='but1 makecenter'>
      <div className='logo-container'>
        <img src={dramaLogo} alt='DramaShield Logo' className='logo' />
        <h2>DramaShield</h2>
      </div>
      <button>Get Extension</button>
    </div>
  );
}

export default Header;
