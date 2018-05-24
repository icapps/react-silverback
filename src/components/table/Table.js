import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import isDate from 'date-fns/is_date';
import { strings } from '../../utils';
import { Modal } from '../index';
import { identifiers } from '../../constants';
import './table.css';

const checkIcon = require('../../assets/images/check.svg');
const crossIcon = require('../../assets/images/cross.svg');
const deleteIcon = require('../../assets/images/delete.svg');

const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

class Table extends React.Component {
  sort = (sortField, isSortable) => {
    if (isSortable) {
      const sortOrder = (this.props.sortField === sortField) ? (this.props.sortOrder === SORT_ASC ? SORT_DESC : SORT_ASC) : SORT_ASC;
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

  selectData = (object, path) => {
    return this.renderData(path.split('.').reduce((obj, prop) => {
      return obj[prop];
    }, object
    ));
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
                  <span className={`key ${key.isSortable ? 'sortable-key' : ''} ${props.sortField === key.sorter ? 'active-key' : ''}`} onClick={() => this.sort(key.sorter, key.isSortable)}>
                    {key.value}
                    {key.isSortable && <span className={`sort ${props.sortField === key.sorter ? props.sortOrder : ''}`} />}
                  </span>
                </th>))}
              {props.handleRemoveItem && <th></th>}
              {props.actions && props.actions.length > 0 && <th></th>}
            </tr>
          </thead>
          <tbody>
            {props.listItems.map(listItem => (
              <tr key={listItem.id} className={listItem.deprecated ? 'deprecated' : ''}>
                {props.keys.map(key => <td className={"table-data"} key={`td-${key.id}`} onClick={() => props.handleRowClick(listItem.id)}>{this.selectData(listItem, key.id)}</td>)}
                {props.actions && props.actions.length > 0 &&
                  props.actions.map(action => {
                    const shouldDeprecate = action.id === identifiers.DEPRECATED && !listItem.deprecated;
                    const shouldUndeprecate = action.id === identifiers.UNDEPRECATED && listItem.deprecated;
                    if (shouldDeprecate || shouldUndeprecate || (action.id !== identifiers.DEPRECATED && action.id !== identifiers.UNDEPRECATED)) {
                      return <td className="remove-list-item table-data" key={action.id} >
                        <Modal
                          id={action.id}
                          modalButtonClassName={action.buttonClass}
                          modalButtonText={action.label}
                          handlePrimaryButton={() => action.handleAction(listItem)}
                          primaryButtonText={action.primaryButtonText}
                          secondaryButtonText={strings.CANCEL}
                          secondaryButtonClassName="btn-light"
                          primaryButtonClassName={action.primaryButtonClassName}
                        >
                          <p>{strings.formatString(action.text, { item: <span className={`text-danger`}>{listItem[props.deleteIdentifier]}</span> })}</p>
                        </Modal>
                      </td>;
                    }
                    return null;
                  })
                }
                {props.handleRemoveItem && <td className="remove-list-item table-data">
                  <Modal
                    id="delete"
                    icon={deleteIcon}
                    modalButtonText=""
                    handlePrimaryButton={() => props.handleRemoveItem(listItem.id, listItem[props.deleteIdentifier])}
                    primaryButtonText={strings.DELETE}
                    secondaryButtonText={strings.CANCEL}
                    secondaryButtonClassName="btn-light"
                    primaryButtonClassName="btn-danger"
                  >
                    <p>{strings.formatString(strings.DELETE_CONFIRMATION, { item: <span className="text-danger">{listItem[props.deleteIdentifier]}</span> })}</p>
                  </Modal>
                </td>}
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
  sortOrder: PropTypes.string,
  sortField: PropTypes.string,
};

Table.defaultProps = {
  dateFormat: 'DD/MM/YYYY',
  handleRemoveItem: null,
  maxTextLength: 50,
  deleteIdentifier: '',
  sortOrder: '',
  sortField: '',
};

export default Table;
