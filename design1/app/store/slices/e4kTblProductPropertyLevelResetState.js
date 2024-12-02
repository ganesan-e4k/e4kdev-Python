// redux/slices/boolSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  propertylevelreset: false, 
};

const propertylevelresetSlice = createSlice({
  name: 'propertylevelresetSlice',
  initialState,
  reducers: {
    // Action to set the boolean value
    setPropertyLevelResetState: (state, action) => {
      state.propertylevelreset = action.payload;
    },
    // Action to toggle the boolean value
    togglePropertyLevelResetState: (state) => {
      state.propertylevelreset = !state.propertylevelreset;
    },
    // Action to reset the boolean value to false
    resetPropertyLevelResetState: (state) => {
      state.propertylevelreset = false;
    },
  },
});

// Export actions for use in components
export const { setPropertyLevelResetState, togglePropertyLevelResetState, resetPropertyLevelResetState } = propertylevelresetSlice.actions;

// Export the reducer to be used in the store
export default propertylevelresetSlice.reducer;
