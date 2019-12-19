import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Header from './Header';

const history = createMemoryHistory({ initialEntries: ['/'] });

describe('Header Component', () => {
  it('should render a Header component', () => {
    const { container } = render(
      <Router history={history}>
        <Header toggleNavigation={() => {}} logout={() => {}} />
      </Router>,
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <header
          class="navbar navbar-dark bg-dark fixed-top"
        >
          <a
            class="navbar-brand"
            href="/"
          >
            Silverback
          </a>
          <div>
            <button
              class="btn btn-dark btn-logout"
              type="button"
            >
              <span>
                Logout
              </span>
              <img
                alt=""
                src="[object Object]"
              />
            </button>
            <span
              class="navbar-toggler-icon"
            />
          </div>
        </header>
      </div>
    `);
  });
});
