import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { identifiers } from '../../constants';

const Alert = ({ type, text }) => {
  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShown(false);
      return () => {
        clearTimeout(timeout);
      };
    }, 5000);
  }, []);

  return (
    <React.Fragment>
      {isShown && (
        <div className={`simple-alert alert alert-${type}`} role="alert">
          {text}
        </div>
      )}
    </React.Fragment>
  );
};

Alert.propTypes = {
  type: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

Alert.defaultProps = {
  type: identifiers.MESSAGE_SUCCESS,
};

export default Alert;
