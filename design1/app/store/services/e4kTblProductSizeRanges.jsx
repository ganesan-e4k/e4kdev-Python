
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

// //const baseUrl = 'http://127.0.0.1:8000/graphql'; // Replace with your GraphQL API URL

// export const e4kTblProductSizeRanges = createApi({
//   reducerPath: 'e4kTblProductSizeRanges',
//   baseQuery: graphqlBaseQuery({
//     baseUrl: "http://127.0.0.1:8000/graphql/"
//   }),
//   tagTypes: ['ProductSizeRanges'],
//   endpoints: (builder) => ({

//     getProductSizeRanges: builder.query({
//       query: ({companyid,rangeid}) => ({
//         body: {
//           query: gql`
//             query GetProductSizeRanges($companyid: String!,$rangeid:String!) {
//               e4kTblproductProductSizeRanges(companyid: $companyid,rangeid: $rangeid) {
//                ... on E4K_TblproductSizeRangesNode {
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
//           variables: { companyid : companyid, rangeid: rangeid },
//         },
//       }),
//       providesTags: (result) =>
//                 result
//                   ? [
//                       ...result.e4kTblproductProductSizeRanges.map(({ rangeid }) => ({
//                         type: 'ProductSizeRanges',
//                         id: rangeid,
//                       })),
//                       { type: 'ProductSizeRanges', id: 'LIST' },
//                     ]
//                   : [{ type: 'ProductSizeRanges', id: 'LIST' }],
      
//     }),


//     getProductSizeRangeValues: builder.query({
//       query: ({companyid,rangeid,sizenumber}) => ({
//         body: {
//           query: gql`
//             query GetProductSizeRangesValues($companyid: String!,$rangeid:String!,$sizenumber:Int) {
//               e4kTblproductProductSizeRangeValues(companyid: $companyid,rangeid: $rangeid,sizenumber: $sizenumber) {
//                 ... on E4K_TblproductSizeRangeValuesNode {
//                     id
//                     sizeNumber
//                     sizeValue
//                     rangeid {
//                       rangeid
//                     }
//                     companyid {
//                       companyid
//                     }
//                   }
//                   ... on CustomErrorType {
//                     message
//                   }
//                 }
//             }
//           `,
//           variables: { companyid : companyid, rangeid: rangeid ,sizenumber: sizenumber },
//         },
//       }),
//       providesTags: (result) =>
//                 result
//                   ? [
//                       ...result.e4kTblproductProductSizeRangeValues.map(({ rangeid }) => ({
//                         type: 'ProductSizeRanges',
//                         id: rangeid,
//                       })),
//                       { type: 'ProductSizeRanges', id: 'LIST' },
//                     ]
//                   : [{ type: 'ProductSizeRanges', id: 'LIST' }],
      
//     }),
    
//     createProductSizeRangeValues: builder.mutation({
//         query: ({companyid ,rangeid ,sizeNumber,sizeValue}) => ({
//           body: {
//             query: gql`
//               mutation CreateProductSizeRangeValues( $companyid: String!,$rangeid: String!, $sizeNumber: Int!, $sizeValue: String!) {
//                 E4kTblproductProductsizerangesvaluesCreate(companyid: $companyid,rangeid: $rangeid,  sizeNumber: $sizeNumber,sizeValue: $sizeValue) {
//                   sizeRanges
//                 }
//               }
//             `,
//             variables: {companyid:companyid, rangeid:rangeid, sizeNumber:sizeNumber,sizeValue:sizeValue },
//           },
//         }),
//         invalidatesTags: [{ type: 'ProductSizeRanges', id: 'LIST' }], // Optional: Invalidate cache tags
//       }),
//       createProductSizeRanges: builder.mutation({
//         query: ({companyid ,rangeid}) => ({
//           body: {
//             query: gql`
//               mutation CreateProductSizeRange( $companyid: String!,$rangeid: String!) {
//                 E4kTblproductProductsizerangesCreate(companyid: $companyid,rangeid: $rangeid) {
//                   sizeRanges
//                 }
//               }
//             `,
//             variables: {companyid:companyid, rangeid:rangeid },
//           },
//         }),
//         invalidatesTags: [{ type: 'ProductSizeRanges', id: 'LIST' }], // Optional: Invalidate cache tags
//       }),
//       updateProductSizeRangeValues: builder.mutation({
//         query: ({companyid,rangeid, sizeNumber, newSizeNumber}) => ({
//           body: {
//             query: gql`
//               mutation UpdateProductSizeRangeValues($companyid: String!,$rangeid: String!, $sizeNumber: Int!,  $newSizeNumber: Int!) {
//                 E4kTblproductProductsizerangesvaluesUpdate(companyid: $companyid,rangeid: $rangeid, sizeNumber: $sizeNumber, newSizeNumber: $newSizeNumber) {
//                   success
//                 }
//               }
//             `,
//             variables: { companyid:companyid,rangeid:rangeid, sizeNumber:sizeNumber, newSizeNumber:newSizeNumber },
//           },
//         }),
//         invalidatesTags: (result, error, { rangeid }) => [
//           { type: 'ProductSizeRanges', id: rangeid },
//           { type: 'ProductSizeRanges', id: 'LIST' },
//         ],
//       }),

//       //Update Size range 
//       updateProductSizeRanges: builder.mutation({
//         query: ({companyid,rangeid, id}) => ({
//           body: {
//             query: gql`
//               mutation UpdateProductSizeRanges($companyid: String!,$rangeid: String!, $id: Int!) {
//                 E4kTblproductProductsizerangesUpdate(companyid: $companyid,rangeid: $rangeid, id: $id) {
//                   success
//                 }
//               }
//             `,
//             variables: { companyid:companyid,rangeid:rangeid, id:id},
//           },
//         }),
//         invalidatesTags: (result, error, { rangeid }) => [
//           { type: 'ProductSizeRanges', id: rangeid },
//           { type: 'ProductSizeRanges', id: 'LIST' },
//         ],
//       }),

//       updateProductSizeRangeValuesSizeValue: builder.mutation({
//         query: ({companyid,rangeid, sizeNumber, sizeValue}) => ({
//           body: {
//             query: gql`
//               mutation UpdateProductSizeRangeValuesSizevalue($companyid: String!,$rangeid: String!, $sizeNumber: Int!,  $sizeValue: String!) {
//                 E4kTblproductProductsizerangevaluessizevalueUpdate(companyid: $companyid,rangeid: $rangeid, sizeNumber: $sizeNumber, sizeValue: $sizeValue) {
//                   sizeRanges
//                 }
//               }
//             `,
//             variables: { companyid:companyid,rangeid:rangeid, sizeNumber:sizeNumber, sizeValue:sizeValue },
//           },
//         }),
//         invalidatesTags: (result, error, { rangeid }) => [
//           { type: 'ProductSizeRanges', id: rangeid },
//           { type: 'ProductSizeRanges', id: 'LIST' },
//         ],
//       }),
  
//       deleteProductSizeRangeValues: builder.mutation({
//         query: ({ companyid,rangeid, sizeNumber }) => ({
//           body: {
//             query: gql`
//               mutation DeleteProductSizeRangeValues($companyid: String! ,$rangeid: String!,$sizeNumber: Int! ) {
//                 E4kTblproductProductsizerangesvaluesDelete(companyid: $companyid,rangeid: $rangeid, sizeNumber: $sizeNumber) {
//                   success
//                 }
//               }
//             `,
//             variables: { companyid:companyid,rangeid:rangeid,sizeNumber:sizeNumber },
//           },
//         }),
//         invalidatesTags: (result, error, { rangeid }) => [
//           { type: 'ProductSizeRanges', id: rangeid },
//           { type: 'ProductSizeRanges', id: 'LIST' },
//         ],
//       }),

//       // delete product size range
//       deleteProductSizeRanges: builder.mutation({
//         query: ({ companyid,rangeid, id }) => ({
//           body: {
//             query: gql`
//               mutation DeleteProductSizeRanges($companyid: String! ,$rangeid: String!,$id: Int! ) {
//                 E4kTblproductProductsizerangesDelete(companyid: $companyid,rangeid: $rangeid, id: $id) {
//                   success
//                 }
//               }
//             `,
//             variables: { companyid:companyid,rangeid:rangeid,id:id },
//           },
//         }),
//         invalidatesTags: (result, error, { rangeid }) => [
//           { type: 'ProductSizeRanges', id: rangeid },
//           { type: 'ProductSizeRanges', id: 'LIST' },
//         ],
//       }),
//     }),
//   });
  
//   export const {
//     useGetProductSizeRangesQuery,
//     useGetProductSizeRangeValuesQuery,
//     useCreateProductSizeRangeValuesMutation,
//     useCreateProductSizeRangesMutation,
//     useUpdateProductSizeRangeValuesMutation,
//     useUpdateProductSizeRangesMutation,
//     useUpdateProductSizeRangeValuesSizeValueMutation,
//     useDeleteProductSizeRangeValuesMutation,
//     useDeleteProductSizeRangesMutation,
//   } = e4kTblProductSizeRanges;

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

export const e4kTblProductSizeRanges = createApi({
  reducerPath: 'e4kTblProductSizeRanges',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['ProductSizeRanges', 'ProductSizeRangeValues'],
  endpoints: (builder) => ({

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

    getProductSizeRangeValues: builder.query({
      query: ({ companyid, rangeid, sizenumber }) => ({
        body: {
          query: gql`
            query GetProductSizeRangesValues($companyid: String!, $rangeid: String!, $sizenumber: Int) {
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
                type: 'ProductSizeRangeValues',
                id: rangeid,
              })),
              { type: 'ProductSizeRangeValues', id: 'LIST' },
            ]
          : [{ type: 'ProductSizeRangeValues', id: 'LIST' }],
    }),

    createProductSizeRangeValues: builder.mutation({
      query: ({ companyid, rangeid, sizeNumber, sizeValue }) => ({
        body: {
          query: gql`
            mutation CreateProductSizeRangeValues($companyid: String!, $rangeid: String!, $sizeNumber: Int!, $sizeValue: String!) {
              E4kTblproductProductsizerangesvaluesCreate(companyid: $companyid, rangeid: $rangeid, sizeNumber: $sizeNumber, sizeValue: $sizeValue) {
                sizeRanges
              }
            }
          `,
          variables: { companyid, rangeid, sizeNumber, sizeValue },
        },
      }),
      invalidatesTags: [{ type: 'ProductSizeRangeValues', id: 'LIST' }],
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

    updateProductSizeRangeValues: builder.mutation({
      query: ({ companyid, rangeid, sizeNumber, newSizeNumber }) => ({
        body: {
          query: gql`
            mutation UpdateProductSizeRangeValues($companyid: String!, $rangeid: String!, $sizeNumber: Int!, $newSizeNumber: Int!) {
              E4kTblproductProductsizerangesvaluesUpdate(companyid: $companyid, rangeid: $rangeid, sizeNumber: $sizeNumber, newSizeNumber: $newSizeNumber) {
                success
              }
            }
          `,
          variables: { companyid, rangeid, sizeNumber, newSizeNumber },
        },
      }),
      invalidatesTags: [{ type: 'ProductSizeRanges', id: 'LIST' }, { type: 'ProductSizeRangeValues', id: 'LIST' }],
    }),

    updateProductSizeRanges: builder.mutation({
      query: ({ companyid, rangeid, id }) => ({
        body: {
          query: gql`
            mutation UpdateProductSizeRanges($companyid: String!, $rangeid: String!, $id: Int!) {
              E4kTblproductProductsizerangesUpdate(companyid: $companyid, rangeid: $rangeid, id: $id) {
                success
              }
            }
          `,
          variables: { companyid, rangeid, id },
        },
      }),
      invalidatesTags: [{ type: 'ProductSizeRanges', id: 'LIST' }, { type: 'ProductSizeRangeValues', id: 'LIST' }],
    }),

    updateProductSizeRangeValuesSizeValue: builder.mutation({
      query: ({ companyid, rangeid, sizeNumber, sizeValue }) => ({
        body: {
          query: gql`
            mutation UpdateProductSizeRangeValuesSizevalue($companyid: String!, $rangeid: String!, $sizeNumber: Int!, $sizeValue: String!) {
              E4kTblproductProductsizerangevaluessizevalueUpdate(companyid: $companyid, rangeid: $rangeid, sizeNumber: $sizeNumber, sizeValue: $sizeValue) {
                sizeRanges
              }
            }
          `,
          variables: { companyid, rangeid, sizeNumber, sizeValue },
        },
      }),
      invalidatesTags: [{ type: 'ProductSizeRanges', id: 'LIST' }, { type: 'ProductSizeRangeValues', id: 'LIST' }],
    }),

    deleteProductSizeRangeValues: builder.mutation({
      query: ({ companyid, rangeid, sizeNumber }) => ({
        body: {
          query: gql`
            mutation DeleteProductSizeRangeValues($companyid: String!, $rangeid: String!, $sizeNumber: Int!) {
              E4kTblproductProductsizerangesvaluesDelete(companyid: $companyid, rangeid: $rangeid, sizeNumber: $sizeNumber) {
                success
              }
            }
          `,
          variables: { companyid:companyid, rangeid:rangeid, sizeNumber:sizeNumber },
        },
      }),
      invalidatesTags: [{ type: 'ProductSizeRanges', id: 'LIST' }, { type: 'ProductSizeRangeValues', id: 'LIST' }],
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
      invalidatesTags: [{ type: 'ProductSizeRanges', id: 'LIST' }, { type: 'ProductSizeRangeValues', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetProductSizeRangesQuery,
  //useGetProductSizeRangeValuesQuery,
 // useCreateProductSizeRangeValuesMutation,
  useCreateProductSizeRangesMutation,
  //useUpdateProductSizeRangeValuesMutation,
  useUpdateProductSizeRangesMutation,
  //useUpdateProductSizeRangeValuesSizeValueMutation,
  //useDeleteProductSizeRangeValuesMutation,
  useDeleteProductSizeRangesMutation,
} = e4kTblProductSizeRanges;

