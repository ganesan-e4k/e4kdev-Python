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

export const e4kTblsuppliercategory3 = createApi({
  reducerPath: 'e4kTblsuppliercategory3Api',
  // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/supplier/' }),
  baseQuery : graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Supplier}),
  tagTypes: ['e4kTblsupplierCategory3'],
  endpoints: (builder) => ({
    getSupplierCategory3: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetSupplierCategory3($companyId: String!) {
              E4kTblsuppliercategory3(companyid: $companyId) {
                category3id
                category3name
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
              ...result.E4kTblsuppliercategory3.map(({ category3id }) => ({
                type: 'e4kTblsupplierCategory3',
                id: category3id,
              })),
              { type: 'e4kTblsupplierCategory3', id: 'LIST' },
            ]
          : [{ type: 'e4kTblsupplierCategory3', id: 'LIST' }],

     }),
      createSupplierCategory3: builder.mutation({
        query: ({ category3name, companyid }) => ({
          body: {
            query: gql`
              mutation CreateSupplierCategory3($category3name: String!, $companyid: String!) {
                E4kTblsuppliercategory3create(category3name: $category3name, companyid: $companyid) {
                  success
                  error
                }
              }
            `,
            variables: { category3name, companyid },
          },
        }),
        invalidatesTags: [{ type: 'e4kTblsupplierCategory3', id: 'LIST' }],
      }),

      updateSupplierCategory3: builder.mutation({
        query: ({ category3id, category3name }) => ({
          body: {
            query: gql`
              mutation UpdateSupplierCategory3($category3id: Int!, $category3name: String!) {
                E4kTblsuppliercategory3update(category3id: $category3id, category3name: $category3name) {
                success
                error
                }
              }
            `,
            variables: { category3id, category3name },
          },
        }),
        invalidatesTags: [{ type: 'e4kTblsupplierCategory3', id: 'LIST' }],
      }),

      deleteSupplierCategory3: builder.mutation({
        query: ({ category3id, companyid }) => ({
          body: {
            query: gql`
              mutation DeleteSupplierCategory3($category3id: Int!, $companyid: String!) {
                E4kTblsuppliercategory3delete(category3id: $category3id, companyid: $companyid) {
                  success
                }
              }
            `,
            variables: { category3id, companyid },
          },
        }),
        invalidatesTags: [{ type: 'e4kTblsupplierCategory3', id: 'LIST' }],
      }),
  }),
});

export const {
  useGetSupplierCategory3Query,
  useCreateSupplierCategory3Mutation,
  useUpdateSupplierCategory3Mutation,
  useDeleteSupplierCategory3Mutation,

} = e4kTblsuppliercategory3;
