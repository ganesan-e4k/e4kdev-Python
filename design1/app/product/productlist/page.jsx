"use client";
import React from 'react';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { CheckBox } from 'smart-webcomponents-react/checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChain, faChainBroken, faTh, faThList } from '@fortawesome/free-solid-svg-icons';
import CreateNewProduct from '../create/createNewProduct';
import EchoProductCard from "../../allproduct/EchoProductCard";
import Echoproductgrid from '../../allproduct/echoproductgrid';
import { toast } from 'react-toastify';


import {setSelectProduct} from '../../store/slices/e4kTblProductSelectSlice'
import {resetSelectProductProperty } from '../../store/slices/e4kTblProductPropertyAddSelect';
import { resetSelectProductPropertyFit} from '../../store/slices/e4kTblProductPropertyFItSelect';
import {resetSelectProductPropertyColour} from '../../store/slices/e4kTblProductPropertyColourSelect';
import {resetSelectProductPropertySize } from '../../store/slices/e4kTblProductPropertySizeRangeSelect';


import E4kTblProductCategory1Grid from "../../master/productCategory1/E4kTblProductCategory1Grid";
import E4kTblProductCategory2Grid from "../../master/productCategory2/E4kTblProductCategory2Grid"
import E4kTblProductCategory3Grid from "../../master/productCategory3/E4kTblProductCategory3Grid"
import E4kTblProductClassGrid from  '../../master/productClass/E4kTblProductClassGrid';
import E4kTblProductCommodityCodeGrid from "../../master/productCommodityCode/E4kTblProductCommodityCodeGrid"
import E4kTblProductObsoleteTypesGrid from "../../master/productObsoleteTypes/E4kTblProductObsoleteTypesGrid";
import E4kTblProductStockingTypesGrid from "../../master/productStockingTypes/E4kTblProductStockingTypesGrid";
import E4kTblProductTypeOfIssueGrid from "../../master/productTypeOfIssue/E4kTblProductTypeOfIssueGrid";
import E4kTblProductUnitOfIssueGrid from '../../master/productUnitOfIssue/E4kTblProductUnitOfIssueGrid';
import E4kNewProductCreate from '../create/newProductCreatePopup';

///////////// Country 
import E4kCountryGrid from '../../master/customerCountry/E4kCountryGrid';
import E4kTblNominalAccountGrid from '../../master/nominalAccount/E4kTblNominalAccountGrid';

import {
  useDeleteProductMutation
} 
from '../../store/services/e4kTblProduct';

import {setPropertyLevelResetState } from '../../store/slices/e4kTblProductPropertyLevelResetState';

import {setSelectNonLiveProduct,resetSelectNonLiveProduct} from '../../store/slices/e4kTblnonliveproduct';

export default function productlist() {


    //////////////// Property level reset
    //const Product_property_reset  = useSelector((state) => state.propertylevelreset.propertylevelreset);
    const CompanyProductAlllist = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid,setCompanyid] = useState(CompanyProductAlllist)

    const [isCardView, setIsCardView] = useState(false);
    const [isWidgetView, setIsWidgetView] = useState(false);
    
	  const [showModalNewProduct, setShowModalNewProduct] = useState(false);
	  const [loading, setLoading] = useState(false);
    const [isColumn2Visible, setIsColumn2Visible] = useState(true);
    //const pageCount = Math.ceil(Data.length / pageSize);


    ////////// Use dispatch
    const dispatch1 = useDispatch();

    const ProductSelect = useSelector((state) => state.selectProduct.selectProduct);
    //const status = useSelector((state) => state.selectProduct.status);

    ////////////////// Master page call State variables
    const [showModalMediumcategory1, setShowModalMediumcategory1] = useState(false);
    const [showModalMediumcategory2, setShowModalMediumcategory2] = useState(false);
    const [showModalMediumcategory3, setShowModalMediumcategory3] = useState(false);
    const [showModalMediumclass, setShowModalMediumclass] = useState(false);
    const [showModalMediumCommodityCode, setShowModalMediumCommodityCode] = useState(false);
    const [showModalMediumObsoleteTypes, setShowModalMediumObsoleteTypes] = useState(false);
    const [showModalMediumStockingTypes, setShowModalMediumStockingTypes] = useState(false);
    const [showModalMediumTypeOfIssue, setShowModalMediumTypeOfIssue] = useState(false);
    const [showModalMediumUnitOfIssue, setShowModalMediumUnitOfIssue] = useState(false);
    const [showModalMediumCountry, setShowModalMediumCountry] = useState(false);
    const [showModalMediumNominalAccount, setShowModalMediumNominalAccount] = useState(false);
    
    const [showModalMediumNewProduct, setShowModalMediumNewProduct] = useState(false);
    //////////////pop up delete
    const [showConfirmSelectProductDelete, setShowConfirmSelectProductDelete] = useState(false);
    const [recordToDeleteSelectProductDelete, setRecordToDeleteSelectProductDelete] = useState(null);

  /////////// Delete Product
  const [deleteProductRecord, {  isLoading: deleteproductloading }] = useDeleteProductMutation();


  useEffect(() => {
    if (ProductSelect.productid !== undefined) {
      setIsWidgetView(true);
    }


  },[ProductSelect]);



   

    const handleLayoutToggle = () => {
      setIsCardView(!isCardView);
        dispatch1(setSelectProduct({}));
        // console.log('dispatch store product select as empty')

    };
    const handleToggle = () => {
      setIsColumn2Visible(!isColumn2Visible);
    };   
    
    /********** Large popup *********/

    const handleOpenModal = () => {
      setShowModalNewProduct(true);
    };
  
    const handleCloseModal = () => {
        setShowModalNewProduct(false);
        //dispatch1(setSelectProduct({ productid: '' }));
        dispatch1(setSelectProduct({}));
        dispatch1(resetSelectProductPropertyFit())
        dispatch1(resetSelectProductPropertyColour())
        dispatch1(resetSelectProductPropertySize())
        dispatch1(resetSelectProductProperty())
        // console.log('dispatch store product select as empty')
    };

    const handleNewProductCreate = () => {
      dispatch1(setSelectProduct({}));
      //dispatch1(setSelectProduct({}));
      dispatch1(resetSelectProductPropertyFit())
      dispatch1(resetSelectProductPropertyColour())
      dispatch1(resetSelectProductPropertySize())
      dispatch1(resetSelectProductProperty())
      setShowModalMediumNewProduct(true)
      //setShowModalNewProduct(true)
    }

    const handleProductEdit = () => {
      if (ProductSelect.productid !== undefined && ProductSelect.productid !=='') {
        setShowModalNewProduct(true)
      }else{
       
        toast.error('Please select a product to edit',{
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
        });
      }
    }


    ////////////////////////////////// Master Page Pop ups close event handlers
    ///category1
    const handleCloseModalMediumcategory1 = () => {
      setShowModalMediumcategory1(false);
    };

    ///// category2
    const handleCloseModalMediumcategory2 = () => {
      setShowModalMediumcategory2(false);
    };

    ///category3
    const handleCloseModalMediumcategory3 = () => {
      setShowModalMediumcategory3(false);
    };

    //////class id
    const handleCloseModalMediumClass = () => {
      setShowModalMediumclass(false);
    };

    /////// commoditycode
    const handleCloseModalMediumCommodityCode = () => {
      setShowModalMediumCommodityCode(false);
    };
    /////// ObsoleteTypes
    const handleCloseModalMediumObsoleteTypes = () => {
      setShowModalMediumObsoleteTypes(false);
    };

    /////// stocking type
    const handleCloseModalMediumStockingTypes = () => {
      setShowModalMediumStockingTypes(false);
    };

    /////////////// Type of Issue
    const handleCloseModalMediumTypeOfIssue = () => {
      setShowModalMediumTypeOfIssue(false);
    };

    /////////// unit of issue
    const handleCloseModalMediumUnitOfIssue = () => {
      setShowModalMediumUnitOfIssue(false);
    };

    ////////////////////////// Country

  
    const handleCloseModalMediumCountry = () => {
      setShowModalMediumCountry(false);
    };

    ///////////////////////// customr nominal accout
  
    const handleCloseModalMediumNominalAccount = () => {
      setShowModalMediumNominalAccount(false);
    };
  
  

    /////////////
     /********** Medium popup *********/


     const handleOpenModalMediumNewProduct = () => {
      setShowModalMediumNewProduct(true);
     };
   
     const handleCloseModalMediumNewProduct = (newProductData) => {
      setShowModalMediumNewProduct(false);
       
      if (newProductData !== undefined){
        dispatch1(setSelectProduct(newProductData));
        setShowModalNewProduct(true);
      }
      
     };


    //////////////////////////////////////

    ///////////////// Select Product Array for looping and reduce code 
    const productDetails = [
      { label: "Category1", value: ProductSelect.category1id, clickable: true },
      { label: "Category2", value: ProductSelect.category2id, clickable: true },
      { label: "Category3", value: ProductSelect.category3id, clickable: true },
      { label: "Class", value: ProductSelect.classid, clickable: true },
      { label: "Commodity Code", value: ProductSelect.commodityCode, clickable: true },
      { label: "Nominal", value: ProductSelect.Nominal, clickable: true },
      { label: "Obsolete Class", value: ProductSelect.obsoleteClass, clickable: true },
      { label: "Weight", value: ProductSelect.weight },
      { label: "Supplimentary Units", value: ProductSelect.supplimentaryunits },
      { label: "Notes", value: ProductSelect.notes },
      { label: "Stocking Type", value: ProductSelect.stockingtype, clickable: true },
      { label: "Stocking UOM", value: ProductSelect.StockingUOM,clickable: true },
      { label: "Issue UOM", value: ProductSelect.issueuom,clickable: true },
      { label: "Live", value: ProductSelect.live ? <CheckBox disabled checked /> : null , clickable: false },
      { label: "Batch Control", value: ProductSelect.batchcontrol ? <CheckBox disabled checked /> : null, clickable: false },
      { label: "Country of Origin", value: ProductSelect.country, clickable: true },
    ];

    const handleProductSelectClick = (label, value) => {
      console.log(`Clicked on ${label}: ${value}`);

      if (label === "Category1") {
        setShowModalMediumcategory1(true);
      }
      else if (label === "Category2") {
        setShowModalMediumcategory2(true);
      }
      else if (label === "Category3") {
        setShowModalMediumcategory3(true);
      }
      else if (label === "Class") {
        setShowModalMediumclass(true);
      }
      else if (label === "Commodity Code") {
        setShowModalMediumCommodityCode(true);
      }
      else if (label === "Obsolete Class") {
        setShowModalMediumObsoleteTypes(true);
      }
      else if (label === "Stocking Type") {
        setShowModalMediumStockingTypes(true);
      }
      else if (label === "Stocking UOM") {
        setShowModalMediumTypeOfIssue(true);
      }
      else if (label === "Issue UOM") {
        setShowModalMediumUnitOfIssue(true);
      }
      else if (label === "Country of Origin") {
        setShowModalMediumCountry(true);
      }
      else if (label === "Nominal"){
        setShowModalMediumNominalAccount(true);
      }


    };




//////////////// delete existing record
const handleSelectProductDelete = async () => {
  setShowConfirmSelectProductDelete(false);
  if (recordToDeleteSelectProductDelete) {
    try {
      
        const result = await deleteProductRecord( recordToDeleteSelectProductDelete )
        if (result.error) {
            console.error('Mutation Error:', result.error);
        } else {
            //console.log('Mutation Success:', result.data);
            if(result.data.E4kTblproductProductDelete.Success === "Success"){
                toast.success('Product has been inactivated',{
                  position: "top-center",
                  autoClose: 500,
                  hideProgressBar: true,
              });
              dispatch1(setSelectProduct({}));
            }else{
                toast.error(result.data.E4kTblproductProductDelete.Success,{
                  position: "top-center",
                  autoClose: 500,
                  hideProgressBar: true,
              });
            }
        }
    } catch (error) {
        console.error('Mutation Error:', error);
    }
}
};


//////// handle product delete
const handleSelectProductDeleteButton = () => {

  if (ProductSelect.productid !== undefined && ProductSelect.productid !=='') {

    setRecordToDeleteSelectProductDelete({
      companyid: companyid,
      productid: ProductSelect.productid
    });
    setShowConfirmSelectProductDelete(true);
    

  }else{
    toast.error('Please select a product to delete',{
      position: "top-center",
      autoClose: 500,
      hideProgressBar: true,
    });
  }


}


    const handleProductNonLiveCheckBox = (ev) => {
      if (ev.detail.value === true){
        // Non live product true
        dispatch1(setSelectNonLiveProduct(ev.detail.value));
      }else if (ev.detail.value === false){
        // Non live product false
        dispatch1(resetSelectNonLiveProduct());
      }

    }


  return (
   <>
    	{/* <!-- Breadcomb area Start--> */}
      <div className="breadcomb-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="breadcomb-list">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="breadcomb-wp">
                      
                      <div className="breadcomb-ctn">
                        <span><a href="#" onClick={handleNewProductCreate}> <i className="fa fa-plus"></i> New</a> | </span>
                        <span><a href="#" onClick={handleSelectProductDeleteButton}> <i className="fa fa-trash"></i> Delete</a> | </span>
                        <span><a href="#" onClick={handleProductEdit}> <i className="fa fa-pencil"></i> Edit</a></span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="breadcomb-wp right-barmenu">
                      
                      <div className="breadcomb-ctn">
                        <span><a href="#" onClick={handleToggle}><FontAwesomeIcon icon={isColumn2Visible ? faChain : faChainBroken} /></a> | </span>
                        <span><a href="#" id="layoutview" onClick={handleLayoutToggle}><FontAwesomeIcon icon={isCardView ? faTh : faThList} /></a></span>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       {/* <!-- Breadcomb area End--> */}

    {/* 
    <!-- Data Table area Start--> */}
    <div className="data-table-area">
        <div className="container-fluid">
            <div className="row">
                <div id="column1" className={isColumn2Visible ? 'col-md-9' : 'col-md-12'}>
                  
                      <div id="gridview" className="data-table-list" style={{ display: isCardView ? 'block' : 'block' }}> 
                            {/* <div className="cmp-tb-hd">
                              <h2>Product list :</h2>
                            </div> */}
                            <div className="cmp-tb-hd">
                              <h2>Product list :</h2>
                              <div className='productlist-checkbox-nolive'>
                                <span>Show only Inactive :</span> 
                                  <CheckBox onChange={(e) => handleProductNonLiveCheckBox(e)} />
                                  
                              </div>
                            </div>
					
					            {isCardView ? (
                        <div id="cardview" className="" style={{ display: 'block' }}>
                            {/* Card view content */}
                            {loading && <p>Loading...</p>}
                            <EchoProductCard />

                        </div>
                            ) : (
                                <div style={{ display: 'block' }}>
                                    <Echoproductgrid/>
                                </div>
                                )
                        }
                      </div>
                  </div>
                    

                  <div id="column2" className="col-md-3 col-xs-12" style={{ display: isColumn2Visible ? 'block' : 'none' }}>
          
                              {isWidgetView ? (
                                <div className="mainpopup-right">
                                <div className="contact-list">

                                {ProductSelect.productid ? (
                                  <>
                                  <div className="contact-img">
                                      <img src={`${ProductSelect.styleimage ? ProductSelect.styleimage: "../../assets/images/user.png"}`} alt="" />
                                </div>

                                <div className="contact-des">
                                  <h4>Product ID : {ProductSelect.productid}</h4>
                                  <p className="contact-des-line">Description : {ProductSelect.description}</p>
                                </div>
                                </>
                                  ):(null)}
                                  

                                  <div className="leftsidebar-clickdiv">
                                    <div className="row">
                                      {ProductSelect.productid ? (productDetails.map((detail, index) => (
                                        <React.Fragment key={index}>
                                          <div className="col-xs-8">
                                            <div className="input-lable">
                                              <a className="link-underline" onClick={detail.clickable ? () => handleProductSelectClick(detail.label, detail.value) : null}>
                                                    {detail.label}
                                              </a>
                                            </div>
                                          </div>
                                          <div className="col-xs-4">
                                              <div className="input-lablevalue">
                                                {detail.value}
                                              </div>
                                          </div>
                                        </React.Fragment>
                                      ))): (null)}
                                    </div>
                                  </div>
                                </div>
                          </div>
                        ) : null}
                              {/* Product Select details click event loop */}

                              				
                  </div>	
              </div>
             </div>

                        {/* <<<<<<<<<<<<Pop up code >>>>>>>>>                         */}
       {showConfirmSelectProductDelete && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmSelectProductDelete(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to inactive this Product?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmSelectProductDelete(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleSelectProductDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
          


    </div>
    {/* <!-- Data Table area End--> */}

      <CreateNewProduct showModalCreateNewProduct={showModalNewProduct} handleCloseCreateNewProduct={handleCloseModal} />
      

      {/* Master page Components Calls  */}
      <E4kTblProductCategory1Grid showModalMediumcategory1={showModalMediumcategory1} handleCloseMediumcategory1={handleCloseModalMediumcategory1} />
      <E4kTblProductCategory2Grid showModalMediumcategory2={showModalMediumcategory2} handleCloseMediumcategory2={handleCloseModalMediumcategory2} />
      <E4kTblProductCategory3Grid showModalMediumcategory3={showModalMediumcategory3} handleCloseMediumcategory3={handleCloseModalMediumcategory3} />                          
      <E4kTblProductClassGrid showModalMedium={showModalMediumclass} handleCloseMedium={handleCloseModalMediumClass} />
      <E4kTblProductCommodityCodeGrid showModalMediumCommodityCode={showModalMediumCommodityCode} handleCloseMediumCommodityCode={handleCloseModalMediumCommodityCode} />
      <E4kTblProductObsoleteTypesGrid showModalMediumObsoleteTypes={showModalMediumObsoleteTypes} handleCloseModalMediumObsoleteTypes={handleCloseModalMediumObsoleteTypes} />
      <E4kTblProductStockingTypesGrid showModalMediumStockingTypes={showModalMediumStockingTypes} handleCloseMediumStockingTypes={handleCloseModalMediumStockingTypes} />
      <E4kTblProductTypeOfIssueGrid showModalMediumTypeOfIssue={showModalMediumTypeOfIssue} handleCloseModalMediumTypeOfIssue={handleCloseModalMediumTypeOfIssue} />
      <E4kTblProductUnitOfIssueGrid showModalMediumUnitOfIssue={showModalMediumUnitOfIssue} handleCloseModalMediumUnitOfIssue={handleCloseModalMediumUnitOfIssue} />
      <E4kCountryGrid showModalMediumCountry={showModalMediumCountry}  handleCloseMediumCountry={handleCloseModalMediumCountry} />
      <E4kTblNominalAccountGrid showModalMediumNominalAccount={showModalMediumNominalAccount} handleCloseMediumNominalAccount={handleCloseModalMediumNominalAccount} />

      <E4kNewProductCreate showModalMediumNewProduct={showModalMediumNewProduct} handleCloseMediumNewProduct={handleCloseModalMediumNewProduct} />
   </>
  );
}