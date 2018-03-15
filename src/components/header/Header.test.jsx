import React from 'react';
import { shallow, configure } from 'enzyme';
import Header from './Header';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Header Component', () => {
  it('should render a Header component', () => {
    const wrapper = shallow(<Header toggleNavigation={() => { }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
