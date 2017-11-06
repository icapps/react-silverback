import React from 'react';
import {shallow} from 'enzyme';
import Button from './Button';

describe('Button Component', () => {
  test('Render it as a button', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<Button onClickCallback={mockFn}>This is a Button</Button>);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('button').simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it("should render a 'a' link", () => {
    const wrapper = shallow(<Button href='http://google.com'>This is a href link!</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a react router Link', () => {
    const wrapper = shallow(<Button link='/home'>This is a React Router Link!</Button>);
    expect(wrapper).toMatchSnapshot();
  });
});
