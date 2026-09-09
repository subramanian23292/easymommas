import { createSlice, createSelector } from '@reduxjs/toolkit';
import { notifySingle } from '../../components/Toast';

const initialState = {
    ordLoading: false,
    orderlist: [],
    error: '',
    revLoading: false,
    revError: '',
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        orderFetch: (state) => {
            state.error = '';
            state.ordLoading = true;
        },
        orderSuccess: (state, action) => {
            state.orderlist.push(action.payload);
            state.ordLoading = false;
        },
        orderFailure: (state, action) => {
            state.error = action.payload;
            state.ordLoading = false;
        },
        orderCancel: (state) => {
            state.error = '';
        },
        submitReview: (state) => {
            state.revError = '';
            state.revLoading = true;
        },
        reviewSuccess: (state, action) => {
            const order = state.orderlist.find(o => o.order_id === action.payload.oid);
            if (order) {
                const product = order.products.find(p => p.pid === action.payload.pid);
                if (product) {
                    product.submitted = 1;
                    product.rating = action.payload.rating;
                }
            }
            state.revLoading = false;
            notifySingle('snackbar', {
                params: {
                    title: action.payload.msg,
                },
            });
        },
        reviewFailure: (state, action) => {
            state.revError = action.payload;
            state.revLoading = false;
            notifySingle('snackbar', {
                params: {
                    title: action.payload,
                },
            });
        },
        reviewCancel: (state) => {
            state.revError = '';
        },
    },
});

export const { orderFetch, orderSuccess, orderFailure, orderCancel, submitReview, reviewSuccess, reviewFailure, reviewCancel } = orderSlice.actions;
export default orderSlice.reducer;

export const selectOrderById = (orderId) => createSelector(
    [(state) => state.order.orderlist],
    (orderlist) => orderlist.find((item) => item.order_id === orderId)
);
