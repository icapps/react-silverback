import React from 'react';
import PropTypes from 'prop-types';
import { BasicInput, Button, Checkbox, Modal, CreateModal } from '../index';
import { strings } from '../../utils';
import './detail.css';

const arrowLeft = require('../../assets/images/arrow-left.svg');

class Detail extends React.Component {
  componentDidMount() {
    this.setInputItems();
  }

  setInputItems = () => {
    let inputItemState = {};
    this.props.inputItems.forEach(item => inputItemState[item.id] = item.value);
    this.setState({ inputItemState });
  }

  handleChange = event => {
    this.setState({ inputItemState: { ...this.state.inputItemState, [event.target.id]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }, isSaved: false });
  };

  save = async () => {
    const result = await this.props.update(this.props.id, this.state.inputItemState);
    if (result.action.type.includes('FULFILLED')) {
      this.setState({ isSaved: true });
    }
  }

  delete = () => {
    this.props.remove(this.props.id);
    this.props.history.goBack();
  }

  renderInput = item => {
    if (item.type === 'boolean') {
      return <Checkbox key={item.id} id={item.id} text={item.label} value={this.state.inputItemState[item.id]} handleChange={this.handleChange} isDisabled={this.props.isUpdatePending} />;
    }
    return <BasicInput key={item.id} id={item.id} label={item.label} value={this.state.inputItemState[item.id]} handleChange={this.handleChange} type={item.type} isDisabled={this.props.isUpdatePending} />;
  }


  render() {
    const { state, props } = this;
    const overview = window.location.pathname.split('/')[1];

    return (
      <main className="detail col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
        {props.inputItems && (
          <div className="container">
            <div className="detail-header">
              <div className="back text-primary" onClick={props.history.goBack}><img src={arrowLeft} alt={strings.PREVIOUS} /><span>{`${overview.charAt(0).toUpperCase()}${overview.slice(1)}`}</span></div>
              {props.create && <CreateModal
                primaryButtonText={`${strings.CREATE} ${props.keyword.toLowerCase()}`}
                title={`${strings.CREATE} ${props.keyword.toLowerCase()}`}
                createParameters={props.createParameters}
                create={props.create}
              />}
            </div>
            {props.isUpdated && state.isSaved && <div className="alert alert-success" role="alert">{strings.UPDATE_SUCCESS}</div>}
            {props.isError && <div className="alert alert-danger" role="alert">{props.errorMessage}</div>}
            <h3>{props.title}</h3>
            <span className="text-primary">{`${strings.ID}: ${props.id}`}</span>
            <div className="input-fields">
              {state && props.inputItems.map(item => this.renderInput(item))}
            </div>
            <div className="detail-actions">
              {props.update && <div className="update-actions">
                <Button text={strings.SAVE} handleClick={this.save} className="btn-primary" isPending={this.props.isUpdatePending} />
                <Modal
                  id="reset-changes"
                  modalButtonText={strings.RESET_CHANGES}
                  handlePrimaryButton={this.setInputItems}
                  primaryButtonText={strings.RESET}
                  secondaryButtonText={strings.CANCEL}
                  modalButtonClassName="btn-light"
                  secondaryButtonClassName="btn-light"
                  primaryButtonClassName="btn-danger"
                >
                  <p>{strings.RESET_CONFIRMATION}</p>
                </Modal>
              </div>}
              {props.remove && <Modal
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
              </Modal>}
            </div>
          </div>
        )}
      </main>
    );
  }
}

Detail.propTypes = {
  dataType: PropTypes.string.isRequired,
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
  isUpdated: PropTypes.bool,
};

Detail.defaultProps = {
  create: null,
  createParameters: [],
  remove: null,
  update: null,
  isUpdated: false,
  keyword: '',
};

export default Detail;
