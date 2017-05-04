import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

it('should render a button', () => {
  const wrapper = shallow(
    <Button onClickCallback={() => {}}>This is a Button</Button>
  );
  expect(wrapper).toMatchSnapshot();
});

it('should render a \'a\' link', () => {
  const wrapper = shallow(
    <Button href='http://google.com'>This is a href link!</Button>
  );
  expect(wrapper).toMatchSnapshot();
});

it('should render a react router Link', () => {
  const wrapper = shallow(
    <Button link='/home'>This is a React Router Link!</Button>
  );
  expect(wrapper).toMatchSnapshot();
});
