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

const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      sortField: '',
      sortOrder: SORT_ASC,
    };
  }

  sort = (sortField, isSortable) => {
    if (isSortable) {
      const sortOrder = (this.state.sortField === sortField) ? (this.state.sortOrder === SORT_ASC ? SORT_DESC : SORT_ASC) : SORT_ASC;
      this.setState({
        sortField,
        sortOrder,
      });
      this.props.handleSort(sortField, sortOrder);
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
    const { props, state } = this;
    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              {props.keys.map(key => (
                <th scope="col" key={key.id}>
                  <span className={`key ${key.isSortable ? 'sortable-key' : ''} ${state.sortField === key.id ? 'active-key' : ''}`} onClick={() => this.sort(key.id, key.isSortable)}>
                    {key.value}
                    {key.isSortable && <span className={`sort ${state.sortField === key.id ? state.sortOrder : ''}`} />}
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
                    <p>{strings.formatString(strings.DELETE_CONFIRMATION, { item: <span className="text-danger">{listItem[props.deleteIdentifier]}</span> })}</p>
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
  deleteIdentifier: PropTypes.string,
};

Table.defaultProps = {
  dateFormat: 'DD/MM/YYYY',
  handleRemoveItem: null,
  maxTextLength: 50,
  deleteIdentifier: '',
};

export default Table;
