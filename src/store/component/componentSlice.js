import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    signinAlert: false,
};

export const componentSlice = createSlice({
    name: 'component',
    initialState,
    reducers: {
        signinAlertFn: (state, action) => {
            state.signinAlert = action.payload;
        },
    },
});

export const { signinAlertFn } = componentSlice.actions;

export default componentSlice.reducer;
