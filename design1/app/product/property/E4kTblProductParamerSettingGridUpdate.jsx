
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import Draggable from 'react-draggable';

import {useUpdateProductParameterSettingsSetValuesMutation} from '../../store/services/e4kTblProductParameterSettings';


const E4kTblProductParamerSettingGridUpdate = ({ showModalMediumParameterSettingsMatrix, handleCloseMediumParameterSettingsMatrix ,SelectRowData}) => {
    
    const [isMaximizedParameterSettings, setIsMaximizedParameterSettings] = useState(false);
    const [paremerterdataUpdate, setParemerterdataUpdate] = useState([])
    const CompanyProductSettingGridUpdate = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState('');
    const ParamertersettingsUdpateref = useRef()

    useEffect(() => {
        if (CompanyProductSettingGridUpdate) {
          setCompanyid(CompanyProductSettingGridUpdate);
        }
      }, [CompanyProductSettingGridUpdate]);
    
      



        ////////////// Update Product paramerter settings
const [updateProductparameterSettingsSetvalue,
    { isLoading: isUpdatingProductparameterSettingsSetvalue }
   ] = useUpdateProductParameterSettingsSetValuesMutation();


    const columns5 = SelectRowData.lookup_value !=='' ? [

        { label: 'Setting ID', dataField: 'settingid' ,visible: false,allowEdit: false, },
        { label: 'Setting Name', dataField: 'settingname' ,allowEdit: false, },
        { 
            label: 'Default',
            dataField: 'default' ,
            editor:{
                template:'dropDownList',
                dataSource: SelectRowData.lookup_value
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

    const editing5 = {
        enabled: true,
        mode: 'row',
     
      };
  
      const sorting5 = { enabled: true };
      const dataSource12parameter5 = useMemo(() => [SelectRowData], [SelectRowData]);
    
      const behavior5 = {
          columnResizeMode: 'growAndShrink'
      };
      const filtering5 = {
        enabled: true,
        filterRow: { visible: true },
      };

    
      const appearance5 = {
        alternationCount: 2,
        alternationStart: -1,
        autoShowColumnFilterButton: false,
        showColumnLines: true,
        showRowLines: false,
        
      };
      const header5 = {
        visible: true,
        buttons: ['filter','sort','search']
      };
  

    
    const toggleMaximizeParameterSettings = () => {
        setIsMaximizedParameterSettings(!isMaximizedParameterSettings);
    };


    ///////////////// Handle save buttonclick 
const handleSaveParameterSettings = () => {

    console.log('Update setting data=............', paremerterdataUpdate)
    if (paremerterdataUpdate.productid !=='' && paremerterdataUpdate.settingid !=='') {
        handleProductParameterSettingsUpdate(paremerterdataUpdate);

    }

    

}

  const handleclosestockType = () =>{  
      handleCloseMediumParameterSettingsMatrix()
  }



  const handleProductParameterSettingsRowClick = (event) => {
    
    const rowdata = event.detail.data;
    if ( rowdata !==null && rowdata.settingid) {
        setParemerterdataUpdate({
            companyid: companyid,
            productid: SelectRowData.productid,
            settingid: rowdata.settingid,
            value: rowdata.default,
    
        });
    }else{
        toast.error('Please Check a rowdata to update', { position: "top-center" });
    }
    
    };


      /////////////// Product Stocking type update
 const handleProductParameterSettingsUpdate = async (category) => {
    try {
      const result = await updateProductparameterSettingsSetvalue(category);
      if (result.error) {
        console.error('Mutation Error:', result.error);
      } else {
        console.log('Mutation Success:', result.data);
        if (result.data.E4kTblproductParameterssetvaluesUpdate.parameterSet === "Success") {
          toast.success('Parameter Settings Updated', {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,

          });
          handleCloseMediumParameterSettingsMatrix();
          
        } else {
          toast.error(result.data.E4kTblproductParameterssetvaluesUpdate.parameterSet, { position: "top-center" });
        }
      }
    } catch (error) {
      console.error('Mutation Error:', error);
    }
  };


    const modalDialogclassName = isMaximizedParameterSettings ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
        <Draggable >
            <div className={`modal fade ${showModalMediumParameterSettingsMatrix ? 'in' : ''}`} style={{ display: showModalMediumParameterSettingsMatrix ? 'block' : 'none' }}>
                <div className={modalDialogclassName}>
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
                                                            {SelectRowData.productid} - {SelectRowData.settingname}
                                                        </div>


                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                            <div className="breadcomb-wp">
                                                                <div className="breadcomb-ctn">
                                                                <span onClick={() => handleSaveParameterSettings()}><a href="#"> <i className="fa fa-check" ></i> Save</a></span>
                                                                </div>
                                                            </div>



                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                       

                                                        <div className='popup-top-rightdiv'>
                                                                <button type="button" className="btn-link" onClick={toggleMaximizeParameterSettings}>
                                                                {isMaximizedParameterSettings ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                                </button>
                                                                <button type="button" className="close" onClick={() => handleclosestockType()}>
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
                                            <div className="customer-newbold"> {SelectRowData.productid} - {SelectRowData.settingname} </div>
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
                                                    id={"E4kTblProductParameterSettingsgridupdateValueExist"}
                                                    header={header5}
                                                    ref= {ParamertersettingsUdpateref}
                                                    dataSource={dataSource12parameter5}
                                                    sorting={sorting5}
                                                    behavior={behavior5}
                                                    appearance={appearance5}
                                                    columns={columns5}
                                                    filtering={filtering5}
                                                    editing={editing5}
                                                    onEndEdit={handleProductParameterSettingsRowClick}
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

export default E4kTblProductParamerSettingGridUpdate;
