import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = props => (
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id={props.id} checked={props.value} onChange={props.handleChange} />
    <label class="form-check-label" for={props.id}>{props.text}</label>
  </div>
);

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Checkbox;
