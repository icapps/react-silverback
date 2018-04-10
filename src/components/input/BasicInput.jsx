import React from 'react';
import PropTypes from 'prop-types';

const TextInput = props => (
  <div className="form-group">
    <label htmlFor={props.id}>{props.label}</label>
    <input type={props.type} className={`form-control ${!props.isValid ? 'is-invalid' : ''}`} id={props.id} placeholder={props.placeholder} value={props.value} onChange={props.handleChange} disabled={props.isDisabled}/>
    {!props.isValid && <div className="invalid-feedback">{props.errorMessage}</div>}
  </div>
);

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['text', 'password', 'number']),
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
  isDisabled: PropTypes.bool,
};

TextInput.defaultProps = {
  placeholder: '',
  type: 'text',
  isValid: true,
  errorMessage: '',
  isDisabled: false,
};

export default TextInput;
