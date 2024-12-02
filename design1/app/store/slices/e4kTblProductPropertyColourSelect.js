import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectProductPropertyColour: [],
};

const selectProductAddPropertyColourSlice = createSlice({
    name: 'SelectProductPropertyColour',
    initialState,
    reducers: {
        addSelectProductPropertyColour: (state, action) => {
            const { colourid, description,colourcode } = action.payload;
         
            if (!state.selectProductPropertyColour.some(item => item.colourid === colourid)) {
                state.selectProductPropertyColour.push({
                    colourid,
                    description,
                    colourcode,
                });
            }
        },
        removeSelectProductPropertyColour: (state, action) => {
            const { colourid } = action.payload;
            
            state.selectProductPropertyColour = state.selectProductPropertyColour.filter(item => item.colourid !== colourid);
        },
        setSelectProductAddPropertyColour: (state, action) => {
            state.selectProductPropertyColour = action.payload.map(item => ({
                colourid: item.colourid, 
                description: item.description,
                colourcode: colourcode
            }));
        },
        resetSelectProductPropertyColour: (state) => {
          state.selectProductPropertyColour = initialState.selectProductPropertyColour;
      },
    },
});

export const { 
    addSelectProductPropertyColour, 
    removeSelectProductPropertyColour, 
    setSelectProductAddPropertyColour ,
    resetSelectProductPropertyColour 
} = selectProductAddPropertyColourSlice.actions;

export default selectProductAddPropertyColourSlice.reducer;
