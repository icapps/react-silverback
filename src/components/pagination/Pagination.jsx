import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.Component {
  constructor() {
    super();
    this.state = {
      activePage: 0,
    };
  }

  handleClick(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.handleClick(pageNumber);
  }

  render() {
    const { props } = this;
    return (
      <nav aria-label="Pagination">
        <ul className="pagination">
          <li className={`page-item ${this.state.activePage === 0 ? 'disabled' : ''}`} onClick={() => this.state.activePage !== 0 && this.handleClick(this.state.activePage - 1)}>
            <span className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </span>
          </li>
          {Array(props.pageCount).fill().map((page, index) => (
            <li key={`pagination-${index}`} className={`page-item ${this.state.activePage === index ? 'active' : ''}`} onClick={() => this.handleClick(index)}>
              <span className="page-link">
                {this.state.activePage === index && <span className="sr-only">Current</span>}{index + 1}
              </span>
            </li>
          ))}
          <li className={`page-item ${this.state.activePage === props.pageCount - 1 ? 'disabled' : ''}`} onClick={() => this.state.activePage !== props.pageCount - 1 && this.handleClick(this.state.activePage + 1)}>
            <span className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </span>
          </li>
        </ul>
      </nav>
    );
  }
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Pagination;
