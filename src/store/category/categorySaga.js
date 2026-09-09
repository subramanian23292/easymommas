import { take, race, call, put, cancel, fork, cancelled, join } from 'redux-saga/effects';
import { catFetch, catSuccess, catError, catCancel } from './categorySlice';
import { categoryApi } from '../../components/api';

function* getCategory() {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(categoryApi, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            yield put(catSuccess(data.category));
        } else {
            yield put(catError(data.msg));
        }
    } catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('category saga cancelled');
        }
    }
}

function* watchCategory() {
    while (true) {
        yield take(catFetch.type);
        const task = yield fork(getCategory);

        const result = yield race({
            completed: join(task),
            cancelled: take(catCancel.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

export default function* categorySaga() {
    yield fork(watchCategory);
}
