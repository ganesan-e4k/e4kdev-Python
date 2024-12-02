// src/services/productCategory.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';

const baseUrl = 'https://your-graphql-endpoint.com/product';

export const productCategoryApi = createApi({
  reducerPath: 'productCategoryApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['ProductCategory'],
  endpoints: (builder) => ({
    getProductCategories: builder.query({
      query: (companyid) => ({
        document: gql`
          query MyQuery($companyid: String!) {
            e4kTblproductProductCategory1(companyid: $companyid) {
              ... on E4K_TblProductCategory1Node {
                description
                imagepath
                category1id
              }
              ... on CustomErrorType {
                message
              }
            }
          }
        `,
        variables: { companyid },
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
    createProductCategory: builder.mutation({
      query: ({ category, companyid, imagePath }) => ({
        document: gql`
          mutation MyMutation($category: String!, $companyid: String!, $imagePath: String!) {
            E4KTblproductProductcategory1Create(
              category: $category,
              companyid: $companyid, 
              imagePath: $imagePath
            ) {
              category1id
            }
          }
        `,
        variables: { category, companyid, imagePath },
      }),
      invalidatesTags: [{ type: 'ProductCategory', id: 'LIST' }],
    }),
    updateProductCategory: builder.mutation({
      query: ({ category1id, category, companyid, imagePath }) => ({
        document: gql`
          mutation MyMutation($category1id: ID!, $category: String!, $companyid: String!, $imagePath: String!) {
            E4KTblproductProductcategory1Update(
              category1id: $category1id,
              category: $category,
              companyid: $companyid, 
              imagePath: $imagePath
            ) {
              category1id
            }
          }
        `,
        variables: { category1id, category, companyid, imagePath },
      }),
      invalidatesTags: (result, error, { category1id }) => [
        { type: 'ProductCategory', id: category1id },
        { type: 'ProductCategory', id: 'LIST' },
      ],
    }),
    deleteProductCategory: builder.mutation({
      query: ({ category1id, companyid }) => ({
        document: gql`
          mutation MyMutation($category1id: ID!, $companyid: String!) {
            E4KTblproductProductcategory1Delete(
              category1id: $category1id,
              companyid: $companyid
            ) {
              category1id
            }
          }
        `,
        variables: { category1id, companyid },
      }),
      invalidatesTags: (result, error, { category1id }) => [
        { type: 'ProductCategory', id: category1id },
        { type: 'ProductCategory', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetProductCategoriesQuery,
  useCreateProductCategoryMutation,
  useUpdateProductCategoryMutation,
  useDeleteProductCategoryMutation,
} = productCategoryApi;
