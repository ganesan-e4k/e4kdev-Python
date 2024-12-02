import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';

const endpoint = 'http://127.0.0.1:8000/product/';

export const fetchAllProduct = createAsyncThunk(
  'data2/fetchAllProduct',
  async ({ companyid }) => {
    const query = gql`
      query MyQuery($companyid: String!) {
        e4kTblproductProductAll(companyid: $companyid)
      }
    `;
    const variables = { companyid };
    const response = await request(endpoint, query, variables);
    
    // Log the response to inspect it
    //console.log('GraphQL product response:', response);

    // Assuming the response is an array of JSON strings
    const result = response.e4kTblproductProductAll.map(jsonString => JSON.parse(jsonString));
    

    return result;
  }
);

const dataProductSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: 'idle',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataProductSlice.reducer;
