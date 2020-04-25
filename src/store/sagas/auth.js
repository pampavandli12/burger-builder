import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1L7-zd8mr1jbSIu3XbGobgW1VpoNGP6k';
  if (!action.isSignup) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1L7-zd8mr1jbSIu3XbGobgW1VpoNGP6k';
  }
  try {
    const response = yield axios.post(url, authData);
    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', response.data.localId);
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
  } catch (error) {
    yield put(actions.authFail(error));
  }
}

export function* authCheckStateSaga(action) {
  const token = localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  }
  const expirationDate = new Date(localStorage.getItem('expirationDate'));
  if (expirationDate > new Date()) {
    const userId = localStorage.getItem('userId');
    yield put(actions.authSuccess(token, userId));
    yield put(
      actions.checkAuthTimeout(
        (expirationDate.getTime() - new Date().getTime()) / 1000
      )
    );
  } else {
    yield put(actions.logout());
  }
}
