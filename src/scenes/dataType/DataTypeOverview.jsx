import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { getDataType } from '../../redux/datatype/actions';
import { strings } from '../../utils';

class DataTypeOverview extends Component {
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
        history={this.props.history}
        paginationTotalCount={this.props.dataTypesCount}
        get={this.props.getDataType}
        createParameters={[
          { id: strings.TYPE, label: strings.TYPE, type: "text" },
          { id: strings.PRICE, label: strings.PRICE, type: "number" },
          { id: strings.EDIBLE, label: strings.EDIBLE, type: "boolean" },
          { id: strings.BEST_BEFORE, label: strings.BEST_BEFORE, type: "text" },
          { id: strings.WEIGHT, label: strings.WEIGHT, type: "number" },
          { id: strings.DESCRIPTION, label: strings.DESCRIPTION, type: "text" },
        ]}
        create={() => { }}
        removeItem={() => { }}
        isError={false}
        errorMessage={''}
      />
    );
  }
}

DataTypeOverview.propTypes = {
  datatypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataTypesCount: PropTypes.number.isRequired,
  getDataType: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  datatypes: state.dataType.dataTypes,
  dataTypesCount: state.dataType.dataTypesCount,
});

const mapDispatchToProps = {
  getDataType,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTypeOverview);

