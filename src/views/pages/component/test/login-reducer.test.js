import reducer from '../../../../core/login_signup/reducer/loginSignupReducer';
import { ActionTypes } from '../../../../core/login_signup/action/loginSignupActionTypes';

const initialstate = {
  change: false,
  alertM: 'undefined',
  alertS: false,
  logged_in: false,
};

test('should set default state for login', () => {
  const action = {
    type: '@@INIT',
  };
  const state = reducer(undefined, action);
  expect(state).toEqual(initialstate);
});

test('should set change', () => {
  const change = 1;
  const action = {
    type: ActionTypes.SET_CHANGE,
    payload: { change: change },
  };
  const state = authReducer({}, action);
  expect(state).toHaveProperty('change', change);
});

test('should set alert m', () => {
  const alertM = 1;
  const action = {
    type: ActionTypes.SET_ALERTM,
    payload: { alertM: alertM },
  };
  const state = authReducer({}, action);
  expect(state).toHaveProperty('alertM', alertM);
});

test('should set alert s', () => {
  const alertM = 1;
  const action = {
    type: ActionTypes.SET_ALERTS,
    payload: { alertS: alertS },
  };
  const state = authReducer({}, action);
  expect(state).toHaveProperty('alertS', alertS);
});

test('should set login state', () => {
  const login_state = 1;
  const action = {
    type: ActionTypes.SET_LOGIN_STATE,
    payload: { success },
  };
  const state = authReducer({}, action);
  expect(state).toHaveProperty('logged_in', alertS);
});
