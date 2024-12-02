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
    
    return data;
  } catch (error) {
    return { error: { status: 500, data: error.message } };
  }
};

// Define the API with Redux Toolkit's createApi
export const e4kTblCustomer = createApi({
  reducerPath: 'e4kTblcustomerlist',
  baseQuery: graphqlBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL_Customer,
}),
  tagTypes: ['e4ktblCustomerListtag'],  // Tag type for cache invalidation
  endpoints: (builder) => ({
    
    getCustomerList: builder.query({
      query: (companyId) => ({
        body: {
          query: gql`
            query GetCustomerList($companyId: String!) {
              E4kTblcustomerlist(companyid: $companyId)
            }
          `,
          variables: { companyId },
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.E4kTblcustomerlist.map(({ businessid }) => ({
                type: 'e4ktblCustomerListtag',
                id: businessid,
              })),
              { type: 'e4ktblCustomerListtag', id: 'LIST' },
            ]
          : [{ type: 'e4ktblCustomerListtag', id: 'LIST' }],

     }),
    searchbusinessid: builder.query({
      query: ({companyid,businessid}) => ({
        body: {
          query: gql`
            query searchCustomerbusinessid($companyid: String!,$businessid: String!) {
                  E4kBusinessidSearch(companyid: $companyid,businessid: $businessid)
              }
          `,
          variables: { companyid:companyid, businessid:businessid },
        },
      }),
      providesTags:  [{ type: 'e4ktblCustomerListtag', id: 'LIST' }],
      
    }),
   
    getCustomer: builder.query({
      query: ({ businessid, companyid }) => ({
        body: {
          query: gql`
            query GetCustomer($businessid: String!, $companyid: String!) {
              E4kTblcustomers(businessid: $businessid, companyid: $companyid) {
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
                groupid {
                  groupid
                  groupname
                }
                countryid {
                  country
                  countryid
                }
                defaultNominal {
                  nomcode
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
              ...result.E4kTblcustomers.map(({ businessid }) => ({
                type: 'e4ktblCustomerListtag',
                id: businessid,
              })),
              { type: 'e4ktblCustomerListtag', id: 'LIST' },
            ]
          : [{ type: 'e4ktblCustomerListtag', id: 'LIST' }],

}),
    

   
    updateCustomer: builder.mutation({
      query: ({ businessid, category1id, category2id, category3id, classid, countryid, groupid, islive, isextract, isstop, name, defaultNominal }) => ({
        body: {
          query: gql`
            mutation E4kTblcustomerupdate(
              $businessid: String!,
              $category1id: Int!,
              $category2id: Int!,
              $category3id: Int!,
              $classid: Int!,
              $countryid: Int!,
              $groupid: Int!,
              $islive: Boolean!,
              $isextract: Boolean!,
              $isstop: Boolean!,
              $name: String!
              $defaultNominal : Int!,
            ) {
              E4kTblcustomerupdate(
                businessid: $businessid,
                category1id: $category1id,
                category2id: $category2id,
                category3id: $category3id,
                classid: $classid,
                countryid: $countryid,
                groupid: $groupid,
                islive: $islive,
                isextract: $isextract,
                isstop: $isstop,
                name: $name
                defaultNominal: $defaultNominal,
              ) {
                success
                error
              }
            }
          `,
          variables: { businessid, category1id, category2id, category3id, classid, countryid, groupid, islive, isextract, isstop, name,defaultNominal },
        },
      }),
     
      invalidatesTags:  [{ type: 'e4ktblCustomerListtag', id: 'LIST' }],
    }),

    // Create customer mutation
    createCustomer: builder.mutation({
      query: ({
        businessid,
        category1id,
        category2id,
        category3id,
        classid,
        companyid,
        countryid,
        defaultNominal,
        groupid,
        isextract,
        islive,
        isstop,
        name,
      }) => ({
        body: {
          query: gql`
            mutation {
              E4kTblcustomercreate(
                businessid: "${businessid}",
                category1id: ${category1id},
                category2id: ${category2id},
                category3id: ${category3id},
                companyid: "${companyid}",
                classid: ${classid},
                countryid: ${countryid},
                groupid: ${groupid},
                defaultNominal: ${defaultNominal},
                isextract: ${isextract},
                islive: ${islive},
                isstop: ${isstop},
                name: "${name}"
              ) {
                success
                error
                customer {
                  businessid
                  isextract
                  islive
                  isstop
                  name
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
                    classid
                  }
                  countryid {
                    country
                  }
                  defaultNominal {
                    nomcode
                    nomdescription
                  }
                  groupid {
                    groupname
                  }
                }
              }
            }
          `,
        },
      }),
     
      invalidatesTags:  [{ type: 'e4ktblCustomerListtag', id: 'LIST' }],
    }),
    createCustomerLogo: builder.mutation({
      query: ({
        businessid,
        companyid,
        settingid,
        value,
      }) => ({
        body: {
          query: gql`
            mutation {
              createCustomerLogo(
                businessid: "${businessid}",
                companyid: "${companyid}",
                settingid: "${settingid}",
                value: "${value}"
              ) {
                logo
                message
                success
                error
              }
            }
          `,
        },
      }),
      
      invalidatesTags:  [{ type: 'e4ktblCustomerListtag', id: 'LIST' }], // Adjust based on cache invalidation needs
    }),
    getturnover : builder.query({
      query: ({ companyid, businessid }) => ({
        body: {
          query: gql`
           query FetchTotalTurnover($businessid: String!, $companyid: String!) {
            E4kTotalturnover(businessid: $businessid, companyid: $companyid)
          }
          `,
          variables: { companyid: companyid, businessid: businessid },
        },
      }),
      providesTags:  [{ type: 'e4ktblCustomerListtag', id: 'LIST' }],
    }),


    createCustomerAndAccount: builder.mutation({
      query: ({
      businessid,
      CompanyID,
      vatflag,
      islive,
      isextract,
      isstop,
      note,
      userid,
     

      }) =>({
        body: {
          query: gql`
            mutation {
              E4kCustomerandaccountCreate(
                businessid: "${businessid}",
                companyid: "${CompanyID}",
                vatflag: "${vatflag}",
                islive: ${islive},
                isextract: ${isextract},
                isstop: ${isstop},
                note: "${note}",
                userid: "${userid}"
            
              ) {
                success
                error
        }
        }`
        },     
      }),
      invalidatesTags: ['e4ktblCustomerListtag'], // Adjust based on cache invalidation needs
    }),
    deleteCustomer: builder.mutation({
      query: ({ businessid, companyid }) => ({
        body: {
          query: gql`
            mutation DeleteCustomer($businessid: String!, $companyid: String!) {
              E4kTblcustomerdelete(businessid: $businessid, companyid: $companyid) {
                success
                error
              }
            }
          `,
          variables: { businessid, companyid },
        },
      }),
      invalidatesTags: [{ type: 'e4ktblCustomerListtag', id: 'LIST' }],
    }),

    getCustomerNotes: builder.query({
      query: ({ businessid, companyid }) => ({
        body: {
          query: gql`
            query GetCustomerNotes($businessid: String!, $companyid: String!) {
              E4kTblcustomernotes(businessid: $businessid, companyid: $companyid) {
                note
                noteid
                noteDate
                userid {
                  userid
                }
              }
            }
          `,
          variables: { businessid, companyid },
        },
      }),
    
    }),


    updateCustomerNote: builder.mutation({
      query: ({ userid, note, companyid, businessid }) => ({
        body: {
          query: gql`
            mutation UpdateCustomerNote($userid: String!, $note: String!, $companyid: String!, $businessid: String!) {
              E4kCustomernoteupdate(userid: $userid, note: $note, companyid: $companyid, businessid: $businessid) {
                success
                error
              }
            }
          `,
          variables: { userid, note, companyid, businessid },
        },
      }),
    }),
  
    

 

  

  }),
});

export const {
  useSearchbusinessidQuery,
  useGetCustomerQuery,
  useGetCustomerListQuery,
  useUpdateCustomerMutation,
  useCreateCustomerMutation,
  useCreateCustomerLogoMutation,
  useGetturnoverQuery,
  useCreateCustomerAndAccountMutation,
  useDeleteCustomerMutation,
  useGetCustomerNotesQuery,
  useUpdateCustomerNoteMutation,
 
} = e4kTblCustomer;
