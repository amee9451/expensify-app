import authReducer from './auth';

test('should set uid on login', () => {
  const action = {
    type: 'LOGIN',
    uid: 'abcdef'
  };

  const state = authReducer({}, action);

  expect(state.uid).toBe(action.uid);
});

test('should remove uid on logout', () => {
  const action = {
    type: 'LOGOUT'
  };

  const state = authReducer({ uid: 'someuid' }, action);
  
  expect(state.uid).toBeUndefined();
});