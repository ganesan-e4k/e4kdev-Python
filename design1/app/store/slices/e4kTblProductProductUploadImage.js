import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectProductNewImage: {},
};


const uploadNewProductImageSlice = createSlice({
    name: 'SelectNewProductImage',
    initialState,
    reducers: {
        setSelectNewProductUploadImage: (state, action) => {
        state.selectProductNewImage = action.payload;
      },
      
    },
    
});

export const { setSelectNewProductUploadImage } = uploadNewProductImageSlice.actions;
export default uploadNewProductImageSlice.reducer;