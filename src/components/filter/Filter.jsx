import React from 'react';
import PropTypes from 'prop-types';
import { strings } from '../../utils';
import './filter.css';

const search = require('../../assets/images/search.svg');

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filterValue: '' };
  }

  handleChange = event => {
    this.setState({ filterValue: event.target.value }, this.props.handleFilter(event.target.value));
  }

  render() {
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"><img src={search} alt={strings.SEARCH} /></span>
        </div>
        <input className="form-control filter" type="text" value={this.state.filterValue} onChange={this.handleChange} placeholder={strings.SEARCH} />
      </div>
    );
  }
}

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default Filter;
