import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Checkbox, BasicInput } from '../../index';
import { strings } from '../../../utils';

const plus = require('../../../assets/images/plus.svg');

class CreateModal extends React.Component {
  componentDidMount() {
    this.setCreateParameters();
  }

  setCreateParameters = () => {
    let createParametersState = {};
    this.props.createParameters.forEach(item => createParametersState[item.id] = item.type === 'boolean' ? false : '');
    this.setState({ createParametersState });
  }

  handleChange = event => {
    this.setState({ createParametersState: { ...this.state.createParametersState, [event.target.id.replace('modal-', '')]: event.target.type === 'checkbox' ? event.target.checked : event.target.value } });
  };

  renderInput = item => {
    if (item.type === 'boolean') {
      return <Checkbox key={item.id} id={`modal-${item.id}`} text={item.label} value={this.state.createParametersState[item.id]} handleChange={this.handleChange} />;
    }
    return <BasicInput key={item.id} id={`modal-${item.id}`} label={item.label} value={this.state.createParametersState[item.id]} handleChange={this.handleChange} type={item.type} />;
  }

  render() {
    return (
      <Modal
        id={strings.CREATE}
        modalButtonText={this.props.primaryButtonText}
        secondaryButtonText={strings.CANCEL}
        handlePrimaryButton={() => this.props.create(this.state.createParametersState)}
        primaryButtonText={strings.SUBMIT}
        primaryButtonClassName="btn-success"
        modalButtonClassName="btn-success"
        icon={plus}
        title={this.props.title}
        hasHeader
        handleModalButton={this.setCreateParameters}
      >
        <div>{this.state && this.props.createParameters.map(item => this.renderInput(item))}</div>
      </Modal>
    );
  }
}

CreateModal.propTypes = {
  primaryButtonText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createParameters: PropTypes.array.isRequired,
  create: PropTypes.func.isRequired,
};

export default CreateModal;