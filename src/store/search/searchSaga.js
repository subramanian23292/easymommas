import { take,cancel, race, fork, all, call, put, cancelled, join } from 'redux-saga/effects';
import { searchFetch, searchSuccess, searchFailure, searchCancel, searchNoresult } from './searchSlice';
import { searchApi } from '../../components/api';

function createAbortSignal() {
    const controller = new AbortController();
    return { signal: controller.signal, controller };
}

function* fetchSearch(action) {
    const { signal, controller } = createAbortSignal();

    try {
        const response = yield call(searchApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            yield put(searchSuccess(data.searchdata));
        } else if (Number(data.status) === 2) {
            yield put(searchNoresult(data.msg));
        } else {
            yield put(searchFailure('Error try again.'));
        }
    }
    catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('search fetch saga cancelled');
        }
    }
}

function* watchFetch() {
    while (true) {
        const action = yield take(searchFetch.type);
        const task = yield fork(fetchSearch, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(searchCancel.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

export default function* searchSaga() {
    yield all([
        fork(watchFetch),
    ]);
}
