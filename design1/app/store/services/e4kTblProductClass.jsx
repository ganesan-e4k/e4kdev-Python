
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

export const e4kTblProductClass = createApi({
  reducerPath: 'e4kTblProductClass',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductClass'],
  endpoints: (builder) => ({
    getProductClass: builder.query({
      query: (companyid) => ({
        body: {
          query: gql`
            query GetProductClass($companyid: String!) {
              e4kTblproductProductClass(companyid: $companyid) {
                    ... on CustomErrorType {
                    message
                    }
                    ... on E4K_TblProductClassNode {
                    description
                    classid
                    companyid {
                        companyid
                    }
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
                      ...result.e4kTblproductProductClass.map(({ classid }) => ({
                        type: 'ProductClass',
                        id: classid,
                      })),
                      { type: 'ProductClass', id: 'LIST' },
                    ]
                  : [{ type: 'ProductClass', id: 'LIST' }],
      
    }),
    

    createProductClass: builder.mutation({
        query: ({companyid ,className }) => ({
          body: {
            query: gql`
              mutation CreateProductClass($className: String!, $companyid: String!) {
                E4kTblproductProductclassCreate(className: $className, companyid: $companyid) {
                  class_
                }
              }
            `,
            variables: {companyid:companyid, className:className },
          },
        }),
        invalidatesTags: [{ type: 'ProductClass', id: 'LIST' }], // Optional: Invalidate cache tags
      }),
  
      updateProductClass: builder.mutation({
        query: ({classid,companyid, description}) => ({
          body: {
            query: gql`
              mutation UpdateProductClass($classid: Int!, $description: String!, $companyid: String!) {
                E4kTblproductProductclassUpdate(classid: $classid, description: $description, companyid: $companyid) {
                  classId
                }
              }
            `,
            variables: { classid:classid,companyid:companyid, description:description },
          },
        }),
        invalidatesTags: (result, error, { classid }) => [
          { type: 'ProductClass', id: classid },
          { type: 'ProductClass', id: 'LIST' },
        ],
      }),
  
      deleteProductClass: builder.mutation({
        query: ({ classid, companyid }) => ({
          body: {
            query: gql`
              mutation DeleteProductClass($classid: Int!, $companyid: String!) {
                E4kTblproductProductclassDelete(classid: $classid, companyid: $companyid) {
                  success
                }
              }
            `,
            variables: { classid:classid,companyid:companyid },
          },
        }),
        invalidatesTags: (result, error, { classid }) => [
          { type: 'ProductClass', id: classid },
          { type: 'ProductClass', id: 'LIST' },
        ],
      }),
    }),
  });
  
  export const {
    useGetProductClassQuery,
    useCreateProductClassMutation,
    useUpdateProductClassMutation,
    useDeleteProductClassMutation,
  } = e4kTblProductClass;
