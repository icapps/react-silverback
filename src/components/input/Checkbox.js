import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ id, text, value, handleChange, isDisabled, css }) => (
  <div className={`form-group ${css}`}>
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={id}
        checked={value}
        onChange={handleChange}
        disabled={isDisabled}
      />
      <label className="form-check-label" htmlFor={id}>
        {text}
      </label>
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
