import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  id,
  label,
  placeholder,
  value,
  handleChange,
  type,
  isValid,
  errorMessage,
  isDisabled,
  handleEnter,
}) => {
  const handleKeyPress = ({ key }) => {
    if (key === 'Enter') {
      this.props.handleEnter();
    }
  };
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type === 'email' ? 'text' : type}
        className={`form-control ${!isValid ? 'is-invalid' : ''}`}
        id={id}
        placeholder={placeholder}
        value={value}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        disabled={isDisabled}
      />
      {!isValid && <div className="invalid-feedback">{errorMessage}</div>}
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['email', 'text', 'password', 'number']),
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
  isDisabled: PropTypes.bool,
  handleEnter: PropTypes.func,
};

TextInput.defaultProps = {
  placeholder: '',
  type: 'text',
  isValid: true,
  errorMessage: '',
  isDisabled: false,
  handleEnter: () => {},
};

export default TextInput;
