import { createSlice } from '@reduxjs/toolkit';
import { notifySingle } from '../../components/Toast';

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    contactno: '',
    profileLoading: false,
    error: '',
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        profileFetch: (state) => {
            state.profileLoading = true;
            state.error = '';
        },
        profileSuccess: (state, action) => {
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.email = action.payload.email;
            state.contactno = action.payload.telephone;
            state.profileLoading = false;
        },
        profileFailure: (state, action) => {
            state.profileLoading = false;
            state.error = action.payload;
        },
        profileCancel: (state) => {
            state.profileLoading = false;
            state.error = '';
        },
        profileUpdate: (state) => {
            state.profileLoading = true;
            state.error = '';
        },
        profileUpdatesuccess: (state, action) => {
            state.firstname = action.payload.cusinfo.firstname;
            state.lastname = action.payload.cusinfo.lastname;
            state.contactno = action.payload.cusinfo.telephone;
            state.profileLoading = false;
            notifySingle('snackbar', {
                params: {
                    title: action.payload.msg,
                },
            });
        },
    },
});

export const { profileUpdate, profileFetch, profileSuccess, profileFailure, profileCancel, profileUpdatesuccess } = profileSlice.actions;

export default profileSlice.reducer;
