"use client";
import { useState } from 'react';
import E4kTblProductCategory1Grid from "../../master/productCategory1/E4kTblProductCategory1Grid"
import E4kTblProductCategory2Grid from "../../master/productCategory2/E4kTblProductCategory2Grid"
import E4kTblProductCategory3Grid from "../../master/productCategory3/E4kTblProductCategory3Grid"
import E4kTblProductClassGrid from  '../../master/productClass/E4kTblProductClassGrid';
import E4kTblProductCommodityCodeGrid from "../../master/productCommodityCode/E4kTblProductCommodityCodeGrid"
import E4kTblProductObsoleteTypesGrid from "../../master/productObsoleteTypes/E4kTblProductObsoleteTypesGrid";
import E4kTblProductPriceTypesGrid from "../../master/productPriceTypes/E4kTblProductPriceTypesGrid";
import E4kTblProductPropertyTypesGrid from "../../master/productPropertyTypes/E4kTblProductPropertyTypesGrid";
import E4kTblProductStockingTypesGrid from "../../master/productStockingTypes/E4kTblProductStockingTypesGrid";
import E4kTblProductTypeOfIssueGrid from "../../master/productTypeOfIssue/E4kTblProductTypeOfIssueGrid";
import E4kTblProductUnitOfIssueGrid from '../../master/productUnitOfIssue/E4kTblProductUnitOfIssueGrid';
import E4kTblProductColoursGrid from '../../master/productColours/E4kTblProductColoursGrid';
import E4kTblProductSizeRangesGrid from '../../master/productSizeRanges/E4kTblProductSizeRangesGrid';
import E4kTblProductFitsGrid from "../../master/productFits/E4kTblProductFitsGrid";
import E4kTblProductPropertyTypesValuesGrid from '../../master/productPropertyTypesValues/E4kTblProductPropertyTypesValuesGrid';
import Test from './Test'
import E4kTblCustomerPriceProductRelateMatrix from '../../product/productRelatables/E4kTblCustomerPriceProductRelateMatrix';

const page = () => {

  const [showModalMedium, setShowModalMedium] = useState(false);

  const handleOpenModalMedium = () => {
    setShowModalMedium(true);
  };
  const handleCloseModalMedium = () => {
    setShowModalMedium(false);
  };

  const [showModalMediumcategory1, setShowModalMediumcategory1] = useState(false);

  const handleOpenModalMediumcategory1 = () => {
    setShowModalMediumcategory1(true);
  };
  const handleCloseModalMediumcategory1 = () => {
    setShowModalMediumcategory1(false);
  };

  ////////////////////////////category2
  const [showModalMediumcategory2, setShowModalMediumcategory2] = useState(false);

  const handleOpenModalMediumcategory2 = () => {
    setShowModalMediumcategory2(true);
  };
  const handleCloseModalMediumcategory2 = () => {
    setShowModalMediumcategory2(false);
  };

  /////////////////////////// category 3
  const [showModalMediumcategory3, setShowModalMediumcategory3] = useState(false);

  const handleOpenModalMediumcategory3 = () => {
    setShowModalMediumcategory3(true);
  };
  const handleCloseModalMediumcategory3 = () => {
    setShowModalMediumcategory3(false);
  };

  /////////////////////////// commoditycode
  const [showModalMediumCommodityCode, setShowModalMediumCommodityCode] = useState(false);

  const handleOpenModalMediumCommodityCode = () => {
    setShowModalMediumCommodityCode(true);
  };
  const handleCloseModalMediumCommodityCode = () => {
    setShowModalMediumCommodityCode(false);
  };

  /////////////////////////// ObsoleteTypes
  const [showModalMediumObsoleteTypes, setShowModalMediumObsoleteTypes] = useState(false);

  const handleOpenModalMediumObsoleteTypes = () => {
    setShowModalMediumObsoleteTypes(true);
  };
  const handleCloseModalMediumObsoleteTypes = () => {
    setShowModalMediumObsoleteTypes(false);
  };

  //////////////////////////////////// E4kTblProductPriceTypesGrid

  const [showModalMediumPriceTypes, setShowModalMediumPriceTypes] = useState(false);

  const handleOpenModalMediumPriceTypes = () => {
    setShowModalMediumPriceTypes(true);
  };
  const handleCloseModalMediumPriceTypes = () => {
    setShowModalMediumPriceTypes(false);
  };

  /////////////////////////////////////// E4kTblProductFitsGrid
  const [showModalMediumFits, setShowModalMediumFits] = useState(false);
  const handleOpenModalMediumFits = () => {
    setShowModalMediumFits(true);
  };
  const handleCloseModalMediumFits = () => {
    setShowModalMediumFits(false);
  };

  //////////////////////////////////////// E4kTblProductPropertyTypesGrid

  const [showModalMediumPropertyTypes, setShowModalMediumPropertyTypes] = useState(false);

  const handleOpenModalMediumPropertyTypes = () => {
    setShowModalMediumPropertyTypes(true);
  };
  const handleCloseModalMediumPropertyTypes = () => {
    setShowModalMediumPropertyTypes(false);
  };
  

  //////////////////////////////////////////////// E4kTblProductStockingTypesGrid

  const [showModalMediumStockingTypes, setShowModalMediumStockingTypes] = useState(false);

  const handleOpenModalMediumStockingTypes = () => {
    setShowModalMediumStockingTypes(true);
  };
  const handleCloseModalMediumStockingTypes = () => {
    setShowModalMediumStockingTypes(false);
  };

  /////////////////////////////////////// E4kTblProductTypeOfIssueGrid
  const [showModalMediumTypeOfIssue, setShowModalMediumTypeOfIssue] = useState(false);

  const handleOpenModalMediumTypeOfIssue = () => {
    setShowModalMediumTypeOfIssue(true);
  };
  const handleCloseModalMediumTypeOfIssue = () => {
    setShowModalMediumTypeOfIssue(false);
  };


  ////////////////////////////////// E4kTblProductUnitOfIssueGrid
  const [showModalMediumUnitOfIssue, setShowModalMediumUnitOfIssue] = useState(false);
  const handleOpenModalMediumUnitOfIssue = () => {
    setShowModalMediumUnitOfIssue(true);
  };
  const handleCloseModalMediumUnitOfIssue = () => {
    setShowModalMediumUnitOfIssue(false);
  };

  /////////////////////////////////// E4kTblProductColoursGrid
  const [showModalMediumColours, setShowModalMediumColours] = useState(false);
  const handleOpenModalMediumColours = () => {
    setShowModalMediumColours(true);
  };
  const handleCloseModalMediumColours = () => {
    setShowModalMediumColours(false);
  };


/////////////////////////////// E4kTblProductSizeRangesGrid
  const [showModalMediumSizeRanges, setShowModalMediumSizeRanges] = useState(false);
  const handleOpenModalMediumSizeRanges = () => {
    setShowModalMediumSizeRanges(true);
  };
  const handleCloseModalMediumSizeRanges = () => {
    setShowModalMediumSizeRanges(false);
  };


  //////////////////////////////////////// E4kTblProductPropertyTypesGrid

  const [showModalMediumPropertyTypesValues, setShowModalMediumPropertyTypesValues] = useState(false);

  const handleOpenModalMediumPropertyTypesValues = () => {
    setShowModalMediumPropertyTypesValues(true);
  };
  const handleCloseModalMediumPropertyTypesValues = () => {
    setShowModalMediumPropertyTypesValues(false);
  };




  /////////////////////////////// product customer price list with customer id
  const [showModalMediumProductCustomer, setShowModalMediumProductCustomer] = useState(false);
  const handleOpenModalMediumProductCustomer = () => {
    setShowModalMediumProductCustomer(true);
  };
  const handleCloseModalMediumProductCustomer = () => {
    setShowModalMediumProductCustomer(false);
  };

  return (
    <div>
      <a href="#" onClick={handleOpenModalMediumcategory1}>Tbl Product Category 1</a>
      <E4kTblProductCategory1Grid showModalMediumcategory1={showModalMediumcategory1} handleCloseMediumcategory1={handleCloseModalMediumcategory1} />
    <br />
      <a href="#" onClick={handleOpenModalMediumcategory2}>Tbl Product Category 2</a>
      <E4kTblProductCategory2Grid showModalMediumcategory2={showModalMediumcategory2} handleCloseMediumcategory2={handleCloseModalMediumcategory2} />
    
      <br />
      <a href="#" onClick={handleOpenModalMediumcategory3}>Tbl Product Category 3</a>
      <E4kTblProductCategory3Grid showModalMediumcategory3={showModalMediumcategory3} handleCloseMediumcategory3={handleCloseModalMediumcategory3} />
      <br />
      <a href="#" onClick={handleOpenModalMedium}>Tbl Product Class</a>
      <E4kTblProductClassGrid showModalMedium={showModalMedium} handleCloseMedium={handleCloseModalMedium} />
    

      <br />
      <a href="#" onClick={handleOpenModalMediumCommodityCode}>Tbl Product CommodityCode</a>
      <E4kTblProductCommodityCodeGrid showModalMediumCommodityCode={showModalMediumCommodityCode} handleCloseMediumCommodityCode={handleCloseModalMediumCommodityCode} />
    

      <br />
      <a href="#" onClick={handleOpenModalMediumObsoleteTypes}>Tbl Product Obsolete Types</a>
      <E4kTblProductObsoleteTypesGrid showModalMediumObsoleteTypes={showModalMediumObsoleteTypes} handleCloseModalMediumObsoleteTypes={handleCloseModalMediumObsoleteTypes} />

      <br />
      <a href="#" onClick={handleOpenModalMediumPriceTypes}>Tbl Product Price Types</a>
      <E4kTblProductPriceTypesGrid   showModalMediumPriceTypes={showModalMediumPriceTypes} handleCloseModalMediumPriceTypes={handleCloseModalMediumPriceTypes} />

      <br />
      <a href="#" onClick={handleOpenModalMediumFits}>Tbl Product Fits</a>
      <E4kTblProductFitsGrid showModalMediumProducctFits={showModalMediumFits} handleCloseMediumProducctFits={handleCloseModalMediumFits} isEditFits = {true} />


      <br />
      <a href="#" onClick={handleOpenModalMediumPropertyTypes}>Tbl Product Property Types</a>
      <E4kTblProductPropertyTypesGrid showModalMediumPropertyTypes={showModalMediumPropertyTypes} handleCloseModalMediumPropertyTypes={handleCloseModalMediumPropertyTypes} isEdit={true} />


      <br />
      <a href="#" onClick={handleOpenModalMediumPropertyTypesValues}>Tbl Product Property Types Values</a>
      <E4kTblProductPropertyTypesValuesGrid showModalMediumPropertyTypesValues={showModalMediumPropertyTypesValues} handleCloseModalMediumPropertyTypesValues={handleCloseModalMediumPropertyTypesValues} isEdit={false} property = {3} />


      <br />
      <a href="#" onClick={handleOpenModalMediumStockingTypes}>Tbl Product Stocking Types</a>
      <E4kTblProductStockingTypesGrid showModalMediumStockingTypes={showModalMediumStockingTypes} handleCloseMediumStockingTypes={handleCloseModalMediumStockingTypes} />

      <br />
      <a href="#" onClick={handleOpenModalMediumTypeOfIssue}>Tbl Product Type Of Issue</a>
      <E4kTblProductTypeOfIssueGrid showModalMediumTypeOfIssue={showModalMediumTypeOfIssue} handleCloseModalMediumTypeOfIssue={handleCloseModalMediumTypeOfIssue} />

      <br />
      <a href="#" onClick={handleOpenModalMediumUnitOfIssue}>Tbl Product Unit Of Issue</a>
      <E4kTblProductUnitOfIssueGrid showModalMediumUnitOfIssue={showModalMediumUnitOfIssue} handleCloseModalMediumUnitOfIssue={handleCloseModalMediumUnitOfIssue} />

      <br />
      <a href="#" onClick={handleOpenModalMediumColours}>Tbl Product Colours </a>
      <E4kTblProductColoursGrid showModalMediumColours={showModalMediumColours} handleCloseMediumColours={handleCloseModalMediumColours} isEdit={true} />

      <br />
      <a href="#" onClick={handleOpenModalMediumSizeRanges}>Tbl Product Size Ranges </a>
      <E4kTblProductSizeRangesGrid showModalMediumSizeRanges={showModalMediumSizeRanges} handleCloseModalMediumSizeRanges={handleCloseModalMediumSizeRanges} isEditSize={true}/>



      <br />
      <a href="#" onClick={handleOpenModalMediumProductCustomer}>Tbl Customer Product price List </a>
      <E4kTblCustomerPriceProductRelateMatrix showModalMediumCustomerPriceProductMatrix={showModalMediumProductCustomer} handleCloseMediumCustomerPriceProductMatrix={handleCloseModalMediumProductCustomer} />








    <br/> <br/> <br/>
    {/* <Test/> */}

    </div>
  );
};

export default page;
