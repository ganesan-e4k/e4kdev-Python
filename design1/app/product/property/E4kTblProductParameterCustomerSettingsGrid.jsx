
import { Grid } from 'smart-webcomponents-react/grid';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import { DropDownList } from 'smart-webcomponents-react/dropdownlist';
import {  
    useGetProductParameterCustomerSettingsQuery,
    // useCreateProductParameterSettingsMutation,
    // useUpdateProductParameterSettingsMutation,
    useGetProductGenCatoriesQuery
    } from '../../store/services/e4kTblProductParameterSettings';

import E4kTblProductParameterCustomerSettingsGridUpdates from './E4kTblProductParameterCustomerSettingsGridUpdates';
import {useGetAllCustomerQuery} from '../../store/services/e4kTblCustomer';

const E4kTblProductParameterCustomerSettingsGrid = () => {
    const ProductidSelectCustomerParameter = useSelector((state) => state.selectProduct.selectProduct);
    const [dataGridPatameterCustomerSetting, setDataGridPatameterCustomerSetting] = useState([]);
    const gridProductCustomerParameter = useRef();
    const gridProductCustomerDropDownParameter = useRef();

    ////////// category dataSource
    const [dataSourceCusCategory, setDataSourceCusCategory] = useState([]);

    const CompanyProductCustomerSettingGrid = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState('');
    const [RowDataClickCustomer, setRowDataClickCustomer] = useState({});
    const [showModalMediumParameterCustomerSettings, setShowModalMediumParameterCustomerSettings] = useState(false);

    const [customerlist, setCustomerlist] = useState([]);
    const [SelectCustomerSetDropDownChange,setSelectCustomerSetDropDownChange] = useState('');
    const [selectCustomerID,setSelectCustomerID] = useState('')


    const { data :AllCustomerLeveldata,
        error:AllCustomerLeveldataerror, 
        isLoading :AllCustomerLeveldataisloading,
       isError :AllCustomerLeveldataiserror,
       refetch :AllCustomerLeveldatarefetch
       } = useGetAllCustomerQuery(companyid);


       // Update companyid whenever CompanyProductSettingGrid changes
  useEffect(() => {
    if (CompanyProductCustomerSettingGrid) {
      setCompanyid(CompanyProductCustomerSettingGrid);
    }
  }, [CompanyProductCustomerSettingGrid]);

  //const skipQuery = !ProductidSelectCustomerParameter?.productid?.trim();


    const skipQuery =
    !ProductidSelectCustomerParameter?.productid?.trim() ||
    !selectCustomerID?.trim(); 


    const {
    data: ProductSelectparamerterCustomerSettingsData,
    isLoading: ProductSelectCustomersettinsDataisLoading,
    refetch: ProductParameterSettingCustomerRefetch,
  } = useGetProductParameterCustomerSettingsQuery(
    {
      companyid: companyid,
      settingid: '',
      productid: ProductidSelectCustomerParameter.productid || "", 
      customerid: selectCustomerID // Ensure selectCustomerID refetch every time id change is not undefined
    },
    {
      skip: skipQuery, // Use the skip condition here
    }
  );
    


  //////////////////////////////////////////////////////////// Gen categories
    

  const skipGenCusQuery = companyid ==='';

  /////////////////////// Gen categories
  const {
    data: tblgencategoriesdataCusProduct,
    isLoading: tblgencategoriesdataCusProductisLoading,
    
  } = useGetProductGenCatoriesQuery(
    {
      companyid: companyid,
      moduleid: 'product',
      iscustomer:true
      
    },
    {
      skip: skipGenCusQuery, // Use the skip condition here
    }
  );



  ///////////////////////////////////

  ////////////////////////////// gen categories useeffect
  useEffect(() => {
    if(!tblgencategoriesdataCusProductisLoading){
    if (tblgencategoriesdataCusProduct) {
      const data = tblgencategoriesdataCusProduct.e4kTblgenCategories.map(rowdata => ({
        id:rowdata.id,
        category: rowdata.categoryid,
        moduleid: rowdata.moduleid,


      }))
      setDataSourceCusCategory(data);
      // console.log('tblgencategoriesdataProduct', data);
    }
  }
  }, [tblgencategoriesdataCusProductisLoading,tblgencategoriesdataCusProduct,ProductidSelectCustomerParameter.productid]);
   

  ////////////////// All customer use effect 
  useEffect(() => {
    if (AllCustomerLeveldata && !AllCustomerLeveldataisloading) {
        
        const datagrid11customer = AllCustomerLeveldata.e4kTblcustomerAll.map(category => ({
            name: category.name,
            businessid: category.businessid,
            customer : category.businessid +  " - "+ category.name
            
            }));


        setCustomerlist(datagrid11customer);

    }
  }, [AllCustomerLeveldata,AllCustomerLeveldataisloading]);

  useEffect(() => {
    

    const transformDataProductParemeterCustomerSettings = async () => {
      

      const datagridCustomer = [];
      const sssCustomer = ProductSelectparamerterCustomerSettingsData.e4kTblproductProductParametersCustomerSettings.map(jsonString => JSON.parse(jsonString));

      for (const category of sssCustomer) {

        datagridCustomer.push({
          settingid: category.settingid,
          settingname: category.settingname,
          default: category.default,
          category: category.category,
          lookupTable: category.lookupTable,
          lookup_value: category.lookup_value,
          seqno: category.seqno,
          
        });
      }

      setDataGridPatameterCustomerSetting(datagridCustomer);
    };

    if (ProductidSelectCustomerParameter.productid !== '' && ProductSelectparamerterCustomerSettingsData?.e4kTblproductProductParametersCustomerSettings.length > 0 && selectCustomerID !=='') {
     
     
    
        transformDataProductParemeterCustomerSettings();
     
    }
  }, [ProductSelectparamerterCustomerSettingsData, ProductidSelectCustomerParameter.productid,selectCustomerID]);



  

    
  
    const sortingCustomer = { enabled: true };
    const dataSource12parameterCustomer = useMemo(() => dataGridPatameterCustomerSetting, [dataGridPatameterCustomerSetting]);
  
    const behaviorCustomer = {
        columnResizeMode: 'growAndShrink'
    };
    const filteringCustomer = {
      enabled: true,
      filterRow: { visible: true },
    };
  
    const appearanceCustomer = {
      alternationCount: 2,
      alternationStart: -1,
      
      
      autoShowColumnFilterButton: false,
      showColumnLines: true,
      showRowLines: false,
      
    };
    
  
    const columnsCustomer = dataSourceCusCategory.length > 0 ? [
      { label: 'Setting ID', dataField: 'settingid' ,visible: false,allowEdit: false, },
      { label: 'Setting Name', dataField: 'settingname' ,allowEdit: false, },
      { 
        label: 'Category',
        dataField: 'category',
        allowEdit: false,
       // "filterMenuMode" : 'excel',
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
      { label: 'Default', dataField: 'default',allowEdit: false,  },

      { label: 'Lookup Table', dataField:'lookupTable' ,visible: false,allowEdit: false },
      { label: 'Lookup Value', dataField:'lookup_value' ,visible: false,allowEdit: false },
      { label: 'Seq Number', dataField:'seqno' ,visible: false,allowEdit: false },
      
    ] : [];
  
    //////////////// Editing
    const editingCustomer = {
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
      ///////////////////////////////Row Click handlers

  const handleProductParameterCustomerRowClick = (event) => {
    
    const rowdata = event.detail.data;

    if (rowdata !==null){
          if(rowdata.lookup_value !=='' || (typeof(rowdata.lookup_value) === Object)){
            if (typeof(rowdata.lookup_value) !== 'string'){
              rowdata.lookup_value = rowdata.lookup_value
            }else{
              rowdata.lookup_value = rowdata.lookup_value.split(',');
            }
          }

          rowdata.productid = ProductidSelectCustomerParameter.productid
          rowdata.customerid = selectCustomerID !=='' ? selectCustomerID : '';
          setRowDataClickCustomer(rowdata)
          
          handleOpenModalMediumParameterCustomerSettings()
  }
        
    };



    /////////////////////////////// product customer price list with customer id
  
  const handleOpenModalMediumParameterCustomerSettings = () => {
    setShowModalMediumParameterCustomerSettings(true);
  };
  const handleCloseModalMediumParameterCustomerSettings = () => {
   
    setShowModalMediumParameterCustomerSettings(false);
    ProductParameterSettingCustomerRefetch();
  };


  const handleDropDownonChangeAllCustomerlist = (event) => {
    const value = event.detail.value;

    const suppdata = value.split(' -')[0];
    setSelectCustomerID(suppdata);
    setSelectCustomerSetDropDownChange(value)
    
  }
      

  return (
    <>
    


                            <div className='popupmasterpage-topfield'>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className='input-lable'>
                                        <span>Customer : </span>
                                    </div>
                                </div>    
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className="display-inline">
                                        <div className='form-group master-option'>                                
                                            <DropDownList
                                                ref={gridProductCustomerDropDownParameter}
                                                id="E4kTblProductParameterCustomerSettingsDropdownComponent"
                                                filterable
                                                placeholder="Select Customer"
                                                dataSource={customerlist.length > 0 ? customerlist.map(cus => cus.customer) : []}
                                                onChange={(e) => handleDropDownonChangeAllCustomerlist(e)}
                                                value = {SelectCustomerSetDropDownChange} 
                                            />

                                        
                                            
                                            
                                        </div>

                                        {/* <span onClick={() => handleAddSupplierLevel()}><a href="#"> Add</a></span> */}
                                        {/* <button className="btn alter-button margin-left15" onClick={() => handleAddSupplierLevel()} >Add</button> */}
                                    </div>
                                </div>


                            </div> 




      <Grid
        id={"E4kTblProductParameterCustomerSettingsgridExist"}
        ref={ProductidSelectCustomerParameter.productid ? gridProductCustomerParameter : gridProductCustomerParameter}
        dataSource={dataSource12parameterCustomer}
        sorting={sortingCustomer}
        behavior={behaviorCustomer}
        appearance={appearanceCustomer}
        columns={columnsCustomer}
        filtering={filteringCustomer}
        editing={editingCustomer}
        onRowClick={handleProductParameterCustomerRowClick}
      />

    <E4kTblProductParameterCustomerSettingsGridUpdates 
      showModalMediumParameterCustomerSettingsMatrix = {showModalMediumParameterCustomerSettings} 
      handleCloseMediumParameterCustomerSettingsMatrix = {handleCloseModalMediumParameterCustomerSettings}
      SelectRowDataCustomer = {RowDataClickCustomer}
      />
    </>
    
  );
};

export default E4kTblProductParameterCustomerSettingsGrid;




