import React from 'react';
import { shallow, configure } from 'enzyme';
import Dropdown from './Dropdown';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Dropdown Component', () => {
  it('should render a Dropdown component', () => {
    const wrapper = shallow(<Dropdown id="test" label="This is a dropdown" value="test" handleChange={() => { }} options={[{ key: 'test', text: 'test' }, { key: 'test2', text: 'test2' }, { key: 'test3', text: 'test3' }]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
