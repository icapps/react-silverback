import React from 'react';
import PropTypes from 'prop-types';

const TextInput = props => (
  <div class="form-group">
    <label for={props.id}>{props.label}</label>
    <input type={props.type} class="form-control" id={props.id} placeholder={props.placeholder} value={props.value} onChange={props.handleChange} />
  </div>
);

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['text', 'password', 'number']),
};

TextInput.defaultProps = {
  placeholder: '',
  type: 'text',
};

export default TextInput;
