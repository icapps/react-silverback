import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { strings } from '../../utils';
import './header.css';

const Header = props => (
  <header className="navbar navbar-dark bg-dark fixed-top">
    <Link className="navbar-brand" to="/">{strings.HEADER_TITLE}</Link>
    <span className="navbar-toggler-icon" onClick={props.toggleNavigation} />
  </header>
);

Header.propTypes = {
  toggleNavigation: PropTypes.func.isRequired,
};

export default Header;
