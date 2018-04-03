import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import isDate from 'date-fns/is_date';
import { strings } from '../../utils';
import { Modal } from '../index';
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

  sortItem = (sortedItem, isSortable) => {
    const isDescending = this.state.sortedItem === sortedItem ? !this.state.isDescending : true;
    if (isSortable) {
      this.setState({
        sortedItem,
        isDescending,
      });
      this.props.handleSort(sortedItem, isDescending);
    }
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
              {props.keys.map(key => (
                <th scope="col" key={key.id}>
                  <span className={`key ${key.isSortable ? 'sortable-key' : ''} ${this.state.sortedItem === key.id ? 'active-key' : ''}`} onClick={() => this.sortItem(key.id, key.isSortable)}>
                    {key.value}
                    {key.isSortable && <span className={`sort ${this.state.sortedItem === key.id ? (this.state.isDescending ? 'sort-desc' : 'sort-asc') : ''}`} />}
                  </span>
                </th>))}
              {props.handleRemoveItem && <th></th>}
            </tr>
          </thead>
          <tbody>
            {props.listItems.map((listItem, index) => (
              <tr key={listItem.id}>
                {props.keys.map((key, i) => <td className="table-data" key={`td-${index}-${i}`} onClick={() => props.handleRowClick(listItem.id)}>{this.renderData(listItem[key.id])}</td>)}
                <td className="remove-list-item table-data">
                  {props.handleRemoveItem && <Modal
                    id="delete"
                    icon={deleteIcon}
                    modalButtonText=""
                    handlePrimaryButton={() => props.handleRemoveItem(listItem.id)}
                    primaryButtonText={strings.DELETE}
                    secondaryButtonText={strings.CANCEL}
                    secondaryButtonClassName="btn-light"
                    primaryButtonClassName="btn-danger"
                  >
                    <p>{strings.formatString(strings.DELETE_CONFIRMATION, { item: <span className="text-danger">{this.props.title}</span> })}</p>
                  </Modal>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    isSortable: PropTypes.bool,
  })).isRequired,
  listItems: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object])).isRequired,
  handleRowClick: PropTypes.func.isRequired,
  dateFormat: PropTypes.string,
  handleRemoveItem: PropTypes.func,
  maxTextLength: PropTypes.number,
};

Table.defaultProps = {
  dateFormat: 'DD/MM/YYYY',
  handleRemoveItem: null,
  maxTextLength: 50,
};

export default Table;
