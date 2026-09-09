import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    prodLoading: false,
    productlist: [],
    error: '',
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        productFetch: (state) => {
            state.error = '';
            state.prodLoading = true;
        },
        productSuccess: (state, action) => {
            state.productlist.push(action.payload);
            state.prodLoading = false;
        },
        productFailure: (state, action) => {
            state.error = action.payload;
            state.prodLoading = false;
        },
        productCancel: (state) => {
            state.error = '';
        },
    },
});

export const { productFetch, productSuccess, productFailure, productCancel } = productSlice.actions;

export default productSlice.reducer;

export const selectProductById = (productId) => createSelector(
    [(state) => state.product.productlist],
    (productlist) => productlist.find((item) => item.prod_id === productId)
);
