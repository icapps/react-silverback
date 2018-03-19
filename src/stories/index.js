import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BasicInput, Checkbox, Dropdown, Table, Button, Modal } from '../components';
import 'bootstrap/dist/css/bootstrap.css';

storiesOf('BasicInput', module)
  .add('default', () => (
    <BasicInput id="test" label="Text" value="test" handleChange={action('handle TextInput')} />
  ))
  .add('placeholder', () => (
    <BasicInput id="test" label="Text with placeholder" placeholder="placeholder" value="" handleChange={action('handle TextInput')} />
  ))
  .add('type: password', () => (
    <BasicInput id="test" label="Password" value="password" handleChange={action('handle TextInput')} type="password" />
  ))
  .add('type: number', () => (
    <BasicInput id="test" label="Number" value={123} handleChange={action('handle TextInput')} type="number" />
  ));

storiesOf('Checkbox', module)
  .add('true', () => (
    <Checkbox id="test" text="This is a checkbox" value={true} handleChange={action('handle Checkbox')} />
  ))
  .add('false', () => (
    <Checkbox id="test" text="This is a checkbox" value={false} handleChange={action('handle Checkbox')} />
  ));

storiesOf('Dropdown', module)
  .add('dropdown', () => (
    <Dropdown id="test" label="This is a dropdown" value="test" handleChange={action('handle Dropdown')} options={['test', 'test2', 'test3']} />
  ));

storiesOf('Table', module)
  .add('default', () => (
    <Table
      keys={['key', 'key1', 'key2', 'key3']}
      listItems={[
        { id: 'id1', key: "test 1", key1: 1, key2: false, key3: new Date() },
        { id: 'id2', key: "test 2", key1: 2, key2: true, key3: new Date() },
        { id: 'id3', key: "test 3", key1: 3, key2: true, key3: new Date() },
        { id: 'id4', key: "test 4", key2: false },
        { id: 'id5', key: "test 5", key1: 4, key2: true, key3: new Date() },
      ]}
      handleRowClick={action('handle Tablerow click')}
      handleRemoveItem={action('handle remove item')}
      handleSort={action('handle sort')}
    />
  ))
  .add('custom date format', () => (
    <Table
      keys={['key', 'key1', 'key2', 'key3']}
      listItems={
        [
          { id: 'id1', key: "test 1", key1: 1, key2: false, key3: new Date() },
          { id: 'id2', key: "test 2", key1: 2, key2: true, key3: new Date() },
          { id: 'id3', key: "test 3", key1: 3, key2: true, key3: new Date() },
          { id: 'id4', key: "test 4", key2: false },
          { id: 'id5', key: "test 5", key1: 4, key2: true, key3: new Date() },
        ]}
      dateFormat="MM/DD/YYYY"
      handleRowClick={action('handle Tablerow click')}
      handleRemoveItem={action('handle remove item')}
      handleSort={action('handle sort')}
    />
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
