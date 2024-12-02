
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  suppliercontactlistselection: {},
};

const e4ksuppliercontactlistselectionSlice = createSlice({
  name: 'suppliercontactsselect',
  initialState,
  reducers: {
   
    setSupplierContactlistselect: (state, action) => {
      state.suppliercontactlistselection = action.payload;
    },
   
    addSupplierContactlistselect: (state, action) => {
      state.suppliercontactlistselection = { ...state.suppliercontactlistselection, ...action.payload };
    },
    // Remove a contact by id
    removeSuppplierContactlistselect: (state, action) => {
      const { id } = action.payload;
      const { [id]: _, ...rest } = state.suppliercontactlistselection;
      state.suppliercontactlistselection = rest;
    },
    // Reset contacts to initial state
    resetSupplierContactlistselect: (state) => {
      state.suppliercontactlistselection = initialState.suppliercontactlistselection;
    },
  },
});

export const {
  setSupplierContactlistselect,
  addSupplierContactlistselect: addSupplierContact,
  removeSuppplierContactlistselect: removeSuppplierContact,
  resetSupplierContactlistselect: resetSupplierContacts,
} = e4ksuppliercontactlistselectionSlice.actions;

export default e4ksuppliercontactlistselectionSlice.reducer;
