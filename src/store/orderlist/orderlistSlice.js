import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    listLoading: true,
    listOrders: [],
    error: '',
    loadmore: false,
    page: 1,
};

export const orderlistSlice = createSlice({
    name: 'orderlist',
    initialState,
    reducers: {
        listFetch: (state) => {
            state.error = '';
            state.listLoading = true;
        },
        listLoadmore: (state) => {
            state.error = '';
            state.listLoading = false;
        },
        listSuccess: (state, action) => {
            state.listOrders.push(...action.payload.orders);
            state.loadmore = action.payload.loadmore;
            state.page = action.payload.page;
            state.listLoading = false;
        },
        listFailure: (state, action) => {
            state.error = action.payload;
            state.listLoading = false;
        },
        listCancel: (state) => {
            state.listLoading = false;
            state.error = '';
        },
    },
});

export const { listFetch, listSuccess, listFailure, listCancel, listLoadmore } = orderlistSlice.actions;

export default orderlistSlice.reducer;

export const selectOrderState = (state) => state.orderlist;

export const listorder = createSelector(
    [selectOrderState],
    (orderState) => orderState.listOrders
);
