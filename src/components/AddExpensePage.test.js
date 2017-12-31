import React from 'react';
import { shallow } from 'enzyme';

import { AddExpensePage } from './AddExpensePage';

import expenses from '../tests/fixtures/expenses';

let addExpense, history, wrapper;
beforeAll(() => {
  addExpense = jest.fn();
  history = { push: jest.fn() };
});
beforeEach(() => {
  wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
});

test('should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);

  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});