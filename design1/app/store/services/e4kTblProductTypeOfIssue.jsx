
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

export const e4kTblProductTypeOfIssue = createApi({
  reducerPath: 'e4kTblProductTypeOfIssue',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductTypeOfIssue'],
  endpoints: (builder) => ({
    getProductTypeOfIssue: builder.query({
      query: ({companyid,issueType}) => ({
        body: {
          query: gql`
            query ProductTypeOfIssue($companyid: String!,$issueType:Int) {
             e4kTblproductProductTypeofissue(companyid: $companyid, issueType: $issueType) {
                    ... on E4K_TblproductTypeofissueNode {
                    description
                    issueType
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
          variables: { companyid : companyid, issueType: issueType },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductTypeofissue.map(({ issueType }) => ({
                        type: 'ProductTypeOfIssue',
                        id: issueType,
                      })),
                      { type: 'ProductTypeOfIssue', id: 'LIST' },
                    ]
                  : [{ type: 'ProductTypeOfIssue', id: 'LIST' }],
      
    }),
    

    createProductTypeOfIssue: builder.mutation({
        query: ({companyid ,description}) => ({
          body: {
            query: gql`
              mutation CreateProductTypeOfIssue($companyid: String!,$description: String!) {
                E4kTblproductProducttypeofissueCreate(companyid: $companyid,description: $description) {
                  typeOfIssue
                }
              }
            `,
            variables: {companyid:companyid, description:description },
          },
        }),
        invalidatesTags: [{ type: 'ProductTypeOfIssue', id: 'LIST' }], // Optional: Invalidate cache tags
      }),
  
      updateProductTypeOfIssue: builder.mutation({
        query: ({companyid,description,issueType}) => ({
          body: {
            query: gql`
              mutation UpdateProductTypeOfIssue($companyid: String!,$issueType: Int!, $description: String!) {
                E4kTblproductProducttypeofissueUpdate( companyid: $companyid,issueType: $issueType, description: $description) {
                  typeOfIssue
                }
              }
            `,
            variables: { companyid:companyid,issueType:issueType, description:description },
          },
        }),
        invalidatesTags: (result, error, { typeOfIssue }) => [
          { type: 'ProductTypeOfIssue', id: typeOfIssue },
          { type: 'ProductTypeOfIssue', id: 'LIST' },
        ],
      }),
  
      deleteProductTypeOfIssue: builder.mutation({
        query: ({ issueType, companyid }) => ({
          body: {
            query: gql`
              mutation DeleteProductTypeOfIssue($issueType: Int!, $companyid: String!) {
                E4kTblproductProducttypeofissueDelete(issueType: $issueType, companyid: $companyid) {
                  success
                }
              }
            `,
            variables: { issueType:issueType,companyid:companyid },
          },
        }),
        invalidatesTags: (result, error, { issueType }) => [
          { type: 'ProductTypeOfIssue', id: issueType },
          { type: 'ProductTypeOfIssue', id: 'LIST' },
        ],
      }),
    }),
  });
  
  export const {
    useGetProductTypeOfIssueQuery,
    useCreateProductTypeOfIssueMutation,
    useUpdateProductTypeOfIssueMutation,
    useDeleteProductTypeOfIssueMutation,
  } = e4kTblProductTypeOfIssue;
