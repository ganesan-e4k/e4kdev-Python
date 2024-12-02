
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
      const errorData = await response.json();
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("cateygssjl2k32754277318472190022",data);
    return  data ;
    
  } catch (error) {
    return { error: { status: error.response?.status || 500, data: error.message } };
  }
};

export const e4ksupplierclassApi = createApi({
  reducerPath: 'e4ksupplierclassApi',
  // baseQuery: graphqlBaseQuery({ baseUrl:  'http://127.0.0.1:8000/supplier/' }),
  baseQuery : graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Supplier}),
  tagTypes: ['TblsupplierClass'],
  endpoints: (builder) => ({
    getSupplierClass: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetSupplierCategory2($companyId: String!) {
              E4kTblsupplierclass(companyid:$companyId) {
                className
                classid
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
              ...result.E4kTblsupplierclass.map(({ classid }) => ({
                type: 'TblsupplierClass',
                id: classid,
              })),
              { type: 'TblsupplierClass', id: 'LIST' },
            ]
          : [{ type: 'TblsupplierClass', id: 'LIST' }],

}),

    createSupplierClass: builder.mutation({
      query: ({ className, companyid }) => ({
        body: {
          query: gql`
            mutation CreateSupplierClass($className: String!, $companyid: String!) {
              E4kTblsupplierclasscreate(className: $className, companyid: $companyid) {
               success
               error
              }
            }
          `,
          variables: { className, companyid },
        },
      }),
      invalidatesTags: [{ type: 'TblsupplierClass', id: 'LIST' }],
    }),

    updateSupplierClass: builder.mutation({
      query: ({ classid, className }) => ({
        body: {
          query: gql`
            mutation UpdateSupplierClass($classid: Int!, $className: String!) {
              E4kTblsupplierclassupdate(classid: $classid, className: $className) {
               success
               error
              }
            }
          `,
          variables: { classid, className },
        },
      }),
      invalidatesTags: [{ type: 'TblsupplierClass', id: 'LIST' }],
    }),

    deleteSupplierClass: builder.mutation({
      query: ({ classid, companyid }) => ({
        body: {
          query: gql`
            mutation DeleteSupplierClass($classid: Int!, $companyid: String!) {
              E4kTblsupplierclassdelete(classid: $classid, companyid: $companyid) {
                success
              }
            }
          `,
          variables: { classid, companyid },
        },
      }),
      invalidatesTags: [{ type: 'TblsupplierClass', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetSupplierClassQuery,
  useCreateSupplierClassMutation,
  useUpdateSupplierClassMutation,
  useDeleteSupplierClassMutation,
} = e4ksupplierclassApi;
