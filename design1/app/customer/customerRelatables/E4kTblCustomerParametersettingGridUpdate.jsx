"use client";
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import Draggable from 'react-draggable';

import {useUpdateCustomerSetValueMutation} from '../../store/services/Customer/e4kCustomerSettingsApi';
import { ResizableBox } from 'react-resizable';




const E4kTblCustomerParametersettingGridUpdate = ({ showModalMediumCustomerParameterSettings, handleCloseMediumParameterCustomerparametersetting ,SelectRowData}) => {
    
    const CompanySelectCustomerparamertersetUpdate = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanySelectCustomerparamertersetUpdate);
    const [isMaximizedParameterSettings, setIsMaximizedParameterSettings] = useState(false);
    const [CustomerparemerterdataUpdate, setCustomerParemerterdataUpdate] = useState({});


    const customerParamertersettingsUdpateref= useRef(null);
    const [updatacustomerparametersettings,
        { isLoading: isUpdatingProductparameterSettingsSetvalue }
       ] = useUpdateCustomerSetValueMutation();


    
    const handleCustomerParameterSettingsRowClick = (event) => {
    
        const rowdata = event.detail.data;
        if ( rowdata !==null && rowdata.settingid) {
            setCustomerParemerterdataUpdate({
                companyid: companyid,
                businessid: SelectRowData.businessid,
                settingid: rowdata.settingid,
                value: rowdata.default,
        
            });
        }else{
           
        }
        
        };






    const handleCustomerParameterSettingsUpdate = async (category) => {
        try {
          const result = await updatacustomerparametersettings(category);
          if (result.error) {
           
          } else {
            
            if (result.data.E4kTblCustomerSetValueUpdate.customersetvalues === "Success") {
              toast.success('CustomerParameter Settings Updated', {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
    
              });
              handleCloseMediumParameterCustomerparametersetting();
              
            } else {
              toast.error(result.data.E4kTblCustomerSetValueUpdate.customersetvalues, {
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


    const columns5 = SelectRowData.lookup_value !=='' ? [

        { label: 'Setting ID', dataField: 'settingid' ,visible: false,allowEdit: false, },
        { label: 'Setting Name', dataField: 'settingname' ,allowEdit: false, },
        { 
            label: 'Customer Default',
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
            handleCustomerParameterSettingsUpdate(CustomerparemerterdataUpdate);
    
        }
    
        
    
    }
    

  const handleclosestockType = () =>{  
    handleCloseMediumParameterCustomerparametersetting()
  }



    const modalDialogclassName = isMaximizedParameterSettings ?  'modal-content modal-fullscreen' : 'modal-content medium-popup';



    ///////////////////////////////////// ****************************************** //////////////////////////////////////////


    const [isMinimizedCustomerCategory1, setisMinimizedCustomerCategory1]= useState(false);


    const CustomerparemerterdataUpdateDragable = ({ isMinimizedCustomersettingupdate, children }) => (
        isMinimizedCustomersettingupdate ? children : <Draggable handle=".e4kmodal-headercustomersettings">{children}</Draggable>

    );   

    const handleMinimizecustomerCategory1page = ()=>{
      setisMinimizedCustomerCategory1(!isMinimizedCustomerCategory1);
    };


    const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
      const updateScreenSize = () => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
  
      // Update screen size on window resize
      window.addEventListener('resize', updateScreenSize);
  
      return () => {
        window.removeEventListener('resize', updateScreenSize);
      };
    }, []);
  
    // Set width and height as percentages of the screen size
    const widthPercentage = 60; // 50% of screen width
    const heightPercentage = 60; // 30% of screen height
  
    const resizableWidth = (screenSize.width * widthPercentage) / 100;
    const resizableHeight = (screenSize.height * heightPercentage) / 100;

        

    return (
        <>
        {/* <Draggable > */}
            <CustomerparemerterdataUpdateDragable isMinimizedCustomersettingupdate={isMinimizedCustomerCategory1}>
            {/* <div className={`modal fade ${showModalMediumCustomerParameterSettings ? 'in' : ''}`} style={{ display: showModalMediumCustomerParameterSettings ? 'block' : 'none' }}> */}
            <div className={`modal fade mymodal ${(isMinimizedCustomerCategory1 === true) ? 'min min-subpopup-footerbar' : 'in'}`} style={{ display: showModalMediumCustomerParameterSettings ? 'block' : 'none' }}>
            <ResizableBox width={resizableWidth} height={resizableHeight} className={modalDialogclassName}>
                {/* <div className={modalDialogclassName}> */}
                    <div className="modal-content-min medium-popup-div">
                        <div className="modal-body">
                            <div className="breadcomb-area e4kmodal-headers e4kmodal-headercustomersettings">
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
                                                        <button className="close modalMinimize" onClick={handleMinimizecustomerCategory1page}>
                                                                        <i className={`fa ${isMinimizedCustomerCategory1 ? 'fa-plus' : 'fa-minus'}`}></i>
                                                                </button>
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
                    </ResizableBox>
                </div>
            {/* </div> */}
        {/* </Draggable> */}
        </CustomerparemerterdataUpdateDragable>
        </>
    );
};

export default E4kTblCustomerParametersettingGridUpdate;
2