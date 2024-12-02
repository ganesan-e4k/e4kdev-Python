
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

export const e4kTblProductColours = createApi({
  reducerPath: 'e4kTblProductColours',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductColours'],
  endpoints: (builder) => ({
    getProductColours: builder.query({
      query: ({companyid}) => ({
        body: {
          query: gql`
            query ProductColours($companyid: String!) {
                e4kTblproductProductColours(companyid: $companyid) {
                    ... on CustomErrorType {
                    message
                    }
                    ... on E4K_TblproductColoursNode {
                    description
                    colourcode
                    colourid
                    companyid {
                        companyid
                    }
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
                      ...result.e4kTblproductProductColours.map(({ colourid }) => ({
                        type: 'ProductColours',
                        id: colourid,
                      })),
                      { type: 'ProductColours', id: 'LIST' },
                    ]
                  : [{ type: 'ProductColours', id: 'LIST' }],
      
    }),
    

    createProductColours: builder.mutation({
        query: ({companyid,colourid,description,colourcode }) => ({
          body: {
            query: gql`
              mutation CreateProductColours($companyid: String!,$colourid:String!,$description: String!,$colourcode:String!) {
                E4kTblproductProductcoloursCreate(companyid: $companyid,colourid:$colourid,description: $description,colourcode:$colourcode) {
                  colour
                }
              }
            `,
            variables: {companyid:companyid,colourid:colourid ,description:description ,colourcode:colourcode },
          },
        }),
        invalidatesTags: [{ type: 'ProductColours', id: 'LIST' }], // Optional: Invalidate cache tags
      }),
  
      updateProductColours: builder.mutation({
        query: ({companyid,colourid,description,colourcode}) => ({
          body: {
            query: gql`
              mutation UpdateProductColours($companyid: String!,$colourid:String!,$description: String!,$colourcode:String!) {
                E4kTblproductProductcoloursUpdate(companyid: $companyid,colourid:$colourid,description: $description,colourcode:$colourcode) {
                  colourId
                }
              }
            `,
            variables: {companyid:companyid,colourid:colourid ,description:description ,colourcode:colourcode},
          },
        }),
        invalidatesTags: (result, error, { colourid }) => [
          { type: 'ProductColours', id: colourid },
          { type: 'ProductColours', id: 'LIST' },
        ],
      }),
  
      deleteProductColours: builder.mutation({
        query: ({ colourid, companyid }) => ({
          body: {
            query: gql`
              mutation DeleteProductColours($colourid: String!, $companyid: String!) {
                E4kTblproductProductcoloursDelete(colourid: $colourid, companyid: $companyid) {
                  success
                }
              }
            `,
            variables: { colourid:colourid,companyid:companyid },
          },
        }),
        invalidatesTags: (result, error, { colourid }) => [
          { type: 'ProductColours', id: colourid },
          { type: 'ProductColours', id: 'LIST' },
        ],
      }),
    }),
  });
  
  export const {
    useGetProductColoursQuery,
    useCreateProductColoursMutation,
    useUpdateProductColoursMutation,
    useDeleteProductColoursMutation,
  } = e4kTblProductColours;
