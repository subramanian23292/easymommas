import { all, take,cancel, race, fork, call, put, cancelled, join } from 'redux-saga/effects';
import { orderFetch, orderSuccess, orderFailure, orderCancel, submitReview, reviewSuccess, reviewFailure, reviewCancel } from './orderSlice';
import { orderApi, reviewSubmitApi } from '../../components/api';
import * as RootNavigation from '../../components/RootNavigation';

function* getOrderData(action) {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = yield call(orderApi, action.payload, signal);
    const data = response.data;
    if (Number(data.status) === 1) {
        yield put(orderSuccess(data.orderinfo));
    } else {
        yield put(orderFailure(data.msg));
    }
  }
   catch (error) {
    console.log(error, 'catch error');
  } finally {
    if (yield cancelled()) {
      controller.abort();
      console.log('orderlist fetch saga cancelled');
    }
  }
}

function* watchOrderDetail() {
  while (true) {
    const action = yield take(orderFetch.type);
    const task = yield fork(getOrderData, action);

    const result = yield race({
        completed: join(task),
        cancelled: take(orderCancel.type),
    });

    if (result.cancelled) {
        yield cancel(task);
    }
  }
}

function* reviewSubmit(action) {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = yield call(reviewSubmitApi, action.payload, signal);
    const data = response.data;
    if (Number(data.status) === 1) {
        yield put(reviewSuccess({ msg: data.msg, oid: action.payload.ordid, pid: action.payload.prodid, rating: action.payload.rating }));
        RootNavigation.back();
    } else {
        yield put(reviewFailure(data.msg));
    }
  }
   catch (error) {
    console.log(error, 'catch error');
  } finally {
    if (yield cancelled()) {
      controller.abort();
      console.log('review submit saga cancelled');
    }
  }
}

function* watchSubmitReview() {
  while (true) {
    const action = yield take(submitReview.type);
    const task = yield fork(reviewSubmit, action);

    const result = yield race({
      completed: join(task),
      cancelled: take(reviewCancel.type),
    });

    if (result.cancelled) {
      yield cancel(task);
    }
  }
}

export default function* orderSaga() {
  yield all([
    fork(watchOrderDetail),
    fork(watchSubmitReview),
  ]);
}
