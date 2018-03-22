import React from 'react';
import { shallow, configure } from 'enzyme';
import Overview from './Overview';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Overview Component', () => {
  it('should render an Overview component', () => {
    const wrapper = shallow(<Overview
      title="DataTypes"
      keys={[{ id: 'id', value: 'id', isSortable: true }, { id: 'type', value: 'type', isSortable: true }, { id: 'price', value: 'price', isSortable: false }]}
      listItems={[{ id: '1', type: 'B', price: 88.9 }, { id: '2', type: 'C', price: 45.2 }, { id: '1', type: 'D', price: 56.5 }]}
      removeItem={() => { }}
      sortItems={() => { }}
      history={{}}
      paginationConfig={{ pageLimit: 10, totalCount: 100 }}
    />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render an Overview component with custom date format', () => {
    const wrapper = shallow(<Overview
      title="DataTypes"
      keys={[{ id: 'id', value: 'id', isSortable: true }, { id: 'type', value: 'type', isSortable: true }, { id: 'date', value: 'date', isSortable: false }]}
      listItems={[{ id: '1', type: 'B', date: new Date(Date.UTC(1995, 4, 23)) }, { id: '2', type: 'C', date: new Date(Date.UTC(1995, 4, 23)) }, { id: '1', type: 'D', date: new Date(Date.UTC(1995, 4, 23)) }]}
      removeItem={() => { }}
      sortItems={() => { }}
      history={{}}
      paginationConfig={{ pageLimit: 10, totalCount: 100 }}
    />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render an Overview component with no listItems', () => {
    const wrapper = shallow(<Overview
      title="DataTypes"
      keys={[{ id: 'id', value: 'id', isSortable: true }, { id: 'type', value: 'type', isSortable: true }, { id: 'price', value: 'price', isSortable: false }]}
      listItems={[]}
      removeItem={() => { }}
      sortItems={() => { }}
      history={{}}
      paginationConfig={{ pageLimit: 10, totalCount: 100 }}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
