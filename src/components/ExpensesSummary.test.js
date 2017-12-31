import React from 'react';
import { shallow } from 'enzyme';

import { ExpensesSummary } from './ExpensesSummary';

let wrapper;

beforeEach(() => {
  wrapper = shallow(
    <ExpensesSummary expensesCount={0} expensesTotal={0} />
  );
});

test('should render ExpensesSummary correctly with no expenses', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary correctly with one expense', () => {
  wrapper.setProps({
    expensesCount: 1,
    expensesTotal: 9200
  });

  expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary correctly with multiple expenses', () => {
  wrapper.setProps({
    expensesCount: 3,
    expensesTotal: 1200
  });

  expect(wrapper).toMatchSnapshot();
});