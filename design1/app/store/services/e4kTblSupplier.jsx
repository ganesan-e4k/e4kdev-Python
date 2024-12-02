
import { createApi} from '@reduxjs/toolkit/query/react';
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

export const e4kTblSupplierAll = createApi({
  reducerPath: 'e4kTblSupplierAll',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['E4kAllSupplier'],
  endpoints: (builder) => ({

    getAllSupplier: builder.query({
        query: (companyid) => ({
          body: {
            query: gql`
              query MyQueryGetAllSupplierList($companyid: String!) {
                    e4kTblsupplierAll(companyid: $companyid){
                        ... on E4k_TblSupplier {
                            name
                            businessid
                            }
                            ... on CustomErrorType {
                            message
                            }
                        }
                        }
            `,
            variables: { companyid },
          },
        }),
        providesTags: (result) =>
                  result
                    ? [
                        ...result.e4kTblsupplierAll.map(({ businessid }) => ({
                          type: 'E4kAllSupplier',
                          id: businessid,
                        })),
                        { type: 'E4kAllSupplier', id: 'LIST' },
                      ]
                    : [{ type: 'E4kAllSupplier', id: 'LIST' }],
        
      }),

   
    }),
  });
  
  export const {
    useGetAllSupplierQuery,
   
    //useDeleteProductMutation,
  } = e4kTblSupplierAll;
