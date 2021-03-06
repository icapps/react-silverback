import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = props => (
  <div className={`form-group ${props.css}`}>
    <div className="form-check">
      <input type="checkbox" className="form-check-input" id={props.id} checked={props.value} onChange={props.handleChange} disabled={props.isDisabled} />
      <label className="form-check-label" htmlFor={props.id}>{props.text}</label>
    </div>
  </div>
);

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  css: PropTypes.string,
};

Checkbox.defaultProps = {
  isDisabled: false,
  css: '',
};

export default Checkbox;
