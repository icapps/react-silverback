import React from 'react';
import { shallow, configure } from 'enzyme';
import EmptyDetail from './EmptyDetail';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('EmptyDetail Component', () => {
  it('should render a EmptyDetail component', () => {
    const wrapper = shallow(
      <EmptyDetail
        history={{ goBack: () => { } }}
      />);
    expect(wrapper).toMatchSnapshot();
  });
});
