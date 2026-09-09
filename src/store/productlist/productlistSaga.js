import { take,cancel, race, fork, call, put, cancelled, join } from 'redux-saga/effects';
import { listFetch, listLoadmore, listSuccess, listFailure, listCancel } from './productlistSlice';
import { productlistApi } from '../../components/api';

function* productFetch(action) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(productlistApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            let loadmore = true;
            if (data.data.length < 10) {
                loadmore = false;
            }
            yield put(listSuccess({ cat_id: action.payload.category_id, productlist: data.data, loadmore, page: Number(action.payload.page + 1) }));
        } else {
            yield put(listFailure(data.msg));
        }
    }
    catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('productlist fetch saga cancelled');
        }
    }
}

function* watchProductfetch() {
    while (true) {
        const action = yield take([listFetch.type, listLoadmore.type]);
        const task = yield fork(productFetch, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(listCancel.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

export default function* productlistSaga() {
    yield fork(watchProductfetch);
}
