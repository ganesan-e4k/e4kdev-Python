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

export const e4kcustomerClass = createApi({
  reducerPath: 'e4kcustomerClass',
   baseQuery : graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Customer}),
  tagTypes: ['e4kCustomerClass'],
  endpoints: (builder) => ({
    getCustomerClass: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetCustomerClass($companyId: String!) {
              E4kCustomerclass(companyid: $companyId) {
                classid
                className
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
              ...result.E4kCustomerclass.map(({ classid }) => ({
                type: 'e4kCustomerClass',
                id: classid,
              })),
              { type: 'e4kCustomerClass', id: 'LIST' },
            ]
          : [{ type: 'e4kCustomerClass', id: 'LIST' }],

}),


    createCustomerClass: builder.mutation({
      query: ({ className, companyid }) => ({
        body: {
          query: gql`
            mutation CreateCustomerClass($className: String!, $companyid: String!) {
              E4kCustomerclasscreate(className: $className, companyid: $companyid) {
               success
               error
              }
            }
          `,
          variables: { className, companyid },
        },
      }),
      invalidatesTags: [{ type: 'e4kCustomerClass', id: 'LIST' }],
    }),

    updateCustomerClass: builder.mutation({
      query: ({ classid, className,companyid }) => ({
        body: {
          query: gql`
            mutation UpdateCustomerClass($classid: Int!, $className: String! $companyid: String!) {
              E4kCustomerclassupdate(classid: $classid, className: $className, companyid: $companyid) {
               success
               error
              }
            }
          `,
          variables: { classid, className,companyid },
        },
      }),
      invalidatesTags: [{ type: 'e4kCustomerClass', id: 'LIST' }],
    }),

    deleteCustomerClass: builder.mutation({
      query: ({ classid, companyid }) => ({
        body: {
          query: gql`
            mutation DeleteCustomerClass($classid: Int!, $companyid: String!) {
              E4KCustomerclassdelete(classid: $classid, companyid: $companyid) {
                success
              }
            }
          `,
          variables: { classid, companyid },
        },
      }),
      invalidatesTags: [{ type: 'e4kCustomerClass', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCustomerClassQuery,
  useCreateCustomerClassMutation,
  useUpdateCustomerClassMutation,
  useDeleteCustomerClassMutation,
} = e4kcustomerClass;
