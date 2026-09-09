import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    listLoading: true,
    listReviews: [],
    error: '',
};

export const reviewSlice = createSlice({
    name: 'review',
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
            const exists = state.listReviews.find((item) => item.prod_id === action.payload.prod_id);
            if (exists) {
                exists.reviewlist = [...exists.reviewlist, ...action.payload.reviewlist];
                exists.loadmore = action.payload.loadmore;
                exists.page = action.payload.page;
            } else {
                state.listReviews.push(action.payload);
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
    },
});

export const { listFetch, listSuccess, listFailure, listCancel, listLoadmore } = reviewSlice.actions;

export default reviewSlice.reducer;

export const selectReviewById = (pId) => createSelector(
    [(state) => state.review.listReviews],
    (reviewlist) => reviewlist.find((item) => item.prod_id === pId)
);
