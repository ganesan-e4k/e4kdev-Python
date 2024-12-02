'use client'
import React from 'react'
import { useState } from 'react';


import E4kTblSupplierCategory1Grid from '../../master/supplierCategory1/E4kTblSupplierCategory1Grid';
import E4kSupplierCategory2 from '../../master/SupplierCategory2/E4kSupplierCategory2';
import E4kTblSupplierCategory3Grid from '../../master/SupplierCategory3/E4kTblSupplierCategory3Grid';
import E4kTblNominalAccountGrid from '../../master/nominalAccount/E4kTblNominalAccountGrid';
import E4kSupplierClassGrid from '../../master/SupplierClass/E4kSupplierClassGrid';
import E4kTblCustomerGroupGrid from '../../master/customerGroup/E4kTblCustomerGroupGrid'
import E4kCountryGrid from '../../master/customerCountry/E4kCountryGrid';
import E4kTblCurrencyGrid from '../../master/currency/E4kTblCurrencyGrid';
import E4kTblAccVatCodesGrid from '../../master/accountVatcode/E4kTblAccVatCodesGrid';
import E4kPaymentterms from '../../master/paymentterms/E4kPaymentterms';
import E4kTblbusRepGrid from '../../master/TblbusRep/E4kTblbusRepGrid';


const page = () => {

    const [showModalMediumSupplierCategory1, setShowModalMediumSupplierCategory1] = useState(false);
    const [showModalMediumSupplierCategory2, setShowModalMediumSupplierCategory2] = useState(false);
    const [showModalMediumSupplierCategory3, setShowModalMediumSupplierCategory3] = useState(false);
    const [showModalMediumNominalAccount, setShowModalMediumNominalAccount] = useState(false);
    const [showModalMediumSupplierClass, setShowModalMediumCustomerClass] = useState(false);
    const [showModalMediumCustomerGroup, setshowModalMediumCustomerGroup] = useState(false);
    const [showModalMediumCountry, setShowModalMediumCountry] = useState(false);
    const [showModalMediumCurrency, setShowModalMediumCurrency] = useState(false);
    const [showModalMediumCustomerSetvalues, setShowModalMediumCustomerSetvalues] = useState(false);
    const [ showModalMediumVatCodes , setShowModalMediumVatCodes] = useState(false);
    const [ showModalMediumPaymentterms, setShowModalMediumPaymentterms] = useState(false);
    const [ showModalMediumBusRep, setShowModalMediumBusRep] = useState(false);
 
 
    ////////////////// Open/Close Event for Customer Category1
    const handleOpenModalMediumCustomerCategory1 = () => {
        setShowModalMediumSupplierCategory1(true);
    };

    const handleCloseModalMedium = () => {
        setShowModalMediumSupplierCategory1(false);
    };
    

    ///////////////// Customer category2
    const handleOpenModalMediumSupplierCategory2 = () => {
        setShowModalMediumSupplierCategory2(true);
      };

    const handleCloseModalMediumCustomerCategory2 = () => {
    setShowModalMediumSupplierCategory2(false);
    };
 
    ///////////////////////// Customer category3
    const handleOpenModalMediumSuplierCategory3 = () => {
        setShowModalMediumSupplierCategory3(true);
      };
    
      const handleCloseModalMediumCustomerCategory3 = () => {
        setShowModalMediumSupplierCategory3(false);
      };
 
      //////////////////// customr customer class

      const handleOpenModalMediumSupplierClass = () => {
        setShowModalMediumCustomerClass(true);
      };
    
      const handleCloseModalMediumSupplierClass = () => {
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
 
    return (
    <div>
        <a href="#" onClick={handleOpenModalMediumCustomerCategory1}>Tbl Supplier Category 1</a>

        <E4kTblSupplierCategory1Grid 
            showModalMediumSupplierCategory1={showModalMediumSupplierCategory1} 
            handleCloseMediumSupplierCategory1={handleCloseModalMedium} 
        />

    <br/>
        <a href="#" onClick={handleOpenModalMediumSupplierCategory2}>Tbl Supplier Category 2</a>

        <E4kSupplierCategory2 
            showModalMediumSupplierCategory2={showModalMediumSupplierCategory2} 
            handleCloseMediumSupplierCategory2={handleCloseModalMediumCustomerCategory2} 
        />

    <br/>
    <a href="#" onClick={handleOpenModalMediumSuplierCategory3}>Tbl Supplier Category 3</a>

    <E4kTblSupplierCategory3Grid
        showModalMediumSupplierCategory3={showModalMediumSupplierCategory3}
        handleCloseMediumSupplierCategory3={handleCloseModalMediumCustomerCategory3}
      />

    <br/>
        <a href="#" onClick={handleOpenModalMediumNominalAccount}>Tbl Account Nominal</a>
        <E4kTblNominalAccountGrid
            showModalMediumNominalAccount={showModalMediumNominalAccount}
            handleCloseMediumNominalAccount={handleCloseModalMediumNominalAccount}
        />

    <br/>

    <a href="#" onClick={handleOpenModalMediumSupplierClass}>Tbl Supplier Class</a>
        <E4kSupplierClassGrid
            showModalMediumSupplierClass={showModalMediumSupplierClass}
            handleCloseMediumSupplierClass={handleCloseModalMediumSupplierClass}
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




    </div>
  )
}

export default page;