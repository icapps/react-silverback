import React from 'react';
import { shallow, configure } from 'enzyme';
import Table from './Table';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Table Component', () => {
  it('should render a Table component', () => {
    const wrapper = shallow(
      <Table
        keys={['key', 'key1', 'key2', 'key3']}
        listItems={[
          { id: 'id1', key: "test 1", key1: 1, key2: false, key3: new Date() },
          { id: 'id2', key: "test 2", key1: 2, key2: true, key3: new Date() },
          { id: 'id3', key: "test 3", key1: 3, key2: true, key3: new Date() },
          { id: 'id4', key: "test 4", key2: false },
          { id: 'id5', key: "test 5", key1: 4, key2: true, key3: new Date() },
        ]}
        handleRowClick={() => { }}
        handleRemoveItem={() => { }}
        handleSort={() => { }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a Table component with custom Date format', () => {
    const wrapper = shallow(
      <Table
        keys={['key', 'key1', 'key2', 'key3']}
        listItems={
          [
            { id: 'id1', key: "test 1", key1: 1, key2: false, key3: new Date() },
            { id: 'id2', key: "test 2", key1: 2, key2: true, key3: new Date() },
            { id: 'id3', key: "test 3", key1: 3, key2: true, key3: new Date() },
            { id: 'id4', key: "test 4", key2: false },
            { id: 'id5', key: "test 5", key1: 4, key2: true, key3: new Date() },
          ]}
        dateFormat="MM/DD/YYYY"
        handleRowClick={() => { }}
        handleRemoveItem={() => { }}
        handleSort={() => { }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
