import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectProductSalesPeople: [],
};

const selectProductSalesPeopleAddSlice = createSlice({
    name: 'SelectProductSalesPeople',
    initialState,
    reducers: {
        addSelectProductSalesPeople: (state, action) => {
            const { repid, repkey,forename,surname,live } = action.payload;
         
            if (!state.selectProductSalesPeople.some(item => item.repkey === repkey)) {
                state.selectProductSalesPeople.push({
                    repid,
                    repkey,
                    forename,
                    surname,
                    live,
                });
            }
        },
        removeSelectProductSalesPeople: (state, action) => {
            const { repkey } = action.payload;
            
            state.selectProductSalesPeople = state.selectProductSalesPeople.filter(item => item.repkey !== repkey);
        },
        setSelectProductSalesPeople: (state, action) => {
            state.selectProductSalesPeople = action.payload.map(item => ({
                repid: item.repid, 
                repkey: item.repkey,
                forename: item.forename,
                surname: item.surname,
                live: item.live,
            }));
        },
        resetSelectProductSalesPeople: (state) => {
          state.selectProductSalesPeople = initialState.selectProductSalesPeople;
      },
    },
});

export const { 
    addSelectProductSalesPeople, 
    removeSelectProductSalesPeople, 
    setSelectProductSalesPeople ,
    resetSelectProductSalesPeople
} = selectProductSalesPeopleAddSlice.actions;

export default selectProductSalesPeopleAddSlice.reducer;
