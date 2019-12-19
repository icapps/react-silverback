import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ id, label, value, handleChange, options, isLabelShown }) => (
  <div className="form-group">
    {isLabelShown && <label htmlFor={id}>{label}</label>}
    <select className="form-control" id={id} value={value} onChange={handleChange}>
      {options.map(option => (
        <option key={option.key} value={option.key}>
          {option.text}
        </option>
      ))}
    </select>
  </div>
);

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])).isRequired,
  isLabelShown: PropTypes.bool,
};

Dropdown.defaultProps = {
  label: '',
  isLabelShown: true,
};

export default Dropdown;
