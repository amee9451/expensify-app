import configureMockStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';

import database from '../firebase/firebase';
import { 
  startAddExpense, 
  addExpense, 
  editExpense, 
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses 
} from './expenses';

import expenses from '../tests/fixtures/expenses';

const uid = 'thisismytestuid';
const defaultAuthState = {
  auth: { uid },
  expenses 
}
const createMockStore = configureMockStore([ReduxThunk]);

beforeEach((done) => {
  const expensesData = {};
  
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = {
      description,
      note,
      amount,
      createdAt
    };
  });

  database.ref(`users/${uid}/expenses`).set(expensesData)
    .then(() => done());
});

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should remove expense from database and notify store', (done) => {
  const store = createMockStore(defaultAuthState);

  store.dispatch(startRemoveExpense(expenses[1]))
    .then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
      });

      return database.ref(`users/${uid}/expenses/${expenses[1].id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeNull();
      done();
    });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123456', { note: 'New note value' });

  expect(action).toEqual({
    id: '123456',
    type: 'EDIT_EXPENSE',
    updates: {
      note: 'New note value'
    }
  });
});

test('should edit expense in database and notify store', (done) => {
  const store = createMockStore(defaultAuthState);
  const updates = {
    description: 'new description here',
    amount: 30242,
    createdAt: 209283,
    note: 'my test note'
  };
  const expense = expenses[0];
  const { id, description, amount, createdAt, note } = expense;

  store.dispatch(startEditExpense(id, updates))
    .then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
      });

      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual({
        description,
        amount,
        createdAt,
        note,
        ...updates
      });
      
      done();
    })
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const defaultExpenseData = {
    description: '', 
    note: '', 
    amount: 0, 
    createdAt: 0 
  };

  store.dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...defaultExpenseData
        }
      });

      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(defaultExpenseData);
      done();
    });
});

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);

  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);

  store.dispatch(startSetExpenses())
    .then(() => {
      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: 'SET_EXPENSES',
        expenses
      });

      done();
    })
});