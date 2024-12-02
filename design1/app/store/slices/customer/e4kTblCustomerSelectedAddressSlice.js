// slices/customerSelectedAddressSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customerSelectedAddress: [],
    };


const tblcustomerSelectedAddressSlice = createSlice({
  name: 'e4ktblcustomerSelectedAddress',
  initialState,
  reducers: {
    setCustomerSelectedAddress: (state, action) => {
      state.customerSelectedAddress = action.payload;
    },
    addCustomerSelectedAddress: (state, action) => {
      state.customerSelectedAddress = { ...state.customerSelectedAddress, ...action.payload };
    },
    removeCustomerSelectedAddressProperty: (state, action) => {
      const { key } = action.payload;
      const { [key]: _, ...rest } = state.customerSelectedAddress;
      state.customerSelectedAddress = rest;
    },
    resetCustomerSelectedAddress: (state) => {
      state.customerSelectedAddress = initialState.customerSelectedAddress;
    },
  },
});

export const {
  setCustomerSelectedAddress,
  addCustomerSelectedAddress,
  removeCustomerSelectedAddressProperty,
  resetCustomerSelectedAddress,
} = tblcustomerSelectedAddressSlice.actions;

export default tblcustomerSelectedAddressSlice.reducer;