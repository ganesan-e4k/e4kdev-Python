
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  suppliercontactsselect: {},
};

const e4kSupplierContactAddressSlice = createSlice({
  name: 'suppliercontactsselect',
  initialState,
  reducers: {
   
    setSupplierContacts: (state, action) => {
      state.suppliercontactsselect = action.payload;
    },
   
    addSupplierContact: (state, action) => {
      state.suppliercontactsselect = { ...state.suppliercontactsselect, ...action.payload };
    },
    // Remove a contact by id
    removeSuppplierContact: (state, action) => {
      const { id } = action.payload;
      const { [id]: _, ...rest } = state.suppliercontactsselect;
      state.suppliercontactsselect = rest;
    },
    // Reset contacts to initial state
    resetSupplierContacts: (state) => {
      state.suppliercontactsselect = initialState.suppliercontactsselect;
    },
  },
});

export const {
  setSupplierContacts,
  addSupplierContact,
  removeSuppplierContact,
  resetSupplierContacts,
} = e4kSupplierContactAddressSlice.actions;

export default e4kSupplierContactAddressSlice.reducer;
