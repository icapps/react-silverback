import React from 'react';
import { shallow, configure } from 'enzyme';
import Spinner from './Spinner';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('Spinner Component', () => {
  it('should render a Spinner component', () => {
    const wrapper = shallow(
      <Spinner
        className="test"
        spinnerClassName="spinner-test"
      />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Spinner component without a container', () => {
    const wrapper = shallow(
      <Spinner
        hasContainer={false}
      />);
    expect(wrapper).toMatchSnapshot();
  });
});
