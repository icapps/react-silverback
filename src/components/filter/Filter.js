import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { strings } from '../../utils';
import './filter.scss';

const search = require('../../assets/images/search.svg');

const Filter = ({ handleFilter }) => {
  const [filterValue, setFilterValue] = useState('');
  const handleChange = ({ target: { value } }) => {
    setFilterValue(value);
    handleFilter(value);
  };
  return (
    <div className="input-group filter">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <img src={search} alt={strings.SEARCH} />
        </span>
      </div>
      <input
        className="form-control"
        type="text"
        value={filterValue}
        onChange={handleChange}
        placeholder={strings.SEARCH}
      />
    </div>
  );
};

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default Filter;
