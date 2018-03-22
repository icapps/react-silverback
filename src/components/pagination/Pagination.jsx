import React from 'react';
import PropTypes from 'prop-types';
import './pagination.css';
import { Dropdown } from '../index';

const pageLimitOptions = [5, 10, 25, 50, 100];

class Pagination extends React.Component {
  constructor() {
    super();
    this.state = {
      activePage: 0,
      pageLimit: 10,
    };
  }

  handleClick = (pageNumber) => {
    this.setState({ activePage: pageNumber });
    this.props.handleClick(pageNumber, this.state.pageLimit);
  }

  handlePageLimitChange = event => {
    this.setState({ pageLimit: event.target.value, activePage: 0 });
  }

  renderPages = nrOfPages => {
    return Array(nrOfPages).fill().map((page, index) => {
      return (
        <li key={`pagination-${index}`} className={`page-item ${this.state.activePage === index ? 'active' : ''}`} onClick={() => this.handleClick(index)}>
          <span className="page-link">
            {this.state.activePage === index && <span className="sr-only">Current</span>}{index + 1}
          </span>
        </li>
      );
    });
  }

  render() {
    const { props, state } = this;
    const nrOfPages = Math.ceil(props.totalCount / state.pageLimit);
    const startOfRange = state.activePage * state.pageLimit + 1;
    const endOfRange = state.pageLimit * (state.activePage + 1);

    return (
      <div className="pagination-container">
        <div className="pagination-group">
          <span className="pagination-label">Showing {startOfRange} to {endOfRange > props.totalCount ? props.totalCount : endOfRange} of {props.totalCount}</span>
          <nav aria-label="Pagination">
            <ul className="pagination">
              <li className={`page-item ${state.activePage === 0 ? 'disabled' : ''}`} onClick={() => state.activePage !== 0 && this.handleClick(state.activePage - 1)}>
                <span className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </span>
              </li>
              {this.renderPages(nrOfPages)}
              <li className={`page-item ${state.activePage === nrOfPages - 1 ? 'disabled' : ''}`} onClick={() => state.activePage !== nrOfPages - 1 && this.handleClick(state.activePage + 1)}>
                <span className="page-link" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </span>
              </li>
            </ul>
          </nav>
        </div>
        <div className="pagination-group">
          <Dropdown id="pageLimit" value={state.pageLimit} handleChange={this.handlePageLimitChange} options={pageLimitOptions} isLabelShown={false} />
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
