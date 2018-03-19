import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BasicInput, Checkbox, Dropdown, Button, Modal } from '../components';
import 'bootstrap/dist/css/bootstrap.css';

storiesOf('BasicInput', module)
  .add('default', () => (
    <BasicInput id="test" label="Text" value="test" handleChange={action('handleTextInput')} />
  ))
  .add('placeholder', () => (
    <BasicInput id="test" label="Text with placeholder" placeholder="placeholder" value="" handleChange={action('handleTextInput')} />
  ))
  .add('type: password', () => (
    <BasicInput id="test" label="Password" value="password" handleChange={action('handleTextInput')} type="password" />
  ))
  .add('type: number', () => (
    <BasicInput id="test" label="Number" value={123} handleChange={action('handleTextInput')} type="number" />
  ));

storiesOf('Checkbox', module)
  .add('true', () => (
    <Checkbox id="test" text="This is a checkbox" value={true} handleChange={action('handleCheckbox')} />
  ))
  .add('false', () => (
    <Checkbox id="test" text="This is a checkbox" value={false} handleChange={action('handleCheckbox')} />
  ));

storiesOf('Dropdown', module)
  .add('dropdown', () => (
    <Dropdown id="test" label="This is a dropdown" value="test" handleChange={action('handleDropdown')} options={['test', 'test2', 'test3']} />
  ));

storiesOf('Button', module)
  .add('default', () => (
    <Button text="Button" handleClick={action('handleButton')} />
  ))
  .add('button with styling', () => (
    <Button text="Button" handleClick={action('handleButton')} className="btn-primary" />
  ));

storiesOf('Modal', module)
  .add('default', () => (
    <Modal
      id="testModal"
      modalButtonText="Modal"
      handleSecondaryButton={action('handleSecondaryButton')}
      secondaryButtonText="Secondary"
      handlePrimaryButton={action('handlePrimaryButton')}
      primaryButtonText="Primary"
    >
      <p>test</p>
    </Modal>
  ))
  .add('Modal with styled buttons', () => (
    <Modal
      id="testModal2"
      modalButtonText="Modal"
      handleSecondaryButton={action('handleSecondaryButton')}
      secondaryButtonText="Secondary"
      handlePrimaryButton={action('handlePrimaryButton')}
      primaryButtonText="Primary"
      modalButtonClassName="btn-primary"
      secondaryButtonClassName="btn-secondary"
      primaryButtonClassName="btn-primary"
    >
      <p>test</p>
    </Modal>
  ))
  .add('Modal with header', () => (
    <Modal
      id="testModal3"
      modalButtonText="Modal"
      handleSecondaryButton={action('handleSecondaryButton')}
      secondaryButtonText="Secondary"
      handlePrimaryButton={action('handlePrimaryButton')}
      primaryButtonText="Primary"
      hasHeader={true}
      title="Header title"
    >
      <p>test</p>
    </Modal>
  ));
