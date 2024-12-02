'use client'
import React from 'react'
import { useState } from 'react';


import E4kTblCustomerCategory1Grid from '../../master/customerCategory1/E4kTblCustomerCategory1Grid';
import E4kTblCustomerCategory2Grid from '../../master/customerCategory2/E4kTblCustomerCategory2Grid';
import E4kTblCustomerCategory3Grid from '../../master/customerCategory3/E4kTblCustomerCategory3Grid';
import E4kTblNominalAccountGrid from '../../master/nominalAccount/E4kTblNominalAccountGrid';
import E4kCustomerClassGrid from '../../master/customerClass/E4kCustomerClassGrid';
import E4kTblCustomerGroupGrid from '../../master/customerGroup/E4kTblCustomerGroupGrid'
import E4kCountryGrid from '../../master/customerCountry/E4kCountryGrid';
import E4kTblCurrencyGrid from '../../master/currency/E4kTblCurrencyGrid';
import E4kTblAccVatCodesGrid from '../../master/accountVatcode/E4kTblAccVatCodesGrid';
import E4kPaymentterms from '../../master/paymentterms/E4kPaymentterms';
import E4kTblbusRepGrid from '../../master/TblbusRep/E4kTblbusRepGrid';
import E4kTblCustomerPriceProductRelateMatrix1 from '../customerRelatables/E4kTblCustomerPriceProductRelateMatrix1'



const page = () => {

    const [showModalMediumCustomerCategory1, setShowModalMediumCustomerCategory1] = useState(false);
    const [showModalMediumCustomerCategory2, setShowModalMediumCustomerCategory2] = useState(false);
    const [showModalMediumCustomerCategory3, setShowModalMediumCustomerCategory3] = useState(false);
    const [showModalMediumNominalAccount, setShowModalMediumNominalAccount] = useState(false);
    const [showModalMediumCustomerClass, setShowModalMediumCustomerClass] = useState(false);
    const [showModalMediumCustomerGroup, setshowModalMediumCustomerGroup] = useState(false);
    const [showModalMediumCountry, setShowModalMediumCountry] = useState(false);
    const [showModalMediumCurrency, setShowModalMediumCurrency] = useState(false);
    const [showModalMediumCustomerSetvalues, setShowModalMediumCustomerSetvalues] = useState(false);
    const [ showModalMediumVatCodes , setShowModalMediumVatCodes] = useState(false);
    const [ showModalMediumPaymentterms, setShowModalMediumPaymentterms] = useState(false);
    const [ showModalMediumBusRep, setShowModalMediumBusRep] = useState(false);
    const [showModalMediumCustomerPriceProductMatrix, setshowModalMediumCustomerPriceProductMatrix]= useState(false);
 
 
    ////////////////// Open/Close Event for Customer Category1
    const handleOpenModalMediumCustomerCategory1 = () => {
        setShowModalMediumCustomerCategory1(true);
    };

    const handleCloseModalMedium = () => {
        setShowModalMediumCustomerCategory1(false);
    };
    

    ///////////////// Customer category2
    const handleOpenModalMediumCustomerCategory2 = () => {
        setShowModalMediumCustomerCategory2(true);
      };

    const handleCloseModalMediumCustomerCategory2 = () => {
    setShowModalMediumCustomerCategory2(false);
    };
 
    ///////////////////////// Customer category3
    const handleOpenModalMediumCustomerCategory3 = () => {
        setShowModalMediumCustomerCategory3(true);
      };
    
      const handleCloseModalMediumCustomerCategory3 = () => {
        setShowModalMediumCustomerCategory3(false);
      };
 
      //////////////////// customr customer class

      const handleOpenModalMediumCustomerClass = () => {
        setShowModalMediumCustomerClass(true);
      };
    
      const handleCloseModalMediumCustomerClass = () => {
        setShowModalMediumCustomerClass(false);
      };

      ///////////////////////// customr nominal accout
      const handleOpenModalMediumNominalAccount = () => {
        setShowModalMediumNominalAccount(true);
      };
    
      const handleCloseModalMediumNominalAccount = () => {
        setShowModalMediumNominalAccount(false);
      };
 
      ////////////////////// customer group
      const handleOpenModalMediumCustomrGroup = () => {
        setshowModalMediumCustomerGroup(true);
      };
    
      const handleCloseModalMediumCustomrGroup = () => {
        setshowModalMediumCustomerGroup(false);
      };
 

      /////////////////// Counytry

      const handleOpenModalMediumCountry = () => {
        setShowModalMediumCountry(true);
      };
    
      const handleCloseModalMediumCountry = () => {
        setShowModalMediumCountry(false);
      };

      ///////////////////// Currency

      const handleCloseModalMediumCurrency = () => {
        setShowModalMediumCurrency(false);
      };
    
      const handleOpenModalMediumCurrency = () => {
        setShowModalMediumCurrency(true);
      };


      /////////////////// acc vatcode 
      const handleOpenModalMediumVatCodes = () => {
        setShowModalMediumVatCodes(true);
      };

      const handleCloseModalMediumVatcode = () => {
        setShowModalMediumVatCodes(false);
      };

      ///////////////////// Payment terms
      const handleOpenModalMediumPaymentterms = () => {
        setShowModalMediumPaymentterms(true);
      };
      
      const handleCloseModalMediumPaymentterms = () => {
        setShowModalMediumPaymentterms(false);
      };
      
      ///////////////////// Bus rep
      const handleOpenModalMediumBusRep = () => {
        setShowModalMediumBusRep(true);
      };
      
      const handleCloseModalMediumBusRep = () => {
        setShowModalMediumBusRep(false);
      };
      
      ///////////////////// Customer price product relate matrix1

      const handleOpenModalMediumCustomerPriceProductRelateMatrix1 = () => {
        setshowModalMediumCustomerPriceProductMatrix(true);
      };
      
      const handleCloseModalMediumCustomerPriceProductRelateMatrix1 = () => {
        setshowModalMediumCustomerPriceProductMatrix(false);
      };
 
    return (
    <div>
        <a href="#" onClick={handleOpenModalMediumCustomerCategory1}>Tbl Customer Category 1</a>

        <E4kTblCustomerCategory1Grid 
            showModalMediumCustomerCategory1={showModalMediumCustomerCategory1} 
            handleCloseMediumCustomerCategory1={handleCloseModalMedium} 
        />

    <br/>
        <a href="#" onClick={handleOpenModalMediumCustomerCategory2}>Tbl Customer Category 2</a>

        <E4kTblCustomerCategory2Grid 
            showModalMediumCustomerCategory2={showModalMediumCustomerCategory2} 
            handleCloseMediumCustomerCategory2={handleCloseModalMediumCustomerCategory2} 
        />

    <br/>
    <a href="#" onClick={handleOpenModalMediumCustomerCategory3}>Tbl Customer Category 3</a>

    <E4kTblCustomerCategory3Grid
        showModalMediumCustomerCategory3={showModalMediumCustomerCategory3}
        handleCloseMediumCustomerCategory3={handleCloseModalMediumCustomerCategory3}
      />

    <br/>
        <a href="#" onClick={handleOpenModalMediumNominalAccount}>Tbl Account Nominal</a>
        <E4kTblNominalAccountGrid
            showModalMediumNominalAccount={showModalMediumNominalAccount}
            handleCloseMediumNominalAccount={handleCloseModalMediumNominalAccount}
        />

    <br/>

    <a href="#" onClick={handleOpenModalMediumCustomerClass}>Tbl Customer Class</a>
        <E4kCustomerClassGrid
            showModalMediumCustomerClass={showModalMediumCustomerClass}
            handleCloseMediumCustomerClass={handleCloseModalMediumCustomerClass}
        />

    <br/>
    <a href="#" onClick={handleOpenModalMediumCustomrGroup}>Tbl Customer Group</a>
    <E4kTblCustomerGroupGrid 
        showModalMediumCustomerGroup={showModalMediumCustomerGroup} 
        handleCloseMediumCustomerGroup={handleCloseModalMediumCustomrGroup} />

    <br/>

    <a href="#" onClick={handleOpenModalMediumCountry}>Tbl Country</a>

    <E4kCountryGrid 
      showModalMediumCountry={showModalMediumCountry} 
      handleCloseMediumCountry={handleCloseModalMediumCountry} 
    
    />


        <br/>
        <a href="#" onClick={handleOpenModalMediumCurrency}>Tbl Currency</a>
        <E4kTblCurrencyGrid 
          showModalMediumCurrency={showModalMediumCurrency} 
          handleCloseMediumCurrency={handleCloseModalMediumCurrency} 
        />

      <br/>
      <a href="#" onClick={handleOpenModalMediumVatCodes}>Tbl Account Vatcodes</a>
      <E4kTblAccVatCodesGrid 
        showModalMediumVatCodes ={showModalMediumVatCodes} 
        handleCloseMediumVatCodes ={handleCloseModalMediumVatcode} 
      />

      <br/>
      <a href='#' onClick={handleOpenModalMediumPaymentterms}>Payment Terms</a>
      <E4kPaymentterms
        showModalMediumPaymentterms={showModalMediumPaymentterms}
        handleCloseMediumPaymentterms={handleCloseModalMediumPaymentterms}
      />

      <br/>
      <a href='#' onClick={handleOpenModalMediumBusRep}>Tbl Bus Rep</a>
      <E4kTblbusRepGrid
       showModalMediumBusRep={showModalMediumBusRep}
       handleCloseMediumBusRep={handleCloseModalMediumBusRep}
      
      />

     <br/>
     < a href='#' onClick={handleOpenModalMediumCustomerPriceProductRelateMatrix1}>test</a>
     <E4kTblCustomerPriceProductRelateMatrix1
         showModalMediumCustomerPriceProductMatrix= {showModalMediumCustomerPriceProductMatrix}
         handleCloseMediumCustomerPriceProductMatrix={handleCloseModalMediumCustomerPriceProductRelateMatrix1}
         />
         





    </div>
  )
}

export default page;