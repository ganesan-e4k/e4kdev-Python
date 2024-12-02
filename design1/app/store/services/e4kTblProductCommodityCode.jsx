
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

export const e4kTblProductCommodityCode = createApi({
  reducerPath: 'e4kTblProductCommodityCode',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductCommodityCode'],
  endpoints: (builder) => ({
    getProductCommodityCode: builder.query({
      query: (companyid) => ({
        body: {
          query: gql`
            query GetProductCommodityCode($companyid: String!) {
             e4kTblproductProductCommoditycodes(companyid: $companyid) {
                    ... on E4K_TblproductCommoditycodesNode {
                    description
                    commodityCode
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
                      ...result.e4kTblproductProductCommoditycodes.map(({ commodityCode }) => ({
                        type: 'ProductCommodityCode',
                        id: commodityCode,
                      })),
                      { type: 'ProductCommodityCode', id: 'LIST' },
                    ]
                  : [{ type: 'ProductCommodityCode', id: 'LIST' }],
      
    }),
    

    createProductCommodityCode: builder.mutation({
        query: ({commoditycode,companyid ,description }) => ({
          body: {
            query: gql`
              mutation CreateProductCommodityCode($commoditycode: String!, $companyid: String!,$description: String!) {
                E4kTblproductCommoditycodesCreate(commoditycode: $commoditycode, companyid: $companyid, description: $description) {
                  commoditycode
                }
              }
            `,
            variables: {commoditycode:commoditycode,companyid:companyid, description:description },
          },
        }),
        invalidatesTags: [{ type: 'ProductCommodityCode', id: 'LIST' }], // Optional: Invalidate cache tags
      }),
  
      updateProductCommodityCode: builder.mutation({
        query: ({commoditycode,companyid, description}) => ({
          body: {
            query: gql`
               mutation UpdateProductCommodityCode($commoditycode: String!, $companyid: String!,$description: String!) {
                E4kTblproductCommoditycodesUpdate(commoditycode: $commoditycode, companyid: $companyid, description: $description) {
                  commoditycode
                }
              }
            `,
            variables: { commoditycode:commoditycode,companyid:companyid, description:description },
          },
        }),
        invalidatesTags: (result, error, { commoditycode }) => [
          { type: 'ProductCommodityCode', id: commoditycode },
          { type: 'ProductCommodityCode', id: 'LIST' },
        ],
      }),
  
      deleteProductCommodityCode: builder.mutation({
        query: ({ commoditycode, companyid }) => ({
          body: {
            query: gql`
              mutation DeleteProductCommodityCode($commoditycode: String!, $companyid: String!) {
                E4kTblproductCommoditycodesDelete(commoditycode: $commoditycode, companyid: $companyid) {
                  success
                }
              }
            `,
            variables: { commoditycode:commoditycode,companyid:companyid },
          },
        }),
        invalidatesTags: (result, error, { commoditycode }) => [
          { type: 'ProductCommodityCode', id: commoditycode },
          { type: 'ProductCommodityCode', id: 'LIST' },
        ],
      }),
    }),
  });
  
  export const {
    useGetProductCommodityCodeQuery,
    useCreateProductCommodityCodeMutation,
    useUpdateProductCommodityCodeMutation,
    useDeleteProductCommodityCodeMutation,
  } = e4kTblProductCommodityCode;
