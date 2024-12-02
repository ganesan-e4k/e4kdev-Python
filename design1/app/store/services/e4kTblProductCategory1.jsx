
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

export const e4kTblProductCategory1 = createApi({
  reducerPath: 'e4kTblProductCategory1',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductCategory'],
  endpoints: (builder) => ({
    getProductCategories1: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetProductCategories($companyId: String!) {
              e4kTblproductProductCategory1(companyid: $companyId) {
                ... on E4K_TblProductCategory1Node {
                  description
                  imagepath
                  category1id
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
          variables: { companyId },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductCategory1.map(({ category1id }) => ({
                        type: 'ProductCategory',
                        id: category1id,
                      })),
                      { type: 'ProductCategory', id: 'LIST' },
                    ]
                  : [{ type: 'ProductCategory', id: 'LIST' }],
      
    }),
    

    createProductCategory1: builder.mutation({
        query: ({companyid ,category ,imagePath,filename}) => ({
          body: {
            query: gql`
              mutation CreateProductCategory($category: String!, $companyid: String!, $imagePath: String!, $filename: String!) {
                E4KTblproductProductcategory1Create(category: $category, companyid: $companyid, imagePath: $imagePath,filename: $filename) {
                  category1id
                  message
                }
              }
            `,
            variables: {companyid:companyid, category:category, imagePath:imagePath,filename:filename },
          },
        }),
        invalidatesTags: [{ type: 'ProductCategory', id: 'LIST' }], // Optional: Invalidate cache tags
      }),
  
      updateProductCategory1: builder.mutation({
        query: ({category1id,companyid, category, imagePath,filename}) => ({
          body: {
            query: gql`
              mutation UpdateProductCategory($category1id: Int!, $category: String!, $companyid: String!, $imagePath: String!,$filename: String!) {
                E4KTblproductProductcategory1Update(category1id: $category1id, category: $category, companyid: $companyid,imagePath: $imagePath, filename: $filename) {
                  category1id
                  message
                }
              }
            `,
            variables: { category1id:category1id,companyid:companyid, category:category, imagePath:imagePath,filename:filename },
          },
        }),
        invalidatesTags: (result, error, { category1id }) => [
          { type: 'ProductCategory', id: category1id },
          { type: 'ProductCategory', id: 'LIST' },
        ],
      }),
  
      deleteProductCategory1: builder.mutation({
        query: ({ category1id, companyid }) => ({
          body: {
            query: gql`
              mutation DeleteProductCategory($category1id: Int!, $companyid: String!) {
                E4KTblproductProductcategory1Delete(category1id: $category1id, companyid: $companyid) {
                  category1id
                  message
                }
              }
            `,
            variables: { category1id:category1id,companyid:companyid },
          },
        }),
        invalidatesTags: (result, error, { category1id }) => [
          { type: 'ProductCategory', id: category1id },
          { type: 'ProductCategory', id: 'LIST' },
        ],
      }),
    }),
  });
  
  export const {
    useGetProductCategories1Query,
    useCreateProductCategory1Mutation,
    useUpdateProductCategory1Mutation,
    useDeleteProductCategory1Mutation,
  } = e4kTblProductCategory1;
