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
      throw new Error(`Network response was not ok`);
    }

    const data = await response.json();
    return  data ;
  } catch (error) {
    return { error: { status: 500, data: error.message } };
  }
};

export const e4kTblCustomerCategory3 = createApi({
  reducerPath: 'e4kTblCustomerCategory3',
  // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/customer/' }),
  baseQuery : graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Customer}),
  tagTypes: ['TblcustomerCategory3'],
  endpoints: (builder) => ({
    getCustomerCategory3: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetCustomerCategory3($companyId: String!) {
              E4KTblcustomercategory3(companyid: $companyId) {
                category3id
                category3name
                companyid {
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
              ...result.E4KTblcustomercategory3.map(({ category3id }) => ({
                type: 'TblcustomerCategory3',
                id: category3id,
              })),
              { type: 'TblcustomerCategory3', id: 'LIST' },
            ]
          : [{ type: 'TblcustomerCategory3', id: 'LIST' }],

}),

    createCustomerCategory3: builder.mutation({
      query: ({ category3name, companyid }) => ({
        body: {
          query: gql`
            mutation CreateCustomerCategory3($category3name: String!, $companyid: String!) {
              E4kCustomercategory3create(category3name: $category3name, companyid: $companyid) {
                success
                error
              }
            }
          `,
          variables: { category3name, companyid },
        },
      }),
      invalidatesTags: [{ type: 'TblcustomerCategory3', id: 'LIST' }],
    }),

    updateCustomerCategory3: builder.mutation({
      query: ({ category3id, category3name,companyid }) => ({
        body: {
          query: gql`
            mutation UpdateCustomerCategory3($category3id: Int!, $category3name: String!, $companyid :String!) {
              E4kCustomercategory3update(category3id: $category3id, category3name: $category3name, companyid :$companyid) {
               success
               error
              }
            }
          `,
          variables: { category3id, category3name,companyid },
        },
      }),
      invalidatesTags: [{ type: 'TblcustomerCategory3', id: 'LIST' }],
    }),

    deleteCustomerCategory3: builder.mutation({
      query: ({ category3id, companyid }) => ({
        body: {
          query: gql`
            mutation DeleteCustomerCategory3($category3id: Int!, $companyid: String!) {
              E4kCustomercategory3delete(category3id: $category3id, companyid: $companyid) {
                success
              }
            }
          `,
          variables: { category3id, companyid },
        },
      }),
      invalidatesTags: [{ type: 'TblcustomerCategory3', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCustomerCategory3Query,
  useCreateCustomerCategory3Mutation,
  useUpdateCustomerCategory3Mutation,
  useDeleteCustomerCategory3Mutation,
} = e4kTblCustomerCategory3;
