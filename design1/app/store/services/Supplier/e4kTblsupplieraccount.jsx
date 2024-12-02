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
    return data;
  } catch (error) {
    return { error: { status: 500, data: error.message } };
  }
};

export const e4kTblsupplierAccount = createApi({
  reducerPath: 'e4ktblsupplierAccountApi',
  // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/supplier/' }),
  baseQuery : graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Supplier}),
  tagTypes: ['e4kTblsupplierAccount'],
  endpoints: (builder) => ({
    getSupplierAccount: builder.query({
      query: ({ companyid, businessid }) => ({
        body: {
          query: gql`
            query GetE4kSupplieraccount($businessid: String!, $companyid: String!) {
              E4kTblsupplieraccount(businessid: $businessid, companyid: $companyid) {
                bankAccountName
                bankAccountNum
                bankSortCode
                bankName
                creditLimit
                dateOpened
                dateUsed
                discount
                vatflag
                vatno
                vatcode {
                  description
                  sagecode
                }
                paymenttermsid {
                  description
                  paymenttermsid
                }
                
                currencyCode {
                  currencyName
                 
                  }
              }
            }
          `,
          variables: { companyid, businessid },
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.E4kTblsupplieraccount.map(({ businessid }) => ({
                type: 'e4kTblsupplierAccount',
                id: businessid,
              })),
              { type: 'e4kTblsupplierAccount', id: 'LIST' },
            ]
          : [{ type: 'e4kTblsupplierAccount', id: 'LIST' }],
    }),
    updateSupplierAccount:builder.mutation({
      query: ({
        bankAccountName, 
        bankAccountNum, 
        bankName, 
        bankSortCode, 
        businessid, 
        companyid, 
        creditLimit, 
        currencyCode, 
        discount, 
        paymenttermsid, 
        vatcode, 
        vatflag, 
        vatno,
        dateOpened,
        dateUsed,
        nominalCode
      }) => ({
        body: {
          query: gql`
            mutation E4kTblsupplieraccountupdate(
              $bankAccountName: String!,
              $bankAccountNum: Int!,
              $bankName: String!,
              $bankSortCode: String!,
              $businessid: String!,
              $companyid: String!,
              $creditLimit: Decimal!,
              $currencyCode: Int!,
              $discount: Int!,
              $paymenttermsid: String!,
              $vatcode: Int!,
              $vatflag: String!,
              $vatno: String!,
              $dateOpened: String!,
              $dateUsed: String!
              $nominalCode: String!
            ) {
              E4kTblsupplieraccountupdate(
                bankAccountName: $bankAccountName,
                bankAccountNum: $bankAccountNum,
                bankName: $bankName,
                bankSortCode: $bankSortCode,
                businessid: $businessid,
                companyid: $companyid,
                creditLimit: $creditLimit,
                currencyCode: $currencyCode,
                discount: $discount,
                paymenttermsid: $paymenttermsid,
                vatcode: $vatcode,
                vatflag: $vatflag,
                vatno: $vatno,
                dateOpened: $dateOpened,
                dateUsed: $dateUsed
                nominalCode: $nominalCode
              ) {
                success
                error
              }
            }
          `,
          variables: {
            bankAccountName, 
            bankAccountNum, 
            bankName, 
            bankSortCode, 
            businessid, 
            companyid, 
            creditLimit, 
            currencyCode, 
            discount, 
            paymenttermsid, 
            vatcode, 
            vatflag, 
            vatno,
            dateOpened,
            dateUsed,
            nominalCode
          },
        },
      }),
      invalidatesTags: ['e4kTblsupplierAccount'],
    }),
    createSupplierAccount: builder.mutation({
          query: ({
            bankAccountName,
            bankAccountNum,
            bankSortCode,
            bankName,
            businessid,
            companyid,
            creditLimit,
            currencyCode,
            discount,
            paymenttermsid,
            nominalCode,
            vatcode,
            vatflag,
            vatno,
          }) => ({
            body: {
              query: gql`
                mutation {
                  E4kTblsupplieraccountcreate(
                    bankAccountName: "${bankAccountName}",
                    bankAccountNum: ${bankAccountNum},
                    bankSortCode: "${bankSortCode}",
                    bankName: "${bankName}",
                    businessid: "${businessid}",
                    companyid: "${companyid}",
                    creditLimit: "${creditLimit}",
                    currencyCode: ${currencyCode},
                    discount: ${discount},
                    paymenttermsid: "${paymenttermsid}",
                    nominalCode: "${nominalCode}",
                    vatcode: ${vatcode},
                    vatflag: "${vatflag}",
                    vatno: "${vatno}"
                  ) {
                    success
                    error
                  }
                }
              `,
            },
          }),
          invalidatesTags: ['e4kTblsupplierAccount'],
        }),
    
  }),
});

export const { useUpdateSupplierAccountMutation,useGetSupplierAccountQuery,useCreateSupplierAccountMutation  } = e4kTblsupplierAccount;


