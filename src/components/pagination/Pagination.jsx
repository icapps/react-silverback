import React from 'react';
import PropTypes from 'prop-types';
import './pagination.css';
import { Dropdown } from '../index';
import { strings } from '../../utils';

const pageLimitOptions = [5, 10, 25, 50, 100];
const visiblePages = 5;

class Pagination extends React.Component {
  constructor() {
    super();
    this.state = {
      activePage: 0,
      pageLimit: 10,
      minPage: 1,
      maxPage: visiblePages,
    };
  }

  changePage = (pageNumber, pageLimit = this.state.pageLimit) => {
    let maxPage = 1;
    do {
      maxPage += (visiblePages - 1);
    } while (pageNumber >= (maxPage - 1));
    const minPage = maxPage - (visiblePages - 1);
    this.setState({ activePage: pageNumber, minPage, maxPage });
    this.props.handleClick(pageNumber, pageLimit);
  }

  changePageLimit = event => {
    const pageLimit = parseInt(event.target.value, 10);
    this.setState({ pageLimit });
    this.changePage(0, pageLimit);
  }

  renderPages = nrOfPages => {
    return Array(nrOfPages).fill().map((page, index) => {
      if ((index + 1) >= this.state.minPage && (index + 1) <= this.state.maxPage) {
        return (
          <li key={`pagination-${index}`} className={`page-item ${this.state.activePage === index ? 'active' : ''}`} onClick={() => this.changePage(index)}>
            <span className="page-link">
              {this.state.activePage === index && <span className="sr-only">{strings.CURRENT}</span>}{index + 1}
            </span>
          </li>
        );
      }
      return null;
    });
  }

  render() {
    const { props, state } = this;
    const nrOfPages = Math.ceil(props.totalCount / state.pageLimit);
    const startOfRange = state.activePage * state.pageLimit + 1;
    const endOfRange = state.pageLimit * (state.activePage + 1);

    return (
      <div className="pagination-container">
        <div className="pagination-group pages">
          <span className="pagination-label">{strings.formatString(strings.SHOWING_X_OF_X, { startOfRange, endOfRange: endOfRange > props.totalCount ? props.totalCount : endOfRange, totalCount: props.totalCount })}</span>
          <nav aria-label="Pagination">
            <ul className="pagination">
              <li className={`page-item ${state.activePage === 0 ? 'disabled' : ''}`} onClick={() => state.activePage !== 0 && this.changePage(state.activePage - 1)}>
                <span className="page-link" aria-label={strings.PREVIOUS}>
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">{strings.PREVIOUS}</span>
                </span>
              </li>
              {this.state.minPage > 1 && (
                <React.Fragment>
                  <li className="page-item" onClick={() => this.changePage(0)}>
                    <span className="page-link">1</span>
                  </li>
                  <li className="page-item disabled ellipsis">
                    <span className="page-link">{strings.ELLIPSIS}</span>
                  </li>
                </React.Fragment>
              )}
              {this.renderPages(nrOfPages)}
              {this.state.maxPage < nrOfPages && (
                <React.Fragment>
                  <li className="page-item disabled ellipsis">
                    <span className="page-link">{strings.ELLIPSIS}</span>
                  </li>
                  <li className="page-item" onClick={() => this.changePage(nrOfPages - 1)}>
                    <span className="page-link">{nrOfPages}</span>
                  </li>
                </React.Fragment>
              )}
              <li className={`page-item ${state.activePage === nrOfPages - 1 ? 'disabled' : ''}`} onClick={() => state.activePage !== nrOfPages - 1 && this.changePage(state.activePage + 1)}>
                <span className="page-link" aria-label={strings.NEXT}>
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">{strings.NEXT}</span>
                </span>
              </li>
            </ul>
          </nav>
        </div>
        <div className="pagination-group">
          <Dropdown id="pageLimit" value={state.pageLimit} handleChange={this.changePageLimit} options={pageLimitOptions} isLabelShown={false} />
          <span className="page-limit-label">Items per page</span>
        </div>
      </div>
    );
  }
};

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Pagination;
