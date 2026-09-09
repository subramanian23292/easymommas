import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import registerSlice from './register/registerSlice';
import profileSlice from './profile/profileSlice';
import homeSlice from './home/homeSlice';
import productSlice from './product/productSlice';
import categorySlice from './category/categorySlice';
import productlistSlice from './productlist/productlistSlice';
import filterSlice from './filter/filterSlice';
import cartSlice from './cart/cartSlice';
import changepassSlice from './changepass/changepassSlice';
import addressSlice from './address/addressSlice';
import checkoutSlice from './checkout/checkoutSlice';
import orderlistSlice from './orderlist/orderlistSlice';
import orderSlice from './order/orderSlice';
import reviewSlice from './review/reviewSlice';
import componentSlice from './component/componentSlice';
import searchSlice from './search/searchSlice';

const allReducers = combineReducers({
    auth: authSlice,
    register: registerSlice,
    profile: profileSlice,
    home: homeSlice,
    product: productSlice,
    category: categorySlice,
    productlist: productlistSlice,
    filter: filterSlice,
    cart: cartSlice,
    changepass: changepassSlice,
    address: addressSlice,
    checkout: checkoutSlice,
    orderlist: orderlistSlice,
    order: orderSlice,
    review: reviewSlice,
    component: componentSlice,
    search: searchSlice,
});

const rootReducer = (state, action) => {
    if (action.type === 'auth/logOut') {
        return allReducers(undefined, action);
    } else if (action.type === 'checkout/resetToHome') {
        return allReducers({ auth: state.auth }, action);
    }
    return allReducers(state, action);
};

export default rootReducer;
