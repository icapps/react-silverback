import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './header.css';

const Header = props => (
  <header className="navbar navbar-dark bg-dark fixed-top">
    <Link className="navbar-brand" to="/">Silverback</Link>
    <span className="navbar-toggler-icon" onClick={props.toggleNavigation} />
  </header>
);

Header.propTypes = {
  toggleNavigation: PropTypes.func.isRequired,
};

export default Header;
