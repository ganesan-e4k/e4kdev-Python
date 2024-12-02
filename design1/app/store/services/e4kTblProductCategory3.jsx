
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

export const e4kTblProductCategory3 = createApi({
  reducerPath: 'e4kTblProductCategory3',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductCategory3'],
  endpoints: (builder) => ({
    getProductCategories3: builder.query({
      query: (companyid) => ({
        body: {
          query: gql`
            query GetProductCategories3($companyid: String!) {
              e4kTblproductProductCategory3(companyid: $companyid) {
                    ... on E4K_TblProductCategory3Node {
                    description
                    category3id
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
                      ...result.e4kTblproductProductCategory3.map(({ category3id }) => ({
                        type: 'ProductCategory3',
                        id: category3id,
                      })),
                      { type: 'ProductCategory3', id: 'LIST' },
                    ]
                  : [{ type: 'ProductCategory3', id: 'LIST' }],
      
    }),
    

    createProductCategory3: builder.mutation({
        query: ({companyid ,category }) => ({
          body: {
            query: gql`
              mutation CreateProductCategory3($category: String!, $companyid: String!) {
                E4kTblproductProductcategory3Create(category: $category, companyid: $companyid) {
                  category3id
                }
              }
            `,
            variables: {companyid:companyid, category:category },
          },
        }),
        invalidatesTags: [{ type: 'ProductCategory3', id: 'LIST' }], // Optional: Invalidate cache tags
      }),
  
      updateProductCategory3: builder.mutation({
        query: ({category3id,companyid, category}) => ({
          body: {
            query: gql`
              mutation UpdateProductCategory3($category3id: Int!, $category: String!, $companyid: String!) {
                E4kTblproductProductcategory3Update(category3id: $category3id, category: $category, companyid: $companyid) {
                  category3id
                }
              }
            `,
            variables: { category3id:category3id,companyid:companyid, category:category },
          },
        }),
        invalidatesTags: (result, error, { category3id }) => [
          { type: 'ProductCategory3', id: category3id },
          { type: 'ProductCategory3', id: 'LIST' },
        ],
      }),
  
      deleteProductCategory3: builder.mutation({
        query: ({ category3id, companyid }) => ({
          body: {
            query: gql`
              mutation DeleteProductCategory3($category3id: Int!, $companyid: String!) {
                E4kTblproductProductcategory3Delete(category3id: $category3id, companyid: $companyid) {
                  category3id
                }
              }
            `,
            variables: { category3id:category3id,companyid:companyid },
          },
        }),
        invalidatesTags: (result, error, { category3id }) => [
          { type: 'ProductCategory3', id: category3id },
          { type: 'ProductCategory3', id: 'LIST' },
        ],
      }),
    }),
  });
  
  export const {
    useGetProductCategories3Query,
    useCreateProductCategory3Mutation,
    useUpdateProductCategory3Mutation,
    useDeleteProductCategory3Mutation,
  } = e4kTblProductCategory3;
