import React from 'react';
import { shallow, configure } from 'enzyme';
import Filter from './Filter';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Filter Component', () => {
  it('should render a Filter component', () => {
    const wrapper = shallow(<Filter handleFilter={() => { }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Filter component that can handle change', () => {
    const wrapper = shallow(<Filter handleFilter={() => { }} />);
    wrapper.find('input').simulate('change', { target: { value: 'test' } });
    expect(wrapper).toMatchSnapshot();
  });
});
