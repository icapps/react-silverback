import React from 'react';
import { connect } from 'react-redux';
import './alerts.css';
import { Alert } from '..';

const Alerts = props => (
  <div className='alert-container'>
    {props.messages.map(message => <Alert text={message.text} type={message.type} key={message.id} />)}
  </div>
);

const mapStateToProps = state => ({
  messages: state.messages.messages,
});

export default connect(mapStateToProps)(Alerts);

