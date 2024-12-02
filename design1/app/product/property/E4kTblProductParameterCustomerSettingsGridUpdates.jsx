
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import Draggable from 'react-draggable';

import {useUpdateProductParameterCustomerSettingsSetValuesMutation} from '../../store/services/e4kTblProductParameterSettings';


const E4kTblProductParameterCustomerSettingsGridUpdates = ({ showModalMediumParameterCustomerSettingsMatrix, handleCloseMediumParameterCustomerSettingsMatrix ,SelectRowDataCustomer}) => {
    
    const [isMaximizedParameterCustomerSettings, setIsMaximizedParameterCustomerSettings] = useState(false);
    const [paremerterCustomerdataUpdate, setParemerterCustomerdataUpdate] = useState([])
    const CompanyProductCustomerSettingGridUpdate = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState('');
    const ParamerterCustomersettingsUdpateref = useRef()

    useEffect(() => {
        if (CompanyProductCustomerSettingGridUpdate) {
          setCompanyid(CompanyProductCustomerSettingGridUpdate);
        }
      }, [CompanyProductCustomerSettingGridUpdate]);
    
      



        ////////////// Update Product paramerter settings
const [updateProductparameterCustomerSettingsSetvalue,
    { isLoading: isUpdatingProductparameterCustomerSettingsSetvalue }
   ] = useUpdateProductParameterCustomerSettingsSetValuesMutation();


    const columns5Customer = SelectRowDataCustomer.lookup_value !=='' ? [

        { label: 'Setting ID', dataField: 'settingid' ,visible: false,allowEdit: false, },
        { label: 'Setting Name', dataField: 'settingname' ,allowEdit: false, },
        { 
            label: 'Default',
            dataField: 'default' ,
            editor:{
                template:'dropDownList',
                dataSource: SelectRowDataCustomer.lookup_value
            }
        
        },
        { label: 'Lookup Table', dataField:'lookupTable' ,visible: false,allowEdit: false },
        { label: 'Lookup Value', dataField:'lookup_value' ,visible: false,allowEdit: false },
        { label: 'Seq Number', dataField:'seqno' ,visible: false,allowEdit: false },
    ] : [

        { label: 'Setting ID', dataField: 'settingid' ,visible: false,allowEdit: false, },
        { label: 'Setting Name', dataField: 'settingname' ,allowEdit: false, },
        { label: 'Default', dataField: 'default'  },
        { label: 'Lookup Table', dataField:'lookupTable' ,visible: false,allowEdit: false },
        { label: 'Lookup Value', dataField:'lookup_value' ,visible: false,allowEdit: false },
        { label: 'Seq Number', dataField:'seqno' ,visible: false,allowEdit: false },


    ]

    const editing5Customer = {
        enabled: true,
        mode: 'row',
     
      };
  
      const sorting5Customer = { enabled: true };
      const dataSource12parameter5Customer = useMemo(() => [SelectRowDataCustomer], [SelectRowDataCustomer]);
    
      const behavior5Customer = {
          columnResizeMode: 'growAndShrink'
      };
      const filtering5Customer = {
        enabled: true,
        filterRow: { visible: true },
      };

    
      const appearance5Customer = {
        alternationCount: 2,
        alternationStart: -1,
        autoShowColumnFilterButton: false,
        showColumnLines: true,
        showRowLines: false,
        
      };
      const header5Customer = {
        visible: true,
        buttons: ['filter','sort','search']
      };
  

    
    const toggleMaximizeParameterCustomerSettings = () => {
        setIsMaximizedParameterCustomerSettings(!isMaximizedParameterCustomerSettings);
    };


    ///////////////// Handle save buttonclick 
const handleSaveParameterCustomerSettings = () => {

    console.log('Update setting data=............', paremerterCustomerdataUpdate)
    if (paremerterCustomerdataUpdate.productid !=='' && paremerterCustomerdataUpdate.settingid !=='' && paremerterCustomerdataUpdate.customerid !=='') {
        handleProductParameterCustomerSettingsUpdate(paremerterCustomerdataUpdate);

    }

    

}

  const handlecloseParameterCustomerSetting = () =>{  
    setIsMaximizedParameterCustomerSettings(false);
      handleCloseMediumParameterCustomerSettingsMatrix()
  }



  const handleProductParameterCustomerSettingsRowClick = (event) => {
    
    const rowdata = event.detail.data;
    if ( rowdata !==null && rowdata.settingid) {
        setParemerterCustomerdataUpdate({
            companyid: companyid,
            productid: SelectRowDataCustomer.productid,
            settingid: rowdata.settingid,
            customerid: SelectRowDataCustomer.customerid,
            
            value: rowdata.default,
    
        });
    }else{
        toast.error('Please Check a rowdata to update', { position: "top-center" });
    }
    
    };


      /////////////// Product Stocking type update
 const handleProductParameterCustomerSettingsUpdate = async (category) => {
    try {
      const result = await updateProductparameterCustomerSettingsSetvalue(category);
      if (result.error) {
        console.error('Mutation Error:', result.error);
      } else {
        console.log('Mutation Success:', result.data);
        if (result.data.E4kTblproductParametertscustomerssetvaluesUpdate.parameterCustomerSet === "Success") {
          toast.success('Parameter Customer Settings Updated', {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,

          });
          setIsMaximizedParameterCustomerSettings(false);
          handleCloseMediumParameterCustomerSettingsMatrix();
          
        } else {
          toast.error(result.data.E4kTblproductParametertscustomerssetvaluesUpdate.parameterCustomerSet, {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,

          });
        }
      }
    } catch (error) {
      console.error('Mutation Error:', error);
    }
  };


    const modalDialogclassNameCustomer = isMaximizedParameterCustomerSettings ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
        <Draggable >
            <div className={`modal fade ${showModalMediumParameterCustomerSettingsMatrix ? 'in' : ''}`} style={{ display: showModalMediumParameterCustomerSettingsMatrix ? 'block' : 'none' }}>
                <div className={modalDialogclassNameCustomer}>
                    <div className="modal-content medium-popup-div">
                        <div className="modal-body">
                            <div className="breadcomb-area">
                                <div className="container-fluid remove-padding">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="breadcomb-list">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className='popup-topbar-title'>
                                                            {SelectRowDataCustomer.productid} - {SelectRowDataCustomer.settingname}
                                                        </div>


                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                            <div className="breadcomb-wp">
                                                                <div className="breadcomb-ctn">
                                                                <span onClick={() => handleSaveParameterCustomerSettings()}><a href="#"> <i className="fa fa-check" ></i> Save</a></span>
                                                                </div>
                                                            </div>



                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                       

                                                        <div className='popup-top-rightdiv'>
                                                                <button type="button" className="btn-link" onClick={toggleMaximizeParameterCustomerSettings}>
                                                                {isMaximizedParameterCustomerSettings ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                                </button>
                                                                <button type="button" className="close" onClick={() => handlecloseParameterCustomerSetting()}>
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
                                            <div className="customer-newbold"> {SelectRowDataCustomer.productid} - {SelectRowDataCustomer.settingname} </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='popupmasterpage-topfield'>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    
                                </div>    
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className='form-group master-option button-right'>                                
                                        <span>
                                            <button className="btn alter-button" onClick={() => handleCopyFirstStockType()} >Copy Frist</button>
                                        </span>
                                    </div>
                                </div>
                            </div>   */}




                            <div className="medium-modal-section">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            
                                                <Grid
                                                    id={"E4kTblProductParameterCustomerSettingsgridupdateValueExist"}
                                                    header={header5Customer}
                                                    ref= {ParamerterCustomersettingsUdpateref}
                                                    dataSource={dataSource12parameter5Customer}
                                                    sorting={sorting5Customer}
                                                    behavior={behavior5Customer}
                                                    appearance={appearance5Customer}
                                                    columns={columns5Customer}
                                                    filtering={filtering5Customer}
                                                    editing={editing5Customer}
                                                    onEndEdit={handleProductParameterCustomerSettingsRowClick}
                                                />
                                            
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

export default E4kTblProductParameterCustomerSettingsGridUpdates;
