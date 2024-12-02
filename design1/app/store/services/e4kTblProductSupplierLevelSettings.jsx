
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


export const e4kTblProductSupplierLevelSettings = createApi({
  reducerPath: 'e4kTblProductSupplierLevelSettings',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductSupplierLevelSettingss'],
  endpoints: (builder) => ({
    getProductSupplierLevelSettingsSelect: builder.query({
      query: ({companyid,productid,supplierid}) => ({
        body: {
          query: gql`
            query ProductSupplierlevelSettingsAPI($companyid: String!,$productid: String!,$supplierid:String) {
             e4kTblproductProductSupplierLevel(companyid: $companyid,productid: $productid, supplierid: $supplierid) {
                    ... on E4K_TblproductProductSupplierLevelNode {
                        id
                        suppliermatrix
                        productid {
                            productid
                        }
                        supplierid {
                            businessid
                        }
                        }
                        ... on CustomErrorType {
                        message
                        }
                    }
                    }
          `,
          variables: { companyid : companyid, productid:productid,supplierid: supplierid },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductSupplierLevel.map(({ suppliermatrix }) => ({
                        type: 'ProductSupplierLevelSettingss',
                        id: suppliermatrix,
                      })),
                      { type: 'ProductSupplierLevelSettingss', id: 'LIST' },
                    ]
                  : [{ type: 'ProductSupplierLevelSettingss', id: 'LIST' }],
      
    }),
    

    createProductSupplierLevelSettings: builder.mutation({
        query: ({companyid ,productid,supplierid,suppliermatrix }) => ({
          body: {
            query: gql`
              mutation CreateProductSupplierLevelSettings(
                  $companyid: String!, 
                  $productid: String!,
                  $supplierid: String!,
                  $suppliermatrix: JSONString!, 
                  
              ) {
                  E4kTblproductProductsupplierlevelCreate( 
                      companyid: $companyid, 
                      productid: $productid,
                      supplierid: $supplierid,
                      suppliermatrix: $suppliermatrix,
                      
                  ) {
                      createProductSupplierLevel
                  }
              }
            `,
            variables: {companyid:companyid, productid:productid,supplierid:supplierid,suppliermatrix:suppliermatrix },
          },
        }),
        invalidatesTags: [{ type: 'ProductSupplierLevelSettingss', id: 'LIST' }], // Optional: Invalidate cache tags
    }),
  
    updateProductSupplierlevelSettings: builder.mutation({
        query: ({companyid,productid, supplierid,suppliermatrix}) => ({
          body: {
            query: gql`
              mutation UpdateProductSupplierLevelSettingss(
                  $companyid: String!, 
                  $productid: String!,
                  $supplierid: String!,
                  $suppliermatrix: JSONString!, 
                  
              ) {
                  E4kTblproductProductsupplierlevelUpdate( 
                      companyid: $companyid, 
                      productid: $productid,
                      supplierid: $supplierid,
                      suppliermatrix: $suppliermatrix,
                      
                  ) {
                      updateProductSupplierLevel
                  }
              }
            `,
            variables: {companyid:companyid, productid:productid,supplierid:supplierid,suppliermatrix:suppliermatrix },
          },
        }),
        invalidatesTags: (result, error, { propertyid }) => [
          { type: 'ProductSupplierLevelSettingss', id: propertyid },
          { type: 'ProductSupplierLevelSettingss', id: 'LIST' },
        ],
    }),
  
    deleteProductSupplierlevelSettings: builder.mutation({
        query: ({ companyid,productid, supplierid }) => ({
          body: {
            query: gql`
              mutation DeleteProductSupplierLevelSettingss($companyid: String!, $productid: String!,$supplierid: String!) {
                E4kTblproductProductsupplierlevelDelete(companyid: $companyid, productid: $productid,supplierid: $supplierid) {
                  deleteProductSupplierLevel
                }
              }
            `,
            variables: { companyid:companyid,productid:productid, supplierid:supplierid },
          },
        }),
        invalidatesTags: (result, error, { propertyid }) => [
          { type: 'ProductSupplierLevelSettingss', id: propertyid },
          { type: 'ProductSupplierLevelSettingss', id: 'LIST' },
        ],
    }),

/////////////////// Supplier Level Col Matrix Data CRUD
  getProductSupplierLevelColSetsSelect: builder.query({
  query: ({companyid,productid,supplierid}) => ({
    body: {
      query: gql`
        query ProductSupplierlevelColSetsmatrixAPI($companyid: String!,$productid: String!,$supplierid:String) {
         e4kTblproductProductSupplierLevelColmatrix(companyid: $companyid,productid: $productid, supplierid: $supplierid) {
                ... on E4K_TblProductProductSupplierLevelColmatrixNode {
                    id
                    suppliercolmatrix
                    productid {
                        productid
                    }
                    supplierid {
                        businessid
                    }
                    }
                    ... on CustomErrorType {
                    message
                    }
                }
                }
      `,
      variables: { companyid : companyid, productid:productid,supplierid: supplierid },
    },
  }),
  providesTags: (result) =>
            result
              ? [
                  ...result.e4kTblproductProductSupplierLevelColmatrix.map(({ suppliercolmatrix }) => ({
                    type: 'ProductSupplierLevelSettingss',
                    id: suppliercolmatrix,
                  })),
                  { type: 'ProductSupplierLevelSettingss', id: 'LIST' },
                ]
              : [{ type: 'ProductSupplierLevelSettingss', id: 'LIST' }],
  
      }),


      //////////////// Supplier level matrix
    getProductSupplierLevelMatrixSelect: builder.query({
      query: ({companyid,productid,supplierid}) => ({
        body: {
          query: gql`
            query ProductSupplierlevelMatrixmatrixAPI($companyid: String!,$productid: String!,$supplierid:String) {
              e4kTblproductProductSupplierMatrix(companyid: $companyid,productid: $productid, supplierid: $supplierid) {
                    ... on E4K_TblproductProductSupplierMatrixNode {
                        id
                        suppliermatrix
                        productid {
                            productid
                        }
                        supplierid {
                            businessid
                        }
                        }
                        ... on CustomErrorType {
                        message
                        }
                    }
                    }
          `,
          variables: { companyid : companyid, productid:productid,supplierid: supplierid },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductSupplierMatrix.map(({ suppliermatrix }) => ({
                        type: 'ProductSupplierLevelSettingss',
                        id: suppliermatrix,
                      })),
                      { type: 'ProductSupplierLevelSettingss', id: 'LIST' },
                    ]
                  : [{ type: 'ProductSupplierLevelSettingss', id: 'LIST' }],
      
          }),


          updateProductSupplierMatrixLevelSettings: builder.mutation({
            query: ({companyid,productid, supplierid,suppliermatrix}) => ({
              body: {
                query: gql`
                  mutation UpdateProductSupplierMatrixLevelSettingsApi(
                      $companyid: String!, 
                      $productid: String!,
                      $supplierid: String!,
                      $suppliermatrix: [JSONString]!, 
                      
                  ) {
                      E4kTblproductProductsuppliermatrixUpdate( 
                          companyid: $companyid, 
                          productid: $productid,
                          supplierid: $supplierid,
                          suppliermatrix: $suppliermatrix,
                          
                      ) {
                          success
                      }
                  }
                `,
                variables: {companyid:companyid, productid:productid,supplierid:supplierid,suppliermatrix:suppliermatrix },
              },
            }),
            invalidatesTags: (result, error, { propertyid }) => [
              { type: 'ProductSupplierLevelSettingss', id: propertyid },
              { type: 'ProductSupplierLevelSettingss', id: 'LIST' },
            ],
        }),


    }),


 
    



  });
  
  export const {
    useGetProductSupplierLevelSettingsSelectQuery,
    useCreateProductSupplierLevelSettingsMutation,
    useUpdateProductSupplierlevelSettingsMutation,
    useDeleteProductSupplierlevelSettingsMutation,
    useGetProductSupplierLevelColSetsSelectQuery,
    useGetProductSupplierLevelMatrixSelectQuery,
    useUpdateProductSupplierMatrixLevelSettingsMutation,
  } = e4kTblProductSupplierLevelSettings;
