import { createSlice, createSelector } from '@reduxjs/toolkit';
import { notifySingle } from '../../components/Toast';

const initialState = {
    cartLoading: false,
    cartProducts: [],
    error: '',
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cartProducts = action.payload;
        },
        fetchCart: (state) => {
            state.error = '';
            state.cartLoading = true;
        },
        errorCart: (state, action) => {
            state.error = action.payload;
            state.cartLoading = false;
        },
        cancelCart: (state) => {
            state.cartLoading = false;
            state.error = '';
        },
        updateCart: (state) => {
            state.cartLoading = true;
            state.error = '';
        },
        updateSuccess: (state, action) => {
            const exists = state.cartProducts.find((item) => item.cart_id === action.payload.cart_id);
            if(exists) {
                exists.qty = action.payload.qty;
            }
            state.cartLoading = false;
            notifySingle('snackbar', {
                params: {
                    title: action.payload.msg,
                },
            });
        },
        deleteCart: (state) => {
            state.cartLoading = true;
            state.error = '';
        },
        deleteSuccess: (state, action) => {
            state.cartProducts = state.cartProducts.filter((item) => item.cart_id !== action.payload.cart_id);
            state.cartLoading = false;
            notifySingle('snackbar', {
                params: {
                    title: action.payload.msg,
                },
            });
        },
        addtoCart: (state) => {
            state.cartLoading = true;
            state.error = '';
        },
        addcartSuccess: (state, action) => {
            const exists = state.cartProducts.find((item) => item.cart_id === action.payload.prodata.cart_id);
            if(exists) {
                exists.qty = action.payload.prodata.qty;
            } else {
                state.cartProducts.push(action.payload.prodata);
            }
            state.cartLoading = false;
            notifySingle('snackbar', {
                params: {
                    title: action.payload.msg,
                },
            });
        },
    },
});

export const { setCart, fetchCart, errorCart, cancelCart, updateCart, updateSuccess, deleteCart, deleteSuccess, addtoCart, addcartSuccess } = cartSlice.actions;

export default cartSlice.reducer;

const selectCartState = (state) => state.cart;

export const productscart = createSelector(
    [selectCartState],
    (cart) => cart.cartProducts
);
