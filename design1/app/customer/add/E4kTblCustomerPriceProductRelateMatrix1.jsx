
// 'use client';
// import { useEffect, useState, useMemo, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { Grid } from 'smart-webcomponents-react/grid';
// import { SwitchButton } from 'smart-webcomponents-react/switchbutton';
// import { DropDownList } from 'smart-webcomponents-react/dropdownlist';
// import { Table } from 'smart-webcomponents-react/table';
// import { toast } from 'react-toastify';
// import Draggable from 'react-draggable';
// import { PivotTable } from 'smart-webcomponents-react/pivottable';
// import {
//     useGetProductCustomerPriceMatrixLevelQuery,
//     useGetProductPropertiesLevelColMatrixLevelQuery,
//     useUpdateProductCustomerPriceMatrixLevelMutation,
//     useCreateProductCustomerPriceMatrixLevelMutation,
//     useGetProductStandardPriceMatrixLevelQuery
// } from '../../store/services/e4kTblProductProductPropertyLevelAPI';

// // import {useGetAllCustomerQuery} from '../../store/services/e4kTblCustomer';
// import {useGetAllProductsQuery} from  '../../store/services/e4kTblProduct';


// import {
//     useGetProductPriceTypesQuery,
// } from '../../store/services/e4kTblProductPriceTypes';

// const E4kTblCustomerPriceProductRelateMatrix1 = ({ showModalMediumCustomerPriceProductMatrix, handleCloseMediumCustomerPriceProductMatrix }) => {
//     const [dataGridCustomerPriceProduct, setDataGridCustomerPriceProduct] = useState([]);
//     const Customerselect =useSelector((state) => state.selectCustomer.selectCustomer);

//     const [dataGridStandardPriceProductCopy, setDataGridStandardPriceProductCopy] = useState([]);

//     const [dataGridCustomerPriceProductcol, setDataGridCustomerPriceProductcol] = useState([]);
//     const [dataGridPriceTypeAllCustomerProduct, setDataGridPriceTypeAllCustomerProduct] = useState([]);
//     const [pivotModeCustomerPriceProduct, setPivotModeCustomerPriceProduct] = useState(false);
//     const [selectCustomerPriceType, setSelectCustomerPriceType] = useState("");
//     const [productselectedinlist,setproductselectedinlist]= useState("")

//     const [filterColumnsCustomerPriceProduct,setFilterColumnsCustomerPriceProduct]  = useState([]);
 
     
//     const [Productlist, setProductlist] = useState([]);
//     const [AllProductlist, setAllProductlist] = useState([]);
//     const [newCustomer ,setnewCustomer] =useState(false);
//     const dropdownGridCustomerPriceProductRelateRef = useRef();
//     const switchbuttonCustomerPriceProductRelateRef = useRef();
//     const [selectProduct,setSelectProduct] = useState('')
//     const [SelectProductDropDownChange,setSelectProductDropDownChange] = useState('')

//     const tableCustomerPriceProductRef = useRef();
//     const inputRefProductPriceTypeCustomerPriceCustomerListProduct = useRef();
//     const pivotTableCustomerPriceProductRef = useRef();
//     const inputRefProductPriceTypeCustomerPriceProduct = useRef();
//     const [filterRowCustomerProduct, setFilterrowCustomerProduct] = useState(true);
//     const [isMaximizedCustomerPriceProduct, setIsMaximizedCustomerPriceProduct] = useState(false);

//     //const ProductIDSelectCustomerProduct = useSelector((state) => state.selectProduct.selectProduct);

//     const customerpricequery = !Customerselect.CompanyID && !Customerselect.businessid ;
//     const productstatedprice = !Customerselect.businessid;
//     const productpropertiesquery = !Customerselect.CompanyID;
//     const productpricertypes  = ! Customerselect.CompanyID ;

//     // API calls
//     const { data: customerPriceProductmatrixdata, isLoading: customerPriceProductmatrixisLoading ,refetch:customerpricerefetch} = useGetProductCustomerPriceMatrixLevelQuery({
//         companyid: Customerselect.CompanyID || Customerselect.companyid,
//         customerid: Customerselect.businessid,
//         productid:'' 
//     }, {skip : customerpricequery});


//     console.log("GJJJJJJJJJJJJJJJJJJ" ,{ companyid: Customerselect.CompanyID ||  Customerselect.companyid,
//         customerid: Customerselect.businessid,
//         productid:'' } )

//     ////// Copy standardPrice data
//     // API calls
//     const { data: standardPriceProductmatrixdataCopy, isLoading: standardPriceProductmatrixisLoadingCopy } = useGetProductStandardPriceMatrixLevelQuery({
//         companyid: Customerselect.CompanyID ||  Customerselect.companyid,
//         productid: selectProduct 
//     }, {skip :productstatedprice });//,{skip:(selectProduct=== '') ? true:false}
//     ////////////


//     const { data: stocklevelcolProductmatrixdataCustomer, isLoading: stocklevelcolProductmatrixCustomerisLoading } = useGetProductPropertiesLevelColMatrixLevelQuery({
//         companyid: Customerselect.CompanyID,
//         productid: selectProduct
//     },{skip : productpropertiesquery  }); //,{skip:(selectProduct === '') ? true:false}

//     const [updateProductCustomerPriceProductMatrixlevel] = useUpdateProductCustomerPriceMatrixLevelMutation();
    
//     const [createProductCustomerPriceProductMatrixlevel] = useCreateProductCustomerPriceMatrixLevelMutation();
  

//     /////////////// Price types data all
//     const { data :customerpriceProductdata,
//         error:customerpriceProducterror, 
//         isLoading :customerpriceProductisloading,
//        isError :customerpriceiserror
//        } = useGetProductPriceTypesQuery(
//         {companyid:Customerselect.CompanyID ,
//         priceid:null},{ skip: productpricertypes});


// /////////////////////// All Customer Business id
//  /////////////// Price types data all
//  const { data :AllProductdata,
//     error:AllProductdataerror, 
//     isLoading :AllProductdataisloading,
//    isError :AllProductdataiserror
//    } = useGetAllProductsQuery(Customerselect.CompanyID);

// console.log("GDGHFxsxsjjhc" , AllProductdata)
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
//                         description: cus.productid.description
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
//     }, [customerPriceProductmatrixisLoading,showModalMediumCustomerPriceProductMatrix, stocklevelcolProductmatrixCustomerisLoading, customerPriceProductmatrixdata, stocklevelcolProductmatrixdataCustomer, selectProduct]);
    

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
//                             description: cus.productid.description
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
//                    customerpricerefetch()
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
//                             description: cus.productid.description
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
//                 companyid: Customerselect.CompanyID,
//                 productid: selectProduct,
//                 customerid: Customerselect.businessid,
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
//         console.log('Create new customer price product')
//         setnewCustomer(true)
//         setSelectCustomerPriceType('')
//         setSelectProductDropDownChange('')
//         setSelectProduct('')

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
//                                     description: category.description,
//                                 }))
//                                 .filter(category => !dataproductbusiness.includes(category.productid));
//             console.log('All Product List After filtering: = ', datagrid11)                   
//             setProductlist(datagrid11);

            

//         }

//     };

   





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
//                     customerpricerefetch()
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
//         switchbuttonCustomerPriceProductRelateRef.current.checked = false;
//         console.log('##################al produc  closing  =',Productlist)
//         handleCloseMediumCustomerPriceProductMatrix()

//     }




//     ///////////////////////////////// Grid DropDown Change
//     const dropDownMode1 = true
//     const dataSource1 = Productlist;

//     const dataSourceSettings1 = {
// 		dataFields: [
// 			'productid: string',
// 			'description: string',
			

// 		]
// 	}
	
// 	const selection1 = {
// 		enabled: true,
// 		mode: 'extended'
// 	};
	
// 	const editing1 = {
// 		enabled: true,
// 		dialog: {
// 			height: 600
// 		}
// 	}
	
// 	const layout1  = {
// 		cardMinWidth: 350
// 	}
	
// 	const columns1 = [
// 		{ label: 'ProductID', dataField: 'productid', allowEdit: false },
// 		{label: 'Description', dataField: 'description'},
		
		
// 	]
//     const header1 = {
//         visible: true,
//         buttons: ['filter','sort','search']
//       };

//       const filtering1 = {
//         enabled: true,
//         filterRow: {
//           visible: true,
//         },
//       };

	

//     const dataSource10 = useMemo(() => new Smart.DataAdapter({
//         dataSource: Productlist,
       
//       }), [Productlist]);


//        ///////////////////////////////Row Click handlers

//   const handleProductRowClick = (event) => {
    
//       const productid = event.detail.row.data.productid;
//       console.log('Product Clicked =>', event)
//       if (productid) { 
//           const clickdata = {
//               productid : productid,
//               description : event.detail.row.data.description,
              
//           };
//         dropdownGridCustomerPriceProductRelateRef.current.closeDropDown()
//         //const propdata = clickdata['description'].split(' -')[0];
//         const propdata = clickdata['productid'];
//         setSelectProduct(propdata);
        
//         setSelectProductDropDownChange(clickdata['description'])

//         if (newCustomer && propdata !==''){
//             setnewCustomer(false)
//             console.log('New Customer list selected =>',propdata)
//             let customerdata = {
//                 companyid: Customerselect.CompanyID,
//                 customerid: Customerselect.businessid,
//                 productid: propdata,
//             }
//             handleProductCustomerPricelevelCreate(customerdata)
            
//             setSelectProduct('');
//             setSelectProductDropDownChange('');
//         }

          
          
          
//       }};




//       const message = useMemo(() => ({
//         en: {
//             dropDownPlaceholder: selectProduct !== '' ? selectProduct : 'Select Product',
//         },
//     }), [selectProduct]);
     
//     const modalDialogclassNameCustomerPriceProduct = isMaximizedCustomerPriceProduct ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

//     return (
//         <>
//         <Draggable handle=".e4kmodal-header">
//             <div className={`modal fade ${showModalMediumCustomerPriceProductMatrix ? 'in' : ''}`} style={{ display: showModalMediumCustomerPriceProductMatrix ? 'block' : 'none' }}>
//                 <div className={modalDialogclassNameCustomerPriceProduct}>
//                     <div className="modal-content medium-popup-div">
//                         <div className="modal-body">
//                             <div className="breadcomb-area e4kmodal-header">
//                                 <div className="container-fluid remove-padding">
//                                     <div className="row">
//                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                                             <div className="breadcomb-list">
//                                                 <div className="row">
//                                                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">

//                                                          <div className='popup-topbar-title'>
//                                                             {Customerselect.businessid} - Customer Price - {selectProduct}
//                                                         </div>

//                                                     </div>
//                                                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
//                                                         <div className="breadcomb-wp">
//                                                             <div className="breadcomb-ctn">
//                                                             <span onClick={() => handleSaveCustomerPriceProduct()}><a href="#"> <i className="fa fa-check" ></i> Save</a></span>
                                                            
//                                                                     {/* <span onClick={() => handleNewCustomerPrice()}><a href="#"> <i className="fa fa-check" ></i> Create</a></span>  */}
//                                                                     <span onClick={() => handleCreateNewCustomerPriceProduct()}><a href="#"> <i className="fa fa-plus" ></i> New</a></span>
                                                            
                                                           
//                                                             </div>
//                                                         </div>
                                                    
//                                                     </div>
//                                                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
//                                                         <div className='popup-top-rightdiv'>
//                                                             <span className="innerpopup-top-rightdiv">Switch To Edit Mode:</span>
//                                                             <SwitchButton ref={switchbuttonCustomerPriceProductRelateRef} rightToLeft onChange={(e) => handleChangePivotModeCustomerPriceProduct(e)}></SwitchButton>
//                                                             <button type="button" className="btn-link" onClick={toggleMaximizeCustomerPriceProduct}>
//                                                                 {isMaximizedCustomerPriceProduct ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i>}
//                                                             </button>
//                                                             <button type="button" className="close" onClick={() => handleCloseCustomerPriceProduct()}>
//                                                                 &times;
//                                                             </button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="breadcomb-area">
//                                 <div className="container-fluid remove-padding">
//                                     <div className="row">
//                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grid-flex">
//                                             <div className="customer-newbold"> {Customerselect.businessid} - Customer Price - {selectProduct !=='' ? selectProduct:'' } ({SelectProductDropDownChange !=='' ? (SelectProductDropDownChange):''}) </div>
                                            
                                                
                                            
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Grid */}
                            
//                             <div className='popupmasterpage-topfield'>
//                                 <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
//                                     <div className='input-lable'>
//                                         <span>Product </span>
//                                     </div>
//                                 </div>    
//                                 <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
//                                     <div className='form-group master-option'>   
//                                                 <Grid 
//                                                     ref = {dropdownGridCustomerPriceProductRelateRef}
//                                                     dropDownMode={dropDownMode1}
//                                                     dataSource={dataSource1}
//                                                     dataSourceSettings={dataSourceSettings1}
//                                                     selection={selection1}
//                                                     layout={layout1}
//                                                     editing={editing1}
//                                                     columns={columns1}
//                                                     filtering={filtering1}
//                                                     header={header1}
//                                                     onRowClick={handleProductRowClick}
//                                                     messages={message}
//                                                     setDropDownLabel = {selectProduct}
//                                                     // messages = {SelectProductDropDownChange !=='' ? {
//                                                     //     "en": {
//                                                     //         dropDownPlaceholder : selectProduct
//                                                     //     }
//                                                     // } : gridMessage}
                                                    
//                                                 ></Grid>
//                                     {pivotModeCustomerPriceProduct ? (
//                                             <span>
//                                                 <button className="btn alter-button button-leftmargin15" onClick={() => handleCopyStandardPriceProductApifunction()}>Copy Standard Price</button>
//                                             </span>) : (null)
//                                         }

//                                     </div>
//                                 </div>
//                             </div> 
//                             {/* </div> */}
//                             <div style={{display: newCustomer ? "none":"block"}}>
//                                 <div className='popupmasterpage-topfield'>
//                                     <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
//                                         <div className='input-lable'>
//                                             <span>Price Type</span>
//                                         </div>
                                        
//                                     </div>    
//                                     <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
//                                         <div className='form-group master-option'>                                
//                                             <DropDownList
//                                                 ref={inputRefProductPriceTypeCustomerPriceProduct}
//                                                 id="TblProductProductPriceTypeDropdowncustomerPriceProduct"
//                                                 //selectedIndexes={[0]}
//                                                 filterable
//                                                 disabled={newCustomer}
//                                                 placeholder="Select Price Type"
//                                                 dataSource={dataGridPriceTypeAllCustomerProduct.map(cat => cat.description)}
//                                                 className=''
//                                                 onChange={(e) => handleDropDownonChangeCustomerPriceProduct(e)}
//                                                 value = {selectCustomerPriceType} 
//                                             />

//                                         {pivotModeCustomerPriceProduct ? (
//                                             <span>
//                                                 <button className="btn alter-button button-leftmargin15" onClick={() => handleCopyFirstCustomerPriceProduct()} >Copy Frist</button>
//                                             </span>) : (null)
//                                         }
//                                         </div>
//                                     </div>
//                                 </div> 
//                             </div>       
                            


//                             <div className="medium-modal-section">
//                                 <div className="container-fluid">
//                                     <div className="row">
//                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                                             {customerPriceProductmatrixisLoading || stocklevelcolProductmatrixCustomerisLoading ? (
//                                                 "Loading..."
//                                             ) : (!pivotModeCustomerPriceProduct && dataGridCustomerPriceProduct.length > 0 ? (
//                                                 <PivotTable
//                                                     ref={pivotTableCustomerPriceProductRef}
//                                                     id="E4kTblProductPropertiespivotcustomerPriceProductmatrixTable"
//                                                     dataSource={dataSourceCustomerPriceProduct}
//                                                     freezeHeader  
//                                                     keyboardNavigation
//                                                     onColumnRender={onColumnRenderCustomerPriceProduct}
//                                                     columns={dataGridCustomerPriceProductcol}
//                                                 />
//                                             ) : (
//                                                 <Table
//                                                     ref={tableCustomerPriceProductRef}
//                                                     id="E4kTblProductPropertiescustomerPriceProductmatrixTable"
//                                                     dataSource={dataSourceCustomerPriceProduct}
//                                                     freezeHeader
//                                                     keyboardNavigation
//                                                     columns={dataGridCustomerPriceProductcol}
//                                                     editing
//                                                     editMode={'row'}
//                                                     filtering={true}
//                                                     filterRow={showModalMediumCustomerPriceProductMatrix ? true : filterRowCustomerProduct}
//                                                     paging={true}
//                                                     pageIndex={0}
//                                                     pageSize={10}
//                                                     sortMode='many'
//                                                     onCellEndEdit={(e) => handleCellEditCustomerPriceProduct(e)}
//                                                     //onFilter= {(e) => handleonFileterStandardPrice(e)}
//                                                 />
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Draggable>
//         </>
//     );
// };    

// export default E4kTblCustomerPriceProductRelateMatrix1;






'use client';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'smart-webcomponents-react/grid';
import { SwitchButton } from 'smart-webcomponents-react/switchbutton';
import { DropDownList } from 'smart-webcomponents-react/dropdownlist';
import { Table } from 'smart-webcomponents-react/table';
import { toast } from 'react-toastify';
import Draggable from 'react-draggable';
import { PivotTable } from 'smart-webcomponents-react/pivottable';
import {
    useGetProductCustomerPriceMatrixLevelQuery,
    useGetProductPropertiesLevelColMatrixLevelQuery,
    useUpdateProductCustomerPriceMatrixLevelMutation,
    useCreateProductCustomerPriceMatrixLevelMutation,
    useGetProductStandardPriceMatrixLevelQuery
} from '../../store/services/e4kTblProductProductPropertyLevelAPI';

// import {useGetAllCustomerQuery} from '../../store/services/e4kTblCustomer';
import {useGetAllProductsQuery} from  '../../store/services/e4kTblProduct';

import {
    useGetProductPriceTypesQuery,
} from '../../store/services/e4kTblProductPriceTypes';

const E4kTblCustomerPriceProductRelateMatrix1 = ({ showModalMediumCustomerPriceProductMatrix, handleCloseMediumCustomerPriceProductMatrix }) => {
    const [dataGridCustomerPriceProduct, setDataGridCustomerPriceProduct] = useState([]);
    const Customerselect =useSelector((state) => state.selectCustomer.selectCustomer);
    // const Customerselect = useSelector((state) => state.selectProduct.selectProduct);

    const [dataGridStandardPriceProductCopy, setDataGridStandardPriceProductCopy] = useState([]);

    const [dataGridCustomerPriceProductcol, setDataGridCustomerPriceProductcol] = useState([]);
    const [dataGridPriceTypeAllCustomerProduct, setDataGridPriceTypeAllCustomerProduct] = useState([]);
    const [pivotModeCustomerPriceProduct, setPivotModeCustomerPriceProduct] = useState(false);
    const [selectCustomerPriceType, setSelectCustomerPriceType] = useState("");
    const [productselectedinlist,setproductselectedinlist]= useState("")

    const [filterColumnsCustomerPriceProduct,setFilterColumnsCustomerPriceProduct]  = useState([]);
 
     
    const [Productlist, setProductlist] = useState([]);
    const [AllProductlist, setAllProductlist] = useState([]);
    const [newCustomer ,setnewCustomer] =useState(false);
    const dropdownGridCustomerPriceProductRelateRefCustomer = useRef();
    const switchbuttonCustomerPriceProductRelateRef = useRef();
    const [selectProduct,setSelectProduct] = useState('')
    const [SelectProductDropDownChange,setSelectProductDropDownChange] = useState('')

    const tableCustomerPriceProductRef = useRef();
    const inputRefProductPriceTypeCustomerPriceCustomerListProduct = useRef();
    const pivotTableCustomerPriceProductRef = useRef();
    const inputRefProductPriceTypeCustomerPriceProduct = useRef();
    const [filterRowCustomerProduct, setFilterrowCustomerProduct] = useState(true);
    const [isMaximizedCustomerPriceProduct, setIsMaximizedCustomerPriceProduct] = useState(false);

    //const ProductIDSelectCustomerProduct = useSelector((state) => state.selectProduct.selectProduct);

    const customerpricequery = !Customerselect.CompanyID && !Customerselect.businessid ;
    const productstatedprice = !Customerselect.businessid;
    const productpropertiesquery = !Customerselect.CompanyID;
    const productpricertypes  = ! Customerselect.CompanyID ;

    // API calls
    const { data: customerPriceProductmatrixdata, isLoading: customerPriceProductmatrixisLoading ,refetch:customerpricerefetch} = useGetProductCustomerPriceMatrixLevelQuery({
        companyid: Customerselect.CompanyID || Customerselect.companyid,
        customerid: Customerselect.businessid,
        productid:'' 
    }, {skip : customerpricequery});


    console.log("GJJJJJJJJJJJJJJJJJJ" ,{ companyid: Customerselect.CompanyID ||  Customerselect.companyid,
        customerid: Customerselect.businessid,
        productid:'' } )

    ////// Copy standardPrice data
    // API calls
    const { data: standardPriceProductmatrixdataCopy, isLoading: standardPriceProductmatrixisLoadingCopy } = useGetProductStandardPriceMatrixLevelQuery({
        companyid: Customerselect.CompanyID ||  Customerselect.companyid,
        productid: selectProduct 
    }, {skip :productstatedprice });//,{skip:(selectProduct=== '') ? true:false}
    ////////////


    const { data: stocklevelcolProductmatrixdataCustomer, isLoading: stocklevelcolProductmatrixCustomerisLoading } = useGetProductPropertiesLevelColMatrixLevelQuery({
        companyid: Customerselect.CompanyID,
        productid: selectProduct
    },{skip : productpropertiesquery  }); //,{skip:(selectProduct === '') ? true:false}

    const [updateProductCustomerPriceProductMatrixlevel] = useUpdateProductCustomerPriceMatrixLevelMutation();
    
    const [createProductCustomerPriceProductMatrixlevel] = useCreateProductCustomerPriceMatrixLevelMutation();
  

    /////////////// Price types data all
    const { data :customerpriceProductdata,
        error:customerpriceProducterror, 
        isLoading :customerpriceProductisloading,
       isError :customerpriceiserror
       } = useGetProductPriceTypesQuery(
        {companyid:Customerselect.CompanyID ,
        priceid:null},{ skip: productpricertypes});


/////////////////////// All Customer Business id
 /////////////// Price types data all
 const { data :AllProductdata,
    error:AllProductdataerror, 
    isLoading :AllProductdataisloading,
   isError :AllProductdataiserror
   } = useGetAllProductsQuery(Customerselect.CompanyID);

console.log("GDGHFxsxsjjhc" , AllProductdata)
    useEffect(() => {
        if (customerpriceProductdata) {
            
            transformDataCustomerPriceProductData();
        }
    }, [customerpriceProductisloading, customerpriceProductdata]);

///////////////// DropDown change


    
    useEffect(() => {
        if (AllProductdata) {
            
            if (!AllProductdata) return [];
            const sss = AllProductdata.e4kTblproductProductAll.map(jsonString => JSON.parse(jsonString));
        
            const processedData = sss.map(item => ({
              productid: item.ProductID,
              description: item.Description,
              
            }));
        
            
            setAllProductlist(processedData);
            }
    }, [AllProductdataisloading, AllProductdata]);




    useEffect(() => {
        if (selectCustomerPriceType !== '' && selectProduct !=='') {
            filterDataByCustomerPriceType();
        } else {
            setDataGridCustomerPriceProduct([]); // Clear the data grid if no warehouse is selected
            setDataGridCustomerPriceProductcol([]);
            setProductlist([]);
        }
    }, [selectCustomerPriceType,selectProduct]);

    


    //////////// Standprice copy data
    useEffect(() => {
        // Clear the data and columns when either of the API data is loading or changes
        setDataGridStandardPriceProductCopy([]);
        

        if (!standardPriceProductmatrixisLoadingCopy && standardPriceProductmatrixdataCopy && stocklevelcolProductmatrixdataCustomer  && selectProduct) {

            const response = standardPriceProductmatrixdataCopy.e4kTblproductProductPriceStandardMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStandardPriceProductCopy([]);
            } else if (responseKeys.includes('stdpricematix')) {
                transformDataStandardPriceProductCopymatrix();
            }
            
        }

    },[standardPriceProductmatrixdataCopy,standardPriceProductmatrixisLoadingCopy,stocklevelcolProductmatrixdataCustomer,selectProduct]);
   


    useEffect(() => {
        // Clear the data and columns when either of the API data is loading or changes
        setDataGridCustomerPriceProduct([]);
        setDataGridCustomerPriceProductcol([]);
        setFilterrowCustomerProduct(true);
        setProductlist([]);
    
       

        if (!customerPriceProductmatrixisLoading && customerPriceProductmatrixdata ) {
            const response = customerPriceProductmatrixdata.e4kTblproductProductPriceCustomerMatrix;
           
            if (response.some(item => 'message' in item)) {
                console.log('Message received');
                setDataGridCustomerPriceProduct([]);
            } else if (response.some(item => 'cuspricematix' in item)) {
                // const pro_list = response.map(cus => cus.productid.productid);
               
                // setProductlist(pro_list);

                const pro_list  = response.map(cus => {
                    return {
                        productid: cus.productid.productid,
                        description: cus.productid.description
                    }
                    });
                    setProductlist(pro_list)
                
                if (selectProduct !=='' && selectCustomerPriceType !== '' && stocklevelcolProductmatrixdataCustomer ) {
                    transformDataCustomerPriceProductmatrix();
                }
            }
        }
    
        if (!stocklevelcolProductmatrixCustomerisLoading && stocklevelcolProductmatrixdataCustomer && customerPriceProductmatrixdata ) {
            const response = customerPriceProductmatrixdata.e4kTblproductProductPriceCustomerMatrix;
    
            if (response.some(item => 'message' in item)) {
                console.log('Message received');
                setDataGridCustomerPriceProductcol([]);
            } else if (response.some(item => 'cuspricematix' in item)) {
                
                if (selectProduct !== '' && selectCustomerPriceType !== '') {
                    transformDataCustomerPriceProductmatrix();
                    setFilterrowCustomerProduct(true);
                }
            }
        }
    }, [customerPriceProductmatrixisLoading,showModalMediumCustomerPriceProductMatrix, stocklevelcolProductmatrixCustomerisLoading, customerPriceProductmatrixdata, stocklevelcolProductmatrixdataCustomer, selectProduct]);
    

    const transformDataStandardPriceProductCopymatrix = () => {
        if (!standardPriceProductmatrixdataCopy) return [];
        setDataGridStandardPriceProductCopy(JSON.parse(standardPriceProductmatrixdataCopy.e4kTblproductProductPriceStandardMatrix[0].stdpricematix));
    
    }

    const transformDataCustomerPriceProductData = () => {
        if (!customerpriceProductdata) return [];
        const datagrid = customerpriceProductdata.e4kTblproductProductPriceTypes.map(category => ({
            priceid: category.priceid,
            companyid: category.companyid.companyid,
            description: category.description,
            priceType: category.priceType
            }));
        const result  = datagrid.filter(category => category.priceType === 2)
        
        setDataGridPriceTypeAllCustomerProduct(result);
    };

    
  

    const transformDataCustomerPriceProductmatrix = () => {
        if (!customerPriceProductmatrixdata) return [];

        const cuspricetypeid = dataGridPriceTypeAllCustomerProduct.filter(priceType => priceType.description === selectCustomerPriceType )
        const cuspricedata = customerPriceProductmatrixdata.e4kTblproductProductPriceCustomerMatrix
        if (cuspricedata){
            const select_cus_list = cuspricedata.filter(cus =>cus.productid.productid === selectProduct)
            const filteredData = (JSON.parse(select_cus_list[0].cuspricematix)).filter(item => item.pricetype === cuspricetypeid[0].priceid);
            setDataGridCustomerPriceProduct(filteredData);
        }

        if (!stocklevelcolProductmatrixdataCustomer) return [];
    
        let cusPricecolumns = JSON.parse(stocklevelcolProductmatrixdataCustomer.e4kTblproductProductPropertyLevelColmatrix[0].pricecolmatrix);
    
        
        if (!Array.isArray(cusPricecolumns)) {
            cusPricecolumns = [];
        }
        
        cusPricecolumns = cusPricecolumns.filter(column => column.dataField  && !column.dataField.includes('summary') );
        
        const updatedColumns = cusPricecolumns.map(column => {
            if (column.dataField === 'price' ) {
                return {
                    ...column,
                    summarySettings: {
                        // prefix: '$',
                        decimalPlaces: 2
                    }
                };
            }
            return column;
        });

        const columnss  = updatedColumns.filter(column => column.dataField !== 'pricetype');
        const updatedColumn = columnss.map(col => {
            if (col.dataField === 'price'){
                col.allowEdit = true;
            }else{
                col.allowEdit = false;
            }
            return col;

        })
        setDataGridCustomerPriceProductcol(updatedColumn); // Check the updated columns
    };
    

    const filterDataByCustomerPriceType = () => {
        if (selectCustomerPriceType !== '' && selectProduct !== '') {

            if (!customerPriceProductmatrixdata) return [];


            if (!customerPriceProductmatrixisLoading && customerPriceProductmatrixdata && stocklevelcolProductmatrixdataCustomer && selectProduct) {
                const response = customerPriceProductmatrixdata.e4kTblproductProductPriceCustomerMatrix;
        
                if (response.some(item => 'message' in item)) {
                    console.log('Message received');
                    setDataGridCustomerPriceProduct([]);
                } else if (response.some(item => 'cuspricematix' in item)) {
                    // const cus_list = response.map(cus => cus.productid.productid);
                    // setProductlist(cus_list);
                    const pro_list  = response.map(cus => {
                        return {
                            productid: cus.productid.productid,
                            description: cus.productid.description
                        }
                        });
                        setProductlist(pro_list)



                    if (selectProduct !=='') {
                        transformDataCustomerPriceProductmatrix();
                    }
                }
            }
            
        }
    };


    const toggleMaximizeCustomerPriceProduct = () => {
        setIsMaximizedCustomerPriceProduct(!isMaximizedCustomerPriceProduct);
    };

    const dataSourceCustomerPriceProduct = useMemo(() => dataGridCustomerPriceProduct, [dataGridCustomerPriceProduct]);

    const onColumnRenderCustomerPriceProduct = (settings) => {
        if (settings.column.summary) {
            settings.text = settings.column.originalColumn.label.charAt(0).toUpperCase() +
                settings.column.originalColumn.label.slice(1);
        }
    };

    const handleChangePivotModeCustomerPriceProduct = (e) => {
        setPivotModeCustomerPriceProduct(e.detail.value);
        
    };

    //////////// Copy first
    const handleCopyFirstCustomerPriceProduct = () => {
       
        const table = document.getElementById('E4kTblProductPropertiescustomerPriceProductmatrixTable') 
        const state = table.getState();

        //if (filterButtonClick && state.filtered && state.filtered.rowFilters) {
            if (state.filtered && state.filtered.rowFilters) {
            const filters = state.filtered.rowFilters;
            const filterColumns = [];
            const filterValues = [];
            
        
            filters.forEach(([column, filterInfo]) => {
                filterColumns.push(column);
                filterValues.push(filterInfo.filters.map(f => f.value.toUpperCase()));
            });
        
            const filteredRows = dataGridCustomerPriceProduct.filter(row => {
                return filterColumns.every((column, index) => {
                    return filterValues[index].some(value => row[column].toUpperCase().includes(value));
                });
            });
             if (filteredRows.length > 0) {
                    const firstRecord = filteredRows[0];
            
                    const updatedDataGridCustomerPrice = dataGridCustomerPriceProduct.map(row => {
                        const isMatch = filterColumns.every((column, index) => {
                            return filterValues[index].some(value => row[column].toUpperCase().includes(value));
                        });
            
                        if (isMatch) {
                            return {
                                ...row,
                                price: firstRecord.price,
                                pricetype: firstRecord.pricetype,
                               
                            };
                        }
                        return row;
                    });

                const pricetypeid = dataGridPriceTypeAllCustomerProduct.filter(priceType => priceType.description === selectCustomerPriceType ) 
                const finaldata = updatedDataGridCustomerPrice.filter(price => price.pricetype === pricetypeid[0].priceid)

               
            
                    setDataGridCustomerPriceProduct(finaldata);
                } else {
                    console.log('No rows found matching the filters.');
                }
            

        }else {
    
        if (filterColumnsCustomerPriceProduct.length === 0) {
            if (dataGridCustomerPriceProduct.length > 0) {
                const firstRecord = dataGridCustomerPriceProduct[0];
    
                const updatedDataGridCustomerPrice = dataGridCustomerPriceProduct.map(row => {
                    return {
                        ...row,
                        'price': firstRecord['price'],
                        'pricetype': firstRecord['pricetype'],
                    };
                });
                const pricetypeid = dataGridPriceTypeAllCustomerProduct.filter(priceType => priceType.description === selectCustomerPriceType ) 
                const finaldata = updatedDataGridCustomerPrice.filter(price => price.pricetype === pricetypeid[0].priceid)
            
                setDataGridCustomerPriceProduct(finaldata);
               
    
            } else {
                console.log('No rows found in the data grid.');
            }
            
         } 
        }
    };

    ///////// dropdown chnage data 
    const handleDropDownonChangeCustomerPriceProduct = (event) => {
        const value = event.detail.value;
        setSelectCustomerPriceType(value);
    };

     

    

    const handleCellEditCustomerPriceProduct = (event) => {
        //event.preventDefault();
        const detail = event.detail;
        const id = detail.id;
        const dataField = detail.dataField;
        const row = detail.row;
        const value = detail.value;

        const newData = [...dataGridCustomerPriceProduct];
        newData[id][dataField] = value;
        setDataGridCustomerPriceProduct(newData);
    };

    const handleProductCustomerPricelevelUpdate = async (category) => {
        try {
            const result = await updateProductCustomerPriceProductMatrixlevel(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductpricecustomermatrixUpdate.success === "Success") {
                    toast.success('Customer Price Updated', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                    });
                   customerpricerefetch()
                } else {
                    toast.error(result.data.E4kTblproductProductpricecustomermatrixUpdate.success, { position: "top-center" });
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };
    
    const handleSaveCustomerPriceProduct = () => {
        let update_customer_price_save = []




        if (selectCustomerPriceType !== '' && selectProduct !== '') {

            if (!customerPriceProductmatrixdata) return [];


            if (!customerPriceProductmatrixisLoading && customerPriceProductmatrixdata && stocklevelcolProductmatrixdataCustomer && selectProduct) {
                const response = customerPriceProductmatrixdata.e4kTblproductProductPriceCustomerMatrix;
        
                if (response.some(item => 'message' in item)) {
                    console.log('Message received');
                    setDataGridCustomerPriceProduct([]);
                } else if (response.some(item => 'cuspricematix' in item)) {
                    // const cus_list = response.map(cus => cus.productid.productid);
                    // setProductlist(cus_list);
                    const pro_list  = response.map(cus => {
                        return {
                            productid: cus.productid.productid,
                            description: cus.productid.description
                        }
                        });
                        setProductlist(pro_list)


                    if (selectProduct !=='') {
                        const cuspricetypeid = dataGridPriceTypeAllCustomerProduct.filter(priceType => priceType.description === selectCustomerPriceType )
                        const cuspricedata = customerPriceProductmatrixdata.e4kTblproductProductPriceCustomerMatrix
                        if (cuspricedata){
                            const select_cus_list = cuspricedata.filter(cus =>cus.productid.productid === selectProduct)
                            const filteredData = (JSON.parse(select_cus_list[0].cuspricematix)).filter(item => item.pricetype !== cuspricetypeid[0].priceid);
                            update_customer_price_save = filteredData.map(item => JSON.stringify(item));
                        }
                    }
                }
            }
            
        }

        dataGridCustomerPriceProduct.map(row => {
            
            update_customer_price_save.push(JSON.stringify(row))

        })
       
        let Updatecustomer_price_save = {
                companyid: Customerselect.CompanyID,
                productid: selectProduct,
                customerid: Customerselect.businessid,
                "cuspricematix": update_customer_price_save,
            };
       handleProductCustomerPricelevelUpdate(Updatecustomer_price_save)

    }





    const handleCopyStandardPriceProductApifunction = () => {
        
        const price_type_sp = dataGridPriceTypeAllCustomerProduct.filter(cus => cus.description === selectCustomerPriceType)
        
        const all_price_sp = dataGridStandardPriceProductCopy.filter(cus => cus.pricetype === price_type_sp[0].priceid)
        if(all_price_sp && selectProduct !==''){
            setDataGridCustomerPriceProduct(all_price_sp)
        }else{
            toast.error('Not all standard price exist for selected customer price type', { 
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true});
        }
    }








    ///////////////// Create new Customer Price 
    const handleCreateNewCustomerPriceProduct =() => {
        console.log('Create new customer price product')
        setnewCustomer(true)
        setSelectCustomerPriceType('')
        setSelectProductDropDownChange('')
        setSelectProduct('')

        if (AllProductlist && AllProductlist.length > 0) {
            //const datagrid11 = allcustomerlist.map(category => category.businessid);

            // const datagrid11 = AllProductlist
            //         .map(category => category.productid)
            //         .filter(productid => !Productlist.includes(productid));
            // console.log('All Product List After filtering: = ', datagrid11)
            //         setProductlist(datagrid11)

            const dataproductbusiness = Productlist.map(category => category.productid);
            console.log('Product list :', dataproductbusiness)
            const datagrid11 = AllProductlist
                                .map(category => ({
                                    productid: category.productid,
                                    description: category.description,
                                }))
                                .filter(category => !dataproductbusiness.includes(category.productid));
            console.log('All Product List After filtering: = ', datagrid11[0])                   
            // setProductlist(datagrid11);

            

        }

    };

   





    ///////////////////// Api for create new Customer Price api
    const handleProductCustomerPricelevelCreate = async (category) => {
        try {
            const result = await createProductCustomerPriceProductMatrixlevel(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductpricecustomermatrixCreate.success === "Success") {
                    toast.success('Customer Price Created', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                    });
                    setnewCustomer(false)
                    setSelectProduct('');
                    setSelectProductDropDownChange('');
                    customerpricerefetch()
                } else {
                    toast.error(result.data.E4kTblproductProductpricecustomermatrixCreate.success, { position: "top-center" });
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleCloseCustomerPriceProduct = () => {

        setFilterrowCustomerProduct(false);
        setPivotModeCustomerPriceProduct(false)
        setSelectCustomerPriceType('');
        setSelectProduct('');
        setSelectProductDropDownChange('')
        setnewCustomer(false);
        setAllProductlist([])
        setProductlist([]);
        const droplist = inputRefProductPriceTypeCustomerPriceCustomerListProduct.current
       
        if (droplist) {
            droplist.clearItems()
            // droplist.clearSelection()
            
            // setProductlist([]);
           
        }
        switchbuttonCustomerPriceProductRelateRef.current.checked = false;
        console.log('##################al produc  closing  =',Productlist)
        handleCloseMediumCustomerPriceProductMatrix()

    }




    ///////////////////////////////// Grid DropDown Change
    const dropDownModePrice = true

 
    const dataSourcePrice = Productlist

    const dataSourceSettingsPrice = {
		dataFields: [
			'productid: string',
			'description: string',
			

		]
	}
	
	const selectionPrice = {
		enabled: true,
		mode: 'extended'
	};
	
	const editingPrice = {
		enabled: true,
		dialog: {
			height: 600
		}
	}
	
	const layoutPrice  = {
		cardMinWidth: 350
	}
	
	const columnsPrice = [
		{label: 'ProductID', dataField: 'productid', allowEdit: false},
		{label: 'Description', dataField: 'description'},
		
		
	]
    const headerPrice = {
        visible: true,
        buttons: ['filter','sort','search']
      };

      const filteringPrice = {
        enabled: true,
        filterRow: {
          visible: true,
        },
      };

	

    const dataSource10 = useMemo(() => new Smart.DataAdapter({
        dataSource: Productlist,
       
      }), [Productlist]);


       ///////////////////////////////Row Click handlers

  const handleProductRowClick = (event) => {
    
      const productid = event.detail.row.data.productid;
      console.log('Product Clicked =>', event)
      if (productid) { 
          const clickdata = {
              productid : productid,
              description : event.detail.row.data.description,
              
          };
        dropdownGridCustomerPriceProductRelateRefCustomer.current.closeDropDown()
        //const propdata = clickdata['description'].split(' -')[0];
        const propdata = clickdata['productid'];
        setSelectProduct(propdata);
        
        setSelectProductDropDownChange(clickdata['description'])

        if (newCustomer && propdata !==''){
            setnewCustomer(false)
            console.log('New Customer list selected =>',propdata)
            let customerdata = {
                companyid: Customerselect.CompanyID,
                customerid: Customerselect.businessid,
                productid: propdata,
            }
            handleProductCustomerPricelevelCreate(customerdata)
            
            setSelectProduct('');
            setSelectProductDropDownChange('');
        }

          
          
          
      }};

const handleProductItemClick = (event) => {
    const selectedItem = event.detail.label; // Item label clicked
    const productid = event.detail.value;
    setproductselectedinlist(productid)
    console.log("NVMMMMMBHV", event);
    console.log("JHKGH",productid) // The product ID (value) of the clicked item

    if (productid) {
        console.log("JHKdfdgfgh", { productid, description: selectedItem })
      const clickdata = { productid, description: selectedItem };
      
      // Close the dropdown after selection
    //   dropdownGridCustomerPriceProductRelateRef.current.closeDropDown();

      // Update the selected product ID and description in state
      setSelectProduct(clickdata.productid);

      // Log or handle further actions with selected data
      console.log('Selected Product:', clickdata);

      // Example logic for handling a new customer association
      if (newCustomer && clickdata.productid !== '') {
        setnewCustomer(false);
        console.log('New Customer list selected =>', clickdata.productid);

        const customerdata = {
          companyid: Customerselect.CompanyID,
          customerid: Customerselect.businessid,
          productid: clickdata.productid,
        };

        // Call function to create a product-customer price level association
        handleProductCustomerPricelevelCreate(customerdata);

        // Reset the selections after handling
        setSelectProduct(null);
      }
    }
  };





      const message = useMemo(() => ({
        en: {
            dropDownPlaceholder: selectProduct !== '' ? selectProduct : 'Select Product',
        },
    }), [selectProduct]);
     
    const modalDialogclassNameCustomerPriceProduct = isMaximizedCustomerPriceProduct ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
        <Draggable handle=".e4kmodal-header">
            <div className={`modal fade ${showModalMediumCustomerPriceProductMatrix ? 'in' : ''}`} style={{ display: showModalMediumCustomerPriceProductMatrix ? 'block' : 'none' }}>
                <div className={modalDialogclassNameCustomerPriceProduct}>
                    <div className="modal-content medium-popup-div">
                        <div className="modal-body">
                            <div className="breadcomb-area e4kmodal-header">
                                <div className="container-fluid remove-padding">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="breadcomb-list">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">

                                                         <div className='popup-topbar-title'>
                                                            {Customerselect.businessid} - Customer Price - {selectProduct}
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className="breadcomb-wp">
                                                            <div className="breadcomb-ctn">
                                                            <span onClick={() => handleSaveCustomerPriceProduct()}><a href="#"> <i className="fa fa-check" ></i> Save</a></span>
                                                            
                                                                    {/* <span onClick={() => handleNewCustomerPrice()}><a href="#"> <i className="fa fa-check" ></i> Create</a></span>  */}
                                                                    <span onClick={() => handleCreateNewCustomerPriceProduct()}><a href="#"> <i className="fa fa-plus" ></i> New</a></span>
                                                            
                                                           
                                                            </div>
                                                        </div>
                                                    
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className='popup-top-rightdiv'>
                                                            <span className="innerpopup-top-rightdiv">Switch To Edit Mode:</span>
                                                            <SwitchButton ref={switchbuttonCustomerPriceProductRelateRef} rightToLeft onChange={(e) => handleChangePivotModeCustomerPriceProduct(e)}></SwitchButton>
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeCustomerPriceProduct}>
                                                                {isMaximizedCustomerPriceProduct ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i>}
                                                            </button>
                                                            <button type="button" className="close" onClick={() => handleCloseCustomerPriceProduct()}>
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
                            <div className="breadcomb-area">
                                <div className="container-fluid remove-padding">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grid-flex">
                                            <div className="customer-newbold"> {Customerselect.businessid} - Customer Price - {selectProduct !=='' ? selectProduct:'' } ({SelectProductDropDownChange !=='' ? (SelectProductDropDownChange):''}) </div>
                                            
                                                
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Grid */}
                            
                            <div className='popupmasterpage-topfield'>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className='input-lable'>
                                        <span>Product </span>
                                    </div>
                                </div>    
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className='form-group master-option'>   
                                       
                                        <Grid 
                                            id='Customer Price Setup'
                                            ref = {dropdownGridCustomerPriceProductRelateRefCustomer}
                                            dropDownMode={dropDownModePrice}
                                            // selection={selection}
                                            dataSource={dataSourcePrice}
                                            dataSourceSettings={dataSourceSettingsPrice}
                                            selection ={selectionPrice}
                                            layout={layoutPrice}
                                            editing={editingPrice}
                                            columns={columnsPrice}
                                            filtering={filteringPrice}
                                            header={headerPrice}
                                            onRowClick={handleProductRowClick}
                                            messages={message}
                                            setDropDownLabel = {selectProduct}
                                            // messages = {SelectProductDropDownChange !=='' ? {
                                            //     "en": {
                                            //         dropDownPlaceholder : selectProduct
                                            //     }
                                            // } : gridMessage}
                                            
                                        ></Grid>

                                      {/* <DropDownList
                                        ref={dropdownGridCustomerPriceProductRelateRefCustomer}
                                        dataSource={Productlist.map(product => ({
                                            label: `${product.productid} ${product.description}`, // Display product ID and description
                                            value: product.productid, // Use product ID as the value
                                        }))}
                                        placeholder='select product'
                                        onChange={handleProductRowClick}
                                        value={productselectedinlist}
                                        // selectedIndexes={[0]} // Default selection index
                                        dataSourceSettings={dataSourceSettingsPrice}
                                        selection={selectionPrice}
                                        layout={layoutPrice}
                                        editing={editingPrice}
                                        columns={columnsPrice}
                                        filtering={filteringPrice}
                                        header={headerPrice}
                                        messages={message}
                                        /> */}
                                   
                                    {pivotModeCustomerPriceProduct ? (
                                            <span>
                                                <button className="btn alter-button button-leftmargin15" onClick={() => handleCopyStandardPriceProductApifunction()}>Copy Standard Price</button>
                                            </span>) : (null)
                                        }

                                    </div>
                                </div>
                            </div> 
                            {/* </div> */}



                            <div style={{display: newCustomer ? "none":"block"}}>
                                <div className='popupmasterpage-topfield'>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className='input-lable'>
                                            <span>Price Type</span>
                                        </div>
                                        
                                    </div>    
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className='form-group master-option'>                                
                                            <DropDownList
                                                ref={inputRefProductPriceTypeCustomerPriceProduct}
                                                id="TblProductProductPriceTypeDropdowncustomerPriceProduct"
                                                //selectedIndexes={[0]}
                                                filterable
                                                disabled={newCustomer}
                                                placeholder="Select Price Type"
                                                dataSource={dataGridPriceTypeAllCustomerProduct.map(cat => cat.description)}
                                                className=''
                                                onChange={(e) => handleDropDownonChangeCustomerPriceProduct(e)}
                                                value = {selectCustomerPriceType} 
                                            />

                                        {pivotModeCustomerPriceProduct ? (
                                            <span>
                                                <button className="btn alter-button button-leftmargin15" onClick={() => handleCopyFirstCustomerPriceProduct()} >Copy Frist</button>
                                            </span>) : (null)
                                        }
                                        </div>
                                    </div>
                                </div> 
                            </div>       
                            


                            <div className="medium-modal-section">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            {customerPriceProductmatrixisLoading || stocklevelcolProductmatrixCustomerisLoading ? (
                                                "Loading..."
                                            ) : (!pivotModeCustomerPriceProduct && dataGridCustomerPriceProduct.length > 0 ? (
                                                <PivotTable
                                                    ref={pivotTableCustomerPriceProductRef}
                                                    id="E4kTblProductPropertiespivotcustomerPriceProductmatrixTable"
                                                    dataSource={dataSourceCustomerPriceProduct}
                                                    freezeHeader  
                                                    keyboardNavigation
                                                    onColumnRender={onColumnRenderCustomerPriceProduct}
                                                    columns={dataGridCustomerPriceProductcol}
                                                />
                                            ) : (
                                                <Table
                                                    ref={tableCustomerPriceProductRef}
                                                    id="E4kTblProductPropertiescustomerPriceProductmatrixTable"
                                                    dataSource={dataSourceCustomerPriceProduct}
                                                    freezeHeader
                                                    keyboardNavigation
                                                    columns={dataGridCustomerPriceProductcol}
                                                    editing
                                                    editMode={'row'}
                                                    filtering={true}
                                                    filterRow={showModalMediumCustomerPriceProductMatrix ? true : filterRowCustomerProduct}
                                                    paging={true}
                                                    pageIndex={0}
                                                    pageSize={10}
                                                    sortMode='many'
                                                    onCellEndEdit={(e) => handleCellEditCustomerPriceProduct(e)}
                                                    //onFilter= {(e) => handleonFileterStandardPrice(e)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
        </>
    );
};    

export default E4kTblCustomerPriceProductRelateMatrix1;




