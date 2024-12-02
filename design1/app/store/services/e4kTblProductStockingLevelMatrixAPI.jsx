
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


export const e4kTblProductStockingLevelMatrix = createApi({
  reducerPath: 'e4kTblProductStockingLevelMatrix',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductPropertiesStockingLevelMatrix'],
  endpoints: (builder) => ({
  getProductStockingLevelMatrix: builder.query({
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
                      type: 'ProductPropertiesStockingLevelMatrix',
                      id: id,
                    })),
                    { type: 'ProductPropertiesStockingLevelMatrix', id: 'LIST' },
                  ]
                : [{ type: 'ProductPropertiesStockingLevelMatrix', id: 'LIST' }],
    
  }),
    

    // createProductPriceTypes: builder.mutation({
    //     query: ({companyid ,description,priceType }) => ({
    //       body: {
    //         query: gql`
    //           mutation CreateProductPriceTypes($companyid: String!,$description: String!, $priceType: Int!) {
    //             E4kTblproductProductpricetypesCreate( companyid: $companyid,description: $description,priceType: $priceType) {
    //               priceType
    //             }
    //           }
    //         `,
    //         variables: {companyid:companyid, description:description,priceType:priceType },
    //       },
    //     }),
    //     invalidatesTags: [{ type: 'ProductPriceTypes', id: 'LIST' }], // Optional: Invalidate cache tags
    //   }),
  
    //   updateProductPriceTypes: builder.mutation({
    //     query: ({companyid,priceid, description,priceType}) => ({
    //       body: {
    //         query: gql`
    //           mutation UpdateProductPriceTypes($companyid: String!,$priceid: Int!, $description: String!, $priceType: Int!) {
    //             E4kTblproductProductpricetypesUpdate( companyid: $companyid,priceid: $priceid, description: $description,priceType: $priceType) {
    //               priceType
    //             }
    //           }
    //         `,
    //         variables: { companyid:companyid,priceid:priceid, description:description,priceType:priceType },
    //       },
    //     }),
    //     invalidatesTags: (result, error, { priceid }) => [
    //       { type: 'ProductPriceTypes', id: priceid },
    //       { type: 'ProductPriceTypes', id: 'LIST' },
    //     ],
    //   }),
  
    //   deleteProductPriceTypes: builder.mutation({
    //     query: ({ priceid, companyid }) => ({
    //       body: {
    //         query: gql`
    //           mutation DeleteProductPriceTypes($priceid: Int!, $companyid: String!) {
    //             E4kTblproductProductpricetypesDelete(priceid: $priceid, companyid: $companyid) {
    //               success
    //             }
    //           }
    //         `,
    //         variables: { priceid:priceid,companyid:companyid },
    //       },
    //     }),
    //     invalidatesTags: (result, error, { priceid }) => [
    //       { type: 'ProductPriceTypes', id: priceid },
    //       { type: 'ProductPriceTypes', id: 'LIST' },
    //     ],
    //   }),
    }),
  });
  
  export const {
    useGetProductStockingLevelMatrixQuery,
    // useCreateProductPriceTypesMutation,
    // useUpdateProductPriceTypesMutation,
    // useDeleteProductPriceTypesMutation,
  } = e4kTblProductStockingLevelMatrix;
