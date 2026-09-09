import { take,cancel, race, fork, all, call, put, cancelled, join } from 'redux-saga/effects';
import { fetchAddress, fetchSuccess, errorAddress, cancelAddress, defaultAddress, defaultSuccess, addAddress, addSuccess, deleteAddress, deleteSuccess } from '../address/addressSlice';
import { setOrderaddr, setDeliveryaddr } from '../checkout/checkoutSlice';
import { addressApi } from '../../components/api';
import * as RootNavigation from '../../components/RootNavigation';

function createAbortSignal() {
    const controller = new AbortController();
    return { signal: controller.signal, controller };
}

function* addressDefault(action) {
    const { signal, controller } = createAbortSignal();

    try {
        const response = yield call(addressApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            yield put(defaultSuccess({ msg: data.msg, id: action.payload.addr_id }));
        } else {
            yield put(errorAddress(data.msg));
        }
    }
    catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('address default saga cancelled');
        }
    }
}

function* addressFetch(action) {
    const { signal, controller } = createAbortSignal();

    try {
        const response = yield call(addressApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            yield put(fetchSuccess({ msg: data.msg, addrdata: data.addrdata }));
        } else {
            yield put(errorAddress(data.msg));
        }
    }
    catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('address fetch saga cancelled');
        }
    }
}

function* addressAdd(action) {
    const { signal, controller } = createAbortSignal();

    try {
        const response = yield call(addressApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            yield put(addSuccess({ msg: data.msg, type: data.type, address: data.address }));
            if (action.payload.page === 'Checkout') {
                yield put(setOrderaddr(data.address));
            }
            if (action.payload.updatedeladdr) {
                yield put(setDeliveryaddr(data.address));
            }
            RootNavigation.back();
        } else {
            yield put(errorAddress(data.msg));
        }
    }
    catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('address add saga cancelled');
        }
    }
}

function* addressDelete(action) {
    const { signal, controller } = createAbortSignal();

    try {
        const response = yield call(addressApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            yield put(deleteSuccess({ msg: data.msg, addr_id: action.payload.addr_id }));
        } else {
            yield put(errorAddress(data.msg));
        }
    }
    catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('address delete saga cancelled');
        }
    }
}

function* watchDefault() {
    while (true) {
        const action = yield take(defaultAddress.type);
        const task = yield fork(addressDefault, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(cancelAddress.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

function* watchFetch() {
    while (true) {
        const action = yield take(fetchAddress.type);
        const task = yield fork(addressFetch, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(cancelAddress.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

function* watchAdd() {
    while (true) {
        const action = yield take(addAddress.type);
        const task = yield fork(addressAdd, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(cancelAddress.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

function* watchDelete() {
    while (true) {
        const action = yield take(deleteAddress.type);
        const task = yield fork(addressDelete, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(cancelAddress.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

export default function* addressSaga() {
    yield all([
        fork(watchFetch),
        fork(watchDefault),
        fork(watchAdd),
        fork(watchDelete),
    ]);
}
