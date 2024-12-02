import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectCustomer: {},

    
};


const selectCustomerSlice = createSlice({
    name: 'selectCustomer',
    initialState,
    reducers: {
      setselectCustomer: (state, action) => {
        state.selectCustomer = action.payload;
      },
      addselectCustomerProperty: (state, action) => {
        state.selectCustomer = { ...state.selectCustomer, ...action.payload };
      },
      resetselectCustomer: (state) => {
        state.selectCustomer = {};
      }
     
    },
    
});

export const { setselectCustomer, addselectCustomerProperty,resetselectCustomer } = selectCustomerSlice.actions;

export default selectCustomerSlice.reducer;