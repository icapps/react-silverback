import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { strings } from '../../utils';
import './header.css';
import constants from '../../redux/auth/constants';
import Button from '../button/Button';

const logout = require('../../assets/images/logout.svg');

class Header extends React.Component {
  handleLogout = async () => {
    const result = await this.props.logout();
    if (result.action && (result.action.type === constants.LOGOUT_USER_FULFILLED || result.action.type === constants.LOGOUT_USER_REJECTED)) {
      window.location.href = '/';
    }
  }

  render() {
    const { props } = this;

    return (
      <header className="navbar navbar-dark bg-dark fixed-top">
        <Link className="navbar-brand" to="/">{strings.HEADER_TITLE}</Link>
        <div>
          <Button
            rightIcon={logout}
            text={strings.LOGOUT}
            className='btn-dark btn-logout'
            handleClick={this.handleLogout}
          />
          <span className="navbar-toggler-icon" onClick={props.toggleNavigation} />
        </div>
      </header>
    );
  }
};

Header.propTypes = {
  toggleNavigation: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Header;
