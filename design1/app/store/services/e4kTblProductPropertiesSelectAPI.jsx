
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


export const e4kTblProductPropertiesSelectAPI = createApi({
  reducerPath: 'e4kTblProductPropertiesSelect',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductPropertiesSelect'],
  endpoints: (builder) => ({
    getProductPropertiesSelect: builder.query({
      query: ({companyid,productid,propertyid}) => ({
        body: {
          query: gql`
            query ProductPropertiesSelectAPI($companyid: String!,$productid: String!,$propertyid:Int) {
             e4kTblproductProductProperties(companyid: $companyid,productid: $productid, propertyid: $propertyid) {
                    ... on E4K_TblproductProductPropertiesNode {
                        seqno
                        productPropid
                        propertyid {
                            description
                            propertyid
                        }
                        }
                        ... on CustomErrorType {
                        message
                        }
                    }
                    }
          `,
          variables: { companyid : companyid, productid:productid,propertyid: propertyid },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductProperties.map(({ productPropid }) => ({
                        type: 'ProductPropertiesSelect',
                        id: productPropid,
                      })),
                      { type: 'ProductPropertiesSelect', id: 'LIST' },
                    ]
                  : [{ type: 'ProductPropertiesSelect', id: 'LIST' }],
      
    }),
    

    createProductProperties: builder.mutation({
        query: ({companyid ,productid,propertyid,seqNo }) => ({
          body: {
            query: gql`
              mutation CreateProductProperties($companyid: String!,$productid: String!, $propertyid: Int!,$seqNo: Int!) {
                E4kTblproductProductpropertiesCreate( companyid: $companyid,productid: $productid,propertyid: $propertyid,seqNo: $seqNo) {
                  productProperties
                }
              }
            `,
            variables: {companyid:companyid, productid:productid,propertyid:propertyid,seqNo:seqNo },
          },
        }),
        invalidatesTags: [{ type: 'ProductPropertiesSelect', id: 'LIST' }], // Optional: Invalidate cache tags
    }),
  
    updateProductProperties: builder.mutation({
        query: ({companyid,productid, propertyid,newSeqNo}) => ({
          body: {
            query: gql`
              mutation UpdateProductProperties($companyid: String!, $productid: String!,$propertyid: Int!, $newSeqNo: Int!) {
                E4kTblproductProductpropertiesUpdate( companyid: $companyid, productid: $productid,propertyid: $propertyid,newSeqNo: $newSeqNo) {
                  UpdateProperty
                }
              }
            `,
            variables: { companyid:companyid,productid:productid, propertyid:propertyid,newSeqNo:newSeqNo },
          },
        }),
        invalidatesTags: (result, error, { propertyid }) => [
          { type: 'ProductPropertiesSelect', id: propertyid },
          { type: 'ProductPropertiesSelect', id: 'LIST' },
        ],
    }),
  
    deleteProductProperties: builder.mutation({
        query: ({ companyid,productid, propertyid,productPropId }) => ({
          body: {
            query: gql`
              mutation DeleteProductProperties($companyid: String!, $productid: String!,$propertyid: Int!, $productPropId: Int!) {
                E4kTblproductProductpropertiesDelete(companyid: $companyid, productid: $productid,propertyid: $propertyid,productPropId: $productPropId) {
                  deleteProperties
                }
              }
            `,
            variables: { companyid:companyid,productid:productid, propertyid:propertyid,productPropId:productPropId },
          },
        }),
        invalidatesTags: (result, error, { propertyid }) => [
          { type: 'ProductPropertiesSelect', id: propertyid },
          { type: 'ProductPropertiesSelect', id: 'LIST' },
        ],
    }),
    }),
  });
  
  export const {
    useGetProductPropertiesSelectQuery,
    useCreateProductPropertiesMutation,
    useUpdateProductPropertiesMutation,
    useDeleteProductPropertiesMutation,
  } = e4kTblProductPropertiesSelectAPI;
