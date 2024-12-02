
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


export const e4kTblProductProductPropertiesLevel = createApi({
  reducerPath: 'e4kTblProductProductPropertiesLevel',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductPropertiesLevelSet'],
  endpoints: (builder) => ({
    getProductProductPropertiesLevel: builder.query({
      query: ({companyid,productid}) => ({
        
        
        body: {
          query: gql`
            query ProductPropertiesLevelAPISET($companyid: String!,$productid: String!) {
             e4kTblproductProductPropertyLevel(companyid: $companyid,productid: $productid) {
                    ... on E4K_TblproductProductPropertyLevelNode {
                        stockmatrix
                        pricematrix
                        obslmatrix
                        stklocmatrix
                        stklvlmatrix
                        stktypematrix
                        }
                        ... on CustomErrorType {
                        message
                        }
                    }
                    }
          `,
          variables: { companyid : companyid, productid:productid},
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductPropertyLevel.map(({ stockmatrix }) => ({
                        type: 'ProductPropertiesLevelSet',
                        id: stockmatrix,
                      })),
                      { type: 'ProductPropertiesLevelSet', id: 'LIST' },
                    ]
                  : [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }],
      
    }),
    


    ////////////////// create property level
    createProductPropertiesLevel: builder.mutation({
      query: ({companyid,productid, stockmatrix,pricematrix,stklocmatrix,stklvlmatrix,stktypematrix,obslmatrix}) => ({
          body: {
          query: gql`
              mutation CreateProductPropertiesLevelSET(
                  $companyid: String!, 
                  $productid: String!,
                  $stockmatrix: JSONString!, 
                  $pricematrix: JSONString!, 
                  $stklocmatrix: JSONString!, 
                  $stklvlmatrix: JSONString!, 
                  $stktypematrix: JSONString!,
                  $obslmatrix: JSONString!
              ) {
                  E4kTblproductProductpropertylevelCreate( 
                      companyid: $companyid, 
                      productid: $productid,
                      stockmatrix: $stockmatrix,
                      pricematrix: $pricematrix,
                      stklocmatrix: $stklocmatrix,
                      stklvlmatrix: $stklvlmatrix,
                      stktypematrix: $stktypematrix,
                      obslmatrix: $obslmatrix
                  ) {
                      createProductPropertyLevel
                  }
              }
  
          `,
          variables: { 
            companyid:companyid,
            productid:productid, 
            stockmatrix:stockmatrix,
            pricematrix:pricematrix,
            stklocmatrix:stklocmatrix,
            stklvlmatrix:stklvlmatrix,
            stktypematrix: stktypematrix,
            obslmatrix:obslmatrix
          },
          },
      }),
      invalidatesTags: (result, error, { pricematrix }) => [
          { type: 'ProductPropertiesLevelSet', id: pricematrix },
          { type: 'ProductPropertiesLevelSet', id: 'LIST' },
      ],
      }),


  
    updateProductPropertiesLevel: builder.mutation({
    query: ({companyid,productid, stockmatrix,pricematrix,stklocmatrix,stklvlmatrix,stktypematrix,obslmatrix}) => ({
        body: {
        query: gql`
            mutation UpdateProductPropertiesLevelSET(
                $companyid: String!, 
                $productid: String!,
                $stockmatrix: JSONString!, 
                $pricematrix: JSONString!, 
                $stklocmatrix: JSONString!, 
                $stklvlmatrix: JSONString!, 
                $stktypematrix: JSONString!,
                $obslmatrix: JSONString!
            ) {
                E4kTblproductProductpropertylevelUpdate( 
                    companyid: $companyid, 
                    productid: $productid,
                    stockmatrix: $stockmatrix,
                    pricematrix: $pricematrix,
                    stklocmatrix: $stklocmatrix,
                    stklvlmatrix: $stklvlmatrix,
                    stktypematrix: $stktypematrix,
                    obslmatrix: $obslmatrix
                ) {
                    updateProductPropertyLevel
                }
            }

        `,
        variables: { 
          companyid:companyid,
          productid:productid, 
          stockmatrix:stockmatrix,
          pricematrix:pricematrix,
          stklocmatrix:stklocmatrix,
          stklvlmatrix:stklvlmatrix,
          stktypematrix: stktypematrix,
          obslmatrix:obslmatrix
        },
        },
    }),
    invalidatesTags: (result, error, { stockmatrix }) => [
        { type: 'ProductPropertiesLevelSet', id: stockmatrix },
        { type: 'ProductPropertiesLevelSet', id: 'LIST' },
    ],
    }),







    //////////////////////////// product properties api

    getProductPropertieslevel: builder.query({
      query: ({companyid,productid,propertyid}) => ({
        body: {
          query: gql`
            query ProductPropertiesSelectAPIlevel($companyid: String!,$productid: String!,$propertyid:Int) {
             e4kTblproductProductProperties(companyid: $companyid,productid: $productid, propertyid: $propertyid) {
                    ... on E4K_TblproductProductPropertiesNode {
                        seqno
                        productPropid
                        propertyid {
                            description
                            propertyid
                            isstatic
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
                result
                  ? [
                      ...result.e4kTblproductProductProperties.map(({ productPropid }) => ({
                        type: 'ProductPropertiesLevelSet',
                        id: productPropid,
                      })),
                      { type: 'ProductPropertiesLevelSet', id: 'LIST' },
                    ]
                  : [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }],
      
    }),
    

    createProductPropertieslevel: builder.mutation({
        query: ({companyid ,productid,propertyid,seqNo }) => ({
          body: {
            query: gql`
              mutation CreateProductPropertieslevel($companyid: String!,$productid: String!, $propertyid: Int!,$seqNo: Int!) {
                E4kTblproductProductpropertiesCreate( companyid: $companyid,productid: $productid,propertyid: $propertyid,seqNo: $seqNo) {
                  productProperties
                }
              }
            `,
            variables: {companyid:companyid, productid:productid,propertyid:propertyid,seqNo:seqNo },
          },
        }),
        invalidatesTags: [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }], // Optional: Invalidate cache tags
    }),
  
    updateProductPropertieslevel: builder.mutation({
        query: ({companyid,productid, propertyid,newSeqNo}) => ({
          body: {
            query: gql`
              mutation UpdateProductPropertieslevel($companyid: String!, $productid: String!,$propertyid: Int!, $newSeqNo: Int!) {
                E4kTblproductProductpropertiesUpdate( companyid: $companyid, productid: $productid,propertyid: $propertyid,newSeqNo: $newSeqNo) {
                  UpdateProperty
                }
              }
            `,
            variables: { companyid:companyid,productid:productid, propertyid:propertyid,newSeqNo:newSeqNo },
          },
        }),
        invalidatesTags: (result, error, { propertyid }) => [
          { type: 'ProductPropertiesLevelSet', id: propertyid },
          { type: 'ProductPropertiesLevelSet', id: 'LIST' },
        ],
    }),
  
    deleteProductPropertieslevel: builder.mutation({
        query: ({ companyid,productid, propertyid,productPropId }) => ({
          body: {
            query: gql`
              mutation DeleteProductPropertieslevel($companyid: String!, $productid: String!,$propertyid: Int!, $productPropId: Int!) {
                E4kTblproductProductpropertiesDelete(companyid: $companyid, productid: $productid,propertyid: $propertyid,productPropId: $productPropId) {
                  deleteProperties
                }
              }
            `,
            variables: { companyid:companyid,productid:productid, propertyid:propertyid,productPropId:productPropId },
          },
        }),
        invalidatesTags: (result, error, { propertyid }) => [
          { type: 'ProductPropertiesLevelSet', id: propertyid },
          { type: 'ProductPropertiesLevelSet', id: 'LIST' },
        ],
    }),







    ///////////////////////////////////propduct properties values
    getProductPropertiesValuesSelectlevel: builder.query({
      query: ({companyid,productid,propertyid}) => ({
        body: {
          query: gql`
            query ProductPropertiesValuesSelectAPIlevel($companyid: String!,$productid: String!,$propertyid:Int) {
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
                  type: 'ProductPropertiesLevelSet',
                  id: productPropid.productPropid,
                })),
              { type: 'ProductPropertiesLevelSet', id: 'LIST' },
            ]
          : [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }],
    }),

    createProductPropertiesValueslevel: builder.mutation({
      query: ({companyid ,productid,productPropValue,propertyid }) => ({
        body: {
          query: gql`
            mutation CreateProductPropertiesValueslevel($companyid: String!, $productid: String!, $productPropValue: [String]!, $propertyid: Int!) {
              E4kTblproductProductpropertiesValuesCreate( companyid: $companyid,productid: $productid,productPropValue: $productPropValue,propertyid: $propertyid ) {
                createPropertyValues
              }
            }
          `,
          variables: {companyid:companyid, productid:productid,productPropValue:productPropValue,propertyid:propertyid },
        },
      }),
      invalidatesTags: [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }], // Optional: Invalidate cache tags
    }),

    UpdateProductPropertiesValueslevel: builder.mutation({
      query: ({companyid ,productid,propertyid,productPropValues }) => ({
        body: {
          query: gql`
            mutation UpdateProductPropertiesValueslevel($companyid: String!,$productid: String!, $propertyid: Int!,$productPropValues: [String]!) {
              E4kTblproductProductpropertiesValuesUpdate( companyid: $companyid,productid: $productid,propertyid: $propertyid,productPropValues: $productPropValues ) {
                updatePropertyValues
              }
            }
          `,
          variables: {companyid:companyid, productid:productid,propertyid:propertyid,productPropValues:productPropValues },
        },
      }),
      invalidatesTags: (result, error, { propertyid }) => [
        { type: 'ProductPropertiesLevelSet', id: propertyid },
        { type: 'ProductPropertiesLevelSet', id: 'LIST' },
      ], // Optional: Invalidate cache tags
    }),

    DeleteProductPropertiesValueslevel: builder.mutation({
      query: ({companyid ,productid,propertyid,productPropValue }) => ({
        body: {
          query: gql`
            mutation DeleteProductPropertiesValueslevel($companyid: String!,$productid: String!, $propertyid: Int!,$productPropValue: String!) {
              E4kTblproductProductpropertiesValuesDelete( companyid: $companyid,productid: $productid,propertyid: $propertyid ,productPropValue: $productPropValue) {
                deletePropertyValues
              }
            }
          `,
          variables: {companyid:companyid, productid:productid,propertyid:propertyid,productPropValue:productPropValue },
        },
      }),
      invalidatesTags: (result, error, { propertyid }) => [
        { type: 'ProductPropertiesLevelSet', id: propertyid },
        { type: 'ProductPropertiesLevelSet', id: 'LIST' },
      ], 
    }),


    /////////////////// statandard Price API functions
    getProductStandardPriceMatrixLevel: builder.query({
      query: ({companyid,productid}) => ({
        body: {
          query: gql`
            query ProductStandardPriceMatrix($companyid: String!,$productid: String!) {
             e4kTblproductProductPriceStandardMatrix(companyid: $companyid,productid: $productid) {
                   ... on E4K_TblproductProductPriceStandardMatrixNode {
                        id
                        stdpricematix
                        productid {
                          productid
                        }
                      }
                      ... on CustomErrorType {
                        message
                      }
                    }
                  }
          `,
          variables: { companyid : companyid, productid:productid },
        },
      }),

    providesTags: (result) =>
      result && result.data && result.data.e4kTblproductProductPriceStandardMatrix
        ? [
            ...result.data.e4kTblproductProductPriceStandardMatrix
              .filter(({ id }) => id) // Ensure productPropid exists
              .map(({ id }) => ({
                type: 'ProductPropertiesLevelSet',
                id: id.id,
              })),
            { type: 'ProductPropertiesLevelSet', id: 'LIST' },
          ]
        : [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }],
    }),

    updateProductStandardPriceMatrixLevel: builder.mutation({
      query: ({companyid ,productid,stdpricematix }) => ({
        body: {
          query: gql`
            mutation UpdateProductPropertiesStandardPriceMatrixlevel($companyid: String!,$productid: String!, $stdpricematix: [JSONString]!) {
              E4kTblproductProductpricestandardmatrixUpdate( companyid: $companyid,productid: $productid,stdpricematix: $stdpricematix) {
                success
              }
            }
          `,
          variables: {companyid:companyid, productid:productid,stdpricematix:stdpricematix },
        },
      }),
      invalidatesTags: [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }], // Optional: Invalidate cache tags
    }),



  //////////////// Standard cost Price
    getProductStandardCostMatrixLevel: builder.query({
      query: ({companyid,productid}) => ({
        body: {
          query: gql`
            query ProductStandardCostMatrix($companyid: String!,$productid: String!) {
              e4kTblproductProductCostStandardMatrix(companyid: $companyid,productid: $productid) {
                    ... on E4K_TblproductProductCostStandardMatrixNode {
                        id
                        stdcostmatix
                        productid {
                            productid
                        }
                        }
                        ... on CustomErrorType {
                        message
                        }
                    }
                    }
          `,
          variables: { companyid : companyid, productid:productid },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductCostStandardMatrix.map(({ id }) => ({
                        type: 'ProductPropertiesLevelSet',
                        id: id,
                      })),
                      { type: 'ProductPropertiesLevelSet', id: 'LIST' },
                    ]
                  : [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }],
      
    }),


    updateProductStandardCostMatrixLevel: builder.mutation({
      query: ({companyid ,productid,stdcostmatix }) => ({
        body: {
          query: gql`
            mutation UpdateProductPropertiesStandardCostMatrixlevel($companyid: String!,$productid: String!, $stdcostmatix: [JSONString]!) {
              E4kTblproductProductcoststandardmatrixUpdate( companyid: $companyid,productid: $productid,stdcostmatix: $stdcostmatix) {
                success
              }
            }
          `,
          variables: {companyid:companyid, productid:productid,stdcostmatix:stdcostmatix },
        },
      }),
      invalidatesTags: [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }], // Optional: Invalidate cache tags
    }),


  ////////////////// Stocking level matix api
    getProductStockingLevelMatrixLevel: builder.query({
      query: ({companyid,productid}) => ({
        body: {
          query: gql`
            query ProductStockingLevelMatrix($companyid: String!,$productid: String!) {
              e4kTblproductProductStockinglevelMatrix(companyid: $companyid,productid: $productid) {
                    ... on E4K_TblproductProductStockinglevelMatrixNode {
                        id
                        stocklevelmatix
                        }
                        ... on CustomErrorType {
                        message
                        }
                    }
                    }
          `,
          variables: { companyid : companyid, productid:productid },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductStockinglevelMatrix.map(({ id }) => ({
                        type: 'ProductPropertiesLevelSet',
                        id: id,
                      })),
                      { type: 'ProductPropertiesLevelSet', id: 'LIST' },
                    ]
                  : [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }],
      
    }),


    createProductStockingLevelMatrixLevel: builder.mutation({
      query: ({companyid ,productid,warehouseid }) => ({
        body: {
          query: gql`
            mutation CreateProductPropertiesStockingLevelmatrixlevel($companyid: String!,$productid: String!, $warehouseid: String!) {
              E4kTblproductProductstockinglevelmatrixCreate( companyid: $companyid,productid: $productid,warehouseid: $warehouseid) {
                success
              }
            }
          `,
          variables: {companyid:companyid, productid:productid,warehouseid:warehouseid },
        },
      }),
      invalidatesTags: [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }], // Optional: Invalidate cache tags
    }),
  
    updateProductStockingLevelMatrixLevel: builder.mutation({
      query: ({companyid ,productid,stocklevelmatix }) => ({
        body: {
          query: gql`
            mutation UpdateProductPropertiesStockingLevelmatrixlevel($companyid: String!,$productid: String!, $stocklevelmatix: [JSONString]!) {
              E4kTblproductProductstockinglevelmatrixUpdate( companyid: $companyid,productid: $productid,stocklevelmatix: $stocklevelmatix) {
                success
              }
            }
          `,
          variables: {companyid:companyid, productid:productid,stocklevelmatix:stocklevelmatix },
        },
      }),
      invalidatesTags: [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }], // Optional: Invalidate cache tags
    }),




    ///////////////// Stocking Type Matix api
    getProductStockingTypeMatrixLevel: builder.query({
      query: ({companyid,productid}) => ({
        body: {
          query: gql`
            query ProductStockingTypeMatrix($companyid: String!,$productid: String!) {
            e4kTblproductProductStockingtypeMatrix(companyid: $companyid,productid: $productid) {
                  ... on E4K_TblproductProductStockingtypeMatrixNode {
                        id
                        stocktypematix
                        productid {
                            productid
                        }
                        }
                        ... on CustomErrorType {
                        message
                        }
                    }
                    }
          `,
          variables: { companyid : companyid, productid:productid },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductStockingtypeMatrix.map(({ id }) => ({
                        type: 'ProductPropertiesLevelSet',
                        id: id,
                      })),
                      { type: 'ProductPropertiesLevelSet', id: 'LIST' },
                    ]
                  : [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }],
      
    }),


    updateProductStockingTypeMatrixLevel: builder.mutation({
          query: ({companyid ,productid,stocktypematix }) => ({
            body: {
              query: gql`
                mutation UpdateProductPropertiesStockingTypematrixlevel($companyid: String!,$productid: String!, $stocktypematix: [JSONString]!) {
                  E4kTblproductProductstockingtypematrixUpdate( companyid: $companyid,productid: $productid,stocktypematix: $stocktypematix) {
                    success
                  }
                }
              `,
              variables: {companyid:companyid, productid:productid,stocktypematix:stocktypematix },
            },
          }),
          invalidatesTags: [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }], // Optional: Invalidate cache tags
    }),


    ///////////////// Obsolete Type Matix api
    getProductObsoleteTypeMatrixLevel: builder.query({
      query: ({companyid,productid}) => ({
        body: {
          query: gql`
            query ProductObsoleteTypeMatrix($companyid: String!,$productid: String!) {
            e4kTblproductProductObsoletetypeMatrix(companyid: $companyid,productid: $productid) {
                  ... on E4K_TblproductProductObsoleteMatrixNode {
                    id
                    obslmatix
                    productid {
                      productid
                    }
                  }
                  ... on CustomErrorType {
                    message
                  }
                }
              }
          `,
          variables: { companyid : companyid, productid:productid },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductObsoletetypeMatrix.map(({ id }) => ({
                        type: 'ProductPropertiesLevelSet',
                        id: id,
                      })),
                      { type: 'ProductPropertiesLevelSet', id: 'LIST' },
                    ]
                  : [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }],
      
    }),


    updateProductObsoleteTypeMatrixLevel: builder.mutation({
      query: ({companyid ,productid,obslmatix }) => ({
        body: {
          query: gql`
            mutation UpdateProductPropertiesObsoleteTypematrixlevel($companyid: String!,$productid: String!, $obslmatix: [JSONString]!) {
              E4kTblproductProductobsoletetypematrixUpdate( companyid: $companyid,productid: $productid,obslmatix: $obslmatix) {
                success
              }
            }
          `,
          variables: {companyid:companyid, productid:productid,obslmatix:obslmatix },
        },
      }),
      invalidatesTags: [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }], // Optional: Invalidate cache tags
}),



    /////////////////// Customer Price API functions
    getProductCustomerPriceMatrixLevel: builder.query({
      query: ({companyid,customerid,productid}) => ({
        body: {
          query: gql`
            query ProductCustomerPriceMatrix($companyid: String!,$customerid: String!,$productid: String!) {
             e4kTblproductProductPriceCustomerMatrix(companyid: $companyid,customerid: $customerid,productid: $productid) {
                   ... on E4K_TblproductProductPriceCustomerMatrixNode {
                      id
                      businessid {
                        businessid
                        name
                      }
                      productid {
                        productid
                        description
                      }
                      cuspricematix
                    }
                    ... on CustomErrorType {
                      message
                    }
                  }
                }
          `,
          variables: { companyid : companyid, customerid: customerid ,productid:productid },
        },
      }),

    providesTags: (result) =>
      result && result.data && result.data.e4kTblproductProductPriceCustomerMatrix
        ? [
            ...result.data.e4kTblproductProductPriceCustomerMatrix
              .filter(({ id }) => id) // Ensure productPropid exists
              .map(({ id }) => ({
                type: 'ProductPropertiesLevelSet',
                id: id.id,
              })),
            { type: 'ProductPropertiesLevelSet', id: 'LIST' },
          ]
        : [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }],
    }),


    createProductCustomerPriceMatrixLevel: builder.mutation({
      query: ({companyid ,customerid,productid }) => ({
        body: {
          query: gql`
            mutation CreateProductPropertiesCustomerPriceMatrixlevel($companyid: String!,$customerid: String!,$productid: String!) {
              E4kTblproductProductpricecustomermatrixCreate( companyid: $companyid,customerid: $customerid,productid: $productid) {
                success
              }
            }
          `,
          variables: {companyid:companyid,customerid: customerid ,productid:productid },
        },
      }),
      invalidatesTags: [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }], // Optional: Invalidate cache tags
    }),

    updateProductCustomerPriceMatrixLevel: builder.mutation({
      query: ({companyid ,customerid,productid,cuspricematix }) => ({
        body: {
          query: gql`
            mutation UpdateProductPropertiesCustomerPriceMatrixlevel($companyid: String!,$customerid: String!,$productid: String!, $cuspricematix: [JSONString]!) {
              E4kTblproductProductpricecustomermatrixUpdate( companyid: $companyid,customerid: $customerid,productid: $productid,cuspricematix: $cuspricematix) {
                success
              }
            }
          `,
          variables: {companyid:companyid,customerid: customerid ,productid:productid,cuspricematix:cuspricematix },
        },
      }),
      invalidatesTags: [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }], // Optional: Invalidate cache tags
    }),


    ///////////////////////////// Supplier cost api functions
    /////////////////// Customer Price API functions
    getProductSupplierCostMatrixLevel: builder.query({
      query: ({companyid,supplierid,productid}) => ({
        body: {
          query: gql`
            query ProductSupplierCostMatrix($companyid: String!,$supplierid: String!,$productid: String!) {
             e4kTblproductProductCostSupplierMatrix(companyid: $companyid,supplierid: $supplierid,productid: $productid) {
                   ... on E4K_TblproductProductCostSupplierMatrixNode {
                        id
                        supcostmatix
                        businessid {
                          businessid
                          name
                        }
                        productid {
                          productid
                        }
                      }
                      ... on CustomErrorType {
                        message
                      }
                    }
                  }
          `,
          variables: { companyid : companyid, supplierid: supplierid ,productid:productid },
        },
      }),

    providesTags: (result) =>
      result && result.data && result.data.e4kTblproductProductCostSupplierMatrix
        ? [
            ...result.data.e4kTblproductProductCostSupplierMatrix
              .filter(({ id }) => id) // Ensure productPropid exists
              .map(({ id }) => ({
                type: 'ProductPropertiesLevelSet',
                id: id.id,
              })),
            { type: 'ProductPropertiesLevelSet', id: 'LIST' },
          ]
        : [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }],
    }),

    createProductSupplierCostMatrixLevel: builder.mutation({
      query: ({companyid ,supplierid,productid }) => ({
        body: {
          query: gql`
            mutation CreateProductPropertiesSupplierCostMatrixlevel($companyid: String!,$supplierid: String!,$productid: String!) {
              E4kTblproductProductcostsuppliermatrixCreate( companyid: $companyid,supplierid: $supplierid,productid: $productid) {
                success
              }
            }
          `,
          variables: {companyid:companyid,supplierid: supplierid ,productid:productid },
        },
      }),
      invalidatesTags: [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }], // Optional: Invalidate cache tags
    }),

    updateProductSupplierCostMatrixLevel: builder.mutation({
      query: ({companyid ,supplierid,productid,supcostmatix }) => ({
        body: {
          query: gql`
            mutation UpdateProductPropertiesSupplierCostMatrixlevel($companyid: String!,$supplierid: String!,$productid: String!, $supcostmatix: [JSONString]!) {
              E4kTblproductProductcostsuppliermatrixUpdate( companyid: $companyid,supplierid: $supplierid,productid: $productid,supcostmatix: $supcostmatix) {
                success
              }
            }
          `,
          variables: {companyid:companyid,supplierid: supplierid ,productid:productid,supcostmatix:supcostmatix },
        },
      }),
      invalidatesTags: [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }], // Optional: Invalidate cache tags
    }),



////////////////////// get product properties quwery

getProductPropertiesSelectLevel: builder.query({
  query: ({companyid,productid,propertyid}) => ({
    body: {
      query: gql`
        query ProductPropertiesSelectAPI($companyid: String!,$productid: String!,$propertyid:Int) {
         e4kTblproductProductProperties(companyid: $companyid,productid: $productid, propertyid: $propertyid) {
                ... on E4K_TblproductProductPropertiesNode {
                    seqno
                    productPropid
                    propertyid {
                        description
                        propertyid
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
            result
              ? [
                  ...result.e4kTblproductProductProperties.map(({ productPropid }) => ({
                    type: 'ProductPropertiesLevelSet',
                    id: productPropid,
                  })),
                  { type: 'ProductPropertiesLevelSet', id: 'LIST' },
                ]
              : [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }],
  
}),


///////////////////////////////////// Product Standard Date Price Matrix get Update and Delete

getProductStandardPriceDateMatrixLevel: builder.query({
  query: ({companyid,productid}) => ({
    body: {
      query: gql`
        query ProductStandardPriceDateMatrix($companyid: String!,$productid: String!) {
         e4kTblproductProductPriceStandardDateMatrix(companyid: $companyid,productid: $productid) {
               ... on E4K_TblproductProductPriceStandardDateMatrixNode {
                    id
                    stdpricematix
                    productid {
                      productid
                    }
                  }
                  ... on CustomErrorType {
                    message
                  }
                }
              }
      `,
      variables: { companyid : companyid, productid:productid },
    },
  }),

providesTags: (result) =>
  result && result.data && result.data.e4kTblproductProductPriceStandardDateMatrix
    ? [
        ...result.data.e4kTblproductProductPriceStandardDateMatrix
          .filter(({ id }) => id) // Ensure productPropid exists
          .map(({ id }) => ({
            type: 'ProductPropertiesLevelSet',
            id: id.id,
          })),
        { type: 'ProductPropertiesLevelSet', id: 'LIST' },
      ]
    : [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }],
}),


updateProductStandardPriceDateMatrixLevel: builder.mutation({
  query: ({companyid ,productid,stdpricematix }) => ({
    body: {
      query: gql`
        mutation UpdateProductPropertiesStandardPriceDateMatrixlevel($companyid: String!,$productid: String!, $stdpricematix: [JSONString]!) {
          E4kTblproductProductpricestandarddatematrixUpdate( companyid: $companyid,productid: $productid,stdpricematix: $stdpricematix) {
            success
          }
        }
      `,
      variables: {companyid:companyid, productid:productid,stdpricematix:stdpricematix },
    },
  }),
  invalidatesTags: [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }], // Optional: Invalidate cache tags
}),


////////////////////////// Delete
deleteProductStandardPriceDateMatrixLevel: builder.mutation({
  query: ({companyid ,productid,deletedateprice }) => ({
    body: {
      query: gql`
        mutation DeleteProductPropertiesStandardPriceDateMatrixlevel($companyid: String!,$productid: String!, $deletedateprice: JSONString!) {
          E4kTblproductProductpricestandardatematrixDelete( companyid: $companyid,productid: $productid,deletedateprice: $deletedateprice) {
            success
          }
        }
      `,
      variables: {companyid:companyid, productid:productid,deletedateprice:deletedateprice },
    },
  }),
  invalidatesTags: [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }], // Optional: Invalidate cache tags
}),



///////////////////////////////////// Product Standard Qty Price Matrix get Update and Delete

getProductStandardPriceQtyMatrixLevel: builder.query({
  query: ({companyid,productid}) => ({
    body: {
      query: gql`
        query ProductStandardPriceQtyMatrix($companyid: String!,$productid: String!) {
         e4kTblproductProductPriceStandardQtyMatrix(companyid: $companyid,productid: $productid) {
               ... on E4K_TblproductProductPriceStandardQtyMatrixNode {
                    id
                    stdpricematix
                    productid {
                      productid
                    }
                  }
                  ... on CustomErrorType {
                    message
                  }
                }
              }
      `,
      variables: { companyid : companyid, productid:productid },
    },
  }),

providesTags: (result) =>
  result && result.data && result.data.e4kTblproductProductPriceStandardQtyMatrix
    ? [
        ...result.data.e4kTblproductProductPriceStandardQtyMatrix
          .filter(({ id }) => id) // Ensure productPropid exists
          .map(({ id }) => ({
            type: 'ProductPropertiesLevelSet',
            id: id.id,
          })),
        { type: 'ProductPropertiesLevelSet', id: 'LIST' },
      ]
    : [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }],
}),



updateProductStandardPriceQtyMatrixLevel: builder.mutation({
  query: ({companyid ,productid,stdpricematix }) => ({
    body: {
      query: gql`
        mutation UpdateProductPropertiesStandardPriceQtyMatrixlevel($companyid: String!,$productid: String!, $stdpricematix: [JSONString]!) {
          E4kTblproductProductpricestandardqtymatrixUpdate( companyid: $companyid,productid: $productid,stdpricematix: $stdpricematix) {
            success
          }
        }
      `,
      variables: {companyid:companyid, productid:productid,stdpricematix:stdpricematix },
    },
  }),
  invalidatesTags: [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }], // Optional: Invalidate cache tags
}),


////////////////////////// Delete
deleteProductStandardPriceQtyMatrixLevel: builder.mutation({
  query: ({companyid ,productid,deleteqtyprice }) => ({
    body: {
      query: gql`
        mutation DeleteProductPropertiesStandardPriceQtyMatrixlevel($companyid: String!,$productid: String!, $deleteqtyprice: JSONString!) {
          E4kTblproductProductpricestandarqtymatrixDelete( companyid: $companyid,productid: $productid,deleteqtyprice: $deleteqtyprice) {
            success
          }
        }
      `,
      variables: {companyid:companyid, productid:productid,deleteqtyprice:deleteqtyprice },
    },
  }),
  invalidatesTags: [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }], // Optional: Invalidate cache tags
}),

//////////////////////////////// property level col matrix

    getProductPropertiesLevelColMatrixLevel: builder.query({
      query: ({companyid,productid}) => ({
        

        body: {
          query: gql`
            query ProductPropertiesLevelColMatrix($companyid: String!,$productid: String!) {
              e4kTblproductProductPropertyLevelColmatrix(companyid: $companyid,productid: $productid) {
                    ... on E4K_TblProductProductPropertyLevelColmatrixNode {
                    stockcolmatrix
                    pricecolmatrix
                    stklvlcolmatrix
                    stktypecolmatrix
                    stkloccolmatrix
                    obslcolmatrix
                    productid {
                        productid
                    }
                    }
                    ... on CustomErrorType {
                    message
                    }
                }
                }
          `,
          variables: { companyid : companyid, productid:productid },
        },
      }),
      providesTags: (result) =>
                result
                  ? [
                      ...result.e4kTblproductProductPropertyLevelColmatrix.map(({ productid }) => ({
                        type: 'ProductPropertiesLevelSet',
                        id: productid,
                      })),
                      { type: 'ProductPropertiesLevelSet', id: 'LIST' },
                    ]
                  : [{ type: 'ProductPropertiesLevelSet', id: 'LIST' }],
      
    }),

    }),
  });
  
  export const {
    ///////properties level set
    useGetProductProductPropertiesLevelQuery,
    useCreateProductPropertiesLevelMutation,
    // useCreateProductPropertiesMutation,
    useUpdateProductPropertiesLevelMutation,
    // useDeleteProductPropertiesMutation,



/////////////////// product properties
    useGetProductPropertieslevelQuery,
    useCreateProductPropertieslevelMutation,
    useUpdateProductPropertieslevelMutation,
    useDeleteProductPropertieslevelMutation,



    /////////////////// product proeprties values
    useGetProductPropertiesValuesSelectlevelQuery,
    useCreateProductPropertiesValueslevelMutation,
    useUpdateProductPropertiesValueslevelMutation,
    useDeleteProductPropertiesValueslevelMutation,


    ///////StandardPrice
    useGetProductStandardPriceMatrixLevelQuery,
    useUpdateProductStandardPriceMatrixLevelMutation,

    ////////////// Standard Date Price
    useGetProductStandardPriceDateMatrixLevelQuery,
    useUpdateProductStandardPriceDateMatrixLevelMutation,
    useDeleteProductStandardPriceDateMatrixLevelMutation,

    //////////////// Standard Qty Price
    useGetProductStandardPriceQtyMatrixLevelQuery,
    useUpdateProductStandardPriceQtyMatrixLevelMutation,
    useDeleteProductStandardPriceQtyMatrixLevelMutation,


    ////////Standard cost price
    useGetProductStandardCostMatrixLevelQuery,
    useUpdateProductStandardCostMatrixLevelMutation,


    /////////////// Customer Price hooks
    useGetProductCustomerPriceMatrixLevelQuery,
    useCreateProductCustomerPriceMatrixLevelMutation,
    useUpdateProductCustomerPriceMatrixLevelMutation,


    //////////////////// Supplier cost hooks
    useGetProductSupplierCostMatrixLevelQuery,
    useCreateProductSupplierCostMatrixLevelMutation,
    useUpdateProductSupplierCostMatrixLevelMutation,


    ////////// Stocking Level Matrix API
    useGetProductStockingLevelMatrixLevelQuery,
    useCreateProductStockingLevelMatrixLevelMutation,
    useUpdateProductStockingLevelMatrixLevelMutation,


    /////////////// Stocking type matrix API
    useGetProductStockingTypeMatrixLevelQuery,
    useUpdateProductStockingTypeMatrixLevelMutation,

    ///////////////// Obsolete type matrix API
    useGetProductObsoleteTypeMatrixLevelQuery,
    useUpdateProductObsoleteTypeMatrixLevelMutation,


    ///////propery level col matrix
    useGetProductPropertiesLevelColMatrixLevelQuery,


    /////////////
    useGetProductPropertiesSelectLevelQuery,

  } = e4kTblProductProductPropertiesLevel;
