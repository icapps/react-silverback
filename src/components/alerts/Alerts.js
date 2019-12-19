import React from 'react';
import { connect } from 'react-redux';
import './alerts.scss';
import { Alert } from '..';

const Alerts = ({ messages }) => (
  <div className="alert-container">
    {messages.map(message => (
      <Alert text={message.text} type={message.type} key={message.id} />
    ))}
  </div>
);

const mapStateToProps = state => ({
  messages: state.messages.messages,
});

export default connect(mapStateToProps)(Alerts);
