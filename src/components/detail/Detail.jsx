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
    let inputState = {};
    this.props.inputItems.forEach(item => inputState[item.id] = item.value);
    this.setState(inputState);
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.type === 'checkbox' ? event.target.checked : event.target.value });
  };

  save = () => {
    this.props.update(this.props.id, this.state);
  }

  renderInput = item => {
    if (item.type === 'boolean') {
      return <Checkbox key={item.id} id={item.id} text={item.label} value={this.state[item.id]} handleChange={this.handleChange} />;
    }
    return <BasicInput key={item.id} id={item.id} label={item.label} value={this.state[item.id]} handleChange={this.handleChange} type={item.type} />;
  }


  render() {
    const overview = window.location.pathname.split('/')[1];

    return (
      <main className="detail col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
        {this.props.inputItems && (
          <div className="container">
            <div className="detail-header">
              <div className="back text-primary" onClick={this.props.history.goBack}><img src={arrowLeft} alt={strings.PREVIOUS} /><span>{`${overview.charAt(0).toUpperCase()}${overview.slice(1)}`}</span></div>
              <CreateModal
                primaryButtonText={`${strings.CREATE} ${this.props.dataType}`}
                title={`${strings.CREATE} ${this.props.dataType}`}
                createParameters={this.props.createParameters}
                create={this.props.create}
              />
            </div>
            {this.props.isUpdated && <div class="alert alert-success" role="alert">{strings.UPDATE_SUCCESS}</div>}
            {this.props.isError && <div class="alert alert-danger" role="alert">{this.props.errorMessage}</div>}
            <h3>{this.props.title}</h3>
            <span className="text-primary">{`${strings.ID}: ${this.props.id}`}</span>
            <div className="input-fields">
              {this.state && this.props.inputItems.map(item => this.renderInput(item))}
            </div>
            <div className="detail-actions">
              <div className="update-actions">
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
              </div>
              <Modal
                id="delete"
                modalButtonText={`${strings.DELETE} ${this.props.dataType}`}
                handlePrimaryButton={() => this.props.remove(this.props.id)}
                primaryButtonText={strings.DELETE}
                secondaryButtonText={strings.CANCEL}
                modalButtonClassName="btn-danger"
                secondaryButtonClassName="btn-light"
                primaryButtonClassName="btn-danger"
              >
                <p>{strings.formatString(strings.DELETE_CONFIRMATION, { item: <span className="text-danger">{this.props.title}</span> })}</p>
              </Modal>
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
  remove: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  createParameters: PropTypes.array.isRequired,
  create: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  isUpdated: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default Detail;
