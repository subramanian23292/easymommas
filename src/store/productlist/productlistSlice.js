import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    listLoading: true,
    listProducts: [],
    error: '',
};

export const productlistSlice = createSlice({
    name: 'productlist',
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
            const exists = state.listProducts.find((item) => item.cat_id === action.payload.cat_id);
            if (exists) {
                exists.productlist = [...exists.productlist, ...action.payload.productlist];
                exists.loadmore = action.payload.loadmore;
                exists.page = action.payload.page;
            } else {
                state.listProducts.push(action.payload);
            }
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
        listEmpty: (state, action) => {
            state.listProducts = state.listProducts.filter((item) => item.cat_id !== action.payload.cat_id);
        },
    },
});

export const { listFetch, listSuccess, listFailure, listCancel, listLoadmore, listEmpty } = productlistSlice.actions;

export default productlistSlice.reducer;

export const selectProductsById = (catId) => createSelector(
    [(state) => state.productlist.listProducts],
    (productlist) => productlist.find((item) => item.cat_id === catId)
);
