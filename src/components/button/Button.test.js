import React from 'react';
import { shallow, configure } from 'enzyme';
import Button from './Button';
import Adapter from 'enzyme-adapter-react-16';

const plus = require('../../assets/images/plus.svg');

configure({ adapter: new Adapter() });

describe('Button Component', () => {
  it('should render a Button component', () => {
    const wrapper = shallow(<Button text="Button" handleClick={() => { }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Button component with an extra className', () => {
    const wrapper = shallow(<Button text="Button" handleClick={() => { }} className="btn-primary" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Button component with an icon', () => {
    const wrapper = shallow(<Button text="Button" handleClick={() => { }} className="btn-primary" leftIcon={plus} />);
    expect(wrapper).toMatchSnapshot();
  });
});
