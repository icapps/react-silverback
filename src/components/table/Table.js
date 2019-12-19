import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import isDate from 'date-fns/is_date';
import { strings } from '../../utils';
import { Modal } from '../index';
import { identifiers } from '../../constants';
import './table.scss';

const checkIcon = require('../../assets/images/check.svg');
const crossIcon = require('../../assets/images/cross.svg');
const deleteIcon = require('../../assets/images/delete.svg');

const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

const Table = ({
  actions,
  dateFormat,
  deleteIdentifier,
  email,
  handleRemoveItem,
  handleRowClick,
  handleSort,
  keys,
  listItems,
  maxTextLength,
  sortField,
  sortOrder,
}) => {
  const sort = (field, isSortable) => {
    if (isSortable) {
      const newSortOrder = sortField === field ? (sortOrder === SORT_ASC ? SORT_DESC : SORT_ASC) : SORT_ASC;
      handleSort(field, newSortOrder);
    }
  };

  const renderData = data => {
    switch (typeof data) {
      case 'object':
        return isDate(data) ? format(data, dateFormat) : data.toString();
      case 'string':
        return data.length < maxTextLength ? data : `${data.substring(0, maxTextLength)}...`;
      case 'boolean':
        return <img src={data ? checkIcon : crossIcon} alt={`${data}`} />;
      default:
        return data;
    }
  };

  const selectData = (object, path) => {
    return renderData(
      path.split('.').reduce((obj, prop) => {
        return obj[prop];
      }, object),
    );
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            {keys.map(key => (
              <th scope="col" key={key.id} className={`col-${key.width}`}>
                <span
                  className={`key ${key.isSortable ? 'sortable-key' : ''} ${
                    sortField === key.sorter ? 'active-key' : ''
                  }`}
                  onClick={() => sort(key.sorter, key.isSortable)}
                >
                  {key.value}
                  {key.isSortable && <span className={`sort ${sortField === key.sorter ? sortOrder : ''}`} />}
                </span>
              </th>
            ))}
            {handleRemoveItem && <th className="col-1"></th>}
            {actions && actions.length > 0 && <th className="col-2"></th>}
          </tr>
        </thead>
        <tbody>
          {listItems.map(listItem => (
            <tr key={listItem.id} className={listItem.deprecated ? 'deprecated' : ''}>
              {keys.map(key => (
                <td
                  className={`table-data col-${key.width}`}
                  key={`td-${key.id}`}
                  onClick={() => handleRowClick(listItem.id)}
                >
                  {selectData(listItem, key.id)}
                </td>
              ))}
              {actions &&
                actions.length > 0 &&
                actions.map(action => {
                  const shouldDeprecate = action.id === identifiers.DEPRECATED && !listItem.deprecated;
                  const shouldUndeprecate = action.id === identifiers.UNDEPRECATED && listItem.deprecated;
                  if (
                    shouldDeprecate ||
                    shouldUndeprecate ||
                    (action.id !== identifiers.DEPRECATED && action.id !== identifiers.UNDEPRECATED)
                  ) {
                    return (
                      <td className="remove-list-item table-data col-2" key={action.id}>
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
                          <p>
                            {strings.formatString(action.text, {
                              item: <span className={`text-danger`}>{listItem[deleteIdentifier]}</span>,
                            })}
                          </p>
                        </Modal>
                      </td>
                    );
                  }
                  return null;
                })}
              {handleRemoveItem && listItem[deleteIdentifier] !== email ? (
                <td className="remove-list-item table-data col-1">
                  <Modal
                    id="delete"
                    icon={deleteIcon}
                    modalButtonText=""
                    handlePrimaryButton={() => handleRemoveItem(listItem.id, listItem[deleteIdentifier])}
                    primaryButtonText={strings.DELETE}
                    secondaryButtonText={strings.CANCEL}
                    secondaryButtonClassName="btn-light"
                    primaryButtonClassName="btn-danger"
                  >
                    <p>
                      {strings.formatString(strings.DELETE_CONFIRMATION, {
                        item: <span className="text-danger">{listItem[deleteIdentifier]}</span>,
                      })}
                    </p>
                  </Modal>
                </td>
              ) : (
                <td className="remove-list-item table-data col-1" onClick={() => handleRowClick(listItem.id)}></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  keys: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string,
      isSortable: PropTypes.bool,
    }),
  ).isRequired,
  listItems: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object]),
  ).isRequired,
  handleRowClick: PropTypes.func.isRequired,
  dateFormat: PropTypes.string,
  handleRemoveItem: PropTypes.func,
  maxTextLength: PropTypes.number,
  deleteIdentifier: PropTypes.string,
  sortOrder: PropTypes.string,
  sortField: PropTypes.string,
  email: PropTypes.string,
};

Table.defaultProps = {
  dateFormat: 'DD/MM/YYYY',
  handleRemoveItem: null,
  maxTextLength: 50,
  deleteIdentifier: '',
  sortOrder: '',
  sortField: '',
  email: '',
};

export default Table;
