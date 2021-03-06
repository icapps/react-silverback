import React from 'react';
import PropTypes from 'prop-types';
import { BasicInput, Button, Checkbox, Modal, CreateModal, Dropdown } from '../index';
import { strings, validate } from '../../utils';
import { identifiers } from '../../constants';
import './detail.css';

const arrowLeft = require('../../assets/images/arrow-left.svg');

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: this.setInputItems(),
    };
  }

  setInputItems = () => {
    let inputs = {};
    this.props.inputItems.forEach(item => {
      if (item.type === 'email') {
        inputs[item.id] = { value: item.value, validation: 'email', isValid: true, errorMessage: '' };
      } else if (item.type === 'text') {
        inputs[item.id] = { value: item.value, validation: 'text', isValid: true, errorMessage: '' };
      } else if (item.type === 'select' && item.options.length > 0) {
        inputs[item.id] = { value: item.value, validation: null };
      } else if (item.type === 'boolean') {
        inputs[item.id] = { value: item.value, validation: null };
      }
    });
    return inputs;
  }

  handleChange = event => {
    const input = event.target.id;
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

  validate = () => {
    let inputs = { ...this.state.inputs };
    let hasError = false;
    Object.keys(inputs)
      .filter((key) => inputs.hasOwnProperty(key) && inputs[key].validation)
      .forEach((key) => {
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
    this.update(this.getInputValues(inputs));
  }

  getInputValues(inputs) {
    for (let key in inputs) {
      inputs[key] = inputs[key].value;
    }
    return inputs;
  }

  update = async (inputs) => {
    const result = await this.props.update(this.props.id, inputs);
    if (result.action && result.action.type.includes('FULFILLED')) {
      this.props.setMessage({ type: identifiers.MESSAGE_SUCCESS, text: strings.UPDATE_SUCCESS });
    }
  }

  resetChanges = () => {
    this.setState({ inputs: this.setInputItems() });
    this.props.setMessage({ type: identifiers.MESSAGE_SUCCESS, text: strings.CHANGES_RESET });
    return true;
  }

  delete = async () => {
    const result = await this.props.remove(this.props.id);
    if (result.action && result.action.type.includes('FULFILLED')) {
      this.props.history.push('/');
      this.props.setMessage({ type: identifiers.MESSAGE_SUCCESS, text: strings.formatString(strings.ITEM_HAS_BEEN_DELETED, { item: <b>{this.props.title}</b> }) });
    }
  }

  deprecate = () => {
    this.props.deprecate(this.props.id);
  }

  undeprecate = () => {
    this.props.undeprecate(this.props.id);
  }

  renderInput = item => {
    if (item.type === 'boolean') {
      return <Checkbox css={item.css} key={item.id} id={item.id} text={item.label} value={(item.isEditable ? this.state.inputs[item.id].value : item.value) || false} handleChange={this.handleChange} isDisabled={!item.isEditable || this.props.isUpdatePending} />;
    }
    if (item.type === 'select') {
      return <Dropdown key={item.id} id={item.id} label={item.label} value={(this.state.inputs[item.id] ? this.state.inputs[item.id].value : '')} handleChange={this.handleChange} options={item.options} />;
    } 
    if (item.type === 'plain') {
      return <div className={`form-group ${item.css}`} key={item.id}><p>{item.label} {item.value}</p></div>;
    }
    if (item.type === 'password') {
      return <BasicInput key={item.id} id={item.id} label={item.label} value={(item.isEditable ? this.state.inputs[item.id].value : item.value) || ''} handleChange={this.handleChange} type={item.type} isDisabled={!item.isEditable || this.props.isUpdatePending} />;
    }
    return <BasicInput key={item.id} id={item.id} label={item.label} value={(item.isEditable ? this.state.inputs[item.id].value : item.value) || ''} handleChange={this.handleChange} type={item.type} isDisabled={!item.isEditable || this.props.isUpdatePending} isValid={(item.isEditable ? this.state.inputs[item.id].isValid : true)} errorMessage={(item.isEditable ? this.state.inputs[item.id].errorMessage : '')} />;
  }

  render() {
    const { state, props } = this;
    const overview = window.location.pathname.split('/')[1];
    return (
      <main className="detail col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3" >
        {props.inputItems && (
          <div className="container">
            <div className="detail-header">
              <div className="back text-primary" onClick={props.history.goBack}><img src={arrowLeft} alt={strings.PREVIOUS} /><span>{`${overview.charAt(0).toUpperCase()}${overview.slice(1)}`}</span></div>
              {props.create && <CreateModal
                primaryButtonText={`${strings.CREATE} ${props.keyword.toLowerCase()}`}
                title={`${strings.CREATE} ${props.keyword.toLowerCase()}`}
                createParameters={props.createParameters}
                create={props.create}
                isError={props.isCreateError}
                isPending={props.isCreatePending}
                errorMessage={props.errorMessage}
              />}
            </div>
            <h3>{props.title}{props.isDeprecated && <span className="title-deprecated">{strings.DEPRECATED_ANNOTATION}</span>}</h3>
            <span className="text-primary">{`${strings.ID}: ${props.id}`}</span>
            <div className="input-fields">
              {state.inputs && props.inputItems.map(item => this.renderInput(item))}
              {props.children}
            </div>
            <div className={`detail-actions ${props.isMe ? 'flex-end' : ''}`}>
              {props.remove && !props.isMe &&
                <Modal
                  id="delete"
                  modalButtonText={`${strings.DELETE} ${props.keyword.toLowerCase()}`}
                  handlePrimaryButton={this.delete}
                  primaryButtonText={strings.DELETE}
                  secondaryButtonText={strings.CANCEL}
                  modalButtonClassName="btn-danger"
                  secondaryButtonClassName="btn-light"
                  primaryButtonClassName="btn-danger"
                >
                  <p>{strings.formatString(strings.DELETE_CONFIRMATION, { item: <span className="text-danger">{props.title}</span> })}</p>
                </Modal>
              }
              {props.update && <div className="update-actions">
                <Modal
                  id="reset-changes"
                  modalButtonText={strings.RESET_CHANGES}
                  handlePrimaryButton={this.resetChanges}
                  primaryButtonText={strings.RESET}
                  secondaryButtonText={strings.CANCEL}
                  modalButtonClassName="btn-light"
                  secondaryButtonClassName="btn-light"
                  primaryButtonClassName="btn-danger"
                >
                  <p>{strings.RESET_CONFIRMATION}</p>
                </Modal>
                <Button text={strings.SAVE} handleClick={this.validate} className="btn-primary" isPending={this.props.isUpdatePending} />
              </div>}
              {props.deprecate && !props.isDeprecated && <Modal
                id="deprecate"
                modalButtonText={`${strings.DEPRECATE} ${props.keyword.toLowerCase()}`}
                handlePrimaryButton={this.deprecate}
                primaryButtonText={strings.DEPRECATE}
                secondaryButtonText={strings.CANCEL}
                modalButtonClassName="btn-danger"
                secondaryButtonClassName="btn-light"
                primaryButtonClassName="btn-danger"
              >
                <p>{strings.formatString(strings.DEPRECATE_TEXT, { item: <span className="text-danger">{props.title}</span> })}</p>
              </Modal>}
              {props.undeprecate && props.isDeprecated && <Modal
                id="undeprecate"
                modalButtonText={`${strings.UNDEPRECATE} ${props.keyword.toLowerCase()}`}
                handlePrimaryButton={this.undeprecate}
                primaryButtonText={strings.UNDEPRECATE}
                secondaryButtonText={strings.CANCEL}
                modalButtonClassName="btn-info"
                secondaryButtonClassName="btn-light"
                primaryButtonClassName="btn-info"
              >
                <p>{strings.formatString(strings.UNDEPRECATE_TEXT, { item: <span className="text-danger">{props.title}</span> })}</p>
              </Modal>}
            </div>
          </div>
        )}
      </main>
    );
  }
}

Detail.propTypes = {
  keyword: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  inputItems: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  create: PropTypes.func,
  createParameters: PropTypes.array,
  remove: PropTypes.func,
  update: PropTypes.func,
  isCreatePending: PropTypes.bool,
  isCreateError: PropTypes.bool,
  isDeprecated: PropTypes.bool,
  isMe: PropTypes.bool,
  setMessage: PropTypes.func.isRequired,
};

Detail.defaultProps = {
  create: null,
  createParameters: [],
  remove: null,
  update: null,
  keyword: '',
  isCreatePending: false,
  isCreateError: false,
  isDeprecated: false,
  isMe: false,
};

export default Detail;
