import React from 'react';
import logo from '../../logo.svg';
import './navbar.css';

const NavBar = (props) => {
  return (
    <div className='app-header'>
      <section>
        <img src={logo} className='app-logo' alt='logo' />
        <h2>iCapps Boilerplate</h2>
      </section>
      <section>
        <h3>Welcome {props.username}</h3>
      </section>
    </div>
  );
};

export default NavBar;
