"use client";

import { useState,useRef, useEffect  } from 'react';
import { toast } from 'react-toastify';
import React from 'react';
import { DropDownList} from 'smart-webcomponents-react/dropdownlist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SwitchButton } from 'smart-webcomponents-react/switchbutton';
import { faWindowMaximize, faWindowRestore,faChain, faChainBroken } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'smart-webcomponents-react/input';
import { DateInput } from 'smart-webcomponents-react/dateinput';
import { TextArea } from 'smart-webcomponents-react/textarea';
import Draggable from 'react-draggable';
import { useSelector, useDispatch } from 'react-redux';
import {useGetNominalAccountsQuery} from '../../store/services/Customer/e4kTblNominalAccount';
import {useGetSupplierCategory1Query} from '../../store/services/Supplier/e4kTblsuppliercategory1';
import {useGetSupplierCategory2Query} from '../../store/services/Supplier/e4kTblsuppliercategory2';
import {useGetSupplierCategory3Query} from '../../store/services/Supplier/e4kTblsuppliercategory3';
import {useGetSupplierClassQuery} from '../../store/services/Supplier/e4ksupplierclassApi';
import{ useGetCountriesQuery} from '../../store/services/Customer/e4kTblCountry';
import {useGetVatCodesQuery} from '../../store/services/Customer/e4kTblVatcode';
import {useGetCurrenciesQuery} from '../../store/services/Customer/e4kTblCurrency';
import {useGetPaymentTermsListQuery} from '../../store/services/Customer/e4kTblbuspaymentterms';
import {useGetSupplierAccountQuery,useUpdateSupplierAccountMutation,useCreateSupplierAccountMutation} from '../../store/services/Supplier/e4kTblsupplieraccount';
import {useGetSupplierAddressTypesQuery,useCreateSupplierLogoMutation} from '../../store/services/Supplier/e4kTblsupplieraddresstypelist';
import { Grid } from 'smart-webcomponents-react/grid';
import {setSelectSupplierAddresstypes} from '../../store/slices/supplier/e4kselectedSupplieraddresstypes';
import {setSelectSupplierContacttypes} from '../../store/slices/supplier/e4kselectedsupplierContact';
import {useUpdateSupplierMutation,useCreateSupplierMutation,useGetSupplierListQuery,useGetSupplierQuery,useGetSupplierNotesQuery} from '../../store/services/Supplier/e4kTblSupplierlist';
import { NumberInput } from 'smart-webcomponents-react/numberinput';
import E4kSupplierParametesettingGrid from '../supplierrelatables/E4kSupplierParametesettingGrid';
import {setSelectedSupplier}from '../../store/slices/supplier/e4ksupplierSelectSlice'
import E4kTblSupplierPriceProductRelateMatrix from '../supplierrelatables/E4kTblSupplierPriceProductRelateMatrix';
import E4kTblSupplierCategory1Grid from '../../master/supplierCategory1/E4kTblSupplierCategory1Grid';
import E4kSupplierCategory2 from '../../master/SupplierCategory2/E4kSupplierCategory2';
import E4kTblSupplierCategory3Grid from '../../master/SupplierCategory3/E4kTblSupplierCategory3Grid';
import E4kSupplierClassGrid from '../../master/SupplierClass/E4kSupplierClassGrid';
import E4kTblNominalAccountGrid from '../../master/nominalAccount/E4kTblNominalAccountGrid';
import E4kTblCurrencyGrid from '../../master/currency/E4kTblCurrencyGrid';
import E4kTblbusRepGrid from '../../master/TblbusRep/E4kTblbusRepGrid';
import E4kPaymentterms from '../../master/paymentterms/E4kPaymentterms';
import E4kTblAccVatCodesGrid from '../../master/accountVatcode/E4kTblAccVatCodesGrid';
import E4kCountryGrid from '../../master/customerCountry/E4kCountryGrid';
import { BsChevronLeft,BsChevronRight } from 'react-icons/bs';
import Spinner from '../../customComponents/Spinner';
















const E4kSupplierUpdatePage = ({ showModalSupplier, handleCloseSupplier,businessID,companyID,productRowChange,productRowidSuccess,supplierTotalturnover }) => {
  const [showModalMediumSupplierPriceProductMatrix, setshowModalMediumSupplierPriceProductMatrix] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const selectedSupplier = useSelector(state => state.supplierSelect.selectedSupplier);
  console.log("GHDDDghd", selectedSupplier)
  const supplierCompanyid = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyid, setcompanyid] = useState(supplierCompanyid);
  const [updateSupplier] = useUpdateSupplierMutation()
  const [updatesupplierAccount] = useUpdateSupplierAccountMutation()
  const [AccountData, setAccountData] = useState([]);
  console.log("JHJHJHJHJHJHJHJHJHJHJHJHJHJHJH",AccountData )
  const dispatch = useDispatch();
  const businessid = selectedSupplier.BusinessID;
  const businessid1 = selectedSupplier.businessID;
  const businessid2 = selectedSupplier.businessid;
  console.log("HJHJgjhgd" , businessid,businessid1,businessid2)



  const [showModalMediumSupplierCategory1, setShowModalMediumSupplierCategory1] = useState(false);
  const [showModalMediumSupplierCategory2, setShowModalMediumSupplierCategory2] = useState(false);
  const [showModalMediumSupplierCategory3, setShowModalMediumSupplierCategory3] = useState(false);
  const [showModalMediumSupplierClass, setShowModalMediumCustomerClass] = useState(false);
  const [showModalMediumNominalAccount, setShowModalMediumNominalAccount] = useState(false);
  const [showModalMediumCountry, setShowModalMediumCountry] = useState(false);
  const [ showModalMediumVatCodes , setShowModalMediumVatCodes] = useState(false);
  const [showModalMediumCurrency, setShowModalMediumCurrency] = useState(false);
  // const [showModalMediumCustomerClass, setShowModalMediumCustomerClass] = useState(false);
  // const [showModalMediumGroup, setshowModalMediumGroup] = useState(false);
  const [showModalMediumBusRep, setShowModalMediumBusRep] = useState(false);
  const [ showModalMediumPaymentterms, setShowModalMediumPaymentterms] = useState(false);



  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////


  const [dataGridNominal, setDataGridNominal ] = useState([]);
  const [dataGridSupplierCategory1, setDataGridSupplierCategory1 ] = useState([]);
  const [dataGridSupplierCategory2, setDataGridSupplierCategory2 ] = useState([]);
  const [dataGridSupplierCategory3, setDataGridSupplierCategory3 ] = useState([]);
  const [dataGridSupplierClass, setDataGridSupplierClass ] = useState([]);
  const [GritCountry, setGritCountry] = useState([]);
  const [GritVatCode, setGritVatCode] = useState([]);
  const [GritCurrency, setGritCurrency] = useState([]);
  const [GritPaymentTerm, setPaymentdata] = useState([]);
  const [supplieraddresstypes,setsupplieraddresstypes] = useState([]);

  
  //////////////////////////////////////////////////////////////////////////////////// POPUP /////////////////////////
  
 
  
 
  const skipQueryaddresstypes = !companyID && !businessID ;
  const AccountQuery = !companyID && !businessID;



  const { data:Nominaldata, error:Nominalerror, isLoading:NominalisLoading, isError:NominalisError } = useGetNominalAccountsQuery(companyid);
  const {data: suppliercategory1data, error:suppliercategory1error, isLoading:suppliercategory1isLoading, isError:suppliercategory1isError } =useGetSupplierCategory1Query(companyid);  
  const {data: suppliercategory2data, error:suppliercategory2error, isLoading:suppliercategory2isLoading , isError :suppliercategory2dataError} = useGetSupplierCategory2Query(companyid);
  const {data: suppliercategory3data, error:suppliercategory3error, isLoading:suppliercategory3dataisLoading, isError :suppliercategory3dataisError} = useGetSupplierCategory3Query(companyid);
  const {data: supplierclassdata, error:supplierclassdataerror, isLoading:supplierclassisLoading, isError :supplierclassisError}=useGetSupplierClassQuery(companyid);
  const { data: Countrydata, error: Countryerror, isLoading: CountryisLoading, isError: CountryisError } = useGetCountriesQuery(companyid);
  const { data: VatCodedata, error: VatCodeerror, isLoading: VatCodeisLoading, isError: VatCodeisError } = useGetVatCodesQuery(companyid);
  const { data: Currencydata, error: Currencyerror, isLoading: CurrencyisLoading, isError: CurrencyisError } = useGetCurrenciesQuery(companyid);
  const {data : Paymentdata , error: Paymenterror, isLoading: PaymentisLoading, isError: PaymentError} = useGetPaymentTermsListQuery(companyid);
  const { data : SupplierAccountData }=useGetSupplierAccountQuery({companyid: companyID , businessid: businessID }, {skip : AccountQuery})
  const {data: SupplierAddresstypesData, refetch:supplieraddresstypesrefetch} =useGetSupplierAddressTypesQuery({companyid: companyID  , businessid: businessID }, {
    skip: skipQueryaddresstypes, // Use the skip condition here
  })
  




  ////////////////////////////////////////////////

  const suppliercategory3ref = useRef(null);
  const suppliercountryref = useRef(null);
  const supplierclassref = useRef(null);
  const suppliernominaref= useRef(null);
  const suppliercategory2ref = useRef(null);
  const suppliercategory1ref = useRef(null);
  const supplierStopref = useRef(null);
  const supplierextractref = useRef(null);
  const supplierliveref = useRef(null);
  const suppliernameref = useRef(null);
  const supplierbusinessidref= useRef(null);
  const vatref = useRef(null);
  const suppliervatnoref = useRef(null);
  const vatcosderef = useRef(null);
  const suppliervatcurrencyref  = useRef(null);
  const bankref =useRef(null);
  const acref = useRef(null);
  const sortref = useRef(null);
  const acnumberref = useRef(null);
  const supPaymentRef = useRef(null);   
  const supplierRef = useRef(null);
  const creditLimitref = useRef(null);
  const dateoprnref = useRef(null);
  const dateusedref = useRef(null);
  const noteref = useRef(null);
  const SupplierLogoImageRef = useRef(null);




 




  useEffect(()=>{
    if(SupplierAccountData){
      const accountdata = SupplierAccountData.E4kTblsupplieraccount.map( (account) =>{
        return {
          bankAccountName: account.bankAccountName ?? '',
          bankAccountNum: account.bankAccountNum ?? '',
          bankSortCode: account.bankSortCode?? '',
          bankName: account.bankName ?? '',
          creditLimit: account.creditLimit ?? '',
          dateOpened: account.dateOpened ?? '',
          dateUsed: account.dateUsed ?? '',
          discount: account.discount ?? '',
          vatflag: account.vatflag ?? '',
          vatno: account.vatno ?? '',
          vatcodeDescription: account.vatcode?.description ?? '',
          vatcodeSagecode: account.vatcode?.sagecode?? '',
          paymentTermsDescription: account.paymenttermsid?.description ?? '',
          paymentTermsId: account.paymenttermsid?.paymenttermsid ?? '',
          nominalCodeNomcode: account.nominalCode?.nomcode ?? '',
          CurrencyCode: account.currencyCode?.currencyName?? '',
          // nominalCodeDescription: account.nominalCode?.nomdescription

        }

      })
      console.log("Accountdata",accountdata );
      setAccountData(accountdata)
      // dispatch(setSelectedSupplierAccount(accountdata))
    }
  },[SupplierAccountData]);



 

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  
  };
  
  
  const dateUsed = AccountData.length > 0 ? formatDate(AccountData[0].dateUsed) : '';
  
  const dateOpened = AccountData.length > 0 ? formatDate(AccountData[0].dateOpened) : '';





  useEffect(() => {
		if (SupplierAddresstypesData) {
      console.log("JKHHHHHHHH",SupplierAddresstypesData )
		  transformDataaddresstypes(SupplierAddresstypesData)
		  
		}
		
	  }, [SupplierAddresstypesData]);


  useEffect(() => {
    if (Nominaldata) {
        transformData();
    }
  }, [NominalisLoading, Nominalerror, NominalisError,Nominaldata]);

  useEffect(() => {
    if(suppliercategory1data){
      transformData();
    }
  },[suppliercategory1data, suppliercategory1error,suppliercategory1isLoading,suppliercategory1isError]);

  useEffect(() => {
    if(suppliercategory2data){
      transformData();
    }
  },[suppliercategory2data, suppliercategory2error, suppliercategory2isLoading, suppliercategory2dataError]);

  useEffect(()=>{
    if(suppliercategory3data){
      transformData();
      console.log("UTUITTcccc",suppliercategory3data)
    }
  },[suppliercategory3data,suppliercategory3error,suppliercategory3dataisLoading,suppliercategory3dataisError]);



  useEffect(()=>{
    if(supplierclassdata){
      transformData();
      console.log("UTUITTcccc",supplierclassdata)
    }
  },[supplierclassdata,supplierclassisError,supplierclassisLoading,supplierclassdataerror]);

  useEffect(() => {
    if (Countrydata) {
      transformData();
    }
  }, [CountryisLoading, CountryisError,Countryerror, Countrydata]);

  useEffect(() => {
    if (VatCodedata) {
      transformData();
    }
  }, [VatCodeisLoading, VatCodeerror, VatCodedata,VatCodeisError]);

  useEffect (() => {
    if (Currencydata) {
      transformData();
    }
  }, [CurrencyisLoading, CurrencyisError, Currencyerror, CurrencyisError, Currencydata]);

  useEffect (()=>{
    if (Paymentdata) {
      transformData();
    }
  },[PaymentError,Paymentdata]);




  const transformData = ()=>{
    if (!Nominaldata) return [];
    const datagrid = Nominaldata.E4kTblnominallist.map(account => ({
        nomcode: account.nomcode.toString(),
        companyid: account.companyid.companyid,
        nomdescription: account.nomdescription,
        live: account.live,
        nombs: account.nombs,
        nomdc: account.nomdc,
        nompl: account.nompl,
    }))
    console.log("DataGridNominal: ", datagrid);
    setDataGridNominal(datagrid);

    if(!suppliercategory1data) return [];
      const datagridcategory1 = suppliercategory1data.E4kTblsuppliercategory1.map(suppliercategory1=>({
        category1id : suppliercategory1.category1id.toString(),
        category1name: suppliercategory1.category1name
      }))
      console.log("DataGridSupplierCategory1: ", datagridcategory1);
      setDataGridSupplierCategory1(datagridcategory1);

    if(!suppliercategory2data) return [];
      const datagridcategory2 = suppliercategory2data.E4kTblsuppliercategory2.map(suppliercategory2=>({
        category2id : suppliercategory2.category2id.toString(),
        category2name: suppliercategory2.category2name,
      }))
      console.log("DataGridSupplierCategory2: ", datagridcategory2);
      setDataGridSupplierCategory2(datagridcategory2);


    if(!suppliercategory3data) return [];
      const datagridcategory3 = suppliercategory3data.E4kTblsuppliercategory3.map(suppliercategory3=>({
        category3id : suppliercategory3.category3id.toString(),
        category3name: suppliercategory3.category3name,
      }))
      console.log("DataGridSupplierCategory3: ", datagridcategory3);
      setDataGridSupplierCategory3(datagridcategory3);

    if(!supplierclassdata) return [];
      const  suppliercalss = supplierclassdata.E4kTblsupplierclass.map(supplierclass=>({ 
        classid : supplierclass.classid.toString(),
        className: supplierclass.className,
       }))
       console.log("DataGridSupplierClass: ", suppliercalss);  
       setDataGridSupplierClass(suppliercalss)

    if(!Countrydata) return [];
      const Country = Countrydata.E4kCountry.map(Country => ({
        countryid: parseInt(Country.countryid, 10),
        companyid: Country.companyid.companyid,
        country: Country.country,
        groupid : Country.groupid,
        groupName: Country.member ? Country.member.groupName : null,
    }));
    console.log("GritCountry: ", Country);
    setGritCountry(Country);

    if(!VatCodedata) return [];
    const VatCode = VatCodedata.E4kTblaccvatcodes.map((vatCode) => ({
      companyid: vatCode.companyid.companyid,
      description: vatCode.description,
      sagecode: vatCode.sagecode,
      vatcode: vatCode.vatcode,
      vatpercent: vatCode.vatpercent,
    }));
    console.log("GritVatCode: ", VatCode);
    setGritVatCode(VatCode);

    
    if(!Currencydata) return [];
      const currency = Currencydata.E4kCurrency.map(currency => ({
        currencyCode: parseInt(currency.currencyCode, 10),
        companyid: currency.companyid.companyid, // This line will only execute if data and companyid are not null
        currencyName: currency.currencyName,
        currencyExchangeRate: parseFloat(currency.currencyExchangeRate),
        currencySymbol: currency.currencySymbol,
        isocode: currency.isocode,
    }));
    console.log("GritCurrency: ", currency);
    setGritCurrency(currency);

    if(!Paymentdata) return [];
    const Payment = Paymentdata.E4kTblbuspaymenttermslist.map(term => ({
      paymenttermsid: term.paymenttermsid,
      description: term.description,
      days: term.days,
    }));
    console.log("GritPayment: ", Payment);
    setPaymentdata(Payment);




      

    

  
  }
  /////////////////////////////////////////////////////                    


  const [inputvalue, setinputvalue] = useState('');
  const [Category1,setCategory1]= useState('')
  const [vatcode,setvatcode]= useState('')
  const [DefaultCountry, setCountry]= useState('')
  const [Class, setClass]= useState('')
  const [Category2, setDataGridCategory2]= useState('');
  const [Category3, setDataGridCategory3]= useState('');
  const [NominalCode, setNom]= useState('');
  const [DefaultCurrency, setCurrency]= useState('');
  const [Payment, setPayment]= useState('');
  const [Live, setlive]= useState( );
  const [Extract, setExtract]= useState( );
  const [Stop, setStop]= useState( );
  const [DateUsed,setDateUsed] = useState('');
  const [DateOpened, setDateOpen] = useState('');
  const [Discount, setDiscountData]= useState('');
  const [creditlimit, setcreditlimit] = useState('');
  const [Bankname, setBankname] = useState('');
  const [Acname, setAcname] = useState('');
  const [Sortcode, setSortcode] = useState('');
  const [Acnumber,setAcnumber] = useState('');
  const [Vatno,setVatno] =useState('');
  const [Vatpayable,setVatpayable] = useState();



  useEffect(()=>{
    if(selectedSupplier&&selectedSupplier.name || selectedSupplier.name === ""){
      setinputvalue(selectedSupplier.name)
    }
  },[selectedSupplier]);


  useEffect(()=>{
    if(selectedSupplier&&selectedSupplier.Category1Name || selectedSupplier.Category1Name === ""){
      setCategory1(selectedSupplier.Category1Name)
    }
  },[selectedSupplier]);


  useEffect(()=>{
    if(selectedSupplier&&selectedSupplier.Category2Name || selectedSupplier.Category2Name === ""){
      setDataGridCategory2(selectedSupplier.Category2Name)
    }
  },[selectedSupplier]);


  useEffect(()=>{
    if(selectedSupplier&&selectedSupplier.Category3Name || selectedSupplier.Category3Name === ""){
      setDataGridCategory3(selectedSupplier.Category3Name)
    }
  },[selectedSupplier]);

  useEffect(()=>{
    if(selectedSupplier&&selectedSupplier.NominalDescription || selectedSupplier.NominalDescription === ""){
      setNom(selectedSupplier.NominalDescription)
    }
  },[selectedSupplier]);

  useEffect(()=>{
    if(selectedSupplier&&selectedSupplier.ClassName || selectedSupplier.ClassName === ""){
      setClass(selectedSupplier.ClassName)
    }
  },[selectedSupplier]);

  useEffect(()=>{
    if(selectedSupplier&&selectedSupplier.isLive || selectedSupplier.isLive === false){
      setlive(selectedSupplier.isLive)
    }
  },[selectedSupplier]);

  useEffect(()=>{
    if(selectedSupplier&&selectedSupplier.isExtract || selectedSupplier.isExtract === false){
      setExtract(selectedSupplier.isExtract)
    }
  },[selectedSupplier]);

  useEffect(()=>{
    if(selectedSupplier&&selectedSupplier.isStop || selectedSupplier.isStop === false){
      setStop(selectedSupplier.isStop)
    }
  },[selectedSupplier]);

  useEffect(()=>{
    if(selectedSupplier&&selectedSupplier.Country || selectedSupplier.Country === ""){
      setCountry(selectedSupplier.Country)
    }
  },[selectedSupplier]);


  useEffect(()=>{
    if(dateUsed){
      setDateUsed(dateUsed)
    }
    else{
      setDateUsed("")
    }
  },[dateUsed]);

  useEffect(()=>{
    if(dateOpened){
      setDateOpen(dateOpened)
    }
    else{
      setDateOpen("")
    }
  },[dateOpened]);


  useEffect(()=>{
    if(AccountData.length > 0 ? AccountData[0].vatcodeDescription : ''){
      setvatcode(AccountData.length > 0 ? AccountData[0].vatcodeDescription : '')
    }
    else{
      setvatcode("")
    }
  },[AccountData])




  useEffect(()=>{
    if(AccountData&&AccountData.length > 0 ? AccountData[0].discount : ''){
      setDiscountData(AccountData.length > 0 ? AccountData[0].discount : '')
    }
    else{
      setDiscountData("")
    }
  },[AccountData]);

  useEffect(()=>{
    if(AccountData&&AccountData.length > 0 ? AccountData[0].creditLimit : ''){
      setcreditlimit(AccountData.length > 0 ? AccountData[0].creditLimit : '')
    }
    else{
      setcreditlimit("")
    }
  },[AccountData]);


  useEffect(()=>{
    if(AccountData&&AccountData.length > 0 ? AccountData[0].bankName : ''){
      setBankname(AccountData.length > 0 ? AccountData[0].bankName : '')
    }
    else{
      setBankname("")
    }
  },[AccountData]);


  useEffect(()=>{
    if(AccountData&&AccountData.length > 0 ? AccountData[0].bankAccountName : ''){
      setAcname(AccountData.length > 0 ? AccountData[0].bankAccountName : '')
    }
    else{
      setAcname("")
    }

  },[AccountData]);


  useEffect(()=>{
    if(AccountData&&AccountData.length > 0 ? AccountData[0].bankSortCode : ''){
      setSortcode(AccountData.length > 0 ? AccountData[0].bankSortCode : '')
    }
    else{
      setSortcode("")
    }
  },[AccountData]);



  useEffect(()=>{
    if(AccountData&&AccountData.length > 0 ? AccountData[0].bankAccountNum : ''){
      setAcnumber(AccountData.length > 0 ? AccountData[0].bankAccountNum : '')
    }
    else{
      setAcnumber("")
    }
  },[AccountData]);





  useEffect(()=>{
    if(AccountData&&AccountData.length > 0 ? AccountData[0].vatno : ''){
      setVatno(AccountData.length > 0 ? AccountData[0].vatno : '')
    }
    else{
      setVatno("")
    }
  },[AccountData]);



  useEffect(()=>{
    if(AccountData&&AccountData.length>0?AccountData[0].vatflag === "N"? false :true : false ){
      setVatpayable(AccountData.length>0?AccountData[0].vatflag === "N"? false :true : false)
    
    }
    else{
      setVatpayable(false)
    }
  },[AccountData]);


  useEffect(()=>{
    if(AccountData&&AccountData.length > 0 ? AccountData[0].paymentTermsDescription : ''){
      setPayment(AccountData.length > 0 ? AccountData[0].paymentTermsDescription : '')
    }
    else{
      setPayment("")
    }
  },[AccountData]);


  useEffect(()=>{
    if(AccountData&&AccountData.length > 0 ? AccountData[0].CurrencyCode : ''){
      setCurrency(AccountData.length > 0 ? AccountData[0].CurrencyCode : '')
    }
    else{
      setCurrency("")
    }
  },[AccountData]);










  


  

 const handleinputchange = (event) =>{
   console.log("JHJHJHJHJHJHJHJHJHG", event.target)
   setinputvalue(event.target.value);
 }

 const handlecategory1change = (event) =>{
   console.log("TTTTTTTTTTTTTTT", event.detail.value)
   setCategory1(event.detail.value);
 }

 const handlechangevatcode = (event) =>{
   setvatcode(event.detail.value);
 };

 const handleDefaultCountryChange = (event) =>{
  setCountry(event.detail.value);
 };

 const handleClassChange = (event) =>{
  setClass(event.detail.value);
 };


 const handldecategory2change = (event) =>{
  setDataGridCategory2(event.detail.value)
 };


 const handlecategory3change = (event) =>{
  setDataGridCategory3(event.detail.value)
 };

 const handleNominalCodeChange = (event) =>{
  setNom(event.detail.value);
 };


 const handleDefaultCurrencyChange = (event) =>{
  
  setCurrency(event.detail.value);
 };

 const handlePaymentChange = (event) =>{
  setPayment(event.detail.value);
 };

 const handlechangelive = (event) =>{
  setlive(event.detail.value);
 };


 const handlestopchange = (event) =>{
  setStop(event.detail.value);
 };

  const handleextractchange = (event) =>{
  setExtract(event.detail.value);
 };

 const handlechangedateUsed = (event) =>{
  setDateUsed(event.detail.value);
 };

  const handlechangedateopened = (event) =>{
    setDateOpen(event.detail.value);
 };

 const handleChangeDiscount = (event) =>{
  setDiscountData(event.detail.value);
 };

 const handlechangecreditlimit = (event) =>{
  setcreditlimit(event.detail.value);
 };

 const handlechangebankname = (event) =>{
  setBankname(event.target.value);
 };

 const handlechangeacname = (event) =>{
  setAcname(event.target.value);
 };

 const handlechangesortcode = (event) =>{
  setSortcode(event.target.value);
 };

 const handlechangeacnumber = (event) =>{
  setAcnumber(event.target.value);
 };

 const handlechangevatno = (event) =>{
  setVatno(event.target.value);
 };

 const handlechangevatpayable = (event) =>{
  setVatpayable(event.detail.value);
 };



 const handleImageChangelogo = (event) =>{
  console.log("LOGO LOGO LOGO LOGO LOGO", event.targe)
  // setLogo(event.target.files[0]);
 }






 



  
  const transformDataaddresstypes = (SupplierAddresstypesData) => {
    if (!SupplierAddresstypesData || !SupplierAddresstypesData.E4kSupplieraddresscounts) return;

    const parsedData = SupplierAddresstypesData.E4kSupplieraddresscounts.map(itemStr => {
       
        const item = JSON.parse(itemStr);
        console.log("#################################", item);
        
        
        const {companyId,addressTypeId, addressCount, description, ctCount } = item;

        console.log("data cefghufjfhdf",{companyId,addressTypeId, addressCount, description, ctCount } )
        
        return {
            companyId,
            addressTypeId,
            description,
            totalAddresses: parseInt(addressCount, 10),
            totalcount: parseInt(ctCount, 10), 
        };
    });

    console.log("++++++++++++++++++++++++++++++++++", parsedData);
    setsupplieraddresstypes(parsedData);
  
};

const handleCellClickSupplieraddresstpes = (event) => {
  //event.preventDefault(); 
  const clickedDataField = event.detail.cell.column.dataField;
  const addresstypeid = String(event.detail.cell.row.data.addressTypeId);
  const adresstype = String(event.detail.cell.row.data.description);
  const businessid = String(event.detail.cell.row.data.businessid);
  const companyid = String(event.detail.cell.row.data.companyId);
 
  if (clickedDataField === 'totalAddresses') {

    dispatch(setSelectSupplierAddresstypes({companyid :companyid, businessid: businessID , addresstype: adresstype, addresstypeid: addresstypeid}));
   
  }

  if (clickedDataField === 'totalcount') {

    dispatch(setSelectSupplierContacttypes({companyid :companyid, businessid: businessID , addresstype: adresstype, addresstypeid: addresstypeid}))
   
  }
};




const dataSourceSettings = {
  dataFields: [
    'businessid: string', 
    'companyId: string', 
    'addressTypeId: string', 
    'description: string',
    'totalAddresses: number',
    'totalcount: number',
  ],
};

const selection = {
  enabled: true,
  mode: 'extended',
  allowCellSelection: true,
};

const header = {
  visible: true,
  buttons: ['filter', 'sort', 'search'],
};

const appearance = {
  alternationCount: 2,
  showRowHeader: true,
};

const editing = {
  enabled: true,
  addNewRow: {
    visible: true,
    position: 'near',
  },
  commandColumn: {
    visible: true,
    displayMode: 'icon',
    dataSource: {
      'commandColumnDelete': { visible: false },
      'commandColumnEdit': { visible: true },
      'commandColumnCustom': { icon: 'fa fa-trash', command: 'commandColumnCustomCommand1', visible: true, label: 'Delete' },
    },
  },
};

const columns = [
  { label: 'Business ID', dataField: 'businessid', visible: false },  
  { label: 'Companyid', dataField: 'companyId', visible: false },
  { label: 'Address Type ID', dataField: 'addressTypeId', visible: false }, 
  { label: 'Description', dataField: 'description' },
  { label: 'Total Addresses', dataField: 'totalAddresses' },
  { label: 'Total Contact', dataField: 'totalcount' },
]; 
/////////////////////////////////////  create ////////////////////]



////////////////////////////////////////update  function supplier  ///////////////////////////


const handlesupplierupdate = async () => {

  const variables={
    businessid: String(businessID), 
    companyid: String(companyID),
    category1id: 
      parseInt(dataGridSupplierCategory1.find(
        category => category.category1name === suppliercategory1ref.current?.value?.[0]?.value
      )?.category1id ?? 0), 
    category2id : parseInt(dataGridSupplierCategory2.find(
      category => category.category2name === suppliercategory2ref.current?.value?.[0]?.value
    )?.category2id ?? 0),
    category3id : parseInt(dataGridSupplierCategory3.find(
      category => category.category3name === suppliercategory3ref.current?.value?.[0]?.value
    )?.category3id ?? 0),
    classid : parseInt(dataGridSupplierClass.find(
      classs => classs.className === supplierclassref.current?.value?.[0]?.value
    )?.classid ?? 0),
    countryid : parseInt(GritCountry.find(
      country => country.country === suppliercountryref.current?.value?.[0]?.value
    )?.countryid ?? 0),
    defaultNominal: parseInt(dataGridNominal.find(
      nominal => nominal.nomdescription === suppliernominaref.current?.value?.[0]?.value
    ) ?.nomcode?? 0),
    isextract: supplierextractref.current?.checked,
    islive : supplierliveref.current?.checked,
    isstop : supplierStopref.current?.checked,
    name : suppliernameref.current?.value || '',
    bankAccountName: String(bankref.current?.value || ''),
    bankAccountNum: parseInt(acnumberref.current?.value || '0', 10) || 0, // Fallback to 0
    bankName: String(acref.current?.value || ''),
    bankSortCode: sortref.current?.value || '',
    creditLimit: parseFloat(creditLimitref.current?.value || '0') || 0, // Fallback to 0
    discount: parseInt(supplierRef.current?.value || '0', 10) || 0,
    nominalCode: String(dataGridNominal.find(
      nominal => nominal.nomdescription === suppliernominaref.current?.value?.[0]?.value
    ) ?.nomcode?? 0),
    currencyCode: parseInt(GritCurrency.find(
      currency => currency.currencyName === suppliervatcurrencyref.current?.value?.[0]?.value
    )?.currencyCode ?? 0, 10), // Default to 0
    paymenttermsid: String(GritPaymentTerm.find(
      term => term.description === supPaymentRef.current?.value?.[0]?.value
    )?.paymenttermsid ?? ''), // Default to empty string
    vatcode: parseInt(GritVatCode.find(
      vat => vat.description === vatcosderef.current?.value?.[0]?.value
    )?.vatcode ?? 0, 10), // Default to 0
    vatflag: vatref.current?.checked ? 'Y' : 'N',
    vatno: suppliervatnoref.current?.value || '',
    value :SupplierLogoImageRef.current?.value || '',
    dateOpened : dateoprnref.current?.value || '',
    dateUsed : dateusedref.current?.value || '',
   
  }
  dispatch(setSelectedSupplier({
    CompanyID: selectedSupplier.CompanyID,
    BusinessID: selectedSupplier.BusinessID,
    name:  suppliernameref.current.value ? suppliernameref.current ?.value : '',
    Category1Name: suppliercategory1ref.current.value ? suppliercategory1ref.current?.value[0].value : '',
    Category2Name: suppliercategory2ref.current.value ? suppliercategory2ref.current?.value[0].value : '',
    Category3Name: suppliercategory3ref.current.value ? suppliercategory3ref.current?.value[0].value : '',
    ClassName: supplierclassref.current.value ? supplierclassref.current?.value[0].value : '',
    Country: suppliercountryref.current.value ? suppliercountryref.current?.value[0].value : '',
    NominalDescription: suppliernominaref.current.value ? suppliernominaref.current?.value[0].value : '',
    // value : SupplierLogoImageRef.current?.value ? SupplierLogoImageRef.current?.value: '',
    isLive: supplierliveref.current.checked,
    isExtract: supplierextractref.current.checked, 
    isStop: supplierStopref.current.checked, 
    rowid: selectedSupplier.rowid,
  

    
}));
  


   








  // if(variables){
    try {
      const result = await updateSupplier(variables).unwrap();
  
      if (result.E4kTblsupplierUpdate.success === true) {
        toast.success('Supplier Updated Successfully', { position: 'top-center' ,
          hideProgressBar: true,
          autoClose: 5000,
        });
        // supplierDataRefetch();
        // supplierrefetch()
      } else {
        toast.error('Supplier Update Failed: ' + result.error, 
          { position: 'top-center',
            hideProgressBar: true,
            autoClose: 5000,
           });
      }
    } catch (error) {
      toast.error('Supplier Update Failed: ' + error.message, { position: 'top-center',
        hideProgressBar: true,
        autoClose: 5000,
       });
    }
  

  // }
  // if(account){
    try {
      const result = await updatesupplierAccount(variables).unwrap();
  
      if (result.E4kTblsupplieraccountupdate.success === true) {
        toast.success('Supplier Account Updated Successfully', { position: 'top-center',
          hideProgressBar: true,
          autoClose: 5000,
         });
        // supplierrefetch();
      } else {
        toast.error('Supplier Account  Update Failed: ' + result.E4kTblsupplieraccountupdate.error, { position: 'top-center',
          hideProgressBar: true,
          autoClose: 5000,
         });
      }
    } catch (error) {
      toast.error('Supplier Account  Update Failed: ' + error.message, { position: 'top-center',
        hideProgressBar: true,
        autoClose: 5000,
  
       });
    }
    

  // }
  
  

  

};




const handlesaveSupplier = async () =>{
  await handlesupplierupdate();

  if (imageSrc) {
    const base64String = imageSrc.split(',')[1]; 
    await uploadImage(base64String); 
    
}

}



  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // const modalDialogclassName = isMaximized ? 'modal-dialog modal-fullscreen' : 'modal-dialog large-popup';
  const modalDialogclassName = isMaximized ? 'modal-dialog large-popup' : 'modal-dialog modal-fullscreen';


  const [isColumn2Visible, setIsColumn2Visible] = useState(true);

  const handleToggle = () => {
    setIsColumn2Visible(!isColumn2Visible);
  };  

  const handleCloseSupplieraddressupdate = () => {
    setshowModalSupplieraddressupdate(false);
    
  };

  const handleCloseSupplierAddress=()=>{
    handleCloseSupplier();
    // supplierrefetch();

  }



///////////////////////////////////////////////////////////////////////////////////////////////////

const handleImageClick = () => {

  setShowUploader(true);
};


const handleUploaderClose = () => {
  setShowUploader(false);
 
};


const [createSupplierLogo, { isLoadingimage, imageerror, data }] = useCreateSupplierLogoMutation(); 
const [imageSrc, setImageSrc] = useState('../../assets/images/user.png');


useEffect(()=>{
  if(selectedSupplier&& selectedSupplier.value){
    setImageSrc(selectedSupplier.value);
  }
},[selectedSupplier]);


const handleImageChange = async (e) => {
  // e.preventDefault(); // Prevent the form from submitting
  console.log('defaultPrevented:', e.defaultPrevented);
   const event = e
   console.log("FJJJJJJH" ,event);
  const file = e.target.files[0];
  if(file.size >300 * 1024){
    toast.error("File size must be less than 300 KB.", { position: 'top-center',
      hideProgressBar: true,
      autoClose: 5000,
    });
    return;
  }
 
  if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
          const base64String = event.target.result.split(',')[1]; // Get the base64 string
          setImageSrc(event.target.result); // Set image preview

          // Dispatch the image data to the store (if needed)
          let image = { image: base64String, success: true };
          // dispatch(setSelectCustomerUploadImage(image));
      };
      reader.readAsDataURL(file);
  }
};




// useEffect(() => {
//   if (initialImage) {
//       setImageSrc(initialImage);
//   }
// }, [initialImage]);


const uploadImage = async (base64String) => {
  try {
 
    const Result=  await createSupplierLogo({
        businessid: businessID,
        companyid:companyID,
        settingid: 'LOGO',
        value: base64String,
    });

    if(Result.data.E4kTblsupplierlogoCreate.success === true) {
      // toast.success("Logo uploaded successfully!", { position: 'top-center',
      //   hideProgressBar: true,
      //   autoClose: 5000,
   
      //  });
  
    }

     
  } catch (error) {
      // console.error("Error uploading logo:", error);
      // toast.error("Error uploading logo!", { position: 'top-center',
      //   hideProgressBar: true,
      //   autoClose: 5000,
      //  });
  }
};



const handleopenSupplierproductpricesetup = ()=>{
  setshowModalMediumSupplierPriceProductMatrix(true);
}

const handleCloseMediumCustomerPriceProductMatrix = ()=>{
  setshowModalMediumSupplierPriceProductMatrix(false);
}



const handleOpenModalMediumCustomerCategory1 = () => {
  setShowModalMediumSupplierCategory1(true);
};

const handleCloseModalMedium = () => {
  setShowModalMediumSupplierCategory1(false);
};

const handleOpenModalMediumSupplierCategory2 = () => {
  setShowModalMediumSupplierCategory2(true);
};

const handleCloseModalMediumCustomerCategory2 = () => {
setShowModalMediumSupplierCategory2(false);
};

const handleOpenModalMediumSuplierCategory3 = () => {
  setShowModalMediumSupplierCategory3(true);
};

const handleCloseModalMediumCustomerCategory3 = () => {
  setShowModalMediumSupplierCategory3(false);
};

const handleOpenModalMediumSupplierClass = () => {
  setShowModalMediumCustomerClass(true);
};

const handleCloseModalMediumSupplierClass = () => {
  setShowModalMediumCustomerClass(false);
};


const handleOpenModalMediumCountry = () => {
  setShowModalMediumCountry(true);
};

const handleCloseModalMedium7 = () => {
  setShowModalMediumCountry(false);
};
const handleOpenModalMediumCurrency = () => {
  setShowModalMediumCurrency(true);
};

const handleCloseModalMedium9 = () => {
  setShowModalMediumCurrency(false);
};


const handleOpenModalMediumVatCodes = () => {
  setShowModalMediumVatCodes(true);
};
const handleCloseModalMedium11 = () => {
  setShowModalMediumVatCodes(false);
};



const handleOpenModalMediumNominalAccount = () => {
  setShowModalMediumNominalAccount(true);
};
const handleCloseModalMedium4 = () => {
  setShowModalMediumNominalAccount(false);
};

const handleOpenModalMediumBusRep = () => {
  setShowModalMediumBusRep(true);
};

const handleCloseModalMediumBusRep = () => {
  setShowModalMediumBusRep(false);
};


const handleOpenModalMediumPaymentterms = () => {
  setShowModalMediumPaymentterms(true);
};

const handleCloseModalMediumPaymentterms = () => {
  setShowModalMediumPaymentterms(false);
};






/////////////////////// Supplier Navigation ******************************** ?????/////////////////////////////

const [isLoading1, setIsLoading] = useState(false);





  useEffect(() => {
  
    if (productRowidSuccess) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500); 
    }
  }, [productRowidSuccess]);




  const NextDateforSupplier = () => {

    const filterDataSource = selectedSupplier?.filterdatasource || []; 
  
    if (filterDataSource.length > 0) {
  
      const currentobj = filterDataSource.find(
        (obj) => obj.BusinessID === selectedSupplier.BusinessID
      );
  
  
      if (currentobj) {
        const currentindex = currentobj.index;
  
        const nextIndex = currentindex + 1;
  
        if (
          nextIndex === selectedSupplier.allSupplier &&
          currentindex === selectedSupplier.allSupplier - 1
        ) {
        } else {
          setIsLoading(true);
  
          const nextCustomerObj = filterDataSource[nextIndex];
        
          if (nextCustomerObj) {
            const clickdata = {
              CompanyID: nextCustomerObj.CompanyID,
              BusinessID: nextCustomerObj.BusinessID, 
              name: nextCustomerObj.name,    
              Category1Name: nextCustomerObj.Category1Name,
              Category2Name: nextCustomerObj.Category2Name,
              Category3Name: nextCustomerObj.Category3Name,
              ClassName: nextCustomerObj.ClassName,    
              Country: nextCustomerObj.Country,        
              NominalDescription: nextCustomerObj.NominalDescription, 
              isStop: nextCustomerObj.IsStop,    
              isLive: nextCustomerObj.IsLive,   
              isExtract: nextCustomerObj.IsExtract, 
              VATCode: nextCustomerObj.VATCode,
              VATDescription: nextCustomerObj.VATDescription,
              value: nextCustomerObj.value,
              allSupplier: filterDataSource.length,
              filterdatasource: filterDataSource,
              rowid:nextCustomerObj.id,
              index: nextIndex,
            };
           
            setTimeout(() => {
            
             dispatch(setSelectedSupplier(clickdata));
            }, 1000); 
    
              setTimeout(() => {
              
               setIsLoading(false);
              }, 3000); 
          } 
        }
      } 
    } 
    else {

      if (selectedSupplier.rowid !== null && selectedSupplier.rowid !== undefined && selectedSupplier.rowid >= 0) {
        if (selectedSupplier.allSupplier - 1 === selectedSupplier.rowid ) {
          
        } else {
          setIsLoading(true);

          const nextProductRowId = selectedSupplier.rowid + 1;
      
        
          
          setTimeout(() => {
            productRowChange(nextProductRowId);

          }, 1000); 
          
        
        }
      }
      
    }
  };
  












  ///////////////////////// previous Customer ///////////////////////////////////////




  const handlePreviousSupplierData = () => {
  

    if((selectedSupplier.filterdatasource).length > 0) {
      const currentobj = (selectedSupplier.filterdatasource).find(obj => obj.BusinessID === selectedSupplier.BusinessID);
      const currentindex = currentobj.index;
      
  
      const prevIndex = currentindex - 1;
     
      if (currentindex === 0 && prevIndex ===  - 1) {
        
      }  else {
        setIsLoading(true);
            const PreviousCustomer = selectedSupplier.filterdatasource[prevIndex]
            
  
            const clickdata = {
              CompanyID: PreviousCustomer.CompanyID,
              BusinessID: PreviousCustomer.BusinessID, 
              name: PreviousCustomer.name,    
              Category1Name: PreviousCustomer.Category1Name,
              Category2Name: PreviousCustomer.Category2Name,
              Category3Name: PreviousCustomer.Category3Name,
              ClassName: PreviousCustomer.ClassName,    
              Country: PreviousCustomer.Country,        
              NominalDescription: PreviousCustomer.NominalDescription, 
              isStop: PreviousCustomer.IsStop,    
              isLive: PreviousCustomer.IsLive,   
              isExtract: PreviousCustomer.IsExtract, 
              VATCode: PreviousCustomer.VATCode,
              VATDescription: PreviousCustomer.VATDescription,
              value: PreviousCustomer.value,
              allSupplier: PreviousCustomer.length,
              filterdatasource: selectedSupplier.filterdatasource,
              rowid:PreviousCustomer.id,
              index: prevIndex,
            };
          setTimeout(() => {
          
           dispatch(setSelectedSupplier(clickdata));
          }, 1000); 
         
  
            setTimeout(() => {
             
             setIsLoading(false);
            }, 2000); 
  
  
      }
  
    } else {
  
          if (selectedSupplier.rowid !== null && selectedSupplier.rowid !== undefined && selectedSupplier.rowid >= 0) {
  
          
            if (selectedSupplier.rowid === 0) {
              
            } else {
              
              setIsLoading(true);
  
      
              const prevProductRowId = selectedSupplier.rowid - 1;
  
          
              setTimeout(() => {
                productRowChange(prevProductRowId);
  
              }, 1000); 
  
            }
          }
        }
  };
  




  //////////////////// spinner style /////////////////


  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    zIndex: 1000,
  };









  

  return (
    <>
    <Draggable handle=".e4kmodal-header">
    <div className={`modal fade ${showModalSupplier ? 'in' : ''}`} style={{ display: showModalSupplier ? 'block' : 'none' }}>
      <div className={modalDialogclassName}>
        <div className="modal-content">
                  <div className="large-popup-topdiv e4kmodal-header">
                  {/* <!------ popup for customer -------> */}
                    <div className="breadcomb-area">
                      <div className="container-fluid remove-padding">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="breadcomb-list">
                              
                              <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className='popup-topbar-title'>
                                      {businessID}-{selectedSupplier.name}
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                  <div className="breadcomb-wp">

                                    <div className="breadcomb-ctn">
                                      {/* <span><a href="#" onClick={handlesupplierupdate} id="sa-success"> <i className="fa fa-check"></i> Save</a> | </span> */}
                                      <span><a href="#" onClick={handlesaveSupplier} id="sa-success"> <i className="fa fa-check"></i> Save</a> | </span>
                                      <span><a href="#" id="sa-warning"> <i className="fa fa-trash"></i> Delete</a> | </span>
                                      <span><a href="#" onClick={handleToggle}><FontAwesomeIcon icon={isColumn2Visible ? faChain : faChainBroken} /></a></span>
                                    </div>
                                  </div>
                                </div>
                              <div className='popup-top-rightdiv'>
                                      <button type="button" className="btn-link" onClick={handleToggle}>
                                      {/* {isMaximized ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> } */}
                                      {isMaximized ? <i className='fa fa-expand'></i> : <i className='fa fa-compress'></i> }

                                      </button>
                                      <button type="button" className="close" 
                                      onClick={() => handleCloseSupplierAddress()}
                                      >
                                      &times;
                                      </button>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Breadcomb area End-->		 */}


                </div>
                <div className="modal-body">

                  {/* <!-- customer name area Start--> */}
                  <div className="breadcomb-area">
                    <div className="container-fluid remove-padding">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grid-flex">
                          <div className="customer-newbold">
                         {selectedSupplier.BusinessID} - {selectedSupplier.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- customer name area End-->	 */}
                  
                  {/* <!-- Breadcomb area Start--> */}
                  <div className="breadcomb-area">
                    <div className="container-fluid remove-padding">

                          <div className="breadcomb-list subbreadcomb-list">
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="breadcomb-wp-two">
                                  <div className="">
                                    <span><a href="#supplierpricesetup" onClick={handleopenSupplierproductpricesetup}> <i className="fa fa-edit"></i> price setup </a> | </span>
                                    <span><a href="#"> <i className="fa fa-list"></i> Invoice list</a> | </span>
                                    <span><a href=""><i className="fa fa-list"></i> Order list</a> | </span>
                                    <span><a href=""><i className="fa fa-list-alt"></i> Statement</a> | </span>
                                    <span><a href=""><i className="fa fa-money"></i> Cash Receipts</a> | </span>
                                    <span><a href=""><i className="fa fa-file-text-o"></i> Memo</a> | </span>
                                    <span><a href=""><i className="fa fa-users"></i> Uniform</a> | </span>
                                    <span><a href=""><i className="fa fa-newspaper-o"></i> Template</a> | </span>
                                    <span><a href=""><i className="fa fa-exchange"></i> Export transaction</a> | </span>
                                    <span><a href=""><i className="fa fa-external-link"></i> Export Turnover</a></span>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>

                    </div>
                  </div>
                  {/* <!-- Breadcomb area End-->	 */}


                  <div className="container-fluid">
                    <div className="row">
                    <div id="columnpopup1" className={isColumn2Visible ? 'col-md-9' : 'col-md-12'}>
                      <div className='mainpopup-left'>
                      <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a data-toggle="collapse" href="#suppliercustomerID" aria-expanded="true" aria-controls="suppliercustomerID"><i className="plus-icon" aria-hidden="true"></i> Supplier ID  </a> 
                          </h4>
                            <div id="suppliercustomerID" className="collapse in" aria-expanded="true" >
                                <div className="panel-box-div">
                                  <div className="row">
                                
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>Supplier Id</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                          <Input
                                          id ='supplierid'
                                          ref={supplierbusinessidref}
                                          disabled ={selectedSupplier.BusinessID ? true:false }
                                          value={selectedSupplier.BusinessID }
                                          placeholder="Supplier Id"></Input>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a data-toggle="collapse" href="#suppliergeneral" aria-expanded="false" aria-controls="suppliergeneral"><i className="plus-icon" aria-hidden="true"></i> General  </a> 
                          </h4>
                            <div id="suppliergeneral" className="collapse" aria-expanded="false" >
                                <div className="panel-box-div">
                                  <div className="row">
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Supplier Name</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input 
                                          id = 'supplierdescription'
                                          ref={suppliernameref}
                                          // value={selectedSupplier.name || ''}
                                          value={inputvalue}
                                          onChange={handleinputchange}
                                          placeholder="Supplier Name"
                                          ></Input>
                                          </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>Live</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                         
                                           <SwitchButton
                                           id ='supplierlive'
                                           ref={supplierliveref}
                                           rightToLeft
                                           checked={Live}
                                           onChange={handlechangelive}
                                         
                                           />

                                        </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Extract</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                            {/* <DateInput format="dd/mm/yyyy" placeholder="Date Used"></DateInput>
                                             */}
                                             <SwitchButton
                                             id='supplierextract'
                                             ref={supplierextractref}
                                             rightToLeft
                                             checked={Extract}
                                             onChange={handleextractchange}
                                         
                                             />
                                          </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Stop</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          {/* <Input placeholder="Analysis Code"></Input> */}
                                          <SwitchButton
                                          id='suppliestop'
                                          ref={supplierStopref}
                                          checked={Stop}
                                          rightToLeft
                                          onChange={handlestopchange}
                                       
                                          />

                                          </div>
                                      </div> 

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>category1</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                           <div className="form-group master-option">
                                          {/* <Input placeholder="Factorial No"></Input> */}
                                          <DropDownList
                                          id='suppliercategory1'
                                          ref={suppliercategory1ref}
                                          // selectedIndexes={[0]} 
                                          filterable 
                                          placeholder="Select category"
                                          dataSource={dataGridSupplierCategory1.map(cat=>(cat.category1name))}
                                          // value={selectedSupplier.Category1Name}
                                          value={Category1}
                                          onChange={handlecategory1change}
                                          />
                                          <span onClick={handleOpenModalMediumCustomerCategory1} className="master-option-span">...</span>

                                          </div>
                                      </div> 

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>category2</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                      <div className="form-group master-option">
                                          {/* <Input placeholder="Insurance No"></Input> */}
                                          <DropDownList
                                          id='suppliercategory2'
                                          ref={suppliercategory2ref}
                                          // selectedIndexes={[0]} 
                                          filterable 
                                          placeholder="Select category"
                                          dataSource={dataGridSupplierCategory2.map(cat2=>(cat2.category2name))}
                                          // value={selectedSupplier.Category2Name}
                                          value ={Category2}
                                          onChange={handldecategory2change}

                                          />
                                          <span onClick={handleOpenModalMediumSupplierCategory2} className="master-option-span">...</span>

                                          </div>
                                      </div> 
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>category3</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          {/* <div className="form-group"> */}
                                          <div className="form-group master-option">

                                          {/* <Input placeholder="Insurance No"></Input> */}
                                          <DropDownList
                                          id='suppliercategory3'
                                          ref={suppliercategory3ref}
                                          // selectedIndexes={[0]} 
                                          filterable 
                                          placeholder="Select category"
                                          dataSource={dataGridSupplierCategory3.map(cat3=>(cat3.category3name))}
                                          value={Category3}
                                          onChange={handlecategory3change}
                                          />
                                          <span onClick={handleOpenModalMediumSuplierCategory3} className="master-option-span">...</span>

                                          </div>
                                      </div> 


                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Nominal Code</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                                            {/* <Input placeholder="Nominal Code"></Input> */}
                                          <DropDownList 
                                          id="suppliernomcodedata"
                                          ref={suppliernominaref}
                                          // selectedIndexes={[0]} 
                                          filterable 
                                          placeholder="Select Nominal"
                                          dataSource={dataGridNominal.map(nom=>(nom.nomdescription))}
                                          // value={selectedSupplier.NominalDescription}
                                          value={NominalCode}
                                          onChange={handleNominalCodeChange}
                                          />
                                    
                                          
                                            <span onClick={handleOpenModalMediumNominalAccount} className="master-option-span">...</span>
                                          </div>
                                      </div> 
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>class</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          {/* <div className="form-group"> */}
                                          <div className="form-group master-option">

                                          <DropDownList
                                          id='suppplierclassdata'
                                          ref={supplierclassref}
                                          // selectedIndexes={[0]} 
                                          filterable 
                                          placeholder="Select class"
                                          dataSource={dataGridSupplierClass.map(cls=>(cls.className))}
                                          // value={selectedSupplier.ClassName}
                                          value={Class}
                                          onChange={handleClassChange}
                                          /> 
                                          <span onClick={handleOpenModalMediumSupplierClass} className="master-option-span">...</span>

                                          </div>
                                      </div> 

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Default Country</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">

                                          <DropDownList
                                          id='suppplierdefaultcountrydata'
                                          ref={suppliercountryref}
                                          // selectedIndexes={[0]} 
                                          filterable 
                                          placeholder="Select country"
                                          dataSource={GritCountry.map(country=>(country.country))}
                                          // value={selectedSupplier.Country} 
                                          value={DefaultCountry}
                                          onChange={handleDefaultCountryChange}
                                          />
                                      
                                          <span   onClick={handleOpenModalMediumCountry} className="master-option-span">...</span>

                                          </div>
                                      </div> 


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#supplieraddress" aria-expanded="false" aria-controls="supplieraddress"><i className="plus-icon" aria-hidden="true"></i> Address </a> 
                          </h4>
                            <div id="supplieraddress" className="collapse" aria-expanded="false">
                              
                                <div className="panel-box-div">
                                  {/* content */}
                                  <>
                            
                                  <Grid
                                    id="supplieraddresstypesdata"
                                    dataSource={supplieraddresstypes}
                                    columns={columns}
                                    selection={selection}
                                    dataSourceSettings={dataSourceSettings}
                                    appearance={appearance}
                                    className="mx-auto"
                                    onCellClick={handleCellClickSupplieraddresstpes}
                                  />
                                  </>
                                </div>
                             
                            </div>
                        </div>

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#suppliertaxable" aria-expanded="false" aria-controls="suppliertaxable"><i className="plus-icon" aria-hidden="true"></i> Taxable </a> 
                          </h4>
                            <div id="suppliertaxable" className="collapse" aria-expanded="false">
                             
                                <div className="panel-box-div">
                                 <div className='row'>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>VAT Payable</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                        <SwitchButton
                                        id='suppliervatpayableswitchdss'
                                        ref={vatref}
                                        rightToLeft
                                        checked={Vatpayable}
                                        onChange={handlechangevatpayable}
                                      />
                                        </div>
                                      </div>

                                     

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>VAT No</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                          <Input placeholder="VAT No"
                                          id='suppliervatno'
                                          ref={suppliervatnoref}
                                          value={Vatno}
                                          onChange={handlechangevatno}
                                          disabled={!Vatpayable}
                                          ></Input>
                                        </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>VAT Code</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                                            {/* <Input placeholder="VAT Code"></Input> */}
                                            <DropDownList
                                            id='suppliervatcodelistdata'
                                            ref={vatcosderef}
                                            // selectedIndexes={[0]} 
                                            filterable 
                                            placeholder="Select Vatcode"
                                            dataSource={GritVatCode.map(Vat=>(Vat.description))}
                                            // value = {AccountData.length > 0 ? AccountData[0].vatcodeDescription : ''}
                                            value={vatcode}
                                            onChange={handlechangevatcode}
                                            disabled={!Vatpayable}  

                                            />
                                            <span onClick={handleOpenModalMediumVatCodes} className="master-option-span">...</span>
                                          </div>
                                      </div> 

                                      {/* <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>VAT Country</span>
                                          </div>
                                      </div> */}
                                      {/* <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                                            <Input placeholder="VAT Country"></Input><span className="master-option-span">...</span>
                                          </div>
                                      </div>  */}

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Currrency</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                                            <DropDownList 
                                            id="suppliercurrencydata"
                                            // selectedIndexes={[0]} 
                                            ref={suppliervatcurrencyref}
                                            filterable 
                                            placeholder="Select Currency"
                                            dataSource={GritCurrency.map(Currency=>(Currency.currencyName))}                                    
                                            // value = {AccountData.length > 0 ? AccountData[0].CurrencyCode : ''}
                                            value={DefaultCurrency}
                                            onChange={handleDefaultCurrencyChange}
                                            disabled={!Vatpayable}
                                            />
                                            <span onClick={handleOpenModalMediumCurrency} className="master-option-span">...</span>
                                          </div>
                                      </div> 
                                  
                                      </div>
                                </div>
                            
                            </div>
                        </div>

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#supplierbank" aria-expanded="false" aria-controls="supplierbank"><i className="plus-icon" aria-hidden="true"></i> Bank </a> 
                          </h4>
                            <div id="supplierbank" className="collapse" aria-expanded="false">
                             
                                <div className="panel-box-div">

                                <div className="row">

                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div className='input-lable'>
                                        <span>Bank Name</span>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div className="form-group">
                                      <Input placeholder="Bank Name"
                                      id='supplierbankname'
                                      ref={acref}
                                      // value = {AccountData.length > 0 ? AccountData[0].bankName : ''}
                                      value={Bankname || ''}
                                      onChange={handlechangebankname}

                                      ></Input>
                                    </div>
                                  </div>

                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div className='input-lable'>
                                        <span>A/C Name</span>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div className="form-group">
                                      <Input placeholder="A/C Name"
                                      id='supplieracname'
                                      ref={bankref}
                                      // value = {AccountData.length > 0 ? AccountData[0].bankAccountName : ''}
                                      value={Acname || ''}
                                      onChange={handlechangeacname}
                                      ></Input>
                                    </div>
                                  </div>

                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div className='input-lable'>
                                        <span>Sort Code</span>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div className="form-group">
                                      <Input placeholder="Sort Code"
                                      id='suppliersortcode'
                                      ref={sortref}
                                      // value = {AccountData.length > 0 ? AccountData[0].bankSortCode : ''}
                                      value={Sortcode || ''}
                                      onChange={handlechangesortcode}
                                      ></Input>
                                    </div>
                                  </div>

                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div className='input-lable'>
                                        <span>A/C Number</span>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div className="form-group">
                                      <Input placeholder="A/C Number"
                                      id='suppliernumber'
                                      ref={acnumberref}
                                      // value = {AccountData.length > 0 ? AccountData[0].bankAccountNum : ''}
                                      // value={AccountData?.bankAccountNum|| ''}
                                      value={Acnumber || ''}
                                      onChange={handlechangeacnumber}
                                      ></Input>
                                    </div>
                                  </div>

                                  </div>

                                </div>
                             
                            </div>
                        </div>

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#supplierpaymentterms" aria-expanded="false" aria-controls="supplierpaymentterms"><i className="plus-icon" aria-hidden="true"></i> Payment Terms </a> 
                          </h4>
                            <div id="supplierpaymentterms" className="collapse" aria-expanded="false">
                             
                                <div className="panel-box-div">
                                  <div className='row'>

                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                      <div className='input-lable'>
                                          <span>Payment Term</span>
                                      </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div className="form-group master-option">
                                    {/* <Input placeholder="Payment Term"></Input> */}
                                        <DropDownList
                                          id="supplierpaymenttermse4k"
                                          // selectedIndexes={[0]} 
                                          ref ={supPaymentRef}
                                          filterable 
                                          placeholder="Select Payment Term"
                                          dataSource={GritPaymentTerm.map(Payment=>(Payment.description))}
                                          // value = {AccountData.length > 0 ? AccountData[0].paymentTermsDescription : ''}
                                          value={Payment}
                                          onChange={handlePaymentChange}
                                          
                                          />
                                          <span  onClick={handleOpenModalMediumPaymentterms}  className="master-option-span">...</span>
                                      </div>
                                    </div>

                                  </div>  
                                </div>
                              
                            </div>
                        </div>

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#supplierdiscounts" aria-expanded="false" aria-controls="supplierdiscounts"><i className="plus-icon" aria-hidden="true"></i> Discounts </a> 
                          </h4>
                            <div id="supplierdiscounts" className="collapse" aria-expanded="false">
                             
                                <div className="panel-box-div">
                                  <div className='row'>

                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>Discount</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                    
                                          <NumberInput 
                                          placeholder="Discount"
                                          id="discountinputsupplier"
                                          // ref={discountref11}
                                          ref={supplierRef}  
                                          // value = {AccountData.length > 0 ? AccountData[0].discount : ''}
                                          numberFormat={{
                                           
                                            minimumFractionDigits: 2
                                        }}
                                          // max={100}
                                          min={0}
                                          value={Discount}
                                          onChange={handleChangeDiscount} 
                                          />

                                        </div>
                                      </div>

                                    

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>Credit Limit</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                          <NumberInput 
                                          placeholder="Credit Limit"
                                          id='supplierlimitdata'
                                          ref={creditLimitref}
                                          // value = {AccountData.length > 0 ? AccountData[0].creditLimit : ''}
                                          numberFormat={{
                                           
                                            minimumFractionDigits: 2
                                        }}
                                         
                                          // max={100}
                                          min={0}
                                          value={creditlimit}
                                          onChange={handlechangecreditlimit}
                                          />
                                        </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                          <span>Date Opened</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                            <DateInput format="dd/mm/yyyy" placeholder="Date Opened"
                                            id='suppliedateopendata'
                                            ref={dateoprnref}
                                            value={DateOpened}
                                            onChange={handlechangedateopened}
                                            />

                                        
                                
                                        </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                          <span>Date Used</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                      
                                            <DateInput format="dd/mm/yyyy" 
                                            placeholder="Date Used"
                                            id='supplierdatecloseddata'
                                            ref={ dateusedref}
                                            value = {DateUsed}
                                            onChange={handlechangedateUsed}

                                            />
                                        
                                        
                                        </div>
                                      </div>
                                      

                                  </div> 
                                </div>
                              
                            </div>
                        </div>
                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a data-toggle="collapse" href="#suppliersettings" aria-expanded="fasle" aria-controls="suppliersettings"><i className="plus-icon" aria-hidden="true"></i> Supplier Paremeter Settings </a> 
                          </h4>
                            <div id="suppliersettings" className="collapse" aria-expanded="fasle" >
                                <div className="panel-box-div">
                                  <>
                                  <E4kSupplierParametesettingGrid/>
                                  </>
                                </div>
                            </div>
                        </div>

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#suppliernotes" aria-expanded="false" aria-controls="suppliernotes"><i className="plus-icon" aria-hidden="true"></i> Notes </a> 
                          </h4>
                            <div id="suppliernotes" className="collapse" aria-expanded="false">
                             
                                <div className="panel-box-div">
                                  <div className='row'>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>Notes</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                          <TextArea
                                          id='suppliernotes' 
                                          placeholder="Notes"
                                          ref={noteref}
                                          // value={SupplierNotesData?.Note || 'Null'}
                                          ></TextArea>
                                        </div>
                                      </div>

                                  </div> 
                                </div>
                             
                            </div>
                        </div>                      
                       </div>
                      </div>
                      <div id="suppliercolumnpopup2" className="col-md-3 col-xs-12" style={{ display: isColumn2Visible ? 'block' : 'none' }}>

                        <div className="mainpopup-right">
                          <div className="contact-list">
                            <div className="contact-img">
                              {selectedSupplier.value && !showUploader ? (
                            <div className="image-container">
                            <img src={selectedSupplier.value} alt="Selected Supplier Logo" onChange={handleImageChangelogo} onClick={handleImageClick} />
                            </div>
                            
                        ) : (
                            // <ImageUploader onClose={handleUploaderClose} />
                            <div className="image-container">
                            <img id="displayImage" src={imageSrc}  alt="Selected Image" />
                            <input type="file" id="imageUpload" accept="image/*" ref={SupplierLogoImageRef} onChange={handleImageChange} />
                        </div>
                        
                        )}


                        
                            </div>
                             <br>
                             </br>
                             <br>
                             </br>
                             <br>
                             </br>

                            <div className="contact-des">
                                <h4> {selectedSupplier.name}</h4>
                                {/* <p className="contact-des-line">Description</p> */}
                            </div>
                            <br>
                            </br>
                            <div className="leftsidebar-clickdiv">
                              <div className="row">
                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Balance</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a> 0.00</a>
                                    </div>
                                </div>

                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Turnover Total</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a>${supplierTotalturnover}</a>
                                    </div>
                                </div>


                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Transaction Total</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a>0.00</a>
                                    </div>
                                </div>

                              </div>  
                            </div>

                          </div>
                        </div>

                      </div>

                    </div>
                  </div>


                </div>
              </div>
                              {/* POPUP Navi button*/}

             {/* <div  className='largerpup-navleft' 
             onClick={PreviouesDataforSupplier}
             >

                <BsChevronLeft />

                
              </div>   

            <div className='largerpup-navright' 
            onClick={NextDateforSupplier}
            >
                <BsChevronRight />
            </div>  */}
             { (selectedSupplier?.filterdatasource)?.length === 1 ? (null) : 
                    (selectedSupplier?.index === 0) ? (null) : 
                    (selectedSupplier.rowid === 0) ? (null) : (
                    <a href="#" onClick={handlePreviousSupplierData}>
                      <div className="largerpup-navleft">
                        <BsChevronLeft />
                      </div>
                    </a>

                )}



            { 
              (selectedSupplier?.filterdatasource?.length === 1 || 
                selectedSupplier?.index === selectedSupplier.allSupplier - 1 || 
                selectedSupplier?.rowid === selectedSupplier.allSupplier - 1) 
                ? null 
                : (
                  <a href="#nextcustomer" onClick={() => NextDateforSupplier()}>
                    <div className="largerpup-navright">
                      <BsChevronRight />
                    </div>
                  </a>
                ) 
            }



               {isLoading1 && (
                    <div style={overlayStyle}>
                      <p>Processing...</p>
                      <Spinner />
                    </div>
                  )}

            </div>




          </div>
      </Draggable> 

   

      <E4kTblSupplierPriceProductRelateMatrix
      showModalMediumCustomerPriceProductMatrix= {showModalMediumSupplierPriceProductMatrix}
      handleCloseMediumCustomerPriceProductMatrix={handleCloseMediumCustomerPriceProductMatrix}/>


      <E4kTblSupplierCategory1Grid 
        showModalMediumSupplierCategory1={showModalMediumSupplierCategory1} 
        handleCloseMediumSupplierCategory1={handleCloseModalMedium} 
     />

    <>
    <E4kSupplierCategory2 
        showModalMediumSupplierCategory2={showModalMediumSupplierCategory2} 
        handleCloseMediumSupplierCategory2={handleCloseModalMediumCustomerCategory2} 
    />


     <E4kTblSupplierCategory3Grid
    showModalMediumSupplierCategory3={showModalMediumSupplierCategory3}
    handleCloseMediumSupplierCategory3={handleCloseModalMediumCustomerCategory3}
    />
    <>
    <E4kSupplierClassGrid
            showModalMediumSupplierClass={showModalMediumSupplierClass}
            handleCloseMediumSupplierClass={handleCloseModalMediumSupplierClass}
        />

  <E4kTblNominalAccountGrid
        showModalMediumNominalAccount={showModalMediumNominalAccount}
        handleCloseMediumNominalAccount={handleCloseModalMedium4}
        
      />
       <E4kTblCurrencyGrid showModalMediumCurrency={showModalMediumCurrency} handleCloseMediumCurrency={handleCloseModalMedium9} /> 

       <E4kTblbusRepGrid
       showModalMediumBusRep={showModalMediumBusRep}
       handleCloseMediumBusRep={handleCloseModalMediumBusRep}
      
      />

      <E4kPaymentterms
        showModalMediumPaymentterms={showModalMediumPaymentterms}
        handleCloseMediumPaymentterms={handleCloseModalMediumPaymentterms}
      />
      <E4kCountryGrid showModalMediumCountry={showModalMediumCountry} handleCloseMediumCountry={handleCloseModalMedium7} />


      <E4kTblAccVatCodesGrid showModalMediumVatCodes ={showModalMediumVatCodes} handleCloseMediumVatCodes ={handleCloseModalMedium11} />

    </>


        </>
    </>
  );
};

export default E4kSupplierUpdatePage;