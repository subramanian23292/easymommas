import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cusId: null,
    isLoading: false,
    error: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginCheck: (state) => {
            state.isLoading = true;
            state.error = '';
        },
        loginSuccess: (state, action) => {
            state.cusId = action.payload;
            state.isLoading = false;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logoutInit: (state) => {
            state.isLoading = true;
            state.error = '';
        },
        logOut: (state) => {
            state.isLoading = false;
            state.cusId = null;
        },
        loginCancel: (state) => {
            state.isLoading = false;
            state.error = '';
        },
    },
});

export const { loginCheck, loginSuccess, loginFailure, logOut, logoutInit, loginCancel } = authSlice.actions;

export default authSlice.reducer;

export const cusid = (state) => state.auth.cusId;
