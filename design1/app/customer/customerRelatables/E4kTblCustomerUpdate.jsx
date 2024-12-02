"use client";
import React, { use } from 'react';
import  { useState,useRef,useEffect,useMemo } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChain, faChainBroken } from '@fortawesome/free-solid-svg-icons';
import { SwitchButton } from 'smart-webcomponents-react/switchbutton';
import { Input } from 'smart-webcomponents-react/input';
import { DateInput } from 'smart-webcomponents-react/dateinput';
import { DropDownList} from 'smart-webcomponents-react/dropdownlist';
import { TextArea } from 'smart-webcomponents-react/textarea';
import Draggable from 'react-draggable';
import E4kTblNominalAccountGrid from '../../master/nominalAccount/E4kTblNominalAccountGrid';
import E4kTblCustomerCategory1Grid from '../../master/customerCategory1/E4kTblCustomerCategory1Grid';
import E4kTblCustomerCategory2Grid from '../../master/customerCategory2/E4kTblCustomerCategory2Grid';
import E4kTblCustomerCategory3Grid from '../../master/customerCategory3/E4kTblCustomerCategory3Grid';
import E4kTblCurrencyGrid from '../../master/currency/E4kTblCurrencyGrid';
import E4kCountryGrid from '../../master/customerCountry/E4kCountryGrid';
import E4kTblAccVatCodesGrid from '../../master/accountVatcode/E4kTblAccVatCodesGrid';
import E4kCustomerClassGrid  from '../../master/customerClass/E4kCustomerClassGrid';
import E4kTblbusRepGrid from '../../master/TblbusRep/E4kTblbusRepGrid';
import E4kPaymentterms from '../../master/paymentterms/E4kPaymentterms';
import E4kTblCustomerParametersettingGrid from './E4kTblCustomerParametersettingGrid';
import E4kTblCustomerPriceProductRelateMatrix1 from '../customerRelatables/E4kTblCustomerPriceProductRelateMatrix1'
// import E4kTblCustomerPriceProductRelateMatrix1 from '../../E4kTblCustomerPriceProductRelateMatrix1';
import E4kTblCustomerGroupGrid from '../../master/customerGroup/E4kTblCustomerGroupGrid';
import { useDispatch, useSelector } from 'react-redux';
import E4kTblCustomerAddressTypesGrid from './E4kTblCustomerAddressTypesGrid'
// import {setSelectCustomerAccountData} from '../store/slices/CustomerAccountSlice';
import { NumberInput } from 'smart-webcomponents-react/numberinput';
///////////////////////////// DATA FROM MASTE TABLE DEFINITION /////////////////////////////////////////////
import { useGetCustomerCategory1Query } from '../../store/services/Customer/e4kTblcustomercategory1';
import {useGetCustomerCategory2Query } from '../../store/services/Customer/e4kTblCustomerCategory2';
import {useGetCustomerCategory3Query } from '../../store/services/Customer/e4kTblCustomerCategory3';
import {useGetCurrenciesQuery} from '../../store/services/Customer/e4kTblCurrency';
import{ useGetCountriesQuery} from '../../store/services/Customer/e4kTblCountry';
import {useGetVatCodesQuery} from '../../store/services/Customer/e4kTblVatcode'
import { useGetCustomerClassQuery } from "../../store/services/Customer/e4kcustomerClass";
import {useGetTblCustomerGroupQuery } from '../../store/services/Customer/e4kTblCustomerGroup';
import {useGetSalespeopleListQuery } from '../../store/services/Customer/e4kTblbussalespeople'
import {useGetPaymentTermsListQuery} from '../../store/services/Customer/e4kTblbuspaymentterms';
import {useUpdateCustomerAccountMutation } from '../../store/services/Customer/e4kTblcustomeraccountApi';
import { useGetCustomerAccountQuery } from '../../store/services/Customer/e4kTblcustomeraccountApi';
import {useCreateCustomerMutation,useUpdateCustomerMutation,useGetCustomerListQuery,useGetCustomerNotesQuery,useUpdateCustomerNoteMutation,useDeleteCustomerMutation} from '../../store/services/Customer/e4kTblCustomer';
import {useCreateCustomerAccountMutation} from '../../store/services/Customer/e4kTblcustomeraccountApi';
import {useGetNominalAccountsQuery} from '../../store/services/Customer/e4kTblNominalAccount';
import {useCreateCustomerLogoMutation} from '../../store/services/Customer/e4kTblcustomerAddresstypeApi'
// import {setCustomerUpdateData} from '../store/slices/CustomerUpdateDataSlice';
import { setselectCustomer} from '../../store/slices/customer/e4kTblCustomerSliceSelect';
// import { ResizableBox } from 'react-resizable';
import { BsChevronLeft,BsChevronRight } from 'react-icons/bs';
import Spinner from '../../customComponents/Spinner';
import E4kTblCustomerAddressPage from '../customerRelatables/E4kTblCustomerAddressPage';
import {resetSelectAddress} from '../../store/slices/customer/e4kTblCustomerSelectAddress';
import { resetselectContact} from '../../store/slices/customer/e4kTblCustomerSelectContact';
import E4kTblCustomerContactPage from '../customerRelatables/E4kTblCustomerContactPage';








const E4kTblCustomerUpdate = ({ showModalCustomerUpdate, handleCloseCustomerUpdate,productRowChange,productRowidSuccess,totalTurnover }) => {
  console.log("HJvjgddghvdvfdv",productRowChange )
  const CustomerSelect = useSelector((state) => state.selectCustomer.selectCustomer);
  console.log("ghcdjdcdhc",CustomerSelect )
  const rowId = CustomerSelect.rowid;
  const filterCustomerData = CustomerSelect.filterdatasource;
  const CompanySelectCustomerUpdate = useSelector((state) => state.selectCompanyid.Companyid);
  const [updatecustomernote]= useUpdateCustomerNoteMutation();
  const [updateCustomer] = useUpdateCustomerMutation();
  const [updateAccount] = useUpdateCustomerAccountMutation();
  const [CreateCustomer] = useCreateCustomerMutation();
  const [createAccount] = useCreateCustomerAccountMutation();
  const [isMaximized, setIsMaximized] = useState(false);
  const [companyid, setCompanyid] = useState(CompanySelectCustomerUpdate);
  const dispatch = useDispatch();
  const [showUploader, setShowUploader] = useState(false);
  const { businessid } = useSelector((state) => state.selectCustomer.selectCustomer);
  const [CustomerNoteData,setNoteData]= useState([]);
  const [customerData, setCustomerData] = useState({});
  const [customernotedata, setcustomernotedata]=useState({});
  const [recordToDeleteSelectCustomerDelete, setRecordToDeleteSelectCustomerDelete] = useState(null);
  const [showConfirmSelectCustomerDelete, setShowConfirmSelectCustomerDelete] = useState(false);
  const skipQuery = !businessid;
  const [deleteCustomerRecord, {  isLoading: deleteproductloading }] = useDeleteCustomerMutation();
  const [showModalAddressPage, setShowModalAddressPage] = useState(false);
  const [showModalContactOpen, setshowModalContactOpen] = useState(false);
  const CustomerSelectCustomerGrid = useSelector((state) => state.selectCustomer.selectCustomer);
  const addressSelect = useSelector((state) => state.selectCustomerAddress.addressSelect);
  const selectCustomerContacts = useSelector((state) => state.selectCustomerContact.selectContact);

  const {data : customerAccountdata} = useGetCustomerAccountQuery({
    businessid:businessid
  },
  {
    skip: skipQuery,
  }
);


const {data: customernotesdata}= useGetCustomerNotesQuery({
  businessid: businessid,
  companyid: companyid,
});



 



const toggleMaximize = () => {
  setIsMaximized(!isMaximized);
};

// const modalDialogclassName = isMaximized ? 'modal-dialog modal-fullscreen' : 'modal-dialog large-popup';

const modalDialogclassName = isMaximized ? 'modal-dialog large-popup' : 'modal-dialog modal-fullscreen';

  const [isColumn2Visible, setIsColumn2Visible] = useState(true);

  const handleToggle = () => {
    setIsColumn2Visible(!isColumn2Visible);
    
  };

  //////////////////////////////////////////////////////////////////////////////////////////             Rework //////////////////////////////////////////////////////////////////////


  const inputcustomernominal = useRef(null);
  const TblcustomerCategory1 = useRef(null);
  const TblcustomerCategory2 = useRef(null);
  const TblcustomerCategory3 = useRef(null);
  const Tblcustomerclass = useRef(null);
  const Tblcustomergroup = useRef(null);
  const TblCountry = useRef(null);
  const inputRefLive = useRef(null);
  const inputRefiSextract = useRef(null);
  const inputRefStop = useRef(null);
  const inputRefName = useRef(null);
  const CustomerIdInputRef = useRef(null);
  const inputRefCompanyId = useRef(null);
  const inputRefVatpayable = useRef(null);
  const inputRefVatNo = useRef(null);
  const inputRefVatCode = useRef(null);
  const inputRefMonthlyForecast = useRef(null);
  const inputRefDiscount = useRef(null);
  const inputRefCreditLimit = useRef(null);
  const Tblcurrency = useRef(null);
  const inputRefDateOpened = useRef(null);
  const inputRefDateUsed = useRef(null);
  const NoteRef = useRef(null);
  const repCommissionRef = useRef(null); 
  const RepRef = useRef(null);
  const PaymentRef = useRef(null);
  const imageref = useRef(null);

  



  /// MASTER TABLE CALLING //////////////////////////////

  const [showModalMediumNominalAccount, setShowModalMediumNominalAccount] = useState(false);
  const [showModalMediumCustomerCategory1, setShowModalMediumCustomerCategory1] = useState(false);
  const [showModalMediumCustomerCategory2, setShowModalMediumCustomerCategory2] = useState(false);
  const [showModalMediumCustomerCategory3, setShowModalMediumCustomerCategory3] = useState(false);
  const [showModalMediumCurrency, setShowModalMediumCurrency] = useState(false);
  const [showModalMediumCountry, setShowModalMediumCountry] = useState(false);
  const [ showModalMediumVatCodes , setShowModalMediumVatCodes] = useState(false);
  const [showModalMediumCustomerClass, setShowModalMediumCustomerClass] = useState(false);
  const [showModalMediumGroup, setshowModalMediumGroup] = useState(false);
  const [showModalMediumBusRep, setShowModalMediumBusRep] = useState(false);
  const [ showModalMediumPaymentterms, setShowModalMediumPaymentterms] = useState(false);

  //////////////////////////////// DATA FROM GRIT ///////////////////////////////////


  const [dataGridNominal, setDataGridNominal ] = useState([]);
  const [dataGridCategory1, setCategory1 ] = useState([]);
  const [dataGridCategory2, setCategory2] = useState([]);
  const [dataGridCategory3, setCategory3] = useState([]);
  const [ dataGritCurrency , setGritCurrency] = useState([]);
  const [dataGritCountry , setGritCountry] = useState([]);
  const [dataGritVatCode , setGritVatCode] = useState([]);
  const [ dataGritClass , setGritClass] = useState([]);
  const [dataGritGroup , setGritGroup] = useState([]);
  const [dataCustomerSales, setCustomerSales] = useState([]);
  const [dataPaymentterms , setPaymentdata] = useState([]);
  




  //////////////////////////////////////////////// DATA FROM MASTER TABLES /////////////////////////////////////////////////////////////
//   const settingid= CustomerSelect.settingid;
  const { data:Nominaldata, error:Nominalerror, isLoading:NominalisLoading, isError:NominalisError } = useGetNominalAccountsQuery(companyid);
  const { data:Categories1data, error:Categories1error, isLoading:Categories1isLoading, isError:Categories1isError } = useGetCustomerCategory1Query(companyid);
  const { data: Categories2data, error: Categories2error, isLoading: Categories2isLoading, isError: Categories2isError } = useGetCustomerCategory2Query(companyid);
  const { data: Categories3data, error: Categories3error, isLoading: Categories3isLoading, isError: Categories3isError } = useGetCustomerCategory3Query(companyid);
  const { data: Currencydata, error: Currencyerror, isLoading: CurrencyisLoading, isError: CurrencyisError } = useGetCurrenciesQuery(companyid);
  const { data: Countrydata, error: Countryerror, isLoading: CountryisLoading, isError: CountryisError } = useGetCountriesQuery(companyid);
  const { data: VatCodedata, error: VatCodeerror, isLoading: VatCodeisLoading, isError: VatCodeisError } = useGetVatCodesQuery(companyid);
  const { data: Classdata, error: Classerror, isLoading: ClassisLoading, isError: ClassisError } = useGetCustomerClassQuery(companyid);
  const { data: Groupdata, error: Grouperror, isLoading: GroupisLoading, isError: GroupisError } = useGetTblCustomerGroupQuery(companyid);
  const { data: Salesdata , error: Saleserror, isLoading: SalesisLoading, isError: SalesisError } = useGetSalespeopleListQuery (companyid);
  const {data : Paymentdata , error: Paymenterror, isLoading: PaymentisLoading, isError: PaymentError} = useGetPaymentTermsListQuery(companyid);






 




//   console.log("DATA FOR SETTINGS" ,{companyid: CustomerSelect.CompanyID,
//     businessid:  CustomerSelect.businessid,
//     settingid : settingid || '',} )

  

  const handleOpenModalMediumNominalAccount = () => {
    setShowModalMediumNominalAccount(true);
  };
  const handleCloseModalMedium4 = () => {
    setShowModalMediumNominalAccount(false);
  };
  ///////////////////////////////////////////
  const handleOpenModalMediumCustomerCategory1 = () => {
    setShowModalMediumCustomerCategory1(true);
  };
  const handleCloseModalMedium = () => {
    setShowModalMediumCustomerCategory1(false);
  };



  const handleOpenModalMediumCustomerCategory2 = () => {
    setShowModalMediumCustomerCategory2(true);
  };
  const handleCloseModalMedium1 = () => {
    setShowModalMediumCustomerCategory2(false);
  };


  const handleOpenModalMediumCustomerCategory3 = () => {
    setShowModalMediumCustomerCategory3(true);
  };

  const handleCloseModalMedium3 = () => {
    setShowModalMediumCustomerCategory3(false);
  };

  const handleOpenModalMediumCurrency = () => {
    setShowModalMediumCurrency(true);
  };

  const handleCloseModalMedium9 = () => {
    setShowModalMediumCurrency(false);
  };


  const handleOpenModalMediumCountry = () => {
    setShowModalMediumCountry(true);
  };

  const handleCloseModalMedium7 = () => {
    setShowModalMediumCountry(false);
  };


  const handleOpenModalMediumVatCodes = () => {
    setShowModalMediumVatCodes(true);
  };
  const handleCloseModalMedium11 = () => {
    setShowModalMediumVatCodes(false);
  };

  const handleOpenModalMediumCustomerClass = () => {
    setShowModalMediumCustomerClass(true);
  };

  const handleCloseModalMedium5 = () => {
    setShowModalMediumCustomerClass(false);
  };

  const handleOpenModalMediumGroup = () => {
    setshowModalMediumGroup(true);
  };

  const handleCloseModalMedium6 = () => {
    setshowModalMediumGroup(false);
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
  

  




  useEffect(() => {
    if (Nominaldata) {
        transformData();
    }
  }, [NominalisLoading, Nominalerror, NominalisError,Nominaldata]);

  useEffect(() => {
    if (Categories1data) {
      transformData();
    }
  }, [Categories1isLoading, Categories1error, Categories1isError,Categories1data]);

  useEffect(() => {
    if (Categories2data) {
      transformData();
    }
  }, [Categories2isLoading, Categories2error, Categories2isError,Categories2data]);

  useEffect(() => {
    if (Categories3data) {
      transformData();
    }
  }, [Categories3isLoading, Categories3error, Categories3isError,Categories3data]);

  useEffect (() => {
    if (Currencydata) {
      transformData();
    }
  }, [CurrencyisLoading, CurrencyisError, Currencyerror, CurrencyisError, Currencydata]);

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

  useEffect(() => {
    if (Classdata) {
      transformData();
    }

  }, [ClassisLoading, Classerror, Classdata, ClassisError]);


  useEffect(() => {
    if (Groupdata) {
      transformData();
    }
  }, [GroupisLoading, Grouperror, Groupdata, GroupisError]);

  useEffect(() => {
    if (Salesdata) {
      transformData();
    }
  }, [SalesisLoading, Saleserror, Salesdata, SalesisError]);

useEffect (()=>{
  if (Paymentdata) {
    transformData();
  }
},[PaymentError,Paymentdata]);




useEffect(() => {
  if(customerAccountdata){
   
   const customerAccountGrid =customerAccountdata.E4kTblcustomeraccount.map((customerAccount) => {
    return {
      creditLimit : customerAccount.creditLimit??  '',
      dateOpened : customerAccount.dateOpened ?? '',
      dateUsed  : customerAccount.dateUsed ?? '',
      discount : customerAccount.discount ?? '' ,
      repComission : customerAccount.repComission ?? '',
      vatflag : customerAccount.vatflag ?? '',
      vatno : customerAccount.vatno ?? '', 
      vatcode: customerAccount.vatcode?.description ?? '',
      currencyCode: customerAccount.currencyCode?.currencyName ?? '',
      paymenttermsid : customerAccount.paymenttermsid?.description?? '',
      repid: `${customerAccount.repid?.forename ?? ''} ${customerAccount.repid?.surname ?? ''}`.trim(),
     
    }
   }) ;
   console.log("gcdcfdcfdhcdc",customerAccountGrid)
   setCustomerData(customerAccountGrid);

  
  }
},[customerAccountdata] );


useEffect(()=>{
  if(customernotesdata){
    const Notedata =customernotesdata.E4kTblcustomernotes;
    setcustomernotedata(Notedata);
   }
},[customernotesdata]);







const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const dateUsed = customerData.length > 0 ? formatDate(customerData[0].dateUsed) : '';

const dateOpened = customerData.length > 0 ? formatDate(customerData[0].dateOpened) : '';





//////////////// /////////////////////////////  Dropdowm Data ////////////////////////////////////////////////////////////////////////////////////////////
  const transformData = () => {
    if (!Nominaldata) return [];
        const datagrid = Nominaldata.E4kTblnominallist.map(account => ({
            nomcode: account.nomcode.toString(),
            companyid: account.companyid.companyid,
            nomdescription: account.nomdescription,
            live: account.live,
            nombs: account.nombs,
            nomdc: account.nomdc,
            nompl: account.nompl,
        }));
    setDataGridNominal(datagrid);

    if(!Categories1data) return [];
    const category1 = Categories1data.E4kTblcustomercategory1.map(Category1 => ({
      category1id: parseInt(Category1.category1id, 10), // Ensure category1id is an integer
      companyid: Category1.companyid.companyid,
      category1name: Category1.category1name,
    }));
    setCategory1(category1);

    if(!Categories2data) return [];
    const category2 = Categories2data.E4kTblcustomercategory2.map(Category2 => ({ // Adjusted to Category2
      category2id: Number(Category2.category2id), // Adjusted to Category2
      companyid: Category2.companyid.companyid,
      category2name: Category2.category2name,
    }));
    setCategory2(category2);

    if(!Categories3data) return [];
    const category3 = Categories3data.E4KTblcustomercategory3.map(category3 => ({
      category3id: parseInt(category3.category3id, 10),
      companyid: category3.companyid.companyid,
      category3name: category3.category3name,
  }));
    setCategory3(category3);

    if(!Currencydata) return [];
    const currency = Currencydata.E4kCurrency.map(currency => ({
      currencyCode: parseInt(currency.currencyCode, 10),
      companyid: currency.companyid.companyid, // This line will only execute if data and companyid are not null
      currencyName: currency.currencyName,
      currencyExchangeRate: parseFloat(currency.currencyExchangeRate),
      currencySymbol: currency.currencySymbol,
      isocode: currency.isocode,
  }));
    setGritCurrency(currency);

    if(!Countrydata) return [];
    const Country = Countrydata.E4kCountry.map(Country => ({
      countryid: parseInt(Country.countryid, 10),
      companyid: Country.companyid.companyid,
      country: Country.country,
      groupid : Country.groupid,
      groupName: Country.member ? Country.member.groupName : null,
    }));
    setGritCountry(Country);

    if(!VatCodedata) return [];
    const VatCode = VatCodedata.E4kTblaccvatcodes.map((vatCode) => ({
      companyid: vatCode.companyid.companyid,
      description: vatCode.description,
      sagecode: vatCode.sagecode,
      vatcode: vatCode.vatcode,
      vatpercent: vatCode.vatpercent,
    }));
    setGritVatCode(VatCode);

    if(!Classdata) return [];
    const Class = Classdata.E4kCustomerclass.map(item => ({
      classid: parseInt(item.classid, 10), // Ensure classid is an integer
      companyid: item.companyid.companyid,
      className: item.className,
       // Corrected from item.classname
  }));

    setGritClass(Class);
    // Console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$^%^^^^^^^^^class", setGritClass);



    if(!Groupdata) return [];
    const Group = Groupdata.E4kGroup.map(group => ({
      groupid: parseInt(group.groupid, 10), // Ensure groupid is an integer
      companyid: group.companyid.companyid,
      groupid : group.groupid ,//
      groupname: group.groupname, //
    }));
    setGritGroup(Group);

    if(!Salesdata) return [];
    const Sales = Salesdata.E4kTblbussalespeople.map(person => ({
      repid: person.repid,
      forename: person.forename,
      surname: person.surname,
      live: person.live,
      repkey: person.repkey,
    }));
    setCustomerSales(Sales);


    if(!Paymentdata) return [];
    const Payment = Paymentdata.E4kTblbuspaymenttermslist.map(term => ({
      paymenttermsid: term.paymenttermsid,
      description: term.description,
      days: term.days,
    }));
    setPaymentdata(Payment);

  

  }



  const [Customername, setCustomername] = useState('');
  console.log("chjdchkdhdvk", Customername)
  const [category1, setCategorydata1] = useState('');

  const [category2, setcustomerCategorydata2] = useState( '');

  const [category3, setcustomerCategorydata3] = useState('');

  const [classs, setClass] = useState('');

  const [groups, setgroups] = useState('');

  const [country, setCountry] = useState('');

  const [nomDescription, setNomDescription] = useState('');

  const [live, setLive] = useState();

  const [iSextract, setIsExtract] = useState();

  const [stop, setStop] = useState();
  console.log('shcdvgjhsdv',stop )

  const [VatFlag,setVatFlag]= useState();

  const [VatCode ,setGritVatCodedata]= useState('');

  const [Vatcodeno, setvatcodeno]  = useState('');

  const [Defaultcurrency, setCurrencyData] = useState('');


  const [Paymenttermsdata, setPaymenttermsdata] = useState('');


  const [DiscountData, setDiscountData] = useState('');

  const [CreditLimitData, setCreditLimitData]= useState('');

  const [DateOpenedData, setDateOpenedData]=useState('');

  const [DateUsedData, setDateUsedData] = useState('');

  const [RepData, setRepData] = useState('');

  const [RepCommissionData, setRepCommissionData] = useState('');

  const [customerNotechange, setcustomerNotechange]= useState('');



  /////////////////////// onchnage event ////////////////////////////////////////////////////////////////////////////////////////////
 

  useEffect(() => {
		if (selectCustomerContacts.addressTypeId) {
          handleopenContact();
        }
      }, [selectCustomerContacts.addressTypeId]);
	

  const handleCloseAddressPage = () => {
	  setShowModalAddressPage(false);	
	  dispatch(resetSelectAddress())
	  //addressrefetch()

	};




    
	const handleopenContact =() =>{
		if(selectCustomerContacts.addressTypeId){
			setshowModalContactOpen(true);
            //contactrefetch();
			
		}
		
	};



  const handleCloseContact = () => {
    setshowModalContactOpen(false);
    //addressrefetch();
    dispatch(resetselectContact());
    // dispatch(resetSelectContactAddressData());
    // dispatch(resetFetchedAddressData())
  };




  useEffect(() => {
		if (addressSelect.addressTypeId) {
		  handleOpenAddressPage();
		}
	  }, [addressSelect.addressTypeId]);

	const handleOpenAddressPage = () => {
	  if (addressSelect.addressTypeId) {
		setShowModalAddressPage(true);
	  }
	};






  useEffect(() => {
    if (CustomerSelect && CustomerSelect.name || CustomerSelect.name === "") {
      setCustomername(CustomerSelect.name);
    
    }
  }, [CustomerSelect]);


  useEffect (()=>{
    if(CustomerSelect && CustomerSelect.category1Name ||CustomerSelect.category1Name || ""){
      setCategorydata1(CustomerSelect.category1Name);
    }
  }, [CustomerSelect]);


  useEffect(()=>{
    if(CustomerSelect && CustomerSelect.category2Name || CustomerSelect.category2Name || ""){
      setcustomerCategorydata2(CustomerSelect.category2Name);
    }
  },[CustomerSelect]);


  useEffect(()=>{
    if(CustomerSelect && CustomerSelect.category3Name || CustomerSelect.category3Name === ""){
      setcustomerCategorydata3(CustomerSelect.category3Name);
    }
  },[CustomerSelect]);

  useEffect(()=>{
    if(CustomerSelect && CustomerSelect.className || CustomerSelect.className === ""){
      setClass(CustomerSelect.className);
    }
  },[CustomerSelect]);

  useEffect(()=>{
    if(CustomerSelect && CustomerSelect.groupName || CustomerSelect.groupName === ""){
      setgroups(CustomerSelect.groupName);
    }
  },[CustomerSelect]);

  useEffect(()=>{
    if(CustomerSelect && CustomerSelect.country || CustomerSelect.country === ""){
      setCountry(CustomerSelect.country);
    }
  },[CustomerSelect]);


  useEffect(()=>{
    if(CustomerSelect && CustomerSelect.nomDescription || CustomerNoteData.nomDescription === ""){
      setNomDescription(CustomerSelect.nomDescription);
    }
  },[CustomerSelect]);
  
  useEffect(()=>{
    if(CustomerSelect && CustomerSelect.islive || CustomerSelect.islive === false){
      setLive(CustomerSelect.islive);
    }
  },[CustomerSelect]);

  useEffect(()=>{
    if(CustomerSelect && CustomerSelect.isextract || CustomerSelect.isextract === false){
      setIsExtract(CustomerSelect.isextract);
    }
  },[CustomerSelect]);

  useEffect(()=>{
    if(CustomerSelect && CustomerSelect.isstop || CustomerSelect.isstop === false){
      setStop(CustomerSelect.isstop);
      console.log("isstopdatahgcd",CustomerSelect.isstop)
    }
  },[CustomerSelect]);

  useEffect(()=>{
    if(CustomerSelect&& CustomerSelect.country || CustomerSelect.Country === false){
      setCountry(CustomerSelect.country);
    }
  },[CustomerSelect]);

  useEffect(()=>{
    if(customerData && customerData.length > 0 ? customerData[0].vatflag === "N" ? false :true : false ){
      setVatFlag(customerData.length > 0 ? customerData[0].vatflag === "N" ? false :true : false);

    }
    else{
      setVatFlag(false);
    }
  },[customerData])


  useEffect(()=>{
    if(customerData && customerData.length > 0 ? customerData[0].vatcode : '' ){
      setGritVatCodedata(customerData.length > 0 ? customerData[0].vatcode : '');
    }
    else{
      setGritVatCodedata('');
    }
  }, [customerData]);


  useEffect(()=>{
    if(customerData && customerData.length > 0 ? customerData[0].isextract === "Y" ? true : false : false ){
      setIsExtract(customerData.length > 0 ? customerData[0].isextract === "Y" ? true : false : false);

    }
  },[customerData]);


  useEffect(()=>{
    if(customerData && customerData.length > 0 ? customerData[0].vatno : '' ){
        setvatcodeno(customerData.length > 0 ? customerData[0].vatno : '');
    }
    else{
      setvatcodeno('');
    }
    
  },[customerData]);


  useEffect(()=>{
    if(customerData && customerData.length > 0 ? customerData[0].currencyCode : ''){
      setCurrencyData(customerData.length > 0 ? customerData[0].currencyCode : '');

    }
    else{
      setCurrencyData('');
    }
  },[customerData]);


  useEffect(()=>{
    if(customerData && customerData.length > 0 ? customerData[0].paymenttermsid : ''){
      setPaymenttermsdata(customerData.length > 0 ? customerData[0].paymenttermsid : '');

    }
    else{
      setPaymenttermsdata('');
    }
  },[customerData]);


  useEffect(()=>{
    if(customerData && customerData.length > 0 ? customerData[0].discount : ''){
      setDiscountData(customerData.length > 0 ? customerData[0].discount : '');

    }
    else{
      setDiscountData(0);
    }
  },[customerData]);

  useEffect(()=>{
    if(customerData && customerData.length > 0 ? customerData[0].creditLimit : '' ){
      setCreditLimitData(customerData.length > 0 ? customerData[0].creditLimit : '');

    }
    else{
      setCreditLimitData('');
    }
  },[customerData]);


  useEffect(()=>{
    if(customerData && dateOpened){
      setDateOpenedData(dateOpened);

    }
    else{
      setDateOpenedData('');
    }
  },[customerData]);

  useEffect(()=>{
  if(customerData && dateUsed ){
    setDateUsedData(dateUsed);
  }
  else{
    setDateUsedData('')
  }
  },[customerData]);


  useEffect(()=>{
    if(customerData && customerData.length > 0 ? customerData[0].repid : ''){
      setRepData(customerData.length > 0 ? customerData[0].repid : '');

    }
    else{
      setRepData('');
    }
  },[customerData]);


  useEffect(()=>{
  if(customerData && customerData.length > 0 ? customerData[0].repComission : '' ){
    setRepCommissionData(customerData.length > 0 ? customerData[0].repComission : '');

  }
  else{
    setRepCommissionData('');
  }
  },[customerData]);

  useEffect(()=>{
    if(customernotedata && customernotedata.note){
      setcustomerNotechange(customernotedata.note)
    }
    else{
      setcustomerNotechange('');
    }
  },[customernotedata])




















  const inputnamechange = (event)=>{
    
    setCustomername(event.target.dataValue);
  }

  const category1change = (event)=>{
    setCategorydata1(event.detail.value);
  };

  const category2change = (event)=>{
    setcustomerCategorydata2(event.detail.value);
  };

  const category3change = (event)=>{
    setcustomerCategorydata3(event.detail.value);
  };

  const classchange = (event)=>{
    setClass(event.detail.value);
  };

  const groupchange = (event) =>{
    setgroups(event.detail.value)
  };

  const changeLive = (event) =>{
    setLive(event.detail.checked);
  };

  const changeIsExtract = (event) =>{
    setIsExtract(event.detail.checked);
  };

  const changeStop = (event) =>{
    console.log('dsvgcfcgcdvdv',event.detail.checked )
    setStop(event.detail.checked);
  };

  const changecountry = (event) =>{
    setCountry(event.detail.value);
  };

  const handledefaultnominalchange = (event)=>{
    setNomDescription(event.detail.value);
  }


  const hadlechangevatflag = (event) =>{
    setVatFlag(event.detail.value);
  }


  const handlechangevatcode = (event) =>{
    setGritVatCodedata(event.detail.value);
  };



  const handlechangevatno = (event)=>{
    setvatcodeno(event.target.value)
  };

  const handlecurrencychange =(event) =>{
    setCurrencyData(event.detail.value);
  };


  const changepaymentTerms = (event) =>{
    setPaymenttermsdata(event.detail.value);
  };


  const handlechangeDiscount = (event) =>{
    setDiscountData(event.detail.value);
  };

  const handleCreditLimitChange = (event) =>{
    setCreditLimitData(event.detail.value);
  };


  const handleDateChange = (event)=>{
    setDateOpenedData(event.detail.value);
  };


  const handleDateUsedChange = (event)=>{
    setDateUsedData(event.detail.value);
  };


  const handleRepChange = (event)=>{
    setRepData(event.detail.value);
  };


  const handleRepCommissionChange = (event)=>{
    setRepCommissionData(event.detail.value);
  };

  const handlecustomernotechange = (event)=>{
    setcustomerNotechange(event.target.value);
  };


  

  const handleSave = async () => {
   
     await handleUpdate();
    if (imageSrc) {
      const base64String = imageSrc.split(',')[1]; 
      await uploadImage(base64String); 
     }
  await updatecustomernotes()
  };
  



  //////////////////////////////////////// Customer Update ////////////////////////////////////////////////////////

  const handleUpdate = async () => {
    
   
   
  const variables = {

    businessid: CustomerSelect.businessid,

    category1id: dataGridCategory1.find(
      category => category.category1name === TblcustomerCategory1.current?.value?.[0]?.value
    )?.category1id ?? 0,

    category2id: dataGridCategory2.find(
      category => category.category2name === TblcustomerCategory2.current?.value?.[0]?.value
    )?.category2id ?? 0,

    category3id: dataGridCategory3.find(
      category => category.category3name === TblcustomerCategory3.current?.value?.[0]?.value
    )?.category3id ?? 0,

    classid: dataGritClass.find(
      category => category.className === Tblcustomerclass.current?.value?.[0]?.value
    )?.classid ?? 0,

    defaultNominal: parseInt(dataGridNominal.find(
      nominal => nominal.nomdescription === inputcustomernominal.current?.value?.[0]?.value
    )?.nomcode ?? 0),

    countryid : TblCountry.current?.value?.[0]?.value 
    ? dataGritCountry.find(country => country.country === TblCountry.current?.value?.[0]?.value)?.countryid 
    : 0,
 

    groupid: dataGritGroup.find(
      group => group.groupname === Tblcustomergroup.current?.value?.[0]?.value
    )?.groupid ?? 0,

    isextract: inputRefiSextract.current?.checked ?? false,
    islive: inputRefLive.current?.checked ?? false,
    isstop: inputRefStop.current?.checked ?? false,

    name: inputRefName.current?.value || '',
    companyid: CustomerSelect.CompanyID,
    creditLimit: inputRefCreditLimit?.current?.value || 0,
    nomcode : String(dataGridNominal.find(
      nominal => nominal.nomdescription === inputcustomernominal.current?.value?.[0]?.value
    )?.nomcode ?? 0),
    currencyCode: dataGritCurrency.find(
      currency => currency.currencyName === Tblcurrency.current?.value?.[0]?.value
    )?.currencyCode || null,

    paymenttermsid: dataPaymentterms.find(
      payment => payment.description === PaymentRef.current?.value?.[0]?.value
    )?.paymenttermsid ?? null,

    repComission: repCommissionRef?.current?.value || 0,

    repid: dataCustomerSales.find(
      sales => `${sales.forename} ${sales.surname}` === RepRef.current?.value?.[0]?.value
    )?.repid ?? null,

    vatcode: dataGritVatCode.find(
      vat => vat.description === inputRefVatCode.current?.value?.[0]?.value
    )?.vatcode ?? 0,

    vatflag: inputRefVatpayable.current?.checked ? 'Y' : 'N',
    vatno: inputRefVatNo?.current?.value || '',
    discount: inputRefDiscount?.current?.value || 0 ,
    dateOpened: inputRefDateOpened?.current?.value,
    dateUsed: inputRefDateUsed?.current?.value

    };


 

   
    dispatch(setselectCustomer({
      CompanyID: companyid,
      businessid: CustomerSelect.businessid,
      name: inputRefName.current.value ? inputRefName.current ?.value : '',
      category1Name: TblcustomerCategory1.current.value ? TblcustomerCategory1.current.value[0].value : '',
      category2Name: TblcustomerCategory2.current.value ? TblcustomerCategory2.current.value[0].value : '',
      category3Name: TblcustomerCategory3.current.value ? TblcustomerCategory3.current.value[0].value : '',
      className: Tblcustomerclass.current.value ? Tblcustomerclass.current.value[0].value : '',
      country: TblCountry.current.value ? TblCountry.current.value[0].value : '',
      nomDescription: inputcustomernominal.current.value ? inputcustomernominal.current.value[0].value : '',
      groupName: Tblcustomergroup.current.value ? Tblcustomergroup.current.value[0].value : '',
      // value: imageref.current.value,
      islive: inputRefLive.current.checked,
      isextract: inputRefiSextract.current.checked, 
      isstop: inputRefStop.current.checked, 
      VATCode:'',
      VATDescription: '',
      rowid: rowId,
 
      
  }));
  





    try {
      const result = await updateCustomer(variables).unwrap();

      if (result.E4kTblcustomerupdate.success === true) {
        toast.success('Customer Updated Successfully',{
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
      });
       // customerlistrefetch()
      } else {
        toast.error('Customer Update Failed: ' + result.E4kTblcustomerupdate.error, {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
      });
      }
    } catch (error) {
      toast.error('Customer Update Failed: ' , {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
    });
    }



    // if (accountUpdateflag === true) {

    try {
     
      const result = await updateAccount(variables).unwrap();
  
     
      if (result.E4kCustomeraccountupdate.success === true ) {
        toast.success('Customer Account Updated Successfully', {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
      });
       // customerlistrefetch();
      } else {
        toast.error('Customer Account  Update Failed: '+ result.E4kCustomeraccountupdate.error, {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
      });
      }
    } catch (error) {
      toast.error('Customer  Account Update Failed: ' + error.message, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
    });
    }

  // }


  }


////////////////////////////  
const [showModalMediumCustomerPriceProductMatrix, setshowModalMediumCustomerPriceProductMatrix] = useState(false);








const handleImageClick = (e) => {
  console.log('Image clicked:', e);
  setShowUploader(true);
};

const handleUploaderClose = () => {
  setShowUploader(false);
 
};



const [imageSrc, setImageSrc] = useState('../../assets/images/user.png');

const [createCustomerLogo, { isLoading, error, data }] = useCreateCustomerLogoMutation(); 



const { data: items,refetch:Customerdatarefetch} = useGetCustomerListQuery(companyid);


useEffect(()=>{
  if(CustomerSelect&&CustomerSelect.value){
    setImageSrc(CustomerSelect.value)
  }
},[CustomerSelect])



const handleImageChange = async (e) => {
  console.log('defaultPrevented:', e);
   const event = e

   console.log("FJJJJJJH" ,event);
  const file = e.target.files[0];
  if (file) {

    if (file.size > 300 * 1024) {
      console.log("File size",file.size )
        toast.error("File size must be less than 300 KB.",{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        });
        return;
    }
  }
  // console.log("{jdhwkdwjhd}", file)
 
  if (file) {
      const reader = new FileReader();
      console.log("ghchcgdhcdc",reader )
      reader.onload = async (event) => {
          const base64String = event.target.result.split(',')[1];
          console.log("Result", event.target.result) // Get the base64 string
          setImageSrc(event.target.result); // Set image preview

    
          let image = { image: base64String, success: true };
          console.log("vcdcbdcbdnc0",image )
      
      };
      reader.readAsDataURL(file);
  }
};



const uploadImage = async (base64String) => {
  try {
 
      const Result =await createCustomerLogo({
        businessid: CustomerSelect.businessid ,
        companyid: CustomerSelect.CompanyID ,
        settingid: 'logo',
        value: base64String,
    }); 

    if (Result.data.createCustomerLogo.success === true) {
      // toast.success("Logo uploaded successfully!", { position: 'top-center' ,  autoClose: 500,hideProgressBar: true , autoClose: 5000});
      Customerdatarefetch();
  
    }
    else{
      // toast.error(`Error uploading logo! :`, {  position: 'top-center' , autoClose: 500,hideProgressBar: true});
    }
    
  
     
  } catch (error) {
      console.error("Error uploading logo:", error);
      // toast.error("Error uploading logo!", {  position: 'top-center' , autoClose: 500,hideProgressBar: true});
  }
};


const updatecustomernotes = async()=>{
  try{
    const result= await updatecustomernote({
      businessid: CustomerSelect.businessid,
      companyid: CustomerSelect.CompanyID,
      userid: "ABE01",
      note:NoteRef.current?.value,
    });
    if (result.data.E4kCustomernoteupdate.success === true) {
      // toast.success('Customer Note Updated Successfully',{
      //   position: "top-center",
      //   autoClose: 500,
      //   hideProgressBar: true,
      // });
    }
    else{
      // toast.error('Customer Note Update Failed: '+result.data.E4kCustomernoteupdate.error, {
      //   position: "top-center",
      //   autoClose: 500,
      //   hideProgressBar: true,
      // });
    }
  }
  catch(error){
    toast.error('Customer Note Update Failed: '+error.message, {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: true,
    });
  }
};


////////////////////// price setup customer //////////////////////

const handleopencustomerproductpricesetup = ()=>{
  setshowModalMediumCustomerPriceProductMatrix(true);
}

const handleCloseMediumCustomerPriceProductMatrix = ()=>{
  setshowModalMediumCustomerPriceProductMatrix(false);
};

  
//////////////////////// >>>>>>>>>>>>>>>>>>>??????????????????????????????????????????????????????????/////////////////////////////

const [isOpen, setIsOpen] = useState(true);
const [isMinimizededitCustomer, setIsMinimizededitCustomer] = useState(false);

const handleMinimizeeditCustomer = () => {
  setIsMinimizededitCustomer(!isMinimizededitCustomer);
};


const CustomerupdatepageDragable = ({ isMinimizededitCustomer, children }) => (
  isMinimizededitCustomer ? children : <Draggable handle=".e4kmodal-headercustomerupdatepage">{children}</Draggable>
);   


const [isopencurrency , setcurrency]= useState(true)
const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
      const updateScreenSize = () => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
  
    
      window.addEventListener('resize', updateScreenSize);
  
      return () => {
        window.removeEventListener('resize', updateScreenSize);
      };
    }, []);
  
    
    const widthPercentage = 60; 
    const heightPercentage = 75; 
  
    const resizableWidth = (screenSize.width * widthPercentage) / 100;
    const resizableHeight = (screenSize.height * heightPercentage) / 100;

  
  /////////////////////////////////////////////////////// ////////////////////////////////////////////////////////
  
  const [isLoading1, setIsLoading] = useState(false);





  useEffect(() => {
  
    if (productRowidSuccess) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500); 
    }
  }, [productRowidSuccess]);




  const NextDateforCustomer = () => {

    const filterDataSource = CustomerSelect?.filterdatasource || []; 
  
    if (filterDataSource.length > 0) {
  
      const currentobj = filterDataSource.find(
        (obj) => obj.businessID === CustomerSelect.businessid
      );
  
  
      if (currentobj) {
        const currentindex = currentobj.index;
  
        const nextIndex = currentindex + 1;
  
        if (
          nextIndex === CustomerSelect.allCustomer &&
          currentindex === CustomerSelect.allCustomer - 1
        ) {
        } else {
          setIsLoading(true);
  
          const nextCustomerObj = filterDataSource[nextIndex];
        
          if (nextCustomerObj) {
            const clickdata = {
              CompanyID: nextCustomerObj.CompanyID,
              businessid: nextCustomerObj.businessID,
              name: nextCustomerObj.name,
              category1Name: nextCustomerObj.category1Name,
              category2Name: nextCustomerObj.category2Name,
              category3Name: nextCustomerObj.category3Name,
              className: nextCustomerObj.className,
              country: nextCustomerObj.country,
              nomDescription: nextCustomerObj.nomDescription,
              groupName: nextCustomerObj.groupName,
              value: nextCustomerObj.value,
              islive: nextCustomerObj.islive,
              isextract: nextCustomerObj.isextract,
              isstop: nextCustomerObj.isstop,
              VATCode: nextCustomerObj.VATCode,
              VATDescription: nextCustomerObj.VATDescription,
              allCustomer: filterDataSource.length,
              filterdatasource: filterDataSource,
              rowid:nextCustomerObj.id,
              index: nextIndex,
            };
           
            setTimeout(() => {
            
             dispatch(setselectCustomer(clickdata));
            }, 1000); 
    
              setTimeout(() => {
              
               setIsLoading(false);
              }, 3000); 
          } 
        }
      } 
    } 
    else {

      if (CustomerSelect.rowid !== null && CustomerSelect.rowid !== undefined && CustomerSelect.rowid >= 0) {
        if (CustomerSelect.allCustomer - 1 === CustomerSelect.rowid ) {
          
        } else {
          setIsLoading(true);

          const nextProductRowId = CustomerSelect.rowid + 1;
      
        
          
          setTimeout(() => {
            productRowChange(nextProductRowId);

          }, 1000); 
          
        
        }
      }
      
    }
  };
  












  ///////////////////////// previous Customer ///////////////////////////////////////




  const handlePreviousCustomerData = () => {
  

    if((CustomerSelect.filterdatasource).length > 0) {
      const currentobj = (CustomerSelect.filterdatasource).find(obj => obj.businessID === CustomerSelect.businessid);
      const currentindex = currentobj.index;
      
  
      const prevIndex = currentindex - 1;
     
      if (currentindex === 0 && prevIndex ===  - 1) {
        
      }  else {
        setIsLoading(true);
            const PreviousCustomer = CustomerSelect.filterdatasource[prevIndex]
            
  
            const clickdata = {
              CompanyID: PreviousCustomer.CompanyID,
              businessid: PreviousCustomer.businessID,
              name: PreviousCustomer.name,
              category1Name: PreviousCustomer.category1Name,
              category2Name: PreviousCustomer.category2Name,
              category3Name: PreviousCustomer.category3Name,
              className: PreviousCustomer.className,
              country: PreviousCustomer.country,
              nomDescription: PreviousCustomer.nomDescription,
              groupName: PreviousCustomer.groupName,
              value: PreviousCustomer.value,
              islive: PreviousCustomer.islive,
              isextract: PreviousCustomer.isextract,
              isstop: PreviousCustomer.isstop,
              VATCode: PreviousCustomer.VATCode,
              VATDescription: PreviousCustomer.VATDescription,
              allCustomer: PreviousCustomer.length,
              filterdatasource: CustomerSelect.filterdatasource,
              rowid:PreviousCustomer.id,
              index: prevIndex,
            };
          setTimeout(() => {
          
           dispatch(setselectCustomer(clickdata));
          }, 1000); 
         
  
            setTimeout(() => {
             
             setIsLoading(false);
            }, 2000); 
  
  
      }
  
    } else {
  
          if (CustomerSelect.rowid !== null && CustomerSelect.rowid !== undefined && CustomerSelect.rowid >= 0) {
  
          
            if (CustomerSelect.rowid === 0) {
              
            } else {
              
              setIsLoading(true);
  
      
              const prevProductRowId = CustomerSelect.rowid - 1;
  
          
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




  //////////////////////// Delete Customer ???????????????????????????//////////////////////////

  const handleSelectCustomerDelete = async () => {
		setShowConfirmSelectCustomerDelete(false);
		if (recordToDeleteSelectCustomerDelete) {
		  try {
			
			  const result = await deleteCustomerRecord( recordToDeleteSelectCustomerDelete )
			  if (result.error) {
			  } else {
				  if(result.data.E4kTblcustomerdelete.success===true){
					  toast.success('Customer has been inactivated',{
						position: "top-center",
						autoClose: 500,
						hideProgressBar: true,
					});
          
					// dispatch(setselectCustomer({}));
				  }else{
					  toast.error(result.data.E4kTblcustomerdelete.error,{
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: true,
					});
				  }
			  }
		  } catch (error) {
		  }
	  }
	  };


  const DeleteCustomer = () => {
	  
		if (CustomerSelect.businessid!== undefined && CustomerSelect.businessid !=='') {
	  
		  setRecordToDeleteSelectCustomerDelete({
			companyid: CustomerSelect.CompanyID,
			businessid: CustomerSelect.businessid,
		  });
		  setShowConfirmSelectCustomerDelete(true);
		  
	  
		}else{
		  toast.error('Please select a Customer to delete',{
			position: "top-center",
			autoClose: 500,
			hideProgressBar: true,
		  });
		}
	  
	  
	  };

  

    const [isMinimizededitProduct, setIsMinimizededitProduct] = useState(false);

    const handleMinimizeeditProduct = () => {
      setIsMinimizededitProduct(!isMinimizededitProduct);
    };

   


  
  return (
    <>
   <Draggable handle=".e4kmodal-header">
    {/* <div className={`modal fade ${showModalCustomerUpdate ? 'in' : ''}`} style={{ display: showModalCustomerUpdate ? 'block' : 'none' }}> */}
    <div className={`modal fade mymodal ${isMinimizededitProduct ? 'min min-createproduct-mainpopup-footerbar' : 'in mainpopup-footerbar'}`} style={{ display: showModalCustomerUpdate ? 'block' : 'none' }}>

      <div className={modalDialogclassName}>

      {/* <div className={modalDialogclassName}> */}
        <div className="modal-content">
                  <div className="large-popup-topdiv e4kmodal-header headercustomerupdatepage">
                  {/* <!------ popup for customer -------> */}
                    {/* <div className="breadcomb-area"> */}
                      <div className="">

                      <div className="container-fluid remove-padding">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="breadcomb-list">
                              <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                {/* <div className='popup-topbar-title'>
                                      {CustomerSelect.businessid} - {CustomerSelect.name}
                                  </div> */}
                                   {CustomerSelect.businessid ? (<div className="popup-topbar-title">
                                  {CustomerSelect.businessid} - {CustomerSelect.name}
                                </div>) :
                                  (
                                  <div className="popup-topbar-title">
                                    New Customer
                                  </div>
                                  
                                  )
                                }
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                  <div className="breadcomb-wp">

                                    <div className="breadcomb-ctn">
                                      {/* <span ><a href="#" id="sa-success" onClick={handlecreate} > <i className="fa fa-check"   ></i> Save</a> | </span> */}
                                      <span><a href="#" id="sa-success" onClick={handleSave}><i className="fa fa-check"></i> Save</a> | </span>
                                      <span><a href="#" id="sa-warning" onClick={DeleteCustomer}> <i className="fa fa-trash"></i> Delete</a> | </span>
                                      {/* <span><a href=""><i className="fa fa-pencil"></i> Edit</a> | </span> */}
                                      <span><a href="#" onClick={handleToggle}><FontAwesomeIcon icon={isColumn2Visible ? faChain : faChainBroken} /></a></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                  <div className='popup-top-rightdiv'>


                                  <button className="close modalMinimize" onClick={handleMinimizeeditProduct}>
                                  <i className={`fa ${isMinimizededitProduct ? 'fa-plus' : 'fa-minus'}`}></i>
                                  </button>

                                    <button type="button" className="btn-link" onClick={toggleMaximize}>
                                      {/* {isMaximized ?  : } */}
                                      {isMaximized ? <i className='fa fa-expand'></i>  :<i className='fa fa-compress'></i> }

                                    </button>


                                    <button type="button" className="close" onClick={handleCloseCustomerUpdate}>
                                      &times;
                                    </button>
                                    
                                  </div>
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
                            {/* Customer Name  */}
                            {CustomerSelect.businessid}-{CustomerSelect.name}
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
                                    <span><a href="#" onClick={handleopencustomerproductpricesetup}> <i className="fa fa-edit"></i> price setup</a> | </span>
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
                    <div id="customerupdate" className={isColumn2Visible ? 'col-md-9' : 'col-md-12'}>
                      <div className='mainpopup-left'>
                      <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#customerbusinessidupdate" aria-expanded="true" aria-controls="customerbusinessidupdate"><i className="plus-icon" aria-hidden="true"></i> CustomerID </a> 
                          </h4>
                            <div id="customerbusinessidupdate" className="collapse in" aria-expanded="true">
                             
                                <div className="panel-box-div">

                                  <div className="row">
 
                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                 <div className='input-lable'>
                                  <span>Customer ID</span>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                              <div className="form-group ">
                                <Input
                                    type="text"
                                    ref={ CustomerIdInputRef }
                                    disabled ={CustomerSelect.businessid ?  true :false }
                                    value= { CustomerSelect.businessid }
                                    placeholder="Customer Id"
                                    /> 
                                                                   
                             </div>
                              </div>                                   
                                </div>
                                </div>                            
                            </div>
                        </div>
                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a data-toggle="collapse" href="#customercreatepage" aria-expanded="false" aria-controls="customercreatepage" ><i className="plus-icon" aria-hidden="true"></i> General  </a> 
                          </h4>
                            <div id="customercreatepage" className="collapse" aria-expanded="false" >
                                <div className="panel-box-div">
                                  <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className='input-lable'>
                                  <span>Name</span>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className="form-group">                      
                                <Input
                                  placeholder="Name"
                                  ref={inputRefName}
                                  value={Customername}
                                  onChange={inputnamechange}
                                />
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
                                            ref={inputRefLive}
                                            id='TblCustomerLive'
                                            rightToLeft
                                            // checked={CustomerSelect.islive}
                                            //onChange={handleLiveSwitchChange}
                                            checked={live}
                                            onChange={changeLive}
                                          >
                                          </SwitchButton>

                                  
                                          </div>
                                      </div> 

                                       <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Extract</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <SwitchButton 
                                           ref = {inputRefiSextract} 
                                           id='TblCustomerExtract'
                                           rightToLeft
                                          //  checked = {CustomerSelect.isextract}
                                           checked={iSextract}
                                           onChange={changeIsExtract }
                                          //  onChange={handleExtractSwitchChange}
                                          ></SwitchButton>

                                          </div>
                                      </div> 

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span >Stop</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <SwitchButton 
                                           ref = {inputRefStop} 
                                           id='TblCustomerStop'
                                           rightToLeft
                                            checked={stop}
                                            onChange={changeStop}
                                          ></SwitchButton>

                                          </div>
                                      </div> 

                                      

                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className='input-lable'>
                                  <span>Nominal Code</span>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className="form-group master-option">
                                 
                                 
                                  <DropDownList 
                                    id="TblCustoomerNominalCode"
                                    ref={inputcustomernominal}
                                    // selectedIndexes={[0]} 
                                    filterable 
                                    placeholder="Select Nominal"
                                    dataSource={dataGridNominal.map(nom=>(nom.nomdescription))}
                                    // value={CustomerSelect.nomDescription || ''}
                                    value={nomDescription}
                                    onChange={handledefaultnominalchange}
                                    >
                                     
                                  </DropDownList>
                                  <span onClick={handleOpenModalMediumNominalAccount} class="master-option-span">...</span>
                                </div>
                              </div>

                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className='input-lable'>
                                  <span>Category1</span>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className="form-group master-option">
                                  <DropDownList 
                                    id="TblcustomerCategory1grid"
                                    ref={TblcustomerCategory1}
                                    // selectedIndexes={[0]} 
                                    filterable 
                                    placeholder="Select Category1"
                                    
                                    dataSource={dataGridCategory1.map(cat=>(cat.category1name))}
                                    // value={CustomerSelect.category1Name || ''}
                                    value={category1}
                                    onChange={category1change}
                    
                                    >  
                                  </DropDownList>
                                  <span onClick={handleOpenModalMediumCustomerCategory1} class="master-option-span">...</span>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className='input-lable'>
                                  <span>Category2</span>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className="form-group master-option">
                                  {/* <Input placeholder="Classification"></Input> */}
                                  <DropDownList 
                                    id="TblcustomerCategory2grid"
                                    ref={TblcustomerCategory2}
                                    // selectedIndexes={[0]} 
                                    filterable 
                                    placeholder="Select Category2"
                                    
                                    dataSource={dataGridCategory2.map(cat=>(cat.category2name))}
                                    // value={CustomerSelect.category2Name || ''}
                                    value={category2}
                                    onChange={category2change}
                                    >  
                                  </DropDownList>
                                  <span onClick={handleOpenModalMediumCustomerCategory2} class="master-option-span">...</span>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className='input-lable'>
                                  <span>Category3</span>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className="form-group master-option">
                                  {/* <Input placeholder="Classification"></Input> */}
                                  <DropDownList 
                                    id="TblcustomerCategory3grid"
                                    ref={TblcustomerCategory3}
                                    // selectedIndexes={[0]} 
                                    filterable 
                                    placeholder="Select Category3"
                                    
                                    dataSource={dataGridCategory3.map(cat=>(cat.category3name))}
                                    // value={CustomerSelect.category3Name || ''}
                                    value={category3}
                                    onChange={category3change}
                                    >  
                                  </DropDownList>
                                  <span onClick={handleOpenModalMediumCustomerCategory3} class="master-option-span">...</span>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className='input-lable '>
                                  <span>Class</span>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className="form-group master-option">
                                  <DropDownList 
                                  id="CustomerClassGrid"
                                  // selectedIndexes={[0]} 
                                  ref = {Tblcustomerclass}
                                  filterable 
                                  placeholder="Select class"
                                  dataSource={dataGritClass.map(cat=>(cat.className))}
                                  // value={CustomerSelect.className || ''}
                                  value={classs}
                                  onChange={classchange}
                                   >
                                </DropDownList>
                                  <span onClick={handleOpenModalMediumCustomerClass} class="master-option-span">...</span>
                                </div>
                              </div>

                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className='input-lable'>
                                  <span>Group</span>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className="form-group master-option">
                                  {/* <Input placeholder="Classification"></Input> */}
                                  <DropDownList 
                                    id="TblCustomerGroupGrid"
                                    // selectedIndexes={[0]} 
                                    ref = {Tblcustomergroup}
                                    filterable 
                                    placeholder="Select Group"
                                    dataSource={dataGritGroup.map(gr=>(gr.groupname))}
                                    // value={CustomerSelect.groupName  || ''}
                                    value={groups}
                                    onChange={groupchange}
                                    >
                                  </DropDownList>
                                <span onClick={handleOpenModalMediumGroup} class="master-option-span">...</span>
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
                                    id="TblCustomerCountryGrid"
                                    // selectedIndexes={[0]} 
                                    ref = {TblCountry}
                                    filterable 
                                    placeholder="Select Country"
                                    dataSource={dataGritCountry.map(Country => Country.country)}
                                    // value={CustomerSelect.country  || ''}
                                    value={country}
                                    onChange={changecountry}
                                    >
                                  </DropDownList>
                                  <span   onClick={handleOpenModalMediumCountry}  class="master-option-span">...</span>
                                </div>
                              </div>

                              </div>
                              </div>
                            </div>
                        </div>
                        

                       

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#addresscreatepage" aria-expanded="false" aria-controls="addresscreatepage"><i className="plus-icon" aria-hidden="true"></i> Address </a> 
                          </h4>
                            <div id="addresscreatepage" className="collapse" aria-expanded="false">
                              
                                <div className="panel-box-div">
                                  <>
                                  <E4kTblCustomerAddressTypesGrid/>
                                  </>                                                                    
                                </div>
                                 
                             
                            </div>
                        </div>

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#customertaxablereate" aria-expanded="false" aria-controls="customertaxablereate" 
                            // onClick={() => setAccountUpdateflag(!accountUpdateflag)}
                            ><i className="plus-icon" aria-hidden="true"></i> Taxable </a> 
                          </h4>
                            <div id="customertaxablereate" className="collapse" aria-expanded="false">
                             
                                <div className="panel-box-div">
                                 
                                 <div className='row'>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>VAT Payable</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                      

                                          <SwitchButton rightToLeft
                                          id='vatpayableswitches'
                                          ref = { inputRefVatpayable }
                                          // checked={customerData.length > 0 ? customerData[0].vatflag === "N" ? false :true : false}
                                          // onChange={handleSwitchChange}
                                          checked={VatFlag}
                                          onChange={hadlechangevatflag}
                                          />
                                         
                                        
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
                                      id="E4kVatCode"
                                      //selectedIndexes={[0]} 
                                      ref = { inputRefVatCode}
                                      filterable 
                                      placeholder="Select Vatcode"
                                      dataSource={dataGritVatCode.map(Vat=>(Vat.description))}
                                      // disabled={!isSwitchOn}
                                      // value={customerData.length > 0 ? customerData[0].vatcode : ''}
                                       value={VatCode}
                                       onChange={handlechangevatcode}
                                       disabled={!VatFlag}
 
                                      />
                                
                               
                                  <span onClick={handleOpenModalMediumVatCodes} class="master-option-span">...</span>
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
                                    // disabled={!isSwitchOn} 
                                    //value ={customerData.vatno || ''}
                                    ref = { inputRefVatNo}
                                    // value = {customerData.length > 0 ? customerData[0].vatno : ''}
                                    value={Vatcodeno}
                                     onChange={handlechangevatno}
                                     disabled={!VatFlag}
 
                                    />
                          
                                  
                                </div>
                              </div>

                            
                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className='input-lable'>
                                  <span>Currrency</span>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className="form-group master-option">

                                     <DropDownList 
                                     id="E4kCurrencygrid"
                                    //  selectedIndexes={[0]} 
                                     ref ={Tblcurrency}
                                     filterable 
                                     placeholder="Select Currency"
                                     dataSource={dataGritCurrency.map(Currency=>(Currency.currencyName))}
                                    //  value = {customerData.length > 0 ? customerData[0].currencyCode : ''}
                                    // value={customerData.currencyCode}
                                    value={Defaultcurrency}
                                    onChange={handlecurrencychange}
                                    disabled={!VatFlag}
 
                                     >
                                   </DropDownList>
                                
                                 
                                  <span   onClick={handleOpenModalMediumCurrency} class="master-option-span">...</span>
                                </div>
                              </div>
                                  
                                      </div>
                                </div>
                            
                            </div>
                        </div>
                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#customerpaymentcreate" aria-expanded="false" aria-controls="customerpaymentcreate" 
                            // onClick={() => setAccountUpdateflag(!accountUpdateflag)}
                              ><i className="plus-icon" aria-hidden="true"></i> Payment Terms </a> 
                          </h4>
                            <div id="customerpaymentcreate" className="collapse" aria-expanded="false">
                             
                                <div className="panel-box-div">
                                  <div className='row'>

                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                      <div className='input-lable'>
                                          <span>Payment Term</span>
                                      </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                      <div className="form-group master-option">
                                       
                                       
                                          <DropDownList
                                          id="E4kPaymentTerms"
                                          // selectedIndexes={[0]} 
                                          ref ={PaymentRef}
                                          filterable 
                                          placeholder="Select Payment Term" 
                                          dataSource={dataPaymentterms.map(Payment=>(Payment.description))}
                                          // value = {customerData.length > 0 ? customerData[0].paymenttermsid : ''}
                                          value={Paymenttermsdata}
                                          onChange={changepaymentTerms}
                                          
                                          />
                                        <span onClick={handleOpenModalMediumPaymentterms} class="master-option-span">...</span>

                                      </div>
                                    </div>

                                  </div>  
                                </div>
                              
                            </div>
                        </div>

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#customerdiscountscreate" aria-expanded="false" aria-controls="customerdiscountscreate" 
                            // onClick={() => setAccountUpdateflag(!accountUpdateflag)}
                            ><i className="plus-icon" aria-hidden="true"></i> Discounts </a> 
                          </h4>
                            <div id="customerdiscountscreate" className="collapse" aria-expanded="false">
                             
                                <div className="panel-box-div">
                                  <div className='row'>

                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>Discount %</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                 

                                      
                                            
                                            <NumberInput placeholder="Discount" 
                                            ref={inputRefDiscount}
                                            numberFormat={{
                                              minimumFractionDigits: 2// Optional: This ensures 2 decimal places
                                          }}
                                          // max={100} // This corresponds to 100% (since the input works with decimals)
                                          min={0}
                                          value={DiscountData}
                                          onChange={handlechangeDiscount}
                                           
                                            />
                                        
                                            
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className='input-lable'>
                                  <span>Credit Limit % </span>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                <div className="form-group">
                             
                                    <NumberInput
                                      placeholder="Credit Limit (%)"
                                      id="percentInput"
                                      ref={inputRefCreditLimit}
                                      numberFormat={{
                                        minimumFractionDigits : 2,
                                    }}
                                    // max={100} 
                                    min={0}
                                     // value={customerData.creditLimit|| ''}
                                    //  value = {customerData.length > 0 ? customerData[0].creditLimit : ''}
                                    value={CreditLimitData}
                                    onChange={handleCreditLimitChange}
                                       
                                   
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
                                 
                                <DateInput 
                                    format="MM/DD/YYYY" 
                                    placeholder="Date Opened"
                                    ref={inputRefDateOpened}
                                    // value={dateOpened}
                                    value={DateOpenedData}
                                    onChange={handleDateChange}
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
                                 
                                <DateInput 
                                     format="MM/DD/YYYY" 
                                     placeholder="Date Used"
                                    //  value={customerData.dateUsed ? new Date(customerData.dateUsed).toLocaleDateString('en-GB') : ''}
                                    // value = {dateUsed}
                                     value={DateUsedData}
                                     onChange={handleDateUsedChange}
                                     ref={inputRefDateUsed}
                                     />
            
                                </div>
                              </div>

                            {/* </div> */}
                              </div> 
                            </div>
                              
                            </div>
                        </div>

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#customerrepcreate" aria-expanded="false" aria-controls="customerrepcreate" 
                            // onClick={() => setAccountUpdateflag(!accountUpdateflag)}
                            ><i className="plus-icon" aria-hidden="true"></i> Rep </a> 
                          </h4>
                            <div id="customerrepcreate" className="collapse" aria-expanded="false">
                             
                                <div className="panel-box-div">
                                  <div className='row'>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Rep</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                          
                                               <DropDownList 
                                               id="E4kSalesPeople"
                                              //  selectedIndexes={[0]} 
                                               ref ={RepRef}
                                               filterable 
                                               placeholder="Select Rep"
                                              //  dataSource={dataCustomerSales.map(Sales=>(Sales.forename))} 
                                               dataSource={dataCustomerSales.map(sales => `${sales.forename} ${sales.surname}`)}
                                              value={RepData}
                                              onChange={handleRepChange}
                                               >
                                             </DropDownList>
                                            <span onClick={handleOpenModalMediumBusRep} className="master-option-span">...</span>
                                          </div>
                                      </div> 
                                    </div>
                                    <div className='row'>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>Rep Comission </span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                            <NumberInput placeholder="Rep Comission"
                                            ref={repCommissionRef}
                                            numberFormat={{
                                            
                                              minimumFractionDigits: 2
                                              
                                           }}
                                          //  max={100} 
                                           min={0}
                                          // value = {customerData.length > 0 ? customerData[0].repComission : ''}
                                           value={RepCommissionData}
                                           onChange={handleRepCommissionChange}
                                            />
                                        </div>
                                      </div>
                                      </div>
                                </div>
                              
                            </div>
                        </div>  

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#customerparametersetting" aria-expanded="false" aria-controls="customerparametersetting"><i className="plus-icon" aria-hidden="true"></i>Customer Parameter settings </a> 
                          </h4>
                            <div id="customerparametersetting" className="collapse" aria-expanded="false">
                             
                                <div className="panel-box-div">
                                  
                              
                                      <>
                                      <E4kTblCustomerParametersettingGrid/>
                                      </>
                                      
                                      
                                </div>
                                
                             
                            </div>
                        </div>
                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#customernotes" aria-expanded="false" aria-controls="customernotes"><i className="plus-icon" aria-hidden="true"></i> Note </a> 
                          </h4>
                            <div id="customernotes" className="collapse" aria-expanded="false">
                             
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
                                          id = 'customernotes'
                                          placeholder="Notes" 
                                          ref={NoteRef} 
                                          value={customerNotechange}
                                          // value={customerNotechange}
                                          onChange={handlecustomernotechange}
                                          ></TextArea> 


                                        

                                  </div> 
                                </div>
                                
                             
                            </div>
                        </div>


                       </div>
                      </div>
                      </div>
                      </div>
                      

                      <div id="customercolumnpopup2" className="col-md-3 col-xs-12" style={{ display: isColumn2Visible ? 'block' : 'none' }}>

                        <div className="mainpopup-right">
                          <div className="contact-list">
                            <div className="contact-img">
                              {/* <img src="assets/images/user.png" alt=""/> */}
                              {CustomerSelect.value && !showUploader ? (
                            <div className="image-container">
                            <img src={CustomerSelect.value}  ref={imageref} alt="Selected Customer Logo" onClick={handleImageClick} />
                           
                            </div>
                        ) : (
                          <div className="image-container">
                          <img id="displayImage" src={imageSrc} alt="Selected Image" />
                          <input type="file" id="imageUpload" accept="image/*" onChange={handleImageChange} />
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
                                {/* <h4>Customer Name</h4> */}
                                <h4>{CustomerSelect.name}</h4>
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
                                       <span>Total Turnover </span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                    <a>${totalTurnover}</a>

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

                 { (CustomerSelect?.filterdatasource)?.length === 1 ? (null) : 
                    (CustomerSelect?.index === 0) ? (null) : 
                    (CustomerSelect.rowid === 0) ? (null) : (
                    <a href="#" onClick={handlePreviousCustomerData}>
                      <div className="largerpup-navleft">
                        <BsChevronLeft />
                      </div>
                  //  </a>

                )}



            { 
              (CustomerSelect?.filterdatasource?.length === 1 || 
              CustomerSelect?.index === CustomerSelect.allCustomer - 1 || 
              CustomerSelect?.rowid === CustomerSelect.allCustomer - 1) 
                ? null 
                : (
                  <a href="#nextcustomer" onClick={() => NextDateforCustomer()}>
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



                  {showConfirmSelectCustomerDelete && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmSelectCustomerDelete(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to inactive this Customer?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmSelectCustomerDelete(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleSelectCustomerDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}

            
      <div className='popup-tab-footerbar'>
            <E4kTblNominalAccountGrid
        showModalMediumNominalAccount={showModalMediumNominalAccount}
        handleCloseMediumNominalAccount={handleCloseModalMedium4}
        
      />

       <E4kTblCustomerCategory1Grid
        showModalMediumCustomerCategory1={showModalMediumCustomerCategory1}
        handleCloseMediumCustomerCategory1={handleCloseModalMedium}
      />
        <E4kTblCustomerCategory2Grid
        showModalMediumCustomerCategory2={showModalMediumCustomerCategory2}
        handleCloseMediumCustomerCategory2={handleCloseModalMedium1}
      />

       <E4kTblCustomerCategory3Grid
        showModalMediumCustomerCategory3={showModalMediumCustomerCategory3}
        handleCloseMediumCustomerCategory3={handleCloseModalMedium3}
      />

      <E4kTblCurrencyGrid showModalMediumCurrency={showModalMediumCurrency} handleCloseMediumCurrency={handleCloseModalMedium9} /> 

      <E4kCountryGrid showModalMediumCountry={showModalMediumCountry} handleCloseMediumCountry={handleCloseModalMedium7} />

      <E4kTblAccVatCodesGrid showModalMediumVatCodes ={showModalMediumVatCodes} handleCloseMediumVatCodes ={handleCloseModalMedium11} />

      <E4kCustomerClassGrid
        showModalMediumCustomerClass={showModalMediumCustomerClass}
        handleCloseMediumCustomerClass={handleCloseModalMedium5}
      />

      <E4kTblCustomerGroupGrid showModalMediumCustomerGroup={showModalMediumGroup} handleCloseMediumCustomerGroup={handleCloseModalMedium6} />
      {showModalMediumCustomerPriceProductMatrix &&(
         <E4kTblCustomerPriceProductRelateMatrix1
         showModalMediumCustomerPriceProductMatrix= {showModalMediumCustomerPriceProductMatrix}
         handleCloseMediumCustomerPriceProductMatrix={handleCloseMediumCustomerPriceProductMatrix}/>

      )}
     


      <E4kTblbusRepGrid
       showModalMediumBusRep={showModalMediumBusRep}
       handleCloseMediumBusRep={handleCloseModalMediumBusRep}
      
      />

      <E4kPaymentterms
        showModalMediumPaymentterms={showModalMediumPaymentterms}
        handleCloseMediumPaymentterms={handleCloseModalMediumPaymentterms}
      />

     

{showModalAddressPage && (
        <E4kTblCustomerAddressPage
          showModalAddressPage={showModalAddressPage}
          handleCloseAddressPage={handleCloseAddressPage}
          businessid={CustomerSelectCustomerGrid.businessid } 
          selectedAddressTypeId={addressSelect.addressTypeId} 
		  SelectedDescripton = {addressSelect.adresstype}
        />
      )}




{showModalContactOpen &&(
			<E4kTblCustomerContactPage
			showModalContactOpen = {showModalContactOpen}
			handleCloseContact ={handleCloseContact}
			SelectedDescripton = {addressSelect.adresstype}
			/>


		   )} 
 
       
    
      
              
            </div> 

              
            </div>
          

          {/* </ResizableBox> */}
          </div>
      </Draggable>
      
     
    </>
  );
};

export default E4kTblCustomerUpdate;