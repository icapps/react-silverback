import React from 'react';
import { shallow, configure } from 'enzyme';
import Navbar from './NavBar';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Navbar Component', () => {
  it('should render a Navbar component', () => {
    const wrapper = shallow(
    <Navbar
    links={[
      { name: 'test1', path: '/test1' },
      { name: 'test2', path: '/test2' },
    ]}
    toggleNavigation={() => { }}
    isNavigationShown={true}
    build="V1"
    version="1.0.0"
    />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a Navbar component with navigation shown', () => {
    const wrapper = shallow(
    <Navbar
    links={[
      { name: 'test1', path: '/test1' },
      { name: 'test2', path: '/test2' },
    ]}
    toggleNavigation={() => { }}
    isNavigationShown
    build="V1"
    version="1.0.0"
    />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a hidden Navbar component', () => {
    const wrapper = shallow(
    <Navbar
    links={[
      { name: 'test1', path: '/test1' },
      { name: 'test2', path: '/test2' },
    ]}
    toggleNavigation={() => { }}
    isNavigationShown={false}
    build="V1"
    version="1.0.0"
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
