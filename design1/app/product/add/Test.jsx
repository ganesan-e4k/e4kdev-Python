// 'use client'


// import { useEffect, useState, useMemo, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { SwitchButton } from 'smart-webcomponents-react/switchbutton';
// import { DropDownList } from 'smart-webcomponents-react/dropdownlist';
// import { DropDownButton } from 'smart-webcomponents-react/dropdownbutton';
// import { Table } from 'smart-webcomponents-react/table';
// import { toast } from 'react-toastify';
// import Draggable from 'react-draggable';
// import { PivotTable } from 'smart-webcomponents-react/pivottable';
// import { Grid } from 'smart-webcomponents-react/grid';
// import {
//     useGetProductCustomerPriceMatrixLevelQuery,
//     useGetProductPropertiesLevelColMatrixLevelQuery,
//     useUpdateProductCustomerPriceMatrixLevelMutation,
//     useCreateProductCustomerPriceMatrixLevelMutation,
//     useGetProductStandardPriceMatrixLevelQuery
// } from '../../store/services/e4kTblProductProductPropertyLevelAPI';

// import {useGetAllCustomerQuery} from '../../store/services/e4kTblCustomer';
// import {useGetAllProductsQuery} from  '../../store/services/e4kTblProduct';


// import {
//     useGetProductPriceTypesQuery,
// } from '../../store/services/e4kTblProductPriceTypes';

// export default function App() {
//     const [dataGridCustomerPriceProduct, setDataGridCustomerPriceProduct] = useState([]);

//     const [dataGridStandardPriceProductCopy, setDataGridStandardPriceProductCopy] = useState([]);

//     const [dataGridCustomerPriceProductcol, setDataGridCustomerPriceProductcol] = useState([]);
//     const [dataGridPriceTypeAllCustomerProduct, setDataGridPriceTypeAllCustomerProduct] = useState([]);
//     const [pivotModeCustomerPriceProduct, setPivotModeCustomerPriceProduct] = useState(false);
//     const [selectCustomerPriceType, setSelectCustomerPriceType] = useState("");

//     const [filterColumnsCustomerPriceProduct,setFilterColumnsCustomerPriceProduct]  = useState([]);

//     const [companyid, setCompanyid] = useState('001');

//     const [Productlist, setProductlist] = useState([]);
//     const [AllProductlist, setAllProductlist] = useState([]);
//     const [newCustomer ,setnewCustomer] =useState(false);



//     const [selectProduct,setSelectProduct] = useState('')
//     const [SelectProductDropDownChange,setSelectProductDropDownChange] = useState('')

//     const tableCustomerPriceProductRef = useRef();
//     const inputRefProductPriceTypeCustomerPriceCustomerListProduct = useRef();
//     const pivotTableCustomerPriceProductRef = useRef();
//     const inputRefProductPriceTypeCustomerPriceProduct = useRef();
//     const [filterRowCustomerProduct, setFilterrowCustomerProduct] = useState(true);
//     const [isMaximizedCustomerPriceProduct, setIsMaximizedCustomerPriceProduct] = useState(false);

//     // API calls
//     const { data: customerPriceProductmatrixdata, isLoading: customerPriceProductmatrixisLoading } = useGetProductCustomerPriceMatrixLevelQuery({
//         companyid: companyid,
//         customerid: '1SCGUA01',
//         productid:'' 
//     });

//     ////// Copy standardPrice data
//     // API calls
//     const { data: standardPriceProductmatrixdataCopy, isLoading: standardPriceProductmatrixisLoadingCopy } = useGetProductStandardPriceMatrixLevelQuery({
//         companyid: companyid,
//         productid: selectProduct
//     });//,{skip:(selectProduct=== '') ? true:false}
//     ////////////


//     const { data: stocklevelcolProductmatrixdataCustomer, isLoading: stocklevelcolProductmatrixCustomerisLoading } = useGetProductPropertiesLevelColMatrixLevelQuery({
//         companyid: companyid,
//         productid: selectProduct
//     }); //,{skip:(selectProduct === '') ? true:false}

//     const [updateProductCustomerPriceProductMatrixlevel] = useUpdateProductCustomerPriceMatrixLevelMutation();
    
//     const [createProductCustomerPriceProductMatrixlevel] = useCreateProductCustomerPriceMatrixLevelMutation();
  

//     /////////////// Price types data all
//     const { data :customerpriceProductdata,
//         error:customerpriceProducterror, 
//         isLoading :customerpriceProductisloading,
//        isError :customerpriceiserror
//        } = useGetProductPriceTypesQuery({companyid:companyid,priceid:null});


// /////////////////////// All Customer Business id
//  /////////////// Price types data all
//  const { data :AllProductdata,
//     error:AllProductdataerror, 
//     isLoading :AllProductdataisloading,
//    isError :AllProductdataiserror
//    } = useGetAllProductsQuery(companyid);

    
//     useEffect(() => {
//         if (customerpriceProductdata) {
            
//             transformDataCustomerPriceProductData();
//         }
//     }, [customerpriceProductisloading, customerpriceProductdata]);

// ///////////////// DropDown change


    
//     useEffect(() => {
//         if (AllProductdata) {
            
//             if (!AllProductdata) return [];
//             const sss = AllProductdata.e4kTblproductProductAll.map(jsonString => JSON.parse(jsonString));
        
//             const processedData = sss.map(item => ({
//               productid: item.ProductID,
//               description: item.Description,
              
//             }));
        
            
//             setAllProductlist(processedData);
//             }
//     }, [AllProductdataisloading, AllProductdata]);




//     useEffect(() => {
//         if (selectCustomerPriceType !== '' && selectProduct !=='') {
//             filterDataByCustomerPriceType();
//         } else {
//             setDataGridCustomerPriceProduct([]); // Clear the data grid if no warehouse is selected
//             setDataGridCustomerPriceProductcol([]);
//             setProductlist([]);
//         }
//     }, [selectCustomerPriceType,selectProduct]);

    


//     //////////// Standprice copy data
//     useEffect(() => {
//         // Clear the data and columns when either of the API data is loading or changes
//         setDataGridStandardPriceProductCopy([]);
        

//         if (!standardPriceProductmatrixisLoadingCopy && standardPriceProductmatrixdataCopy && stocklevelcolProductmatrixdataCustomer  && selectProduct) {

//             const response = standardPriceProductmatrixdataCopy.e4kTblproductProductPriceStandardMatrix[0];
//             const responseKeys = Object.keys(response);
    
//             if (responseKeys.includes('message')) {
            
//                 setDataGridStandardPriceProductCopy([]);
//             } else if (responseKeys.includes('stdpricematix')) {
//                 transformDataStandardPriceProductCopymatrix();
//             }
            
//         }

//     },[standardPriceProductmatrixdataCopy,standardPriceProductmatrixisLoadingCopy,stocklevelcolProductmatrixdataCustomer,selectProduct]);
   


//     useEffect(() => {
//         // Clear the data and columns when either of the API data is loading or changes
//         setDataGridCustomerPriceProduct([]);
//         setDataGridCustomerPriceProductcol([]);
//         setFilterrowCustomerProduct(true);
//         setProductlist([]);
    
       

//         if (!customerPriceProductmatrixisLoading && customerPriceProductmatrixdata ) {
//             const response = customerPriceProductmatrixdata.e4kTblproductProductPriceCustomerMatrix;
           
//             if (response.some(item => 'message' in item)) {
//                 console.log('Message received');
//                 setDataGridCustomerPriceProduct([]);
//             } else if (response.some(item => 'cuspricematix' in item)) {
//                 // const pro_list = response.map(cus => cus.productid.productid);
               
//                 // setProductlist(pro_list);

//                 const pro_list  = response.map(cus => {
//                     return {
//                         productid: cus.productid.productid,
//                         description: cus.productid.productid + ' - '+ cus.productid.description
//                     }
//                     });
//                     setProductlist(pro_list)
                
//                 if (selectProduct !=='' && selectCustomerPriceType !== '' && stocklevelcolProductmatrixdataCustomer ) {
//                     transformDataCustomerPriceProductmatrix();
//                 }
//             }
//         }
    
//         if (!stocklevelcolProductmatrixCustomerisLoading && stocklevelcolProductmatrixdataCustomer && customerPriceProductmatrixdata ) {
//             const response = customerPriceProductmatrixdata.e4kTblproductProductPriceCustomerMatrix;
    
//             if (response.some(item => 'message' in item)) {
//                 console.log('Message received');
//                 setDataGridCustomerPriceProductcol([]);
//             } else if (response.some(item => 'cuspricematix' in item)) {
                
//                 if (selectProduct !== '' && selectCustomerPriceType !== '') {
//                     transformDataCustomerPriceProductmatrix();
//                     setFilterrowCustomerProduct(true);
//                 }
//             }
//         }
//     }, [customerPriceProductmatrixisLoading, stocklevelcolProductmatrixCustomerisLoading, customerPriceProductmatrixdata, stocklevelcolProductmatrixdataCustomer, selectProduct]);
    

//     const transformDataStandardPriceProductCopymatrix = () => {
//         if (!standardPriceProductmatrixdataCopy) return [];
//         setDataGridStandardPriceProductCopy(JSON.parse(standardPriceProductmatrixdataCopy.e4kTblproductProductPriceStandardMatrix[0].stdpricematix));
    
//     }

//     const transformDataCustomerPriceProductData = () => {
//         if (!customerpriceProductdata) return [];
//         const datagrid = customerpriceProductdata.e4kTblproductProductPriceTypes.map(category => ({
//             priceid: category.priceid,
//             companyid: category.companyid.companyid,
//             description: category.description,
//             priceType: category.priceType
//             }));
//         const result  = datagrid.filter(category => category.priceType === 2)
        
//         setDataGridPriceTypeAllCustomerProduct(result);
//     };

    
  

//     const transformDataCustomerPriceProductmatrix = () => {
//         if (!customerPriceProductmatrixdata) return [];

//         const cuspricetypeid = dataGridPriceTypeAllCustomerProduct.filter(priceType => priceType.description === selectCustomerPriceType )
//         const cuspricedata = customerPriceProductmatrixdata.e4kTblproductProductPriceCustomerMatrix
//         if (cuspricedata){
//             const select_cus_list = cuspricedata.filter(cus =>cus.productid.productid === selectProduct)
//             const filteredData = (JSON.parse(select_cus_list[0].cuspricematix)).filter(item => item.pricetype === cuspricetypeid[0].priceid);
//             setDataGridCustomerPriceProduct(filteredData);
//         }

//         if (!stocklevelcolProductmatrixdataCustomer) return [];
    
//         let cusPricecolumns = JSON.parse(stocklevelcolProductmatrixdataCustomer.e4kTblproductProductPropertyLevelColmatrix[0].pricecolmatrix);
    
        
//         if (!Array.isArray(cusPricecolumns)) {
//             cusPricecolumns = [];
//         }
        
//         cusPricecolumns = cusPricecolumns.filter(column => column.dataField  && !column.dataField.includes('summary') );
        
//         const updatedColumns = cusPricecolumns.map(column => {
//             if (column.dataField === 'price' ) {
//                 return {
//                     ...column,
//                     summarySettings: {
//                         // prefix: '$',
//                         decimalPlaces: 2
//                     }
//                 };
//             }
//             return column;
//         });

//         const columnss  = updatedColumns.filter(column => column.dataField !== 'pricetype');
//         const updatedColumn = columnss.map(col => {
//             if (col.dataField === 'price'){
//                 col.allowEdit = true;
//             }else{
//                 col.allowEdit = false;
//             }
//             return col;

//         })
//         setDataGridCustomerPriceProductcol(updatedColumn); // Check the updated columns
//     };
    

//     const filterDataByCustomerPriceType = () => {
//         if (selectCustomerPriceType !== '' && selectProduct !== '') {

//             if (!customerPriceProductmatrixdata) return [];


//             if (!customerPriceProductmatrixisLoading && customerPriceProductmatrixdata && stocklevelcolProductmatrixdataCustomer && selectProduct) {
//                 const response = customerPriceProductmatrixdata.e4kTblproductProductPriceCustomerMatrix;
        
//                 if (response.some(item => 'message' in item)) {
//                     console.log('Message received');
//                     setDataGridCustomerPriceProduct([]);
//                 } else if (response.some(item => 'cuspricematix' in item)) {
//                     // const cus_list = response.map(cus => cus.productid.productid);
//                     // setProductlist(cus_list);
//                     const pro_list  = response.map(cus => {
//                         return {
//                             productid: cus.productid.productid,
//                             description: cus.productid.productid + ' - '+ cus.productid.description
//                         }
//                         });
//                         setProductlist(pro_list)



//                     if (selectProduct !=='') {
//                         transformDataCustomerPriceProductmatrix();
//                     }
//                 }
//             }
            
//         }
//     };


//     const toggleMaximizeCustomerPriceProduct = () => {
//         setIsMaximizedCustomerPriceProduct(!isMaximizedCustomerPriceProduct);
//     };

//     const dataSourceCustomerPriceProduct = useMemo(() => dataGridCustomerPriceProduct, [dataGridCustomerPriceProduct]);

//     const onColumnRenderCustomerPriceProduct = (settings) => {
//         if (settings.column.summary) {
//             settings.text = settings.column.originalColumn.label.charAt(0).toUpperCase() +
//                 settings.column.originalColumn.label.slice(1);
//         }
//     };

//     const handleChangePivotModeCustomerPriceProduct = (e) => {
//         setPivotModeCustomerPriceProduct(e.detail.value);
        
//     };

//     //////////// Copy first
//     const handleCopyFirstCustomerPriceProduct = () => {
       
//         const table = document.getElementById('E4kTblProductPropertiescustomerPriceProductmatrixTable') 
//         const state = table.getState();

//         //if (filterButtonClick && state.filtered && state.filtered.rowFilters) {
//             if (state.filtered && state.filtered.rowFilters) {
//             const filters = state.filtered.rowFilters;
//             const filterColumns = [];
//             const filterValues = [];
            
        
//             filters.forEach(([column, filterInfo]) => {
//                 filterColumns.push(column);
//                 filterValues.push(filterInfo.filters.map(f => f.value.toUpperCase()));
//             });
        
//             const filteredRows = dataGridCustomerPriceProduct.filter(row => {
//                 return filterColumns.every((column, index) => {
//                     return filterValues[index].some(value => row[column].toUpperCase().includes(value));
//                 });
//             });
//              if (filteredRows.length > 0) {
//                     const firstRecord = filteredRows[0];
            
//                     const updatedDataGridCustomerPrice = dataGridCustomerPriceProduct.map(row => {
//                         const isMatch = filterColumns.every((column, index) => {
//                             return filterValues[index].some(value => row[column].toUpperCase().includes(value));
//                         });
            
//                         if (isMatch) {
//                             return {
//                                 ...row,
//                                 price: firstRecord.price,
//                                 pricetype: firstRecord.pricetype,
                               
//                             };
//                         }
//                         return row;
//                     });

//                 const pricetypeid = dataGridPriceTypeAllCustomerProduct.filter(priceType => priceType.description === selectCustomerPriceType ) 
//                 const finaldata = updatedDataGridCustomerPrice.filter(price => price.pricetype === pricetypeid[0].priceid)

               
            
//                     setDataGridCustomerPriceProduct(finaldata);
//                 } else {
//                     console.log('No rows found matching the filters.');
//                 }
            

//         }else {
    
//         if (filterColumnsCustomerPriceProduct.length === 0) {
//             if (dataGridCustomerPriceProduct.length > 0) {
//                 const firstRecord = dataGridCustomerPriceProduct[0];
    
//                 const updatedDataGridCustomerPrice = dataGridCustomerPriceProduct.map(row => {
//                     return {
//                         ...row,
//                         'price': firstRecord['price'],
//                         'pricetype': firstRecord['pricetype'],
//                     };
//                 });
//                 const pricetypeid = dataGridPriceTypeAllCustomerProduct.filter(priceType => priceType.description === selectCustomerPriceType ) 
//                 const finaldata = updatedDataGridCustomerPrice.filter(price => price.pricetype === pricetypeid[0].priceid)
            
//                 setDataGridCustomerPriceProduct(finaldata);
               
    
//             } else {
//                 console.log('No rows found in the data grid.');
//             }
            
//          } 
//         }
//     };

//     ///////// dropdown chnage data 
//     const handleDropDownonChangeCustomerPriceProduct = (event) => {
//         const value = event.detail.value;
//         setSelectCustomerPriceType(value);
//     };


//     const handleCellEditCustomerPriceProduct = (event) => {
//         //event.preventDefault();
//         const detail = event.detail;
//         const id = detail.id;
//         const dataField = detail.dataField;
//         const row = detail.row;
//         const value = detail.value;

//         const newData = [...dataGridCustomerPriceProduct];
//         newData[id][dataField] = value;
//         setDataGridCustomerPriceProduct(newData);
//     };

//     const handleProductCustomerPricelevelUpdate = async (category) => {
//         try {
//             const result = await updateProductCustomerPriceProductMatrixlevel(category);
//             if (result.error) {
//                 console.error('Mutation Error:', result.error);
//             } else {
//                 console.log('Mutation Success:', result.data);
//                 if (result.data.E4kTblproductProductpricecustomermatrixUpdate.success === "Success") {
//                     toast.success('Customer Price Updated', {
//                         position: "top-center",
//                         autoClose: 500,
//                         hideProgressBar: true,
//                     });
//                 } else {
//                     toast.error(result.data.E4kTblproductProductpricecustomermatrixUpdate.success, { position: "top-center" });
//                 }
//             }
//         } catch (error) {
//             console.error('Mutation Error:', error);
//         }
//     };
    
//     const handleSaveCustomerPriceProduct = () => {
//         let update_customer_price_save = []




//         if (selectCustomerPriceType !== '' && selectProduct !== '') {

//             if (!customerPriceProductmatrixdata) return [];


//             if (!customerPriceProductmatrixisLoading && customerPriceProductmatrixdata && stocklevelcolProductmatrixdataCustomer && ProductIDSelectCustomerProduct.productid) {
//                 const response = customerPriceProductmatrixdata.e4kTblproductProductPriceCustomerMatrix;
        
//                 if (response.some(item => 'message' in item)) {
//                     console.log('Message received');
//                     setDataGridCustomerPriceProduct([]);
//                 } else if (response.some(item => 'cuspricematix' in item)) {
//                     // const cus_list = response.map(cus => cus.productid.productid);
//                     // setProductlist(cus_list);
//                     const pro_list  = response.map(cus => {
//                         return {
//                             productid: cus.productid.productid,
//                             description: cus.productid.productid + ' - '+ cus.productid.description
//                         }
//                         });
//                         setProductlist(pro_list)


//                     if (selectProduct !=='') {
//                         const cuspricetypeid = dataGridPriceTypeAllCustomerProduct.filter(priceType => priceType.description === selectCustomerPriceType )
//                         const cuspricedata = customerPriceProductmatrixdata.e4kTblproductProductPriceCustomerMatrix
//                         if (cuspricedata){
//                             const select_cus_list = cuspricedata.filter(cus =>cus.productid.productid === selectProduct)
//                             const filteredData = (JSON.parse(select_cus_list[0].cuspricematix)).filter(item => item.pricetype !== cuspricetypeid[0].priceid);
//                             update_customer_price_save = filteredData.map(item => JSON.stringify(item));
//                         }
//                     }
//                 }
//             }
            
//         }

//         dataGridCustomerPriceProduct.map(row => {
            
//             update_customer_price_save.push(JSON.stringify(row))

//         })
       
//         let Updatecustomer_price_save = {
//                 companyid: companyid,
//                 productid: selectProduct,
//                 customerid: '1SCGUA01',
//                 "cuspricematix": update_customer_price_save,
//             };
//        handleProductCustomerPricelevelUpdate(Updatecustomer_price_save)

//     }





//     const handleCopyStandardPriceProductApifunction = () => {
        
//         const price_type_sp = dataGridPriceTypeAllCustomerProduct.filter(cus => cus.description === selectCustomerPriceType)
        
//         const all_price_sp = dataGridStandardPriceProductCopy.filter(cus => cus.pricetype === price_type_sp[0].priceid)
//         if(all_price_sp && selectProduct !==''){
//             setDataGridCustomerPriceProduct(all_price_sp)
//         }else{
//             toast.error('Not all standard price exist for selected customer price type', { 
//                 position: "top-center",
//                 autoClose: 500,
//                 hideProgressBar: true});
//         }
//     }








//     ///////////////// Create new Customer Price 
//     const handleCreateNewCustomerPriceProduct =() => {

//         setnewCustomer(true)
//         setSelectCustomerPriceType('')
//         setSelectProductDropDownChange('')

//         if (AllProductlist && AllProductlist.length > 0) {
//             //const datagrid11 = allcustomerlist.map(category => category.businessid);

//             // const datagrid11 = AllProductlist
//             //         .map(category => category.productid)
//             //         .filter(productid => !Productlist.includes(productid));
//             // console.log('All Product List After filtering: = ', datagrid11)
//             //         setProductlist(datagrid11)

//             const dataproductbusiness = Productlist.map(category => category.productid);
//             console.log('Product list :', dataproductbusiness)
//             const datagrid11 = AllProductlist
//                                 .map(category => ({
//                                     productid: category.productid,
//                                     description: category.productid + ' - ' + category.description,
//                                 }))
//                                 .filter(category => !dataproductbusiness.includes(category.productid));
//             console.log('All Product List After filtering: = ', datagrid11)                   
//             setProductlist(datagrid11);

            

//         }

//     }

    

//     ///////////////////// Api for create new Customer Price api
//     const handleProductCustomerPricelevelCreate = async (category) => {
//         try {
//             const result = await createProductCustomerPriceProductMatrixlevel(category);
//             if (result.error) {
//                 console.error('Mutation Error:', result.error);
//             } else {
//                 console.log('Mutation Success:', result.data);
//                 if (result.data.E4kTblproductProductpricecustomermatrixCreate.success === "Success") {
//                     toast.success('Customer Price Created', {
//                         position: "top-center",
//                         autoClose: 500,
//                         hideProgressBar: true,
//                     });
//                     setnewCustomer(false)
//                     setSelectProduct('');
//                     setSelectProductDropDownChange('');
//                 } else {
//                     toast.error(result.data.E4kTblproductProductpricecustomermatrixCreate.success, { position: "top-center" });
//                 }
//             }
//         } catch (error) {
//             console.error('Mutation Error:', error);
//         }
//     };

//     const handleCloseCustomerPriceProduct = () => {

//         setFilterrowCustomerProduct(false);
//         setPivotModeCustomerPriceProduct(false)
//         setSelectCustomerPriceType('');
//         setSelectProduct('');
//         setSelectProductDropDownChange('')
//         setnewCustomer(false);
//         setAllProductlist([])
//         setProductlist([]);
//         const droplist = inputRefProductPriceTypeCustomerPriceCustomerListProduct.current
       
//         if (droplist) {
//             droplist.clearItems()
//             // droplist.clearSelection()
            
//             // setProductlist([]);
           
//         }
//         console.log('##################al produc  closing  =',Productlist)
       

//     }

// 	const dataSource = AllProductlist;

//     const dataSourceSettings = {
// 		dataFields: [
// 			'productid: string',
// 			'description: string',
			

// 		]
// 	}
	
// 	const selection = {
// 		enabled: true,
// 		mode: 'extended'
// 	};
	
// 	const editing = {
// 		enabled: true,
// 		dialog: {
// 			height: 600
// 		}
// 	}
	
// 	const layout  = {
// 		cardMinWidth: 350
// 	}
	
// 	const columns = [
// 		{ label: 'ProductID', dataField: 'productid', dataType: 'number', columnGroup: 'name', allowEdit: false, width: 130 },
// 		{
// 			label: 'Description', dataField: 'description', columnGroup: 'name', width: 100
// 		},
		
		
// 	]
//     const header = {
//         visible: true,
//         buttons: ['filter','sort','search']
//       };

//       const filtering = {
//         enabled: true,
//         filterRow: {
//           visible: true,
//         },
//       };

// 	const dropDownMode = true
	
// 	return (
// 		<div>
// 			<Grid 
// 				dropDownMode={dropDownMode}
// 				dataSource={dataSource}
// 				dataSourceSettings={dataSourceSettings}
// 				selection={selection}
// 				layout={layout}
// 				editing={editing}
// 				columns={columns}
//                 filtering={filtering}
//                 header={header}
                
// 			></Grid>
// 		</div>
// 	)
// }


// import { Smart, Grid } from 'smart-webcomponents-react/grid';

// export function GetData(rowscount, last, hasNullValues) {
// 	const data = [];

// 	if (rowscount === undefined) {
// 		rowscount = 100;
// 	}

// 	let startIndex = 0;

// 	if (last) {
// 		startIndex = rowscount;
// 		rowscount = last - rowscount;
// 	}

// 	const firstNames =
// 		[
// 			'Andrew', 'Nancy', 'Shelley', 'Regina', 'Yoshi', 'Antoni', 'Mayumi', 'Ian', 'Peter', 'Lars', 'Petra', 'Martin', 'Sven', 'Elio', 'Beate', 'Cheryl', 'Michael', 'Guylene'
// 		];

// 	const lastNames =
// 		[
// 			'Fuller', 'Davolio', 'Burke', 'Murphy', 'Nagase', 'Saavedra', 'Ohno', 'Devling', 'Wilson', 'Peterson', 'Winkler', 'Bein', 'Petersen', 'Rossi', 'Vileid', 'Saylor', 'Bjorn', 'Nodier'
// 		];

// 	const productNames =
// 		[
// 			'Black Tea', 'Green Tea', 'Caffe Espresso', 'Doubleshot Espresso', 'Caffe Latte', 'White Chocolate Mocha', 'Caramel Latte', 'Caffe Americano', 'Cappuccino', 'Espresso Truffle', 'Espresso con Panna', 'Peppermint Mocha Twist'
// 		];

// 	const priceValues =
// 		[
// 			'2.25', '1.5', '3.0', '3.3', '4.5', '3.6', '3.8', '2.5', '5.0', '1.75', '3.25', '4.0'
// 		];

// 	for (let i = 0; i < rowscount; i++) {
// 		const row = {};

// 		const productindex = Math.floor(Math.random() * productNames.length);
// 		const price = parseFloat(priceValues[productindex]);
// 		const quantity = 1 + Math.round(Math.random() * 10);

// 		row.id = startIndex + i;
// 		row.reportsTo = Math.floor(Math.random() * firstNames.length);

// 		if (i % Math.floor(Math.random() * firstNames.length) === 0) {
// 			row.reportsTo = null;
// 		}

// 		row.available = productindex % 2 === 0;

// 		if (hasNullValues === true) {
// 			if (productindex % 2 !== 0) {
// 				const random = Math.floor(Math.random() * rowscount);
// 				row.available = i % random === 0 ? null : false;
// 			}
// 		}

// 		row.firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
// 		row.lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
// 		row.name = row.firstName + ' ' + row.lastName;
// 		row.productName = productNames[productindex];
// 		row.price = price;
// 		row.quantity = quantity;
// 		row.total = price * quantity;

// 		const date = new Date();
// 		date.setFullYear(2016, Math.floor(Math.random() * 11), Math.floor(Math.random() * 27));
// 		date.setHours(0, 0, 0, 0);
// 		row.date = date;

// 		data[i] = row;
// 	}

// 	return data;
// }

// function Test() {

// 	const behavior = {
// 		columnResizeMode: 'growAndShrink'
// 	}

// 	const appearance = {
// 		alternationCount: 2,
// 		showRowHeader: true,
// 		showRowHeaderSelectIcon: true,
// 		showRowHeaderFocusIcon: true
// 	}

// 	const paging = {
// 		enabled: true
// 	}

// 	const pager = {
// 		visible: true
// 	}

// 	const sorting = {
// 		enabled: true
// 	}

// 	const editing = {
// 		enabled: true
// 	}

// 	const selection = {
// 		enabled: true,
// 		allowCellSelection: true,
// 		allowRowHeaderSelection: true,
// 		allowColumnHeaderSelection: true,
// 		mode: 'extended'
// 	}

// 	const dataSource = new Smart.DataAdapter({
// 		dataSource: GetData(500),
// 		dataFields: [
// 			'id: number',
// 			'firstName: string',
// 			'lastName: string',
// 			'productName: string',
// 			'quantity: number',
// 			'price: number',
// 			'total: number'
// 		]
// 	})

// 	const columns = [
// 		{
// 			label: 'First Name',
// 			dataField: 'firstName',
// 			columnGroup: 'name'
// 		},
// 		{
// 			label: 'Last Name',
// 			dataField: 'lastName',
// 			columnGroup: 'name'
// 		},
// 		{
// 			label: 'Product',
// 			dataField: 'productName',
// 			columnGroup: 'order'
// 		},
// 		{
// 			label: 'Quantity',
// 			dataField: 'quantity',
// 			columnGroup: 'order'
// 		},
// 		{
// 			label: 'Unit Price',
// 			dataField: 'price',
// 			cellsFormat: 'c2',
// 			columnGroup: 'order',
// 			formatFunction(settings) {
// 				if (settings.value >= 4) {
// 					settings.cell.background = '#00A45A';
// 					settings.cell.color = '#fff';
// 				} else if (settings.value < 2) {
// 					settings.cell.background = '#DF3800';
// 					settings.cell.color = '#fff';
// 				} else {
// 					settings.cell.background = '#FFFDE1';
// 					settings.cell.color = '#333';
// 				}
// 				settings.value = '$' + settings.value;
// 			}
// 		},
// 		{
// 			label: 'Total',
// 			dataField: 'total',
// 			cellsFormat: 'c2',
// 			columnGroup: 'order',
// 			formatFunction(settings) {
// 				if (settings.value >= 20) {
// 					settings.cell.background = '#00A45A';
// 					settings.cell.color = '#fff';
// 				}
// 				if (settings.value <= 5) {
// 					settings.cell.background = '#DF3800';
// 					settings.cell.color = '#fff';
// 				} else {
// 					settings.cell.background = '#FFFDE1';
// 					settings.cell.color = '#333';
// 				}
// 				settings.value = '$' + settings.value;
// 			}
// 		}
// 	]

// 	const columnGroups = [
// 		{
// 			label: 'Customer Name',
// 			align: 'center',
// 			name: 'name'
// 		},
// 		{
// 			label: 'Order Detals',
// 			align: 'center',
// 			name: 'order'
// 		}
// 	]

// 	return (
// 		<div>
// 			<div>The Grid in this demo displays data in a series of rows and columns. This
// 				is the simplest case when the Grid is bound to a local data source.
// 			</div>
// 			<Grid
// 				dataSource={dataSource}
// 				columns={columns}
// 				columnGroups={columnGroups}
// 				appearance={appearance}
// 				behavior={behavior}
// 				selection={selection}
// 				paging={paging}
// 				pager={pager}
// 				sorting={sorting}
// 				editing={editing}
// 			>
// 			</Grid>
// 		</div>
// 	);
// }



// export default Test;