import expensesReducer from './expenses';

import expenses from '../tests/fixtures/expenses';

test('should set default state', () => {
  expect(
    expensesReducer(undefined, { type: '@@INIT' })
  ).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };

  expect(
    expensesReducer(expenses, action)
  ).toEqual([ expenses[0], expenses[2] ]);
});

test('should NOT remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };

  expect(
    expensesReducer(expenses, action)
  ).toEqual(expenses);
});

test('should add expense', () => {
  const expense =   {
    id: '17',
    description: 'Tacos',
    note: '',
    amount: 1225,
    createdAt: 1230
  };

  const action = {
    type: 'ADD_EXPENSE',
    expense
  };
  
  expect(
    expensesReducer(expenses, action)
  ).toEqual([ ...expenses, expense ]);
});

test('should edit an expense', () => {
  const id = expenses[2].id;
  const note = 'Some new note';
  const action = {
    type: 'EDIT_EXPENSE',
    id,
    updates: { 
      note 
    }
  };

  expect(
    expensesReducer(expenses, action)[2].note
  ).toBe(note);
});

test('should NOT edit an expense if expense not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      note: 'Some new note'
    }
  };

  expect(
    expensesReducer(expenses, action)
  ).toEqual(expenses);
});