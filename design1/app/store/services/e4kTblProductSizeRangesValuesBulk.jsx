

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

export const e4kTblProductSizeRangeValuesBulk = createApi({
  reducerPath: 'e4kTblProductSizeRangeValuesBulk',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductSizeRangeValuesBulk','ProductSizeRanges'],
  endpoints: (builder) => ({

    getProductSizeRangeValuesBulk: builder.query({
      query: ({ companyid, rangeid, sizenumber }) => ({
        body: {
          query: gql`
            query GetProductSizeRangesValuesBulk($companyid: String!, $rangeid: String!, $sizenumber: Int) {
              e4kTblproductProductSizeRangeValues(companyid: $companyid, rangeid: $rangeid, sizenumber: $sizenumber) {
                ... on E4K_TblproductSizeRangeValuesNode {
                  id
                  sizeNumber
                  sizeValue
                  rangeid {
                    rangeid
                  }
                  companyid {
                    companyid
                  }
                }
                ... on CustomErrorType {
                  message
                }
              }
            }
          `,
          variables: { companyid, rangeid, sizenumber },
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.e4kTblproductProductSizeRangeValues.map(({ rangeid }) => ({
                type: 'ProductSizeRangeValuesBulk',
                id: rangeid,
              })),
              { type: 'ProductSizeRangeValuesBulk', id: 'LIST' },
            ]
          : [{ type: 'ProductSizeRangeValuesBulk', id: 'LIST' }],
    }),

    getProductSizeRanges: builder.query({
        query: ({ companyid, rangeid }) => ({
          body: {
            query: gql`
              query GetProductSizeRanges($companyid: String!, $rangeid: String!) {
                e4kTblproductProductSizeRanges(companyid: $companyid, rangeid: $rangeid) {
                  ... on E4K_TblproductSizeRangesNode {
                    id
                    rangeid
                    companyid {
                      companyid
                    }
                  }
                  ... on CustomErrorType {
                    message
                  }
                }
              }
            `,
            variables: { companyid, rangeid },
          },
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.e4kTblproductProductSizeRanges.map(({ rangeid }) => ({
                  type: 'ProductSizeRanges',
                  id: rangeid,
                })),
                { type: 'ProductSizeRanges', id: 'LIST' },
              ]
            : [{ type: 'ProductSizeRanges', id: 'LIST' }],
      }),

    createProductSizeRangeValuesBulk: builder.mutation({
      query: ({ companyid, rangeid, sizeNumber, sizeValue }) => ({
        body: {
          query: gql`
                mutation BulkUpdateSizeRanges($companyid: String!, $rangeid: String!, $sizeNumber: [Int!]!, $sizeValue: [String!]!) {
                E4kTblproductProductsizerangesvaluesBulkCreate(
                companyid: $companyid
                rangeid: $rangeid
                sizeNumber: $sizeNumber
                sizeValue: $sizeValue
                ) {
                sizeRanges
                }
            }
          `,
          variables: { companyid, rangeid, sizeNumber, sizeValue },
        },
      }),
      invalidatesTags: (result, error, { rangeid }) => [
        { type: 'ProductSizeRangeValuesBulk', id: rangeid },
        { type: 'ProductSizeRangeValuesBulk', id: 'LIST' },
      ],
    }),

    createProductSizeRanges: builder.mutation({
        query: ({ companyid, rangeid }) => ({
          body: {
            query: gql`
              mutation CreateProductSizeRange($companyid: String!, $rangeid: String!) {
                E4kTblproductProductsizerangesCreate(companyid: $companyid, rangeid: $rangeid) {
                  sizeRanges
                }
              }
            `,
            variables: { companyid, rangeid },
          },
        }),
        invalidatesTags: [{ type: 'ProductSizeRanges', id: 'LIST' }],
      }),

    updateProductSizeRangeValuesBulk: builder.mutation({
      query: ({ companyid, rangeid, sizeNumber, sizeValue }) => ({
        body: {
          query: gql`
                mutation BulkUpdateSizeRanges($companyid: String!, $rangeid: String!, $sizeNumber: [Int!]!, $sizeValue: [String!]!) {
                E4kTblproductProductsizerangesvaluesBulkUpdate(
                companyid: $companyid
                rangeid: $rangeid
                sizeNumber: $sizeNumber
                sizeValue: $sizeValue
                ) {
                success
                }
            }
          `,
          variables: { companyid, rangeid, sizeNumber, sizeValue },
        },
      }),
      invalidatesTags: [{ type: 'ProductSizeRanges', id: 'LIST' }, { type: 'ProductSizeRangeValuesBulk', id: 'LIST' }],
    }),

    deleteProductSizeRangeValuesBulk: builder.mutation({
      query: ({ companyid, rangeid }) => ({
        body: {
          query: gql`
            mutation BulkDeleteSizeRanges($companyid: String!, $rangeid: String!) {
              E4kTblproductProductsizerangesvaluesBulkDelete(companyid: $companyid, rangeid: $rangeid) {
                success
              }
            }
          `,
          variables: { companyid, rangeid },
        },
      }),
      invalidatesTags: [{ type: 'ProductSizeRangeValuesBulk', id: 'LIST' }],
    }),

    deleteProductSizeRanges: builder.mutation({
        query: ({ companyid, rangeid }) => ({
          body: {
            query: gql`
              mutation DeleteProductSizeRanges($companyid: String!, $rangeid: String!) {
                E4kTblproductProductsizerangesDelete(companyid: $companyid, rangeid: $rangeid) {
                  success
                }
              }
            `,
            variables: { companyid, rangeid},
          },
        }),
        //invalidatesTags: [{ type: 'ProductSizeRangeValuesBulk', id: 'LIST' }, { type: 'ProductSizeRanges', id: 'LIST' }],
        // invalidatesTags: (result, error, rangeid) => [
        //     { type: 'ProductSizeRanges', rangeid },
        
        // ],
    }),
   
  }),
});

export const {
  useGetProductSizeRangeValuesBulkQuery,
  useCreateProductSizeRangeValuesBulkMutation,
  useUpdateProductSizeRangeValuesBulkMutation,
 useDeleteProductSizeRangeValuesBulkMutation,
  useGetProductSizeRangesQuery,
  useCreateProductSizeRangesMutation,
  useDeleteProductSizeRangesMutation,
} = e4kTblProductSizeRangeValuesBulk;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { gql } from 'graphql-request';

// const graphqlBaseQuery = ({ baseUrl }) => async ({ body }) => {
//   try {
//     const response = await fetch(baseUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     return { error: { status: 500, data: error.message } };
//   }
// };

// export const e4kTblProductSizeRangeValuesBulk = createApi({
//   reducerPath: 'e4kTblProductSizeRangeValuesBulk',
//   baseQuery: graphqlBaseQuery({
//     baseUrl: "http://127.0.0.1:8000/graphql/"
//   }),
//   tagTypes: ['ProductSizeRangeValuesBulk','ProductSizeRanges'],
//   endpoints: (builder) => ({

//     getProductSizeRangeValuesBulk: builder.query({
//       query: ({ companyid, rangeid, sizenumber }) => ({
//         body: {
//           query: gql`
//             query GetProductSizeRangesValuesBulk($companyid: String!, $rangeid: String!, $sizenumber: Int) {
//               e4kTblproductProductSizeRangeValues(companyid: $companyid, rangeid: $rangeid, sizenumber: $sizenumber) {
//                 ... on E4K_TblproductSizeRangeValuesNode {
//                   id
//                   sizeNumber
//                   sizeValue
//                   rangeid {
//                     rangeid
//                   }
//                   companyid {
//                     companyid
//                   }
//                 }
//                 ... on CustomErrorType {
//                   message
//                 }
//               }
//             }
//           `,
//           variables: { companyid, rangeid, sizenumber },
//         },
//       }),
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.e4kTblproductProductSizeRangeValues.map(({ rangeid }) => ({
//                 type: 'ProductSizeRangeValuesBulk',
//                 id: rangeid,
//               })),
//               { type: 'ProductSizeRangeValuesBulk', id: 'LIST' },
//             ]
//           : [{ type: 'ProductSizeRangeValuesBulk', id: 'LIST' }],
//     }),

//     getProductSizeRanges: builder.query({
//       query: ({ companyid, rangeid }) => ({
//         body: {
//           query: gql`
//             query GetProductSizeRanges($companyid: String!, $rangeid: String!) {
//               e4kTblproductProductSizeRanges(companyid: $companyid, rangeid: $rangeid) {
//                 ... on E4K_TblproductSizeRangesNode {
//                   id
//                   rangeid
//                   companyid {
//                     companyid
//                   }
//                 }
//                 ... on CustomErrorType {
//                   message
//                 }
//               }
//             }
//           `,
//           variables: { companyid, rangeid },
//         },
//       }),
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.e4kTblproductProductSizeRanges.map(({ rangeid }) => ({
//                 type: 'ProductSizeRanges',
//                 id: rangeid,
//               })),
//               { type: 'ProductSizeRanges', id: 'LIST' },
//             ]
//           : [{ type: 'ProductSizeRanges', id: 'LIST' }],
//     }),

//     createProductSizeRangeValuesBulk: builder.mutation({
//       query: ({ companyid, rangeid, sizeNumber, sizeValue }) => ({
//         body: {
//           query: gql`
//             mutation BulkUpdateSizeRanges($companyid: String!, $rangeid: String!, $sizeNumber: [Int!]!, $sizeValue: [String!]!) {
//               E4kTblproductProductsizerangesvaluesBulkCreate(
//                 companyid: $companyid
//                 rangeid: $rangeid
//                 sizeNumber: $sizeNumber
//                 sizeValue: $sizeValue
//               ) {
//                 sizeRanges
//               }
//             }
//           `,
//           variables: { companyid, rangeid, sizeNumber, sizeValue },
//         },
//       }),
//       invalidatesTags: (result, error, { rangeid }) => [
//         { type: 'ProductSizeRangeValuesBulk', id: rangeid },
//         { type: 'ProductSizeRangeValuesBulk', id: 'LIST' },
//       ],
//     }),

//     createProductSizeRanges: builder.mutation({
//       query: ({ companyid, rangeid }) => ({
//         body: {
//           query: gql`
//             mutation CreateProductSizeRange($companyid: String!, $rangeid: String!) {
//               E4kTblproductProductsizerangesCreate(companyid: $companyid, rangeid: $rangeid) {
//                 sizeRanges
//               }
//             }
//           `,
//           variables: { companyid, rangeid },
//         },
//       }),
//       invalidatesTags: [{ type: 'ProductSizeRanges', id: 'LIST' }],
//     }),

//     updateProductSizeRangeValuesBulk: builder.mutation({
//       query: ({ companyid, rangeid, sizeNumber, sizeValue }) => ({
//         body: {
//           query: gql`
//             mutation BulkUpdateSizeRanges($companyid: String!, $rangeid: String!, $sizeNumber: [Int!]!, $sizeValue: [String!]!) {
//               E4kTblproductProductsizerangesvaluesBulkUpdate(
//                 companyid: $companyid
//                 rangeid: $rangeid
//                 sizeNumber: $sizeNumber
//                 sizeValue: $sizeValue
//               ) {
//                 success
//               }
//             }
//           `,
//           variables: { companyid, rangeid, sizeNumber, sizeValue },
//         },
//       }),
//       invalidatesTags: [
//         { type: 'ProductSizeRanges', id: 'LIST' },
//         { type: 'ProductSizeRangeValuesBulk', id: 'LIST' },
//       ],
//     }),

//     deleteProductSizeRangeValuesBulk: builder.mutation({
//       query: ({ companyid, rangeid }) => ({
//         body: {
//           query: gql`
//             mutation BulkDeleteSizeRanges($companyid: String!, $rangeid: String!) {
//               E4kTblproductProductsizerangesvaluesBulkDelete(companyid: $companyid, rangeid: $rangeid) {
//                 success
//               }
//             }
//           `,
//           variables: { companyid, rangeid },
//         },
//       }),
//       invalidatesTags: [
//         { type: 'ProductSizeRanges', id: 'LIST' },
//         { type: 'ProductSizeRangeValuesBulk', id: 'LIST' },
//       ],
//     }),

//     deleteProductSizeRanges: builder.mutation({
//       query: ({ companyid, rangeid }) => ({
//         body: {
//           query: gql`
//             mutation DeleteProductSizeRanges($companyid: String!, $rangeid: String!) {
//               E4kTblproductProductsizerangesDelete(companyid: $companyid, rangeid: $rangeid) {
//                 success
//               }
//             }
//           `,
//           variables: { companyid, rangeid },
//         },
//       }),
//       invalidatesTags: (result, error, rangeid) => [
//         { type: 'ProductSizeRangeValuesBulk', id: rangeid },
//         { type: 'ProductSizeRanges', id: rangeid },
//       ],
//     }),
//   }),
// });

// export const {
//   useGetProductSizeRangeValuesBulkQuery,
//   useCreateProductSizeRangeValuesBulkMutation,
//   useUpdateProductSizeRangeValuesBulkMutation,
//   useDeleteProductSizeRangeValuesBulkMutation,
//   useGetProductSizeRangesQuery,
//   useCreateProductSizeRangesMutation,
//   useDeleteProductSizeRangesMutation,
// } = e4kTblProductSizeRangeValuesBulk;


