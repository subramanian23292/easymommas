import { createSlice } from '@reduxjs/toolkit';
import { notifySingle } from '../../components/Toast';

const initialState = {
    searchLoading: false,
    product: [],
    error: "",
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchFetch: (state) => {
            state.searchLoading = true;
            state.error = ""
        },
        searchSuccess: (state, action) => {
            state.error = "";
            state.product = action.payload;
            state.searchLoading = false;
        },
        searchNoresult: (state, action) => {
            state.searchLoading = false;
            notifySingle('snackbar', {
                params: {
                    title: action.payload,
                },
            });
        },
        searchFailure: (state, action) => {
            state.error = action.payload;
            state.searchLoading = false;
        },
        searchCancel: (state) => {
            state.searchLoading = false;
            state.error = '';
        },
    }
});

export const { searchFetch, searchSuccess, searchFailure, searchCancel, searchNoresult } = searchSlice.actions;

export default searchSlice.reducer;
