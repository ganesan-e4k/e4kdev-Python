import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectProductPropertyTypeValues: [],
};

const selectProductAddPropertyTypeValuesSlice = createSlice({
    name: 'SelectProductPropertyTypesValues',
    initialState,
    reducers: {
        addSelectProductPropertyTypesValues: (state, action) => {
            const { propertyid, proptypeValues } = action.payload;
            const numericPropertyId = Number(propertyid); // Ensure the propertyid is a number
            if (!state.selectProductPropertyTypeValues.some(item => item.proptypeValues === proptypeValues)) {
                state.selectProductPropertyTypeValues.push({ propertyid: numericPropertyId, proptypeValues });
            }
        },
        removeSelectProductPropertyTypesValues: (state, action) => {
            const { proptypeValues } = action.payload;
            //const numericPropertyId = proptypeValues); // Ensure the propertyid is a number
            state.selectProductPropertyTypeValues = state.selectProductPropertyTypeValues.filter(item => item.proptypeValues !== proptypeValues);
        },
        setSelectProductAddPropertyTypesValues: (state, action) => {
            state.selectProductPropertyTypeValues = action.payload.map(item => ({
                propertyid: Number(item.propertyid), // Ensure all propertyid values are numbers
                proptypeValues: item.proptypeValues,
            }));
        },
        resetSelectProductPropertyTypesValues: (state) => {
          state.selectProductPropertyTypeValues = initialState.selectProductPropertyTypeValues;
      },
    },
});

export const { 
    addSelectProductPropertyTypesValues, 
    removeSelectProductPropertyTypesValues, 
    setSelectProductAddPropertyTypesValues ,
    resetSelectProductPropertyTypesValues 
} = selectProductAddPropertyTypeValuesSlice.actions;
export default selectProductAddPropertyTypeValuesSlice.reducer;
