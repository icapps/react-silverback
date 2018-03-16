import React from 'react';
import { shallow, configure } from 'enzyme';
import Navbar from './Navbar';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Navbar Component', () => {
  it('should render a Navbar component', () => {
    const wrapper = shallow(<Navbar links={[
      { name: 'test1', path: '/test1' },
      { name: 'test2', path: '/test2' },
    ]} toggleNavigation={() => { }} isNavigationShown={true} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a Navbar component with navigation shown', () => {
    const wrapper = shallow(<Navbar links={[
      { name: 'test1', path: '/test1' },
      { name: 'test2', path: '/test2' },
    ]} toggleNavigation={() => { }} isNavigationShown />);
    expect(wrapper).toMatchSnapshot();
  });
});
