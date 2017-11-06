import React from 'react';
import { shallow } from 'enzyme';
import ConnectedJokes, { Jokes } from './Jokes';

describe('Jokes View', () => {
  test('It should render', () => {
    const wrapper = shallow(<Jokes />);
    expect(wrapper).toMatchSnapshot();
  });
});
