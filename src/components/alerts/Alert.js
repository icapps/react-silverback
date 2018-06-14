import React from 'react';
import PropTypes from 'prop-types';
import { identifiers } from '../../constants';

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  componentDidMount() {
    this.timeout = setTimeout(this.closeAlert, 5000);
  }

  closeAlert = () => {
    this.setState({ show: false });
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    const { props, state } = this;
    return (
      <React.Fragment>
        {state.show && <div className={`simple-alert alert alert-${props.type}`} role="alert">{props.text}</div>}
      </React.Fragment>
    );
  }
}

Alert.propTypes = {
  type: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

Alert.defaultProps = {
  type: identifiers.MESSAGE_SUCCESS,
};

export default Alert;