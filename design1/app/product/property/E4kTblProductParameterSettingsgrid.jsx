
import { Grid } from 'smart-webcomponents-react/grid';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef, useMemo } from 'react';


import {  useGetProductParameterSettingsQuery,
    // useCreateProductParameterSettingsMutation,
    // useUpdateProductParameterSettingsMutation,
    useGetProductGenCatoriesQuery
    } from '../../store/services/e4kTblProductParameterSettings';

import E4kTblProductParamerSettingGridUpdate from './E4kTblProductParamerSettingGridUpdate';


const E4kTblProductParameterSettingsgrid = () => {
    const ProductidSelectParameter = useSelector((state) => state.selectProduct.selectProduct);
    const [dataGridPatameterSetting, setDataGridPatameterSetting] = useState([]);

    ////////// category dataSource
    const [dataSourceCategory, setDataSourceCategory] = useState([]);
    const gridProductParameter = useRef();

    const CompanyProductSettingGrid = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState('');
    const [RowDataClick, setRowDataClick] = useState({});
    const [showModalMediumParameterSettings, setShowModalMediumParameterSettings] = useState(false);



       // Update companyid whenever CompanyProductSettingGrid changes
  useEffect(() => {
    if (CompanyProductSettingGrid) {
      setCompanyid(CompanyProductSettingGrid);
    }
  }, [CompanyProductSettingGrid]);

  const skipQuery = !ProductidSelectParameter?.productid?.trim();

    const {
    data: ProductSelectparamerterSettingsData,
    isLoading: ProductSelectSalesPeopleDataisLoading,
    refetch: ProductParameterSettingRefetch,
  } = useGetProductParameterSettingsQuery(
    {
      companyid: companyid,
      settingid: '',
      productid: ProductidSelectParameter.productid || "", // Ensure productid is not undefined
    },
    {
      skip: skipQuery, // Use the skip condition here
    }
  );
    
   

  const skipGenQuery = companyid ==='';

  /////////////////////// Gen categories
  const {
    data: tblgencategoriesdataProduct,
    isLoading: tblgencategoriesdataProductisLoading,
    //refetch: ProductParameterSettingRefetch,
  } = useGetProductGenCatoriesQuery(
    {
      companyid: companyid,
      moduleid: 'product',
      iscustomer:false
      
    },
    {
      skip: skipGenQuery, // Use the skip condition here
    }
  );

    //////////////////////////// gen categories useeffect
    useEffect(() => {
      if(!tblgencategoriesdataProductisLoading){
      if (tblgencategoriesdataProduct) {
        const data = tblgencategoriesdataProduct.e4kTblgenCategories.map(rowdata => ({
          id:rowdata.id,
          category: rowdata.categoryid,
          moduleid: rowdata.moduleid,


        }))
        setDataSourceCategory(data);
        // console.log('tblgencategoriesdataProduct', data);
      }
    }
    }, [tblgencategoriesdataProductisLoading,tblgencategoriesdataProduct,ProductidSelectParameter.productid]);


  useEffect(() => {
    
    // if(!tblgencategoriesdataProductisLoading){
    //   if (tblgencategoriesdataProduct) {
    //     const data = tblgencategoriesdataProduct.e4kTblgenCategories.map(rowdata => ({
    //       id:rowdata.id,
    //       category: rowdata.categoryid,
    //       moduleid: rowdata.moduleid,


    //     }))
    //     setDataSourceCategory(data);
    //     console.log('tblgencategoriesdataProduct', data);
    //   }
    // }




    ////////////////////////////////////

    const transformDataProductParemeterSettings = async () => {
      

      const datagrid = [];
      const sss = ProductSelectparamerterSettingsData.e4kTblproductProductParametersSettings.map(jsonString => JSON.parse(jsonString));

      for (const category of sss) {

        datagrid.push({
          settingid: category.settingid,
          settingname: category.settingname,
          default: category.default,
          category: category.category,
          lookupTable: category.lookupTable,
          lookup_value: category.lookup_value,
          seqno: category.seqno,
          
        });
      }

      setDataGridPatameterSetting(datagrid);
    };

    if (ProductidSelectParameter.productid !== '' && ProductSelectparamerterSettingsData?.e4kTblproductProductParametersSettings.length > 0) {
     
     
    
        transformDataProductParemeterSettings();
     
    }
  }, [ProductSelectparamerterSettingsData, ProductidSelectParameter.productid]);



  

    
  
    const sorting = { enabled: true };
    const dataSource12parameter = useMemo(() => dataGridPatameterSetting, [dataGridPatameterSetting]);
    
  
    const behavior = {
        columnResizeMode: 'growAndShrink'
    };
    const filtering = {
      enabled: true,
      filterRow: { visible: true },
    //   filterMenu: {
		// 	// mode: 'excel',
    //   visible :true,
		// }
    };
  
    const appearance = {
      alternationCount: 2,
      alternationStart: -1,
      
      
      autoShowColumnFilterButton: true,
      showColumnLines: true,
      showRowLines: false,
      
    };
    
  
    const columns = dataSourceCategory.length > 0 ? [
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
            input.dataSource = dataSourceCategory.map(cate => cate.category);
  
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


    //const dataSource12Columns = useMemo(() => columns, [columns]);
  
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
      ///////////////////////////////Row Click handlers

  const handleProductParameterRowClick = (event) => {
    
    const rowdata = event.detail.data;

    if (rowdata !==null){
          if(rowdata.lookup_value !=='' || (typeof(rowdata.lookup_value) === Object)){
            if (typeof(rowdata.lookup_value) !== 'string'){
              rowdata.lookup_value = rowdata.lookup_value
            }else{
              rowdata.lookup_value = rowdata.lookup_value.split(',');
            }
          }

          rowdata.productid = ProductidSelectParameter.productid
          setRowDataClick(rowdata)
          
          handleOpenModalMediumParameterSettings()
  }
        
    };



    /////////////////////////////// product customer price list with customer id
  
  const handleOpenModalMediumParameterSettings = () => {
    setShowModalMediumParameterSettings(true);
  };
  const handleCloseModalMediumParameterSettings = () => {
   
    setShowModalMediumParameterSettings(false);
    ProductParameterSettingRefetch();
  };

      

  return (
    <>
 
      <Grid
        id={"E4kTblProductParameterSettingsgridExist"}
        ref={ProductidSelectParameter.productid ? gridProductParameter : gridProductParameter}
        dataSource={dataSource12parameter}
        sorting={sorting}
        behavior={behavior}
        appearance={appearance}
        columns={columns}
        filtering={filtering}
        editing={editing}
        onRowClick={handleProductParameterRowClick}
      />
     
      

    <E4kTblProductParamerSettingGridUpdate 
      showModalMediumParameterSettingsMatrix = {showModalMediumParameterSettings} 
      handleCloseMediumParameterSettingsMatrix = {handleCloseModalMediumParameterSettings}
      SelectRowData = {RowDataClick}
      />
    </>
    
  );
};

export default E4kTblProductParameterSettingsgrid;




