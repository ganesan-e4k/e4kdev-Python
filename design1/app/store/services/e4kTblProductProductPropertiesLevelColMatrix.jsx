
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';

const graphqlBaseQuery = ({ baseUrl }) => async ({ body }) => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: { status: 500, data: error.message } };
  }
};


export const e4kTblProductPropertiesLevelColMatrix = createApi({
  reducerPath: 'e4kTblProductPropertiesLevelColMatrix',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductPropertiesLevelColMatrix'],
  endpoints: (builder) => ({
  getProductPropertiesLevelColMatrix: builder.query({
    query: ({companyid,productid}) => ({
      body: {
        query: gql`
          query ProductPropertiesLevelColMatrix($companyid: String!,$productid: String!) {
            e4kTblproductProductPropertyLevelColmatrix(companyid: $companyid,productid: $productid) {
                  ... on E4K_TblProductProductPropertyLevelColmatrixNode {
                  stockcolmatrix
                  pricecolmatrix
                  stklvlcolmatrix
                  stktypecolmatrix
                  stkloccolmatrix
                  productid {
                      productid
                  }
                  }
                  ... on CustomErrorType {
                  message
                  }
              }
              }
        `,
        variables: { companyid : companyid, productid:productid },
      },
    }),
    providesTags: (result) =>
              result
                ? [
                    ...result.e4kTblproductProductPropertyLevelColmatrix.map(({ productid }) => ({
                      type: 'ProductPropertiesLevelColMatrix',
                      id: productid,
                    })),
                    { type: 'ProductPropertiesLevelColMatrix', id: 'LIST' },
                  ]
                : [{ type: 'ProductPropertiesLevelColMatrix', id: 'LIST' }],
    
  }),
    

    }),
  });
  
  export const {
    useGetProductPropertiesLevelColMatrixQuery,
    // useCreateProductPriceTypesMutation,
    // useUpdateProductPriceTypesMutation,
    // useDeleteProductPriceTypesMutation,
  } = e4kTblProductPropertiesLevelColMatrix;
