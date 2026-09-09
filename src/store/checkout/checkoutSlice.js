import { createSlice, createSelector } from '@reduxjs/toolkit';
import { notifySingle } from '../../components/Toast';

const initialState = {
    deliveryAddress: {},
    billingAddress: {},
    deliveryLoading: true,
    deliveryMethod: [],
    selectedDelivery: '',
    couponLoading: false,
    couponcode: '',
    discountamount: 0,
    error: '',
    cartTotal: {
        total: 0,
        subtotal: 0,
        shipping: 0,
    },
    coupons: [],
};

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setDeliveryaddr: (state, action) => {
            state.deliveryAddress = action.payload;
        },
        setBillingaddr: (state, action) => {
            state.billingAddress = action.payload;
        },
        setOrderaddr: (state, action) => {
            state.deliveryAddress = action.payload;
            state.billingAddress = action.payload;
        },
        fetchDeliveryMethod: (state) => {
            state.deliveryLoading = true;
            state.error = '';
        },
        fetchDeliverySuccess: (state, action) => {
            state.deliveryMethod = action.payload;
            state.deliveryLoading = false;
        },
        fetchDeliveryError: (state, action) => {
            state.error = action.payload;
            state.deliveryLoading = false;
        },
        cancelDelivery: (state) => {
            state.deliveryLoading = false;
            state.error = '';
        },
        setDefDelivery: (state, action) => {
            state.selectedDelivery = action.payload;
        },
        couponCheck: (state) => {
            state.couponLoading = true;
        },
        applyCoupon: (state) => {
            state.couponLoading = true;
        },
        couponSuccess: (state, action) => {
            state.couponLoading = false;
            state.couponcode = action.payload.couponcode;
            state.discountamount = action.payload.discount;
        },
        couponRemove: (state) => {
            state.couponcode = '';
            state.discountamount = 0;
            state.couponLoading = false;
        },
        couponFailure: (state, action) => {
            state.couponLoading = false;
            notifySingle('snackbar', {
                params: {
                    title: action.payload,
                },
            });
        },
        fetchCoupon: (state) => {
            state.couponLoading = true;
        },
        fetchCouponSuccess: (state, action) => {
            state.couponLoading = false;
            state.coupons = action.payload.coupondata;
        },
        fetchCouponError: (state, action) => {
            state.error = action.payload;
            state.couponLoading = false;
        },
        cancelCoupon: (state) => {
            state.couponLoading = false;
            state.error = '';
        },
        setCartTotal: (state, action) => {
            state.cartTotal = action.payload;
        },
        resetToHome: (state) => {
        },
    },
});

export const { setDeliveryaddr, setBillingaddr, setOrderaddr, fetchDeliveryMethod, fetchDeliverySuccess, fetchDeliveryError, cancelDelivery, setDefDelivery, couponCheck, applyCoupon, couponSuccess, couponFailure, couponRemove, cancelCoupon, setCartTotal, resetToHome, fetchCoupon, fetchCouponSuccess, fetchCouponError } = checkoutSlice.actions;

export default checkoutSlice.reducer;

export const checkoutInfo = (state) => state.checkout;

export const listdelivery = createSelector(
    [checkoutInfo],
    (deliverymethod) => deliverymethod.deliveryMethod
);

export const chosenDelivery = (delivery) => createSelector(
    [listdelivery],
    (deliverymethod) => deliverymethod.find((item) => item.id === delivery)
);

export const listcoupons = createSelector(
    [checkoutInfo],
    (coupon) => coupon.coupons
);
