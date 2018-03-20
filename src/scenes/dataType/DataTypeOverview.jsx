import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import {getDataType} from '../../redux/datatype/actions';

class DataTypeOverview extends Component {
  componentDidMount(){
    this.props.getDataType();
  }
  render() {
    return (
      <Overview
        title="DataTypes"
        keys={['id', 'type', 'price', 'edible', 'best before', 'weight']}
        listItems={this.props.datatypes}
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
