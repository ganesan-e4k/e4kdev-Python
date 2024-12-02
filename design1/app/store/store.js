import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import dataReducer from './slices/productSlice';
import dataProductReducer from './slices/allproductSlice';
import selectProductReducer from './slices/e4kTblProductSelectSlice';
import selectProductAddPropertyReducer from './slices/e4kTblProductPropertyAddSelect';
import selectProductAddPropertyColourReducer from './slices/e4kTblProductPropertyColourSelect'
import selectProductAddPropertySizeReducer from './slices/e4kTblProductPropertySizeRangeSelect'
import selectProductAddPropertyFitReducer from './slices/e4kTblProductPropertyFItSelect'
import selectProductSalesPeopleAddReducer from './slices/e4kTblProductSalesPeopleAdd';
import selectProductAddPropertyTypeValuesReducer from './slices/e4kTblProductProductPropertyTypeValues';
import selectNonLiveProductReducer from './slices/e4kTblnonliveproduct';
import TblCompanyIDSliceReducer from './slices/e4kTblCompany';
//import propertylevelresetReducer from './slices/e4kTblProductPropertyLevelResetState';
/////////////////////////// Customer
import selectCustomerReducer from './slices/customer/e4kTblCustomerSliceSelect';
import selectNonLiveCustomerReducer from './slices/customer/e4kTblnNonLiveCustomer';
import CustomerSelectAddressReducer from './slices/customer/e4kTblCustomerSelectAddress';
import CustomerSelectContactReducer from './slices/customer/e4kTblCustomerSelectContact';
import CustomeraddressDataReducer from './slices/customer/e4kTblCustomeraddressDataSlice';
import tblcustomerSelectedAddressReducer from './slices/customer/e4kTblCustomerSelectedAddressSlice';


import uploadNewProductImageReducer from './slices/e4kTblProductProductUploadImage';
import {e4kTblProductCategory1} from './services/e4kTblProductCategory1'
import {e4kTblProductCategory2} from './services/e4kTblProductCategory2';
import {e4kTblProductCategory3} from './services/e4kTblProductCategory3';
import {e4kTblProductClass} from './services/e4kTblProductClass';
import {e4kTblProductCommodityCode} from './services/e4kTblProductCommodityCode';
import {e4kTblProductObsoleteTypes} from './services/e4kTblProductObsoleteTypes';
import {e4kTblProductPriceTypes} from './services/e4kTblProductPriceTypes';
import {e4kTblProductPropertyTypes} from './services/e4kTblProductPropertyTypes';
import {e4kTblProductStockingTypes} from './services/e4kTblProductStockingTypes';
import {e4kTblProductTypeOfIssue} from './services/e4kTblProductTypeOfIssue';
import {e4kTblProductUnitOfIssue} from './services/e4kTblProductUnitOfIssue';
import {e4kTblProductColours} from "./services/e4kTblProductColours";
import {e4kTblProductSizeRanges} from "./services/e4kTblProductSizeRanges";
import {e4kTblProductFits} from "./services/e4kTblProductFits";
import {e4kTblProductSizeRangeValuesBulk} from "./services/e4kTblProductSizeRangesValuesBulk";
import {e4kTblProductNew} from './services/e4kTblProduct'
import {e4kTblProductPropertiesSelectAPI} from './services/e4kTblProductPropertiesSelectAPI'
import {e4kTblProductPropertiesValuesSelectAPI} from './services/e4kTblProductPropertiesValuesSelectAPI';
import {e4kTblProductPropertiesLevelColMatrix} from './services/e4kTblProductProductPropertiesLevelColMatrix';
import {e4kTblProductStockingLevelMatrix} from './services/e4kTblProductStockingLevelMatrixAPI';
import {e4kTblProductStandardPriceMatrix} from './services/e4kTblProductStandardPriceMatrixAPI';
import {e4kTblProductStandardCostMatrix} from './services/e4kTblProductStandardCostMatrixAPI';
import {e4kTblProductStockingTypeMatrix} from './services/e4kTblProductStockingTypeMatrixAPI';
import {e4kTblWhoWarehouses} from './services/e4kTblWhoWarehousesAPI';
import {e4kTblProductProductPropertiesLevel} from './services/e4kTblProductProductPropertyLevelAPI';
import {e4kTblProductProductPropertiesLevelTypesAPI} from './services/e4kTblProductPropertyLevelTypesGetAPI';
import {e4kTblProductProductRepsAPI} from './services/e4kTblProductProductReps';
import {e4kTblProductPropertyTypesValues} from './services/e4kTblProductPropertyTypesValues';
import {e4kTblCustomerAll} from './services/e4kTblCustomer';
import {e4kTblSupplierAll} from './services/e4kTblSupplier';
import {e4kTblProductParameterSettings} from './services/e4kTblProductParameterSettings';
import {e4kTblProductSupplierLevelSettings} from './services/e4kTblProductSupplierLevelSettings';

////////////// Customer Master Imports Functions
import {e4kTblcustomercategory1} from './services/Customer/e4kTblcustomercategory1'
import {e4kTblCustomerCategory2} from './services/Customer/e4kTblCustomerCategory2'
import {e4kTblCustomerCategory3} from './services/Customer/e4kTblCustomerCategory3';
import {e4kcustomerClass} from './services/Customer/e4kcustomerClass';
import {e4kTblNominalAccount} from './services/Customer/e4kTblNominalAccount';
import {e4kTblCustomerGroup} from './services/Customer/e4kTblCustomerGroup';
import {e4kTblCountry} from './services/Customer/e4kTblCountry';
import {e4kTblCurrency} from './services/Customer/e4kTblCurrency';
import {e4kTblVatcode} from './services/Customer/e4kTblVatcode';
import {e4kTblCustomer} from './services/Customer/e4kTblCustomer';
import {e4kTblcustomeraccountApi} from './services/Customer/e4kTblcustomeraccountApi';

import {e4kTblbuspaymentterms} from './services/Customer/e4kTblbuspaymentterms';
import {e4kTblbussalespeople} from './services/Customer/e4kTblbussalespeople';
import {e4kCustomerSettingsApi} from './services/Customer/e4kCustomerSettingsApi';
import {e4kTblcustomerAddresstypeApi} from './services/Customer/e4kTblcustomerAddresstypeApi';
import {e4ktblAddressTypes} from './services/Customer/e4ktTblAddresstype';


///////////////////////////////////// Supplier master table api
import {e4kTblsuppliercategory1} from './services/Supplier/e4kTblsuppliercategory1';
import {e4kTblsuppliercategory2} from './services/Supplier/e4kTblsuppliercategory2';
import {e4kTblsuppliercategory3} from './services/Supplier/e4kTblsuppliercategory3';
import {e4ksupplierclassApi} from './services/Supplier/e4ksupplierclassApi';
import {e4kTblSupplierlist} from './services/Supplier/e4kTblSupplierlist';
import {e4kTblSupplierSettings} from './services/Supplier/e4kTblsuppliersettings';
import {e4kTblsupplierAccount} from './services/Supplier/e4kTblsupplieraccount';
import {e4kTblsupplieraddresstype} from './services/Supplier/e4kTblsupplieraddresstypelist';



//////////////////////// supplier slice /////////////
import supplierSelectReducer from './slices/supplier/e4ksupplierSelectSlice';
import selectedSupplieraddresstypesReducer from './slices/supplier/e4kselectedSupplieraddresstypes';
import selectedsupplierContactReducer from './slices/supplier/e4kselectedsupplierContact';
import SelectedsupplierAddressContactReducer from './slices/supplier/e4kSelectedsupplierAddressContact';
import SupplierContactAddressReducer from './slices/supplier/e4kSupplierContactAddressSlice';
import suppliercontactlistReducer from './slices/supplier/e4ksuppliercontactlistselectionSlice';


//import {e4kTblProductSizeRangeValues} from "./services/e4kTblProductSizeRangeValues";


export const store = configureStore({
  reducer: {
    data: dataReducer,
    dataProduct: dataProductReducer,
    selectProduct: selectProductReducer,
    SelectNewProductImage:uploadNewProductImageReducer,
    selectProductAddProperty: selectProductAddPropertyReducer,
    selectProductAddPropertyColour: selectProductAddPropertyColourReducer,
    selectProductAddPropertySize: selectProductAddPropertySizeReducer,
    selectProductAddPropertyFit: selectProductAddPropertyFitReducer,
    selectProductSalesPeopleAdd : selectProductSalesPeopleAddReducer,
    selectProductAddPropertyTypesValues :selectProductAddPropertyTypeValuesReducer,
    selectNonLiveProduct: selectNonLiveProductReducer,
    selectCompanyid:TblCompanyIDSliceReducer,

    ////////////////// Customer select store
    selectCustomer : selectCustomerReducer,
    selectNonLiveCustomer : selectNonLiveCustomerReducer,
    selectCustomerAddress : CustomerSelectAddressReducer,
    selectCustomerContact : CustomerSelectContactReducer,
    selectCustomerAddressData: CustomeraddressDataReducer,
    tblselectCustomerSelectedAddress:tblcustomerSelectedAddressReducer,
    suppliercontactlist: suppliercontactlistReducer,

    
    //////////////// supplier select store ////////////
    supplierSelect: supplierSelectReducer,
    Supplieraddresstypes:selectedSupplieraddresstypesReducer,
    selectedsupplierContact: selectedsupplierContactReducer,
    SelectedsupplierAddressContact: SelectedsupplierAddressContactReducer,
    SupplierContactAddress: SupplierContactAddressReducer,

    //propertylevelreset: propertylevelresetReducer,
    [e4kTblProductCategory1.reducerPath]: e4kTblProductCategory1.reducer,
    [e4kTblProductCategory2.reducerPath]: e4kTblProductCategory2.reducer,
    [e4kTblProductCategory3.reducerPath]: e4kTblProductCategory3.reducer,
    [e4kTblProductClass.reducerPath]: e4kTblProductClass.reducer,
    [e4kTblProductCommodityCode.reducerPath]: e4kTblProductCommodityCode.reducer,
    [e4kTblProductObsoleteTypes.reducerPath]: e4kTblProductObsoleteTypes.reducer,
    [e4kTblProductPriceTypes.reducerPath]: e4kTblProductPriceTypes.reducer,
    [e4kTblProductPropertyTypes.reducerPath]: e4kTblProductPropertyTypes.reducer,
    [e4kTblProductStockingTypes.reducerPath]: e4kTblProductStockingTypes.reducer,
    [e4kTblProductTypeOfIssue.reducerPath]: e4kTblProductTypeOfIssue.reducer,
    [e4kTblProductUnitOfIssue.reducerPath]: e4kTblProductUnitOfIssue.reducer,
    [e4kTblProductColours.reducerPath]: e4kTblProductColours.reducer,
    [e4kTblProductSizeRanges.reducerPath]: e4kTblProductSizeRanges.reducer,
    [e4kTblProductFits.reducerPath]: e4kTblProductFits.reducer,
    [e4kTblProductSizeRangeValuesBulk.reducerPath]: e4kTblProductSizeRangeValuesBulk.reducer,
    [e4kTblProductNew.reducerPath]: e4kTblProductNew.reducer,
    [e4kTblProductPropertiesSelectAPI.reducerPath]: e4kTblProductPropertiesSelectAPI.reducer,
    [e4kTblProductPropertiesValuesSelectAPI.reducerPath]: e4kTblProductPropertiesValuesSelectAPI.reducer,
    [e4kTblProductPropertiesLevelColMatrix.reducerPath]: e4kTblProductPropertiesLevelColMatrix.reducer,
    [e4kTblProductStockingLevelMatrix.reducerPath]: e4kTblProductStockingLevelMatrix.reducer,
    [e4kTblProductStandardPriceMatrix.reducerPath]: e4kTblProductStandardPriceMatrix.reducer,
    [e4kTblProductStandardCostMatrix.reducerPath]: e4kTblProductStandardCostMatrix.reducer,
    [e4kTblProductStockingTypeMatrix.reducerPath]: e4kTblProductStockingTypeMatrix.reducer,
    [e4kTblWhoWarehouses.reducerPath]: e4kTblWhoWarehouses.reducer,
    [e4kTblProductProductPropertiesLevel.reducerPath]: e4kTblProductProductPropertiesLevel.reducer,
    [e4kTblProductProductPropertiesLevelTypesAPI.reducerPath]: e4kTblProductProductPropertiesLevelTypesAPI.reducer,
    [e4kTblProductProductRepsAPI.reducerPath]: e4kTblProductProductRepsAPI.reducer,
    [e4kTblProductPropertyTypesValues.reducerPath]: e4kTblProductPropertyTypesValues.reducer,
    [e4kTblCustomerAll.reducerPath]: e4kTblCustomerAll.reducer,
    [e4kTblSupplierAll.reducerPath]: e4kTblSupplierAll.reducer,
    [e4kTblProductParameterSettings.reducerPath]: e4kTblProductParameterSettings.reducer,
    [e4kTblProductSupplierLevelSettings.reducerPath]: e4kTblProductSupplierLevelSettings.reducer,

    ///////////////// Customer Store and methods
    [e4kTblcustomercategory1.reducerPath]: e4kTblcustomercategory1.reducer,
    [e4kTblCustomerCategory2.reducerPath]: e4kTblCustomerCategory2.reducer,
    [e4kTblCustomerCategory3.reducerPath]: e4kTblCustomerCategory3.reducer,
    [e4kcustomerClass.reducerPath]: e4kcustomerClass.reducer,
    [e4kTblNominalAccount.reducerPath]: e4kTblNominalAccount.reducer,
    [e4kTblCustomerGroup.reducerPath]: e4kTblCustomerGroup.reducer,
    [e4kTblCountry.reducerPath]: e4kTblCountry.reducer,
    [e4kTblCurrency.reducerPath]: e4kTblCurrency.reducer,
    [e4kTblVatcode.reducerPath]: e4kTblVatcode.reducer,
    [e4kTblCustomer.reducerPath]: e4kTblCustomer.reducer,
    [e4kTblcustomeraccountApi.reducerPath]: e4kTblcustomeraccountApi.reducer,
    [e4kTblbuspaymentterms.reducerPath]: e4kTblbuspaymentterms.reducer,
    [e4kTblbussalespeople.reducerPath]: e4kTblbussalespeople.reducer,
    [e4kCustomerSettingsApi.reducerPath]: e4kCustomerSettingsApi.reducer,
    [e4kTblcustomerAddresstypeApi.reducerPath]: e4kTblcustomerAddresstypeApi.reducer,
    [e4ktblAddressTypes.reducerPath] : e4ktblAddressTypes.reducer,
    
    //////////////////////////////// supplier store method
    [e4kTblsuppliercategory1.reducerPath]: e4kTblsuppliercategory1.reducer,
    [e4kTblsuppliercategory2.reducerPath]: e4kTblsuppliercategory2.reducer,
    [e4kTblsuppliercategory3.reducerPath]: e4kTblsuppliercategory3.reducer,
    [e4ksupplierclassApi.reducerPath]: e4ksupplierclassApi.reducer,
    [e4kTblSupplierlist.reducerPath]: e4kTblSupplierlist.reducer,
    [e4kTblSupplierSettings.reducerPath]: e4kTblSupplierSettings.reducer,
    [e4kTblsupplierAccount.reducerPath] :e4kTblsupplierAccount.reducer,
    [e4kTblsupplieraddresstype.reducerPath]: e4kTblsupplieraddresstype.reducer,
   
    
   
 
   
  
    
    
   


    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(e4kTblProductCategory1.middleware).
    concat(e4kTblProductCategory2.middleware).
    concat(e4kTblProductCategory3.middleware).
    concat(e4kTblProductClass.middleware).
    concat(e4kTblProductCommodityCode.middleware).
    concat(e4kTblProductObsoleteTypes.middleware).
    concat(e4kTblProductPriceTypes.middleware).
    concat(e4kTblProductPropertyTypes.middleware).
    concat(e4kTblProductStockingTypes.middleware).
    concat(e4kTblProductTypeOfIssue.middleware).
    concat(e4kTblProductUnitOfIssue.middleware).
    concat(e4kTblProductColours.middleware).
    concat(e4kTblProductSizeRanges.middleware).
    concat(e4kTblProductFits.middleware).
    concat(e4kTblProductSizeRangeValuesBulk.middleware).
    concat(e4kTblProductNew.middleware).
    concat(e4kTblProductPropertiesSelectAPI.middleware).
    concat(e4kTblProductPropertiesValuesSelectAPI.middleware).
    concat(e4kTblProductPropertiesLevelColMatrix.middleware).
    concat(e4kTblProductStockingLevelMatrix.middleware).
    concat(e4kTblProductStandardPriceMatrix.middleware).
    concat(e4kTblProductStandardCostMatrix.middleware).
    concat(e4kTblProductStockingTypeMatrix.middleware).
    concat(e4kTblWhoWarehouses.middleware).
    concat(e4kTblProductProductPropertiesLevel.middleware).
    concat(e4kTblProductProductPropertiesLevelTypesAPI.middleware).
    concat(e4kTblProductProductRepsAPI.middleware).
    concat(e4kTblProductPropertyTypesValues.middleware).
    concat(e4kTblCustomerAll.middleware).
    concat(e4kTblSupplierAll.middleware).
    concat(e4kTblProductParameterSettings.middleware).
    concat(e4kTblProductSupplierLevelSettings.middleware).
    //////////////////////////// Customer middleware //////////////////////////
    concat(e4kTblcustomercategory1.middleware).
    concat(e4kTblCustomerCategory2.middleware).
    concat(e4kTblCustomerCategory3.middleware).
    concat(e4kcustomerClass.middleware).
    concat(e4kTblNominalAccount.middleware).
    concat(e4kTblCustomerGroup.middleware).
    concat(e4kTblCountry.middleware).
    concat(e4kTblCurrency.middleware).
    concat(e4kTblVatcode.middleware).
    concat(e4kTblCustomer.middleware).
    concat(e4kTblcustomeraccountApi.middleware).
    concat(e4kTblbuspaymentterms.middleware).
    concat(e4kTblbussalespeople.middleware).
    concat(e4kCustomerSettingsApi.middleware).
    concat(e4kTblcustomerAddresstypeApi.middleware).
    concat(e4ktblAddressTypes.middleware).
    /////////////////////////////////////supplier middleware

    concat(e4kTblsuppliercategory1.middleware).
    concat(e4kTblsuppliercategory2.middleware).
    concat(e4kTblsuppliercategory3.middleware).
    concat(e4ksupplierclassApi.middleware).
    concat(e4kTblSupplierlist.middleware).
    concat(e4kTblSupplierSettings.middleware).
    concat(e4kTblsupplierAccount.middleware).
    concat(e4kTblsupplieraddresstype.middleware),

 
  
  
});

setupListeners(store.dispatch);
