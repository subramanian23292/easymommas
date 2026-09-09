import { createSlice, createSelector } from '@reduxjs/toolkit';
import { notifySingle } from '../../components/Toast';

const initialState = {
    fetchLoading: true,
    addresses: [],
    error: '',
    addrLoading: false,
};

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        fetchAddress: (state) => {
            state.error = '';
            state.fetchLoading = true;
        },
        fetchSuccess: (state, action) => {
            state.fetchLoading = false;
            state.addresses = action.payload.addrdata;
        },
        defaultAddress: (state) => {
            state.error = '';
            state.addrLoading = true;
        },
        defaultSuccess: (state, action) => {
            state.addresses.forEach((addr) => {
                if (addr.id === action.payload.id) {
                    addr.defaddr = true;
                } else {
                    addr.defaddr = false;
                }
            });
            state.addrLoading = false;
            notifySingle('snackbar', {
                params: {
                    title: action.payload.msg,
                },
            });
        },
        addAddress: (state) => {
            state.addrLoading = true;
            state.error = '';
        },
        addSuccess: (state, action) => {
            const exists = state.addresses.find((item) => item.id === action.payload.address.id);
            if (exists) {
                exists.fname = action.payload.address.fname;
                exists.lname = action.payload.address.lname;
                exists.addrone = action.payload.address.addrone;
                exists.addrtwo = action.payload.address.addrtwo;
                exists.city = action.payload.address.city;
                exists.postcode = action.payload.address.postcode;
                exists.state = action.payload.address.state;
                exists.country = action.payload.address.country;
                exists.contactno = action.payload.address.contactno;
                exists.defaddr = action.payload.address.defaddr;
            } else {
                state.addresses.push(action.payload.address);
            }
            state.addrLoading = false;
            notifySingle('snackbar', {
                params: {
                    title: action.payload.msg,
                },
            });
        },
        deleteAddress: (state) => {
            state.addrLoading = true;
            state.error = '';
        },
        deleteSuccess: (state, action) => {
            state.addresses = state.addresses.filter((item) => item.id !== action.payload.addr_id);
            state.addrLoading = false;
            notifySingle('snackbar', {
                params: {
                    title: action.payload.msg,
                },
            });
        },
        errorAddress: (state, action) => {
            state.error = action.payload;
            state.fetchLoading = false;
            state.addrLoading = false;
        },
        cancelAddress: (state) => {
            state.addrLoading = false;
            state.pageLoading = false;
            state.error = '';
        },
    },
});

export const { fetchAddress, fetchSuccess, errorAddress, cancelAddress, defaultAddress, defaultSuccess, addAddress, addSuccess, deleteAddress, deleteSuccess } = addressSlice.actions;

export default addressSlice.reducer;

export const selectAddressState = (state) => state.address;

export const listaddress = createSelector(
    [selectAddressState],
    (addressState) => addressState.addresses
);

export const defaultaddress = createSelector(
    [listaddress],
    (addresses) => addresses.find((address) => address.defaddr)
);
