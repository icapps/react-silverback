import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = props => (
  <div className="form-group">
    <label htmlFor={props.id}>{props.label}</label>
    <select className="form-control" id={props.id} value={props.value} onChange={props.handleChange}>
      {props.options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
  </div>
);

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Dropdown;
