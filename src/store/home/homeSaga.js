import { take, race, call, put, cancel, fork, cancelled, join, all } from 'redux-saga/effects';
import { initHome, cancelHome, errorHome, setHome } from './homeSlice';
import { setCart } from '../cart/cartSlice';
import { homeApi } from '../../components/api';

function* getHomedata(action) {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = yield call(homeApi, action.payload, signal);
        const data = response.data;
        if (Number(data.status) === 1) {
            yield all([
                put(setHome(data.homedata)),
                put(setCart(data.cartproduct)),
            ]);
        } else {
            yield put(errorHome(data.msg));
        }
    } catch (error) {
        console.log(error, 'catch error');
    } finally {
        if (yield cancelled()) {
            controller.abort();
            console.log('home saga cancelled');
        }
    }
}

function* watchHome() {
    while (true) {
        const action = yield take(initHome.type);
        const task = yield fork(getHomedata, action);

        const result = yield race({
            completed: join(task),
            cancelled: take(cancelHome.type),
        });

        if (result.cancelled) {
            yield cancel(task);
        }
    }
}

export default function* homeSaga() {
    yield fork(watchHome);
}
