import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';

// GraphQL base query function
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
    
    return data;
    
  } catch (error) {
    return { error: { status: 500, data: error.message } };
  }
};

// Define the API for E4kTblbusaddresstypes
export const e4ktblAddressTypes = createApi({
  reducerPath: 'e4kAddressTypes',
  // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/customer/' }),
  baseQuery : graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Customer}),
  tagTypes: ['TblbusAddressTypeslist'],
  endpoints: (builder) => ({
    AddressTypes: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetBusAddressTypes($companyId: String!) {
              E4kTblbusaddresstypes(companyid: $companyId) {
                addresstypeid
                description
              }
            }
          `,
          variables: { companyId },
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.E4kTblbusaddresstypes.map(({ businessid }) => ({
                type: 'TblbusAddressTypeslist',
                id: businessid,
              })),
              { type: 'TblbusAddressTypeslist', id: 'LIST' },
            ]
          : [{ type: 'TblbusAddressTypeslist', id: 'LIST' }],

}),
  }),
});

// Export hooks for usage in functional components
export const { useAddressTypesQuery } = e4ktblAddressTypes;
