import selectExpensesTotal from './expenses-total';

import expenses from '../tests/fixtures/expenses';

test('should return 0 if empty expenses array', () => {
  expect(selectExpensesTotal([]))
    .toBe(0);
});

test('should correctly add up a single expense in expenses array', () => {
  expect(selectExpensesTotal([expenses[0]]))
    .toBe(expenses[0].amount);
});

test('should correctly add up multiple expenses in expenses array', () => {
  expect(selectExpensesTotal(expenses))
    .toBe(
      expenses
        .reduce((total, expense) => total + expense.amount, 0)
    );
});