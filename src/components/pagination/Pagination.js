import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import './pagination.scss';
import { Dropdown } from '../index';
import { strings } from '../../utils';

const pageLimitOptions = [10, 25, 50, 100];
const visiblePages = 5;

const Pagination = ({ totalCount, pageLimit, activePage, handleClick }) => {
  const [minPage, setMinPage] = useState(1);
  const [maxPage, setMaxPage] = useState(visiblePages);

  const nrOfPages = useMemo(() => Math.ceil(totalCount / pageLimit), [totalCount, pageLimit]);
  const startOfRange = useMemo(() => activePage * pageLimit + 1, [activePage, pageLimit]);
  const endOfRange = useMemo(() => pageLimit * (activePage + 1), [activePage, pageLimit]);

  const changePage = (pageNumber, limit = pageLimit) => {
    const newMaxPage = pageNumber <= 2 ? visiblePages : pageNumber + 3 > nrOfPages ? nrOfPages : pageNumber + 3;
    setMinPage(newMaxPage - 4);
    setMaxPage(newMaxPage);
    handleClick(pageNumber, limit);
  };

  const changePageLimit = ({ target: { value } }) => {
    const pageLimit = parseInt(value, 10);
    changePage(0, pageLimit);
  };

  const renderPages = () => {
    return Array(nrOfPages)
      .fill()
      .map((page, index) => {
        if (index + 1 >= minPage && index + 1 <= maxPage) {
          return (
            <li
              key={`pagination-${index}`}
              className={`page-item ${activePage === index ? 'active' : ''}`}
              onClick={() => changePage(index)}
            >
              <span className="page-link">
                {activePage === index && <span className="sr-only">{strings.CURRENT}</span>}
                {index + 1}
              </span>
            </li>
          );
        }
        return null;
      });
  };

  return (
    <div className="pagination-container">
      <div className="pagination-group pages">
        <span className="pagination-label">
          {strings.formatString(strings.SHOWING_X_OF_X, {
            startOfRange,
            endOfRange: endOfRange > totalCount ? totalCount : endOfRange,
            totalCount: totalCount,
          })}
        </span>
        {nrOfPages !== 1 && (
          <nav aria-label="Pagination">
            <ul className="pagination">
              <li
                className={`page-item ${activePage === 0 ? 'disabled' : ''}`}
                onClick={() => activePage !== 0 && changePage(0)}
              >
                <span className="page-link" aria-label={strings.FIRST}>
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">{strings.FIRST}</span>
                </span>
              </li>
              <li
                className={`page-item ${activePage === 0 ? 'disabled' : ''}`}
                onClick={() => activePage !== 0 && changePage(activePage - 1)}
              >
                <span className="page-link" aria-label={strings.PREVIOUS}>
                  <span aria-hidden="true">&lsaquo;</span>
                  <span className="sr-only">{strings.PREVIOUS}</span>
                </span>
              </li>
              {renderPages()}
              <li
                className={`page-item ${activePage === nrOfPages - 1 ? 'disabled' : ''}`}
                onClick={() => activePage !== nrOfPages - 1 && changePage(activePage + 1)}
              >
                <span className="page-link" aria-label={strings.NEXT}>
                  <span aria-hidden="true">&rsaquo;</span>
                  <span className="sr-only">{strings.NEXT}</span>
                </span>
              </li>
              <li
                className={`page-item ${activePage === nrOfPages - 1 ? 'disabled' : ''}`}
                onClick={() => activePage !== nrOfPages - 1 && changePage(nrOfPages - 1)}
              >
                <span className="page-link" aria-label={strings.LAST}>
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">{strings.LAST}</span>
                </span>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <div className="pagination-group">
        <Dropdown
          id="pageLimit"
          value={pageLimit}
          handleChange={changePageLimit}
          options={pageLimitOptions.map(option => ({
            key: option,
            text: option,
          }))}
          isLabelShown={false}
        />
        <span className="page-limit-label">Items per page</span>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  activePage: PropTypes.number,
  pageLimit: PropTypes.number,
};

export default Pagination;
