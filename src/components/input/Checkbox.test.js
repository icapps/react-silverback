import React from 'react';
import { shallow, configure } from 'enzyme';
import Checkbox from './Checkbox';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('BasicInput Component', () => {
  it('should render a BasicInput component', () => {
    const wrapper = shallow(<Checkbox id="test" text="This is a checkbox" value={true} handleChange={() => { }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
