import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { getDataType } from '../../redux/datatype/actions';

class DataTypeOverview extends Component {
  componentDidMount() {
    this.props.getDataType();
  }
  render() {
    return (
      <Overview
        title="DataTypes"
        keys={['id', 'type', 'price', 'edible', 'bestBefore', 'weight', 'description']}
        listItems={this.props.datatypes.map(item => { return { ...item, bestBefore: item.bestBefore && new Date(item.bestBefore) }; })}
        removeItem={() => { }}
        history={this.props.history}
      />
    );
  }
}

const mapStateToProps = state => ({
  datatypes: state.dataType.dataTypes,
});

const mapDispatchToProps = {
  getDataType,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTypeOverview);
