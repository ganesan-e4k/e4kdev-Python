
import { createApi } from '@reduxjs/toolkit/query/react';
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

export const e4kTblProductNew = createApi({
  reducerPath: 'e4kTblProductNew',
  baseQuery: graphqlBaseQuery({
    baseUrl: "http://127.0.0.1:8000/product/"
  }),
  tagTypes: ['NewProduct'],
  endpoints: (builder) => ({

    getAllProducts: builder.query({
        query: (companyid) => ({
          body: {
            query: gql`
              query MyQueryGetAllProducts($companyid: String!) {
                    e4kTblproductProductAll(companyid: $companyid)
                }
            `,
            variables: { companyid },
          },
        }),
        providesTags: (result) =>
                  result
                    ? [
                        ...result.e4kTblproductProductAll.map(({ productid }) => ({
                          type: 'NewProduct',
                          id: productid,
                        })),
                        { type: 'NewProduct', id: 'LIST' },
                      ]
                    : [{ type: 'NewProduct', id: 'LIST' }],
        
      }),

    searchProductid: builder.query({
        query: ({companyid,productid}) => ({
          body: {
            query: gql`
              query searchProductsProductid($companyid: String!,$productid: String!) {
                    e4kTblproductProductSearch(companyid: $companyid,productid: $productid)
                }
            `,
            variables: { companyid:companyid, productid:productid },
          },
        }),
        providesTags:  [{ type: 'NewProduct', id: 'LIST' }],
        
      }),


    createProduct: builder.mutation({
        query: ({companyid ,
                description ,
                productid,
                category1id,
                category2id,
                category3id ,
                weight ,
                supplimentaryunits,
                nominalCode,
                commodityCode ,
                notes ,
                classid,
                obsoleteClass,
                live ,
                styleimage ,
                batchcontrol,
                stockinguom,
                issueuom ,
                stockingtype ,
                countryid,
        }) => ({
          body: {
            query: gql`
                mutation CreateProduct(
                    $batchcontrol: Boolean, 
                    $category1id: Int,
                    $category2id: Int, 
                    $category3id: Int,
                    $classid: Int, 
                    $companyid: String!,
                    $countryid: Int, 
                    $description: String, 
                    $issueuom: Int, 
                    $live: Boolean,
                    $nominalCode: String,
                    $obsoleteClass:Int, 
                    $productid: String!, 
                    $stockingtype: String, 
                    $stockinguom: Int, 
                    $weight: Float, 
                    $supplimentaryunits: String,
                    $styleimage: String, 
                    $notes: String,
                    $commodityCode: String
                    ) {
                        E4kTblproductProductCreate(
                            batchcontrol: $batchcontrol, 
                            category1id: $category1id,
                            category2id: $category2id, 
                            category3id: $category3id,
                            classid: $classid, 
                            companyid: $companyid,
                            countryid: $countryid,
                            description: $description,
                            issueuom: $issueuom,
                            live: $live, 
                            nominalCode: $nominalCode,
                            obsoleteClass: $obsoleteClass, 
                            productid: $productid, 
                            stockingtype: $stockingtype,
                            stockinguom: $stockinguom, 
                            weight: $weight, 
                            supplimentaryunits: $supplimentaryunits,
                            styleimage: $styleimage,
                            notes: $notes, 
                            commodityCode: $commodityCode
                        ) {
                            productId
                        }
                    }

            `,
            variables: {
                companyid:companyid, 
                description:description, 
                productid:productid, 
                category1id:category1id, 
                category2id:category2id, 
                category3id:category3id,
                weight:weight, 
                supplimentaryunits:supplimentaryunits, 
                nominalCode:nominalCode,
                commodityCode:commodityCode, 
                notes:notes, 
                classid:classid,
                obsoleteClass:obsoleteClass, 
                live:live, 
                styleimage:styleimage,
                batchcontrol:batchcontrol, 
                stockinguom:stockinguom, 
                issueuom:issueuom,
                stockingtype:stockingtype, 
                countryid:countryid, 
            
            },
          },
        }),
        invalidatesTags: [{ type: 'NewProduct', id: 'LIST' }], // Optional: Invalidate cache tags
      }),
  
      updateProduct: builder.mutation({
        query: ({companyid ,
          description ,
          productid,
          category1id,
          category2id,
          category3id ,
          weight ,
          supplimentaryunits,
          nominalCode,
          commodityCode ,
          notes ,
          classid,
          obsoleteClass,
          live ,
          styleimage ,
          batchcontrol,
          stockinguom,
          issueuom ,
          stockingtype ,
          countryid,
  }) => ({
    body: {
      query: gql`
          mutation UpdateProduct(
              $batchcontrol: Boolean, 
              $category1id: Int,
              $category2id: Int, 
              $category3id: Int,
              $classid: Int, 
              $companyid: String!,
              $countryid: Int, 
              $description: String, 
              $issueuom: Int, 
              $live: Boolean,
              $nominalCode: String,
              $obsoleteClass:Int, 
              $productid: String!, 
              $stockingtype: String, 
              $stockinguom: Int, 
              $weight: Float, 
              $supplimentaryunits: String,
              $styleimage: String, 
              $notes: String,
              $commodityCode: String
              ) {
                  E4kTblproductProductUpdate(
                      batchcontrol: $batchcontrol, 
                      category1id: $category1id,
                      category2id: $category2id, 
                      category3id: $category3id,
                      classid: $classid, 
                      companyid: $companyid,
                      countryid: $countryid,
                      description: $description,
                      issueuom: $issueuom,
                      live: $live, 
                      nominalCode: $nominalCode,
                      obsoleteClass: $obsoleteClass, 
                      productid: $productid, 
                      stockingtype: $stockingtype,
                      stockinguom: $stockinguom, 
                      weight: $weight, 
                      supplimentaryunits: $supplimentaryunits,
                      styleimage: $styleimage,
                      notes: $notes, 
                      commodityCode: $commodityCode
                  ) {
                      productUpdate
                  }
              }

      `,
      variables: {
          companyid:companyid, 
          description:description, 
          productid:productid, 
          category1id:category1id, 
          category2id:category2id, 
          category3id:category3id,
          weight:weight, 
          supplimentaryunits:supplimentaryunits, 
          nominalCode:nominalCode,
          commodityCode:commodityCode, 
          notes:notes, 
          classid:classid,
          obsoleteClass:obsoleteClass, 
          live:live, 
          styleimage:styleimage,
          batchcontrol:batchcontrol, 
          stockinguom:stockinguom, 
          issueuom:issueuom,
          stockingtype:stockingtype, 
          countryid:countryid, 
      
      },
    },
  }),
        invalidatesTags: (result, error, { productid }) => [
          { type: 'NewProduct', id: productid },
          { type: 'NewProduct', id: 'LIST' },
        ],
      }),
  
      deleteProduct: builder.mutation({
        query: ({ productid, companyid }) => ({
          body: {
            query: gql`
              mutation DeleteProductProduct($productid: String!, $companyid: String!) {
                E4kTblproductProductDelete(productid: $productid, companyid: $companyid) {
                  Success
                }
              }
            `,
            variables: { productid:productid,companyid:companyid },
          },
        }),
        invalidatesTags: (result, error, { productid }) => [
          { type: 'NewProduct', id: productid },
          { type: 'NewProduct', id: 'LIST' },
        ],
      }),



    duplicateTblProduct: builder.mutation({
      query: ({companyid,sourceProductid,targetProductid}) => ({
        body: {
          query: gql`
            mutation duplicateProductsProductid($companyid: String!,$sourceProductid: String!,$targetProductid: String!) {
                  E4kTblproductCopyExistingProduct(companyid: $companyid,sourceProductid: $sourceProductid,targetProductid: $targetProductid){
                    success
                  }
              }
          `,
          variables: { companyid:companyid, sourceProductid:sourceProductid ,targetProductid: targetProductid },
        },
      }),
      invalidatesTags: (result, error, { productid }) => [
        { type: 'NewProduct', id: productid },
        { type: 'NewProduct', id: 'LIST' },
      ],
      
    }),



    }),
  });
  
  export const {
    useGetAllProductsQuery,
    useSearchProductidQuery,  
    useCreateProductMutation,
    useUpdateProductMutation, 
    useDuplicateTblProductMutation,
    useDeleteProductMutation,
  } = e4kTblProductNew;
