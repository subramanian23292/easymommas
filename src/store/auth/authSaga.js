import { take,cancel, race, fork, all, call, put, cancelled, join } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginCheck, loginSuccess, loginFailure, logOut, logoutInit, loginCancel } from './authSlice';
import { setCart } from '../cart/cartSlice';
import { loginApi, logoutApi } from '../../components/api';
import * as RootNavigation from '../../components/RootNavigation';

function* checkLogin(action) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(loginApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            yield all([
                AsyncStorage.setItem('@cusId', JSON.stringify(data.cus_id)),
                put(loginSuccess(data.cus_id)),
                put(setCart(data.cartproduct)),
            ]);
            RootNavigation.back();
        } else {
            yield put(loginFailure(data.msg));
        }
    }
    catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('login saga cancelled');
        }
    }
}

function* signOut(action) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(logoutApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            yield all([
                AsyncStorage.clear(),
                put(logOut()),
            ]);
        } else {
            yield put(loginFailure(data.msg));
        }
    }
    catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('signout saga cancelled');
        }
    }
}

function* watchLogin() {
    while (true) {
        const action = yield take(loginCheck.type);
        const task = yield fork(checkLogin, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(loginCancel.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

function* watchLogout() {
    while (true) {
        const action = yield take(logoutInit.type);
        const task = yield fork(signOut, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(loginCancel.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

export default function* authSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
    ]);
}
