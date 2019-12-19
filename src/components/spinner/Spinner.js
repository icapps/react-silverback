import React from 'react';
import PropTypes from 'prop-types';
import './spinner.scss';

const Spinner = ({ className, spinnerClassName, hasContainer }) => {
  if (hasContainer)
    return (
      <main className={`${className} spinner-container`}>
        <div className={`spinner ${spinnerClassName}`} />
      </main>
    );
  return <div className={`spinner ${spinnerClassName}`} />;
};

Spinner.propTypes = {
  className: PropTypes.string,
  spinnerClassName: PropTypes.string,
  hasContainer: PropTypes.bool,
};

Spinner.defaultProps = {
  className: '',
  spinnerClassName: '',
  hasContainer: true,
};

export default Spinner;
