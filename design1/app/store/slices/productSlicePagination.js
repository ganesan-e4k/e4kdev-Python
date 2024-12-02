import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';

const endpoint = 'http://127.0.0.1:8000/product/';

// Async thunk for fetching data with variables
export const fetchProductpage = createAsyncThunk(
  'data1/fetchProductpage',
  async ({ after, companyid, first }) => {
    const query = gql`
      query MyQuery($after: String, $companyid: String!, $first: Int!) {
        e4kTblproductProductsPage(after: $after, companyid: $companyid, first: $first) {
          edges {
            node {
              batchcontrol
              category1id {
                description
              }
              category2id {
                description
              }
              category3id {
                description
              }
              classid {
                description
              }
              commodityCode {
                description
              }
              countryid {
                country
              }
              description
              issueuom {
                description
              }
              live
              notes
              obsoleteClass {
                description
              }
              productid
              stockingtype {
                description
              }
              stockinguom {
                description
              }
              styleimage
              supplimentaryunits
              weight
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `;

    const variables = { after, companyid, first };
    const response = await request(endpoint, query, variables);

    // Log the response to inspect it
    console.log('GraphQL response:', response);

    return response.e4kTblproductProductsPage;
  }
);

const dataSlice1 = createSlice({
  name: 'data',
  initialState: {
    items: [],
    endCursor: '',
    hasNextPage: false,
    
    status: 'idle',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductpage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductpage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.edges.map(edge => edge.node);
        state.endCursor = action.payload.pageInfo?.endCursor || ''; // Default value if endCursor is undefined
        state.hasNextPage = action.payload.pageInfo?.hasNextPage || false; // Accessing hasNextPage directly
      })
      .addCase(fetchProductpage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

//export const selectPageInfo = state => state.data.pageInfo;
//export const selectHasNextPage = state => state.data.pageInfo?.hasNextPage;

export default dataSlice1.reducer;
