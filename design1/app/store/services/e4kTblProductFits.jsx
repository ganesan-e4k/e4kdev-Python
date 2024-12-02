
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

export const e4kTblProductFits = createApi({
  reducerPath: 'e4kTblProductFits',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductFits'],
  endpoints: (builder) => ({
    getProductFits: builder.query({
      query: (companyid) => ({
        body: {
          query: gql`
            query GetProductFits($companyid: String!) {
              e4kTblproductProductFits(companyid: $companyid) {
                ... on E4K_TblproductFitsNode {
                    description
                    fitid
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
          variables: { companyid },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductFits.map(({ fitid }) => ({
                        type: 'ProductFits',
                        id: fitid,
                      })),
                      { type: 'ProductFits', id: 'LIST' },
                    ]
                  : [{ type: 'ProductFits', id: 'LIST' }],
      
    }),
    

    createProductFits: builder.mutation({
        query: ({companyid ,fitid,description }) => ({
          body: {
            query: gql`
              mutation CreateProductFits($companyid: String!,$fitid: String!,  $description: String!) {
                E4kTblproductProductfitsCreate(companyid: $companyid,fitid: $fitid, description: $description) {
                  fit
                }
              }
            `,
            variables: {companyid:companyid, fitid:fitid, description:description },
          },
        }),
        invalidatesTags: [{ type: 'ProductFits', id: 'LIST' }], // Optional: Invalidate cache tags
      }),
  
      updateProductFits: builder.mutation({
        query: ({companyid, fitid, description}) => ({
          body: {
            query: gql`
              mutation UpdateProductFits( $companyid: String!,$fitid: String!,  $description: String!) {
                E4kTblproductProductfitsUpdate(companyid: $companyid,fitid: $fitid, description: $description) {
                  fitId
                }
              }
            `,
            variables: { companyid:companyid, fitid:fitid, description:description },
          },
        }),
        invalidatesTags: (result, error, { fitid }) => [
          { type: 'ProductFits', id: fitid },
          { type: 'ProductFits', id: 'LIST' },
        ],
      }),
  
      deleteProductFits: builder.mutation({
        query: ({ companyid,fitid  }) => ({
          body: {
            query: gql`
              mutation DeleteProductFits($companyid: String!,$fitid: String! ) {
                E4kTblproductProductfitsDelete(companyid: $companyid,fitid: $fitid, ) {
                  success
                }
              }
            `,
            variables: { companyid:companyid,fitid:fitid },
          },
        }),
        invalidatesTags: (result, error, { fitid }) => [
          { type: 'ProductFits', id: fitid },
          { type: 'ProductFits', id: 'LIST' },
        ],
      }),
    }),
  });
  
  export const {
    useGetProductFitsQuery,
    useCreateProductFitsMutation,
    useUpdateProductFitsMutation,
    useDeleteProductFitsMutation,
  } = e4kTblProductFits;
