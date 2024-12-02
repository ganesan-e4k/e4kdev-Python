'use client'
import React from 'react';
import { useState,useEffect,useMemo } from 'react';
import { Smart, Grid } from 'smart-webcomponents-react/grid';
import {useDispatch, useSelector } from 'react-redux';
import {setSelectedSupplier}from '../../store/slices/supplier/e4ksupplierSelectSlice';
import {useGetSupplierListQuery} from '../../store/services/Supplier/e4kTblSupplierlist'

// import {fetchTotalTurnover} from '../store/slices/customerSlice';



const E4kSupplieroverallListCardViewGrid = React.memo(() => {
  const [SupplierData, setSupplierData] = useState([]);
  const dispatch = useDispatch();
  const supplierCompanyidcard = useSelector((state) => state.selectCompanyid.Companyid);
  const { data: Supplierdata, error, isLoading, isError , refetch:supplierrefetch,} = useGetSupplierListQuery(supplierCompanyidcard);
 
  const NonLiveSuppllier = useSelector(state => state.selectNonLiveCustomer.selectNonLivecustomer);
  console.log("non live code ", NonLiveSuppllier)



 useEffect(() => {
	if (Supplierdata && Supplierdata.E4kTblsuppliertlist) {
		if (!Supplierdata) return [];
	  const ImagebaseUrl =process.env.NEXT_PUBLIC_IMAGE_BASE_URL_Supplier_Image;
		const sss_josn = Supplierdata.E4kTblsuppliertlist.map(jsonString => JSON.parse(jsonString));
		console.log("PPPPPPPPP", sss_josn)
		if (NonLiveSuppllier === false){
		const sss = sss_josn.filter(jsonString => jsonString.IsLive !== false);
		console.log("HFFFFFFF" ,sss)
		const processedData = sss.map(item => ({
		CompanyID: item.CompanyID,
		BusinessID: item.BusinessID,  
		name: item.CustomerName,     
		Category1Name: item.Category1Name,
		Category2Name: item.Category2Name,
		Category3Name: item.Category3Name,
		ClassName: item.ClassName,    
		Country: item.Country,        
		NominalDescription: item.NominalDescription, 
		value: item.Value ? `${ImagebaseUrl}${item.Value.split('\\').pop()}` :'No Image',
		isStop: Boolean(item.IsStop),    
		isLive: Boolean(item.IsLive),   
		IsExtract: Boolean(item.IsExtract), 
		VATCode: item.VATCode,
		VATDescription: item.VATDescription,
	
		}));

		
		setSupplierData(processedData);
		} else {
		if (NonLiveSuppllier === true) {
	
		const sss = sss_josn.filter(jsonString => jsonString.IsLive === false);
		console.log("sss" ,sss)
		const processedData = sss.map(item => ({
		CompanyID: item.CompanyID,
		BusinessID: item.BusinessID,  
		name: item.CustomerName,     
		Category1Name: item.Category1Name,
		Category2Name: item.Category2Name,
		Category3Name: item.Category3Name,
		ClassName: item.ClassName,    
		Country: item.Country,        
		NominalDescription: item.NominalDescription, 
		value: item.Value ? `${ImagebaseUrl}${item.Value.split('\\').pop()}` :'',
		isStop: Boolean(item.IsStop),    
		isLive: Boolean(item.IsLive),   
		IsExtract: Boolean(item.IsExtract), 
		VATCode: item.VATCode,
		VATDescription: item.VATDescription,
	
		}));
		
		setSupplierData(processedData);
		}}
	}
	}, [Supplierdata,NonLiveSuppllier,isLoading]);
	

  const dataSource = useMemo(() =>new Smart.DataAdapter({
      dataSource: SupplierData,
      dataFields: [
        'CompanyID: string',
        'BusinessID: string',
        'name: string',
        'Category1Name: string',
        'Category2Name: string', 
        'Category3Name: string',
        'ClassName: string',      
        'Country: string',        // Corrected field name
        'NominalDescription: string', 
        'value: string',// Corrected field name
        'isLive: boolean',        // Corrected boolean field name
        'isStop: boolean',        // Corrected boolean field name
        'isExtract: boolean',     // Corrected boolean field name
        'VATCode: string',
        'VATDescription: string',
      ],
    }),[SupplierData]);
    
    const columns = [
      { label: 'Company ID', dataField: 'CompanyID', visible: false, width: 200 },
      { label: 'Business ID', dataField: 'BusinessID', width: 200 },
      { label: 'Supplier Name', dataField: 'name', width: 200 },
      { label: 'Category1', dataField: 'Category1Name', width: 250 },
      { label: 'Category2', dataField: 'Category2Name', width: 250 },  
      { label: 'Category3', dataField: 'Category3Name', width: 250 },
      { label: 'Class', dataField: 'ClassName', width: 250 },       
      { label: 'Country', dataField: 'Country', width: 200 },        
      { label: 'Nominal', dataField: 'NominalDescription', width: 200 }, 
      
    ];
  
  
    const columns1 =[
      { label: 'Business ID', dataField: 'BusinessID',cellsClassName : 'product-title-card'},

      {
        
          dataField: 'value',
          template: 'image',
          cardHeight: 6,
        
        },
      { label: 'Company ID', dataField: 'CompanyID',freeze: 'near', visible: false },
      { label: 'Supplier Name', dataField: 'name',cellsClassName : 'product-title-des' },
      { label: 'Category1', dataField: 'Category1Name' },
      { label: 'Category2', dataField: 'Category2Name' },  // Corrected field name
      { label: 'Category3', dataField: 'Category3Name'},
      { label: 'Class', dataField: 'ClassName' },         // Corrected field name
      { label: 'Country', dataField: 'Country' },         // Corrected field name
      { label: 'Nominal', dataField: 'NominalDescription' },
  
  
    ]
    
  
    const behavior = {
      columnResizeMode: 'growAndShrink',
    };
  
    const filtering = {
      enabled: true,
      filterRow: {
        visible: true,
      },
    };
  
    const appearance = {
      alternationCount: 2,
      showRowHeader: true,
    };
  
    const paging = {
      enabled: true,
      pageSize: 50,
    };
  
    const pager = {
      visible: true,
    };
  
    const sorting = {
      enabled: true,
      mode: 'many'
    };
  
    const editing = {
      enabled: false,
    };
  
    const selection = {
      enabled: true,
      allowCellSelection: false,
      allowRowHeaderSelection: true,
      allowColumnHeaderSelection: true,
      mode: 'extended',
    };
  
    const header = {
      visible: true,
      buttons: ['filter', 'sort', 'search'],
    };
  
    const grouping = {
      enabled: true,
    };
    
    
  

    const handleAllSupplierRowClick = (event) => {
    const rowData = event.detail.row.data;
    const BusinessID =rowData.BusinessID;
    if(BusinessID){
        const rowclick ={
            CompanyID: rowData.CompanyID,
            BusinessID: rowData.BusinessID, 
            name: rowData.name,    
            Category1Name: rowData.Category1Name,
            Category2Name: rowData.Category2Name,
            Category3Name: rowData.Category3Name,
            ClassName: rowData.ClassName,    
            Country: rowData.Country,        
            NominalDescription: rowData.NominalDescription, 
            isLivp: rowData.IsStop,    
            isExte: rowData.IsLive,   
            isStoract: rowData.IsExtract, 
            VATCode: rowData.VATCode,
            VATDescription: rowData.VATDescription,
            value: rowData.value,
        }
        dispatch(setSelectedSupplier(rowclick));
    }
    

    
    };


  return (

    <>
<Grid
id="Supplierlist"
view="card"
header={header}
dataSource={dataSource}
columns={columns1}
appearance={appearance}
behavior={behavior}
selection={selection}
paging={paging}
pager={pager}
sorting={sorting}
editing={editing}
filtering={filtering}
className="lg w-full"
onRowClick={handleAllSupplierRowClick}
/>
</>

  );
});

export default E4kSupplieroverallListCardViewGrid;
