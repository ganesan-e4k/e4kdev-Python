"use client";
import Link from 'next/link';
import { useEffect, useState,useRef  } from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore,faChain, faChainBroken } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'smart-webcomponents-react/input';
import { NumberInput } from 'smart-webcomponents-react/numberinput';
import { DropDownList} from 'smart-webcomponents-react/dropdownlist';
import { SwitchButton } from 'smart-webcomponents-react/switchbutton';
import { TextArea } from 'smart-webcomponents-react/textarea';
import { toast } from 'react-toastify';
import Draggable from 'react-draggable';
import { BsInfoCircleFill,BsInfoCircle,BsGraphUpArrow   } from "react-icons/bs";
import { FcBullish } from "react-icons/fc";
import { FaWarehouse } from "react-icons/fa6";


import { useGetProductCategories1Query} from '../../store/services/e4kTblProductCategory1';
import {useGetProductCategories2Query} from '../../store/services/e4kTblProductCategory2';
import {useGetProductCategories3Query} from '../../store/services/e4kTblProductCategory3';
import {useGetProductClassQuery} from '../../store/services/e4kTblProductClass';
import {useGetProductObsoleteTypesQuery} from '../../store/services/e4kTblProductObsoleteTypes';
import {useGetProductTypeOfIssueQuery} from '../../store/services/e4kTblProductTypeOfIssue';
import {useGetProductUnitOfIssueQuery} from '../../store/services/e4kTblProductUnitOfIssue';
import {useGetProductStockingTypesQuery} from '../../store/services/e4kTblProductStockingTypes';
import {useGetProductCommodityCodeQuery} from '../../store/services/e4kTblProductCommodityCode';

import {useGetCountriesQuery} from '../../store/services/Customer/e4kTblCountry';
import {useGetNominalAccountsQuery} from '../../store/services/Customer/e4kTblNominalAccount';

import {useSearchProductidQuery,
        useCreateProductMutation,
        useUpdateProductMutation,
        useDeleteProductMutation
      } 
from '../../store/services/e4kTblProduct';

import {setSelectProduct} from '../../store/slices/e4kTblProductSelectSlice';

import { 
  resetSelectProductPropertySize } from '../../store/slices/e4kTblProductPropertySizeRangeSelect';

  import { 
  
    resetSelectProductPropertyTypesValues 
  } from '../../store/slices/e4kTblProductProductPropertyTypeValues';

  import {
    resetSelectProductPropertyColour} from '../../store/slices/e4kTblProductPropertyColourSelect'

  import {  
    resetSelectProductSalesPeople
} from '../../store/slices/e4kTblProductSalesPeopleAdd';

import { 
  resetSelectProductProperty ,
  
} from '../../store/slices/e4kTblProductPropertyAddSelect';

import E4kTblProductCategory1Grid from '../../master/productCategory1/E4kTblProductCategory1Grid';
import E4kTblProductCategory2Grid from '../../master/productCategory2/E4kTblProductCategory2Grid';
import E4kTblProductCategory3Grid from '../../master/productCategory3/E4kTblProductCategory3Grid';
import E4kTblProductClassGrid from '../../master/productClass/E4kTblProductClassGrid';
import E4kTblProductObsoleteTypesGrid from '../../master/productObsoleteTypes/E4kTblProductObsoleteTypesGrid';
import E4kTblProductTypeOfIssueGrid from '../../master/productTypeOfIssue/E4kTblProductTypeOfIssueGrid';
import E4kTblProductUnitOfIssueGrid from '../../master/productUnitOfIssue/E4kTblProductUnitOfIssueGrid';
import E4kTblProductStockingTypesGrid from '../../master/productStockingTypes/E4kTblProductStockingTypesGrid';
import E4kTblProductCommodityCodeGrid from "../../master/productCommodityCode/E4kTblProductCommodityCodeGrid"
import E4kCountryGrid from '../../master/customerCountry/E4kCountryGrid';
import E4kTblNominalAccountGrid from '../../master/nominalAccount/E4kTblNominalAccountGrid';


import ImageUploader from '../../customComponents/imageUploader';
import E4kTblProductPropertyTypesGrid from "../../master/productPropertyTypes/E4kTblProductPropertyTypesGrid";
import E4kTblProductColoursGrid from '../../master/productColours/E4kTblProductColoursGrid';
import E4kTblProductSizeRangesGrid from '../../master/productSizeRanges/E4kTblProductSizeRangesGrid';
import E4kTblProductFitsGrid from "../../master/productFits/E4kTblProductFitsGrid";
import E4kTblProductPropertiesStockingLevelMatrix from '../productRelatables/E4kTblProductPropertiesStockingLevelMatrix';
import E4kTblProductPropertiesStandardPriceMatrix from '../productRelatables/E4kTblProductPropertiesStandardPriceMatrix';
import E4kTblProductPropertiesStandardCostMatrix from '../productRelatables/E4kTblProductPropertiesStandardCostMatrix';
import E4kTblProductPropertiesStockingTypeMatrix from '../productRelatables/E4kTblProductPropertiesStockingTypeMatrix';
import E4kTblProductPropertiesLevelSetMatrix from '../productRelatables/E4kTblProductPropertiesLevelSetMatrix';
import E4kTblProductPropertiesCustomerPriceMatrix from '../productRelatables/E4kTblProductPropertiesCustomerPriceMatrix';
import E4kTblProductPropertiesSupplierCostMatrix from '../productRelatables/E4kTblProductPropertiesSupplierCostMatrix';
import E4kTblBusSalesPeopleGrid from '../../master/salesPeople/E4kTblBusSalesPeopleGrid';
import E4kTblProductPropertiesPriceComparisonMatrix from '../productRelatables/E4kTblProductPropertiesPriceComparisonMatrix';
import E4kTblProductPropertyTypesValuesGrid from '../../master/productPropertyTypesValues/E4kTblProductPropertyTypesValuesGrid';
import E4kTblProductPropertiesObsoleteTypeMatrix from '../productRelatables/E4kTblProductPropertiesObsoleteMatrix';
import E4kTblProductSupplierLevelSettingsGrid from '../productRelatables/E4kTblProductSupplierLevelSettingsGrid';
import E4kTblProductPropertiesStandardDatePriceMatrix from '../productRelatables/E4kTblProductPropertiesStandardDatePriceMatrix';
import E4kTblProductPropertiesStandardQtyPriceMatrix from '../productRelatables/E4kTblProductPropertiesStandardQtyPriceMatrix';

import E4kTblProductPropertyAddGrid from '../property/e4kTblProductPropertyAddGrid';
import E4kTblProductColourPropertyValueAddGrid from '../property/E4kTblProductColourPropertyAddGrid'
import E4kTblProductSizePropertyValueAddGrid from '../property/E4kTblProductSizePropertyAddGrid'
import E4kTblProductFitPropertyValueAddGrid from '../property/E4kTblProductFitPropertyAddGrid'
import E4kTblProductSalesPeopleAddGrid from '../property/E4kTblProductSalesPeopleAddGrid';
import E4kTblProductPropertyTypeValueAddGrid from '../property/E4kTblProductPropertyTypeValueAddGird'
import E4kTblProductParameterSettingsgrid from '../property/E4kTblProductParameterSettingsgrid';
import E4kTblProductParameterCustomerSettingsGrid from '../property/E4kTblProductParameterCustomerSettingsGrid';
import E4kTblProductProductDuplicate from './E4kTblProductProductDuplicate';




const addImageKey = (record) => {
  if (record.imagePath){
    const imagePathParts = record.imagePath.split('\\');
    const imageName = imagePathParts[imagePathParts.length - 1];
    //console.log('imagePath: ' + imageName);
    return { ...record, imagePath: "../product/category1/".concat(imageName) };
  }else{
    return { ...record, imagePath: "" };
}
};
const addImageKey2 = (record) => {
  if (record.imagePath){
    const imagePathParts = record.imagePath.split('\\');
    const imageName = imagePathParts[imagePathParts.length - 1];
    //console.log('imagePath: ' + imageName);
    return { ...record, imagePath: "../product/category2/".concat(imageName) };
  }else{
    return { ...record, imagePath: "" };
}
};


const CreateNewProduct = ({ showModalCreateNewProduct, handleCloseCreateNewProduct }) => {
  const [isMaximizedCreateNewProduct, setIsMaximizedCreateNewProduct] = useState(false);
  const UploadNewImage = useSelector((state) => state.SelectNewProductImage.selectProductNewImage);
  const ProductSelect = useSelector((state) => state.selectProduct.selectProduct);
  const ProductPropertyAddSelect = useSelector((state) => state.selectProductAddProperty.selectProductProperty);
  
  const ProductAddPropertySizeData = useSelector((state) => state.selectProductAddPropertySize.selectProductPropertySize);
  
  //const ProductAddPropertyTypeValues = useSelector((state) => state.selectProductAddPropertyTypesValues.selectProductPropertyTypeValues);
  //const Product_property_reset_st  = useSelector((state) => state.propertylevelreset.propertylevelreset);


  const CompanyProductCreateNew = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyid, setCompanyid] = useState(CompanyProductCreateNew);
  const [productid, setProductid] = useState('')
  const [searchStatus, setSearchStatus] = useState(false)
  const [isNewProduct, setIsNewProduct] = useState(false)
  const [newProductData, setNewProductData] = useState([])


  const [isProductUpdate, setIsProductUpdate] = useState(false)
  const [isPropertyEdit, setIsPropertyEdit] = useState(false)
  const [PropertyTypeId, setPropertyTypeId] = useState('');

  const dispatch_new = useDispatch()

  /////////// ref variable
  const inputRefProductId = useRef(null);
  const inputRefProductdescription = useRef(null);
  const inputRefProductCategory1 = useRef(null);
  const inputRefProductCategory2 = useRef(null);
  const inputRefProductCategory3 = useRef(null);
  const inputRefProductClassid = useRef(null);
  const inputRefProductObsoleteTypes = useRef(null);
  const inputRefProductTypeofIssue = useRef(null);
  const inputRefProductUnitofIssue = useRef(null);
  const inputRefProductStockingTypes = useRef(null);
  const inputRefProductWeight = useRef(null);
  const inputRefProductSupplimentaryUnits = useRef(null);
  const inputRefProductNominalCode = useRef(null);
  const inputRefProductCommodityCode = useRef(null);
  const inputRefProductCountry = useRef(null);
  const inputRefProductLive = useRef(null);
  const inputRefProductBatchControl = useRef(null);
  const inputRefProductNotes = useRef(null);



  ////////// Category 1 state
  const [dataGridCategory1, setDataGridCategory1] = useState([]);
  const [dataGridCategory2, setDataGridCategory2] = useState([]);
  const [dataGridCategory3, setDataGridCategory3] = useState([]);
  const [dataGridClassid, setDataGridClassid] = useState([]);
  const [dataGridObsoleteTypes, setDataGridObsoleteTypes] = useState([]);
  const [dataGridTypeofIssue, setDataGridTypeofIssue] = useState([]);
  const [dataGridUnitofIssue, setDataGridUnitofIssue] = useState([]);
  const [dataGridStockingTypes, setDataGridStockingTypes] = useState([]);
  const [dataGridCommodityCode, setDataGridCommodityCode] = useState([]);
  const [dataGridCountry, setDataGridCountry] = useState([]);
  const [dataGridNominal, setDataGridNominal] = useState([]);

  //////////////pop up delete
  const [showConfirmSelectProduct, setShowConfirmSelectProduct] = useState(false);
  const [recordToDeleteSelectProduct, setRecordToDeleteSelectProduct] = useState(null);
  

  ///////////// master page State variables and api data
  const { data:category1data, error:category1error, isLoading:category1isLoading, isError:category1isError } = useGetProductCategories1Query(companyid);
  const { data:category2data, error:category2error, isLoading:category2isLoading, isError:category2isError } = useGetProductCategories2Query(companyid);
  const { data:category3data, error:category3error, isLoading:category3isLoading, isError:category3isError } = useGetProductCategories3Query(companyid);
  const { data:classiddata, error:classiderror, isLoading:classidisLoading, isError:classidisError } = useGetProductClassQuery(companyid);
  const { data:obsoletetypesdata, error:obsoletetypeserror, isLoading:obsoletetypesisLoading, isError:obsoletetypesisError } = useGetProductObsoleteTypesQuery(companyid);
  const { data:typeofissuedata, error:typeofissueerror, isLoading:typeofissueisLoading, isError:typeofissueisError } = useGetProductTypeOfIssueQuery({companyid:companyid,issueType:null});
  const { data:unitofissuedata, error:unitofissueerror, isLoading:unitofissueisLoading, isError:unitofissueisError } = useGetProductUnitOfIssueQuery({companyid:companyid,issueUnits:null});
  const { data:stockingtypedata, error:stockingtypeerror, isLoading:stockingtypeisLoading, isError:stockingtypeisError } = useGetProductStockingTypesQuery({companyid:companyid,stockingtype:''});
  const { data:commoditycodedata, error:commoditycodeerror, isLoading:commoditycodeisLoading, isError:commoditycodeisError } =  useGetProductCommodityCodeQuery(companyid);
  const { data:countrydata, error:countryerror, isLoading:countryisLoading, isError:countryisError } =  useGetCountriesQuery(companyid);
  const { data:nominaldata, error:nominalerror, isLoading:nominalisLoading, isError:nominalisError } =  useGetNominalAccountsQuery(companyid);



  //const { data:allproductdata, error:allproducterror, isLoading:allproductisLoading, isError:allproductisError } =  useGetAllProductsQuery(companyid);
  const { data: searchiddata, 
    error: searchiderror, 
    isLoading: searchidloading,
    isError: searchidiserror,

    } = useSearchProductidQuery({ companyid, productid });
  //////////////// Create Product
  const [createProductNew, { isLoading: isCreating }] = useCreateProductMutation();

  /////////// Update Product
  const [updateProductEdit, {  isLoading: updateloading }] = useUpdateProductMutation();

  /////////// Delete Product
  const [deleteProductEdit, {  isLoading: deleteloading }] = useDeleteProductMutation();

  ///////////////// Category 1 Modal Use State
  const [showModalNewProductcategory1, setShowModalNewProductcategory1] = useState(false);
  const [showModalNewProductcategory2, setShowModalNewProductcategory2] = useState(false);
  const [showModalNewProductcategory3, setShowModalNewProductcategory3] = useState(false);
  const [showModalNewProductclassid, setShowModalNewProductclassid] = useState(false);
  const [showModalNewProductobsoletetypes, setShowModalNewProductobsoletetypes] = useState(false);
  const [showModalNewProducttypeofissue, setShowModalNewProducttypeofissue] = useState(false);
  const [showModalNewProductunitofissue, setShowModalNewProductunitofissue] = useState(false);
  const [showModalNewProductstockingtype, setShowModalNewProductstockingtype] = useState(false);
  const [showModalNewProductcommoditycode, setShowModalNewProductcommoditycode] = useState(false);
  const [showModalNewProductcountry, setShowModalNewProductcountry] = useState(false);
  const [showModalNewProductnominal, setShowModalNewProductnominal] = useState(false);

  /////////// Duplicate product
  const [showModalMediumNewProductDuplicate, setShowModalMediumNewProductDuplicate] = useState(false);
  //const [showModalNewProductDuplicate, setShowModalNewProductDuplicate] = useState(false);

  //////////// Propertied & Values Added
  const [showModalNewProductpropertyadd, setShowModalNewProductpropertyadd] = useState(false);
  const [showModalNewProductpropertyColourValuesAdd, setShowModalNewProductpropertyColourValuesadd] = useState(false);
  const [showModalNewProductpropertySizeValuesAdd, setShowModalNewProductpropertySizeValuesadd] = useState(false);
  const [showModalNewProductpropertyFitValuesAdd, setShowModalNewProductpropertyFitValuesadd] = useState(false);
  const [showModalProductPropertiesStockingLevel, setShowModalProductPropertiesStockingLevel] = useState(false);
  const [showModalProductPropertiesStandardPrice, setShowModalProductPropertiesStandardPrice] = useState(false);
  const [showModalProductPropertiesStandardCost, setShowModalProductPropertiesStandardCost] = useState(false); 
  const [showModalProductPropertiesStockingType, setShowModalProductPropertiesStockingType] = useState(false);
  const [showModalProductPropertiesObsoleteType, setShowModalProductPropertiesObsoleteType] = useState(false);
  const [showModalProductPropertiesStandardDatePrice, setShowModalProductPropertiesStandardDatePrice] = useState(false);
  const [showModalProductPropertiesStandardQtyPrice, setShowModalProductPropertiesStandardQtyPrice] = useState(false);

  
  const [showModalProductPropertiesCustomerPrice, setShowModalProductPropertiesCustomerPrice] = useState(false);
  const [showModalProductPropertiesSupplierCost, setShowModalProductPropertiesSupplierCost] = useState(false); 
  const [showModalNewProductRepSalesPeople, setShowModalNewProductRepSalesPeople] = useState(false);
  const [showModalProductPriceCompare, setShowModalProductPriceCompare] = useState(false);
  const [showModalNewProductpropertyaddTypeValue, setShowModalNewProductpropertyaddTypeValue] = useState(false);





useEffect(() => {
    if (category1data) {
        transformData();
    }
}, [category1isLoading, category1data]);

useEffect(() => {
  if (category2data) {
      transformData();
  }
}, [category2isLoading, category2data]);

useEffect(() => {
  if (category3data) {
      transformData();
  }
}, [category3isLoading, category3data]);

useEffect(() => {
  if (classiddata) {
      
      transformData();
  }
}, [classidisLoading, classiddata]);

useEffect(() => {
  if (obsoletetypesdata) {
      transformData();
  }
}, [obsoletetypesisLoading, obsoletetypesdata]);

useEffect(() => {
  if (typeofissuedata) {
      transformData();
  }
}, [typeofissueisLoading, typeofissuedata]);


useEffect(() => {
  if (unitofissuedata) {
      transformData();
  }
}, [unitofissueisLoading, unitofissuedata]);

useEffect(() => {
  if (stockingtypedata) {
      transformData();
  }
}, [stockingtypeisLoading, stockingtypedata]);

useEffect(() => {
  if (commoditycodedata) {
      transformData();
  }
}, [commoditycodeisLoading, commoditycodedata]);

useEffect(() => {
  if (countrydata) {
      transformData();
  }
}, [countryisLoading, countrydata]);

useEffect(() => {
  if (nominaldata) {
      transformData();
  }
}, [nominalisLoading, nominaldata]);

useEffect(() => {
  if (searchiddata && (productid !=="")) {
    if(searchiddata.e4kTblproductProductSearch==="Success"){
      console.log('New Product')
      //setSearchStatus(true)
      setIsNewProduct(true)
      let datanew = {
        companyid:companyid,
        productid:productid,
        description: productid,
        category1id: null,
        category2id:    null,
        category3id: null,
        weight: null,
        supplimentaryunits: '',
        nominalCode: '',
        commodityCode: '',
        notes: '',
        classid: null,
        obsoleteClass: null,
        live: false,
        styleimage: '',
        batchcontrol: false,
        stockinguom:null,
        issueuom:null,
        stockingtype: '',
        countryid: null 
      };
      setNewProductData(datanew)
      dispatch_new(setSelectProduct(datanew))
      handleNewProductCreate({
        companyid:companyid,
        productid:productid,
        description: productid,
        category1id: null,
        category2id:    null,
        category3id: null,
        weight: null,
        supplimentaryunits: '',
        nominalCode: '',
        commodityCode: '',
        notes: '',
        classid: null,
        obsoleteClass: null,
        live: false,
        styleimage: '',
        batchcontrol: false,
        stockinguom:null,
        issueuom:null,
        stockingtype: '',
        countryid: null 
      })

      inputRefProductId.current.value = productid
    }else{
      if (searchiddata.e4kTblproductProductSearch==="Failed"){
      //setSearchStatus(false)
      setIsNewProduct(false)
      setProductid('')
    }}
  }
}, [searchidloading, searchiddata]);


////////////////use effect for check is update
useEffect(() =>{
      if (ProductSelect && ProductSelect.productid) {
        setIsProductUpdate(true);
    } else {
      setIsProductUpdate(false);
    }


},[ProductSelect])


////////////////////////////transform data

const transformData = () => {
  if (!category1data) return [];
  const datagrid = category1data.e4kTblproductProductCategory1.map(category => ({
      category1id: category.category1id,
      companyid: category.companyid.companyid,
      category: category.description,
      imagePath: category.imagepath ,
      //attachments:category.imagepath
  }));
  const Data1 = datagrid.map(addImageKey);
  //console.log('#######################################',Data1)
  setDataGridCategory1(Data1);


  if (!category2data) return [];
  const datagrid2 = category2data.e4kTblproductProductCategory2.map(category => ({
      category2id: category.category2id,
      companyid: category.companyid.companyid,
      category: category.description,
      imagePath: category.imagepath ,
  }));
  const Data2 = datagrid2.map(addImageKey2);
  setDataGridCategory2(Data2);

  if (!category3data) return [];
  const datagrid3 = category3data.e4kTblproductProductCategory3.map(category => ({
      category3id: category.category3id,
      companyid: category.companyid.companyid,
      description: category.description,
      }));
  setDataGridCategory3(datagrid3);

  if (!classiddata) return [];
  const datagridclass = classiddata.e4kTblproductProductClass.map(category => ({
      classid: category.classid,
      companyid: category.companyid.companyid,
      description: category.description,
      }));
  setDataGridClassid(datagridclass);

  if (!obsoletetypesdata) return [];
        const datagridobsoletetypes = obsoletetypesdata.e4kTblproductProductObsoleteTypes.map(category => ({
            obsoleteid: category.obsoleteid,
            companyid: category.companyid.companyid,
            description: category.description,
            allowSale: category.allowSale
            }));
  setDataGridObsoleteTypes(datagridobsoletetypes);

  if (!typeofissuedata) return [];
        const datagridtypeofissue = typeofissuedata.e4kTblproductProductTypeofissue.map(category => ({
            companyid: category.companyid.companyid,
            description: category.description,
            issueType: category.issueType
            }));
        
  setDataGridTypeofIssue(datagridtypeofissue);

  if (!unitofissuedata) return [];
        const datagridunit = unitofissuedata.e4kTblproductProductUnitofissue.map(category => ({
            companyid: category.companyid.companyid,
            description: category.description,
            issueUnits: category.issueUnits
            }));
  setDataGridUnitofIssue(datagridunit);

  if (!stockingtypedata) return [];
        const stockingtypedata1 = stockingtypedata.e4kTblproductProductStockingTypes.map((category, index) => ({
            id: index + 1, // Assign an incremental id starting from 1
            stockingtype: category.stockingtype,
            companyid: category.companyid.companyid,
            description: category.description,
        }));
        setDataGridStockingTypes(stockingtypedata1);

  if (!commoditycodedata) return [];
  const datagridcommoditycode = commoditycodedata.e4kTblproductProductCommoditycodes.map((category, index) => ({
      id: index + 1, // Assign an incremental id starting from 1
      commoditycode: category.commodityCode,
      companyid: category.companyid.companyid,
      description: category.description,
  }));
  setDataGridCommodityCode(datagridcommoditycode);


  if (!countrydata) return [];
  
    const dataGridCountry = countrydata.E4kCountry.map(Country => ({
      countryid: parseInt(Country.countryid, 10),
      companyid: Country.companyid.companyid,
      country: Country.country,
      member : Country.member,
      
    }));
    setDataGridCountry(dataGridCountry);


    if (!nominaldata) return [];
        const transformedData = nominaldata.E4kTblnominallist.map(account => ({
            nomcode: account.nomcode.toString(),
            companyid: account.companyid.companyid,
            nomdescription: account.nomdescription,
            live: account.live,
            nombs: account.nombs,
            nomdc: account.nomdc,
            nompl: account.nompl,
        }));
    setDataGridNominal(transformedData);
  
};



/////////////////// master page callback function

const handleOpenProductNewCategory1 =() => {
  setShowModalNewProductcategory1(true);

}

const handleCloseProductNewCategory1 = () => {
  setShowModalNewProductcategory1(false);
};

///////////// Category2 callback function
const handleOpenProductNewCategory2 =() => {
  setShowModalNewProductcategory2(true);

}

const handleCloseProductNewCategory2 = () => {
  setShowModalNewProductcategory2(false);
};

///////////// Category3 callback function

const handleOpenProductNewCategory3 =() => {
  setShowModalNewProductcategory3(true);

}

const handleCloseProductNewCategory3 = () => {
  setShowModalNewProductcategory3(false);
};

///////////// Class callback function

const handleOpenProductNewClassid =() => {
  setShowModalNewProductclassid(true);

}

const handleCloseProductNewClassid = () => {
  setShowModalNewProductclassid(false);
};

////////////// obsolete types callback function

const handleOpenProductNewObsoleteTypes =() => {
  setShowModalNewProductobsoletetypes(true);

}

const handleCloseProductNewObsoleteTypes = () => {
  setShowModalNewProductobsoletetypes(false);
};

//////////// typeofissue callback function

const handleOpenProductNewTypeOfIssue =() => {
  setShowModalNewProducttypeofissue(true);

}

const handleCloseProductNewTypeOfIssue = () => {
  setShowModalNewProducttypeofissue(false);
};


//////////// unitofissue callback function

const handleOpenProductNewUnitofIssue =() => {
  setShowModalNewProductunitofissue(true);

}

const handleCloseProductNewUnitofIssue = () => {
  setShowModalNewProductunitofissue(false);
};

//////////// stockingtypes callback function

const handleOpenProductNewStockingTypes =() => {
  setShowModalNewProductstockingtype(true);

}

const handleCloseProductNewStockingTypes = () => {
  setShowModalNewProductstockingtype(false);
};
    
  const toggleMaximizeCreateNewProduct = () => {
    setIsMaximizedCreateNewProduct(!isMaximizedCreateNewProduct);
  };

  ////////////////// commodity code
  const handleOpenProductNewCommodityCode =() => {
    setShowModalNewProductcommoditycode(true);
  }
  
  const handleCloseProductNewCommodityCode = () => {
    setShowModalNewProductcommoditycode(false);
  };

  /////////////////////// Country

  const handleOpenProductNewCountry =() => {
    setShowModalNewProductcountry(true);
  }
  
  const handleCloseProductNewCountry = () => {
    setShowModalNewProductcountry(false);
  };

   /////////////////////// Nominal

   const handleOpenProductNewNominal =() => {
    setShowModalNewProductnominal(true);
  }
  
  const handleCloseProductNewNominal = () => {
    setShowModalNewProductnominal(false);
  };

//////////////// propertt add

//////////////////// Propertieslevelstocklevel
const handleOpenProductPropertiesStocklevel =() => {
  setShowModalProductPropertiesStockingLevel(true);
}

const handleCloseProductPropertiesStocklevel = () => {
  setShowModalProductPropertiesStockingLevel(false);
};

//////////////////// Propertieslevelstocktype
const handleOpenProductPropertiesStockType =() => {
  setShowModalProductPropertiesStockingType(true);
}

const handleCloseProductPropertiesStockType = () => {
  setShowModalProductPropertiesStockingType(false);
};


//////////////////// PropertieslevelObsoletetype
const handleOpenProductPropertiesObsoleteType =() => {
  setShowModalProductPropertiesObsoleteType(true);
}

const handleCloseProductPropertiesObsoleteType = () => {
  setShowModalProductPropertiesObsoleteType(false);
};

////////////////////////// StandardPrice matrix
const handleOpenProductPropertiesStandardPrice =() => {
  setShowModalProductPropertiesStandardPrice(true);
}

const handleCloseProductPropertiesStandardPrice = () => {
  setShowModalProductPropertiesStandardPrice(false);
};


////////////////////////// StandardPrice Datematrix
const handleOpenProductPropertiesStandardDatePrice =() => {
  setShowModalProductPropertiesStandardDatePrice(true);
}

const handleCloseProductPropertiesStandardDatePrice = () => {
  setShowModalProductPropertiesStandardDatePrice(false);
};


////////////////////////// StandardPrice Qtymatrix
const handleOpenProductPropertiesStandardQtyPrice =() => {
  setShowModalProductPropertiesStandardQtyPrice(true);
}

const handleCloseProductPropertiesStandardQtyPrice = () => {
  setShowModalProductPropertiesStandardQtyPrice(false);
};


/////////////////////////////
////////////////////////// CustomerPrice matrix
const handleOpenProductPropertiesCustomerPrice =() => {
  setShowModalProductPropertiesCustomerPrice(true);
}

const handleCloseProductPropertiesCustomerPrice = () => {
  setShowModalProductPropertiesCustomerPrice(false);
};

///////////////////
////////////////////////// CustomerPrice matrix
const handleOpenProductPropertiesSupplierCost =() => {
  setShowModalProductPropertiesSupplierCost(true);
}

const handleCloseProductPropertiesSupplierCost = () => {
  setShowModalProductPropertiesSupplierCost(false);
};
////////////////////

/////////////////////////// Standard Cost
const handleOpenProductPropertiesStandardCost =() => {
  setShowModalProductPropertiesStandardCost(true);
}

const handleCloseProductPropertiesStandardCost = () => {
  setShowModalProductPropertiesStandardCost(false);
};


//////////////////// input events
const handleCreateProductID = (e) => {
    //e.preventDefault();
    //console.log('event productid create',e.target.value)
    setProductid(e.target.value)

  
}
const closeCreateNewProduct = () => {
  setSearchStatus(false)
  setIsProductUpdate(false)
  setIsPropertyEdit(false)
  setIsNewProduct(false)
  setProductid('')
  dispatch_new(resetSelectProductPropertySize())
  dispatch_new(resetSelectProductPropertyColour());
  dispatch_new(resetSelectProductPropertyTypesValues());
  dispatch_new(resetSelectProductSalesPeople());
  dispatch_new(resetSelectProductProperty());
  setPropertyTypeId(null)
  handleCloseCreateNewProduct()
}


/////////////////////////////////////// Create new Product
const handleNewProductCreate = async (product1) => {
  try {
      const result = await createProductNew(product1);
      if (result.error) {
          console.error('Mutation Error:', result.error);
      } else {
          //console.log('Mutation Success:', result.data);
          if(result.data.E4kTblproductProductCreate.productId === "Success"){
            dispatch_new(setSelectProduct(newProductData))
              toast.success('Created',{
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
           
              
          }else{
              toast.error(result.data.E4kTblproductProductCreate.productId,{
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
          }
      }
  } catch (error) {
      console.error('Mutation Error:', error);
  }
};


//////////////// Update existing record
const handleProductUpdate = async (product1) => {
  try {
    
      const result = await updateProductEdit( product1 )
      if (result.error) {
          console.error('Mutation Error:', result.error);
      } else {
          //console.log('Mutation Success:', result.data);
          if(result.data.E4kTblproductProductUpdate.productUpdate === "Success"){
              toast.success('Updated',{
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
          }else{
              toast.error(result.data.E4kTblproductProductUpdate.productUpdate,{
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
          }
      }
  } catch (error) {
      console.error('Mutation Error:', error);
  }
};



//////////////// delete existing record
const handleProductDelete = async () => {
  setShowConfirmSelectProduct(false);
  if (recordToDeleteSelectProduct) {
    try {
      
        const result = await deleteProductEdit( recordToDeleteSelectProduct )
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
              closeCreateNewProduct()
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
const handleProductDeleteButton = () => {

  if (ProductSelect.productid !==''){

    setRecordToDeleteSelectProduct({
      companyid: companyid,
      productid: ProductSelect.productid
    });
    setShowConfirmSelectProduct(true);
    

  }


}



const handleCreateNewProduct = (event) => {
  //event.preventDefault();
  //console.log("Product update+++++++++++++++++++++++++++++++")

    if (isNewProduct){
      console.log("Product New+++++++++++++++++++++++++++++++")
      const newdata = {
        companyid: companyid,
        productid: inputRefProductId.current.value,
        description: inputRefProductdescription.current.value,
        category1id: (dataGridCategory1.find(
                        category => category.category === inputRefProductCategory1.current.value[0].value
                      )).category1id,
        category2id:    (dataGridCategory2.find(
                          category => category.category === inputRefProductCategory2.current.value[0].value
                        )).category2id,
        category3id: (dataGridCategory3.find(
                        category => category.description === inputRefProductCategory3.current.value[0].value
                      )).category3id,
        weight: Number(inputRefProductWeight.current.value),
        supplimentaryunits: inputRefProductSupplimentaryUnits.current.value,
        nominalCode: (dataGridNominal.find(
          nomin => nomin.nomdescription === inputRefProductNominalCode.current.value[0].value
        )).nomcode,
        commodityCode: inputRefProductCommodityCode.current.value[0].value,
        notes: inputRefProductNotes.current.value,
        classid: (dataGridClassid.find(
                        category => category.description === inputRefProductClassid.current.value[0].value
                      )).classid,
        obsoleteClass: (dataGridObsoleteTypes.find(
                        category => category.description === inputRefProductObsoleteTypes.current.value[0].value
                      )).obsoleteid,
        live: inputRefProductLive.current.checked,
        styleimage: UploadNewImage.image ? UploadNewImage.image : "",
        batchcontrol: inputRefProductBatchControl.current.checked,
        stockinguom:(dataGridTypeofIssue.find(
                      category => category.description === inputRefProductTypeofIssue.current.value[0].value
                    )).issueType,
        issueuom: (dataGridUnitofIssue.find(
                      category => category.description === inputRefProductUnitofIssue.current.value[0].value
                    )).issueUnits,
        stockingtype: (dataGridStockingTypes.find(
                          category => category.description === inputRefProductStockingTypes.current.value[0].value
                        )).stockingtype,
        countryid: (dataGridCountry.find(
          country => country.country === inputRefProductCountry.current.value[0].value
        )).countryid, //inputRefProductCountry.current.value
      } 
          handleNewProductCreate(newdata)
          setIsNewProduct(false)
          setSearchStatus(false)
          //handleCloseCreateNewProduct()

          
    }

    if (isProductUpdate){
      //console.log("Product dfdd update+++++++++++++++++++++++++++++++",inputRefProductCategory1.current.value)
      const newdata = {
        companyid: companyid,
        productid: inputRefProductId.current.value,
        description: inputRefProductdescription.current.value,
        category1id: inputRefProductCategory1.current.value ? (dataGridCategory1.find(
                        category => category.category === inputRefProductCategory1.current.value[0].value
                      )).category1id : null,
        category2id:   inputRefProductCategory2.current.value ? (dataGridCategory2.find(
                          category => category.category === inputRefProductCategory2.current.value[0].value
                        )).category2id : null,
        category3id: inputRefProductCategory3.current.value ? (dataGridCategory3.find(
                        category => category.description === inputRefProductCategory3.current.value[0].value
                      )).category3id : null,
        weight: inputRefProductWeight.current.value ? Number(inputRefProductWeight.current.value) : 0,
        supplimentaryunits: inputRefProductSupplimentaryUnits.current.value ? inputRefProductSupplimentaryUnits.current.value : '',
        nominalCode: inputRefProductNominalCode.current.value ? (dataGridNominal.find(
          category => category.nomdescription === inputRefProductNominalCode.current.value[0].value
        )).nomcode : null,
        commodityCode: inputRefProductCommodityCode.current.value ? inputRefProductCommodityCode.current.value[0].value : '',
        notes: inputRefProductNotes.current.value ? inputRefProductNotes.current.value : '',
        classid: inputRefProductClassid.current.value ? (dataGridClassid.find(
                        category => category.description === inputRefProductClassid.current.value[0].value
                      )).classid : null,
        obsoleteClass: inputRefProductObsoleteTypes.current.value ? (dataGridObsoleteTypes.find(
                        category => category.description === inputRefProductObsoleteTypes.current.value[0].value
                      )).obsoleteid : null,
        live: inputRefProductLive.current.checked,
        styleimage: UploadNewImage.image ? UploadNewImage.image : '',
        batchcontrol: inputRefProductBatchControl.current.checked,
        stockinguom: inputRefProductTypeofIssue.current.value ? (dataGridTypeofIssue.find(
                      category => category.description === inputRefProductTypeofIssue.current.value[0].value
                    )).issueType : null,
        issueuom: inputRefProductUnitofIssue.current.value ? (dataGridUnitofIssue.find(
                      category => category.description === inputRefProductUnitofIssue.current.value[0].value
                    )).issueUnits : null,
        stockingtype: inputRefProductStockingTypes.current.value ? (dataGridStockingTypes.find(
                          category => category.description === inputRefProductStockingTypes.current.value[0].value
                        )).stockingtype : null,
        countryid: inputRefProductCountry.current.value ? (dataGridCountry.find(
          country => country.country === inputRefProductCountry.current.value[0].value
        )).countryid : null //inputRefProductCountry.current.value
      } 
      
      handleProductUpdate(newdata)
      setIsNewProduct(false)
      setSearchStatus(false)
      dispatch_new(setSelectProduct({
        
          companyid: companyid,
          productid: inputRefProductId.current.value,
          description: inputRefProductdescription.current.value ? inputRefProductdescription.current.value : '',
          category1id: inputRefProductCategory1.current.value ? inputRefProductCategory1.current.value[0].value : '',
          category2id:  inputRefProductCategory2.current.value ?  inputRefProductCategory2.current.value[0].value : '',
          category3id: inputRefProductCategory3.current.value ? inputRefProductCategory3.current.value[0].value : '',
          weight: inputRefProductWeight.current.value ? Number(inputRefProductWeight.current.value) : 0,
          supplimentaryunits:  inputRefProductSupplimentaryUnits.current.value ? inputRefProductSupplimentaryUnits.current.value : '',
          Nominal: inputRefProductNominalCode.current.value ? inputRefProductNominalCode.current.value[0].value : '',
          commodityCode: inputRefProductCommodityCode.current.value ? inputRefProductCommodityCode.current.value[0].value : '',
          notes: inputRefProductNotes.current.value ? inputRefProductNotes.current.value : '',
          classid: inputRefProductClassid.current.value ? inputRefProductClassid.current.value[0].value : '',
          obsoleteClass:inputRefProductObsoleteTypes.current.value ? inputRefProductObsoleteTypes.current.value[0].value : '',
          live: inputRefProductLive.current.checked,
          styleimage: UploadNewImage.image ? UploadNewImage.image_default : ProductSelect.styleimage,
          batchcontrol: inputRefProductBatchControl.current.checked,
          StockingUOM: inputRefProductTypeofIssue.current.value ? inputRefProductTypeofIssue.current.value[0].value : '',
          issueuom: inputRefProductUnitofIssue.current.value ? inputRefProductUnitofIssue.current.value[0].value : '',
          stockingtype: inputRefProductStockingTypes.current.value ? inputRefProductStockingTypes.current.value[0].value : '',
          country: inputRefProductCountry.current.value ? inputRefProductCountry.current.value[0].value : '',


      }))
      //handleCloseCreateNewProduct()
    }
  


}
const [isColumn2Visible, setIsColumn2Visible] = useState(true);

const handleToggle = () => {
  setIsColumn2Visible(!isColumn2Visible);
  
};  

/////////////////Add Property
const handleOpenProductAddproperty =() => {
  setShowModalNewProductpropertyadd(true)
  setIsPropertyEdit(false)

}
const handleCloseProductAddproperty =() => {
  setShowModalNewProductpropertyadd(false)
  setIsPropertyEdit(true)
}




/////////////////Add Property values
const handleOpenProductAddpropertyTypeValues =() => {
  setShowModalNewProductpropertyaddTypeValue(true)
  setIsPropertyEdit(false)

}
const handleCloseProductAddpropertyTypeValues =() => {
  setShowModalNewProductpropertyaddTypeValue(false)
  setIsPropertyEdit(true)
}



////////////////
/////////////////SalesPeople REPS
const handleOpenProductRepSalesPeople =() => {
  setShowModalNewProductRepSalesPeople(true)
  //setIsPropertyEdit(false)

}
const handleCloseProductRepSalesPeople =() => {
  setShowModalNewProductRepSalesPeople(false)
  //setIsPropertyEdit(true)
}

/////////////////Price Compare
const handleOpenProductPriceCompare =() => {
  setShowModalProductPriceCompare(true)
  //setIsPropertyEdit(false)

}
const handleCloseProductPriceCompare =() => {
  setShowModalProductPriceCompare(false)
  //setIsPropertyEdit(true)
}


///////////////// Duplicate Product 
const handleOpenModalMediumNewProductDuplicate = () => {
  setShowModalMediumNewProductDuplicate(true);
 };

 const handleCloseModalMediumNewProductDuplicate = (newProductData) => {
  setShowModalMediumNewProductDuplicate(false);
   
  if (newProductData !== undefined){
    dispatch_new(setSelectProduct(newProductData));
    //setShowModalNewProductDuplicate(true);
  }
  

 };



////////////////////////// Add Property values

const handleOpenProductAddpropertyValues =(property,PropertyObj) => {
  if (PropertyObj.isstatic === 1) {
    if (property === "Colour"){
      //console.log("Colour", property)
      setShowModalNewProductpropertyColourValuesadd(true)
      setIsPropertyEdit(false)
  
    }else if(property === 'Size'){
     // console.log("Size", property)
      setShowModalNewProductpropertySizeValuesadd(true)
      setIsPropertyEdit(false)
  
    }else if(property === "Fit"){
     // console.log("Fit", property)
      setShowModalNewProductpropertyFitValuesadd(true)
      setIsPropertyEdit(false)
    }

  } else {
    
    setPropertyTypeId(PropertyObj.propertyid)
    setIsPropertyEdit(false)
    setShowModalNewProductpropertyaddTypeValue(true)
  }
 
  // setShowModalNewProductpropertyvalues(true)
  // setIsPropertyValuesEdit(false)

}

//////////////////////// Close Product Properties Values Modal
const handleCloseProductAddpropertyValues =(property) => {
  if (property === "Colour"){
    //console.log("Colour", property)
    setShowModalNewProductpropertyColourValuesadd(false)
    setIsPropertyEdit(true)

  }else if(property === 'Size'){
    //console.log("Size", property)
    setShowModalNewProductpropertySizeValuesadd(false)
    setIsPropertyEdit(true)

  }else if(property === "Fit"){
    //console.log("Fit", property)
    setShowModalNewProductpropertyFitValuesadd(false)
    setIsPropertyEdit(true)
  }


}



  const modalDialogclassName = isMaximizedCreateNewProduct ? 'modal-dialog modal-fullscreen' : 'modal-dialog large-popup';


  return (
    <>
   <Draggable handle=".e4kmodal-header">
      <div className={`modal fade ${showModalCreateNewProduct ? 'in' : ''}`} style={{ display: showModalCreateNewProduct ? 'block' : 'none' }}>
        <div className={modalDialogclassName}>
          <div className="modal-content">
                  <div className="large-popup-topdiv e4kmodal-header">
                    {/* <!------ popup for customer -------> */}
                      <div className="">
                        <div className="container-fluid remove-padding">
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="breadcomb-list">
                                <div className="row">
                                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                    <div className="breadcomb-wp">

                                      <div className="breadcomb-ctn">
                                        <span><a href="#" id="sa-success" onClick={handleCreateNewProduct}> <i className="fa fa-check" ></i> Save</a> | </span>
                                        <span><a href="#" id="sa-warning" onClick={handleProductDeleteButton}> <i className="fa fa-trash"></i> Delete</a> | </span>
                                        {/* <span><a href=""><i className="fa fa-pencil"></i> Edit</a> | </span> */}
                                        <span><a href="#" onClick={handleToggle}><FontAwesomeIcon icon={isColumn2Visible ? faChain : faChainBroken} /></a></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                    <div className='popup-top-rightdiv'>
                                      <button type="button" className="btn-link" onClick={toggleMaximizeCreateNewProduct}>
                                      {isMaximizedCreateNewProduct ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                      </button>
                                      <button type="button" className="close" onClick={closeCreateNewProduct}>
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

                            {ProductSelect.productid ? 
                                    (<div className="customer-newbold">
                                    {ProductSelect.productid} - {ProductSelect.description}
                                    </div>) : 
                                      (<div className="customer-newbold">
                                      New Product
                                    </div>) 
                              }
                            
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
                            {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> */}
                            <div className="breadcomb-wp-two">
                              <div className="">
                                {/* <span><a href="#"> <i className="fa fa-edit"></i> price setup</a> | </span>
                                  <span><a href="#"> <i className="fa fa-list"></i> Invoice list</a> | </span>
                                  <span><a href=""><i className="fa fa-list"></i> Order list</a> | </span>
                                  <span><a href=""><i className="fa fa-list-alt"></i> Statement</a> | </span>
                                  <span><a href=""><i className="fa fa-money"></i> Cash Receipts</a> | </span>
                                  <span><a href=""><i className="fa fa-file-text-o"></i> Memo</a> | </span>
                                  <span><a href=""><i className="fa fa-users"></i> Uniform</a> | </span>
                                  <span><a href=""><i className="fa fa-newspaper-o"></i> Template</a> | </span>
                                  <span><a href=""><i className="fa fa-exchange"></i> Export transaction</a> | </span>
                                  <span><a href=""><i className="fa fa-external-link"></i> Export Turnover</a></span> */}

                                <nav className="navbar pop-navbar">

                                  <div className="navbar-header">
                                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar1">
                                      <span className="sr-only">Toggle navigation</span>
                                      <span className="icon-bar"></span>
                                      <span className="icon-bar"></span>
                                      <span className="icon-bar"></span>
                                    </button>
                                  </div>
                                  <div id="navbar1" className="navbar-collapse collapse">
                                    <ul className="nav navbar-nav">
                                      <li className="active">
                                        <a href="#">
                                            <span>
                                              <BsGraphUpArrow />
                                              Stock Position
                                            </span>
                                        </a>
                                      </li>
                                      <li >
                                        <a href="#">
                                          <span>
                                            <FcBullish />
                                            Sales figures
                                          </span>
                                        </a>
                                      </li>
                                      <li><a href="#">Sales Analysis</a></li>
                                      <li><a href="#" onClick={handleOpenProductPropertiesStocklevel}> Stock Levels</a></li>
                                      <li>
                                        <a href="#">
                                          <span>
                                          <FaWarehouse />
                                            Stock Locations
                                          </span>
                                        </a>
                                      </li>

                                      <li><a href="#" onClick={handleOpenProductPropertiesStockType}>Stocking Types</a></li>
                                      <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Extract Report<span className="caret"></span></a>
                                        <ul className="dropdown-menu" role="menu">
                                          <li><a href="#">Template / Ucode</a></li>
                                          <li><a href="#">Assemblies</a></li>
                                        </ul>
                                      </li>
                                      <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Price Setup<span className="caret"></span></a>
                                        <ul className="dropdown-menu" role="menu">
                                          <li><a href="#" onClick={handleOpenProductPropertiesStandardPrice}> Standard Sales Price</a></li>
                                          <li><a href="#" onClick={handleOpenProductPropertiesStandardCost}>Standard Cost</a></li>
                                          {/* <li><a href="#">Currency</a></li> */}
                                          <li><a href="#" onClick={handleOpenProductPropertiesCustomerPrice}>Customer Sales Price</a></li>
                                          <li><a href="#" onClick={handleOpenProductPropertiesSupplierCost}>Supplier Cost</a></li>
                                          <li><a href="#" onClick={handleOpenProductPriceCompare}>Standard Price Comparison</a></li>
                                          <li><a href="#" onClick={handleOpenProductPropertiesStandardDatePrice}>Discount Sales Price - Date</a></li>
                                          <li><a href="#" onClick={handleOpenProductPropertiesStandardQtyPrice}>Discount Sales Price - Quantity</a></li>
                                        </ul>
                                      </li>
                                      <li><a href="#" onClick={handleOpenProductPropertiesObsoleteType}>Obsolete status</a></li>
                                      <li><a href="#">Purchasing</a></li>
                                      <li><a href="#">Sales</a></li>
                                      <li><a href="#">BOM</a></li>
                                      <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Others<span className="caret"></span></a>
                                        <ul className="dropdown-menu" role="menu">
                                          <li><a href="#" onClick={handleOpenModalMediumNewProductDuplicate}>Duplicate</a></li>
                                          <li><a href="#">Copy to Warehouse</a></li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>


                                </nav>


                              </div>
                            </div>
                            {/* </div> */}

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
                                  <a className="collapsed" data-toggle="collapse"  href="#tblproductproductid" aria-expanded="true" aria-controls="tblproductproductid"><i className="plus-icon" aria-hidden="true"></i> Product </a> 
                                </h4>
                                  <div id="tblproductproductid" className="collapse in" aria-expanded="true">
                                      <div className="panel-box-div">
                                      <div className="row">
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                            <div className='input-lable'>
                                                <span>Product ID</span>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                            <Input 
                                                ref={inputRefProductId} 
                                                onChange={handleCreateProductID} 
                                                placeholder="Enter Product Id" 
                                                disabled = {ProductSelect.productid ? true : false}
                                                value={ProductSelect.productid ? ProductSelect.productid : isNewProduct ? productid : ''}
                                              ></Input>
                                          </div>
                                        </div>
                                        
                                        {/* <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6" style={{ display: ((productid !=='') && (isNewProduct === false)) ? 'block' : ProductSelect.productid ? "none": "block" }}>
                                            */}

                                        {(ProductSelect.productid ) ? null : 
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6" style={{ display: ((productid !=='') && (isNewProduct === false)) ? 'block' :  "none" }}>
                                                
                                                  <span className="alert-text">Already Exists...</span>
                                        
                                            </div>
                                        }
                                           
                                            

                                      </div>            
                                        
                                      </div>
                                  </div>
                            </div>                        


                            {/* {isNewProduct ? () : () }       */}
                            <div className="panel panel-default accrodion-div" style={{ display: isNewProduct ? 'block' : ProductSelect.productid ? "block": "none" }} >
                              <h4 className="panel-title"> 
                                <a data-toggle="collapse" href="#productgeneral" aria-expanded="false" aria-controls="productgeneral"><i className="plus-icon" aria-hidden="true"></i> General </a> 
                              </h4>
                              <div id="productgeneral" className="collapse" aria-expanded="false" >
                                <div className="panel-box-div">
                                  <div className="row">

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Description</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                            <Input 
                                              ref={inputRefProductdescription} 
                                              placeholder="Description"
                                              value={ProductSelect.productid ? ProductSelect.description : ''}
                                              ></Input>
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
                                              ref={inputRefProductCategory1}
                                              id="TblProductCreateNewProductCategory1"
                                              selectedIndexes={[0]} 
                                              filterable 
                                              placeholder="Select Category1"
                                              dataSource={dataGridCategory1.map(cat=>(cat.category))}
                                              value = {ProductSelect.productid ? ProductSelect.category1id : ''} 
                                              >
                                              
                                            </DropDownList>
                                            
                                            <span className="master-option-span" onClick={handleOpenProductNewCategory1}>...</span>
                                        </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Category2</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                                              <DropDownList 
                                                  ref = {inputRefProductCategory2}
                                                  id="TblProductCreateNewProductCategory2"
                                                  selectedIndexes={[0]} 
                                                  filterable 
                                                  placeholder="Select Category2"
                                                  dataSource={dataGridCategory2.map(cat=>(cat.category))}
                                                  value = {ProductSelect.productid ? ProductSelect.category2id : ''} 
                                                  >
                                                </DropDownList>
                                                
                                                <span className="master-option-span" onClick={handleOpenProductNewCategory2}>...</span>
                                          </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Category3</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                                              <DropDownList 
                                                  ref = {inputRefProductCategory3}
                                                  id="TblProductCreateNewProductCategory3"
                                                  selectedIndexes={[0]} 
                                                  filterable 
                                                  placeholder="Select Category3"
                                                  dataSource={dataGridCategory3.map(cat=>(cat.description))}
                                                  value = {ProductSelect.productid ? ProductSelect.category3id : ''} 
                                                  >
                                                </DropDownList>
                                                <span className="master-option-span" onClick={handleOpenProductNewCategory3}>...</span>
                                          </div>
                                      </div> 

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Class ID</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                                                  <DropDownList 
                                                    ref = {inputRefProductClassid}
                                                    id="TblProductCreateNewProductClassid"
                                                    selectedIndexes={[0]} 
                                                    filterable 
                                                    placeholder="Select Class"
                                                    dataSource={dataGridClassid.map(cat=>(cat.description))}
                                                    value = {ProductSelect.productid ? ProductSelect.classid : ''} 
                                                    >
                                                  </DropDownList>
                                                  <span className="master-option-span" onClick={handleOpenProductNewClassid}>...</span>
                                          </div>
                                      </div>
                                    
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Nominal Code</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                                              {/* <Input 
                                              ref = {inputRefProductNominalCode} 
                                              placeholder="Nominal Code"
                                              value = {ProductSelect.productid ? ProductSelect.Nominal : ''} 
                                              ></Input> */}
                                                <DropDownList 
                                                    ref = {inputRefProductNominalCode}
                                                    id="TblProductCreateNewProductNominalCode"
                                                    selectedIndexes={[0]} 
                                                    filterable 
                                                    placeholder="Select Nominal"
                                                    dataSource={dataGridNominal.map(nom=>(nom.nomdescription))}
                                                    value = {ProductSelect.productid ? ProductSelect.Nominal : ''} 
                                                    >
                                                  </DropDownList>
                                                  <span className="master-option-span" onClick={handleOpenProductNewNominal}>...</span>
                                          </div>
                                      </div> 

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Obsolete Class</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                                                  <DropDownList 
                                                    ref = {inputRefProductObsoleteTypes}
                                                    id="TblProductCreateNewProductObsoleteTypes"
                                                    selectedIndexes={[0]} 
                                                    filterable 
                                                    placeholder="Select Obsolete Type"
                                                    dataSource={dataGridObsoleteTypes.map(cat=>(cat.description))}
                                                    value = {ProductSelect.productid ? ProductSelect.obsoleteClass : ''} 
                                                    >
                                                  </DropDownList>
                                                  <span className="master-option-span" onClick={handleOpenProductNewObsoleteTypes}>...</span>
                                          </div>
                                      </div> 
                                     
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Live </span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                                            <SwitchButton 
                                              ref = {inputRefProductLive} 
                                              id='Tblproductnewproductswitchlive'
                                              rightToLeft
                                              checked  = {ProductSelect.productid ? ((ProductSelect.live === true || ProductSelect.live === "true" ) ? true: false ) : false}
                                            ></SwitchButton>
                                          </div>
                                      </div>                                 

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Notes </span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                            <div className="form-group">
                                              <TextArea 
                                                ref = {inputRefProductNotes} 
                                                placeholder="Notes"
                                                value = {ProductSelect.productid ? (ProductSelect.notes ? ProductSelect.notes : "none") : ''}
                                                
                                                ></TextArea>
                                            </div>
                                      </div> 

                                    </div>
                                </div>
                            </div>
                            </div>

                            <div className="panel panel-default accrodion-div" style={{ display: isNewProduct ? 'block' : ProductSelect.productid ? "block": "none" }}>
                              <h4 className="panel-title"> 
                                <a className="collapsed" data-toggle="collapse"  href="#tblproductunitofmeasure" aria-expanded="false" aria-controls="tblproductunitofmeasure"><i className="plus-icon" aria-hidden="true"></i> Unit Of Measure </a> 
                              </h4>
                                <div id="tblproductunitofmeasure" className="collapse" aria-expanded="false">
                                    <div className="panel-box-div">
                                    <div className="row">
                                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                              <div className='input-lable'>
                                                  <span>Stock Unit Of Issue</span>
                                              </div>
                                          </div>
                                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                              <div className="form-group master-option">
                                                      <DropDownList 
                                                        ref = {inputRefProductTypeofIssue}
                                                        id="TblProductCreateNewProductStockUnitOfIssue"
                                                        //selectedIndexes={[0]} 
                                                        filterable 
                                                        placeholder="Select Stock Unit of Issue"
                                                        dataSource={dataGridTypeofIssue.map(cat=>(cat.description))}
                                                        value = {ProductSelect.productid ? ProductSelect.StockingUOM : ''}
                                                        >
                                                      </DropDownList>
                                                      <span className="master-option-span" onClick={handleOpenProductNewTypeOfIssue}>...</span>
                                              </div>
                                          </div> 

                                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                              <div className='input-lable'>
                                                  <span>Base Unit Of Issue</span>
                                              </div>
                                          </div>
                                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                              <div className="form-group master-option">
                                                      <DropDownList 
                                                        ref = {inputRefProductUnitofIssue}
                                                        id="TblProductCreateNewProductBaseUnitOfIssue"
                                                        selectedIndexes={[0]} 
                                                        filterable 
                                                        placeholder="Select Base Unit of Issue"
                                                        dataSource={dataGridUnitofIssue.map(cat=>(cat.description))}
                                                        value = {ProductSelect.productid ? ProductSelect.issueuom : ''}
                                                        >
                                                      </DropDownList>
                                                      <span className="master-option-span" onClick={handleOpenProductNewUnitofIssue}>...</span>
                                              </div>
                                          </div> 

                                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                              <div className='input-lable'>
                                                  <span>Type</span>
                                              </div>
                                          </div>
                                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                              <div className="form-group master-option">
                                                      <DropDownList 
                                                        ref = {inputRefProductStockingTypes}
                                                        id="TblProductCreateNewProductStockType"
                                                        selectedIndexes={[0]} 
                                                        filterable 
                                                        placeholder="Select Type"
                                                        dataSource={dataGridStockingTypes.map(cat=>(cat.description))}
                                                        value = {(ProductSelect.productid && (ProductSelect.stockingtype!==null) ) ? ProductSelect.stockingtype : 'none'} 
                                                        >
                                                      </DropDownList>
                                                      <span className="master-option-span" onClick={handleOpenProductNewStockingTypes}>...</span>
                                              </div>
                                          </div> 
                                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                              <div className='input-lable'>
                                                  <span>Batch Control</span>
                                              </div>
                                          </div>
                                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                                  <div className="form-group master-option">
                                                    <SwitchButton 
                                                      ref = {inputRefProductBatchControl} 
                                                      id='Tblproductnewproductswitchbatchcontrol'
                                                      rightToLeft
                                                      checked  = {ProductSelect.productid ? ((ProductSelect.batchcontrol === true || ProductSelect.batchcontrol === 'true') ? true: false ) : false}
                                                      
                                                    ></SwitchButton>
                                                  </div>
                                          </div> 
                                          

                                    </div>            
                                      
                                    </div>
                                </div>
                            </div>

                            <div className="panel panel-default accrodion-div" style={{ display: isNewProduct ? 'block' : ProductSelect.productid ? "block": "none" }}>
                              <h4 className="panel-title"> 
                                <a className="collapsed" data-toggle="collapse"  href="#tblproductproperty" aria-expanded="false" aria-controls="tblproductproperty"><i className="plus-icon" aria-hidden="true"></i> Attributes </a> 
                              </h4>                                   

                                <div id="tblproductproperty" className="collapse" aria-expanded="false">
                                  <div className="panel-box-div singlecolumn-property-grid">
                                      <E4kTblProductPropertyAddGrid /> 

                                      <span className="master-option-span" onClick={handleOpenProductAddproperty}>...</span>
                                    
                                  </div>
                                </div>
                            </div>

                            <div className="panel panel-default accrodion-div" style={{ display: isNewProduct ? 'block' : ProductSelect.productid ? "block": "none" }}>
                                <h4 className="panel-title">
                                  <a className="collapsed" data-toggle="collapse" href="#tblproductpropertyvalues" aria-expanded="false" aria-controls="tblproductpropertyvalues">
                                    <i className="plus-icon" aria-hidden="true"></i> Attribute Values
                                  </a>
                                </h4>
                                <div id="tblproductpropertyvalues" className="collapse" aria-expanded="false">
                                  <div className="panel-box-div">
                                    <div className='row'>
                                      <div className="tab widget-tabs-list" role="tabpanel">
                                        <ul className="nav nav-tabs" role="tablist">
                                          {ProductPropertyAddSelect.map((property, index) => (
                                            <li key={property.propertyid} role="presentation" className={index === 0 ? "active" : ""}>
                                              <a href={`#Section${property.propertyid}`} aria-controls={`Section${property.propertyid}`} role="tab" data-toggle="tab">
                                                {property.description}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                        <div className="tab-content tabs">
                                          {ProductPropertyAddSelect.map((property, index) => (
                                            <div
                                              key={property.propertyid}
                                              role="tabpanel"
                                              className={`tab-pane fade ${index === 0 ? "in active" : ""}`}
                                              id={`Section${property.propertyid}`}
                                            >
                                              <div className="panel-box-div singlecolumn-property-grid">

                                                {property.isstatic === 1 ? (
                                                  
                                                  property.description === 'Colour' ? (
                                                    // Render something for 'Colour'
                                                    <E4kTblProductColourPropertyValueAddGrid/>
                                                  ) : property.description === 'Size' ? (
                                                    // Render something for 'Size'
                                                    <E4kTblProductSizePropertyValueAddGrid/>
                                                  ) : property.description === 'Fit' ? (
                                                    // Default rendering
                                                    <E4kTblProductFitPropertyValueAddGrid />
                                                    ) : (null)
                                                    
                                                  


                                                ) : (
                                                  // Render something for dynamic property
                                                 
                         


                                                    <E4kTblProductPropertyTypeValueAddGrid propdata ={[{
                                                      propid :property.propertyid,
                                                      propname:property.description,
                                                      idname: "E4kTblProductPropertyValueGrid" + property.description + String(property.propertyid)
                                                    }]}/>

                                                



                                                  

                                                )}

                                                
                                                  {((property.description === 'Size') && (ProductAddPropertySizeData.length > 0)) ? (

                                                  <span className="master-option-span" onClick={() => handleOpenProductAddpropertyValues(property.description,property)} style={{display : "none"}}>...</span>
                                                  ) : (
                                                  <span className="master-option-span" onClick={() => handleOpenProductAddpropertyValues(property.description,property)}>...</span>
                                                  )}
                                                
                                                  
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </div>


                            <div className="panel panel-default accrodion-div" style={{ display: isNewProduct ? 'block' : ProductSelect.productid ? "block": "none" }}>
                              <h4 className="panel-title"> 
                                <a className="collapsed" data-toggle="collapse"  href="#tblproductattributelevel" aria-expanded="false" aria-controls="tblproductattributelevel"><i className="plus-icon" aria-hidden="true"></i> Attribute Level </a> 
                              </h4>
                                <div id="tblproductattributelevel" className="collapse" aria-expanded="false">
                                    <div className="panel-box-div">
                                    <E4kTblProductPropertiesLevelSetMatrix />
                                        
                                      
                                    </div>
                                </div>
                            </div>


                            <div className="panel panel-default accrodion-div" style={{ display: isNewProduct ? 'block' : ProductSelect.productid ? "block": "none" }}>
                              <h4 className="panel-title"> 
                                <a className="collapsed" data-toggle="collapse"  href="#tblproductinventory" aria-expanded="false" aria-controls="tblproductinventory"><i className="plus-icon" aria-hidden="true"></i> Intrastat Info </a> 
                              </h4>
                                <div id="tblproductinventory" className="collapse" aria-expanded="false">
                                  <div className="panel-box-div">
                                    <div className="row">    

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                              <div className='input-lable'>
                                                  <span>Commodity Code</span>
                                              </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                                                  <DropDownList 
                                                    ref = {inputRefProductCommodityCode} 
                                                    id="TblProductCreateNewProductCommoditycode"
                                                    selectedIndexes={[0]} 
                                                    filterable 
                                                    placeholder="Select Comodity Code"
                                                    dataSource={dataGridCommodityCode.map(cat=>(cat.commoditycode))}
                                                    value = {ProductSelect.productid ? ProductSelect.commodityCode : ''} 
                                                    >
                                                  </DropDownList>
                                                  <span className="master-option-span" onClick={handleOpenProductNewCommodityCode}>...</span>
                                          </div>
                                      </div> 

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                              <div className='input-lable'>
                                                  <span>Country of Origin </span>
                                              </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                                                <DropDownList 
                                                    ref = {inputRefProductCountry} 
                                                    id="TblProductCreateNewProductCountry"
                                                    selectedIndexes={[0]} 
                                                    filterable 
                                                    placeholder="Select Country"
                                                    dataSource={dataGridCountry.map(cat=>(cat.country))}
                                                    value = {ProductSelect.productid ? ProductSelect.country : ''} 
                                                    >
                                                  </DropDownList>
                                            
                                                  <span className="master-option-span" onClick={handleOpenProductNewCountry}>...</span>
                                          </div>
                                      </div> 

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                              <div className='input-lable'>
                                                  <span>Weight</span>
                                              </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                              <div className="form-group">
                                                <NumberInput 
                                                  ref ={inputRefProductWeight} 
                                                  placeholder="weight"
                                                  step={0.1}
                                                  value = {ProductSelect.productid ? ProductSelect.weight : ''} 
                                                ></NumberInput>
                                                
                                              </div>
                                      </div> 

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                              <div className='input-lable'>
                                                  <span>Supplimentary Units</span>
                                              </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                              <div className="form-group">
                                                <Input 
                                                  ref = {inputRefProductSupplimentaryUnits}
                                                  placeholder="Supplimentary Units"
                                                  value = {ProductSelect.productid ? (ProductSelect.supplimentaryunits? ProductSelect.supplimentaryunits : "none" ) : ''} 
                                                  ></Input>
                                              </div>
                                      </div> 

                                      {/* <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                              <div className='input-lable'>
                                                  <span>Batch Control</span>
                                              </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                              <div className="form-group master-option">
                                                <SwitchButton 
                                                  ref = {inputRefProductBatchControl} 
                                                  id='Tblproductnewproductswitchbatchcontrol'
                                                  rightToLeft
                                                  checked  = {ProductSelect.productid ? ((ProductSelect.batchcontrol === true) ? true: false ) : false}
                                                  
                                                ></SwitchButton>
                                              </div>
                                      </div>                                                                                                                */}
                                    </div>
                                  </div>
                                </div>
                            </div>


                            <div className="panel panel-default accrodion-div" style={{ display: isNewProduct ? 'block' : ProductSelect.productid ? "block": "none" }}>
                              <h4 className="panel-title"> 
                                <a className="collapsed" data-toggle="collapse"  href="#tblproductpropertyreps" aria-expanded="false" aria-controls="tblproductpropertyreps"><i className="plus-icon" aria-hidden="true"></i> Reps </a> 
                              </h4>                                   

                                <div id="tblproductpropertyreps" className="collapse" aria-expanded="false">
                                  <div className="panel-box-div doublecolumn-property-grid">
                                      <E4kTblProductSalesPeopleAddGrid /> 

                                      <span className="master-option-span" onClick={handleOpenProductRepSalesPeople}>...</span>
                                    
                                  </div>
                                </div>
                            </div>

                            <div className="panel panel-default accrodion-div" style={{ display: isNewProduct ? 'block' : ProductSelect.productid ? "block": "none" }}>
                              <h4 className="panel-title"> 
                                <a className="collapsed" data-toggle="collapse"  href="#tblproductparametersettings" aria-expanded="false" aria-controls="tblproductparametersettings"><i className="plus-icon" aria-hidden="true"></i> Product Settings </a> 
                              </h4>                                   

                                <div id="tblproductparametersettings" className="collapse" aria-expanded="false">
                                  <div className="panel-box-div">
                                      <E4kTblProductParameterSettingsgrid /> 

                                    
                                  </div>
                                </div>
                            </div>

                            <div className="panel panel-default accrodion-div" style={{ display: isNewProduct ? 'block' : ProductSelect.productid ? "block": "none" }}>
                              <h4 className="panel-title"> 
                                <a className="collapsed" data-toggle="collapse"  href="#tblproductparametercustomersettings" aria-expanded="false" aria-controls="tblproductparametercustomersettings"><i className="plus-icon" aria-hidden="true"></i> Customer Product Settings </a> 
                              </h4>                                   

                                <div id="tblproductparametercustomersettings" className="collapse" aria-expanded="false">
                                  <div className="panel-box-div">
                                      <E4kTblProductParameterCustomerSettingsGrid /> 

                                    
                                  </div>
                                </div>
                            </div>



                            <div className="panel panel-default accrodion-div" style={{ display: isNewProduct ? 'block' : ProductSelect.productid ? "block": "none" }}>
                              <h4 className="panel-title"> 
                                <a className="collapsed" data-toggle="collapse"  href="#tblproductsupplierlevelsettings" aria-expanded="false" aria-controls="tblproductsupplierlevelsettings"><i className="plus-icon" aria-hidden="true"></i> Supplier Settings </a> 
                              </h4>                                   

                                <div id="tblproductsupplierlevelsettings" className="collapse" aria-expanded="false">
                                  <div className="panel-box-div">
                                     
                                  <E4kTblProductSupplierLevelSettingsGrid />
                                    
                                  </div>
                                </div>
                            </div>
                            


                            <div className="panel panel-default accrodion-div" style={{ display: isNewProduct ? 'block' : ProductSelect.productid ? "block": "none" }}>
                              <h4 className="panel-title"> 
                                <a className="collapsed" data-toggle="collapse"  href="#tblproductplanning" aria-expanded="false" aria-controls="tblproductplanning"><i className="plus-icon" aria-hidden="true"></i> Planning </a> 
                              </h4>
                                <div id="tblproductplanning" className="collapse" aria-expanded="false">
                                    <div className="panel-box-div">
                                      Planning Min Max Reorder Quantity
                                      Levels
                                      Weight Supplimentry Units  
                                        
                                      
                                    </div>
                                </div>
                            </div>

                            <div className="panel panel-default accrodion-div" style={{ display: isNewProduct ? 'block' : ProductSelect.productid ? "block": "none" }}>
                              <h4 className="panel-title"> 
                                <a className="collapsed" data-toggle="collapse"  href="#tblproductwarehouse" aria-expanded="false" aria-controls="tblproductwarehouse"><i className="plus-icon" aria-hidden="true"></i> Warehouse </a> 
                              </h4>
                                <div id="tblproductwarehouse" className="collapse" aria-expanded="false">
                                    <div className="panel-box-div">
                                      WareHouse Stock Location
                                        
                                        
                                      
                                    </div>
                                </div>
                            </div>




                          </div>
                        </div>
                        <div id="columnpopup2" className="col-md-3 col-xs-12" style={{ display: isColumn2Visible ? 'block' : 'none' }}>

                          <div className="mainpopup-right">
                            <div className="contact-list">
                              <div className="contact-img">
                                  <ImageUploader/>
                                <br/>
                              </div>

                              <div className="contact-des">
                                  <h4>Product Image</h4>
                                  {/* <p className="contact-des-line">Description</p> */}
                              </div>

                              {/* <div className="leftsidebar-clickdiv">
                                <div className="row">
                                  <div className="col-xs-8">
                                      <div className='input-lable'>
                                            <span>Balance</span>
                                      </div>
                                  </div>
                                  <div className="col-xs-4">
                                      <div className='input-lablevalue'>
                                        0.00
                                      </div>
                                  </div>

                                  <div className="col-xs-8">
                                      <div className='input-lable'>
                                            <span>Turnover Total</span>
                                      </div>
                                  </div>
                                  <div className="col-xs-4">
                                      <div className='input-lablevalue'>
                                        0.00
                                      </div>
                                  </div>


                                  <div className="col-xs-8">
                                      <div className='input-lable'>
                                            <span>Transaction Total</span>
                                      </div>
                                  </div>
                                  <div className="col-xs-4">
                                      <div className='input-lablevalue'>
                                        0.00
                                      </div>
                                  </div>

                                </div>  
                              </div> */}

                            </div>
                          </div>

                        </div>

                      </div>
                    </div>


                  </div>
          </div>
        </div>




       {/* <<<<<<<<<<<<Pop up code >>>>>>>>>                         */}
       {showConfirmSelectProduct && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmSelectProduct(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to inactive this Product?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmSelectProduct(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleProductDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
          

      </div> 

     </Draggable> 
          <E4kTblProductCategory1Grid showModalMediumcategory1={showModalNewProductcategory1} handleCloseMediumcategory1={handleCloseProductNewCategory1} />
          <E4kTblProductCategory2Grid showModalMediumcategory2={showModalNewProductcategory2} handleCloseMediumcategory2={handleCloseProductNewCategory2} />
          <E4kTblProductCategory3Grid showModalMediumcategory3={showModalNewProductcategory3} handleCloseMediumcategory3={handleCloseProductNewCategory3} />
          <E4kTblProductClassGrid showModalMedium={showModalNewProductclassid} handleCloseMedium={handleCloseProductNewClassid} />
          <E4kTblProductObsoleteTypesGrid showModalMediumObsoleteTypes={showModalNewProductobsoletetypes} handleCloseModalMediumObsoleteTypes={handleCloseProductNewObsoleteTypes} />
          <E4kTblProductTypeOfIssueGrid showModalMediumTypeOfIssue={showModalNewProducttypeofissue} handleCloseModalMediumTypeOfIssue={handleCloseProductNewTypeOfIssue} />
          <E4kTblProductUnitOfIssueGrid showModalMediumUnitOfIssue={showModalNewProductunitofissue} handleCloseModalMediumUnitOfIssue={handleCloseProductNewUnitofIssue} />
          <E4kTblProductStockingTypesGrid showModalMediumStockingTypes={showModalNewProductstockingtype} handleCloseMediumStockingTypes={handleCloseProductNewStockingTypes} />
          <E4kTblProductCommodityCodeGrid showModalMediumCommodityCode={showModalNewProductcommoditycode} handleCloseMediumCommodityCode={handleCloseProductNewCommodityCode} />                   
          <E4kCountryGrid showModalMediumCountry={showModalNewProductcountry}  handleCloseMediumCountry={handleCloseProductNewCountry} />
          <E4kTblNominalAccountGrid showModalMediumNominalAccount={showModalNewProductnominal} handleCloseMediumNominalAccount={handleCloseProductNewNominal} />

          <E4kTblProductPropertyTypesGrid showModalMediumPropertyTypes={showModalNewProductpropertyadd} handleCloseModalMediumPropertyTypes={handleCloseProductAddproperty} isEdit={isPropertyEdit} />                    
          <E4kTblProductColoursGrid showModalMediumColours={showModalNewProductpropertyColourValuesAdd} handleCloseMediumColours={() => handleCloseProductAddpropertyValues("Colour") } isEdit={isPropertyEdit} />    
          <E4kTblProductSizeRangesGrid showModalMediumSizeRanges={showModalNewProductpropertySizeValuesAdd} handleCloseModalMediumSizeRanges={() =>handleCloseProductAddpropertyValues("Size")} isEditSize={isPropertyEdit}/>    
          <E4kTblProductFitsGrid showModalMediumProducctFits={showModalNewProductpropertyFitValuesAdd} handleCloseMediumProducctFits={() => handleCloseProductAddpropertyValues("Fit")} isEditFits = {isPropertyEdit}/>                                                                                                                                                    
          <E4kTblProductPropertiesStockingLevelMatrix showModalMediumStockingLevelMatrix={showModalProductPropertiesStockingLevel} handleCloseMediumStockingLevelMatrix={handleCloseProductPropertiesStocklevel} />  
          <E4kTblProductPropertiesStockingTypeMatrix showModalMediumStockingTypeMatrix={showModalProductPropertiesStockingType} handleCloseMediumStockingTypeMatrix={handleCloseProductPropertiesStockType} />      
          <E4kTblProductPropertiesStandardPriceMatrix showModalMediumStandardPriceMatrix = {showModalProductPropertiesStandardPrice} handleCloseMediumStandardPriceMatrix = {handleCloseProductPropertiesStandardPrice} />  
          <E4kTblProductPropertiesStandardCostMatrix showModalMediumStandardCostMatrix = {showModalProductPropertiesStandardCost} handleCloseMediumStandardCostMatrix = {handleCloseProductPropertiesStandardCost} />                                      
          <E4kTblProductPropertiesCustomerPriceMatrix showModalMediumCustomerPriceMatrix = {showModalProductPropertiesCustomerPrice} handleCloseMediumCustomerPriceMatrix = {handleCloseProductPropertiesCustomerPrice} />
          <E4kTblProductPropertiesSupplierCostMatrix  showModalMediumSupplierCostMatrix = {showModalProductPropertiesSupplierCost} handleCloseMediumSupplierCostMatrix = {handleCloseProductPropertiesSupplierCost}/>
          <E4kTblBusSalesPeopleGrid showModalMediumSalesPeople={showModalNewProductRepSalesPeople} handleCloseModalMediumSalesPeople={() => handleCloseProductRepSalesPeople()} isEdit = {false}/>                                                                                                                                                               
          <E4kTblProductPropertiesPriceComparisonMatrix showModalMediumPriceCompareMatrix={showModalProductPriceCompare} handleCloseMediumPriceCompareMatrix={() => handleCloseProductPriceCompare()}/>                                                                                                                                                               
          <E4kTblProductPropertyTypesValuesGrid showModalMediumPropertyTypesValues={showModalNewProductpropertyaddTypeValue} handleCloseModalMediumPropertyTypesValues={handleCloseProductAddpropertyTypeValues} isEdit={false} property = {PropertyTypeId} />
          <E4kTblProductPropertiesObsoleteTypeMatrix showModalMediumObsoleteTypeMatrix={showModalProductPropertiesObsoleteType} handleCloseMediumObsoleteTypeMatrix={handleCloseProductPropertiesObsoleteType} />                           
          
          <E4kTblProductPropertiesStandardDatePriceMatrix showModalMediumStandardDatePriceMatrix = {showModalProductPropertiesStandardDatePrice} handleCloseMediumStandardDatePriceMatrix = {handleCloseProductPropertiesStandardDatePrice}/>

          
          <E4kTblProductPropertiesStandardQtyPriceMatrix showModalMediumStandardQtyPriceMatrix = {showModalProductPropertiesStandardQtyPrice} handleCloseMediumStandardQtyPriceMatrix = {handleCloseProductPropertiesStandardQtyPrice}/>

          {/* duplicate popup */}
          <E4kTblProductProductDuplicate showModalMediumNewProductDuplicate={showModalMediumNewProductDuplicate} handleCloseMediumNewProductDuplicate={handleCloseModalMediumNewProductDuplicate} />
    
    </>
  );
};

export default CreateNewProduct;