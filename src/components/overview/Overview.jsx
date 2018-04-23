import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, Table, CreateModal } from '../index';
import { strings } from '../../utils';
import constants from '../../redux/users/constants';
import './overview.css';

const SORT_DESC = 'desc';

class Overview extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      limit: 25,
      sortField: null,
      sortOrder: null,
    };
  }
  componentDidMount() {
    this.props.get(this.state.page, this.state.limit);
  }

  remove = async item => {
    if (this.props.removeItem) {
      const result = await this.props.removeItem(item);
      if (result.action && result.action.type === constants.REMOVE_USER_FULFILLED) {
        this.props.get(this.state.page, this.state.limit, this.state.sortField, this.state.sortOrder);
      }
    }
  }

  setActions = actions => {
    return actions.map(action => {
      return {
        ...action, handleAction: async id => {
          await action.handleAction(id);
          await this.props.get(this.state.page, this.state.limit);
        },
      };
    });
  }

  showDetailScreen = id => {
    this.props.history.push(`${window.location.pathname}/${id}`, id);
  };

  sortItems = (sortField, sortOrder) => {
    this.props.get(this.state.page, this.state.limit, sortField, sortOrder);
    this.setState({ sortField, sortOrder });
  }

  handlePagination = (page, limit) => {
    this.props.get(page, limit, this.state.sortField, this.state.sortOrder);
    this.setState({ page, limit });
  };

  render() {
    const { props, state } = this;
    return (
      <main className="overview col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
        <div className="container">
          {props.isError && <div className="alert alert-danger" role="alert">{props.errorMessage}</div>}
          <h2>
            {props.title}
            {state.sortField && <span className="sort-label">{`${strings.SORTED_BY} ${state.sortField} (${state.sortOrder === SORT_DESC ? strings.DESCENDING : strings.ASCENDING})`}</span>}
          </h2>
          <div className="overview-settings">
            {props.create && <CreateModal
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
              <Pagination totalCount={props.paginationTotalCount} handleClick={this.handlePagination} />
              <Table
                keys={props.keys}
                listItems={props.listItems}
                dateFormat={props.dateFormat}
                handleRowClick={this.showDetailScreen}
                handleRemoveItem={this.props.removeItem && this.remove}
                handleSort={this.sortItems}
                deleteIdentifier={props.deleteIdentifier}
                actions={this.setActions(this.props.actions)}
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
  isError: PropTypes.bool.isRequired,
  isCreatePending: PropTypes.bool,
  isCreateError: PropTypes.bool,
  errorMessage: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    handleAction: PropTypes.func,
    primaryButtonText: PropTypes.string,
  })),
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
};

export default Overview;
