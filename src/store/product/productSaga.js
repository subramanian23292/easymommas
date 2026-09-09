import { take, call, put, cancelled, cancel, fork } from 'redux-saga/effects';
import { productFetch, productSuccess, productFailure, productCancel } from './productSlice';
import { productApi } from '../../components/api';

function* getProdData(action) {
    const controller = action.payload.controller || new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(productApi, action.payload, signal);
        const data = response.data;

        if (Number(data.status) === 1) {
            yield put(productSuccess(data.prodinfo));
        } else {
            yield put(productFailure(data.msg));
        }
    } catch(error) {
        if (error.name === 'CanceledError') {
            console.log('API request was cancelled');
        } else {
            console.log('API error:', error);
        }
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log(`prod${action.payload.product_id}  saga cancelled`);
            yield put(productFailure('Product fetch cancelled'));
        }
    }
}

function* watchProductSaga() {
    let task = null;
    let currentProductId = null;

    while (true) {
        const action = yield take([productFetch.type, productCancel.type]);
        if (action.type === productFetch.type) {
            if (task && currentProductId !== action.payload.product_id) {
                yield cancel(task); // cancel previous task
            }

            currentProductId = action.payload.product_id;
            task = yield fork(getProdData, action);
        }

        if (action.type === productCancel.type && action.payload?.product_id === currentProductId) {
            // Only cancel if the cancelled product ID matches current
            if (task) {
                yield cancel(task);
            }
            task = null;
            currentProductId = null;
        }
    }
}

export default function* productSaga() {
    yield fork(watchProductSaga);
}
