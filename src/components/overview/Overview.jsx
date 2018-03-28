import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, Table, Button } from '../index';
import { strings } from '../../utils';
import './overview.css';

const plus = require('../../assets/images/plus.svg');

class Overview extends React.Component {
  constructor() {
    super();
    this.state = {
      sortField: null,
      sortOrder: null,
    };
  }
  showDetailScreen = id => {
    this.props.history.push(`${window.location.pathname}/${id}`, id);
  };

  sortItems = (sortField, sortOrder) => {
    this.setState({ sortField, sortOrder });
    this.props.sortItems(sortField, sortOrder ? strings.DESC : strings.ASC);
  }

  render() {
    const { props } = this;
    return (
      <main className="overview col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
        <div className="container">
          <h2>
            {props.title}
            {this.state.sortField && <span className="sort-label">{`${strings.SORTED_BY} ${this.state.sortField} (${this.state.sortOrder ? strings.DESCENDING : strings.ASCENDING})`}</span>}
          </h2>
          <div className="overview-settings">
            <Button text={`${strings.CREATE} ${props.title}`} handleClick={() => { }} className="btn-success" icon={plus} />
          </div>
          {props.listItems.length > 0 ? (
            <React.Fragment>
              <Pagination totalCount={props.paginationTotalCount} handleClick={this.props.handlePagination} />
              <Table
                keys={props.keys}
                listItems={props.listItems}
                dateFormat={props.dateFormat}
                handleRowClick={this.showDetailScreen}
                handleRemoveItem={this.props.removeItem}
                handleSort={this.sortItems}
              />
            </React.Fragment>
          ) : <div className="jumbotron" role="alert"><span className="empty-overview">{strings.formatString(strings.NO_RESULTS_FOUND, { result: props.title })}</span></div>
          }
        </div>
      </main>
    );
  }
};

Overview.propTypes = {
  title: PropTypes.string.isRequired,
  keys: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    isSortable: PropTypes.bool,
  })).isRequired,
  listItems: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object])).isRequired,
  dateFormat: PropTypes.string,
  removeItem: PropTypes.func.isRequired,
  sortItems: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  paginationTotalCount: PropTypes.number.isRequired,
  handlePagination: PropTypes.func.isRequired,
};

export default Overview;
