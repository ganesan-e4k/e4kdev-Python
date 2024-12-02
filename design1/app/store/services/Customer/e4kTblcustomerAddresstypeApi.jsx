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

export const e4kTblcustomerAddresstypeApi = createApi({
    reducerPath: 'e4kTblCustomerAddresstype',
    // baseQuery: graphqlBaseQuery({ baseUrl: 'http://127.0.0.1:8000/customer/' }),
    baseQuery : graphqlBaseQuery({baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Customer}),
    tagTypes: ['e4kCustomerAddressTypes'],
    endpoints: (builder) => ({
      getCustomerAddressTypes: builder.query({
        query: (businessId) => ({
          body: {
            query: gql`
              query GetCustomerAddressTypes($businessId: String!) {
                E4kTblcustomeraddress(businessid: $businessid) {
                  addresstypeid {
                    description
                    addresstypeid
                  }
                }
              }
            `,
            variables: { businessId },
          },
        }),
        providesTags: (result, error, businessId) =>
          result ? [{ type: 'e4kCustomerAddressTypes', id: businessId }] : [],
      }),
      
      // getBusAddressTypes: builder.query({
      //   query: (businessid, companyid) => ({
      //     body: {
      //       query: gql`
      //         query GetBusAddressTypes($businessid: String!, $companyid: String!) {
      //           E4kAddresscounts(businessid: $businessid, companyid: $companyid) 
      //         }
      //       `,
      //       variables: { businessid, companyid },
      //     },
      //   }),
      //   providesTags: (result, error, businessid, companyid) =>
      //     result ? [{ type: 'CustomerAddressTypes', id: `${businessid}-${companyid}` }] : [],
      // }),

      getBusAddressTypes: builder.query({
        query: ({businessid, companyid}) => ({
          body: {
            query: gql`
              query GetBusAddressTypes($businessid: String!, $companyid: String!) {
                E4kAddresscounts(businessid: $businessid, companyid: $companyid) 
              }
            `,
            variables: { businessid, companyid },
          },
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.E4kAddresscounts.map(({ businessid }) => ({
                  type: 'e4kCustomerAddressTypes',
                  id: businessid,
                })),
                { type: 'e4kCustomerAddressTypes', id: 'LIST' },
              ]
            : [{ type: 'e4kCustomerAddressTypes', id: 'LIST' }],

}),
      

      getCustomerList: builder.query({
        query: (companyId) => ({
          body: {
            query: gql`
              query GetCustomerList($companyId: String!) {
                E4kTblcustomerlist(companyid: $companyId)
              }
            `,
            variables: { companyId },
          },
        }),
        transformResponse: (response) => response.E4kTblcustomerlist.map(jsonString => JSON.parse(jsonString)),
        providesTags: (result, error, companyId) =>
          result ? result.map(({ id }) => ({ type: 'e4kCustomerAddressTypes', id })) : [],
      }),

    //  addresstypes: builder.query({
    //    query: (companyid) => ({
    //       body: {
    //         query: gql`
    //           query AddressTypes($companyid: String!) {
    //             E4kTblbusaddresstypes(companyid: $companyid) {
    //              addresstypeid
    //              description
    //             }
    //           }
    //         `,
    //         variables: { companyid },
    //       },
    //     }),
    //     providesTags: (result, error, companyid) =>
    //       result ? [{ type: 'CustomerAddressTypes', id: companyid }] : [],

    //   }),
     

      getCustomerAddress: builder.query({
        query: ({ addresstypeid, businessid }) => ({
          body: {
            query: gql`
              query GetCustomerAddress($addresstypeid: String!, $businessid: String!) {
                GetCustomerAddress(addresstypeid: $addresstypeid, businessid: $businessid) {
                   businessid {
                      businessid
                    }
                  addressid
                  address1
                  address2
                  address3
                  county
                  description
                  postcode
                  city
                  countrycode {
                country
                }
                companyid {
                companyid
                }
                addresstypeid {
               addresstypeid
               description
               }
                }
                
              }
            `,
            variables: { addresstypeid, businessid },
          },
        }),
        providesTags: (result, error, { addresstypeid, businessid }) =>
          result ? [{ type: 'e4kCustomerAddressTypes', id: `${businessid}-${addresstypeid}` }] : [],
      }),


      getCustomerAddressData: builder.query({
        query: ({ addressid, businessid,companyid,addresstypeid }) => ({
          body: {
            query: gql`
              query GetCustomerAddressdata($addressid: String!, $businessid: String! ,$companyid: String!, $addresstypeid: String) {
                E4kTblcustomeraddress(addressid: $addressid, businessid: $businessid , companyid: $companyid, addresstypeid: $addresstypeid) {
                   businessid {
                      businessid
                    }
                  addressid
                  address1
                  address2
                  address3
                  county
                  description
                  postcode
                  city
                  countrycode {
                country
                }
                companyid {
                companyid
                }
                addresstypeid {
               addresstypeid
               description
               }
                }
                
              }
            `,
            variables: { addressid, businessid, companyid, addresstypeid},
          },
        }),
        providesTags: (result, error, { addressid, businessid, companyid, addresstypeid }) =>
          result ? [{ type: 'e4kCustomerAddressTypes', id: `${businessid}-${addressid}-${companyid}-${addresstypeid}` }] : [],
      }),
      getContactList: builder.query({
        query: ({ businessid, addresstypeid }) => ({
          body: {
            query: gql`
              query Getcontactlist($businessid: String!, $addresstypeid: String!) {
                E4kGetcontactlist(businessid: $businessid, addresstypeid: $addresstypeid) 
              }
            `,
            variables: { businessid, addresstypeid },
          },
        }),
        providesTags: (result, error, { addresstypeid, businessid }) =>
          result ? [{ type: 'e4kCustomerAddressTypes', id: `${businessid}-${addresstypeid}` }] : [],
      }),
      
      deleteCustomerContactRow: builder.mutation({
        query: ({ companyid, id }) => ({
          body: {
            query: gql`
              mutation DeleteCustomerContactRow($companyid: String!,  $id: Int!) {
                E4kCustomercontactdelete(companyid: $companyid, id: $id) {
                  success
                  error
                }
              }
            `,
            variables: { companyid, id },
          },
        }),
        invalidatesTags: ['e4kCustomerAddressTypes'],
      }),
      
      createCustomerAddress: builder.mutation({
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
                E4kTblustomeraddresscreate(
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
        invalidatesTags: ['e4kCustomerAddressTypes'],
      }),
      updateCustomerAddress: builder.mutation({
        query: (addressData) => ({
          body: {
            query: gql`
              mutation UpdateCustomerAddress(
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
                E4kCustomeraddressupdate(
                  address1: $address1
                  address2: $address2
                  address3: $address3
                  addressid : $addressid
                  businessid: $businessid
                  addresstypeid : $ addresstypeid
                  companyid: $companyid
                  countrycode : $countrycode
                  description: $description
                  postcode: $postcode
                  city: $city
                  county: $county
                ) {
                  error
                  success
                  customerAddress {
                    address1
                    address2
                    address3
                    addressid
                    county
                    description
                    postcode
                    city
                    countrycode {
                      country
                      countryid
                    }
                    addresstypeid {
                     addresstypeid
                     description
                      }
                    companyid {
                      companyid
                    }
                  }
                }
              }
            `,
            variables: addressData,
          },
        }),
        invalidatesTags: ['e4kCustomerAddressTypes'],
      }),
      
     
      deleteCustomerContact: builder.mutation({
        query: ({ companyid, addressid }) => ({
          body: {
            query: gql`
              mutation DeleteCustomerContact($companyid: String!, $addressid: Int!) {
                E4kTblcustomercontactdelete(companyid: $companyid, addressid: $addressid ) {
                  success
                  error
                }
              }
            `,
            variables: { companyid, addressid },
          },
        }),
        invalidatesTags: (result, error, { addressid  }) =>
          result?.E4kTblcustomercontactdelete?.success ? [{ type: 'e4kCustomerAddressTypes', id: addressid}] : [],
      }),
      deleteCustomerAddress: builder.mutation({
        query: ({ companyid, addressid }) => ({
          body: {
            query: gql`
              mutation DeleteCustomerAddress($companyid: String!, $addressid: Int!) {
                E4kTblcustomeraddressdelete(companyid: $companyid, addressid: $addressid) {
                  error
                  success
                }
              }
            `,
            variables: { companyid, addressid },
          },
        }),
        invalidatesTags: ['e4kCustomerAddressTypes'],
      }),

      deleteCustomerAddressandContact: builder.mutation({
        query: ({ companyid, addressid }) => ({
          body: {
            query: gql`
              mutation DeleteCustomerAddressAndContact($companyid: String!, $addressid: Int!) {
                E4kDeleteAddressAndContacts(companyid: $companyid, addressid: $addressid){
                  error
                  success
                }
             
              }
            `,
            variables: { companyid, addressid },
          },
        }),
        invalidatesTags: ['e4kCustomerAddressTypes'],

      }),
      
      getCustomerContact: builder.query({
        query: ({addressid , companyid}) => ({
          body: {
            query: gql`
              query GetCustomerContact($addressid: Int! $companyid : String!) {
                E4kTblcustomercontact(addressid: $addressid , companyid: $companyid) {
                  id
                  value
                  contacttype {
                    contacttypeId
                    name
                  }
                }
              }
            `,
            variables: { addressid ,companyid },
          },
        }),
        providesTags: (result, error, addressid) =>
          result ? [{ type: 'e4kCustomerAddressTypes', id: addressid }] : [],
      }),

      
     
      getContactRefList: builder.query({
        query: ({companyid}) => ({
          body: {
            query: gql`
               query tblGetContactRefList($companyid: String!) {
                E4kTblbuscontactref(companyid: $companyid) {
                  contacttypeId
                  name
                }
              }
            `,
            variables: { companyid },
          },
        }),
        providesTags:  [{ type: 'e4kCustomerAddressTypes', id: 'LIST' }],
      
    }),
     

      
      createCustomerContact: builder.mutation({
        query: ({ companyid, addressid, contacttypeId, value }) => ({
          body: {
            query: gql`
              mutation CreateCustomerContact(
                $companyid: String!,
                $addressid: Int!,
                $contacttypeId: Int!,
                $value: String!
              ) {
                E4kTblcustomercontactcreate(
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
        invalidatesTags: ['e4kCustomerAddressTypes'],
      }),
      updateCustomerContact: builder.mutation({
        query: ({ addressid, companyid, id, value, contacttypeId }) => ({
          body: {
            query: gql`
              mutation UpdateCustomerContact(
                $addressid: Int!,
                $companyid: String!,
                $id: Int!,
                $value: String!,
                $contacttypeId: Int!
                
              ) {
                E4kTblcustomercontactupdate(
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
        invalidatesTags: ['e4kCustomerAddressTypes'],
      }),
      createCustomerLogo: builder.mutation({
        query: ({
          businessid,
          companyid,
          settingid,
          value,
        }) => ({
          body: {
            query: gql`
              mutation {
                createCustomerLogo(
                  businessid: "${businessid}",
                  companyid: "${companyid}",
                  settingid: "${settingid}",
                  value: "${value}"
                ) {
                  logo
                  message
                  success
                  error
                }
              }
            `,
          },
        }),
        
        invalidatesTags:  ['e4kCustomerAddressTypes'], // Adjust based on cache invalidation needs
      }),
      ////////////// contact list //////////


 

    }),
  });
  
  export const {
    useGetCustomerListQuery,
    useGetCustomerAddressTypesQuery,
    useGetBusAddressTypesQuery,
    useGetCustomerAddressQuery,
    useGetCustomerAddressDataQuery,
    useGetContactListQuery,
    useGetCustomerContactQuery,
    useDeleteCustomerContactRowMutation, 
    useCreateCustomerAddressMutation,
    useUpdateCustomerContactMutation,
    useCreateCustomerContactMutation,
    useGetContactRefListQuery,
    useDeleteCustomerContactMutation,
    useUpdateCustomerAddressMutation,
    useDeleteCustomerAddressMutation,
    useDeleteCustomerAddressandContactMutation,
    useCreateCustomerLogoMutation,
    // useAddresstypesQuery, //
   } = e4kTblcustomerAddresstypeApi;
  

              




