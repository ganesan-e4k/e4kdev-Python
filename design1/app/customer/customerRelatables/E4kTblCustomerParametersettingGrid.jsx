"use client";
import React from 'react';
import { Grid } from 'smart-webcomponents-react/grid';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef, useMemo } from 'react';

import {  
  useGetCustomerSettingsQuery
    // useCreateProductParameterSettingsMutation,
    // useUpdateProductParameterSettingsMutation,
    } from '../../store/services/Customer/e4kCustomerSettingsApi';

import E4kTblCustomerParametersettingGridUpdate from './E4kTblCustomerParametersettingGridUpdate';
import {useGetProductGenCatoriesQuery} from '../../store/services/e4kTblProductParameterSettings';


const E4kTblCustomerParametersettingGrid = () => {
    const [Datacustomersettings,setDatacustomersettings] = useState([]);
    const [RowDataClick, setRowDataClick] = useState({});
    const CompanySelectCustomerparamerterset = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanySelectCustomerparamerterset);
    const CustomerSelectSetting = useSelector((state) => state.selectCustomer.selectCustomer);
    const [showModalMediumCustomerParameterSettings, setShowModalMediumCustometParameterSettings] = useState(false);

    const [dataSourceCusCategory, setDataSourceCusCategory] = useState([]);
 

    const skipQuery = !CustomerSelectSetting?.businessid?.trim();

    const { data: customersettingdata, error: customersettingerror, isLoading: customersettingloading, isError: customersettingisError} = useGetCustomerSettingsQuery({
      companyid: companyid,
      businessid:  CustomerSelectSetting.businessid,
      settingid : '' ,
    },
    {
      skip: skipQuery, // Use the skip condition here
    });
    

    ///////////////////////////////// sett category
    const skipGenQuery = companyid ==='';

  /////////////////////// Gen categories
  const {
    data: tblgencategoriesdataCustomer,
    isLoading: tblgencategoriesdataCustomerisLoading,
  } = useGetProductGenCatoriesQuery(
    {
      companyid: companyid,
      moduleid: 'customer',
      iscustomer:false
      
    },
    {
      skip: skipGenQuery, // Use the skip condition here
    }
  );
  


  useEffect(() => {
    

    const transformDatacustomersetting = async () => {
      
  
      const datagridCustomersettings = [];
      const sssCustomer = customersettingdata.E4kTblcustomersettings.map(jsonString => JSON.parse(jsonString));
  
      for (const category of sssCustomer) {
  
        datagridCustomersettings.push({
          settingid: category.settingid,
          settingname: category.SettingName,
          Type : category.Type,
          default: category.Default,
          system_default: category.system_default,
          category: category.category,
          lookupTable: category.Lookup_Table,
          lookup_value: category.lookup_text,
          seqno: category.seqno,
      
          
        });
      }
      // console.log("&&&&&&&&&&",datagridCustomersettings )
      setDatacustomersettings(datagridCustomersettings);
    };
  
    if (CustomerSelectSetting.businessid !== '' && customersettingdata?.E4kTblcustomersettings.length > 0 && Datacustomersettings !=='') {
     
     
    
        transformDatacustomersetting();
     
    }
  }, [customersettingdata]);
  

////////////////////////////////////////////////////////////////datasoruce
 ////////////////////////////// gen categories useeffect
 useEffect(() => {
  if(!tblgencategoriesdataCustomerisLoading){
  if (tblgencategoriesdataCustomer) {
    const data = tblgencategoriesdataCustomer.e4kTblgenCategories.map(rowdata => ({
      id:rowdata.id,
      category: rowdata.categoryid,
      moduleid: rowdata.moduleid,


    }))
    setDataSourceCusCategory(data);
  }
}
}, [tblgencategoriesdataCustomerisLoading,tblgencategoriesdataCustomer,CustomerSelectSetting.businessid]);
  

    
  
  const sorting = { enabled: true };
  const dataSource12parameterCustomer = useMemo(() => Datacustomersettings, [Datacustomersettings]);

  const behavior = {
    columnResizeMode: 'growAndShrink'
};
const filtering = {
  enabled: true,
  filterRow: { visible: true },
};

const appearance = {
  alternationCount: 2,
  alternationStart: -1,
  
  
  autoShowColumnFilterButton: false,
  showColumnLines: true,
  showRowLines: false,
  
};


  const columns = dataSourceCusCategory.length > 0 ? [
    { label: 'Setting ID', dataField: 'settingid' ,visible: false,allowEdit: false, },
    { label: 'Setting Name', dataField: 'settingname' ,allowEdit: false, },
    { 
      label: 'Category', 
      dataField: 'category',
      allowEdit: false,
      filterEditor: {
        template: `
        <smart-input 
          drop-down-button-position="right" 
          placeholder="Select Category" 
          style="border-radius: 0px; border: none; width: 100%; height:100%"
        ></smart-input>`,
        onInit(column, editor) {

          const input = editor.querySelector('smart-input');
          input.dataSource = dataSourceCusCategory.map(cate => cate.category);

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
    { label: 'Customer Default', 
      dataField: 'default',
      allowEdit: false,
      formatFunction(settings){
        console.log("ewquigwewjewgrf", settings)
        const rowData = settings.row.data.default;
        const rowData2 = settings.row.data.system_default;
        const defaultValue = rowData;
        const systemDefaultValue = rowData2;
        if (defaultValue !== systemDefaultValue) {
          settings.cell.background = '#00c29273';  // Green background
          // settings.cell.color = '#fff';          // White text
        }
        //  else {
        //     settings.cell.background = '#FFFDE1';  // Light yellow background
        //     settings.cell.color = '#333';          // Dark gray text
        // }
          
      }
      },

    { label: 'System Default', dataField:'system_default' ,allowEdit: false ,
      formatFunction(settings){
        console.log("ewquigwewjewgrf", settings)
        const rowData = settings.row.data.default;
        const rowData2 = settings.row.data.system_default;
        const defaultValue = rowData;
        const systemDefaultValue = rowData2;
        if (defaultValue !== systemDefaultValue) {
          settings.cell.background = '#00c29273';  
          // settings.cell.color = '#fff';         
        }
        // else
        //  {
        //     settings.cell.background = '#FFFDE1';  
        //     settings.cell.color = '#333';         
        // }

      }
    },
    { label: 'Lookup Table', dataField:'lookupTable' ,visible: false,allowEdit: false },
    { label: 'Lookup Value', dataField:'lookup_value' ,visible: false,allowEdit: false },
    { label: 'Seq Number', dataField:'seqno' ,visible: false,allowEdit: false },
    
  ] : [];
  //////////////// Editing
  const editing = {
    enabled: true,
    mode: 'row',
    commandColumn: {
      visible: true,
      displayMode: 'icon',
      dataSource: {
        'commandColumnDelete': { visible: false },
          'commandColumnEdit': { visible: true },

      },
 
  }
}

const paging = {
  enabled: true,
  pageSize: 50,
};

const pager = {
  visible: true,
};




      ///////////////////////////////Row Click handlers

      const handlecustomersettingrowclick = (event) => {
    
        const rowdata = event.detail.data;
        console.log("LLLLLLLL",rowdata)
        if (rowdata !==null){
              if(rowdata.lookup_value !=='' || (typeof(rowdata.lookup_value) === Object)){
                if (typeof(rowdata.lookup_value) !== 'string'){
                  rowdata.lookup_value = rowdata.lookup_value
                }else{
                  rowdata.lookup_value = rowdata.lookup_value.split(',');
                }
              }
    
              rowdata.businessid = CustomerSelectSetting.businessid,
              setRowDataClick(rowdata)
              setShowModalMediumCustometParameterSettings(true);
              
      }
            
        };


        const handleCloseMediumParameterCustomerparametersetting = () => {
   
          setShowModalMediumCustometParameterSettings(false);
          // ProductParameterSettingRefetch();
        };
      
      

  return (
    <>
   
        <Grid
            id={"E4ktblCustomerSettingsgrids3"}
            // ref={ProductidSelectCustomerParameter.productid ? gridProductCustomerParameter : gridProductCustomerParameter}
            dataSource={dataSource12parameterCustomer}
            sorting={sorting}
            behavior={behavior}
            appearance={appearance}
            columns={columns}
            filtering={filtering}
            editing={editing}
            paging={paging}
            pager={pager}
            onRowClick={handlecustomersettingrowclick}
        />
        {showModalMediumCustomerParameterSettings && (
           <E4kTblCustomerParametersettingGridUpdate 
           showModalMediumCustomerParameterSettings = {showModalMediumCustomerParameterSettings} 
           handleCloseMediumParameterCustomerparametersetting = {handleCloseMediumParameterCustomerparametersetting}
           SelectRowData = {RowDataClick}
           />


        )}

   
    </>
    
  );
};

export default E4kTblCustomerParametersettingGrid;




