import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedAddressData: {},
};

const CustomeraddressDataSlice = createSlice({
    name: 'CustomeraddressData',
    initialState,
    reducers: {
        setSelectedAddressData: (state, action) => {
            state.selectedAddressData = action.payload; 
        },
        addSelectedAddressDataProperty: (state, action) => {
            state.selectedAddressData = { ...state.selectedAddressData, ...action.payload };
        },
        resetSelectedAddressData: (state) => {
            state.selectedAddressData = initialState.selectedAddressData;
        },
    },
});

export const { setSelectedAddressData, addSelectedAddressDataProperty, resetSelectedAddressData } = CustomeraddressDataSlice.actions;

export default CustomeraddressDataSlice.reducer;