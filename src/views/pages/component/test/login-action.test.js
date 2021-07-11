import * as actions from '../../../../core/login_signup/action/loginSignupAction';
import { ActionTypes } from '../../../../core/login_signup/action/loginSignupActionTypes';

test('should setup set change action object', () => {
  const state = 1;
  const action = actions.setChange(state);
  expect(action).toEqual({
    type: ActionTypes.SET_CHANGE,
    payload: { change: state },
  });
});

test('should setup set alert m action object', () => {
  const state = 1;
  const action = actions.setAlertM(state);
  expect(action).toEqual({
    type: ActionTypes.SET_ALERTM,
    payload: { alertM: state },
  });
});

test('should setup set alert s action object', () => {
  const state = 1;
  const action = actions.setAlertS(state);
  expect(action).toEqual({
    type: ActionTypes.SET_ALERTS,
    payload: { alertS: state },
  });
});

test('should setup set login state action object', () => {
  const success = 1;
  const action = actions.setLoginState(success);
  expect(action).toEqual({
    type: ActionTypes.SET_LOGIN_STATE,
    payload: { success },
  });
});
