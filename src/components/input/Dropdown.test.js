import React from 'react';
import { render } from '@testing-library/react';

import Dropdown from './Dropdown';

describe('Dropdown Component', () => {
  it('should render a Dropdown component', () => {
    const { container } = render(
      <Dropdown
        id="test"
        label="This is a dropdown"
        value="test"
        handleChange={() => {}}
        options={[
          { key: 'test', text: 'test' },
          { key: 'test2', text: 'test2' },
          { key: 'test3', text: 'test3' },
        ]}
      />,
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="form-group"
        >
          <label
            for="test"
          >
            This is a dropdown
          </label>
          <select
            class="form-control"
            id="test"
          >
            <option
              value="test"
            >
              test
            </option>
            <option
              value="test2"
            >
              test2
            </option>
            <option
              value="test3"
            >
              test3
            </option>
          </select>
        </div>
      </div>
    `);
  });
});
