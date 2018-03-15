import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="navbar navbar-dark bg-dark fixed-top">
    <Link className="navbar-brand" to="/">Silverback</Link>
  </header>
);

export default Header;
