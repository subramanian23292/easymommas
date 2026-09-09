import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    homeLoading: true,
    banner: [],
    bestseller: [],
    newarrivals: [],
    category: [],
    error: '',
};

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        initHome: (state) => {
            state.error = '';
            state.homeLoading = true;
        },
        setHome: (state, action) => {
            state.banner = action.payload.sliders;
            state.bestseller = action.payload.bestseller;
            state.newarrivals = action.payload.newarrival;
            state.category = action.payload.category;
            state.homeLoading = false;
        },
        errorHome: (state, action) => {
            state.error = action.payload;
            state.homeLoading = false;
        },
        cancelHome: (state) => {
            state.homeLoading = false;
            state.error = '';
        },
    },
});

export const { initHome, setHome, errorHome, cancelHome } = homeSlice.actions;

export default homeSlice.reducer;


const selectHomeState = (state) => state.home;

export const banners = createSelector(
    [selectHomeState],
    (home) => home.banner
);

export const bestsellers = createSelector(
    [selectHomeState],
    (home) => home.bestseller
);

export const newarrivals = createSelector(
    [selectHomeState],
    (home) => home.newarrivals
);

export const catlist = createSelector(
    [selectHomeState],
    (home) => home.category
);
