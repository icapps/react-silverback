import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, Table, CreateModal, Filter, Alert } from '../index';
import { strings } from '../../utils';
import constants from '../../redux/users/constants';
import './overview.css';

const SORT_DESC = 'desc';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      limit: 25,
      deletedItem: props.deletedItem ? props.deletedItem : '',
      actionText: '',
      actionClass: '',
      filterValue: '',
    };
    this.timer = null;
  }

  componentDidMount() {
    this.props.get(this.state.page, this.state.limit);
  }

  componentWillUnmount() {
    this.props.resetDeletedItem();
  }

  remove = async (item, deletedItem) => {
    if (this.props.removeItem) {
      const result = await this.props.removeItem(item);
      if (result.action && result.action.type === constants.REMOVE_USER_FULFILLED) {
        this.scrollTop();
        this.setState({ deletedItem });
        this.props.get(this.state.page * this.state.limit, this.state.limit, this.props.sortField, this.props.sortOrder);
      }
    }
  }

  setActions = actions => {
    return actions.map(action => {
      return {
        ...action, handleAction: async item => {
          const actionResult = await action.handleAction(item.id);
          if (actionResult.action && actionResult.action.type.includes('FULFILLED')) {
            this.scrollTop();
            this.setState({ actionClass: action.actionClassName, actionText: strings.formatString(action.successMessage, { item: <strong>{item[this.props.deleteIdentifier]}</strong> }) });
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

  scrollTop = () => {
    window.scrollTo(0, 0);
  }

  getAlerts = () => {
    const alerts = [];

    if (this.props.isError) {
      alerts.push(<Alert className={'danger'} text={this.state.actionText} key={new Date()} clearAlerts={this.clearAlerts} />);
    }
    if (this.state.actionText !== '') {
      alerts.push(<Alert className={this.state.actionClass} text={this.state.actionText[0][0].props.children + this.state.actionText[1]} key={'t'} clearAlerts={this.clearAlerts} />);
    }
    if (this.state.deletedItem !== '') {
      alerts.push(<Alert className={'success'} text={strings.formatString(strings.DELETED_ITEM, { item: <strong>{this.state.deletedItem}</strong> })} key={new Date()} clearAlerts={this.clearAlerts} />);
    }
    return alerts;
  }

  clearAlerts = () => {
    this.setState({
      actionText: '',
      deletedItem: '',
    });
  }

  render() {
    const { props, state } = this;
    return (
      <main className="overview col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
        <div className="container">
          {this.getAlerts()}
          <h2>
            {props.title}
            {props.sortField && <span className="sort-label">{`${strings.SORTED_BY} ${props.sortField} (${props.sortOrder === SORT_DESC ? strings.DESCENDING : strings.ASCENDING})`}</span>}
          </h2>
          <div className="overview-settings">
            <Filter handleFilter={this.handleFilter} />
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
  deletedItem: PropTypes.string,
  resetDeletedItem: PropTypes.func,
  sortOrder: PropTypes.string,
  sortField: PropTypes.string,
};

Overview.defaultProps = {
  create: null,
  createParameters: [],
  dateFormat: null,
  removeItem: null,
  deleteIdentifier: '',
  deletedItem: '',
  resetDeletedItem: () => { },
  keyword: '',
  isCreatePending: false,
  isCreateError: false,
  actions: [],
  sortOrder: '',
  sortField: '',
};

export default Overview;
