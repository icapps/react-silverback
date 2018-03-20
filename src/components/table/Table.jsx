import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import isDate from 'date-fns/is_date';
import './table.css';

const checkIcon = require('../../assets/images/check.svg');
const crossIcon = require('../../assets/images/cross.svg');
const deleteIcon = require('../../assets/images/delete.svg');

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      sortedItem: '',
      isDescending: true,
    };
  }

  sortItem = sortedItem => {
    const isDescending = this.state.sortedItem === sortedItem ? !this.state.isDescending : true;

    this.setState({
      sortedItem,
      isDescending,
    });
    this.props.handleSort(sortedItem, isDescending);
  }

  renderData = data => {
    switch (typeof data) {
      case 'object': return isDate(data) ? format(data, this.props.dateFormat) : data.toString();
      case 'string': return data.length < this.props.maxTextLength ? data : `${data.substring(0, this.props.maxTextLength)}...`;
      case 'boolean': return <img src={data ? checkIcon : crossIcon} alt={`${data}`} />;
      default: return data;
    }
  }
  render() {
    const { props } = this;
    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th></th>
              {props.keys.map(key => (
                <th scope="col" key={key}>
                  <span className="key" onClick={() => this.sortItem(key)}>{key}
                    <span className={`sort ${this.state.sortedItem === key ? (this.state.isDescending ? 'sort-desc' : 'sort-asc') : ''}`} />
                  </span>
                </th>))}
            </tr>
          </thead>
          <tbody>
            {props.listItems.map((listItem, index) => (
              <tr key={listItem.id}>
                <td className="remove-list-item"><img src={deleteIcon} onClick={() => props.handleRemoveItem(listItem.id)} alt="delete" /></td>
                {props.keys.map((key, i) => <td key={`td-${index}-${i}`} onClick={() => props.handleRowClick(listItem.id)}>{this.renderData(listItem[key])}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  listItems: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object])).isRequired,
  dateFormat: PropTypes.string,
  handleRowClick: PropTypes.func.isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
  maxTextLength: PropTypes.number,
};

Table.defaultProps = {
  dateFormat: 'DD/MM/YYYY',
  maxTextLength: 50,
};

export default Table;
