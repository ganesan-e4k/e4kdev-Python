
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
   
    return data;
    
  } catch (error) {
    return { error: { status: 500, data: error.message } };
  }
};

export const e4kTblcustomeraccountApi = createApi({
  reducerPath: 'e4kTblcustomeraccountApi',
  // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/customer/' }),
  baseQuery :  graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Customer}),
  tagTypes: ['TblcustomerAccount'],
  endpoints: (builder) => ({
    getCustomerAccount: builder.query({
      query: ({businessid}) => ({
        body: {
          query: gql`
            query GetCustomerAccount($businessid: String!) {
              E4kTblcustomeraccount(businessid: $businessid) {
                creditLimit
                dateOpened
                dateUsed
                discount
                repComission
                vatflag
                vatno
                repid {
                  forename
                  surname
                }
                vatcode {
                  description
                }
                currencyCode {
                  currencyName
                }
                paymenttermsid {
                  description
                }
              }
            }
          `,
          variables: { businessid },
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.E4kTblcustomeraccount.map(({ businessid }) => ({
                type: 'TblcustomerAccount',
                id: businessid,
              })),
              { type: 'TblcustomerAccount', id: 'LIST' },
            ]
          : [{ type: 'TblcustomerAccount', id: 'LIST' }],

}),
    createCustomerAccount: builder.mutation({
      query: ({
        businessid,
        companyid,
        creditLimit,
        currencyCode,
        discount,
        paymenttermsid,
        repComission,
        repid,
        vatcode,
        vatflag,
        vatno
      }) => ({
        body: {
          query: gql`
            mutation CreateCustomerAccount(
              $businessid: String!,
              $companyid: String!,
              $creditLimit: Decimal!,
              $currencyCode: Int!,
              $discount: Decimal,
              $paymenttermsid: Int!,
              $repComission: Decimal,
              $repid: Int!,
              $vatcode: Int!,
              $vatflag: String,
              $vatno: String
            ) {
              E4kCustomeraccountcreate(
                businessid: $businessid,
                companyid: $companyid,
                creditLimit: $creditLimit,
                currencyCode: $currencyCode,
                discount: $discount,
                paymenttermsid: $paymenttermsid,
                repComission: $repComission,
                repid: $repid,
                vatcode: $vatcode,
                vatflag: $vatflag,
                vatno: $vatno
              ) {
                success
                error
              }
            }
          `,
          variables: {
            businessid,
            companyid,
            creditLimit,
            currencyCode,
            discount,
            paymenttermsid,
            repComission,
            repid,
            vatcode,
            vatflag,
            vatno
          },
        },
      }),
      invalidatesTags:  [{ type: 'TblcustomerAccount', id: 'LIST' }],
    }),


    updateCustomerAccount: builder.mutation({
      query: ({
        businessid,
        companyid,
        creditLimit,
        currencyCode,
        discount,
        nomcode,
        paymenttermsid,
        repComission,
        repid,
        vatcode,
        vatflag,
        vatno,
        dateOpened,
        dateUsed
        
      }) => ({
        body: {
          query: gql`
            mutation E4kCustomeraccountupdate(
              $businessid: String!,
              $companyid: String!,
              $creditLimit: Decimal,
              $currencyCode: Int,
              $nomcode: String,
              $paymenttermsid: Int,
              $repComission: Decimal,
              $repid: Int,
              $vatcode: Int,
              $discount: Decimal!,
              $vatflag: String!,
              $vatno: String!,
              $dateOpened : String!,
              $dateUsed : String!,
              
            ) {
              E4kCustomeraccountupdate(
                businessid: $businessid,
                companyid: $companyid,
                creditLimit: $creditLimit,
                currencyCode: $currencyCode,
                nomcode: $nomcode,
                paymenttermsid: $paymenttermsid,
                repComission: $repComission,
                repid: $repid,
                vatcode: $vatcode,
                vatflag: $vatflag,
                vatno: $vatno,
                discount: $discount,
                dateOpened : $dateOpened,
                dateUsed : $dateUsed,
                
              ) {
                success
                error
              
              }
            }
          `,
          variables: {
            businessid,
            companyid,
            creditLimit,
            currencyCode,
            discount,
            nomcode,
            paymenttermsid,
            repComission,
            repid,
            vatcode,
            vatflag,
            vatno,
            dateOpened,
            dateUsed,
           
          },
        },
      }),
      invalidatesTags:  [{ type: 'TblcustomerAccount', id: 'LIST' }],
    }),

    
    createCustomerAndAccount: builder.mutation({
      query: ({
      businessid,
      category1id,
      category2id,
      category3id,
      companyid,
      classid,
      countryid,  
      defaultNominal,
      groupid,
      isextract,
      islive,
      isstop,
      vatflag,
      name,
      vatno,

      }) =>({
        body: {
          query: gql`
            mutation {
              E4kCustomerandaccountCreate(
                businessid: "${businessid}",
                category1id: ${category1id},
                category2id: ${category2id},
                category3id: ${category3id},
                companyid: "${companyid}",
                classid: ${classid},
                countryid: ${countryid},
              
                defaultNominal: ${defaultNominal},
              
                groupid: ${groupid},
                isextract: ${isextract},
                islive: ${islive},
                isstop: ${isstop},
                
               
                vatflag: ${vatflag},
                name: "${name}",
                vatno: "${vatno}"
              ) {
                success
                error
        }
        }`
        },     
      }),
      invalidatesTags: ['e4ktblCustomerListtag'], // Adjust based on cache invalidation needs
    }),

    
  }),
});

export const { 
      useGetCustomerAccountQuery,
      useUpdateCustomerAccountMutation,
      useCreateCustomerAccountMutation, 
      useLazyGetCustomerAccountQuery,
      useCreateCustomerAndAccountMutation,
    } = e4kTblcustomeraccountApi;
