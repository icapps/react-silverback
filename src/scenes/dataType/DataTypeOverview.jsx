import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { getDataType } from '../../redux/datatype/actions';
import { strings } from '../../utils';

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
        title={strings.DATATYPES}
        keys={[
          { id: strings.ID, value: strings.ID, isSortable: true },
          { id: strings.TYPE, value: strings.TYPE, isSortable: true },
          { id: strings.PRICE, value: strings.PRICE, isSortable: true },
          { id: strings.EDIBLE, value: strings.EDIBLE, isSortable: false },
          { id: strings.BEST_BEFORE, value: strings.BEST_BEFORE, isSortable: false },
          { id: strings.WEIGHT, value: strings.WEIGHT, isSortable: true },
          { id: strings.DESCRIPTION, value: strings.DESCRIPTION, isSortable: false },
        ]}
        listItems={this.props.datatypes.map(item => { return { ...item, bestBefore: item.bestBefore && new Date(item.bestBefore) }; })}
        sortItems={this.sortItems}
        history={this.props.history}
        paginationTotalCount={this.props.dataTypesCount}
        handlePagination={this.handlePagination}
        createParameters={[
          { id: strings.TYPE, label: strings.TYPE, type: "text" },
          { id: strings.PRICE, label: strings.PRICE, type: "number" },
          { id: strings.EDIBLE, label: strings.EDIBLE, type: "boolean" },
          { id: strings.BEST_BEFORE, label: strings.BEST_BEFORE, type: "text" },
          { id: strings.WEIGHT, label: strings.WEIGHT, type: "number" },
          { id: strings.DESCRIPTION, label: strings.DESCRIPTION, type: "string" },
        ]}
        create={() => { }}
        removeItem={() => { }}
        isError={false}
        errorMessage={''}
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

