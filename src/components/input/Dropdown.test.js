import React from 'react';
import { shallow, configure } from 'enzyme';
import Dropdown from './Dropdown';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Dropdown Component', () => {
  it('should render a Dropdown component', () => {
    const wrapper = shallow(<Dropdown id="test" label="This is a dropdown" value="test" handleChange={()=>{}} options={['test', 'test2', 'test3']} />);
    expect(wrapper).toMatchSnapshot();
  });
});
