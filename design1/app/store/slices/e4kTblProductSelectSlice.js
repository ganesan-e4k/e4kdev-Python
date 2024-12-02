import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectProduct: {},
};


const selectProductSlice = createSlice({
    name: 'SelectProduct',
    initialState,
    reducers: {
      setSelectProduct: (state, action) => {
        state.selectProduct = action.payload;
      },
      addSelectProductProperty: (state, action) => {
        state.selectProduct = { ...state.selectProduct, ...action.payload };
      },
    },
    
});

export const { setSelectProduct, addSelectProductProperty } = selectProductSlice.actions;
export default selectProductSlice.reducer;