
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

export const e4kTblProductCategory2 = createApi({
  reducerPath: 'e4kTblProductCategory2',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductCategory2'],
  endpoints: (builder) => ({
    getProductCategories2: builder.query({
      query: (companyid) => ({
        body: {
          query: gql`
            query GetProductCategories2($companyid: String!) {
              e4kTblproductProductCategory2(companyid: $companyid) {
                    ... on E4K_TblProductCategory2Node {
                    description
                    imagepath
                    category2id
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
                      ...result.e4kTblproductProductCategory2.map(({ category2id }) => ({
                        type: 'ProductCategory2',
                        id: category2id,
                      })),
                      { type: 'ProductCategory2', id: 'LIST' },
                    ]
                  : [{ type: 'ProductCategory2', id: 'LIST' }],
      
    }),
    

    createProductCategory2: builder.mutation({
        query: ({companyid ,category ,imagePath,filename}) => ({
          body: {
            query: gql`
              mutation CreateProductCategory2($category: String!, $companyid: String!, $imagePath: String!,$filename: String!) {
                E4KTblproductProductcategory2Create(category: $category, companyid: $companyid, imagePath: $imagePath,filename: $filename) {
                  category2id
                }
              }
            `,
            variables: {companyid:companyid, category:category, imagePath:imagePath,filename:filename },
          },
        }),
        invalidatesTags: [{ type: 'ProductCategory2', id: 'LIST' }], // Optional: Invalidate cache tags
      }),
  
      updateProductCategory2: builder.mutation({
        query: ({category2id,companyid, category, imagePath,filename}) => ({
          body: {
            query: gql`
              mutation UpdateProductCategory2($category2id: Int!, $category: String!, $companyid: String!, $imagePath: String!,$filename: String!) {
                E4KTblproductProductcategory2Update(category2id: $category2id, category: $category, companyid: $companyid, imagePath: $imagePath,filename: $filename) {
                  category2id
                }
              }
            `,
            variables: { category2id:category2id,companyid:companyid, category:category, imagePath:imagePath,filename:filename  },
          },
        }),
        invalidatesTags: (result, error, { category2id }) => [
          { type: 'ProductCategory2', id: category2id },
          { type: 'ProductCategory2', id: 'LIST' },
        ],
      }),
  
      deleteProductCategory2: builder.mutation({
        query: ({ category2id, companyid }) => ({
          body: {
            query: gql`
              mutation DeleteProductCategory2($category2id: Int!, $companyid: String!) {
                E4kTblproductProductcategory2Delete(category2id: $category2id, companyid: $companyid) {
                  category2id
                }
              }
            `,
            variables: { category2id:category2id,companyid:companyid },
          },
        }),
        invalidatesTags: (result, error, { category2id }) => [
          { type: 'ProductCategory2', id: category2id },
          { type: 'ProductCategory2', id: 'LIST' },
        ],
      }),
    }),
  });
  
  export const {
    useGetProductCategories2Query,
    useCreateProductCategory2Mutation,
    useUpdateProductCategory2Mutation,
    useDeleteProductCategory2Mutation,
  } = e4kTblProductCategory2;
