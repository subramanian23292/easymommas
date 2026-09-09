import { take,cancel, race, fork, all, call, put, cancelled, join } from 'redux-saga/effects';
import { cancelCart, errorCart, updateCart, updateSuccess, deleteCart, deleteSuccess, addtoCart, addcartSuccess } from '../cart/cartSlice';
import { cartApi } from '../../components/api';

function* cartUpdate(action) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(cartApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            yield put(updateSuccess(data));
        } else {
            yield put(errorCart(data.msg));
        }
    }
    catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('cart update saga cancelled');
        }
    }
}

function* cartDelete(action) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(cartApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            yield put(deleteSuccess(data));
        } else {
            yield put(errorCart(data.msg));
        }
    }
    catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('cart delete saga cancelled');
        }
    }
}

function* cartAdd(action) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(cartApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            yield put(addcartSuccess({ msg: data.msg, prodata: data.prodata }));
        } else {
            yield put(errorCart(data.msg));
        }
    }
    catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('cart add saga cancelled');
        }
    }
}

function* watchUpdate() {
    while (true) {
        const action = yield take(updateCart.type);
        const task = yield fork(cartUpdate, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(cancelCart.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

function* watchDelete() {
    while (true) {
        const action = yield take(deleteCart.type);
        const task = yield fork(cartDelete, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(cancelCart.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

function* watchAdd() {
    while (true) {
        const action = yield take(addtoCart.type);
        const task = yield fork(cartAdd, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(cancelCart.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

export default function* cartSaga() {
    yield all([
        fork(watchUpdate),
        fork(watchDelete),
        fork(watchAdd),
    ]);
}
