import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    catLoading: true,
    category: [],
    error: '',
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        catFetch: (state) => {
            state.error = '';
            state.catLoading = true;
        },
        catSuccess: (state, action) => {
            state.category = action.payload;
            state.catLoading = false;
        },
        catError: (state, action) => {
            state.error = action.payload;
            state.catLoading = false;
        },
        catCancel: (state) => {
            state.catLoading = false;
            state.error = '';
        },
    },
});

export const { catFetch, catSuccess, catError, catCancel } = categorySlice.actions;

export default categorySlice.reducer;

const selectCategoryState = (state) => state.category;

export const categorylist = createSelector(
    [selectCategoryState],
    (category) => category.category
);
