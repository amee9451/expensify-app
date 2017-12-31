import React from 'react';
import { shallow } from 'enzyme';

import { EditExpensePage } from './EditExpensePage';
import ExpenseForm from './ExpenseForm';

import expenses from '../tests/fixtures/expenses';

let editExpense, removeExpense, expense, history, wrapper;
beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  expense = expenses[0];
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage 
      editExpense={editExpense}
      removeExpense={removeExpense}
      history={history}
      expense={expense}
    />
  );
});

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  wrapper.find(ExpenseForm).prop('onSubmit')(expense);

  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense);
});

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click');

  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(removeExpense).toHaveBeenLastCalledWith({ id: expense.id });
});