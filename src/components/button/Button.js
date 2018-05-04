import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '..';

const Button = props => (
  <button type="button" className={`btn ${props.className}`} onClick={props.handleClick} disabled={props.isDisabled || props.isPending}>
    {props.icon && <img src={props.icon} alt="+" />}
    {props.isPending ? <Spinner hasContainer={false} spinnerClassName={'button-spinner'} /> : <span>{props.text}</span>}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  isDisabled: PropTypes.bool,
  isPending: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  icon: undefined,
  isDisabled: false,
  isPending: false,
};

export default Button;
