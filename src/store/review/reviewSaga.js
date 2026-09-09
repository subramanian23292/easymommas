import { take, race, call, put, cancel, fork, cancelled, join } from 'redux-saga/effects';
import { listFetch, listLoadmore, listSuccess, listCancel, listFailure } from './reviewSlice';
import { reviewListApi } from '../../components/api';

function* getReviews(action) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(reviewListApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            let loadmore = true;
            if (data.data.length < 15) {
                loadmore = false;
            }
            yield put(listSuccess({ prod_id: action.payload.product_id, reviewlist: data.data, loadmore, page: Number(action.payload.page + 1) }));
        } else {
            yield put(listFailure(data.msg));
        }
    } catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('review saga cancelled');
        }
    }
}

function* watchReview() {
    while (true) {
        const action = yield take([listFetch.type, listLoadmore.type]);
        const task = yield fork(getReviews, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(listCancel.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

export default function* reviewSaga() {
    yield fork(watchReview);
}
