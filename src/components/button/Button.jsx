import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
  <button type="button" className={`btn ${props.className}`} onClick={props.handleClick}>{props.text}</button>
);

Button.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  className: '',
};

export default Button;
