import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { strings } from '../../utils';
import './navbar.css';

const Navbar = props => (
  <aside className={`${!props.isNavigationShown ? 'd-none d-sm-block' : ''} col-sm-3 col-md-2 bg-light sidebar`}>
    <ul className="nav nav-pills flex-column">
      {props.links.map(link => (
        <li key={link.name} className="nav-item" onClick={props.toggleNavigation}>
          <Link to={link.path} className={`nav-link ${window.location.pathname.includes(link.path) ? 'active' : ''}`}>{link.name}</Link>
        </li>
      ))}
    </ul>
    <div className="versioning nav flex-column">
      <span className="nav-item">{`${strings.FRONTEND}: ${process.env.REACT_APP_VERSION_NR}.${process.env.REACT_APP_BUILD_NR}`}</span>
      <span className="nav-item">{`${strings.BACKEND}: ${0}`}</span>
    </div>
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
