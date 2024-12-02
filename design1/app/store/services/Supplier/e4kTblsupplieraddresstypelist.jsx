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

export const e4kTblsupplieraddresstype = createApi({
  reducerPath: 'e4ksupplieraddresstypelist',
  // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/supplier/' }),
  baseQuery : graphqlBaseQuery({ baseUrl : process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Supplier}),
  tagTypes: ['e4ktblsupplieraddresstypelist'],
  endpoints: (builder) => ({
    getSupplierAddressTypes: builder.query({
      query: ({ businessid, companyid }) => ({
        body: {
          query: gql`
            query GetSupplieraddressTypes($companyid: String!, $businessid: String!) {
              E4kSupplieraddresscounts(companyid: $companyid, businessid: $businessid)
            }
          `,
          variables: { businessid, companyid },
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.E4kSupplieraddresscounts.map(({ businessid }) => ({
                type: 'e4ktblsupplieraddresstypelist',
                id: businessid,
              })),
              { type: 'e4ktblsupplieraddresstypelist', id: 'LIST' },
            ]
          : [{ type: 'e4ktblsupplieraddresstypelist', id: 'LIST' }],
    }),
    getSupplierAddress: builder.query({
      query: ({ businessid, companyid, addressid, addresstypeid }) => ({
        body: {
          query: gql`
            query GetSupplierAddress($companyid: String!, $businessid: String!, $addressid: String!, $addresstypeid: String!) {
            E4kTblsupplieraddress(
              addresstypeid:$addresstypeid,
              addressid: $addressid,
              businessid: $businessid
              companyid: $companyid
            ) {
              address1
              address2
              address3
              addressid
              city
              county
              description
              postcode
              addresstypeid {
                addresstypeid
                description
              }
              countrycode {
                countryid
                country
              }
              businessid {
              businessid
            }
            }
          }
          `,
          variables: { businessid, companyid, addressid, addresstypeid },
        },
      }),
      providesTags: (result, error, { businessid, companyid, addressid, addresstypeid }) =>
        result
         ? [{ type:'e4ktblsupplieraddresstypelist', id: `${companyid}-${businessid}-${addressid}-${addresstypeid}`}]
          : [],
    }),
    
    getSupplierContact: builder.query({
      query: ({addressid, companyid}) => ({
        body: {
          query: gql`
            query GetSuppliercontact ($addressid : String! $companyid: String!) {
            E4kSuppliercontact(addressid:$addressid, companyid: $companyid) {
              id
              value
              contacttype {
              contacttypeId
              name
            }
            }
          }
          `,
          variables: { companyid, addressid },
        },
      }),
      providesTags: (result, error, { addressid, companyid }) =>
        result ? [{ type: 'e4ktblsupplieraddresstypelist', id: `${addressid}-${companyid}` }] : [],
    }),

    getSupplierContactlist: builder.query({
      query: ({ businessid, companyid, addresstypeid }) => ({
        body: {
          query: gql`
            query GetSuppliercontactList($companyid: String!, $businessid: String! , $addresstypeid: String!) {
            E4kGetsuppliercontactlist( businessid: $businessid, companyid: $companyid , addresstypeid:$addresstypeid)
          }
          `,
          variables: { businessid, companyid,addresstypeid },
        },
      }),
      providesTags: (result, error, { businessid, companyid,addresstypeid }) =>
        result
          ? [{ type: 'e4ktblsupplieraddresstypelist', id: `${companyid}-${businessid}-${addresstypeid}` }]
          : [],
    }),

    createSupplierAddress: builder.mutation({
      query: (addressData) => ({
        body: {
          query: gql`
            mutation CreateCustomerAddress(
              $address1: String!
              $address2: String!
              $address3: String!
              $addresstypeid: Int!
              $businessid: String!
              $countrycode: Int!
              $companyid: String!
              $description: String!
              $postcode: String!
              $city: String!
              $county: String!
            ) {
              E4kTblsupplieraddresscreate(
                address1: $address1
                address2: $address2
                address3: $address3
                addresstypeid: $addresstypeid
                businessid: $businessid
                countrycode: $countrycode
                companyid: $companyid
                description: $description
                postcode: $postcode
                city: $city
                county: $county
              ) {
                error
                success
              }
            }
          `,
          variables: addressData,
        },
      }),
      invalidatesTags: ['e4ktblsupplieraddresstypelist'],
    }),
    getContactRefList: builder.query({
      query: (companyid) => ({
        body: {
          query: gql`
             query GetContactRefList($companyid: String!) {
              E4kTblbuscontactref(companyid: $companyid) {
                contacttypeId
                name
              }
            }
          `,
          variables: { companyid },
        },
      }),
      providesTags: ['e4ktblsupplieraddresstypelist'],
    }),


    updateSupplierAddress: builder.mutation({
      query: (addressData) => ({
        body: {
          query: gql`
            mutation UpdateSuppllierAddress(
              $address1: String!
              $address2: String!
              $address3: String!
              $addressid : Int!
              $businessid: String!
              $countrycode: Int!
              $addresstypeid : Int!
              $companyid: String!
              $description: String!
              $postcode: String!
              $city: String!
              $county: String!
            ) {
              E4kTblsupplieraddressupdate(
                address1: $address1
                address2: $address2
                address3: $address3
                addressid : $addressid
                businessid: $businessid
                addresstypeid : $addresstypeid
                companyid: $companyid
                countrycode : $countrycode
                description: $description
                postcode: $postcode
                city: $city
                county: $county
              ) {
                error
                success
               
              }
            }
          `,
          variables: addressData,
        },
      }),
      invalidatesTags: ['e4ktblsupplieraddresstypelist'],
    }),
    updateSupplierContact: builder.mutation({
      query: ({ addressid, companyid, id, value, contacttypeId }) => ({
        body: {
          query: gql`
            mutation UpdateSupplierContact(
              $addressid: String!,
              $companyid: String!,
              $id: Int!,
              $value: String!,
              $contacttypeId : String!,
            ) {
              E4kTblsuppliercontactupdate(
                addressid: $addressid,
                companyid: $companyid,
                id: $id,
                value: $value,
                contacttypeId: $contacttypeId
               
              ) {
                error
                success
              }
            }
          `,
          variables: { addressid, companyid, id, value, contacttypeId },
        },
      }),
      invalidatesTags: ['e4ktblsupplieraddresstypelist'],
    }),
    createSupplierContact: builder.mutation({
      query: ({ companyid, addressid, contacttypeId, value }) => ({
        body: {
          query: gql`
            mutation CreateSupplierContact(
              $companyid: String!,
              $addressid: String!,
              $contacttypeId: String!,
              $value: String!
            ) {
              E4kTblsuppliercontactcreate(
                companyid: $companyid,
                addressid: $addressid,
                contacttypeId: $contacttypeId,
                value: $value
              ) {
                error
                success
               
              }
            }
          `,
          variables: { companyid, addressid, contacttypeId, value },
        },
      }),
      invalidatesTags: ['e4ktblsupplieraddresstypelist'],
    }),
    supplierdeleteCustomerAddressandContact: builder.mutation({
      query: ({ companyid, addressid }) => ({
        body: {
          query: gql`
            mutation SupplierDeleteCustomerAddressAndContact($companyid: String!, $addressid: Int!) {
              E4kSupplierdeleteaddressandcontacts(companyid: $companyid, addressid: $addressid){
                error
                success
              }
           
            }
          `,
          variables: { companyid, addressid },
        },
      }),
      invalidatesTags: ['e4ktblsupplieraddresstypelist'],

    }),
    
    deleteSupplierContactRow: builder.mutation({
      query: ({ companyid, id }) => ({
        body: {
          query: gql`
            mutation DeleteSupplierContactRow($companyid: String!,  $id: Int!) {
              E4kSupplierrowcontactDelete(companyid: $companyid, id: $id) {
                success
                error
              }
            }
          `,
          variables: { companyid, id },
        },
      }),
      invalidatesTags: ['e4ktblsupplieraddresstypelist'],
    }),
    createSupplierLogo: builder.mutation({
      query: ({
        businessid,
        companyid,
        settingid,
        value,
      }) => ({
        body: {
          query: gql`
            mutation {
              E4kTblsupplierlogoCreate(
                businessid: "${businessid}",
                companyid: "${companyid}",
                settingid: "${settingid}",
                value: "${value}"
              ) {
                logo
                message
              }
            }
          `,
        },
      }),
      
      invalidatesTags: ['e4ktblsupplieraddresstypelist'],
    }),
    


    
  }),
});

export const {useDeleteSupplierContactRowMutation,
        useSupplierdeleteCustomerAddressandContactMutation,
        useGetContactRefListQuery,
        useCreateSupplierContactMutation,
        useGetSupplierAddressTypesQuery,
        useGetSupplierAddressQuery, 
        useGetSupplierContactQuery,
        useGetSupplierContactlistQuery,
        useUpdateSupplierAddressMutation,
        useCreateSupplierAddressMutation,
        useUpdateSupplierContactMutation ,
        useCreateSupplierLogoMutation
      } = e4kTblsupplieraddresstype;
