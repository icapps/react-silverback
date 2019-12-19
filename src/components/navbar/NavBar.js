import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { strings } from '../../utils';
import './navbar.scss';

const Navbar = ({ links, isNavigationShown, toggleNavigation, version, build }) => (
  <aside className={`${!isNavigationShown ? 'd-none d-sm-block' : ''} col-sm-3 col-md-2 bg-light sidebar`}>
    <ul className="nav nav-pills flex-column">
      {links.map(link => (
        <li key={link.name} className="nav-item" onClick={toggleNavigation}>
          <Link to={link.path} className={`nav-link ${window.location.pathname.includes(link.path) ? 'active' : ''}`}>
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
    <div className="versioning nav flex-column">
      <span className="nav-item version-platform">{strings.FRONTEND}</span>
      <span className="nav-item">{`${strings.VERSION}: ${process.env.REACT_APP_VERSION_NR}`}</span>
      <span className="nav-item">{`${strings.BUILD}: ${process.env.REACT_APP_BUILD_NR}`}</span>
      <span className="nav-item version-platform">{strings.BACKEND}</span>
      <span className="nav-item">{`${strings.VERSION}: ${version}`}</span>
      <span className="nav-item">{`${strings.BUILD}: ${build}`}</span>
    </div>
  </aside>
);

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
    }),
  ).isRequired,
  isNavigationShown: PropTypes.bool.isRequired,
  toggleNavigation: PropTypes.func.isRequired,
  version: PropTypes.string.isRequired,
  build: PropTypes.string.isRequired,
};

export default Navbar;
