"use client";
import { Grid } from 'smart-webcomponents-react/grid';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useGetSupplierSettingsQuery } from '../../store/services/Supplier/e4kTblsuppliersettings';
import E4kSuppliersettingsUpdate from '../supplierrelatables/E4kSuppliersettingsUpdate'
import {useGetProductGenCatoriesQuery} from '../../store/services/e4kTblProductParameterSettings';


const E4kSupplierParametesettingGrid = () => {
    const [Datacustomersettings,setDatacustomersettings] = useState([]);
    console.log("JKGGGGGGGGGGGGGG",Datacustomersettings )
    const [dataSourceCusCategory, setDataSourceCusCategory] = useState([]);
    const [RowDataClick, setRowDataClick] = useState({});
    const selectedSuppliersetting = useSelector(state => state.supplierSelect.selectedSupplier);
    const [showModalMediumSupplierParameterSettings, setShowModalMediumSupplierParameterSettings] = useState(false);
    const { data: Suppliersettingdata } = useGetSupplierSettingsQuery({
      companyid: selectedSuppliersetting.CompanyID,
      businessid:  selectedSuppliersetting.BusinessID,
      settingid : selectedSuppliersetting.settingid || '',
    });
     

    const skipGenQuery =  selectedSuppliersetting.CompanyID ==='';

    /////////////////////// Gen categories
    const {
      data: tblgencategoriesdataCustomer,
      isLoading: tblgencategoriesdataCustomerisLoading,
    } = useGetProductGenCatoriesQuery(
      {
        companyid: selectedSuppliersetting.CompanyID,
        moduleid: 'customer',
        iscustomer:false
        
      },
      {
        skip: skipGenQuery, // Use the skip condition here
      }
    );




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
    }, [tblgencategoriesdataCustomerisLoading,tblgencategoriesdataCustomer]);
      
    
  


  useEffect(() => {
    

    const transformDatacustomersetting = async () => {
      
  
      const datagridCustomersettings = [];
      const sssCustomer = Suppliersettingdata.E4kTblsuppliersettings.map(jsonString => JSON.parse(jsonString));
  
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
      setDatacustomersettings(datagridCustomersettings);
    };
  
    if (selectedSuppliersetting.BusinessID!== '' && Suppliersettingdata?.E4kTblsuppliersettings.length > 0 && Datacustomersettings !=='') {
     
        transformDatacustomersetting();
     
    }
  }, [Suppliersettingdata]);
  


  

    
  
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


  const columns = [
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
    { label: 'Supplier Default', 
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
          settings.cell.background = '#00c29273';  // Green background
          // settings.cell.color = '#fff';          // White text
        }
        // else
        //  {
        //     settings.cell.background = '#FFFDE1';  // Light yellow background
        //     settings.cell.color = '#333';          // Dark gray text
        // }

      }
    },
    { label: 'Lookup Table', dataField:'lookupTable' ,visible: false,allowEdit: false },
    { label: 'Lookup Value', dataField:'lookup_value' ,visible: false,allowEdit: false },
    { label: 'Seq Number', dataField:'seqno' ,visible: false,allowEdit: false },
    
  ];
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

  const handlesuppliersettingrowclick = (event) => {

    const rowdata = event.detail.data;
    if (rowdata !==null){
          if(rowdata.lookup_value !=='' || (typeof(rowdata.lookup_value) === Object)){
            if (typeof(rowdata.lookup_value) !== 'string'){
              rowdata.lookup_value = rowdata.lookup_value
            }else{
              rowdata.lookup_value = rowdata.lookup_value.split(',');
            }
          }

          rowdata.businessid =  selectedSuppliersetting.BusinessID,
          setRowDataClick(rowdata)
          setShowModalMediumSupplierParameterSettings(true);
          
  }
        
    };


    const handleCloseMediumParameterSupplierparametersetting = () => {

      setShowModalMediumSupplierParameterSettings(false);
      
    };
      
      

  return (
    <>

    <Grid
      id={"E4kSupplierparametersettings"}
      dataSource={dataSource12parameterCustomer}
      sorting={sorting}
      behavior={behavior}
      appearance={appearance}
      columns={columns}
      filtering={filtering}
      editing={editing}
      paging={paging}
      pager={pager}
      onRowClick={handlesuppliersettingrowclick}
    />

    <E4kSuppliersettingsUpdate 
      showModalMediumCustomerParameterSettings = {showModalMediumSupplierParameterSettings} 
      handleCloseMediumParameterCustomerparametersetting = {handleCloseMediumParameterSupplierparametersetting}
      SelectRowData = {RowDataClick}
      />
    </>
    
  );
};

export default E4kSupplierParametesettingGrid;




