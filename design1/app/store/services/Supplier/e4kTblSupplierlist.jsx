
import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';

// Base query to handle GraphQL requests
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
    console.log("KJGGGGG", data)
    return data;
  } catch (error) {
    return { error: { status: 500, data: error.message } };
  }
};

export const e4kTblSupplierlist = createApi({
  reducerPath: 'e4kTblSupplierlistapi',
  baseQuery: graphqlBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Supplier,
}),
  tagTypes: ['e4ksupplierlistapi'],  
  endpoints: (builder) => ({
    
   
    getSupplier: builder.query({
      query: ({businessid, companyid}) => ({
        body: {
          query: gql`
            query GetSupplier($businessid: String!, $companyid: String!) {
              E4kTblsupplier(businessid: $businessid, companyid: $companyid) {
                businessid
                islive
                isstop
                name
                isextract
                category1id {
                  category1id
                  category1name
                }
                category2id {
                  category2id
                  category2name
                }
                category3id {
                  category3id
                  category3name
                }
                classid {
                  className
                  classid
                }
                companyid {
                  companyid
                }
                countryid {
                  country
                  countryid
                }
                defaultNominal {
                  nomdescription
                }
              }
            }
          `,
          variables: { businessid, companyid },
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.E4kTblsupplier.map(({ businessid }) => ({
                type: 'e4ksupplierlistapi',
                id: businessid,
              })),
              { type: 'e4ksupplierlistapi', id: 'LIST' },
            ]
          : [{ type: 'e4ksupplierlistapi', id: 'LIST' }],

}),

    searchSupplierbusinessid: builder.query({
      query: ({companyid,businessid}) => ({
        body: {
          query: gql`
            query searchSupplierbusinessid($companyid: String!,$businessid: String!) {
                  E4kSearchsupplierbusinessid(companyid: $companyid,businessid: $businessid)
              }
          `,
          variables: { companyid:companyid, businessid:businessid },
        },
      }),
      providesTags:  [{ type: 'e4ksupplierlistapi', id: 'LIST' }],
      
    }),

    getturnoverSupplier : builder.query({
      query: ({ companyid, businessid }) => ({
        body: {
          query: gql`
           query FetchTotalTurnover($businessid: String!, $companyid: String!) {
            E4kTotalturnoversupplier(businessid: $businessid, companyid: $companyid)
          }
          `,
          variables: { companyid: companyid, businessid: businessid },
        },
      }),
      providesTags:  [{ type: 'e4ksupplierlistapi', id: 'LIST' }],
    }),

    getSupplierNotes: builder.query({
      query: ({businessid, companyid}) => ({
        body: {
          query: gql`
            query GetSupplierNotes ($businessid : String! $companyid: String!) {
              E4kTblsuppliernotes(businessid:$businessid, companyid:$companyid) {
                note
                noteDate
                noteid
              }
            }
          `,
          variables: { companyid, businessid },
        },
      }),
      providesTags: (result, error, { businessid, companyid }) =>
        result ? [{ type: 'e4ksupplierlistapi', id: `${businessid}-${companyid}` }] : [],
    }),

    
    updateSupplier: builder.mutation({
      query: ({ businessid, category1id, category2id, category3id, classid, countryid, islive, isextract, isstop, name,companyid,defaultNominal }) => ({
        body: {
          query: gql`
            mutation E4kTblsupplierUpdate(
              $businessid: String!,
              $category1id: Int!,
              $category2id: Int!,
              $category3id: Int!,
              $classid: Int!,
              $companyid: String!,
              $countryid: Int!,
              $isextract: Boolean!,
              $islive: Boolean!,
              $isstop: Boolean!,
              $name: String!
              $defaultNominal: Int!
            ) {
              E4kTblsupplierUpdate(
                businessid: $businessid,
                category1id: $category1id,
                category2id: $category2id,
                category3id: $category3id,
                classid: $classid,
                companyid: $companyid,
                countryid: $countryid,
                isextract: $isextract,
                islive: $islive,
                isstop: $isstop,
                name: $name
                defaultNominal: $defaultNominal
              ) {
                success
                error
              }
            }
          `,
          variables: { businessid, category1id, category2id, category3id, classid, countryid, islive, isextract, isstop, name,companyid,defaultNominal },
        },
      }),
     
      invalidatesTags: ['e4ksupplierlistapi'],
    }),

    // createSupplier: builder.mutation({
    //   query: ({
    //     businessid,
    //     category1id,
    //     category2id,
    //     category3id,
    //     classid,
    //     companyid,
    //     countryid,
    //     defaultNominal,
    //     isextract,
    //     islive,
    //     isstop,
    //     name,
    //   }) => ({
    //     body: {
    //       query: gql`
    //         mutation {
    //           E4kTblsupplierCreate(
    //             businessid: "${businessid}",
    //             category1id: ${category1id},
    //             category2id: ${category2id},
    //             category3id: ${category3id},
    //             companyid: "${companyid}",
    //             classid: ${classid},
    //             countryid: ${countryid},
    //             defaultNominal: ${defaultNominal},
    //             isextract: ${isextract},
    //             islive: ${islive},
    //             isstop: ${isstop},
    //             name: "${name}"
    //           ) {
    //             success
    //             error
                
    //           }
    //         }
    //       `,
    //     },
    //   }),
    //   invalidatesTags: ['e4ksupplierlistapi'],
    // }),

    createSupplier: builder.mutation({
      query: ({
        BusinessID,
        CompanyID,
        isextract,
        islive,
        isstop,
        vatflag,
       
      }) => ({
        body: {
          query: gql`
            mutation CreateSupplier(
              $businessid: String!,
              $companyid: String!,
              $isextract: Boolean!,
              $islive: Boolean!,
              $isstop: Boolean!,
              $vatflag: String!,
             
            ) {
              E4kSupplierandaccountCreate(
                businessid: $businessid,
                companyid: $companyid,
                isextract: $isextract,
                islive: $islive,
                isstop: $isstop,
                vatflag: $vatflag,
               
              ) {
                success
                error
              }
            }
          `,
          variables: {
            businessid: BusinessID,
            companyid: CompanyID,
            isextract,
            islive,
            isstop,
            vatflag,
          },
        },
      }),
      invalidatesTags: ['e4ksupplierlistapi'],
    }),
    
getSupplierList: builder.query({
  query: (companyId) => ({
    body: {
      query: gql`
        query GetE4kSupplierlist($companyId: String!) {
          E4kTblsuppliertlist(companyid: $companyId)
        }
      `,
      variables: { companyId },
    },
  }),
  providesTags: (result) =>
    result
      ? [
          ...result.E4kTblsuppliertlist.map(({ companyId }) => ({
            type: 'e4ksupplierlistapi',
            id: companyId,
          })),
          { type: 'e4ksupplierlistapi', id: 'LIST' },
        ]
      : [{ type: 'e4ksupplierlistapi', id: 'LIST' }],

}),

deleteSupplier: builder.mutation({
  query: ({ businessid, companyid }) => ({
    body: {
      query: gql`
        mutation DeleteSupplier($businessid: String!, $companyid: String!) {
          E4kTblsupplierDelete(businessid: $businessid, companyid: $companyid) {
            success
            error
          }
        }
      `,
      variables: { businessid, companyid },
    },
  }),
  invalidatesTags: [{ type: 'e4ksupplierlistapi', id: 'LIST' }],
}),

    
  })
});

export const { 
  useSearchSupplierbusinessidQuery,
  useGetSupplierListQuery, 
  useGetSupplierQuery, 
  useGetSupplierNotesQuery, 
  useUpdateSupplierMutation,
  useCreateSupplierMutation,
  useGetturnoverSupplierQuery,
  useDeleteSupplierMutation,
  // useUpdateSupplierAccountMutation
} = e4kTblSupplierlist;

      

