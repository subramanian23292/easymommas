import { all, take, race, call, put, cancel, fork, cancelled, join } from 'redux-saga/effects';
import { fetchDeliveryMethod, fetchDeliverySuccess, fetchDeliveryError, cancelDelivery, applyCoupon, couponSuccess, couponFailure, cancelCoupon, couponCheck, couponRemove, fetchCoupon, fetchCouponSuccess, fetchCouponError } from './checkoutSlice';
import { deliverymethodApi, couponApi, couponListApi } from '../../components/api';

function* getDelivery(action) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(deliverymethodApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            yield put(fetchDeliverySuccess(data.deliverymethods));
        } else {
            yield put(fetchDeliveryError(data.msg));
        }
    } catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('delivery method saga cancelled');
        }
    }
}

function* couponApply(action) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(couponApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            yield put(couponSuccess({ discount: data.discount, couponcode: data.code }));
        } else {
            yield put(couponFailure(data.msg));
        }
    } catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('apply coupon saga cancelled');
        }
    }
}

function* checkCoupon(action) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(couponApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            yield put(couponSuccess({ discount: data.discount, couponcode: data.code }));
        } else {
            yield put(couponRemove());
        }
    } catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('apply coupon saga cancelled');
        }
    }
}

function* couponFetch(action) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(couponListApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            yield put(fetchCouponSuccess({ msg: data.msg, coupondata: data.coupons }));
        } else {
            yield put(fetchCouponError());
        }
    } catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('fetch coupon saga cancelled');
        }
    }
}

function* watchDelivery() {
    while (true) {
        const action = yield take(fetchDeliveryMethod.type);
        const task = yield fork(getDelivery, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(cancelDelivery.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

function* watchApplyCoupon() {
    while (true) {
        const action = yield take(applyCoupon.type);
        const task = yield fork(couponApply, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(cancelCoupon.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

function* watchCouponCheck() {
    while (true) {
        const action = yield take(couponCheck.type);
        const task = yield fork(checkCoupon, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(cancelCoupon.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

function* watchFetchCoupon() {
    while (true) {
        const action = yield take(fetchCoupon.type);
        const task = yield fork(couponFetch, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(cancelCoupon.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

export default function* checkoutSaga() {
    yield all([
        fork(watchDelivery),
        fork(watchFetchCoupon),
        fork(watchApplyCoupon),
        fork(watchCouponCheck),
    ]);
}
