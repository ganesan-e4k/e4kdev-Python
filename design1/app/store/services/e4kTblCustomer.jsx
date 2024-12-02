
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

export const e4kTblCustomerAll = createApi({
  reducerPath: 'e4kTblCustomerAll',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['E4kAllCustomer'],
  endpoints: (builder) => ({

    getAllCustomer: builder.query({
        query: (companyid) => ({
          body: {
            query: gql`
              query MyQueryGetAllCustomerList($companyid: String!) {
                    e4kTblcustomerAll(companyid: $companyid){
                        ... on E4K_Tblcustomer {
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
                        ...result.e4kTblcustomerAll.map(({ businessid }) => ({
                          type: 'E4kAllCustomer',
                          id: businessid,
                        })),
                        { type: 'E4kAllCustomer', id: 'LIST' },
                      ]
                    : [{ type: 'E4kAllCustomer', id: 'LIST' }],
        
      }),

   
    }),
  });
  
  export const {
    useGetAllCustomerQuery,
   
    //useDeleteProductMutation,
  } = e4kTblCustomerAll;
