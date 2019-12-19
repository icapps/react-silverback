import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '../';

const Button = ({ className, handleClick, isDisabled, isPending, leftIcon, text, rightIcon }) => (
  <button type="button" className={`btn ${className}`} onClick={handleClick} disabled={isDisabled || isPending}>
    {leftIcon && <img src={leftIcon} alt="" />}
    {isPending ? <Spinner hasContainer={false} spinnerClassName={'button-spinner'} /> : <span>{text}</span>}
    {rightIcon && <img src={rightIcon} alt="" />}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  leftIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  rightIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isDisabled: PropTypes.bool,
  isPending: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  leftIcon: undefined,
  rightIcon: undefined,
  isDisabled: false,
  isPending: false,
};

export default Button;
