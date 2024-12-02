// // // src/services/productCategory.js
// // import { createApi } from '@reduxjs/toolkit/query/react';
// // import { request, gql } from 'graphql-request';

// // const baseUrl = 'http://127.0.0.1:8000/graphql';

// // const graphqlBaseQuery = ({ baseUrl }) => async ({ document, variables }) => {
// //   try {
// //     const result = await request(baseUrl, document, variables);
// //     return { data: result };
// //   } catch (error) {
// //     console.error('GraphQL Error:', error);
// //     return { error: { status: error.response?.status || 500, data: error.message } };
// //   }
// // };

// // export const e4kTblProductCategory1 = createApi({
// //   reducerPath: 'e4kTblProductCategory1',
// //   baseQuery: graphqlBaseQuery({ baseUrl }),
// //   tagTypes: ['ProductCategory'],
// //   endpoints: (builder) => ({
// //     getProductCategories1: builder.query({
// //       query: (companyid) => ({
// //         document: gql`
// //           query MyQuery($companyid: String!) {
// //             e4kTblproductProductCategory1(companyid: $companyid) {
// //               ... on E4K_TblProductCategory1Node {
// //                 description
// //                 imagepath
// //                 category1id
// //               }
// //               ... on CustomErrorType {
// //                 message
// //               }
// //             }
// //           }
// //         `,
// //         variables: { companyid },
// //       }),
// //       providesTags: (result) =>
// //         result
// //           ? [
// //               ...result.e4kTblproductProductCategory1.map(({ category1id }) => ({
// //                 type: 'ProductCategory',
// //                 id: category1id,
// //               })),
// //               { type: 'ProductCategory', id: 'LIST' },
// //             ]
// //           : [{ type: 'ProductCategory', id: 'LIST' }],
// //     }),
// //     createProductCategory1: builder.mutation({
// //       query: ({ category, companyid, imagePath }) => ({
// //         document: gql`
// //           mutation MyMutation($category: String!, $companyid: String!, $imagePath: String!) {
// //             E4KTblproductProductcategory1Create(
// //               category: $category,
// //               companyid: $companyid, 
// //               imagePath: $imagePath
// //             ) {
// //               category1id
// //             }
// //           }
// //         `,
// //         variables: { category, companyid, imagePath },
// //       }),
// //       invalidatesTags: [{ type: 'ProductCategory', id: 'LIST' }],
// //     }),
// //     updateProductCategory1: builder.mutation({
// //       query: ({ category1id, category, companyid, imagePath }) => ({
// //         document: gql`
// //           mutation MyMutation($category1id: ID!, $category: String!, $companyid: String!, $imagePath: String!) {
// //             E4KTblproductProductcategory1Update(
// //               category1id: $category1id,
// //               category: $category,
// //               companyid: $companyid, 
// //               imagePath: $imagePath
// //             ) {
// //               category1id
// //             }
// //           }
// //         `,
// //         variables: { category1id, category, companyid, imagePath },
// //       }),
// //       invalidatesTags: (result, error, { category1id }) => [
// //         { type: 'ProductCategory', id: category1id },
// //         { type: 'ProductCategory', id: 'LIST' },
// //       ],
// //     }),
// //     deleteProductCategory1: builder.mutation({
// //       query: ({ category1id, companyid }) => ({
// //         document: gql`
// //           mutation MyMutation($category1id: ID!, $companyid: String!) {
// //             E4KTblproductProductcategory1Delete(
// //               category1id: $category1id,
// //               companyid: $companyid
// //             ) {
// //               category1id
// //             }
// //           }
// //         `,
// //         variables: { category1id, companyid },
// //       }),
// //       invalidatesTags: (result, error, { category1id }) => [
// //         { type: 'ProductCategory', id: category1id },
// //         { type: 'ProductCategory', id: 'LIST' },
// //       ],
// //     }),
// //   }),
// // });

// // export const {
// //   useGetProductCategories1Query,
// //   useCreateProductCategory1Mutation,
// //   useUpdateProductCategory1Mutation,
// //   useDeleteProductCategory1Mutation,
// // } = e4kTblProductCategory1;
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

// export const e4kTblCompany = createApi({
//   reducerPath: 'e4kTblCompany',
//   baseQuery: graphqlBaseQuery({
//     baseUrl: "http://127.0.0.1:8000/graphql/"
//   }),
//   tagTypes: ['TblCompany'],
//   endpoints: (builder) => ({
//     getTblCompany: builder.query({
//       query: () => ({
//         body: {
//           query: gql`
//             query {
//              e4kTblcompanyAll {
//                 ... on E4k_Tblcompany {
//                 name
//                 address1
//                 companyid
//                 postcode
//                 countryid {
//                     country
//                 }
//                 vatno
//                 }
//                 ... on CustomErrorType {
//                 message
//                 }
//             }
//             }
//           `
//         },
//       }),
//       providesTags: (result) =>
//                 result
//                   ? [
//                       ...result.e4kTblcompanyAll.map(({ companyid }) => ({
//                         type: 'e4kTblCompany',
//                         id: companyid,
//                       })),
//                       { type: 'e4kTblCompany', id: 'LIST' },
//                     ]
//                   : [{ type: 'e4kTblCompany', id: 'LIST' }],
      
//     }),
    
     
//     }),
//   });
  
//   export const {
//     useGetTblCompanyQuery,
//   } = e4kTblCompany;
