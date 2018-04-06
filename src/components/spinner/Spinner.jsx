import React from 'react';
import PropTypes from 'prop-types';
import './spinner.css';

const Spinner = props => (
  <main className={`${props.className} spinner-container`}><div className="spinner" /></main>
);

Spinner.propTypes = {
  className: PropTypes.string,
};

Spinner.defaultProps = {
  className: '',
};


export default Spinner;
