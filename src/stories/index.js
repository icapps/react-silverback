import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BasicInput, Checkbox, Dropdown, Table, Button, Modal, Pagination, Overview } from '../components';
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
  ))
  .add('error', () => (
    <BasicInput id="test" label="Text with error" value="test" handleChange={action('handle TextInput')} isValid={false} errorMessage="Input has an error" />
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

storiesOf('Table', module)
  .add('default', () => (
    <Table
      keys={[
        { id: 'key', value: 'key', isSortable: true },
        { id: 'key1', value: 'key1', isSortable: false },
        { id: 'key2', value: 'key2', isSortable: true },
        { id: 'key3', value: 'key3', isSortable: false },
      ]}
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
      keys={[
        { id: 'key', value: 'key', isSortable: true },
        { id: 'key1', value: 'key1', isSortable: false },
        { id: 'key2', value: 'key2', isSortable: true },
        { id: 'key3', value: 'key3', isSortable: false },
      ]}
      listItems={
        [
          { id: 'id1', key: "test 1", key1: 1, key2: false, key3: new Date() },
          { id: 'id2', key: "test 2", key1: 2, key2: true, key3: new Date() },
          { id: 'id3', key: "test 3", key1: 3, key2: true, key3: new Date() },
          { id: 'id4', key: "test 4", key2: false },
          { id: 'id5', key: "test 5", key1: 4, key2: true, key3: new Date() },
        ]}
      dateFormat="dddd D MMMM"
      handleRowClick={action('handle Tablerow click')}
      handleRemoveItem={action('handle remove item')}
      handleSort={action('handle sort')}
    />
  ))
  .add('maximum text length', () => (
    <Table
      keys={[
        { id: 'key', value: 'key', isSortable: true },
        { id: 'key1', value: 'key1', isSortable: false },
        { id: 'key2', value: 'key2', isSortable: true },
        { id: 'key3', value: 'key3', isSortable: false },
      ]}
      listItems={
        [
          { id: 'id1', key: "test 1", key1: 1, key2: false, key3: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet nisl ac nibh aliquet, id placerat massa bibendum. Ut erat mauris, pulvinar vestibulum augue sollicitudin, rutrum eleifend leo. Proin malesuada nisl nec ornare fringilla. Nam vel rutrum mi. Etiam porta tempus blandit. Nunc et odio rhoncus, eleifend nisi ac, tempus urna. Pellentesque justo tellus, cursus id mi molestie, condimentum mattis ante. Sed suscipit nibh libero, at tincidunt enim pulvinar nec. Fusce sit amet leo vitae quam rutrum mattis eu a leo. Sed et nisl sit amet ipsum eleifend dignissim a sit amet metus. Nullam porta eros eget dolor ornare, vitae porttitor diam vehicula. Cras vel augue vestibulum, pellentesque nulla sed, blandit dui. Vivamus eu urna a tortor tempor elementum sed eu nibh. In id pellentesque eros.' },
          { id: 'id2', key: "test 2", key1: 2, key2: true },
          { id: 'id3', key: "test 3", key1: 3, key2: true, key3: 'Vestibulum ultricies eleifend accumsan. Aliquam quam lectus, finibus in risus fringilla, suscipit congue dolor. Praesent et massa lacus. Etiam rutrum mi nunc, in placerat justo tempus eget. Nulla at consectetur purus. Ut justo orci, dictum ac mauris vitae, faucibus viverra risus. Donec lobortis, dui dignissim mattis fringilla, felis massa dapibus quam, a fringilla erat nulla non diam. Curabitur aliquet dignissim pellentesque. Nunc ut enim mattis purus mollis fermentum. Donec consequat mi et consequat posuere. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut tempor ipsum.' },
          { id: 'id4', key: "test 4", key2: false },
        ]}
      handleRowClick={action('handle Tablerow click')}
      handleRemoveItem={action('handle remove item')}
      handleSort={action('handle sort')}
    />
  ));

storiesOf('Pagination', module)
  .add('default', () => (
    <Pagination pageCount={5} handleClick={action('handle Pagination')} />
  ));

storiesOf('Overview', module)
  .add('default', () => (
    <Overview
      title="DataTypes"
      keys={[
        { id: 'key', value: 'key', isSortable: true },
        { id: 'key1', value: 'key1', isSortable: false },
        { id: 'key2', value: 'key2', isSortable: true },
        { id: 'key3', value: 'key3', isSortable: false },
      ]}
      listItems={[
        { id: 'id1', key: "test 1", key1: 1, key2: false, key3: new Date() },
        { id: 'id2', key: "test 2", key1: 2, key2: true, key3: new Date() },
        { id: 'id3', key: "test 3", key1: 3, key2: true, key3: new Date() },
        { id: 'id4', key: "test 4", key2: false },
        { id: 'id5', key: "test 5", key1: 4, key2: true, key3: new Date() },
      ]}
      removeItem={() => { }}
      sortItems={() => { }}
      history={{}}
    />
  ))
  .add('empty state', () => (
    <Overview
      title="DataTypes"
      keys={[
        { id: 'key', value: 'key', isSortable: true },
        { id: 'key1', value: 'key1', isSortable: false },
        { id: 'key2', value: 'key2', isSortable: true },
        { id: 'key3', value: 'key3', isSortable: false },
      ]}
      listItems={[]}
      removeItem={() => { }}
      sortItems={() => { }}
      history={{}}
    />
  ));
