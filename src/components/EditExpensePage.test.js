import React from 'react';
import { shallow } from 'enzyme';

import { EditExpensePage } from './EditExpensePage';
import ExpenseForm from './ExpenseForm';

import expenses from '../tests/fixtures/expenses';

let startEditExpense, startRemoveExpense, expense, history, wrapper;
beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  expense = expenses[0];
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage 
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expense}
    />
  );
});

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle startEditExpense', () => {
  wrapper.find(ExpenseForm).prop('onSubmit')(expense);

  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startEditExpense).toHaveBeenLastCalledWith(expense.id, expense);
});

test('should handle startRemoveExpense', () => {
  wrapper.find('button').simulate('click');

  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expense.id });
});