import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import BasicInput from './BasicInput';

describe('BasicInput Component', () => {
  it('should render a BasicInput component', () => {
    const { container } = render(<BasicInput id="test" label="Text" value="test" handleChange={() => {}} />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="form-group"
        >
          <label
            for="test"
          >
            Text
          </label>
          <input
            class="form-control "
            id="test"
            placeholder=""
            type="text"
            value="test"
          />
        </div>
      </div>
    `);
  });

  it('should render a BasicInput component with error handling', () => {
    const errorMessage = 'This is an error message';
    const { getByText } = render(
      <BasicInput
        id="test"
        label="Text with errorhandling"
        value="test"
        handleChange={() => {}}
        isValid={false}
        errorMessage={errorMessage}
      />,
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
  });
});
