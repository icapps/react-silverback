import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BasicInput, Checkbox, Dropdown } from '../components';
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
