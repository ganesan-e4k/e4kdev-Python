
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

export const e4kTblProductPropertyTypesValues = createApi({
  reducerPath: 'e4kTblProductPropertyTypesValues',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductPropertyTypesValues'],
  endpoints: (builder) => ({
    getProductPropertyTypesValues: builder.query({
      query: ({companyid,propertyid,propertyvalue}) => ({
        body: {
          query: gql`
            query ProductPropertyTypesValues($companyid: String!,$propertyid:Int,$propertyvalue:String) {
             e4kTblproductProductPropertyTypesValues(companyid: $companyid, propertyid: $propertyid,propertyvalue:$propertyvalue) {
                    ... on E4K_TblproductPropertyTypesValuesNode {
                            id
                            proptypeValues
                            proptypeid {
                                propertyid
                            }
                            }
                            ... on CustomErrorType {
                            message
                            }
                        }
                        }
          `,
          variables: { companyid : companyid, propertyid: propertyid,propertyvalue:propertyvalue },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductPropertyTypesValues.map(({ propertyid }) => ({
                        type: 'ProductPropertyTypesValues',
                        id: propertyid,
                      })),
                      { type: 'ProductPropertyTypesValues', id: 'LIST' },
                    ]
                  : [{ type: 'ProductPropertyTypesValues', id: 'LIST' }],
      
    }),
    

    createProductPropertyTypesValues: builder.mutation({
        query: ({companyid ,propertyid,proptypeValues }) => ({
          body: {
            query: gql`
              mutation CreateProductPropertyTypesValues($companyid: String!,$propertyid:Int!,$proptypeValues: [String]!) {
                E4kTblproductProductpropertytypeValuesCreate( companyid: $companyid,propertyid:$propertyid,proptypeValues: $proptypeValues) {
                  createPropertyTypeValues
                }
              }
            `,
            variables: {companyid:companyid, propertyid:propertyid,proptypeValues:proptypeValues },
          },
        }),
        invalidatesTags: [{ type: 'ProductPropertyTypesValues', id: 'LIST' }], // Optional: Invalidate cache tags
    }),
  
      updateProductPropertyTypesValues: builder.mutation({
        query: ({companyid,propertyid, proptypeValues}) => ({
          body: {
            query: gql`
              mutation UpdateProductPropertyTypesValues($companyid: String!,$propertyid: Int!, $proptypeValues: [String]!) {
                E4kTblproductProductpropertytypeValuesUpdate( companyid: $companyid,propertyid: $propertyid, proptypeValues: $proptypeValues) {
                  createOrUpdatePropertyTypeValues
                }
              }
            `,
            variables: { companyid:companyid,propertyid:propertyid, proptypeValues:proptypeValues },
          },
        }),
        invalidatesTags: (result, error, { propertyid }) => [
          { type: 'ProductPropertyTypesValues', id: propertyid },
          { type: 'ProductPropertyTypesValues', id: 'LIST' },
        ],
      }),
  
      deleteProductPropertyTypesValues: builder.mutation({
        query: ({ propertyid, companyid , proptypeValues}) => ({
          body: {
            query: gql`
              mutation DeleteProductPropertyTypesValues($propertyid: Int!, $companyid: String!,$proptypeValues: String!) {
                E4kTblproductProductpropertytypeValuesDelete(propertyid: $propertyid, companyid: $companyid,proptypeValues:$proptypeValues) {
                  deletePropertyTypeValue
                }
              }
            `,
            variables: { propertyid:propertyid,companyid:companyid,proptypeValues:proptypeValues },
          },
        }),
        invalidatesTags: (result, error, { propertyid }) => [
          { type: 'ProductPropertyTypesValues', id: propertyid },
          { type: 'ProductPropertyTypesValues', id: 'LIST' },
        ],
      }),
    }),
  });
  
  export const {
    useGetProductPropertyTypesValuesQuery,
    useCreateProductPropertyTypesValuesMutation,
    useUpdateProductPropertyTypesValuesMutation,
    useDeleteProductPropertyTypesValuesMutation,
  } = e4kTblProductPropertyTypesValues;
