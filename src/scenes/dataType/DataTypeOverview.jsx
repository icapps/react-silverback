import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { getDataType } from '../../redux/datatype/actions';
import { strings } from '../../utils';
import { identifiers } from '../../constants';

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
          { id: identifiers.ID, value: strings.ID, isSortable: true },
          { id: identifiers.TYPE, value: strings.TYPE, isSortable: true },
          { id: identifiers.PRICE, value: strings.PRICE, isSortable: true },
          { id: identifiers.EDIBLE, value: strings.EDIBLE, isSortable: false },
          { id: identifiers.BEST_BEFORE, value: strings.BEST_BEFORE, isSortable: false },
          { id: identifiers.WEIGHT, value: strings.WEIGHT, isSortable: true },
          { id: identifiers.DESCRIPTION, value: strings.DESCRIPTION, isSortable: false },
        ]}
        listItems={this.props.datatypes.map(item => { return { ...item, bestBefore: item.bestBefore && new Date(item.bestBefore) }; })}
        sortItems={this.sortItems}
        history={this.props.history}
        paginationTotalCount={this.props.dataTypesCount}
        handlePagination={this.handlePagination}
        createParameters={[
          { id: identifiers.TYPE, label: strings.TYPE, type: "text" },
          { id: identifiers.PRICE, label: strings.PRICE, type: "number" },
          { id: identifiers.EDIBLE, label: strings.EDIBLE, type: "boolean" },
          { id: identifiers.BEST_BEFORE, label: strings.BEST_BEFORE, type: "text" },
          { id: identifiers.WEIGHT, label: strings.WEIGHT, type: "number" },
          { id: identifiers.DESCRIPTION, label: strings.DESCRIPTION, type: "text" },
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

