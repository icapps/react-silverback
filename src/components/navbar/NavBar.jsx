import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './navbar.css';

const Navbar = props => (
  <aside className={`${!props.isNavigationShown ? 'd-none d-sm-block' : ''} col-sm-3 col-md-2 bg-faded sidebar`}>
    <ul className="nav nav-pills flex-column">
      {props.links.map(link => (
        <li key={link.name} className="nav-item" onClick={props.toggleNavigation}>
          <Link to={link.path} className={`nav-link ${window.location.pathname === link.path ? 'active' : ''}`}>{link.name}</Link>
        </li>
      ))}
    </ul>
  </aside>
);

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
    })
  ).isRequired,
  isNavigationShown: PropTypes.bool.isRequired,
  toggleNavigation: PropTypes.func.isRequired,
};

export default Navbar;
