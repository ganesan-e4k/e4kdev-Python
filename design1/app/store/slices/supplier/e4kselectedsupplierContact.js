// slices/selectAddressSlice.jsaddressSelect
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  suppliercontactSelect: {},
};

const e4kselectedsupplierContact = createSlice({
  name: 'selectSupplierContacttypes',
  initialState,
  reducers: {
    setSelectSupplierContacttypes: (state, action) => {
      state.suppliercontactSelect = action.payload;
    },
    addSelectSupplierContacttypes: (state, action) => {
      state.suppliercontactSelect = { ...state.suppliercontactSelect, ...action.payload };
    },
    removeSelectSupplierContacttypesProperty: (state, action) => {
      const { key } = action.payload;
      const { [key]: _, ...rest } = state.suppliercontactSelect;
      state.suppliercontactSelect = rest;
    },
    resetSelectSupplierContacttypes: (state) => {
      state.suppliercontactSelect = initialState.suppliercontactSelect;
    },
  },
});

export const {
  setSelectSupplierContacttypes,
  addSelectSupplierContacttypes,
  removeSelectSupplierContacttypesProperty,
  resetSelectSupplierContacttypes,
} = e4kselectedsupplierContact.actions;

export default e4kselectedsupplierContact.reducer;
