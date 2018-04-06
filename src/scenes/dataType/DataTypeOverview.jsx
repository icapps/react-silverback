import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { getDataType } from '../../redux/datatype/actions';
import { strings } from '../../utils';
import { identifiers } from '../../constants';

class DataTypeOverview extends Component {
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
        history={this.props.history}
        paginationTotalCount={this.props.dataTypesCount}
        get={this.props.getDataType}
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

