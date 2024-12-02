
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

//const baseUrl = 'http://127.0.0.1:8000/graphql'; // Replace with your GraphQL API URL

export const e4kTblProductStockingTypes = createApi({
  reducerPath: 'e4kTblProductStockingTypes',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductStockingTypes'],
  endpoints: (builder) => ({
    getProductStockingTypes: builder.query({
      query: ({companyid,stockingtype}) => ({
        body: {
          query: gql`
            query ProductStockingTypes($companyid: String!,$stockingtype:String!) {
             e4kTblproductProductStockingTypes(companyid: $companyid, stockingtype: $stockingtype) {
                    ... on E4K_TblproductStockingTypesNode {
                    description
                    stockingtype
                    companyid {
                        companyid
                    }
                    }
                    ... on CustomErrorType {
                    message
                    }
                }
                
            }
          `,
          variables: { companyid : companyid, stockingtype: stockingtype },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductStockingTypes.map(({ stockingtype }) => ({
                        type: 'ProductStockingTypes',
                        id: stockingtype,
                      })),
                      { type: 'ProductStockingTypes', id: 'LIST' },
                    ]
                  : [{ type: 'ProductStockingTypes', id: 'LIST' }],
      
    }),
    

    createProductStockingTypes: builder.mutation({
        query: ({companyid ,stockingtype,description }) => ({
          body: {
            query: gql`
              mutation CreateProductStockingTypes($companyid: String!,$stockingtype:String!,$description: String!) {
                E4kTblproductProductstockingtypesCreate( companyid: $companyid,stockingtype: $stockingtype ,description: $description) {
                  stockingType
                }
              }
            `,
            variables: {companyid:companyid, stockingtype:stockingtype,description:description },
          },
        }),
        invalidatesTags: [{ type: 'ProductStockingTypes', id: 'LIST' }], // Optional: Invalidate cache tags
      }),
  
      updateProductStockingTypes: builder.mutation({
        query: ({companyid,stockingtype, description}) => ({
          body: {
            query: gql`
              mutation UpdateProductStockingTypes($companyid: String!,$stockingtype: String!, $description: String!) {
                E4kTblproductProductstockingtypesUpdate( companyid: $companyid,stockingtype: $stockingtype, description: $description) {
                  stockingType
                }
              }
            `,
            variables: { companyid:companyid,stockingtype:stockingtype, description:description },
          },
        }),
        invalidatesTags: (result, error, { stockingtype }) => [
          { type: 'ProductStockingTypes', id: stockingtype },
          { type: 'ProductStockingTypes', id: 'LIST' },
        ],
      }),
  
      deleteProductStockingTypes: builder.mutation({
        query: ({ stockingtype, companyid }) => ({
          body: {
            query: gql`
              mutation DeleteProductStockingTypes($stockingtype: String!, $companyid: String!) {
                E4kTblproductProductstockingtypesDelete(stockingtype: $stockingtype, companyid: $companyid) {
                  success
                }
              }
            `,
            variables: { stockingtype:stockingtype,companyid:companyid },
          },
        }),
        invalidatesTags: (result, error, { stockingtype }) => [
          { type: 'ProductStockingTypes', id: stockingtype },
          { type: 'ProductStockingTypes', id: 'LIST' },
        ],
      }),
    }),
  });
  
  export const {
    useGetProductStockingTypesQuery,
    useCreateProductStockingTypesMutation,
    useUpdateProductStockingTypesMutation,
    useDeleteProductStockingTypesMutation,
  } = e4kTblProductStockingTypes;
