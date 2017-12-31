import moment from 'moment';

import filtersReducer from './filters';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });

  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });

  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  };
  
  const action = { type: 'SORT_BY_DATE' };
  
  const state = filtersReducer(currentState, action);

  expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
  const text = 'something';
  const action = {
    type: 'SET_TEXT_FILTER',
    text
  };

  expect(
    filtersReducer(undefined, action).text
  ).toBe(text);
});

test('should set startDate filter', () => {
  const date = moment(0);
  const action = {
    type: 'SET_START_DATE',
    date
  };

  expect(
    filtersReducer(undefined, action).startDate
  ).toEqual(date);
});

test('should set endDate filter', () => {
  const date = moment(0);
  const action = {
    type: 'SET_END_DATE',
    date
  };

  expect(
    filtersReducer(undefined, action).endDate
  ).toEqual(date);
});