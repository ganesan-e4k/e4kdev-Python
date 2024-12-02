// slices/selectAddressSlice.jsaddressSelect
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  supplieraddressSelect: {},
};

const e4kselectedSupplieraddresstypes = createSlice({
  name: 'selectSupplierAddresstypes',
  initialState,
  reducers: {
    setSelectSupplierAddresstypes: (state, action) => {
      state.supplieraddressSelect = action.payload;
    },
    addSelectSupplierAddresstypes: (state, action) => {
      state.supplieraddressSelect = { ...state.supplieraddressSelect, ...action.payload };
    },
    // removeSelectSupplierAddresstypesProperty: (state, action) => {
    //   const { key } = action.payload;
    //   const { [key]: _, ...rest } = state.supplieraddressSelect;
    //   state.supplieraddressSelect = rest;
    // },
    resetSelectSupplierAddresstypes: (state) => {
      state.supplieraddressSelect = initialState.supplieraddressSelect;
    },
  },
});

export const {
  setSelectSupplierAddresstypes,
  addSelectSupplierAddresstypes,
  // removeSelectSupplierAddresstypesProperty,
  resetSelectSupplierAddresstypes,
} = e4kselectedSupplieraddresstypes.actions;

export default e4kselectedSupplieraddresstypes.reducer;
