import React from 'react';
import PropTypes from 'prop-types';
import { strings } from '../../utils';
import './emptyDetail.scss';

const arrowLeft = require('../../assets/images/arrow-left.svg');

const EmptyDetail = props => {
  const overview = window.location.pathname.split('/')[1];
  return (
    <main className="detail-empty col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
      <div className="container">
        <div className="back text-primary" onClick={props.history.goBack}>
          <img src={arrowLeft} alt="back" />
          <span>{`${overview.charAt(0).toUpperCase()}${overview.slice(1)}`}</span>
        </div>
        <h3 className="title">{strings.GENERAL_ERROR}</h3>
      </div>
    </main>
  );
};

EmptyDetail.propTypes = {
  history: PropTypes.object.isRequired,
};

export default EmptyDetail;
