import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    error: '',
};

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerInit: (state) => {
            state.error = '';
            state.isLoading = true;
        },
        registerSuccess: (state) => {
            state.isLoading = false;
        },
        registerFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        registerCancel: (state) => {
            state.isLoading = false;
        },
    },
});

export const { registerInit, registerSuccess, registerFailure, registerCancel } = registerSlice.actions;

export default registerSlice.reducer;
