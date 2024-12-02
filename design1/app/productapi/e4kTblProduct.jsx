
async function e4kTblProduct(companyid, productid,first,skip) {
    const query = `
      query MyQuery ($companyid:String!,$productid:String!,$first: Int!,$skip:Int!){
  e4kTblproductProductProducts(companyid: $companyid, productid: $productid,
                                first: $first,skip:$skip) {
    ... on CustomErrorType {
      message
    }
    ... on E4K_TblProduct_ProductNode {
      weight
      styleimage
      supplimentaryunits
      batchcontrol
      productid
      live
      description
      category1id {
        description
      }
      category2id {
        description
      }
      category3id {
        description
      }
      classid {
        description
      }
      commodityCode {
        description
      }
      issueuom {
        description
        issueUnits
      }
      notes
      obsoleteClass {
        allowSale
        description
      }
      stockingtype {
        description
      }
      stockinguom {
        description
      }
      countryid {
        country
        countryid
      }
    }
  }
}
    `;
  
    try {
      const response = await fetch('http://127.0.0.1:8000/product/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { companyid: companyid, productid: productid, first:first,skip: skip},
        }),
      });
  
      const result = await response.json();
  
  // Check if we have the correct data structure
    if (result.data && result.data.e4kTblproductProductProducts) {
        return result.data.e4kTblproductProductProducts;
  }
  
      if (response.ok) {
        const { data } = result;
       
        if (data.e4kTblproductProductProducts[0]) {
          return data.e4kTblproductProductProducts[0];
        } else if (data.e4kTblproductProductProducts[0].message) {
          return data.e4kTblproductProductProducts[0].message;
        }
      } else {
        throw new Error('An error occurred while fetching the data');
      }
    } catch (error) {
      console.error('Error:', error);
      throw new Error('An error occurred while fetching the data');
    }
  }
  
  export default e4kTblProduct;
  