
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

export const e4kTblProductUnitOfIssue = createApi({
  reducerPath: 'e4kTblProductUnitOfIssue',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductUnitOfIssue'],
  endpoints: (builder) => ({
    getProductUnitOfIssue: builder.query({
      query: ({companyid,issueUnits}) => ({
        body: {
          query: gql`
            query ProductUnitOfIssue($companyid: String!,$issueUnits:Int) {
                e4kTblproductProductUnitofissue(issueUnits: $issueUnits, companyid: $companyid) {
                    ... on CustomErrorType {
                    message
                    }
                    ... on E4K_TblproductUnitofissueNode {
                    description
                    issueUnits
                    companyid {
                        companyid
                    }
                    }
                }         
            }
          `,
          variables: { companyid : companyid, issueUnits: issueUnits },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductUnitofissue.map(({ issueUnits }) => ({
                        type: 'ProductUnitOfIssue',
                        id: issueUnits,
                      })),
                      { type: 'ProductUnitOfIssue', id: 'LIST' },
                    ]
                  : [{ type: 'ProductUnitOfIssue', id: 'LIST' }],
      
    }),
    

    createProductUnitOfIssue: builder.mutation({
        query: ({companyid ,description}) => ({
          body: {
            query: gql`
              mutation CreateProductUnitOfIssue($companyid: String!,$description: String!) {
                E4kTblproductProductunitofissueCreate(companyid: $companyid,description: $description) {
                  unitOfIssue
                }
              }
            `,
            variables: {companyid:companyid, description:description },
          },
        }),
        invalidatesTags: [{ type: 'ProductUnitOfIssue', id: 'LIST' }], // Optional: Invalidate cache tags
      }),
  
      updateProductUnitOfIssue: builder.mutation({
        query: ({companyid,description,issueUnits}) => ({
          body: {
            query: gql`
              mutation UpdateProductUnitOfIssue($companyid: String!,$issueUnits: Int!, $description: String!) {
                E4kTblproductProductunitofissueUpdate( companyid: $companyid,issueUnits: $issueUnits, description: $description) {
                  unitOfIssue
                }
              }
            `,
            variables: { companyid:companyid,issueUnits:issueUnits, description:description },
          },
        }),
        invalidatesTags: (result, error, { issueUnits }) => [
          { type: 'ProductUnitOfIssue', id: issueUnits },
          { type: 'ProductUnitOfIssue', id: 'LIST' },
        ],
      }),
  
      deleteProductUnitOfIssue: builder.mutation({
        query: ({ issueUnits, companyid }) => ({
          body: {
            query: gql`
              mutation DeleteProductUnitOfIssue($issueUnits: Int!, $companyid: String!) {
                E4kTblproductProductunitofissueDelete(issueUnits: $issueUnits, companyid: $companyid) {
                  success
                }
              }
            `,
            variables: { issueUnits:issueUnits,companyid:companyid },
          },
        }),
        invalidatesTags: (result, error, { issueUnits }) => [
          { type: 'ProductUnitOfIssue', id: issueUnits },
          { type: 'ProductUnitOfIssue', id: 'LIST' },
        ],
      }),
    }),
  });
  
  export const {
    useGetProductUnitOfIssueQuery,
    useCreateProductUnitOfIssueMutation,
    useUpdateProductUnitOfIssueMutation,
    useDeleteProductUnitOfIssueMutation,
  } = e4kTblProductUnitOfIssue;
