import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    filLoading: true,
    filters: [],
    error: '',
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filFetch: (state) => {
            state.error = '';
            state.filLoading = true;
        },
        filSuccess: (state, action) => {
            const exists = state.filters.find((item) => item.cat_id === action.payload.cat_id);
            if (exists) {
                exists.filtertab = action.payload.filtertab;
                exists.pricerange = action.payload.pricerange;
            } else {
                state.filters.push(action.payload);
            }
            state.filLoading = false;
        },
        filError: (state, action) => {
            state.error = action.payload;
            state.filLoading = false;
        },
        filCancel: (state) => {
            state.filLoading = false;
            state.error = '';
        },
        setSort: (state, action) => {
            const exists = state.filters.find((item) => item.cat_id === action.payload.cat_id);
            if (exists) {
                exists.sort = action.payload.sort;
            } else {
                state.filters.push(action.payload);
            }
        },
        clearfilter: (state, action) => {
            const exists = state.filters.find((item) => item.cat_id === action.payload.cat_id);
            if (exists) {
                exists.filtertab = action.payload.filtertab;
                exists.pricerange = action.payload.pricerange;
                exists.sort = 'popularity';
            }
        },
    },
});

export const { filFetch, filSuccess, filError, filCancel, setSort,clearfilter } = filterSlice.actions;

export default filterSlice.reducer;

export const filterlist = (catId) => createSelector(
    [(state) => state.filter.filters],
    (filter) => filter.find((item) => item.cat_id === catId)
);
