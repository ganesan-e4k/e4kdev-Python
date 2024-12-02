import { createApi } from '@reduxjs/toolkit/query/react';
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
   
    return  data ;
    
  } catch (error) {
    return { error: { status: 500, data: error.message } };
  }
};

export const e4kTblsuppliercategory2 = createApi({
  reducerPath: 'e4kTblsuppliercategory2Api',
  // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/supplier/' }),
  baseQuery : graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Supplier}),
  tagTypes: ['e4kTblsupplierCategory2'],
  endpoints: (builder) => ({
    getSupplierCategory2: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetSupplierCategory2($companyId: String!) {
              E4kTblsuppliercategory2(companyid: $companyId) {
                category2id
                category2name
                companyid{
                companyid
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
              ...result.E4kTblsuppliercategory2.map(({ category2id }) => ({
                type: 'e4kTblsupplierCategory2',
                id: category2id,
              })),
              { type: 'e4kTblsupplierCategory2', id: 'LIST' },
            ]
          : [{ type: 'e4kTblsupplierCategory2', id: 'LIST' }],

     }),
      createSupplierCategory2: builder.mutation({
        query: ({ category2name, companyid }) => ({
          body: {
            query: gql`
              mutation CreateCustomerCategory2($category2name: String!, $companyid: String!) {
                E4kTblsuppliercategory2create(category2name: $category2name, companyid: $companyid) {
                  success
                  error
                }
              }
            `,
            variables: { category2name, companyid },
          },
        }),
        invalidatesTags: [{ type: 'e4kTblsupplierCategory2', id: 'LIST' }],
      }),

      updateSupplierCategory2: builder.mutation({
        query: ({ category2id, category2name }) => ({
          body: {
            query: gql`
              mutation UpdateSupplierCategory2($category2id: Int!, $category2name: String!) {
                E4kTblsuppliercategory2update(category2id: $category2id, category2name: $category2name) {
                  success
                  error
                }
              }
            `,
            variables: { category2id, category2name },
          },
        }),
        invalidatesTags: [{ type: 'e4kTblsupplierCategory2', id: 'LIST' }],
      }),

      deleteSupplierCategory2: builder.mutation({
        query: ({ category2id, companyid }) => ({
          body: {
            query: gql`
              mutation DeleteSupplierrCategory2($category2id: Int!, $companyid: String!) {
                E4kTblsuppliercategory2delete(category2id: $category2id, companyid: $companyid) {
                  success
                }
              }
            `,
            variables: { category2id, companyid },
          },
        }),
        invalidatesTags: [{ type: 'e4kTblsupplierCategory2', id: 'LIST' }],
      }),
  }),
});

export const {
  useGetSupplierCategory2Query,
  useCreateSupplierCategory2Mutation,
  useUpdateSupplierCategory2Mutation,
  useDeleteSupplierCategory2Mutation,
} = e4kTblsuppliercategory2;
