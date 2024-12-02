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

export const e4kTblCurrency = createApi({
  reducerPath: 'e4ktblCurrencyApi',
  // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/customer/' }),
  baseQuery : graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Customer}),
  tagTypes: ['e4ktblCurrency'],
  endpoints: (builder) => ({
    getCurrencies: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetCurrencies($companyId: String!) {
              E4kCurrency(companyid: $companyId) {
                currencyCode
                currencyName
                currencySymbol
                isocode
                currencyExchangeRate
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
              ...result.E4kCurrency.map(({ currencyCode }) => ({
                type: 'e4ktblCurrency',
                id: currencyCode,
              })),
              { type: 'e4ktblCurrency', id: 'LIST' },
            ]
          : [{ type: 'e4ktblCurrency', id: 'LIST' }],

    }),


    createCurrency: builder.mutation({
      query: ({ companyid, currencyExchangeRate, isocode, currencySymbol, currencyName }) => ({
        body: {
          query: gql`
            mutation CreateCurrency($companyid: String!, $currencyExchangeRate: Decimal!, $isocode: String!, $currencySymbol: String!, $currencyName: String!) {
              E4kCurrencycreate(companyid: $companyid, currencyExchangeRate: $currencyExchangeRate, isocode: $isocode, currencySymbol: $currencySymbol, currencyName: $currencyName) {
                error
                success
              }
            }
          `,
          variables: { companyid, currencyExchangeRate, isocode, currencySymbol, currencyName },
        },
      }),
      invalidatesTags: [{ type: 'e4ktblCurrency', id: 'LIST' }],
    }),

    updateCurrency: builder.mutation({
      query: ({ currencyCode, companyid, currencyName, currencyExchangeRate, currencySymbol, isocode }) => ({
        body: {
          query: gql`
            mutation UpdateCurrency($currencyCode: Int!, $companyid: String!, $currencyName: String!, $currencyExchangeRate: Decimal!, $currencySymbol: String!, $isocode: String!) {
              E4kCurrencyupdate(currencyCode: $currencyCode, companyid: $companyid, currencyName: $currencyName, currencyExchangeRate: $currencyExchangeRate, currencySymbol: $currencySymbol, isocode: $isocode) {
                error
                success
                
              }
            }
          `,
          variables: { currencyCode, companyid, currencyName, currencyExchangeRate, currencySymbol, isocode },
        },
      }),
      invalidatesTags: [{ type: 'e4ktblCurrency', id: 'LIST' }],
    }),

    deleteCurrency: builder.mutation({
      query: ({ companyid, currencyCode }) => ({
        body: {
          query: gql`
            mutation DeleteCurrency($companyid: String!, $currencyCode: Int!) {
              E4KCurrencydelete(companyid: $companyid, currencyCode: $currencyCode) {
                success
              }
            }
          `,
          variables: { companyid, currencyCode },
        },
      }),
      invalidatesTags: [{ type: 'e4ktblCurrency', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCurrenciesQuery,
  useCreateCurrencyMutation,
  useUpdateCurrencyMutation,
  useDeleteCurrencyMutation,
} = e4kTblCurrency;
