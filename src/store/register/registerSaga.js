import { all, take, call, put, cancelled, cancel, fork, race, join } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerSuccess, registerFailure, registerCancel, registerInit } from './registerSlice';
import { loginSuccess } from '../auth/authSlice';
import { registerApi } from '../../components/api';
import * as RootNavigation from '../../components/RootNavigation';

function* cusRegister(action) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(registerApi, action.payload, signal);
        const data = response.data;
        console.log(data);
        if (Number(data.status) === 1) {
            yield all([
                AsyncStorage.setItem('@cusId', JSON.stringify(data.cus_id)),
                put(registerSuccess()),
                put(loginSuccess(data.cus_id)),
            ]);
            if (action.payload.page === 'Login') {
                RootNavigation.pop(2);
            } else {
                RootNavigation.back();
            }
        } else {
            yield put(registerFailure(data.msg));
        }
    } catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('register saga cancelled');
        }
    }
}

function* watchRegister() {
    while (true) {
        const action = yield take(registerInit.type);
        const task = yield fork(cusRegister, action);

        const result = yield race({
            complete: join(task),
            cancelled: take(registerCancel.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

export default function* registerSaga() {
    yield fork(watchRegister);
}
