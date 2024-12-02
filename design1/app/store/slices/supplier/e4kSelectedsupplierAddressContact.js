// slices/selectAddressSlice.jsaddressSelect
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  SelectedsupplierAddressContact: {},
};

const e4kSelectedsupplierAddressContact = createSlice({
  name: 'SelectedsupplierAddressContact',
  initialState,
  reducers: {
    setSelectedsupplierAddressContact: (state, action) => {
      state.SelectedsupplierAddressContact = action.payload;
    },
    addSelectedsupplierAddressContact: (state, action) => {
      state.SelectedsupplierAddressContact = { ...state.SelectedsupplierAddressContact, ...action.payload };
    },
    removeSelectedsupplierAddressContactProperty: (state, action) => {
      const { key } = action.payload;
      const { [key]: _, ...rest } = state.SelectedsupplierAddressContact;
      state.SelectedsupplierAddressContact = rest;
    },
    resetSelectedsupplierAddressContact: (state) => {
      state.SelectedsupplierAddressContact = initialState.SelectedsupplierAddressContact;
    },
  },
});

export const {
  setSelectedsupplierAddressContact,
  addSelectedsupplierAddressContact,
  removeSelectedsupplierAddressContactProperty,
  resetSelectedsupplierAddressContact,
} = e4kSelectedsupplierAddressContact.actions;

export default e4kSelectedsupplierAddressContact.reducer;
