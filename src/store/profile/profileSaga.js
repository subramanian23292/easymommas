import { take, race, call, put, cancelled, fork, cancel, all, join } from 'redux-saga/effects';
import {
    profileUpdate,
    profileFetch,
    profileSuccess,
    profileFailure,
    profileCancel,
    profileUpdatesuccess,
} from './profileSlice';
import { profileinfoApi, profileupdateApi } from '../../components/api';
import * as RootNavigation from '../../components/RootNavigation';

function* getProfileinfo(action) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(profileinfoApi, action.payload, signal);
        const data = response.data;

        if (Number(data.status) === 1) {
            yield put(profileSuccess(data.cusinfo));
        } else {
            yield put(profileFailure(data.msg));
        }
    } catch (e) {
        console.log('Profile fetch error:', e);
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('profile fetch saga cancelled');
        }
    }
}

function* updateProfileinfo(action) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(profileupdateApi, action.payload, signal);
        const data = response.data;

        if (Number(data.status) === 1) {
            yield put(profileUpdatesuccess({ cusinfo: data.cusinfo, msg: data.msg }));
            RootNavigation.back();
        } else {
            yield put(profileFailure(data.msg));
        }
    } catch (e) {
        console.log('Profile update error:', e);
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('profile update saga cancelled');
        }
    }
}

function* watchProfileFetch() {
    while (true) {
        const action = yield take(profileFetch.type);
        const task = yield fork(getProfileinfo, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(profileCancel.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

function* watchProfileUpdate() {
    while (true) {
        const action = yield take(profileUpdate.type);
        const task = yield fork(updateProfileinfo, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(profileCancel.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

export default function* profileSaga() {
    yield all([
        fork(watchProfileFetch),
        fork(watchProfileUpdate),
    ]);
}
