import { all, call, spawn } from 'redux-saga/effects';
import authSaga from './auth/authSaga';
import registerSaga from './register/registerSaga';
import profileSaga from './profile/profileSaga';
import homeSaga from './home/homeSaga';
import productSaga from './product/productSaga';
import categorySaga from './category/categorySaga';
import productlistSaga from './productlist/productlistSaga';
import filterSaga from './filter/filterSaga';
import cartSaga from './cart/cartSaga';
import changepassSaga from './changepass/changepassSaga';
import addressSaga from './address/addressSaga';
import checkoutSaga from './checkout/checkoutSaga';
import orderlistSaga from './orderlist/orderlistSaga';
import orderSaga from './order/orderSaga';
import reviewSaga from './review/reviewSaga';
import searchSaga from './search/searchSaga';

export default function* rootSaga() {
    const sagas = [
        authSaga,
        registerSaga,
        profileSaga,
        homeSaga,
        productSaga,
        categorySaga,
        productlistSaga,
        filterSaga,
        cartSaga,
        changepassSaga,
        addressSaga,
        checkoutSaga,
        orderlistSaga,
        orderSaga,
        reviewSaga,
        searchSaga,
    ];

    yield all(sagas.map(saga =>
        spawn(function* () {
            while (true) {
                try {
                    yield call(saga);
                    break;
                } catch (error) {
                    console.error(`Saga ${saga.name} crashed:`, error);
                }
            }
        }))
    );
}
