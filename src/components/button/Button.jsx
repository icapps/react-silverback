import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
  <button type="button" className={`btn ${props.className}`} onClick={props.handleClick}>
    {props.icon && <img src={props.icon} alt="+" />}
    <span>{props.text}</span>
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  icon: undefined,
};

export default Button;
