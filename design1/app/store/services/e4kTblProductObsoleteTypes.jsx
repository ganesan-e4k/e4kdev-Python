
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

export const e4kTblProductObsoleteTypes = createApi({
  reducerPath: 'e4kTblProductObsoleteTypes',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductObsoleteTypes'],
  endpoints: (builder) => ({
    getProductObsoleteTypes: builder.query({
      query: (companyid) => ({
        body: {
          query: gql`
            query ProductObsoleteTypes($companyid: String!) {
             e4kTblproductProductObsoleteTypes(companyid: $companyid) {
                    ... on E4K_TblproductObsoleteTypesNode {
                    description
                    allowSale
                    companyid {
                        companyid
                    }
                    obsoleteid
                    }
                    ... on CustomErrorType {
                    message
                    }
                }
                
            }
          `,
          variables: { companyid : companyid},
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductObsoleteTypes.map(({ obsoleteid }) => ({
                        type: 'ProductObsoleteTypes',
                        id: obsoleteid,
                      })),
                      { type: 'ProductObsoleteTypes', id: 'LIST' },
                    ]
                  : [{ type: 'ProductObsoleteTypes', id: 'LIST' }],
      
    }),
    

    createProductObsoleteTypes: builder.mutation({
        query: ({companyid ,description,allowSale }) => ({
          body: {
            query: gql`
              mutation CreateProductObsoleteTypes($companyid: String!,$description: String!, $allowSale: Boolean!) {
                E4kTblproductProductobsoletetypesCreate( companyid: $companyid,description: $description,allowSale: $allowSale) {
                  obsoleteType
                }
              }
            `,
            variables: {companyid:companyid, description:description,allowSale:allowSale },
          },
        }),
        invalidatesTags: [{ type: 'ProductObsoleteTypes', id: 'LIST' }], // Optional: Invalidate cache tags
      }),
  
      updateProductObsoleteTypes: builder.mutation({
        query: ({companyid,obsoleteid, description,allowSale}) => ({
          body: {
            query: gql`
              mutation UpdateProductObsoleteTypes($obsoleteid: Int!, $description: String!, $companyid: String!,$allowSale: Boolean!) {
                E4kTblproductProductobsoletetypesUpdate(obsoleteid: $obsoleteid, description: $description, companyid: $companyid,allowSale: $allowSale) {
                  obsoleteType
                }
              }
            `,
            variables: { obsoleteid:obsoleteid,companyid:companyid, description:description,allowSale:allowSale },
          },
        }),
        invalidatesTags: (result, error, { obsoleteid }) => [
          { type: 'ProductObsoleteTypes', id: obsoleteid },
          { type: 'ProductObsoleteTypes', id: 'LIST' },
        ],
      }),
  
      deleteProductObsoleteTypes: builder.mutation({
        query: ({ obsoleteid, companyid }) => ({
          body: {
            query: gql`
              mutation DeleteProductObsoleteTypes($obsoleteid: Int!, $companyid: String!) {
                E4kTblproductProductobsoletetypesDelete(obsoleteid: $obsoleteid, companyid: $companyid) {
                  success
                }
              }
            `,
            variables: { obsoleteid:obsoleteid,companyid:companyid },
          },
        }),
        invalidatesTags: (result, error, { obsoleteid }) => [
          { type: 'ProductObsoleteTypes', id: obsoleteid },
          { type: 'ProductObsoleteTypes', id: 'LIST' },
        ],
      }),
    }),
  });
  
  export const {
    useGetProductObsoleteTypesQuery,
    useCreateProductObsoleteTypesMutation,
    useUpdateProductObsoleteTypesMutation,
    useDeleteProductObsoleteTypesMutation,
  } = e4kTblProductObsoleteTypes;
