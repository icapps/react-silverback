import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';

import Navbar from './NavBar';

const history = createMemoryHistory({ initialEntries: ['/'] });

describe('Navbar Component', () => {
  it('should render a Navbar component', () => {
    const linkPath1 = 'test1';
    const linkPath2 = 'test2';
    const buildNr = 'V1';
    const versionNr = '1.2.3';

    const { queryByText } = render(
      <Router history={history}>
        <Navbar
          links={[
            { name: linkPath1, path: '/test1' },
            { name: linkPath2, path: '/test2' },
          ]}
          toggleNavigation={() => {}}
          isNavigationShown={true}
          build={buildNr}
          version={versionNr}
        />
      </Router>,
    );
    expect(queryByText(linkPath1)).toBeInTheDocument();
    expect(queryByText(linkPath2)).toBeInTheDocument();
    expect(queryByText(`Version: ${versionNr}`)).toBeInTheDocument();
    expect(queryByText(`Build: ${buildNr}`)).toBeInTheDocument();
  });
});
