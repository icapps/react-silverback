import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Checkbox, BasicInput, Dropdown } from '../../index';
import { strings, validate } from '../../../utils';
import { identifiers } from '../../../constants';
import './createModal.scss';

const plus = require('../../../assets/images/plus.svg');

class CreateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: this.initializeCreateParameters(),
      createPassword: true,
    };
  }

  initializeCreateParameters = () => {
    let inputs = {};
    this.props.createParameters.forEach(item => {
      if (item.type === 'email') {
        inputs[item.id] = {
          value: '',
          validation: 'email',
          isValid: true,
          errorMessage: '',
        };
      } else if (item.type === 'text') {
        inputs[item.id] = {
          value: '',
          validation: 'text',
          isValid: true,
          errorMessage: '',
        };
      } else if (item.type === 'password') {
        inputs[item.id] = {
          value: '',
          validation: this.createPassword ? 'password' : null,
          isValid: true,
          errorMessage: '',
        };
      } else if (item.type === 'select' && item.options.length > 0) {
        inputs[item.id] = { value: item.options[0].key, validation: null };
      } else if (item.type === 'boolean') {
        inputs[item.id] = { value: item.value, validation: null };
      }
    });
    return inputs;
  };

  setCreateParameters = () => {
    this.setState({ inputs: this.initializeCreateParameters() });
  };

  validate = () => {
    let inputs = { ...this.state.inputs };
    let hasError = false;
    Object.keys(inputs)
      .filter(key => inputs[key].validation)
      .forEach(key => {
        const validationResult = validate(inputs[key].validation, inputs[key].value);
        if (!validationResult.isValid) {
          hasError = true;
        }
        inputs[key] = {
          ...inputs[key],
          ...validationResult,
        };
      });
    if (hasError) {
      this.setState({ inputs });
      return;
    }
    this.create(this.getInputValues(inputs));
  };

  getInputValues(inputs) {
    for (let key in inputs) {
      inputs[key] = inputs[key].value;
    }
    return inputs;
  }

  create = inputs => {
    if (this.state.createPassword) {
      return this.props.create({ ...inputs, password: undefined }, this.state.createPassword);
    }
    return this.props.create(inputs, this.state.createPassword);
  };

  handleChange = event => {
    const input = event.target.id.replace('modal-', '');
    this.setState({
      inputs: {
        ...this.state.inputs,
        [input]: {
          ...this.state.inputs[input],
          value: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
          isValid: true,
        },
      },
    });
  };

  handleCreatePassword = () => {
    this.setState(
      {
        createPassword: !this.state.createPassword,
      },
      () => {
        this.setState({
          inputs: {
            ...this.state.inputs,
            password: {
              ...this.state.inputs['password'],
              validation: this.state.createPassword ? 'none' : 'password',
              isValid: true,
            },
          },
        });
      },
    );
  };

  renderInput = item => {
    if (item.type === 'boolean') {
      return (
        <Checkbox
          key={item.id}
          id={`modal-${item.id}`}
          text={item.label}
          value={this.state.inputs[item.id].value}
          handleChange={this.handleChange}
          isDisabled={this.props.isPending}
        />
      );
    } else if (item.type === 'select' && item.options && this.state.inputs[item.id]) {
      return (
        <Dropdown
          key={item.id}
          id={`modal-${item.id}`}
          label={item.label}
          value={this.state.inputs[item.id].value}
          handleChange={this.handleChange}
          options={item.options}
        />
      );
    } else if (item.type === 'password') {
      return (
        <React.Fragment key={item.id}>
          <Checkbox
            id={identifiers.USER_HAS_TO_SET_PASSWORD}
            text={strings.USER_HAS_TO_SET_PASSWORD}
            value={this.state.createPassword}
            handleChange={this.handleCreatePassword}
            isDisabled={this.props.isPending}
          />
          <BasicInput
            id={`modal-${item.id}`}
            label={item.label}
            value={this.state.inputs[item.id].value}
            isValid={this.state.inputs[item.id].isValid}
            errorMessage={this.state.inputs[item.id].errorMessage}
            handleChange={this.handleChange}
            type={item.type}
            isDisabled={this.props.isPending || this.state.createPassword}
          />
        </React.Fragment>
      );
    } else if (this.state.inputs[item.id]) {
      return (
        <BasicInput
          key={item.id}
          id={`modal-${item.id}`}
          label={item.label}
          value={this.state.inputs[item.id].value}
          isValid={this.state.inputs[item.id].isValid}
          errorMessage={this.state.inputs[item.id].errorMessage}
          handleChange={this.handleChange}
          type={item.type}
          isDisabled={this.props.isPending}
        />
      );
    }
  };

  render() {
    return (
      <Modal
        id={strings.CREATE}
        modalButtonText={this.props.primaryButtonText}
        secondaryButtonText={strings.CANCEL}
        handlePrimaryButton={this.validate}
        primaryButtonText={strings.SUBMIT}
        primaryButtonClassName="btn-success"
        modalButtonClassName="btn-success btn-create"
        icon={plus}
        title={this.props.title}
        hasHeader
        isPending={this.props.isPending}
        handleModalButton={this.setCreateParameters}
      >
        <div className="create-modal-input">
          {this.state.inputs && this.props.createParameters.map(item => this.renderInput(item))}
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
