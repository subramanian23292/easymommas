import { take, race, call, put, cancel, fork, cancelled, join } from 'redux-saga/effects';
import { filFetch, filSuccess, filError, filCancel } from './filterSlice';
import { filterApi } from '../../components/api';

function* getFilter(action) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(filterApi, action.payload, signal);
        const data = response.data;

        if (Number(data.status) === 1) {
            yield put(filSuccess({ cat_id: action.payload.category_id, filtertab: data.filterdata, pricerange: data.pricerange }));
        } else if(Number(data.status) === 2) {
            yield put(filSuccess({ cat_id: action.payload.category_id, filtertab: [], pricerange: data.pricerange }));
        } else {
            yield put(filError(data.msg));
        }
    } catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('filter saga cancelled');
        }
    }
}

function* watchFilter() {
    while (true) {
        const action = yield take(filFetch.type);
        const task = yield fork(getFilter, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(filCancel.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

export default function* filterSaga() {
    yield fork(watchFilter);
}
