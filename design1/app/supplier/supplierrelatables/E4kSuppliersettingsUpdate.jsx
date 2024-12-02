"use client";
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import Draggable from 'react-draggable';

import {useUpdateSupplierSetValueMutation} from '../../store/services/Supplier/e4kTblsuppliersettings';


const E4kSuppliersettingsUpdate = ({ showModalMediumCustomerParameterSettings, handleCloseMediumParameterCustomerparametersetting ,SelectRowData}) => {

    const [isMaximizedParameterSettings, setIsMaximizedParameterSettings] = useState(false);
    const [CustomerparemerterdataUpdate, setCustomerParemerterdataUpdate] = useState({});
    const selectedSuppliersetingsupdate = useSelector(state => state.supplierSelect.selectedSupplier);
    const customerParamertersettingsUdpateref= useRef(null);
    const [updatesupplierparametersettings,
       ] = useUpdateSupplierSetValueMutation();



    const handleCustomerParameterSettingsRowClick = (event) => {

        const rowdata = event.detail.data;
        if ( rowdata !==null && rowdata.settingid) {
            setCustomerParemerterdataUpdate({
                companyid:  selectedSuppliersetingsupdate.CompanyID ,
                businessid: SelectRowData.businessid,
                settingid: rowdata.settingid,
                value: rowdata.default,

            });

        }else{
            // toast.error('Please Check a rowdata to update', { position: "top-center" });
        }

        };






    const handleSupplierParameterSettingsUpdate = async (category) => {
        try {
          const result = await updatesupplierparametersettings(category);
          if (result.error) {
            console.error('Mutation Error:', result.error);
          } else {
            console.log('Mutation Success:', result.data);
            if (result.data.E4kTblsuppliersetvalueupdate.customersetvalues === "Success") {
              toast.success('CustomerParameter Settings Updated', {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,

              });
              handleCloseMediumParameterCustomerparametersetting();

            } else {
              toast.error(result.data.E4kTblsuppliersetvalueupdate.customersetvalues, { position: "top-center" });
            }
          }
        } catch (error) {
          console.error('Mutation Error:', error);
        }
      };


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
      const dataSource12parameterCustomer = useMemo(() => [SelectRowData], [SelectRowData]);

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

    const handleSaveCustomerParameterSettings = () => {

        if (CustomerparemerterdataUpdate.businessid !=='' && CustomerparemerterdataUpdate.settingid !=='') {
            handleSupplierParameterSettingsUpdate(CustomerparemerterdataUpdate);
        }

    }


  const handleclosestockType = () =>{
    handleCloseMediumParameterCustomerparametersetting()
  }



    const modalDialogclassName = isMaximizedParameterSettings ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
        <Draggable >
            <div className={`modal fade ${showModalMediumCustomerParameterSettings ? 'in' : ''}`} style={{ display: showModalMediumCustomerParameterSettings ? 'block' : 'none' }}>
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
                                                            {SelectRowData.businessid} - {SelectRowData.settingname}
                                                        </div>


                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                            <div className="breadcomb-wp">
                                                                <div className="breadcomb-ctn">
                                                                <span onClick={() => handleSaveCustomerParameterSettings()}><a href="#"> <i className="fa fa-check" ></i> Save</a></span>
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
                                            <div className="customer-newbold">
                                                 {SelectRowData.businessid} - {SelectRowData.settingname}
                                                  </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='height-alignment'>
                            <div className="medium-modal-section">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <Grid
                                                    id={"E4kcustomersettingupdate"}
                                                    header={header5}
                                                    ref= {customerParamertersettingsUdpateref}
                                                    dataSource={dataSource12parameterCustomer}
                                                    sorting={sorting5}
                                                    behavior={behavior5}
                                                    appearance={appearance5}
                                                    columns={columns5}
                                                    filtering={filtering5}
                                                    editing={editing5}
                                                    onEndEdit={handleCustomerParameterSettingsRowClick}
                                                />

                                        </div>
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

export default E4kSuppliersettingsUpdate;
