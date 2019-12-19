import React from 'react';
import { render } from '@testing-library/react';
import { format } from 'date-fns';
import { build, fake } from 'test-data-bot';
import '@testing-library/jest-dom/extend-expect';

import Table from './Table';

const tableDataBuilder = build('TableData').fields({
  id: fake(f => f.random.uuid()),
  words: fake(f => f.random.word()),
  numbers: fake(f => f.random.number()),
  bools: fake(f => f.random.boolean()),
  dates: fake(f => f.date.recent()),
  paragraphs: fake(f => f.lorem.paragraphs()),
});

describe('Table Component', () => {
  const fakeData = tableDataBuilder();

  it('should render a Table component', () => {
    const { getByText, getByAltText } = render(
      <Table
        keys={Object.keys(fakeData).map(key => ({ id: key, value: key, isSortable: true }))}
        listItems={[fakeData]}
        handleRowClick={() => {}}
        handleRemoveItem={() => {}}
        handleSort={() => {}}
      />,
    );
    expect(getByText(fakeData.words)).toBeInTheDocument();
    expect(getByText(`${fakeData.numbers}`)).toBeInTheDocument();
    expect(getByAltText(`${fakeData.bools}`)).toBeInTheDocument();
    expect(getByText(format(fakeData.dates, 'DD/MM/YYYY'))).toBeInTheDocument();
  });

  it('should render a Table component with custom Date format', () => {
    const dateFormat = 'dddd D MMM';

    const { getByText } = render(
      <Table
        keys={Object.keys(fakeData).map(key => ({ id: key, value: key, isSortable: true }))}
        listItems={[fakeData]}
        dateFormat={dateFormat}
        handleRowClick={() => {}}
        handleRemoveItem={() => {}}
        handleSort={() => {}}
      />,
    );
    expect(getByText(format(fakeData.dates, dateFormat))).toBeInTheDocument();
  });

  it.skip('should render a Table component with custom maximum text length', () => {
    const maxLength = 30;
    const { getByText } = render(
      <Table
        keys={Object.keys(fakeData).map(key => ({ id: key, value: key, isSortable: true }))}
        listItems={[fakeData]}
        handleRowClick={() => {}}
        handleRemoveItem={() => {}}
        handleSort={() => {}}
        maxTextLength={maxLength}
      />,
    );
    expect(getByText(fakeData.paragraphs.substring(0, maxLength))).toBeInTheDocument();
  });
});
