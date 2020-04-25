import { takeEvery, all } from 'redux-saga/effects';
import { logoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { getIngridientsSaga } from './burgerBuilder';
import * as actionTypes from '../actions/actionTypes';
import { purchaseBurgerSaga, fetchOrdersSaga } from './orders';

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.CHECK_AUTH_STATE, authCheckStateSaga),
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INITIATE_INGREDIENTS, getIngridientsSaga);
}

export function* watchOrders() {
  yield takeEvery(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga);
}
