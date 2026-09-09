import { take, race, call, put, cancel, fork, cancelled, join } from 'redux-saga/effects';
import { initChangepass, successChangepass, errorChangepass, cancelChangepass } from './changepassSlice';
import { changepasswordApi } from '../../components/api';
import * as RootNavigation from '../../components/RootNavigation';

function* updatePassword(action) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(changepasswordApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            yield put(successChangepass(data.msg));
            RootNavigation.back();
        } else {
            yield put(errorChangepass(data.msg));
        }
    } catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('change pass saga cancelled');
        }
    }
}

function* watchChangepass() {
    while (true) {
        const action = yield take(initChangepass.type);
        const task = yield fork(updatePassword, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(cancelChangepass.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

export default function* changepassSaga() {
    yield fork(watchChangepass);
}
