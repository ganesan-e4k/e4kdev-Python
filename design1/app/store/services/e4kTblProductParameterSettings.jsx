
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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

//const baseUrl = 'http://127.0.0.1:8000/graphql'; // Replace with your GraphQL API URL

export const e4kTblProductParameterSettings = createApi({
  reducerPath: 'e4kTblProductParameterSettings',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductParameterSettings'],
  endpoints: (builder) => ({
    getProductParameterSettings: builder.query({
      query: ({companyid,settingid,productid}) => ({
        body: {
          query: gql`
            query ProductParameterSettings($companyid: String!,$settingid:String!,$productid:String!) {
             e4kTblproductProductParametersSettings(companyid: $companyid, settingid: $settingid,productid: $productid) 
                
            }
          `,
          variables: { companyid : companyid, settingid: settingid,productid:productid },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductParametersSettings.map(({ settingid }) => ({
                        type: 'ProductParameterSettings',
                        id: settingid,
                      })),
                      { type: 'ProductParameterSettings', id: 'LIST' },
                    ]
                  : [{ type: 'ProductParameterSettings', id: 'LIST' }],
      
    }),
    

    createProductParameterSettings: builder.mutation({
        query: ({companyid ,seqno,settingid,settingname,defaults,lookupTable,lookupText }) => ({
          body: {
            query: gql`
              mutation CreateProductParameterSettings($companyid: String!,$seqno: Int!, $settingid: String!,$settingname: String!,$defaults: String!,$lookupTable: String!,$lookupText: String!) {
                E4kTblproductProductparametersettingsCreate( companyid: $companyid,seqno: $seqno,settingid: $settingid,settingname: $settingname,defaults: $defaults,lookupTable: $lookupTable,lookupText: $lookupText) {
                  setting
                }
              }
            `,
            variables: {companyid:companyid, seqno:seqno,settingid:settingid,settingname:settingname,defaults:defaults,lookupTable:lookupTable,lookupText:lookupText },
          },
        }),
        invalidatesTags: [{ type: 'ProductParameterSettings', id: 'LIST' }], // Optional: Invalidate cache tags
      }),
  
      updateProductParameterSettings: builder.mutation({
        query: ({companyid ,seqno,settingid,settingname,defaults,lookupTable,lookupText }) => ({
          body: {
            query: gql`
              mutation UpdateProductParameterSettings($companyid: String!,$seqno: Int!, $settingid: String!,$settingname: String!,$defaults: String!,$lookupTable: String!,$lookupText: String!) {
                E4kTblproductProductparametersettingsUpdate( companyid: $companyid,seqno: $seqno,settingid: $settingid,settingname: $settingname,defaults: $defaults,lookupTable: $lookupTable,lookupText: $lookupText) {
                  setting
                }
              }
            `,
            variables: {companyid:companyid, seqno:seqno,settingid:settingid,settingname:settingname,defaults:defaults,lookupTable:lookupTable,lookupText:lookupText },
          },
        }),
        invalidatesTags: (result, error, { settingid }) => [
          { type: 'ProductParameterSettings', id: settingid },
          { type: 'ProductParameterSettings', id: 'LIST' },
        ],
      }),
  
      deleteProductParameterSettings: builder.mutation({
        query: ({ settingid, companyid }) => ({
          body: {
            query: gql`
              mutation DeleteProductParameterSettings($settingid: String!, $companyid: String!) {
                E4kTblproductProductparametersettingsDelete(settingid: $settingid, companyid: $companyid) {
                  success
                }
              }
            `,
            variables: { settingid:settingid,companyid:companyid },
          },
        }),
        invalidatesTags: (result, error, { settingid }) => [
          { type: 'ProductParameterSettings', id: settingid },
          { type: 'ProductParameterSettings', id: 'LIST' },
        ],
      }),


      getProductParameterSettingslookuptable: builder.query({
        query: ({companyid,settingid}) => ({
          body: {
            query: gql`
              query ProductParameterSettingsLoopUpTable($companyid: String!,$settingid:String!) {
               e4kTblproductProductParametersSettingsLookupValue(companyid: $companyid, settingid: $settingid) 
                     
                  
              
            `,
            variables: { companyid : companyid, settingid: settingid },
          },
        }),
        providesTags: (result) =>
                  result
                    ? [
                        ...result.e4kTblproductProductParametersSettings.map(({ settingid }) => ({
                          type: 'ProductParameterSettings',
                          id: settingid,
                        })),
                        { type: 'ProductParameterSettings', id: 'LIST' },
                      ]
                    : [{ type: 'ProductParameterSettings', id: 'LIST' }],
        
      }),




      //////////// update parameter set value table
      updateProductParameterSettingsSetValues: builder.mutation({
        query: ({companyid ,productid,settingid,value }) => ({
          body: {
            query: gql`
              mutation UpdateProductParameterSetvValuess($companyid: String!, $settingid: String!,$productid: String!,$value: String!) {
                E4kTblproductParameterssetvaluesUpdate( companyid: $companyid,settingid: $settingid,productid: $productid,value: $value) {
                  parameterSet
                }
              }
            `,
            variables: {companyid:companyid, productid:productid,settingid:settingid,value:value },
          },
        }),
        invalidatesTags: (result, error, { settingid }) => [
          { type: 'ProductParameterSettings', id: settingid },
          { type: 'ProductParameterSettings', id: 'LIST' },
        ],
      }),



      ////////////// Tblproduct paramert Customr settings
      getProductParameterCustomerSettings: builder.query({
        query: ({companyid,settingid,productid,customerid}) => ({
          body: {
            query: gql`
              query ProductParameterCustomerSettings($companyid: String!,$settingid:String!,$productid:String!,$customerid:String!) {
               e4kTblproductProductParametersCustomerSettings(companyid: $companyid, settingid: $settingid,productid: $productid,customerid: $customerid) 
                  
              }
            `,
            variables: { companyid : companyid, settingid: settingid,productid:productid,customerid:customerid },
          },
        }),
        providesTags: (result) =>
                  result
                    ? [
                        ...result.e4kTblproductProductParametersCustomerSettings.map(({ settingid }) => ({
                          type: 'ProductParameterSettings',
                          id: settingid,
                        })),
                        { type: 'ProductParameterSettings', id: 'LIST' },
                      ]
                    : [{ type: 'ProductParameterSettings', id: 'LIST' }],
        
      }),


      //////////// update parameter customer set value table
      updateProductParameterCustomerSettingsSetValues: builder.mutation({
        query: ({companyid ,productid,settingid,customerid,value }) => ({
          body: {
            query: gql`
              mutation UpdateProductParameterCustomerSetvValuess($companyid: String!, $settingid: String!,$productid: String!,$customerid: String!,$value: String!) {
                E4kTblproductParametertscustomerssetvaluesUpdate( companyid: $companyid,settingid: $settingid,productid: $productid,customerid: $customerid,value: $value) {
                  parameterCustomerSet
                }
              }
            `,
            variables: {companyid:companyid, productid:productid,settingid:settingid,customerid:customerid,value:value },
          },
        }),
        invalidatesTags: (result, error, { settingid }) => [
          { type: 'ProductParameterSettings', id: settingid },
          { type: 'ProductParameterSettings', id: 'LIST' },
        ],
      }),


      /////////////////////////// Tbl Gen Categories
      
      getProductGenCatories: builder.query({
      query: ({companyid,moduleid,iscustomer}) => ({
        body: {
          query: gql`
            query TblGencategoriesProduct($companyid: String!,$moduleid:String!,$iscustomer:Boolean!) {
              e4kTblgenCategories(companyid: $companyid, moduleid: $moduleid,iscustomer: $iscustomer) {
                ... on E4k_TblGen_CategoriesNode {
                  id
                  categoryid
                  moduleid
                }
                ... on CustomErrorType {
                  message
                }
              }
            }
          `,
          variables: { companyid : companyid, moduleid: moduleid,iscustomer:iscustomer },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblgenCategories.map(({ moduleid }) => ({
                        type: 'ProductParameterSettings',
                        id: moduleid,
                      })),
                      { type: 'ProductParameterSettings', id: 'LIST' },
                    ]
                  : [{ type: 'ProductParameterSettings', id: 'LIST' }],
      
    }),

    }),
  });
  
  export const {
    useGetProductParameterSettingsQuery,
    useCreateProductParameterSettingsMutation,
    useUpdateProductParameterSettingsMutation,
    useDeleteProductParameterSettingsMutation,
    useGetProductParameterSettingslookuptableQuery,
    useUpdateProductParameterSettingsSetValuesMutation,
    useGetProductParameterCustomerSettingsQuery,
    useUpdateProductParameterCustomerSettingsSetValuesMutation,

    ////////////// gen categories
    useGetProductGenCatoriesQuery,
  } = e4kTblProductParameterSettings;
