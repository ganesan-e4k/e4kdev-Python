import React from 'react';
import { useEffect, useState,useMemo  } from 'react';
import {Grid,Smart  } from 'smart-webcomponents-react/grid';
import { useSelector,useDispatch } from 'react-redux';
import {setSelectProduct,addSelectProductProperty} from '../store/slices/e4kTblProductSelectSlice';
import {useGetAllProductsQuery} from  '../store/services/e4kTblProduct';
import { 
  resetSelectProductPropertySize } from '../store/slices/e4kTblProductPropertySizeRangeSelect';

  import { 
  
    resetSelectProductPropertyTypesValues 
  } from '../store/slices/e4kTblProductProductPropertyTypeValues';

  import {
    resetSelectProductPropertyColour} from '../store/slices/e4kTblProductPropertyColourSelect'

  import {  
    resetSelectProductSalesPeople
} from '../store/slices/e4kTblProductSalesPeopleAdd';

import { 
  resetSelectProductProperty ,
  
} from '../store/slices/e4kTblProductPropertyAddSelect';


///////////////////////
import { useGetProductCategories1Query} from '../store/services/e4kTblProductCategory1';
import {useGetProductCategories2Query} from '../store/services/e4kTblProductCategory2';
import {useGetProductCategories3Query} from '../store/services/e4kTblProductCategory3';
import {useGetProductClassQuery} from '../store/services/e4kTblProductClass';
import {useGetProductObsoleteTypesQuery} from '../store/services/e4kTblProductObsoleteTypes';
import {useGetProductTypeOfIssueQuery} from '../store/services/e4kTblProductTypeOfIssue';
import {useGetProductUnitOfIssueQuery} from '../store/services/e4kTblProductUnitOfIssue';
import {useGetProductStockingTypesQuery} from '../store/services/e4kTblProductStockingTypes';
import {useGetProductCommodityCodeQuery} from '../store/services/e4kTblProductCommodityCode';
import {useGetCountriesQuery} from '../store/services/Customer/e4kTblCountry';
import {useGetNominalAccountsQuery} from '../store/services/Customer/e4kTblNominalAccount';


const addImageKey = (record) => {
  if(record.styleimage){
      const imagePathParts = record.styleimage.split('\\');
      const imageName = imagePathParts[imagePathParts.length - 1];
      return { ...record, styleimage: "/product/".concat(imageName) };
  } else {
    return { ...record, styleimage: "" };
  }
};


const addImageKey1 = (record) => {
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




const Echoproductgrid = React.memo(() => {
  
  const [data, setData] = useState([]);
  const CompanyallProductGrid = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyid, setCompanyid] = useState(CompanyallProductGrid);
  const dispatch = useDispatch();
  const NonLiveProduct = useSelector((state) => state.selectNonLiveProduct.selectNonLiveproduct);
 // const [showModalProductEdit, setShowModalNewProductEdit] = useState(false);
  
  const { data:allproductdata, error:allproducterror, isLoading:allproductisLoading, isError:allproductisError } =  useGetAllProductsQuery(companyid);

//////////////////////////////////////////// datagrid state for all fields
const [dataGridCategory1grid, setDataGridCategory1grid] = useState([]);
  const [dataGridCategory2grid, setDataGridCategory2grid] = useState([]);
  const [dataGridCategory3grid, setDataGridCategory3grid] = useState([]);
  const [dataGridClassidgrid, setDataGridClassidgrid] = useState([]);
  const [dataGridObsoleteTypesgrid, setDataGridObsoleteTypesgrid] = useState([]);
  const [dataGridTypeofIssuegrid, setDataGridTypeofIssuegrid] = useState([]);
  const [dataGridUnitofIssuegrid, setDataGridUnitofIssuegrid] = useState([]);
  const [dataGridStockingTypesgrid, setDataGridStockingTypesgrid] = useState([]);
  const [dataGridCommodityCodegrid, setDataGridCommodityCodegrid] = useState([]);
  const [dataGridCountrygrid, setDataGridCountrygrid] = useState([]);
  const [dataGridNominalgrid, setDataGridNominalgrid] = useState([]);


  /////////////////////////
  ///////////// master page State variables and api data
  const { data:category1datagrid, error:category1errorgrid, isLoading:category1isLoadinggrid, isError:category1isErrorgrid } = useGetProductCategories1Query(companyid);
  const { data:category2datagrid, error:category2errorgrid, isLoading:category2isLoadinggrid, isError:category2isErrorgrid } = useGetProductCategories2Query(companyid);
  const { data:category3datagrid, error:category3errorgrid, isLoading:category3isLoadinggrid, isError:category3isErrorgrid } = useGetProductCategories3Query(companyid);
  const { data:classiddatagrid, error:classiderrorgrid, isLoading:classidisLoadinggrid, isError:classidisErrorgrid } = useGetProductClassQuery(companyid);
  const { data:obsoletetypesdatagrid, error:obsoletetypeserrorgrid, isLoading:obsoletetypesisLoadinggrid, isError:obsoletetypesisErrorgrid } = useGetProductObsoleteTypesQuery(companyid);
  const { data:typeofissuedatagrid, error:typeofissueerrorgrid, isLoading:typeofissueisLoadinggrid, isError:typeofissueisErrorgrid } = useGetProductTypeOfIssueQuery({companyid:companyid,issueType:null});
  const { data:unitofissuedatagrid, error:unitofissueerrorgrid, isLoading:unitofissueisLoadinggrid, isError:unitofissueisErrorgrid } = useGetProductUnitOfIssueQuery({companyid:companyid,issueUnits:null});
  const { data:stockingtypedatagrid, error:stockingtypeerrorgrid, isLoading:stockingtypeisLoadinggrid, isError:stockingtypeisErrorgrid } = useGetProductStockingTypesQuery({companyid:companyid,stockingtype:''});
  const { data:commoditycodedatagrid, error:commoditycodeerrorgrid, isLoading:commoditycodeisLoadinggrid, isError:commoditycodeisErrorgrid } =  useGetProductCommodityCodeQuery(companyid);
  
  const { data:countrydatagrid, error:countryerrorgrid, isLoading:countryisLoadinggrid, isError:countryisErrorgrid } =  useGetCountriesQuery(companyid);
  const { data:nominaldatagrid, error:nominalerrorgrid, isLoading:nominalisLoadinggrid, isError:nominalisErrorgrid } =  useGetNominalAccountsQuery(companyid);


  ///////////////////////////////////////

  


useEffect(() => {
  if (category1datagrid) {
    transformDataGrid();
  }
}, [category1isLoadinggrid, category1datagrid]);

useEffect(() => {
if (category2datagrid) {
  transformDataGrid();
}
}, [category2isLoadinggrid ,category2datagrid]);

useEffect(() => {
if (category3datagrid) {
  transformDataGrid();
}
}, [category3isLoadinggrid, category3datagrid]);

useEffect(() => {
if (classiddatagrid) {
    
  transformDataGrid();
}
}, [classidisLoadinggrid, classiddatagrid]);

useEffect(() => {
if (obsoletetypesdatagrid) {
  transformDataGrid();
}
}, [obsoletetypesisLoadinggrid, obsoletetypesdatagrid]);

useEffect(() => {
if (typeofissuedatagrid) {
  transformDataGrid();
}
}, [typeofissueisLoadinggrid, typeofissuedatagrid]);


useEffect(() => {
if (unitofissuedatagrid) {
  transformDataGrid();
}
}, [unitofissueisLoadinggrid, unitofissuedatagrid]);

useEffect(() => {
if (stockingtypedatagrid) {
  transformDataGrid();
}
}, [stockingtypeisLoadinggrid, stockingtypedatagrid]);

useEffect(() => {
if (commoditycodedatagrid) {
  transformDataGrid();
}
}, [commoditycodeisLoadinggrid, commoditycodedatagrid]);

useEffect(() => {
  if (countrydatagrid) {
    transformDataGrid();
  }
  }, [countryisLoadinggrid, countrydatagrid]);

  useEffect(() => {
    if (nominaldatagrid) {
      transformDataGrid();
    }
    }, [nominalisLoadinggrid, nominaldatagrid]);

  //////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (allproductdata) {
      if (!allproductdata) return [];

        const sss_josn = allproductdata.e4kTblproductProductAll.map(jsonString => JSON.parse(jsonString));
        
        if (NonLiveProduct === false){
          const sss = sss_josn.filter(jsonString => jsonString.Live !== false);
          
          const processedData = sss.map(item => ({
          productid: item.ProductID,
          description: item.Description,
          category1id: item.Category1ID,
          category2id: item.Category2ID,
          category3id: item.Category3ID,
          weight: item.Weight,
          classid: item.ClassID,
          commodityCode: item.CommodityCode,
          Nominal : item.Nominal,
          StockingUOM: item.StockingUOM,
          issueuom: item.IssueUOM,
          notes: item.Notes,
          obsoleteClass: item.Obsolete_Class,
          styleimage: item.StyleImage,
          supplimentaryunits: item.SupplimentaryUnits,
          batchcontrol: item.BatchControl,
          live: item.Live,
          stockingtype: item.StockingType,
          country: item.CountryID,
        }));
        const Data = processedData.map(addImageKey);
        
        setData(Data);
        } else if (NonLiveProduct === true) {

        const sss = sss_josn.filter(jsonString => jsonString.Live === false);
        const processedData = sss.map(item => ({
          productid: item.ProductID,
          description: item.Description,
          category1id: item.Category1ID,
          category2id: item.Category2ID,
          category3id: item.Category3ID,
          weight: item.Weight,
          classid: item.ClassID,
          commodityCode: item.CommodityCode,
          Nominal : item.Nominal,
          StockingUOM: item.StockingUOM,
          issueuom: item.IssueUOM,
          notes: item.Notes,
          obsoleteClass: item.Obsolete_Class,
          styleimage: item.StyleImage,
          supplimentaryunits: item.SupplimentaryUnits,
          batchcontrol: item.BatchControl,
          live: item.Live,
          stockingtype: item.StockingType,
          country: item.CountryID,
        }));
        const Data = processedData.map(addImageKey);
        
        setData(Data);
      }
    }
  }, [allproductisLoading, allproductdata,NonLiveProduct]);





////////////////////////////transform data

const transformDataGrid = () => {
  if (!category1datagrid) return [];
  const datagrid = category1datagrid.e4kTblproductProductCategory1.map(category => ({
      category1id: category.category1id,
      companyid: category.companyid.companyid,
      category: category.description,
      imagePath: category.imagepath ,
      //attachments:category.imagepath
  }));
  const Data1 = datagrid.map(addImageKey1);
  //console.log('#######################################',Data1)
  setDataGridCategory1grid(Data1);


  if (!category2datagrid) return [];
  const datagrid2 = category2datagrid.e4kTblproductProductCategory2.map(category => ({
      category2id: category.category2id,
      companyid: category.companyid.companyid,
      category: category.description,
      imagePath: category.imagepath ,
  }));
  const Data2 = datagrid2.map(addImageKey2);
  setDataGridCategory2grid(Data2);

  if (!category3datagrid) return [];
  const datagrid3 = category3datagrid.e4kTblproductProductCategory3.map(category => ({
      category3id: category.category3id,
      companyid: category.companyid.companyid,
      description: category.description,
      }));
  setDataGridCategory3grid(datagrid3);

  if (!classiddatagrid) return [];
  const datagridclass = classiddatagrid.e4kTblproductProductClass.map(category => ({
      classid: category.classid,
      companyid: category.companyid.companyid,
      description: category.description,
      }));
  setDataGridClassidgrid(datagridclass);

  if (!obsoletetypesdatagrid) return [];
        const datagridobsoletetypes = obsoletetypesdatagrid.e4kTblproductProductObsoleteTypes.map(category => ({
            obsoleteid: category.obsoleteid,
            companyid: category.companyid.companyid,
            description: category.description,
            allowSale: category.allowSale
            }));
  setDataGridObsoleteTypesgrid(datagridobsoletetypes);

  if (!typeofissuedatagrid) return [];
        const datagridtypeofissue = typeofissuedatagrid.e4kTblproductProductTypeofissue.map(category => ({
            companyid: category.companyid.companyid,
            description: category.description,
            issueType: category.issueType
            }));
        
  setDataGridTypeofIssuegrid(datagridtypeofissue);

  if (!unitofissuedatagrid) return [];
        const datagridunit = unitofissuedatagrid.e4kTblproductProductUnitofissue.map(category => ({
            companyid: category.companyid.companyid,
            description: category.description,
            issueUnits: category.issueUnits
            }));
  setDataGridUnitofIssuegrid(datagridunit);

  if (!stockingtypedatagrid) return [];
        const stockingtypedata1 = stockingtypedatagrid.e4kTblproductProductStockingTypes.map((category, index) => ({
            id: index + 1, // Assign an incremental id starting from 1
            stockingtype: category.stockingtype,
            companyid: category.companyid.companyid,
            description: category.description,
        }));
        setDataGridStockingTypesgrid(stockingtypedata1);

  if (!commoditycodedatagrid) return [];
  const datagridcommoditycode = commoditycodedatagrid.e4kTblproductProductCommoditycodes.map((category, index) => ({
      id: index + 1, // Assign an incremental id starting from 1
      commoditycode: category.commodityCode,
      companyid: category.companyid.companyid,
      description: category.description,
  }));
  setDataGridCommodityCodegrid(datagridcommoditycode);

  ///// Country 
  if (!countrydatagrid) return [];
  
    const dataGridCountry = countrydatagrid.E4kCountry.map(Country => ({
      countryid: parseInt(Country.countryid, 10),
      companyid: Country.companyid.companyid,
      country: Country.country,
      member : Country.member,
      
    }));
    setDataGridCountrygrid(dataGridCountry);


    if (!nominaldatagrid) return [];
        const transformedData = nominaldatagrid.E4kTblnominallist.map(account => ({
            nomcode: account.nomcode.toString(),
            companyid: account.companyid.companyid,
            nomdescription: account.nomdescription,
            live: account.live,
            nombs: account.nombs,
            nomdc: account.nomdc,
            nompl: account.nompl,
        }));
    setDataGridNominalgrid(transformedData);

  
};









  //////////////////////////////////////////////////////////////////////////

  const dataSourceSettings = {
    dataFields: [
      'productid: string',
      'description: string',
      'category1id: string',
      'category2id: string',
      'category3id: string',
      'weight: number',
      'classid: string',
      'commodityCode: string',
      'Nominal: string',
      'StockingUOM: string',
      'issueuom: string',
      'notes: string',
      'obsoleteClass: string',
      'styleimage: string',
      'supplimentaryunits: string',
      'batchcontrol: bool',
      'live: bool',
      'stockingtype: string',
      'country: string',
    ],
	};



  const dataSource10 = useMemo(() => new Smart.DataAdapter({
    dataSource: data,
   
  }), [data]);

  
  

  // const dataSource10 = useMemo(() => data, [data]);

  const columns = [
    { 
      label: 'Product ID', 
      dataField: 'productid', 
      width: 150, 
      freeze: 'near' ,
    },
    { label: 'Description', dataField: 'description', width: 150 },
    { 
      label: 'Category1', 
      dataField: 'category1id',
      width: 120 ,
       //"filterMenuMode" : 'excel',
      filterEditor: {
				template: `
				<smart-input 
					drop-down-button-position="right" 
					placeholder="Select Category1" 
					style="border-radius: 0px; border: none; width: 100%; height:100%"
				></smart-input>`,
				onInit(column, editor) {

					const input = editor.querySelector('smart-input');
					input.dataSource = dataGridCategory1grid.map(dataGridCategory1 => dataGridCategory1.category);

					input.style.setProperty('--smart-background', 'transparent');

					input.onkeyup = (e) => {
						if (e.key === 'a' && e.ctrlKey) {
							input.select();
						}
					};

					input.onchange = () => {
						if (input.value === '') {
							column.filter = '';
						}
						else {
							column.filter = 'equal "' + input.value.trim() + '"';
						}
					}
				}
			}
      
      },

    { 
      label: 'Category2', 
      dataField: 'category2id',
      width: 120 ,
      // "filterMenuMode" : 'excel',
      filterEditor: {
				template: `
				<smart-input 
					drop-down-button-position="right" 
					placeholder="Select Category2" 
					style="border-radius: 0px; border: none; width: 100%; height:100%"
				></smart-input>`,
				onInit(column, editor) {

					const input = editor.querySelector('smart-input');
					input.dataSource = dataGridCategory2grid.map(dataGridCategory2 => dataGridCategory2.category);

					input.style.setProperty('--smart-background', 'transparent');

					input.onkeyup = (e) => {
						if (e.key === 'a' && e.ctrlKey) {
							input.select();
						}
					};

					input.onchange = () => {
						if (input.value === '') {
							column.filter = '';
						}
						else {
							column.filter = 'equal "' + input.value.trim() + '"';
						}
					}
				}
			}
      
    },
    { 
      label: 'Category3', 
      dataField: 'category3id',
       width: 110 ,
      //  "filterMenuMode" : 'excel',
       filterEditor: {
				template: `
				<smart-input 
					drop-down-button-position="right" 
					placeholder="Select Category3" 
					style="border-radius: 0px; border: none; width: 100%; height:100%"
				></smart-input>`,
				onInit(column, editor) {

					const input = editor.querySelector('smart-input');
					input.dataSource = dataGridCategory3grid.map(dataGridCategory3 => dataGridCategory3.description);

					input.style.setProperty('--smart-background', 'transparent');

					input.onkeyup = (e) => {
						if (e.key === 'a' && e.ctrlKey) {
							input.select();
						}
					};

					input.onchange = () => {
						if (input.value === '') {
							column.filter = '';
						}
						else {
							column.filter = 'equal "' + input.value.trim() + '"';
						}
					}
				}
			}
      
      },
    { label: 'Weight', dataField: 'weight', width: 100, visible: false },
    { 
      label: 'Class',
      dataField: 'classid',
      width: 100,
      // "filterMenuMode" : 'excel',
      filterEditor: {
				template: `
				<smart-input 
					drop-down-button-position="right" 
					placeholder="Select Class" 
					style="border-radius: 0px; border: none; width: 100%; height:100%"
				></smart-input>`,
				onInit(column, editor) {

					const input = editor.querySelector('smart-input');
					input.dataSource = dataGridClassidgrid.map(dataGridclass => dataGridclass.description);

					input.style.setProperty('--smart-background', 'transparent');

					input.onkeyup = (e) => {
						if (e.key === 'a' && e.ctrlKey) {
							input.select();
						}
					};

					input.onchange = () => {
						if (input.value === '') {
							column.filter = '';
						}
						else {
							column.filter = 'equal "' + input.value.trim() + '"';
						}
					}
				}
			}
    },
    { 
      label: 'Commodity Code', 
      dataField: 'commodityCode', 
      width: 130,
      // "filterMenuMode" : 'excel',
      filterEditor: {
				template: `
				<smart-input 
					drop-down-button-position="right" 
					placeholder="Select Commodity Code" 
					style="border-radius: 0px; border: none; width: 100%; height:100%"
				></smart-input>`,
				onInit(column, editor) {

					const input = editor.querySelector('smart-input');
					input.dataSource = dataGridCommodityCodegrid.map(commotity => commotity.description);

					input.style.setProperty('--smart-background', 'transparent');

					input.onkeyup = (e) => {
						if (e.key === 'a' && e.ctrlKey) {
							input.select();
						}
					};

					input.onchange = () => {
						if (input.value === '') {
							column.filter = '';
						}
						else {
							column.filter = 'equal "' + input.value.trim() + '"';
						}
					}
				}
			}
    
    },
    { 
      label: 'Nominal', 
      dataField: 'Nominal', 
      width: 130,
      filterEditor: {
				template: `
				<smart-input 
					drop-down-button-position="right" 
					placeholder="Select Nominal" 
					style="border-radius: 0px; border: none; width: 100%; height:100%"
				></smart-input>`,
				onInit(column, editor) {

					const input = editor.querySelector('smart-input');
					input.dataSource = dataGridNominalgrid.map(nominal => nominal.nomdescription);

					input.style.setProperty('--smart-background', 'transparent');

					input.onkeyup = (e) => {
						if (e.key === 'a' && e.ctrlKey) {
							input.select();
						}
					};

					input.onchange = () => {
						if (input.value === '') {
							column.filter = '';
						}
						else {
							column.filter = 'equal "' + input.value.trim() + '"';
						}
					}
				}
			}
    },
    { label: 'Issue UOM', dataField: 'issueuom', width: 100, visible: false ,"filterMenuMode" : 'excel',},
    { label: 'Stocking UOM', dataField: 'StockingUOM', width: 100, visible: false ,"filterMenuMode" : 'excel',},
    { label: 'Notes', dataField: 'notes', visible: false },
    { label: 'Obsolete Class', 
      dataField: 'obsoleteClass', 
      width: 150 ,
      // "filterMenuMode" : 'excel',
      filterEditor: {
				template: `
				<smart-input 
					drop-down-button-position="right" 
					placeholder="Select Obsolete Class" 
					style="border-radius: 0px; border: none; width: 100%; height:100%"
				></smart-input>`,
				onInit(column, editor) {

					const input = editor.querySelector('smart-input');
					input.dataSource = dataGridObsoleteTypesgrid.map(obsolete => obsolete.description);

					input.style.setProperty('--smart-background', 'transparent');

					input.onkeyup = (e) => {
						if (e.key === 'a' && e.ctrlKey) {
							input.select();
						}
					};

					input.onchange = () => {
						if (input.value === '') {
							column.filter = '';
						}
						else {
							column.filter = 'equal "' + input.value.trim() + '"';
						}
					}
				}
			}
    },
    { label: 'Style Image', dataField: 'styleimage', visible: false },
    { label: 'Supplimentary Units', dataField: 'supplimentaryunits', visible: false },
    { label: 'Batch Control', dataField: 'batchcontrol', visible: false },
    { label: 'Live', dataField: 'live', width: 50, visible: false },
    { label: 'Stocking Type', dataField: 'stockingtype', width: 50, visible: false },
    { 
      label: 'Country of Origin', 
      dataField: 'country', 
      width: 100, 
      filterEditor: {
				template: `
				<smart-input 
					drop-down-button-position="right" 
					placeholder="Select Country" 
					style="border-radius: 0px; border: none; width: 100%; height:100%"
				></smart-input>`,
				onInit(column, editor) {

					const input = editor.querySelector('smart-input');
					input.dataSource = dataGridCountrygrid.map(county => county.country);

					input.style.setProperty('--smart-background', 'transparent');

					input.onkeyup = (e) => {
						if (e.key === 'a' && e.ctrlKey) {
							input.select();
						}
					};

					input.onchange = () => {
						if (input.value === '') {
							column.filter = '';
						}
						else {
							column.filter = 'equal "' + input.value.trim() + '"';
						}
					}
				}
			}
    },
  ];

  const behavior = {
    columnResizeMode: 'growAndShrink',
  };

  const filtering = {
    enabled: true,
    filterRow: {
      visible: true,
    },
    // filterMenu: {
		// 	mode: 'excel'
		// }
  };

  const appearance = {
    // alternationCount: 2,
    // showRowHeader: true,
    autoShowColumnFilterButton: false
  };

  const paging = {
    enabled: true,
    pageSize: 500,
  };

  const pager = {
    visible: true,
  };

  const sorting = {
    enabled: true,
   // mode: 'many',
    mode: 'one'
  };

  const editing = {
    enabled: false,
  };

  const selection = {
    enabled: true,
    allowCellSelection: false,
    allowRowHeaderSelection: true,
    allowColumnHeaderSelection: true,
    //allowRowDoubleClick: true,
    mode: 'extended',
  };

  const header = {
    visible: true,
    buttons: ['filter','sort','search']
  };

  const grouping = {
    enabled: true,
  };

  //////////////////
  const handleaddSelectProductProperty = () => {
    const newProperty = { address: '123 Main St' };
    dispatch(addSelectProductProperty(newProperty));
  };
  

  const handleCloseProductModalEdit = () => {
   // setShowModalNewProductEdit(false);
    dispatch(setSelectProduct({}));
};

  ///////////////////////////////Row Click handlers

  const handleAllProductRowClick = (event) => {
    
      dispatch(resetSelectProductPropertySize())
      dispatch(resetSelectProductPropertyColour());
      dispatch(resetSelectProductPropertyTypesValues());
      dispatch(resetSelectProductSalesPeople());
      dispatch(resetSelectProductProperty());
        const productid = event.detail.row.data.productid;
        if (productid) { 
            const clickdata = {
                productid : productid,
                description : event.detail.row.data.description,
                category1id : event.detail.row.data.category1id,
                category2id : event.detail.row.data.category2id, 
                category3id : event.detail.row.data.category3id,
                classid : event.detail.row.data.classid,
                commodityCode : event.detail.row.data.commodityCode,
                Nominal: event.detail.row.data.Nominal,
                obsoleteClass: event.detail.row.data.obsoleteClass,
                issueuom: event.detail.row.data.issueuom,
                StockingUOM: event.detail.row.data.StockingUOM,
                stockingtype: event.detail.row.data.stockingtype,
                weight: event.detail.row.data.weight,
                supplimentaryunits: event.detail.row.data.supplimentaryunits || null,
                notes: event.detail.row.data.notes || null,
                live: event.detail.row.data.live,
                batchcontrol: event.detail.row.data.batchcontrol,
                styleimage: event.detail.row.data.styleimage,
                country: event.detail.row.data.country,
            };
            /////////////// Store select product data in to store
            //const data1 = addImageKey(clickdata)

            dispatch(setSelectProduct(clickdata));
            console.log('selected businessid store row click = ',clickdata)
            
        }};


  return (
    // <>
    //   <Grid
    //     id = "TblProductAllProductGrid"
    //     //view='card'
    //     header={header}
    //     dataSourceSettings={dataSourceSettings}
    //     dataSource={dataSource10}
    //     columns={columns}
    //     appearance={appearance}
    //     behavior={behavior}
    //     selection={selection}
    //     paging={paging}
    //     pager={pager}
    //     sorting={sorting}
    //     editing={editing}
    //     filtering={filtering}
    //     //grouping={grouping}
    //     //scrolling = "virtual"
    //     onRowClick={handleAllProductRowClick}
    //     //onRowDoubleClick={handleAllProductDoubleClick}
    //     className="lg w-full"
    //   />

  
    // </>


<>
    {allproductisLoading ? (
      <div>Loading...</div>
    ) : (
      (allproductdata && allproductdata.e4kTblproductProductAll.length > 0  ) ? (
        <Grid
          id="tblproductallproductgrid"
          //header={header}
          dataSourceSettings={dataSourceSettings}
          dataSource={dataSource10}
          columns={columns}
          appearance={appearance}
          behavior={behavior}
          selection={selection}
          paging={paging}
          pager={pager}
          sorting={sorting}
          //editing={editing}
          filtering={filtering}
          onRowClick={handleAllProductRowClick}
          //className="lg w-full"
        />
      ) : (null)
    )}
  </>
  );
});

export default Echoproductgrid;









