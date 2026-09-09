import { createSlice } from '@reduxjs/toolkit';
import { notifySingle } from '../../components/Toast';

const initialState = {
    changepassLoading: false,
    error: '',
};

export const changepassSlice = createSlice({
    name: 'changepass',
    initialState,
    reducers: {
        initChangepass: (state) => {
            state.error = '';
            state.changepassLoading = true;
        },
        successChangepass: (state, action) => {
            state.changepassLoading = false;
            notifySingle('snackbar', {
                params: {
                    title: action.payload,
                },
            });
        },
        errorChangepass: (state, action) => {
            state.error = action.payload;
            state.changepassLoading = false;
            notifySingle('snackbar', {
                params: {
                    title: action.payload,
                },
            });
        },
        cancelChangepass: (state) => {
            state.changepassLoading = false;
            state.error = '';
        },
    },
});

export const { initChangepass, successChangepass, errorChangepass, cancelChangepass } = changepassSlice.actions;

export default changepassSlice.reducer;
