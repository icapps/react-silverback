import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => (
  <header className="navbar navbar-toggleable-md navbar-inverse">
    <Link className="navbar-brand" to="/">Silverback</Link>
  </header>
);

export default Header;
