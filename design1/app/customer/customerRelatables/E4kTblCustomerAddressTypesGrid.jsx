"use client";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectAddress } from '../../store/slices/customer/e4kTblCustomerSelectAddress';
import {setselectContact} from '../../store/slices/customer/e4kTblCustomerSelectContact';
import { useGetBusAddressTypesQuery } from '../../store/services/Customer/e4kTblcustomerAddresstypeApi';
import { Grid } from 'smart-webcomponents-react/grid';
// import CustomerAddressPage from '../CustomerPage/CusrtomerAddressPage';


const E4kTblCustomerAddressTypesGrid =  () => {
  const dispatch = useDispatch();
  const CustomerselectCusAddressTypes = useSelector((state) => state.selectCustomer.selectCustomer);
  const CompanySelectCustAddressTypes = useSelector((state) => state.selectCompanyid.Companyid);
  const [dataGrid, setDataGrid] = useState([]);
  const [companyid, setCompanyid] = useState(CompanySelectCustAddressTypes);


  const skipQuery = !CustomerselectCusAddressTypes?.businessid?.trim();
  const { data: addressTypesData, error, isLoading } = useGetBusAddressTypesQuery({
    businessid: CustomerselectCusAddressTypes.businessid , 
    companyid: companyid, 
  },
  {
    skip: skipQuery, // Use the skip condition here
  }
);

  



  useEffect(() => {
    if (addressTypesData) {
        
      transformData();
    }
  }, [addressTypesData,isLoading]);


const transformData = () => {
  if (!addressTypesData || !addressTypesData.E4kAddresscounts) return;

  const parsedData = addressTypesData.E4kAddresscounts.map(itemStr => {
    const item = JSON.parse(itemStr);

    const { addressTypeId, addressCount, description, ctCount } = item;


    // Use Customerselect values, fallback to selectedbusinessid if needed


    return {
      companyid: companyid,
      businessid: CustomerselectCusAddressTypes.businessid,
      addressTypeId,
      description,
      totalAddresses: parseInt(addressCount, 10),
      totalcount: parseInt(ctCount, 10),
    };
  });

  setDataGrid(parsedData);
};





const handleCellClick = (event) => {
 //event.preventDefault(); 
  const clickedDataField = event.detail.cell.column.dataField;
  const addresstypeid = String(event.detail.cell.row.data.addressTypeId);
  const adresstype = String(event.detail.cell.row.data.description);
  const businessid = String(event.detail.cell.row.data.businessid);

  if (clickedDataField === 'totalAddresses') {

   dispatch(setSelectAddress({ addressTypeId: addresstypeid, businessid: businessid , adresstype: adresstype }));
  
    // setSelectedAddressTypeId(addresstypeid);
    // setSelectedDescripton(adresstype);
  }

  if (clickedDataField === 'totalcount') {
    console.log('totalcount')
   dispatch(setselectContact({ addressTypeId: addresstypeid, businessid: businessid, adresstype: adresstype }));
    // setSelectedContactAddressTypeId(addresstypeid);
    // setSelectedDescripton(adresstype);
  }


};










  
  const filtering = {
    enabled: true,
    filterRow: {
      visible: true,
    },
  };

  const behavior = {
    columnResizeMode: 'growAndShrink',
  };

  const appearance = {
    alternationCount: 2,
    showRowHeader: true,
  };

  const paging = {
    enabled: true,
    pageSize: 100,
  };

  const pager = {
    visible: true,
  };

  const sorting = {
    enabled: true,
    mode: 'many',
  };

  const dataSourceSettings = {
    dataFields: [
      'businessid: string', 
      'addressTypeId: string', 
      'description: string',
      'totalAddresses: number',
      'totalcount: number',
    ],
  };

  const selection = {
    enabled: true,
    mode: 'extended',
    allowCellSelection: true,
  };

  const header = {
    visible: true,
    buttons: ['filter', 'sort', 'search'],
  };

//   const editing = {
//     enabled: true,
//     addNewRow: {
//       visible: true,
//       position: 'near',
//     },
//     commandColumn: {
//       visible: true,
//       displayMode: 'icon',
//       dataSource: {
//         'commandColumnDelete': { visible: false },
//         'commandColumnEdit': { visible: true },
//         'commandColumnCustom': { icon: 'fa fa-trash', command: 'commandColumnCustomCommand1', visible: true, label: 'Delete' },
//       },
//     },
//   };

  const columns = [
    { label: 'Business ID', dataField: 'businessid', visible: false },  
    { label: 'Address Type ID', dataField: 'addressTypeId', visible: false }, 
    { label: 'Description', dataField: 'description' },
    { label: 'Total Addresses', dataField: 'totalAddresses' },
    { label: 'Total Contact', dataField: 'totalcount' },
    
  
  ];


  return (
    <>
    
      {addressTypesData ? (
           <Grid
           id="e4kTblbusAddressTypesGrid"
           dataSource={dataGrid}
           columns={columns}
           selection={selection}
           dataSourceSettings={dataSourceSettings}
           appearance={appearance}
           onCellClick={handleCellClick}
         />
 

      ):(
        <p>No Address Types data found.</p>
      )}
     


</>
)
};

export default E4kTblCustomerAddressTypesGrid;


