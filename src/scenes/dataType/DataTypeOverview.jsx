import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { getDataType } from '../../redux/datatype/actions';
import { labels } from '../../utils';

class DataTypeOverview extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      limit: 10,
      sortField: null,
      sortOrder: null,
    };
  }
  componentDidMount() {
    this.props.getDataType(this.state.page, this.state.limit);
  }

  sortItems = (sortField, sortOrder) => {
    this.props.getDataType(this.state.page, this.state.limit, sortField, sortOrder);
    this.setState({ sortField, sortOrder });
  }

  handlePagination = (page, limit) => {
    this.props.getDataType(page, limit, this.state.sortField, this.state.sortOrder);
    this.setState({ page, limit });
  };

  render() {
    return (
      <Overview
        title={labels.DATATYPES}
        keys={[
          { id: labels.ID, value: labels.ID, isSortable: true },
          { id: labels.TYPE, value: labels.TYPE, isSortable: true },
          { id: labels.PRICE, value: labels.PRICE, isSortable: true },
          { id: labels.EDIBLE, value: labels.EDIBLE, isSortable: false },
          { id: labels.BEST_BEFORE, value: labels.BEST_BEFORE, isSortable: false },
          { id: labels.WEIGHT, value: labels.WEIGHT, isSortable: true },
          { id: labels.DESCRIPTION, value: labels.DESCRIPTION, isSortable: false },
        ]}
        listItems={this.props.datatypes.map(item => { return { ...item, bestBefore: item.bestBefore && new Date(item.bestBefore) }; })}
        removeItem={() => { }}
        sortItems={this.sortItems}
        history={this.props.history}
        paginationConfig={{ pageLimit: this.props.pageLimit, totalCount: this.props.dataTypesCount }}
        handlePagination={this.handlePagination}
      />
    );
  }
}

const mapStateToProps = state => ({
  datatypes: state.dataType.dataTypes,
  dataTypesCount: state.dataType.dataTypesCount,
});

const mapDispatchToProps = {
  getDataType,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTypeOverview);
