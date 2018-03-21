import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from '../index';
import { labels } from '../../utils';
import './overview.css';

class Overview extends React.Component {
  constructor() {
    super();
    this.state = {
      sortField: null,
      sortOrder: null,
    };
  }
  showDetailScreen = id => {
    this.props.history.push(`${window.location.pathname}/${id}`);
  };

  sortItems = (sortField, sortOrder) => {
    this.setState({ sortField, sortOrder });
    this.props.sortItems(sortField, sortOrder ? labels.DESC : labels.ASC);
  }

  render() {
    const { props } = this;
    return (
      <main className="overview col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
        <div className="container">
          <h2>
            {props.title}
            {this.state.sortField && <span className="sort-label">{`${labels.SORTED_BY} ${this.state.sortField} (${this.state.sortOrder ? labels.DESCENDING : labels.ASCENDING})`}</span>}
          </h2>
          <div className="overview-settings">
            <Button text={`${labels.CREATE} ${props.title}`} handleClick={() => { }} className="btn-success" />
          </div>
          {props.listItems.length > 0 ? (
            <Table
              keys={props.keys}
              listItems={props.listItems}
              dateFormat={props.dateFormat}
              handleRowClick={this.showDetailScreen}
              handleRemoveItem={this.props.removeItem}
              handleSort={this.sortItems}
            />
          ) : <div className="jumbotron" role="alert"><span className="empty-overview">{labels.NO_RESULTS_FOUND.replace('RESULT', props.title)}</span></div>
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
};

export default Overview;
