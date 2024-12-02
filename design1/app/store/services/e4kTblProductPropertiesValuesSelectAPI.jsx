
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


export const e4kTblProductPropertiesValuesSelectAPI = createApi({
  reducerPath: 'e4kTblProductPropertiesValuesSelect',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductPropertiesValuesSelect'],
  endpoints: (builder) => ({
    getProductPropertiesValuesSelect: builder.query({
      query: ({companyid,productid,propertyid}) => ({
        body: {
          query: gql`
            query ProductPropertiesValuesSelectAPI($companyid: String!,$productid: String!,$propertyid:Int) {
             e4kTblproductProductPropertyValues(companyid: $companyid,productid: $productid, propertyid: $propertyid) {
                    ... on E4K_TblproductProductPropertyValuesNode {
                      productPropValue
                      productPropid {
                        productPropid
                        seqno
                      }
                    }
                    ... on CustomErrorType {
                      message
                    }
                  }
                }
          `,
          variables: { companyid : companyid, productid:productid,propertyid: propertyid },
        },
      }),
      
      providesTags: (result) =>
        result && result.data && result.data.e4kTblproductProductPropertyValues
          ? [
              ...result.data.e4kTblproductProductPropertyValues
                .filter(({ productPropid }) => productPropid) // Ensure productPropid exists
                .map(({ productPropid }) => ({
                  type: 'ProductPropertiesValuesSelect',
                  id: productPropid.productPropid,
                })),
              { type: 'ProductPropertiesValuesSelect', id: 'LIST' },
            ]
          : [{ type: 'ProductPropertiesValuesSelect', id: 'LIST' }],
    }),

    createProductPropertiesValues: builder.mutation({
      query: ({companyid ,productid,productPropValue,propertyid }) => ({
        body: {
          query: gql`
            mutation CreateProductPropertiesValues($companyid: String!, $productid: String!, $productPropValue: [String]!, $propertyid: Int!) {
              E4kTblproductProductpropertiesValuesCreate( companyid: $companyid,productid: $productid,productPropValue: $productPropValue,propertyid: $propertyid ) {
                createPropertyValues
              }
            }
          `,
          variables: {companyid:companyid, productid:productid,productPropValue:productPropValue,propertyid:propertyid },
        },
      }),
      invalidatesTags: [{ type: 'ProductPropertiesValuesSelect', id: 'LIST' }], // Optional: Invalidate cache tags
    }),

    UpdateProductPropertiesValues: builder.mutation({
      query: ({companyid ,productid,propertyid,productPropValues }) => ({
        body: {
          query: gql`
            mutation UpdateProductPropertiesValues($companyid: String!,$productid: String!, $propertyid: Int!,$productPropValues: [String]!) {
              E4kTblproductProductpropertiesValuesUpdate( companyid: $companyid,productid: $productid,propertyid: $propertyid,productPropValues: $productPropValues ) {
                updatePropertyValues
              }
            }
          `,
          variables: {companyid:companyid, productid:productid,propertyid:propertyid,productPropValues:productPropValues },
        },
      }),
      invalidatesTags: (result, error, { propertyid }) => [
        { type: 'ProductPropertiesValuesSelect', id: propertyid },
        { type: 'ProductPropertiesValuesSelect', id: 'LIST' },
      ], // Optional: Invalidate cache tags
    }),

    DeleteProductPropertiesValues: builder.mutation({
      query: ({companyid ,productid,propertyid,productPropValue }) => ({
        body: {
          query: gql`
            mutation DeleteProductPropertiesValues($companyid: String!,$productid: String!, $propertyid: Int!,$productPropValue: String!) {
              E4kTblproductProductpropertiesValuesDelete( companyid: $companyid,productid: $productid,propertyid: $propertyid ,productPropValue: $productPropValue) {
                deletePropertyValues
              }
            }
          `,
          variables: {companyid:companyid, productid:productid,propertyid:propertyid,productPropValue:productPropValue },
        },
      }),
      invalidatesTags: (result, error, { propertyid }) => [
        { type: 'ProductPropertiesValuesSelect', id: propertyid },
        { type: 'ProductPropertiesValuesSelect', id: 'LIST' },
      ], 
    }),
    
    }),
  });

  
  export const {
    useGetProductPropertiesValuesSelectQuery,
    useCreateProductPropertiesValuesMutation,
    useUpdateProductPropertiesValuesMutation,
    useDeleteProductPropertiesValuesMutation,
  } = e4kTblProductPropertiesValuesSelectAPI;
