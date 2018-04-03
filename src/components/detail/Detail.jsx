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
    this.setState({ inputItemState: { ...this.state.inputItemState, [event.target.id]: event.target.type === 'checkbox' ? event.target.checked : event.target.value } });
  };

  save = () => {
    this.props.update(this.props.id, this.state.inputItemState);
  }

  delete = () => {
    this.props.remove(this.props.id);
    this.props.history.goBack();
  }

  renderInput = item => {
    if (item.type === 'boolean') {
      return <Checkbox key={item.id} id={item.id} text={item.label} value={this.state.inputItemState[item.id]} handleChange={this.handleChange} />;
    }
    return <BasicInput key={item.id} id={item.id} label={item.label} value={this.state.inputItemState[item.id]} handleChange={this.handleChange} type={item.type} />;
  }


  render() {
    const overview = window.location.pathname.split('/')[1];

    return (
      <main className="detail col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
        {this.props.inputItems && (
          <div className="container">
            <div className="detail-header">
              <div className="back text-primary" onClick={this.props.history.goBack}><img src={arrowLeft} alt={strings.PREVIOUS} /><span>{`${overview.charAt(0).toUpperCase()}${overview.slice(1)}`}</span></div>
              {this.props.create && <CreateModal
                primaryButtonText={`${strings.CREATE} ${this.props.dataType}`}
                title={`${strings.CREATE} ${this.props.dataType}`}
                createParameters={this.props.createParameters}
                create={this.props.create}
              />}
            </div>
            {this.props.isUpdated && <div className="alert alert-success" role="alert">{strings.UPDATE_SUCCESS}</div>}
            {this.props.isError && <div className="alert alert-danger" role="alert">{this.props.errorMessage}</div>}
            <h3>{this.props.title}</h3>
            <span className="text-primary">{`${strings.ID}: ${this.props.id}`}</span>
            <div className="input-fields">
              {this.state && this.props.inputItems.map(item => this.renderInput(item))}
            </div>
            <div className="detail-actions">
              {this.props.update && <div className="update-actions">
                <Button text={strings.SAVE} handleClick={this.save} className="btn-primary" />
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
              {this.props.remove && <Modal
                id="delete"
                modalButtonText={`${strings.DELETE} ${this.props.dataType}`}
                handlePrimaryButton={this.delete}
                primaryButtonText={strings.DELETE}
                secondaryButtonText={strings.CANCEL}
                modalButtonClassName="btn-danger"
                secondaryButtonClassName="btn-light"
                primaryButtonClassName="btn-danger"
              >
                <p>{strings.formatString(strings.DELETE_CONFIRMATION, { item: <span className="text-danger">{this.props.title}</span> })}</p>
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
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  inputItems: PropTypes.array.isRequired,
  remove: PropTypes.func,
  history: PropTypes.object.isRequired,
  createParameters: PropTypes.array,
  create: PropTypes.func,
  update: PropTypes.func,
  isUpdated: PropTypes.bool,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

Detail.defaultProps = {
  isUpdated: false,
};

export default Detail;
