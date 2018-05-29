import React from 'react';
import PropTypes from 'prop-types';

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      text: props.text,
    };
    this.setTimer();
  }

  setTimer = () => {
    setTimeout(() => {
      this.setState({ show: false, text: '' }, () => this.props.clearAlerts());
    }, 3000);
  }

  render() {
    const { props, state } = this;
    return (
      <div>
        {state.show && <div className={`alert alert-${props.className}`} role="alert">{props.text}</div>}
      </div>
    );
  }
}

Alert.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  clearAlerts: PropTypes.func.isRequired,
};

export default Alert;