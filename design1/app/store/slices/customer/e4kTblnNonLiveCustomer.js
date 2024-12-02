import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectNonLivecustomer: false,
};


const selectNonLiveCustomerSlice = createSlice({
    name: 'selectNonLivecustomer',
    initialState,
    reducers: {
      setSelectNonLiveCustomer: (state, action) => {
        state.selectNonLivecustomer = action.payload;
      },
      addSelectNonLiveCustomerProperty: (state, action) => {
        state.selectNonLivecustomer = { ...state.selectNonLivecustomer, ...action.payload };
      },
      resetSelectNonLiveCustomer: (state) => {
        state.selectNonLivecustomer = initialState.selectNonLivecustomer;
    },
    },
    
});

export const { setSelectNonLiveCustomer, addSelectNonLiveCustomerProperty,resetSelectNonLiveCustomer } = selectNonLiveCustomerSlice.actions;
export default selectNonLiveCustomerSlice.reducer;