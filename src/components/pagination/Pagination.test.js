import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Pagination from './Pagination';

describe('Pagination Component', () => {
  it('should render a Pagination component', () => {
    const totalCount = 20;
    const activePage = 0;
    const pageLimit = 5;
    const { queryByText } = render(
      <Pagination totalCount={totalCount} handleClick={() => {}} activePage={activePage} pageLimit={pageLimit} />,
    );
    expect(queryByText(`Showing ${activePage + 1} to ${pageLimit} of ${totalCount}`)).toBeInTheDocument();
  });
});
