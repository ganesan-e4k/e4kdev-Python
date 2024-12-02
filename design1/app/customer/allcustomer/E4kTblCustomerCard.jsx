
'use client'
import React from 'react';
import {  useState ,useEffect,} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Smart, Grid } from 'smart-webcomponents-react/grid';
//import { fetchTotalTurnover } from '../store/slices/customerSlice'; // Import your setSelectProduct action
import { setselectCustomer} from '../../store/slices/customer/e4kTblCustomerSliceSelect';
import { useGetCustomerListQuery } from '../../store/services/Customer/e4kTblCustomer';


const E4kTblCustomerCard =React.memo(() => {
  const [dataGridCustomerCard, setdataGridCustomerCard] = useState([]);
  const dispatch = useDispatch();
  const CompanyallCustomerCard = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyid, setCompanyid] = useState(CompanyallCustomerCard);
  const { data: items, error, isLoading, isError } = useGetCustomerListQuery(companyid);
  const NonLiveCustomer = useSelector(state => state.selectNonLiveCustomer.selectNonLivecustomer);
  console.log("*****************", NonLiveCustomer)

  useEffect(() => {
    if (items && items.E4kTblcustomerlist) {
      if (!items) return [];
      const ImagePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
      const sss_josn = items.E4kTblcustomerlist.map(jsonString => JSON.parse(jsonString));
      console.log("PPPPPPPPP", sss_josn)
      if (NonLiveCustomer === false){
        const sss = sss_josn.filter(jsonString => jsonString.IsLive !== false);
        console.log("HFFFFFFF" ,sss)
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
        // value: item.Value ? `../Images/Customer/${item.Value.split('\\').pop()}` :'No Image',
        value: item.Value ? `${ImagePath}${item.Value.split('\\').pop()}` : 'No Image',
        islive: Boolean(item.IsLive), 
        isstop: Boolean(item.IsStop) ,  // Convert 1 to true, 0 to false
        isextract:Boolean(item.IsExtract),  // Convert 1 to true, 0 to false
        VATCode  : item.VATCode,
        VATDescription : item.VATDescription,
    
      }));

     
      setdataGridCustomerCard(processedData);
      } else {
      if (NonLiveCustomer === true) {
      const ImagePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
      const sss = sss_josn.filter(jsonString => jsonString.IsLive === false);
      console.log("sss" ,sss)
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
        // value: item.Value ? `../Images/Customer/${item.Value.split('\\').pop()}` :'No Image',
        value: item.Value? `${ImagePath}${item.Value.split('\\').pop()}`: 'No Image',
        islive: Boolean(item.IsLive), 
        isstop: Boolean(item.IsStop) ,  // Convert 1 to true, 0 to false
        isextract:Boolean(item.IsExtract),  // Convert 1 to true, 0 to false
        VATCode  : item.VATCode,
        VATDescription : item.VATDescription,
    
      }));
     
      setdataGridCustomerCard(processedData);
      }}
    }
    }, [items,NonLiveCustomer,isLoading]);

  const dataSource = new Smart.DataAdapter({
    dataSource: dataGridCustomerCard,
    dataFields: [
      'companyID: string',
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
      'islive : string',
      'isstop : string',
      'isextract : string',
    ],
  });

  const columns = [
    { label: 'Business ID', dataField: 'businessID', cellsClassName : 'product-title-card'},
    {
      
      dataField: 'value',
      template: 'image',
      cardHeight: 6,
    
    },
    { label: 'Company ID', dataField: 'companyID', freeze: 'near', visible: false },
   
    { label: 'Name', dataField: 'name', cellsClassName : 'product-title-des'},
    { label: 'Category1', dataField: 'category1Name'},
    { label: 'Category2', dataField: 'category2Name'},
    { label: 'Category3', dataField: 'category3Name'},
    { label: 'Class', dataField: 'className'},
    { label: 'Country', dataField: 'country'},
    { label: 'Nominal', dataField: 'nomDescription' },
    { label: 'Group', dataField: 'groupName'},
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
    mode: 'many',
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


  const handleAllCustomerRowClick = (event) => {
    const businessID = event.detail.row.data.businessID;
    if (businessID) { 
        const clickdata = {
          companyid : event.detail.row.data.companyID,
          businessid : event.detail.row.data.businessID,
          name : event.detail.row.data.name,
          category1Name : event.detail.row.data.category1Name,
          category2Name : event.detail.row.data.category2Name,
          category3Name : event.detail.row.data.category3Name,
          className : event.detail.row.data.className,
          country : event.detail.row.data.country,
          nomDescription : event.detail.row.data.nomDescription,
          groupName : event.detail.row.data.groupName,
          value : event.detail.row.data.value,
          islive : event.detail.row.data.live,
          extract : event.detail.row.data.extract,
          stop : event.detail.row.data.stop,



        };
       
        dispatch(setselectCustomer(clickdata));
        
    }
    
  
    const rowData = event.detail.row.data;
    
    //dispatch(fetchTotalTurnover({ businessid: rowData.businessID, companyid: rowData.companyid }));
   

  };




  return (
    <>
      <Grid
        id="e4ktblCustomerCardView"
        view="card"
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
        onRowClick={handleAllCustomerRowClick}
        className="Customer-cardview lg w-full"
        // scrolling='virtual'
      />
    </>
  );
});

export default E4kTblCustomerCard;

