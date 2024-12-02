import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectProductPropertyFit: [],
};

const selectProductAddPropertyFitSlice = createSlice({
    name: 'SelectProductPropertyFit',
    initialState,
    reducers: {
        addSelectProductPropertyFit: (state, action) => {
            const { fitid, description } = action.payload;
         
            if (!state.selectProductPropertyFit.some(item => item.description === description)) {
                state.selectProductPropertyFit.push({
                    fitid,
                    description,
                });
            }
        },
        removeSelectProductPropertyFit: (state, action) => {
            const { description } = action.payload;
            
            state.selectProductPropertyFit = state.selectProductPropertyFit.filter(item => item.description !== description);
        },
        setSelectProductAddPropertyFit: (state, action) => {
            state.selectProductPropertyFit = action.payload.map(item => ({
                fitid: item.fitid, 
                description: item.description,
            }));
        },
        resetSelectProductPropertyFit: (state) => {
          state.selectProductPropertyFit = initialState.selectProductPropertyFit;
      },
    },
});

export const { 
    addSelectProductPropertyFit, 
    removeSelectProductPropertyFit, 
    setSelectProductAddPropertyFit ,
    resetSelectProductPropertyFit
} = selectProductAddPropertyFitSlice.actions;

export default selectProductAddPropertyFitSlice.reducer;
