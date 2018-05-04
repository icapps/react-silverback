import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Checkbox, BasicInput, Dropdown } from '../../index';
import { strings } from '../../../utils';
import { identifiers } from '../../../constants';
import './createModal.css';

const plus = require('../../../assets/images/plus.svg');

class CreateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createParametersState: this.initializeCreateParameters(),
      showError: false,
      createPassword: true,
    };
  }

  initializeCreateParameters = () => {
    let createParametersState = {};
    this.props.createParameters.forEach(item => {
      if (item.defaultValue) {
        createParametersState[item.id] = item.defaultValue;
      } else if (item.options && item.options.length > 0) {
        createParametersState[item.id] = item.options[0].key;
      }
      else {
        createParametersState[item.id] = item.type === 'boolean' ? false : '';
      }
    });
    return createParametersState;
  }

  setCreateParameters = () => {
    this.setState({ createParametersState: this.initializeCreateParameters(), showError: false });
  }

  create = async () => {
    this.setState({ showError: true });
    if (this.state.createPassword) {
      return this.props.create({ ...this.state.createParametersState, password: undefined }, this.state.createPassword);
    }
    return this.props.create(this.state.createParametersState, this.state.createPassword);
  }

  handleChange = event => {
    this.setState({ createParametersState: { ...this.state.createParametersState, [event.target.id.replace('modal-', '')]: event.target.type === 'checkbox' ? event.target.checked : event.target.value } });
  };

  handleCreatePassword = event => {
    this.setState({ createPassword: !this.state.createPassword });
  }

  renderInput = item => {
    if (item.type === 'boolean') {
      return <Checkbox key={item.id} id={`modal-${item.id}`} text={item.label} value={this.state.createParametersState[item.id]} handleChange={this.handleChange} isDisabled={this.props.isPending} />;
    } else if (item.type === 'select') {
      return <Dropdown key={item.id} id={`modal-${item.id}`} label={item.label} value={this.state.createParametersState[item.id]} handleChange={this.handleChange} options={item.options} />;
    } else if (item.type === 'password') {
      return (
        <React.Fragment key={item.id}>
          <BasicInput id={`modal-${item.id}`} label={item.label} value={this.state.createParametersState[item.id]} handleChange={this.handleChange} type={item.type} isDisabled={this.props.isPending || this.state.createPassword} />
          <Checkbox id={identifiers.USER_HAS_TO_SET_PASSWORD} text={strings.USER_HAS_TO_SET_PASSWORD} value={this.state.createPassword} handleChange={this.handleCreatePassword} isDisabled={this.props.isPending} />
        </React.Fragment>
      );
    }
    return <BasicInput key={item.id} id={`modal-${item.id}`} label={item.label} value={this.state.createParametersState[item.id]} handleChange={this.handleChange} type={item.type} isDisabled={this.props.isPending} />;
  }

  render() {
    return (
      <Modal
        id={strings.CREATE}
        modalButtonText={this.props.primaryButtonText}
        secondaryButtonText={strings.CANCEL}
        handlePrimaryButton={this.create}
        primaryButtonText={strings.SUBMIT}
        primaryButtonClassName="btn-success"
        modalButtonClassName="btn-success btn-create"
        icon={plus}
        title={this.props.title}
        hasHeader
        isPending={this.props.isPending}
        handleModalButton={this.setCreateParameters}
      >
        {this.props.isError && this.state.showError && <div className="alert alert-danger" role="alert">{this.props.errorMessage}</div>}
        <div className="create-modal-input">
          {this.state.createParametersState && this.props.createParameters.map(item => this.renderInput(item))}
        </div>
      </Modal>
    );
  }
}

CreateModal.propTypes = {
  primaryButtonText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createParameters: PropTypes.array.isRequired,
  create: PropTypes.func.isRequired,
  isPending: PropTypes.bool,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

CreateModal.defaultProps = {
  isPending: false,
  isError: false,
  errorMessage: '',
};

export default CreateModal;
