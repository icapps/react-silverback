import React from 'react';
import { render } from '@testing-library/react';

import Button from './Button';

const plus = require('../../assets/images/plus.svg');

describe('Button Component', () => {
  it('should render a Button component', () => {
    const { container } = render(<Button text="Button" handleClick={() => {}} />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          class="btn "
          type="button"
        >
          <span>
            Button
          </span>
        </button>
      </div>
    `);
  });

  it('should render a Button component with an extra className', () => {
    const { container } = render(<Button text="Button" handleClick={() => {}} className="btn-primary" />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          class="btn btn-primary"
          type="button"
        >
          <span>
            Button
          </span>
        </button>
      </div>
    `);
  });

  it('should render a Button component with an icon', () => {
    const { container } = render(
      <Button text="Button" handleClick={() => {}} className="btn-primary" leftIcon={plus} />,
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          class="btn btn-primary"
          type="button"
        >
          <img
            alt=""
            src="[object Object]"
          />
          <span>
            Button
          </span>
        </button>
      </div>
    `);
  });
});
