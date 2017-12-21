import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.dispatch(addExpense({
  description: 'Water bill',
  amount: 4000,
  createdAt: 0
}));

store.dispatch(addExpense({
  description: 'Gas bill',
  amount: 4300,
  createdAt: 0
}));

store.subscribe(() => {
  const state = store.getState();

  console.log(getVisibleExpenses(state.expenses, state.filters));
});

store.dispatch(setTextFilter('bill'));

store.dispatch(setTextFilter('water'));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));