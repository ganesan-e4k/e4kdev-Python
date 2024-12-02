
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

export const e4kTblProductPropertyTypes = createApi({
  reducerPath: 'e4kTblProductPropertyTypes',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductPropertyTypes'],
  endpoints: (builder) => ({
    getProductPropertyTypes: builder.query({
      query: ({companyid,propertyid}) => ({
        body: {
          query: gql`
            query ProductPropertyTypes($companyid: String!,$propertyid:Int) {
             e4kTblproductProductPropertyTypes(companyid: $companyid, propertyid: $propertyid) {
                    ... on E4K_TblproductPropertyTypesNode {
                    description
                    propertyid
                    isstatic
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
          variables: { companyid : companyid, propertyid: propertyid },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductPropertyTypes.map(({ propertyid }) => ({
                        type: 'ProductPropertyTypes',
                        id: propertyid,
                      })),
                      { type: 'ProductPropertyTypes', id: 'LIST' },
                    ]
                  : [{ type: 'ProductPropertyTypes', id: 'LIST' }],
      
    }),
    

    createProductPropertyTypes: builder.mutation({
        query: ({companyid ,description }) => ({
          body: {
            query: gql`
              mutation CreateProductPropertyTypes($companyid: String!,$description: String!) {
                E4kTblproductProductpropertytypesCreate( companyid: $companyid,description: $description) {
                  propertyType
                }
              }
            `,
            variables: {companyid:companyid, description:description },
          },
        }),
        invalidatesTags: [{ type: 'ProductPropertyTypes', id: 'LIST' }], // Optional: Invalidate cache tags
    }),
  
      updateProductPropertyTypes: builder.mutation({
        query: ({companyid,propertyid, description}) => ({
          body: {
            query: gql`
              mutation UpdateProductPropertyTypes($companyid: String!,$propertyid: Int!, $description: String!) {
                E4kTblproductProductpropertytypesUpdate( companyid: $companyid,propertyid: $propertyid, description: $description) {
                  propertyType
                }
              }
            `,
            variables: { companyid:companyid,propertyid:propertyid, description:description },
          },
        }),
        invalidatesTags: (result, error, { propertyid }) => [
          { type: 'ProductPropertyTypes', id: propertyid },
          { type: 'ProductPropertyTypes', id: 'LIST' },
        ],
      }),
  
      deleteProductPropertyTypes: builder.mutation({
        query: ({ propertyid, companyid }) => ({
          body: {
            query: gql`
              mutation DeleteProductPropertyTypes($propertyid: Int!, $companyid: String!) {
                E4kTblproductProductpropertytypesDelete(propertyid: $propertyid, companyid: $companyid) {
                  success
                }
              }
            `,
            variables: { propertyid:propertyid,companyid:companyid },
          },
        }),
        invalidatesTags: (result, error, { propertyid }) => [
          { type: 'ProductPropertyTypes', id: propertyid },
          { type: 'ProductPropertyTypes', id: 'LIST' },
        ],
      }),
    }),
  });
  
  export const {
    useGetProductPropertyTypesQuery,
    useCreateProductPropertyTypesMutation,
    useUpdateProductPropertyTypesMutation,
    useDeleteProductPropertyTypesMutation,
  } = e4kTblProductPropertyTypes;
