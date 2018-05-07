import React from 'react';
import { shallow, configure } from 'enzyme';
import Pagination from './Pagination';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Pagination Component', () => {
  it('should render a Pagination component', () => {
    const wrapper = shallow(
      <Pagination
        totalCount={20}
        handleClick={() => { }}
        activePage={3}
        pageLimit={10}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Pagination component when it is the first page', () => {
    const wrapper = shallow(
      <Pagination
        totalCount={20}
        handleClick={() => { }}
        activePage={0}
        pageLimit={10}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Pagination component when it is the last page', () => {
    const wrapper = shallow(
      <Pagination
        totalCount={20}
        handleClick={() => { }}
        activePage={1}
        pageLimit={10}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Pagination component when there is only 1 page', () => {
    const wrapper = shallow(
      <Pagination
        totalCount={10}
        handleClick={() => { }}
        activePage={0}
        pageLimit={10}
      />);
    expect(wrapper).toMatchSnapshot();
  });
});
