import React from 'react';
import { render } from '@testing-library/react';

import Checkbox from './Checkbox';

describe('BasicInput Component', () => {
  it('should render a BasicInput component', () => {
    const { container } = render(<Checkbox id="test" text="This is a checkbox" value={true} handleChange={() => {}} />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="form-group "
        >
          <div
            class="form-check"
          >
            <input
              checked=""
              class="form-check-input"
              id="test"
              type="checkbox"
            />
            <label
              class="form-check-label"
              for="test"
            >
              This is a checkbox
            </label>
          </div>
        </div>
      </div>
    `);
  });
});
