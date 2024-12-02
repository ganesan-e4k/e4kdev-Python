import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
    Companyid: "001",
};


const TblCompanyIDSlice = createSlice({
    name: 'TblCompanyIDSlice',
    initialState,
    reducers: {
      setTblCompanyid: (state, action) => {
        state.Companyid = action.payload;
      },
      addTblCompanyidProperty: (state, action) => {
        state.Companyid = { ...state.Companyid, ...action.payload };
      },
      resetCompanyid: (state) => {
        state.Companyid = initialState.Companyid;
    },
    },
    
});

export const { setTblCompanyid, addTblCompanyidProperty,resetCompanyid } = TblCompanyIDSlice.actions;
export default TblCompanyIDSlice.reducer;