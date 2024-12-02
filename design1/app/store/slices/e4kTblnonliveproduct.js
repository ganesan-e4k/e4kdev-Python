import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectNonLiveproduct: false,
};


const selectNonLiveProductSlice = createSlice({
    name: 'SelectNonLiveProduct',
    initialState,
    reducers: {
      setSelectNonLiveProduct: (state, action) => {
        state.selectNonLiveproduct = action.payload;
      },
      addSelectNonLiveProductProperty: (state, action) => {
        state.selectNonLiveproduct = { ...state.selectNonLiveproduct, ...action.payload };
      },
      resetSelectNonLiveProduct: (state) => {
        state.selectNonLiveproduct = initialState.selectNonLiveproduct;
    },
    },
    
});

export const { setSelectNonLiveProduct, addSelectNonLiveProductProperty,resetSelectNonLiveProduct } = selectNonLiveProductSlice.actions;
export default selectNonLiveProductSlice.reducer;