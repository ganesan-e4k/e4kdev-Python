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
    return  data  ;
    
  } catch (error) {
    return { error: { status: 500, data: error.message } };
  }
};

export const e4kTblCountry = createApi({
  reducerPath: 'e4kCountryApi',
  // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/customer/' }),
  baseQuery : graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Customer}),
  tagTypes: ['e4ktblCountry'],
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetCountries($companyId: String!) {
              E4kCountry(companyid: $companyId) {
                country
                countryid
                companyid {
                  companyid
                }
                member {
                  groupName
                  groupid
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
              ...result.E4kCountry.map(({ countryid }) => ({
                type: 'e4ktblCountry',
                id: countryid,
              })),
              { type: 'e4ktblCountry', id: 'LIST' },
            ]
          : [{ type: 'e4ktblCountry', id: 'LIST' }],

    }),

    getGroupNames: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetGroupNames($companyId: String!) {
              E4kCountryMember(companyid: $companyId) {
                groupName
                groupid
              }
            }
          `,
          variables: { companyId },
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.E4kCountryMember.map(({ groupid }) => ({
                type: 'e4ktblCountry',
                id: groupid,
              })),
              { type: 'e4ktblCountry', id: 'LIST' },
            ]
          : [{ type: 'e4ktblCountry', id: 'LIST' }],

    }),

    createCountry: builder.mutation({
      query: ({ companyid, member, country }) => ({
        body: {
          query: gql`
            mutation CreateCountry($companyid: String!, $member: Int!, $country: String!) {
              E4kCountrycreate(companyid: $companyid, member: $member, country: $country) {
                error
                success
               
              }
            }
          `,
          variables: { companyid, member, country },
        },
      }),
      invalidatesTags: [{ type: 'e4ktblCountry', id: 'LIST' }],
    }),

    updateCountry: builder.mutation({
      query: ({ companyid, country, countryid, member }) => ({
        body: {
          query: gql`
            mutation UpdateCountry($companyid: String!, $country: String!, $countryid: Int!, $member: Int!) {
              E4kCountryupdate(companyid: $companyid, country: $country, countryid: $countryid, member: $member) {
                error
                success
               
              }
            }
          `,
          variables: { companyid, country, countryid, member },
        },
      }),
      invalidatesTags: [{ type: 'e4ktblCountry', id: 'LIST' }],
    }),

    deleteCountry: builder.mutation({
      query: ({ companyid, countryid }) => ({
        body: {
          query: gql`
            mutation DeleteCountry($companyid: String!, $countryid: Int!) {
              E4kCountrydelete(companyid: $companyid, countryid: $countryid) {
                success
              }
            }
          `,
          variables: { companyid, countryid },
        },
      }),
      invalidatesTags: [{ type: 'e4ktblCountry', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useGetGroupNamesQuery,
  useCreateCountryMutation,
  useUpdateCountryMutation,
  useDeleteCountryMutation,
} = e4kTblCountry;
