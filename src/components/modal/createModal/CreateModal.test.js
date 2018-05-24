import React from 'react';
import { shallow, configure } from 'enzyme';
import CreateModal from './CreateModal';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('CreateModal Component', () => {
  it('should render a CreateModal component', () => {
    const wrapper = shallow(
      <CreateModal
        primaryButtonText="test"
        title="test"
        createParameters={[
          { id: 'email', label: 'email', type: "text" },
          { id: 'bool', label: 'bool', type: "boolean" },
          { id: 'password', label: 'password', type: "password" },
        ]}
        create={() => { }}
        isPending={false}
        isError={false}
        errorMessage=""
      />
    );
    wrapper.find('#modal-email').simulate('change', { target: { value: 'test' } });
    wrapper.find('#userHasToSetPassword').simulate('change');
    expect(wrapper).toMatchSnapshot();
  });
});
