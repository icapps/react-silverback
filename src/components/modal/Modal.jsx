import React from 'react';
import PropTypes from 'prop-types';
import './modal.css';

class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  handleClosingButton = () => {
    this.toggleModal();
  }

  handlePrimaryButton = () => {
    this.props.handlePrimaryButton();
    this.toggleModal();
  }

  handleSecondaryButton = () => {
    this.props.handleSecondaryButton();
    this.toggleModal();
  }

  render() {
    const { props } = this;

    return (
      <React.Fragment>
        <button type="button" className={`btn ${props.modalButtonClassName}`} data-toggle="modal" data-target={`#${props.id}`} onClick={this.toggleModal}>
          {props.modalButtonText}
        </button>

        <div className={`modal fade ${this.state.showModal ? 'show' : ''}`} id={props.id} tabIndex="-1" role="dialog" aria-labelledby={props.id} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              {props.hasHeader && (
                <div className="modal-header">
                  <h5 className="modal-title">{props.title}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClosingButton}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
              <div className="modal-body">
                {props.children}
              </div>
              <div className="modal-footer">
                <button type="button" className={`btn ${props.secondaryButtonClassName}`} data-dismiss="modal" onClick={this.handleSecondaryButton}>{props.secondaryButtonText}</button>
                <button type="button" className={`btn ${props.primaryButtonClassName}`} data-dismiss="modal" onClick={this.handlePrimaryButton}>{props.primaryButtonText}</button>
              </div>
            </div>
          </div>
        </div>
        {this.state.showModal && <div className="modal-backdrop fade show"></div>}
      </React.Fragment>
    );
  }
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  modalButtonClassName: PropTypes.string,
  modalButtonText: PropTypes.string.isRequired,
  hasHeader: PropTypes.bool,
  title: PropTypes.string,
  secondaryButtonClassName: PropTypes.string,
  handleSecondaryButton: PropTypes.func.isRequired,
  secondaryButtonText: PropTypes.string.isRequired,
  primaryButtonClassName: PropTypes.string,
  handlePrimaryButton: PropTypes.func.isRequired,
  primaryButtonText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  modalButtonClassName: 'btn-light',
  hasHeader: false,
  title: '',
  secondaryButtonClassName: 'btn-light',
  primaryButtonClassName: 'btn-light',
};

export default Modal;
