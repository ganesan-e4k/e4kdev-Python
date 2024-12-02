
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectContact: {},
};

const CustomerSelectContactSlice = createSlice({
  name: 'e4ktblseleccustomertcontact',
  initialState,
  reducers: {
   
    setselectContact: (state, action) => {
      state.selectContact = action.payload;
    },
   
    addselectContact: (state, action) => {
      state.selectContact = { ...state.selectContact, ...action.payload };
    },
    // Remove a contact by id
    removeselectContact: (state, action) => {
      const { id } = action.payload;
      const { [id]: _, ...rest } = state.selectContact;
      state.selectContact = rest;
    },
    // Reset contacts to initial state
    resetselectContact: (state) => {
      state.selectContact = initialState.selectContact;
    },
  },
});

export const {
  setselectContact,
  addselectContact,
  removeselectContact,
  resetselectContact,
} = CustomerSelectContactSlice.actions;

export default CustomerSelectContactSlice.reducer;
