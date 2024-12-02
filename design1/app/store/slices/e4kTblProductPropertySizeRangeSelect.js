import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectProductPropertySize: [],
};

const selectProductAddPropertySizeSlice = createSlice({
    name: 'SelectProductPropertySize',
    initialState,
    reducers: {
        addSelectProductPropertySize: (state, action) => {
            const { rangeid, values } = action.payload;
         
            if (!state.selectProductPropertySize.some(item => item.values === values)) {
                state.selectProductPropertySize.push({
                    rangeid,
                    values,
                });
            }
        },
        removeSelectProductPropertySize: (state, action) => {
            const { values } = action.payload;
            
            state.selectProductPropertySize = state.selectProductPropertySize.filter(item => item.values !== values);
        },
        setSelectProductAddPropertySize: (state, action) => {
            state.selectProductPropertySize = action.payload.map(item => ({
                rangeid: item.rangeid, 
                values: item.values,
            }));
        },
        resetSelectProductPropertySize: (state) => {
          state.selectProductPropertySize = initialState.selectProductPropertySize;
      },
    },
});

export const { 
    addSelectProductPropertySize, 
    removeSelectProductPropertySize, 
    setSelectProductAddPropertySize ,
    resetSelectProductPropertySize 
} = selectProductAddPropertySizeSlice.actions;

export default selectProductAddPropertySizeSlice.reducer;
