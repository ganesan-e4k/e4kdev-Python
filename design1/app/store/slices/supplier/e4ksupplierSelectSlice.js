import { configureStore, createSlice } from '@reduxjs/toolkit';


const initialState = {
    selectedSupplier: {}, 
};

// Create the slice
const supplierSelectSlice = createSlice({
    name: 'supplierSelect', 
    initialState,
    reducers: {
        
        setSelectedSupplier: (state, action) => {
            state.selectedSupplier = action.payload;
        },
        
        addSupplierProperty: (state, action) => {
            state.selectedSupplier = { ...state.selectedSupplier, ...action.payload };
        },
       
        resetSelectedSupplier: (state) => {
            state.selectedSupplier = {};
        },
    },
});


export const { setSelectedSupplier, addSupplierProperty, resetSelectedSupplier } = supplierSelectSlice.actions;
export default  supplierSelectSlice.reducer;
