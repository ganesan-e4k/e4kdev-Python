import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectProductProperty: [],
};

const selectProductAddPropertySlice = createSlice({
    name: 'SelectProductProperty',
    initialState,
    reducers: {
        addSelectProductProperty: (state, action) => {
            const { propertyid, description ,isstatic} = action.payload;
            const numericPropertyId = Number(propertyid); // Ensure the propertyid is a number
            if (!state.selectProductProperty.some(item => item.description === description)) {
                state.selectProductProperty.push({ propertyid: numericPropertyId, description ,isstatic});
            }
        },
        removeSelectProductProperty: (state, action) => {
            const { propertyid } = action.payload;
            const numericPropertyId = Number(propertyid); // Ensure the propertyid is a number
            state.selectProductProperty = state.selectProductProperty.filter(item => item.propertyid !== numericPropertyId);
        },
        setSelectProductAddProperty: (state, action) => {
            state.selectProductProperty = action.payload.map(item => ({
                propertyid: Number(item.propertyid), // Ensure all propertyid values are numbers
                description: item.description,
                isstatic :item.isstatic,
            }));
        },
        resetSelectProductProperty: (state) => {
          state.selectProductProperty = initialState.selectProductProperty;
      },
    },
});

export const { addSelectProductProperty, removeSelectProductProperty, setSelectProductAddProperty ,resetSelectProductProperty } = selectProductAddPropertySlice.actions;
export default selectProductAddPropertySlice.reducer;
