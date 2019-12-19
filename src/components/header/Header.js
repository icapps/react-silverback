import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { strings } from '../../utils';
import constants from '../../redux/auth/constants';
import Button from '../button/Button';

import './header.scss';

const logoutIcon = require('../../assets/images/logout.svg');

const Header = ({ toggleNavigation, logout }) => {
  const handleLogout = async () => {
    const result = await logout();
    if (
      result.action &&
      (result.action.type === constants.LOGOUT_USER_FULFILLED || result.action.type === constants.LOGOUT_USER_REJECTED)
    ) {
      window.location.href = '/';
    }
  };

  return (
    <header className="navbar navbar-dark bg-dark fixed-top">
      <Link className="navbar-brand" to="/">
        {strings.HEADER_TITLE}
      </Link>
      <div>
        <Button
          rightIcon={logoutIcon}
          text={strings.LOGOUT}
          className="btn-dark btn-logout"
          handleClick={handleLogout}
        />
        <span className="navbar-toggler-icon" onClick={toggleNavigation} />
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleNavigation: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Header;
