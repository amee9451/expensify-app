import { login, logout } from './auth';

test('should setup login action with provided uid', () => {
  const uid = 'somethinglikethis';

  expect(login(uid)).toEqual({
    type: 'LOGIN',
    uid
  });
});

test('should setup logout action', () => {
  expect(logout()).toEqual({
    type: 'LOGOUT'
  });
});