'use client'
import React from 'react';
import { useState,useEffect,useMemo,useRef } from 'react';
import { Smart, Grid } from 'smart-webcomponents-react/grid';
import {useDispatch, useSelector } from 'react-redux';
import { setselectCustomer} from '../../store/slices/customer/e4kTblCustomerSliceSelect';
import { useGetCustomerListQuery } from '../../store/services/Customer/e4kTblCustomer';
import {useGetCustomerCategory1Query} from '../../store/services/Customer/e4kTblcustomercategory1';
import {useGetCustomerCategory2Query} from '../../store/services/Customer/e4kTblCustomerCategory2';
import {useGetCustomerCategory3Query} from '../../store/services/Customer/e4kTblCustomerCategory3';
import {useGetTblCustomerGroupQuery} from '../../store/services/Customer/e4kTblCustomerGroup';
import {useGetCountriesQuery} from '../../store/services/Customer/e4kTblCountry';
import {useGetCustomerClassQuery} from "../../store/services/Customer/e4kcustomerClass";
import {useGetNominalAccountsQuery} from '../../store/services/Customer/e4kTblNominalAccount';


const E4kTblCustomerGrid = React.memo(({rowidchange,handleSuccessRowClick}) => {
  const [nextIndex, setNextIndex] = useState();
  const [preIndex, setpreIndex]= useState();
  const [dataGridCustomerGrid, setdataGridCustomerGrid] = useState([]);
  const dispatch = useDispatch();
  const CompanyallCustomerGrid = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyid, setCompanyid] = useState(CompanyallCustomerGrid);
  const { data: items, error, isLoading, isError , refetch:Customerdatarefetch,} = useGetCustomerListQuery(companyid);
  const NonLiveCustomer = useSelector(state => state.selectNonLiveCustomer.selectNonLivecustomer);


  //////////////////////////////////////////// datagrid state for all fields
  const [dataGridCusCategory1grid, setDataGridCusCategory1grid] = useState([]);
  const [dataGridCusCategory2grid, setDataGridCusCategory2grid] = useState([]);
  const [dataGridCusCategory3grid, setDataGridCusCategory3grid] = useState([]);
  const [dataGridCusClassidgrid, setDataGridCusClassidgrid] = useState([]);
  const [dataGridCusCountrygrid, setDataGridCusCountrygrid] = useState([]);
  const [dataGridCusNominalgrid, setDataGridCusNominalgrid] = useState([]);
  const [dataGridCusGroupgrid, setDataGridCusGroupgrid] = useState([]);
  const customergridrowid = useRef(null);


  ///////////////// Api Call fro Master tables dataGridCustomer
  const { data:category1data, error:category1error, isLoading :category1isLoading, isError:category1isError } = useGetCustomerCategory1Query(companyid);
  const { data:category2data, error:category2error, isLoading :category2isLoading, isError:category2isError } = useGetCustomerCategory2Query(companyid);
  const { data:category3data, error:category3error, isLoading :category3isLoading, isError:category3isError } = useGetCustomerCategory3Query(companyid);
  const { data:groupdata, error:grouperror, isLoading :groupisLoading, isError:groupisError } = useGetTblCustomerGroupQuery(companyid);
  const { data:countrydata, error:countryerror, isLoading :countryisLoading, isError:countryisError } = useGetCountriesQuery(companyid);
  const { data:nominaldata, error:nominalrror, isLoading :nominalisLoading, isError:nominalisError } = useGetNominalAccountsQuery(companyid);
  const { data:classdata, error:classerror, isLoading :classisLoading, isError:classisError } = useGetCustomerClassQuery(companyid);





  useEffect(() => {

    if (rowidchange !== null && rowidchange >= 0 ) { 
      console.log('cchdcdhcndcdc',rowidchange )
      const index = customergridrowid.current.rows.length - 1
      console.log("gchsfcshcvscvsbcsvcsc", index)
      const gridref = customergridrowid.current
      if (gridref) {
        
        gridref.clearSelection();
        gridref.selectRows([rowidchange]);
  
        const rowdata = customergridrowid.current.getRow(rowidchange)
        
        const clickdata = {
          CompanyID: rowdata.data.CompanyID,
          businessid: rowdata.data.businessID,
          name: rowdata.data.name,
          category1Name: rowdata.data.category1Name,
          category2Name: rowdata.data.category2Name,
          category3Name: rowdata.category3Name,
          className: rowdata.data.className,
          country: rowdata.data.country,
          nomDescription: rowdata.data.nomDescription,
          groupName: rowdata.data.groupName,
          value: rowdata.data.value,
          islive: rowdata.data.islive,
          isextract: rowdata.data.isextract,
          isstop: rowdata.data.isstop,
          VATCode: rowdata.data.VATCode,
          VATDescription: rowdata.data.VATDescription,
          allCustomer :  dataSource.length === 0 ? dataSource?.length : null,
          filterdatasource : [],
          rowid: rowdata.id, 
        };
  
     
  
      dispatch(setselectCustomer(clickdata));
  
        handleSuccessRowClick(true)
      }
  
    }
  
  
  
  },[rowidchange]);













  useEffect(() => {
    if (items && items.E4kTblcustomerlist) {
      if (!items) return [];
      const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ;
      const sss_josn = items.E4kTblcustomerlist.map(jsonString => JSON.parse(jsonString));
      if (NonLiveCustomer === false){
        const sss = sss_josn.filter(jsonString => jsonString.IsLive !== false);
        const processedData = sss.map(item => ({
        CompanyID: item.CompanyID,
        businessID: item.BusinessID,
        name: item.CustomerName,
        category1Name: item.Category1Name,
        category2Name: item.Category2Name,
        category3Name: item.Category3Name,
        className: item.ClassName,
        country: item.Country,
        nomDescription: item.NominalDescription,
        groupName: item.GroupName,
        value: item.Value ? `${imageBaseUrl}${item.Value.split('\\').pop()}` : 'No Image',
        islive: Boolean(item.IsLive), 
        isstop: Boolean(item.IsStop) ,  // Convert 1 to true, 0 to false
        isextract:Boolean(item.IsExtract),  // Convert 1 to true, 0 to false
      
    
      }));

     
      setdataGridCustomerGrid(processedData);
      } else {
      if (NonLiveCustomer === true) {
  
      const sss = sss_josn.filter(jsonString => jsonString.IsLive === false);
      const processedData = sss.map(item => ({
        CompanyID: item.CompanyID,
        businessID: item.BusinessID,
        name: item.CustomerName,
        category1Name: item.Category1Name,
        category2Name: item.Category2Name,
        category3Name: item.Category3Name,
        className: item.ClassName,
        country: item.Country,
        nomDescription: item.NominalDescription,
        groupName: item.GroupName,
        value: item.Value ? `${imageBaseUrl}${item.Value.split('\\').pop()}` : 'No Image',
        islive: Boolean(item.IsLive), 
        isstop: Boolean(item.IsStop) ,  // Convert 1 to true, 0 to false
        isextract:Boolean(item.IsExtract),  // Convert 1 to true, 0 to false
       
    
      }));
     
      setdataGridCustomerGrid(processedData);
      }}
    }
    }, [items,NonLiveCustomer,isLoading]);


///////////////////// master page Customer for dropdown select

  useEffect(() => {
    if (category1data) {
      transformDataGridCustomer();
    }
  }, [category1data,category1isLoading]);


  useEffect(() => {
    if (category2data) {
      transformDataGridCustomer();
    }
  }, [category2data,category2isLoading]);

  useEffect(() => {
    if (category3data) {
      transformDataGridCustomer();
    }
  }, [category3data,category3isLoading]);

  useEffect(() => {
    if (groupdata) {
      transformDataGridCustomer();
    }
  }, [groupdata, groupisLoading]);


  useEffect(() => {
    if (countrydata) {
      transformDataGridCustomer();
    }
}, [countrydata, countryisLoading]);

useEffect(() => {
  if (classdata) {
      transformDataGridCustomer();
  }
}, [classdata,classisLoading]);

useEffect(() => {
  if (nominaldata) {
    transformDataGridCustomer();
  }
}, [nominaldata,nominalisLoading]);

  /////////////////////////////// Transform customer datagrid
  const transformDataGridCustomer = () => {
    if (!category1data) return [];
    const datagrid = category1data.E4kTblcustomercategory1.map(Category1 => ({
      category1id: parseInt(Category1.category1id, 10), // Ensure category1id is an integer
      companyid: Category1.companyid.companyid,
      category1name: Category1.category1name,
    }));
    setDataGridCusCategory1grid(datagrid);
    if(!category2data) return [];
    const datagrid1 = category2data.E4kTblcustomercategory2.map(Category2 => ({ // Adjusted to Category2
      category2id: Number(Category2.category2id), // Adjusted to Category2
      companyid: Category2.companyid.companyid,
      category2name: Category2.category2name,
    }));
    setDataGridCusCategory2grid(datagrid1);
    if(!category3data) return [];
    const dataGridCustomerCategory3 = category3data.E4KTblcustomercategory3.map(category3 => ({
      category3id: parseInt(category3.category3id, 10),
      companyid: category3.companyid.companyid,
      category3name: category3.category3name,
  }));
  setDataGridCusCategory3grid(dataGridCustomerCategory3);

  if(!groupdata) return [];
  const dataGridCustomerGroup = groupdata.E4kGroup.map(group => ({
    groupid: parseInt(group.groupid, 10), 
    companyid: group.companyid.companyid,
    groupid : group.groupid ,
    groupname: group.groupname, 
  }));
  setDataGridCusGroupgrid(dataGridCustomerGroup);
  
  if(!countrydata) return [];
  const dataGridCountry = countrydata.E4kCountry.map(Country => ({
    countryid: parseInt(Country.countryid, 10),
    companyid: Country.companyid.companyid,
    country: Country.country,
    member : Country.member,
  }));
  setDataGridCusCountrygrid(dataGridCountry);
  if(!classdata) return [];
  const transformedData = classdata.E4kCustomerclass.map(item => ({
    classid: parseInt(item.classid, 10), 
    companyid: item.companyid.companyid,
    className: item.className, 
  }));
  setDataGridCusClassidgrid(transformedData);

  if(!nominaldata) return [];
  const transformedDatanominal = nominaldata.E4kTblnominallist.map(account => ({
    nomcode: account.nomcode.toString(),
    companyid: account.companyid.companyid,
    nomdescription: account.nomdescription,
    live: account.live,
    nombs: account.nombs,
    nomdc: account.nomdc,
    nompl: account.nompl,
  }));
  setDataGridCusNominalgrid(transformedDatanominal);


  };


  


  const dataSource = useMemo(() =>new Smart.DataAdapter({
    dataSource: dataGridCustomerGrid,
    dataFields: [
      'CompanyID: string',
      'businessID: string',
      'name: string',
      'category1Name: string',
      'category2Name: string',
      'category3Name: string',
      'className: string',
      'country: string',
      'nomDescription: string',
      'groupName: string',
      'value: string',
      'islive: boolean',  // Correctly set as boolean
      'isstop: boolean',  // Correctly set as boolean
      'isextract: boolean',  // Correctly set as boolean
      'VATCode  :string',
      'VATDescription :string',
    ],
  }),[dataGridCustomerGrid]);
  

  const columns = [
    { label: 'Company ID', dataField: 'CompanyID',visible:false, width: 200  },
    { label: 'Business ID', dataField: 'businessID', width: 200 ,freeze: 'near' ,},
    { label: 'Name', dataField: 'name', width: 300 },
    { 
      label: 'Category1 ', 
      dataField: 'category1Name', 
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
					input.dataSource = dataGridCusCategory1grid.map(dataGridCategory1 => dataGridCategory1.category1name);

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
      dataField: 'category2Name',
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
					input.dataSource = dataGridCusCategory2grid.map(dataGridCategory2 => dataGridCategory2.category2name);

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
      dataField: 'category3Name', 
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
					input.dataSource = dataGridCusCategory3grid.map(dataGridCategory3 => dataGridCategory3.category3name);

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
      dataField: 'className', 
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
					input.dataSource = dataGridCusClassidgrid.map(dataGridClass => dataGridClass.className);

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
      dataField: 'country', 
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
					input.dataSource = dataGridCusCountrygrid.map(dataGridCountry => dataGridCountry.country);

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
      dataField: 'nomDescription', 
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
					input.dataSource = dataGridCusNominalgrid.map(dataGridNominal => dataGridNominal.nomdescription);

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
      label: 'Group', 
      dataField: 'groupName', 
      width: 200,
      filterEditor: {
				template: `
				<smart-input 
					drop-down-button-position="right" 
					placeholder="Select Group" 
					style="border-radius: 0px; border: none; width: 100%; height:100%"
				></smart-input>`,
				onInit(column, editor) {

					const input = editor.querySelector('smart-input');
					input.dataSource = dataGridCusGroupgrid.map(dataGridGroup => dataGridGroup.groupname);

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



 


//   const handleAllCustomerRowClick = async (event) => {
//     const filterColumn = customergridrowid.current.getFilteredColumns();
//     const VisibleRows = customergridrowid.current.getVisibleRows();
//     // const VisibleRowId = VisibleRows.map(row => row.index
//     const rowData = event.detail.row.data;
//     const businessID = rowData.businessID;

//     if (businessID) {
//         const clickdata = {
//             CompanyID: rowData.CompanyID,
//             businessid: rowData.businessID,
//             name: rowData.name,
//             category1Name: rowData.category1Name,
//             category2Name: rowData.category2Name,
//             category3Name: rowData.category3Name,
//             className: rowData.className,
//             country: rowData.country,
//             nomDescription: rowData.nomDescription,
//             groupName: rowData.groupName,
//             value: rowData.value,
//             islive: rowData.islive,
//             isextract: rowData.isextract, 
//             isstop: rowData.isstop, 
//             VATCode: rowData.VATCode,
//             VATDescription: rowData.VATDescription,
//             // id: selectedRowIndex,
        
            
//         };
        
//         dispatch(setselectCustomer(clickdata));
      
        
     
//     };



   
    
// };






const handleAllCustomerRowClick = async (event) => {
  const rowData = event.detail.row.data; 
  const businessID = rowData.businessID;
  let modifiedData = [];
  if (customergridrowid.current) {
    const filteredColumns = customergridrowid.current.getFilteredColumns();

    if (filteredColumns.length > 0) {
      const visibleRows = customergridrowid.current.getViewRows();
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
    const SelectdataindexNum = modifiedData.find(obj => obj.businessID === businessID);
     

    if (businessID) {
      const clickdata = {
        CompanyID: rowData.CompanyID,
        businessid: rowData.businessID,
        name: rowData.name,
        category1Name: rowData.category1Name,
        category2Name: rowData.category2Name,
        category3Name: rowData.category3Name,
        className: rowData.className,
        country: rowData.country,
        nomDescription: rowData.nomDescription,
        groupName: rowData.groupName,
        value: rowData.value,
        islive: rowData.islive,
        isextract: rowData.isextract,
        isstop: rowData.isstop,
        VATCode: rowData.VATCode,
        VATDescription: rowData.VATDescription,
        allCustomer :  modifiedData.length === 0 ? dataGridCustomerGrid?.length : modifiedData.length,
        filterdatasource : modifiedData,
        index : modifiedData.length > 0 ? SelectdataindexNum?.index : null,
        rowid: event.detail.id, 
      };

      console.log("Clicked Row Data:", clickdata);

    
      dispatch(setselectCustomer(clickdata));
    }
  }
};







// useEffect(()=>{
  
//   if(navRight === true){
//     nextRowHandler();
//     dispatch(setSelectRightnav(false));
 
//   }
// },[navRight]);



// useEffect(()=>{
//   if(navLeft === true){
//     prevRowHandler();
//     dispatch(setSelectLefttnav(false));
  
//   }
// });






const nextRowHandler = () => {

  const nextIndexnumber = customergridrowid.current.getSelectedRowIds()[0];
  customergridrowid.current.unselect(nextIndexnumber);
  const newNextIndex = nextIndexnumber + 1;
  if (newNextIndex < dataGridCustomerGrid.length) {
    const nextRowData = dataGridCustomerGrid[newNextIndex];

    if (nextRowData) {
      dispatch(setselectCustomer({
        businessid: nextRowData.businessID,
        CompanyID: nextRowData.CompanyID,
        name: nextRowData.name,
        category1Name: nextRowData.category1Name,
        category2Name: nextRowData.category2Name,
        category3Name: nextRowData.category3Name,
        className: nextRowData.className,
        country: nextRowData.country,
        nomDescription: nextRowData.nomDescription,
        groupName: nextRowData.groupName,
        value: nextRowData.value,
        islive: nextRowData.islive,
        isextract: nextRowData.isextract,
        isstop: nextRowData.isstop,
      }));

      customergridrowid.current.selectRows([newNextIndex]);

      setNextIndex(newNextIndex);
    } 
  } 
};




const prevRowHandler =()=>{

  const previousRowIndexnumber = customergridrowid.current.getSelectedRowIds()[0];
  customergridrowid.current.unselect(previousRowIndexnumber);
  const newPreviousIndex = previousRowIndexnumber - 1;

  if (newPreviousIndex >= 0) {
    const previousRowData = dataGridCustomerGrid[newPreviousIndex];
    dispatch(setselectCustomer({
      businessid: previousRowData.businessID,
      CompanyID: previousRowData.CompanyID,
      name: previousRowData.name,
      category1Name: previousRowData.category1Name,
      category2Name: previousRowData.category2Name,
      category3Name: previousRowData.category3Name,
      className: previousRowData.className,
      country: previousRowData.country,
      nomDescription: previousRowData.nomDescription,
      groupName: previousRowData.groupName,
      value: previousRowData.value,
      islive: previousRowData.islive,
      isextract: previousRowData.isextract,
      isstop: previousRowData.isstop,
    }));
    customergridrowid.current.selectRows([newPreviousIndex])
    setNextIndex(newPreviousIndex);
    
}
};













//////////////////////////// navigation //////////////////////////////////////////







  return (

    <>
         {isLoading ? (
      <div>Loading...</div>
    ) : (
      (items && items.E4kTblcustomerlist.length > 0) ? (
        <Grid
        id="e4ktblallcustomergrid"
        ref={customergridrowid}
        filtering={filtering}
        dataSource={dataSource}
        columns={columns}
        appearance={appearance}
        behavior={behavior}
        selection={selection}
        paging={paging}
        pager={pager}
        sorting={sorting}
        editing={editing}
        onRowClick={handleAllCustomerRowClick}
 
      />
      ) : (null)
    )}
  </>
  )
},(prevProps, nextProps) => {
    console.log(prevProps.rowidchange, 'Re-rendering grid without filter', nextProps.rowidchange);
    return prevProps.rowidchange === nextProps.rowidchange;
  //}
}


  );


export default E4kTblCustomerGrid;
