

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

export const e4kTblProductSizeRangeValues = createApi({
  reducerPath: 'e4kTblProductSizeRangeValues',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductSizeRangeValues'],
  endpoints: (builder) => ({

    getProductSizeRangeValues: builder.query({
      query: ({ companyid, rangeid, sizenumber }) => ({
        body: {
          query: gql`
            query GetProductSizeRangesValues($companyid: String!, $rangeid: String!, $sizenumber: Int) {
              e4kTblproductProductSizeRangeValues(companyid: $companyid, rangeid: $rangeid, sizenumber: $sizenumber) {
                ... on E4K_TblproductSizeRangeValuesNode {
                  id
                  sizeNumber
                  sizeValue
                  rangeid {
                    rangeid
                  }
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
          variables: { companyid, rangeid, sizenumber },
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.e4kTblproductProductSizeRangeValues.map(({ rangeid }) => ({
                type: 'ProductSizeRangeValues',
                id: rangeid,
              })),
              { type: 'ProductSizeRangeValues', id: 'LIST' },
            ]
          : [{ type: 'ProductSizeRangeValues', id: 'LIST' }],
    }),

    createProductSizeRangeValues: builder.mutation({
      query: ({ companyid, rangeid, sizeNumber, sizeValue }) => ({
        body: {
          query: gql`
            mutation CreateProductSizeRangeValues($companyid: String!, $rangeid: String!, $sizeNumber: Int!, $sizeValue: String!) {
              E4kTblproductProductsizerangesvaluesCreate(companyid: $companyid, rangeid: $rangeid, sizeNumber: $sizeNumber, sizeValue: $sizeValue) {
                sizeRanges
              }
            }
          `,
          variables: { companyid, rangeid, sizeNumber, sizeValue },
        },
      }),
      invalidatesTags: [{ type: 'ProductSizeRangeValues', id: 'LIST' }],
    }),

    updateProductSizeRangeValues: builder.mutation({
      query: ({ companyid, rangeid, sizeNumber, newSizeNumber }) => ({
        body: {
          query: gql`
            mutation UpdateProductSizeRangeValues($companyid: String!, $rangeid: String!, $sizeNumber: Int!, $newSizeNumber: Int!) {
              E4kTblproductProductsizerangesvaluesUpdate(companyid: $companyid, rangeid: $rangeid, sizeNumber: $sizeNumber, newSizeNumber: $newSizeNumber) {
                success
              }
            }
          `,
          variables: { companyid, rangeid, sizeNumber, newSizeNumber },
        },
      }),
      invalidatesTags: [{ type: 'ProductSizeRangeValues', id: 'LIST' }],
    }),

    

    updateProductSizeRangeValuesSizeValue: builder.mutation({
      query: ({ companyid, rangeid, sizeNumber, sizeValue }) => ({
        body: {
          query: gql`
            mutation UpdateProductSizeRangeValuesSizevalue($companyid: String!, $rangeid: String!, $sizeNumber: Int!, $sizeValue: String!) {
              E4kTblproductProductsizerangevaluessizevalueUpdate(companyid: $companyid, rangeid: $rangeid, sizeNumber: $sizeNumber, sizeValue: $sizeValue) {
                sizeRanges
              }
            }
          `,
          variables: { companyid, rangeid, sizeNumber, sizeValue },
        },
      }),
      invalidatesTags: [{ type: 'ProductSizeRangeValues', id: 'LIST' }],
    }),

    deleteProductSizeRangeValues: builder.mutation({
      query: ({ companyid, rangeid, sizeNumber }) => ({
        body: {
          query: gql`
            mutation DeleteProductSizeRangeValues($companyid: String!, $rangeid: String!, $sizeNumber: Int!) {
              E4kTblproductProductsizerangesvaluesDelete(companyid: $companyid, rangeid: $rangeid, sizeNumber: $sizeNumber) {
                success
              }
            }
          `,
          variables: { companyid, rangeid, sizeNumber },
        },
      }),
      invalidatesTags: [{ type: 'ProductSizeRangeValues', id: 'LIST' }],
    }),

   
  }),
});

export const {
  useGetProductSizeRangeValuesQuery,
  useCreateProductSizeRangeValuesMutation,
  useUpdateProductSizeRangeValuesMutation,
  useUpdateProductSizeRangeValuesSizeValueMutation,
  useDeleteProductSizeRangeValuesMutation,
} = e4kTblProductSizeRangeValues;

