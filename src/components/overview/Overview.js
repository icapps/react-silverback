import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, Table, CreateModal, Filter } from '../index';
import { strings } from '../../utils';
import constants from '../../redux/users/constants';
import './overview.css';
import { identifiers } from '../../constants';

const SORT_DESC = 'desc';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      limit: 25,
      filterValue: '',
    };
    this.timer = null;
  }

  componentDidMount() {
    this.props.get(this.state.page, this.state.limit);
  }

  remove = async (item, deletedItem) => {
    if (this.props.removeItem) {
      const result = await this.props.removeItem(item);
      if (result.action && result.action.type === constants.REMOVE_USER_FULFILLED) {
        this.props.get(this.state.page * this.state.limit, this.state.limit, this.props.sortField, this.props.sortOrder);
        this.props.setMessage({ type: identifiers.MESSAGE_SUCCESS, text: strings.formatString(strings.ITEM_HAS_BEEN_DELETED, { item: <b>{deletedItem}</b> }) });
      } 
    }
  }

  setActions = actions => {
    return actions.map(action => {
      return {
        ...action, handleAction: async item => {
          const actionResult = await action.handleAction(item.id);
          if (actionResult.action && actionResult.action.type.includes('FULFILLED')) {
            this.props.setMessage({ type: identifiers.MESSAGE_SUCCESS, text: strings.formatString(action.successMessage, { item: <b>{item.name}</b> }) });
          }
          await this.sortItems(this.props.sortField, this.props.sortOrder);
        },
      };
    });
  }

  showDetailScreen = id => {
    this.props.history.push(`${window.location.pathname}/${id}`, id);
  };

  sortItems = (sortField, sortOrder) => {
    this.props.get(this.state.page * this.state.limit, this.state.limit, sortField, sortOrder, this.state.filterValue);
  }

  handlePagination = (page, limit) => {
    this.props.get(page * limit, limit, this.props.sortField, this.props.sortOrder);
    this.setState({ page, limit });
  };

  handleFilter = filterValue => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.props.get(this.state.page * this.state.limit, this.state.limit, this.props.sortField, this.props.sortOrder, filterValue);
      this.setState({ filterValue });
    }, 700);
  }

  render() {
    const { props, state } = this;
    return (
      <main className="overview col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
        <div className="container">
          <h2>
            {props.title}
            {props.sortField && <span className="sort-label">{`${strings.SORTED_BY} ${props.sortField} (${props.sortOrder === SORT_DESC ? strings.DESCENDING : strings.ASCENDING})`}</span>}
          </h2>
          <div className="overview-settings">
            <Filter handleFilter={this.handleFilter} />
            {props.create && this.props.createParameters.length && <CreateModal
              primaryButtonText={`${strings.CREATE} ${props.keyword.toLowerCase()}`}
              title={`${strings.CREATE} ${props.keyword.toLowerCase()}`}
              createParameters={this.props.createParameters}
              create={this.props.create}
              isError={props.isCreateError}
              isPending={props.isCreatePending}
              errorMessage={props.errorMessage}
            />}
          </div>
          {props.listItems.length > 0 ? (
            <React.Fragment>
              <Pagination totalCount={props.paginationTotalCount} handleClick={this.handlePagination} activePage={state.page} pageLimit={state.limit} />
              <Table
                keys={props.keys}
                listItems={props.listItems}
                dateFormat={props.dateFormat}
                handleRowClick={this.showDetailScreen}
                handleRemoveItem={this.props.removeItem && this.remove}
                handleSort={this.sortItems}
                deleteIdentifier={props.deleteIdentifier}
                actions={this.setActions(this.props.actions)}
                sortOrder={props.sortOrder}
                sortField={props.sortField}
                email={this.props.email}
              />
              <Pagination totalCount={props.paginationTotalCount} handleClick={this.handlePagination} activePage={state.page} pageLimit={state.limit} />
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
  keyword: PropTypes.string,
  keys: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    isSortable: PropTypes.bool,
  })).isRequired,
  listItems: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object])).isRequired,
  get: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  paginationTotalCount: PropTypes.number.isRequired,
  create: PropTypes.func,
  createParameters: PropTypes.array,
  dateFormat: PropTypes.string,
  removeItem: PropTypes.func,
  deleteIdentifier: PropTypes.string,
  isCreatePending: PropTypes.bool,
  isCreateError: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    handleAction: PropTypes.func,
    primaryButtonText: PropTypes.string,
  })),
  sortOrder: PropTypes.string,
  sortField: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  email: PropTypes.string,
};

Overview.defaultProps = {
  create: null,
  createParameters: [],
  dateFormat: null,
  removeItem: null,
  deleteIdentifier: '',
  keyword: '',
  isCreatePending: false,
  isCreateError: false,
  actions: [],
  sortOrder: '',
  sortField: '',
  email: '',
};

export default Overview;
