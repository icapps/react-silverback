import React from 'react';
import logo from '../../logo.svg';
import './navbar.css';

const NavBar = (props) => {
  return (
    <div className='app-header'>
      <img src={logo} className='app-logo' alt='logo' />
      <h2>Welcome {props.username}</h2>
    </div>
  );
};

export default NavBar;
