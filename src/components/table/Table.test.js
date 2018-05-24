import React from 'react';
import { shallow, configure } from 'enzyme';
import Table from './Table';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Table Component', () => {
  it('should render a Table component', () => {
    const wrapper = shallow(
      <Table
        keys={[
          { id: 'key', value: 'key', isSortable: true },
          { id: 'key1', value: 'key1', isSortable: false },
          { id: 'key2', value: 'key2', isSortable: true },
          { id: 'key3', value: 'key3', isSortable: false },
        ]}
        listItems={[
          { id: 'id1', key: "test 1", key1: 1, key2: false, key3: new Date(Date.UTC(1995, 4, 23)) },
          { id: 'id2', key: "test 2", key1: 2, key2: true, key3: new Date(Date.UTC(1995, 4, 23)) },
          { id: 'id3', key: "test 3", key1: 3, key2: true, key3: new Date(Date.UTC(1995, 4, 23)) },
          { id: 'id4', key: "test 4", key2: false },
          { id: 'id5', key: "test 5", key1: 4, key2: true, key3: new Date(Date.UTC(1995, 4, 23)) },
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
        keys={[
          { id: 'key', value: 'key', isSortable: true },
          { id: 'key1', value: 'key1', isSortable: false },
          { id: 'key2', value: 'key2', isSortable: true },
          { id: 'key3', value: 'key3', isSortable: false },
        ]}
        listItems={
          [
            { id: 'id1', key: "test 1", key1: 1, key2: false, key3: new Date(Date.UTC(1995, 4, 23)) },
            { id: 'id2', key: "test 2", key1: 2, key2: true, key3: new Date(Date.UTC(1995, 4, 23)) },
            { id: 'id3', key: "test 3", key1: 3, key2: true, key3: new Date(Date.UTC(1995, 4, 23)) },
            { id: 'id4', key: "test 4", key2: false },
            { id: 'id5', key: "test 5", key1: 4, key2: true, key3: new Date(Date.UTC(1995, 4, 23)) },
          ]}
        dateFormat="dddd D MMM"
        handleRowClick={() => { }}
        handleRemoveItem={() => { }}
        handleSort={() => { }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a Table component with custom maximum text length', () => {
    const wrapper = shallow(
      <Table
        keys={[
          { id: 'key', value: 'key', isSortable: true },
          { id: 'key1', value: 'key1', isSortable: false },
          { id: 'key2', value: 'key2', isSortable: true },
          { id: 'key3', value: 'key3', isSortable: false },
        ]}
        listItems={
          [
            { id: 'id1', key: "test 1", key1: 1, key2: false, key3: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet nisl ac nibh aliquet, id placerat massa bibendum. Ut erat mauris, pulvinar vestibulum augue sollicitudin, rutrum eleifend leo. Proin malesuada nisl nec ornare fringilla. Nam vel rutrum mi. Etiam porta tempus blandit. Nunc et odio rhoncus, eleifend nisi ac, tempus urna. Pellentesque justo tellus, cursus id mi molestie, condimentum mattis ante. Sed suscipit nibh libero, at tincidunt enim pulvinar nec. Fusce sit amet leo vitae quam rutrum mattis eu a leo. Sed et nisl sit amet ipsum eleifend dignissim a sit amet metus. Nullam porta eros eget dolor ornare, vitae porttitor diam vehicula. Cras vel augue vestibulum, pellentesque nulla sed, blandit dui. Vivamus eu urna a tortor tempor elementum sed eu nibh. In id pellentesque eros.            ' },
            { id: 'id2', key: "test 2", key1: 2, key2: true },
          ]}
        dateFormat="dddd D MMM"
        handleRowClick={() => { }}
        handleRemoveItem={() => { }}
        handleSort={() => { }}
        maxTextLength={30}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a Table component with (un)deprecate', () => {
    const wrapper = shallow(
      <Table
        keys={[
          { id: 'key', value: 'key', isSortable: true },
          { id: 'key1', value: 'key1', isSortable: false },
          { id: 'key2', value: 'key2', isSortable: true },
          { id: 'key3', value: 'key3', isSortable: false },
        ]}
        listItems={
          [
            { id: 'id1', key: "test 1", key1: 1, key2: false, key3: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet nisl ac nibh aliquet, id placerat massa bibendum. Ut erat mauris, pulvinar vestibulum augue sollicitudin, rutrum eleifend leo. Proin malesuada nisl nec ornare fringilla. Nam vel rutrum mi. Etiam porta tempus blandit. Nunc et odio rhoncus, eleifend nisi ac, tempus urna. Pellentesque justo tellus, cursus id mi molestie, condimentum mattis ante. Sed suscipit nibh libero, at tincidunt enim pulvinar nec. Fusce sit amet leo vitae quam rutrum mattis eu a leo. Sed et nisl sit amet ipsum eleifend dignissim a sit amet metus. Nullam porta eros eget dolor ornare, vitae porttitor diam vehicula. Cras vel augue vestibulum, pellentesque nulla sed, blandit dui. Vivamus eu urna a tortor tempor elementum sed eu nibh. In id pellentesque eros.            ' },
            { id: 'id2', key: "test 2", key1: 2, key2: true },
          ]}
        handleRowClick={() => { }}
        handleRemoveItem={() => { }}
        handleSort={() => { }}
        maxTextLength={30}
        deprecate={() => { }}
        undeprecate={() => { }}
        isdeprecated={true}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
