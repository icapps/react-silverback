import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../index';
import './overview.css';

const Overview = props => (
  <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
    <h2>{props.title}</h2>
    {props.listItems.length > 0 ? (
      <Table
        keys={props.keys}
        listItems={props.listItems}
        dateFormat={props.dateFormat}
        handleRowClick={() => { }}
        handleRemoveItem={() => { }}
        handleSort={() => { }}
      />
    ) : <div className="jumbotron" role="alert"><span className="empty-overview">No {props.title} found ...</span></div>
    }
  </main>
);

Overview.propTypes = {
  title: PropTypes.string.isRequired,
  keys: PropTypes.array.isRequired,
  listItems: PropTypes.array.isRequired,
  dateFormat: PropTypes.string,
};

export default Overview;
