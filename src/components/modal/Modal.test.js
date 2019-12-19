import React from 'react';
import { shallow, configure } from 'enzyme';
import Modal from './Modal';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Modal Component', () => {
  it('should render a Modal component', () => {
    const wrapper = shallow(
      <Modal
        id="testModal"
        modalButtonText="Modal"
        handleSecondaryButton={() => {}}
        secondaryButtonText="Secondary"
        handlePrimaryButton={() => {}}
        primaryButtonText="Primary"
      >
        <p>test</p>
      </Modal>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Modal component with styled buttons', () => {
    const wrapper = shallow(
      <Modal
        id="testModal2"
        modalButtonText="Modal"
        handleSecondaryButton={() => {}}
        secondaryButtonText="Secondary"
        handlePrimaryButton={() => {}}
        primaryButtonText="Primary"
        modalButtonClassName="btn-primary"
        secondaryButtonClassName="btn-secondary"
        primaryButtonClassName="btn-primary"
      >
        <p>test</p>
      </Modal>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Modal component with a header', () => {
    const wrapper = shallow(
      <Modal
        id="testModal3"
        modalButtonText="Modal"
        handleSecondaryButton={() => {}}
        secondaryButtonText="Secondary"
        handlePrimaryButton={() => {}}
        primaryButtonText="Primary"
        hasHeader={true}
        title="Header title"
      >
        <p>test</p>
      </Modal>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
