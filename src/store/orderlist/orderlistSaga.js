import { take,cancel, race, fork, call, put, cancelled, join } from 'redux-saga/effects';
import { listFetch, listSuccess, listFailure, listCancel, listLoadmore } from './orderlistSlice';
import { orderlistApi } from '../../components/api';

function* orderFetch(action) {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = yield call(orderlistApi, action.payload, signal);
    const data = response.data;
    if (Number(data.status) === 1) {
      let loadmore = true;
      if (data.data.length < 14) {
        loadmore = false;
      }
      yield put(listSuccess({ orders: data.data, loadmore, page: Number(action.payload.page + 1) }));
    } else {
      yield put(listFailure(data.msg));
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

function* watchOrderfetch() {
  while (true) {
    const action = yield take([listFetch.type, listLoadmore.type]);
    const task = yield fork(orderFetch, action);

    const result = yield race({
      completed: join(task),
      cancelled: take(listCancel.type),
    });

    if (result.cancelled) {
      yield cancel(task);
    }
  }
}

export default function* orderlistSaga() {
  yield fork(watchOrderfetch);
}
