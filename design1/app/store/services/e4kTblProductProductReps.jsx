
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


export const e4kTblProductProductRepsAPI = createApi({
  reducerPath: 'e4kTblProductProductReps',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductRepsSelect'],
  endpoints: (builder) => ({
    getProductProductRepsSelect: builder.query({
      query: ({companyid,productid,repid}) => ({
        body: {
          query: gql`
            query ProductProductRepsSelectAPI($companyid: String!,$productid: String!,$repid:Int) {
             e4kTblproductProductReps(companyid: $companyid,productid: $productid, repid: $repid) {
                    ... on E4K_TblproductProductRepsNode {
                        id
                        seqno
                        productid {
                            productid
                        }
                        repid {
                            forename
                            repid
                            surname
                            repkey
                            live
                        }
                        }
                        ... on CustomErrorType {
                        message
                        }
                    }
                    }
            `,
          variables: { companyid : companyid, productid:productid,repid: repid },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductReps.map(({ repid }) => ({
                        type: 'ProductRepsSelect',
                        id: repid,
                      })),
                      { type: 'ProductRepsSelect', id: 'LIST' },
                    ]
                  : [{ type: 'ProductRepsSelect', id: 'LIST' }],
      
    }),
    

    createProductProductReps: builder.mutation({
        query: ({companyid ,productid,repid,seqNo }) => ({
          body: {
            query: gql`
              mutation CreateProductProductRepsApi($companyid: String!,$productid: String!, $repid: Int!,$seqNo: Int!) {
                E4kTblproductProductrepsCreate( companyid: $companyid,productid: $productid,repid: $repid,seqNo: $seqNo) {
                  createProductRep
                }
              }
            `,
            variables: {companyid:companyid, productid:productid,repid:repid,seqNo:seqNo },
          },
        }),
        invalidatesTags: [{ type: 'ProductRepsSelect', id: 'LIST' }], // Optional: Invalidate cache tags
    }),
  
    updateProductProductReps: builder.mutation({
        query: ({companyid,productid, repid,newSeqNo}) => ({
          body: {
            query: gql`
              mutation UpdateProductProductRepsAPI($companyid: String!, $productid: String!,$repid: Int!, $newSeqNo: Int!) {
                E4kTblproductProductrepsUpdate( companyid: $companyid, productid: $productid,repid: $repid,newSeqNo: $newSeqNo) {
                  updateProductRep
                }
              }
            `,
            variables: { companyid:companyid,productid:productid, repid:repid,newSeqNo:newSeqNo },
          },
        }),
        invalidatesTags: (result, error, { repid }) => [
          { type: 'ProductRepsSelect', id: repid },
          { type: 'ProductRepsSelect', id: 'LIST' },
        ],
    }),
  
    deleteProductProductReps: builder.mutation({
        query: ({ companyid,productid, id }) => ({
          body: {
            query: gql`
              mutation DeleteProductProductRepsAPI($companyid: String!, $productid: String!,$id: Int!) {
                E4kTblproductProductrepsDelete(companyid: $companyid, productid: $productid,id: $id) {
                  deleteProductRep
                }
              }
            `,
            variables: { companyid:companyid,productid:productid, id:id },
          },
        }),
        invalidatesTags: (result, error, { repsid }) => [
          { type: 'ProductRepsSelect', id: repsid },
          { type: 'ProductRepsSelect', id: 'LIST' },
        ],
    }),

    /////////////////////////////////////// tbl bus all sales people api call
    getTblBusSalesPeopleAPI: builder.query({
      query: ({companyid}) => ({
        body: {
          query: gql`
            query AllE4kTblBusSalesPeopleAPI($companyid: String!) {
              e4kTblbusSalesPeople(companyid: $companyid) {
                   ... on E4K_TblbusSalesPeopleNode {
                    repkey
                    forename
                    live
                    repid
                    surname
                  }
                  ... on CustomErrorType {
                    message
                  }
                }
              }
            `,
          variables: { companyid : companyid },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblbusSalesPeople.map(({ repkey }) => ({
                        type: 'ProductRepsSelect',
                        id: repkey,
                      })),
                      { type: 'ProductRepsSelect', id: 'LIST' },
                    ]
                  : [{ type: 'ProductRepsSelect', id: 'LIST' }],
      
    }),



    }),
  });
  
  export const {
    useGetProductProductRepsSelectQuery,
    useCreateProductProductRepsMutation,
    useUpdateProductProductRepsMutation,
    useDeleteProductProductRepsMutation,

    ///////////////// tblbus sales people
    useGetTblBusSalesPeopleAPIQuery,
  } = e4kTblProductProductRepsAPI;
