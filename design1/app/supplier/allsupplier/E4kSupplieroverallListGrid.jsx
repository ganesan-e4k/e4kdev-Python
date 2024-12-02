'use client'
import React from 'react';
import { useState,useEffect,useMemo,useRef } from 'react';
import { Smart, Grid } from 'smart-webcomponents-react/grid';
import {useDispatch, useSelector } from 'react-redux';
import {setSelectedSupplier}from '../../store/slices/supplier/e4ksupplierSelectSlice'
import {useGetSupplierListQuery} from  '../../store/services/Supplier/e4kTblSupplierlist';
import {useGetNominalAccountsQuery} from '../../store/services/Customer/e4kTblNominalAccount';
import {useGetSupplierCategory1Query} from '../../store/services/Supplier/e4kTblsuppliercategory1';
import {useGetSupplierCategory2Query} from '../../store/services/Supplier/e4kTblsuppliercategory2';
import {useGetSupplierCategory3Query} from '../../store/services/Supplier/e4kTblsuppliercategory3';
import {useGetSupplierClassQuery} from '../../store/services/Supplier/e4ksupplierclassApi'
import{ useGetCountriesQuery} from '../../store/services/Customer/e4kTblCountry';


// import {fetchTotalTurnover} from '../store/slices/customerSlice';



const E4kSupplieroverallListGrid = React.memo(({rowidchange,handleSuccessRowClick}) => {
  const [SupplierCardViewData, setSupplierCardViewData] = useState([]);
  const dispatch = useDispatch();
  const supplierCompanyid = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyid, setCompanyid] = useState(supplierCompanyid);
  const { data: Supplierdata, error, isLoading, isError , refetch:supplierrefetch,} = useGetSupplierListQuery(companyid);
  const NonLiveSupplier = useSelector(state => state.selectNonLiveCustomer.selectNonLivecustomer);
  const supplierGridRef = useRef(null);




  useEffect(() => {

    if (rowidchange !== null && rowidchange >= 0) { 
    
      const gridref = supplierGridRef.current
      if (gridref) {
        
        gridref.clearSelection();
        gridref.selectRows([rowidchange]);
  
        const rowdata = supplierGridRef.current.getRow(rowidchange)
        console.log("rowdata",rowdata);
  
        const clickdata = {
          CompanyID: rowdata.data.CompanyID,
          BusinessID: rowdata.data.BusinessID, 
          name: rowdata.data.name,    
          Category1Name: rowdata.data.Category1Name,
          Category2Name: rowdata.data.Category2Name,
          Category3Name: rowdata.data.Category3Name,
          ClassName: rowdata.data.ClassName,    
          Country: rowdata.data.Country,        
          NominalDescription: rowdata.data.NominalDescription, 
          isStop: rowdata.data.IsStop,    
          isLive: rowdata.data.IsLive,   
          isExtract: rowdata.data.IsExtract, 
          VATCode: rowdata.data.VATCode,
          VATDescription: rowdata.data.VATDescription,
          value: rowdata.data.value,
          allSupplier :  dataSource.length === 0 ? dataSource?.length : null,
          filterdatasource : [],
          rowid: rowdata.id, 
        };
  
     
  
      dispatch(setSelectedSupplier(clickdata));
  
        handleSuccessRowClick(true)
      }
  
    }
  
  
  
  },[rowidchange]);


 useEffect(() => {
	if (Supplierdata && Supplierdata.E4kTblsuppliertlist) {
		if (!Supplierdata) return [];
    const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL_Supplier_Image ;
		const sss_josn = Supplierdata.E4kTblsuppliertlist.map(jsonString => JSON.parse(jsonString));
		console.log("PPPPPPPPP", sss_josn)
		if (NonLiveSupplier === false){
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
		// value: item.Value ? `../Images/Supplier/${item.Value.split('\\').pop()}` :'No Image',
    value: item.Value ? `${imageBaseUrl}${item.Value.split('\\').pop()}` : 'No Image',
		IsStop: Boolean(item.IsStop),    
		IsLive: Boolean(item.IsLive),   
		IsExtract: Boolean(item.IsExtract), 
		VATCode: item.VATCode,
		VATDescription: item.VATDescription,
	
		}));

		
		setSupplierCardViewData(processedData);
		} else {
		if (NonLiveSupplier === true) {
	
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
		value: item.Value ? `${imageBaseUrl}${item.Value.split('\\').pop()}` :'No Image',
		IsStop: Boolean(item.IsStop),    
		IsLive: Boolean(item.IsLive),   
		IsExtract: Boolean(item.IsExtract), 
		VATCode: item.VATCode,
		VATDescription: item.VATDescription,
	
		}));
		
		setSupplierCardViewData(processedData);
		}}
	}
	}, [Supplierdata,NonLiveSupplier,isLoading]);

  /////////////// filter function ///////////////////////

  const [dataGridNominal, setDataGridNominal ] = useState([]);
  const [dataGridSupplierCategory1, setDataGridSupplierCategory1 ] = useState([]);
  const [dataGridSupplierCategory2, setDataGridSupplierCategory2 ] = useState([]);
  const [dataGridSupplierCategory3, setDataGridSupplierCategory3 ] = useState([]);
  const [dataGridSupplierClass, setDataGridSupplierClass ] = useState([]);
  const [GritCountry, setGritCountry] = useState([]);

  const {data: suppliercategory1data, error:suppliercategory1error, isLoading:suppliercategory1isLoading, isError:suppliercategory1isError } =useGetSupplierCategory1Query(companyid);  
  const {data: suppliercategory2data, error:suppliercategory2error, isLoading:suppliercategory2isLoading , isError :suppliercategory2dataError} = useGetSupplierCategory2Query(companyid);
  const {data: suppliercategory3data, error:suppliercategory3error, isLoading:suppliercategory3dataisLoading, isError :suppliercategory3dataisError} = useGetSupplierCategory3Query(companyid);
  const {data: supplierclassdata, error:supplierclassdataerror, isLoading:supplierclassisLoading, isError :supplierclassisError}=useGetSupplierClassQuery(companyid);
  const { data: Countrydata, error: Countryerror, isLoading: CountryisLoading, isError: CountryisError } = useGetCountriesQuery(companyid);
  const { data:Nominaldata, error:Nominalerror, isLoading:NominalisLoading, isError:NominalisError } = useGetNominalAccountsQuery(companyid);



  useEffect(() => {
    if (Nominaldata) {
        transformData();
    }
  }, [NominalisLoading, Nominalerror, NominalisError,Nominaldata]);

  useEffect(() => {
    if(suppliercategory1data){
      transformData();
      const datagridcategory1 = suppliercategory1data.E4kTblsuppliercategory1.map(suppliercategory1=>({
        category1id : suppliercategory1.category1id.toString(),
        category1name: suppliercategory1.category1name
      }))
      console.log("DataGridSupplierCategory1: ", datagridcategory1);
      setDataGridSupplierCategory1(datagridcategory1);
    }
  },[suppliercategory1data, suppliercategory1error,suppliercategory1isLoading,suppliercategory1isError]);

  useEffect(() => {
    if(suppliercategory2data){
      const cat2data = suppliercategory2data.E4kTblsuppliercategory2.map( cat2 =>{
        return {
          category2id : cat2.category2id.toString(),
          category2name: cat2.category2name,
        }
      })
      console.log("data life" ,cat2data)
      setDataGridSupplierCategory2(cat2data);
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
      setDataGridNominal(datagrid);
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


    





      

  }





  const dataSource = useMemo(() =>new Smart.DataAdapter({
      dataSource: SupplierCardViewData,
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
        'IsLive: boolean',        // Corrected boolean field name
        'IsStop: boolean',        // Corrected boolean field name
        'IsExtract: boolean',     // Corrected boolean field name
        'VATCode: string',
        'VATDescription: string',
      ],
    }),[SupplierCardViewData]);
    

  

    const columns = [
      { label: 'Company ID', dataField: 'CompanyID', visible: false, width: 200 },
      { label: 'Business ID', dataField: 'BusinessID', width: 200 ,freeze: 'near'},
      { label: 'Supplier Name', dataField: 'name', width: 200 },
      { label: 'isLive', dataField: 'IsLive', visible: false},
      { label: 'isStop' , dataField: 'IsStop', visible: false},
      { label: 'isExtract' , dataField: 'IsExtract', visible: false},
     
      { 
        label: 'Category1 ', 
        dataField: 'Category1Name', 
        width: 200,
        filterEditor: {
          template: `
          <smart-input 
            drop-down-button-position="right" 
            placeholder="Select Category1" 
            style="border-radius: 0px; border: none; width: 100%; height:100%"
          ></smart-input>`,
          onInit(column, editor) {
  
            const input = editor.querySelector('smart-input');
            input.dataSource = dataGridSupplierCategory1.map(dataGridCategory1 => dataGridCategory1.category1name);
  
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
        label: 'Category2 ',
        dataField: 'Category2Name',
        width: 200 ,
        filterEditor: {
          template: `
          <smart-input 
            drop-down-button-position="right" 
            placeholder="Select Category2" 
            style="border-radius: 0px; border: none; width: 100%; height:100%"
          ></smart-input>`,
          onInit(column, editor) {
  
            const input = editor.querySelector('smart-input');
            input.dataSource = dataGridSupplierCategory2.map(dataGridCategory2 => dataGridCategory2.category2name);
  
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
        label: 'Category3 ', 
        dataField: 'Category3Name', 
        width: 200,
        filterEditor: {
          template: `
          <smart-input 
            drop-down-button-position="right" 
            placeholder="Select Category3" 
            style="border-radius: 0px; border: none; width: 100%; height:100%"
          ></smart-input>`,
          onInit(column, editor) {
  
            const input = editor.querySelector('smart-input');
            input.dataSource = dataGridSupplierCategory3.map(dataGridCategory3 => dataGridCategory3.category3name);
  
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
        label: 'Class', 
        dataField: 'ClassName', 
        width: 200,
        filterEditor: {
          template: `
          <smart-input 
            drop-down-button-position="right" 
            placeholder="Select Class" 
            style="border-radius: 0px; border: none; width: 100%; height:100%"
          ></smart-input>`,
          onInit(column, editor) {
  
            const input = editor.querySelector('smart-input');
            input.dataSource = dataGridSupplierClass.map(dataGridClass => dataGridClass.className);
  
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
        label: 'Country', 
        dataField: 'Country', 
        width: 200,
        filterEditor: {
          template: `
          <smart-input 
            drop-down-button-position="right" 
            placeholder="Select Country" 
            style="border-radius: 0px; border: none; width: 100%; height:100%"
          ></smart-input>`,
          onInit(column, editor) {
  
            const input = editor.querySelector('smart-input');
            input.dataSource = GritCountry.map(dataGridCountry => dataGridCountry.country);
  
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
        dataField: 'NominalDescription', 
        width: 200,
        filterEditor: {
          template: `
          <smart-input 
            drop-down-button-position="right" 
            placeholder="Select Nominal" 
            style="border-radius: 0px; border: none; width: 100%; height:100%"
          ></smart-input>`,
          onInit(column, editor) {
  
            const input = editor.querySelector('smart-input');
            input.dataSource = dataGridNominal.map(dataGridNominal => dataGridNominal.nomdescription);
  
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
    
    
    const [nextIndex,setnextIndex]= useState()
    
    


  const handleAllSupplierRowClick = async (event) => {
    const rowData = event.detail.row.data; 
    const BusinessID =rowData.BusinessID;
    let modifiedData = [];
    if (supplierGridRef.current) {
      const filteredColumns = supplierGridRef.current.getFilteredColumns();
  
      if (filteredColumns.length > 0) {
        const visibleRows = supplierGridRef.current.getViewRows();
        const allRowData = visibleRows.map((row) => row.data);
  
      
        modifiedData = allRowData.map((item, index) => {
          const { $, ...rest } = item; 
          return {
            ...rest,
            id: $?.id || null,
            index, 
          };
        });
  
        console.log("Filtered Rows:", modifiedData);
      }
      const SelectdataindexNum = modifiedData.find(obj => obj.BusinessID === BusinessID);
        
  
      if (BusinessID) {
        const clickdata = {
          CompanyID: rowData.CompanyID,
          BusinessID: rowData.BusinessID, 
          name: rowData.name,    
          Category1Name: rowData.Category1Name,
          Category2Name: rowData.Category2Name,
          Category3Name: rowData.Category3Name,
          ClassName: rowData.ClassName,    
          Country: rowData.Country,        
          NominalDescription: rowData.NominalDescription, 
          isStop: rowData.IsStop,    
          isLive: rowData.IsLive,   
          isExtract: rowData.IsExtract, 
          VATCode: rowData.VATCode,
          VATDescription: rowData.VATDescription,
          value: rowData.value,
          allSupplier :  modifiedData.length === 0 ? SupplierCardViewData?.length : modifiedData.length,
          filterdatasource : modifiedData,
          index : modifiedData.length > 0 ? SelectdataindexNum?.index : null,
          rowid: event.detail.id, 
        };
  
        console.log("Clicked Row Data:", clickdata);
  
      
        dispatch(setSelectedSupplier(clickdata));
      }
    }
  };
  




    return (

        <>
        {isLoading?(
          <div>Loading .......</div>
        ):(
          (Supplierdata && Supplierdata.E4kTblsuppliertlist.length > 0)?(
            <Grid
          id="Supplierlist"
          ref={supplierGridRef}
          header={header}
          dataSource={dataSource}
          columns={columns}
          appearance={appearance}
          behavior={behavior}
          selection={selection}
          paging={paging}
          pager={pager}
          sorting={sorting}
          editing={editing}
          filtering={filtering}
          className="lg w-full"
          onRowClick={ handleAllSupplierRowClick}
          />
          ):(
            null
          )
    )}
    
    </>

      );
    },

    (prevProps, nextProps) => {
      console.log(prevProps.rowidchange, 'Re-rendering grid without filter', nextProps.rowidchange);
      return prevProps.rowidchange === nextProps.rowidchange;
  }
  
  
  );

export default E4kSupplieroverallListGrid;
