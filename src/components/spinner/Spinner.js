import React from 'react';
import PropTypes from 'prop-types';
import './spinner.scss';

const Spinner = props => {
  if (props.hasContainer)
    return (
      <main className={`${props.className} spinner-container`}>
        <div className={`spinner ${props.spinnerClassName}`} />
      </main>
    );
  return <div className={`spinner ${props.spinnerClassName}`} />;
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
