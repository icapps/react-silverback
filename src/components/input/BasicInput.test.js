import React from 'react';
import { shallow, configure } from 'enzyme';
import BasicInput from './BasicInput';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('BasicInput Component', () => {
  it('should render a BasicInput component', () => {
    const wrapper = shallow(<BasicInput id="test" label="Text" value="test" handleChange={() => { }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a BasicInput component with a placeholder', () => {
    const wrapper = shallow(<BasicInput id="test" label="Text with placeholder" placeholder="placeholder" value="" handleChange={() => { }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a BasicInput component with a type of password', () => {
    const wrapper = shallow(<BasicInput id="test" label="Password" value="password" handleChange={() => { }} type="password" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a BasicInput component with a type of number', () => {
    const wrapper = shallow(<BasicInput id="test" label="Number" value={123} handleChange={() => { }} type="number" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a BasicInput component with error handling', () => {
    const wrapper = shallow(<BasicInput id="test" label="Text with errorhandling" value="test" handleChange={() => { }} isValid={false} errorMessage="This is an error message" />);
    expect(wrapper).toMatchSnapshot();
  });
});
