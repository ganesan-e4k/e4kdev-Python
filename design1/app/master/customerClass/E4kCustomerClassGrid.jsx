import { Grid } from 'smart-webcomponents-react/grid';
import { useSelector } from 'react-redux';
import { useEffect, useState,useMemo } from 'react';
import { toast } from 'react-toastify';
import {
    useGetCustomerClassQuery,
    useCreateCustomerClassMutation,
    useUpdateCustomerClassMutation,
    useDeleteCustomerClassMutation,
} from "../../store/services/Customer/e4kcustomerClass";
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';

const E4kCustomerClassGrid = ({ showModalMediumCustomerClass, handleCloseMediumCustomerClass }) => {
    const [dataGridCustomerClass, setdataGridCustomerClass] = useState([]);
    const CompanySelectTblCustomerClass = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyId, setCompanyId] = useState(CompanySelectTblCustomerClass);
    const { data, error, isLoading } = useGetCustomerClassQuery(companyId);
    const [createCustomerClass, { isLoading: isCreating }] = useCreateCustomerClassMutation();
    const [updateCustomerClass, { isLoading: isUpdating }] = useUpdateCustomerClassMutation();
    const [deleteCustomerClass, { isLoading: isDeleting }] = useDeleteCustomerClassMutation();
    const [isMaximizedCustomerClass, setisMaximizedCustomerClass] = useState(false);
    
    const [showConfirmCustomerClass, setshowConfirmCustomerClass] = useState(false);
    const [recordToDeleteCustomerClass, setrecordToDeleteCustomerClass] = useState(null);

    useEffect(() => {
        if (data) {
            transformDataCustomerClass();
        }
    }, [data]);

    const transformDataCustomerClass = () => {
        if (!data) return [];
        const transformedData = data.E4kCustomerclass.map(item => ({
            classid: parseInt(item.classid, 10), // Ensure classid is an integer
            companyid: item.companyid.companyid,
            className: item.className, // Corrected from item.classname
        }));
        setdataGridCustomerClass(transformedData);
    };

    useEffect(() => {
        window.commandColumnCustomCommandtblCustomerClass = function(row) {
            let dataToDelete = {
                companyid: row.data.companyid,
                classid: parseInt(row.data.classid, 10), // Ensure classid is an integer
            };
            setrecordToDeleteCustomerClass(dataToDelete);
            setshowConfirmCustomerClass(true);
        };
    }, []);

    const message = useMemo(() => ({
        en: {
            addNewRow: '+New',
        },
    }), [companyId]);
  
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
    
    const header = {
        visible: true,
        buttons: ['filter','sort','search']
      };

    const editing = {
        enabled: true,
        addNewRow: {
            visible: true,
            position: "near",
        },
        commandColumn: {
            visible: true,
            displayMode: 'icon',
            dataSource: {
                'commandColumnDelete': { visible: false },
                'commandColumnEdit': { visible: true },
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommandtblCustomerClass', visible: true, label: '' },
            },
        },
    };

    const dataSourceSettings = {
		dataFields: [
			'companyid: string',
			'classid: number',
			'className: string',
           
			
		]
	};

    const selection = {
        enabled: true,
        mode: 'extended',
        allowCellSelection: true,
    };


    const columns = [
        { label: 'CompanyId', dataField: 'companyid', defaultValue: '001', visible: false , allowEdit: false },
        { label: 'Class ID', dataField: 'classid', allowEdit: false },
        { label: 'Class Name', dataField: 'className' },
    ];

    const handleClassCreate = async (categoryClass) => {
        console.log("Creating category", categoryClass)
        // if (categoryClass.className = '') {
        //     toast.error('Please enter all required fields.',{
        //         position: "top-center",
        //         autoClose: 500,
        //         hideProgressBar: true,
        //     });
        //     return;
        // }

        try {
            const result = await createCustomerClass({
                ...categoryClass,
                companyid: categoryClass.companyid,
                className : categoryClass.className,
                
            });
       
            if(result.data.E4kCustomerclasscreate.success === true) {
                
                toast.success('Class created successfully',{
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                });
            }
            else{
                
                toast.error(`${result.data.E4kCustomerclasscreate.error}`,{
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                });
            }
        } catch (error) {
            
            toast.error(`Error creating class:${error.message}`,{
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
        }
    };

    const handleClassUpdate = async (categoryClass) => {
        try {
            const result = await updateCustomerClass({
                ...categoryClass,
                classid: parseInt(categoryClass.classid, 10) // Ensure classid is an integer
            });
            if(result.data.E4kCustomerclassupdate.success === true) {
                
                toast.success('Class updated successfully',{
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                });
            } else {
                
                toast.error(`Error updating class:${result.data.E4kCustomerclassupdate.error}`,{
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                });
            }
        } catch (error) {
            
            toast.error(`Error updating class:${error.message}`,{
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
        }
    };

    const handleDeleteConfirmedClass = async () => {
        if (recordToDeleteCustomerClass) {
            try {
                const result = await deleteCustomerClass({
                    ...recordToDeleteCustomerClass,
                    classid: parseInt(recordToDeleteCustomerClass.classid, 10) // Ensure classid is an integer
                });
                if(result.data.E4KCustomerclassdelete.success===true) {
                    
                    toast.success('Class deleted successfully',{
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                    });
                }
                else{
                    
                    toast.error(`${result.data.E4KCustomerclassdelete.error}`,{
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                    });
                }
            } catch (error) {
                
                toast.error(`Error deleting class:${error.message}`,{
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                });
            }
        }
        setshowConfirmCustomerClass(false);
    };
    
    const handleEndEdit =(e)=>{
        const newCategoryClass = e.detail.data;
        console.log("vcgcsdffsgcs",newCategoryClass )
        newCategoryClass.companyid = companyId;
        if (newCategoryClass.classid!='' ) {
            handleClassUpdate(newCategoryClass);
        } else {
            handleClassCreate(newCategoryClass);
        }
    }

    const modalDialogClassName = isMaximizedCustomerClass ? 'modal-content modal-fullscreen' : 'modal-content medium-popup';
    const toggleMaximizeCustomerClass = () => {
        setisMaximizedCustomerClass(!isMaximizedCustomerClass);
    };
    const [isMinimizedCustomerClassMasterTable, setisMinimizedCustomerClassMasterTable] = useState(false);
    const handleMinimizecustomerClassPage = () => {
            setisMinimizedCustomerClassMasterTable(!isMinimizedCustomerClassMasterTable);
        
    };

    const CustomerclassDraggable =  ({ isMinimizedCustomerClass, children }) => (
        isMinimizedCustomerClass ? children : <Draggable handle=".e4kmodal-headerclass">{children}</Draggable>
      );   

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
      const heightPercentage = 75; // 30% of screen height
    
      const resizableWidth = (screenSize.width * widthPercentage) / 100;
      const resizableHeight = (screenSize.height * heightPercentage) / 100;


    return (
        <>  
        <CustomerclassDraggable isMinimizedCustomerClass={isMinimizedCustomerClassMasterTable}>
            <div className={`modal fade mymodal ${(isMinimizedCustomerClassMasterTable === true) ? 'min min-subpopup-footerbar' : 'in'}`} style={{ display: showModalMediumCustomerClass ? 'block' : 'none' }}>
            <ResizableBox width={resizableWidth} height={resizableHeight} className={modalDialogClassName}>
                <div className="modal-content-min medium-popup-div">
                        <div className="modal-body">
                        <div className="breadcomb-area e4kmodal-headers e4kmodal-headerclass">
                        <div className="container-fluid remove-padding">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="breadcomb-list">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <div className='popup-topbar-title'>
                                                        Customer Class
                                                    </div>

                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className='popup-top-rightdiv'>
                                                        <button className="close modalMinimize" onClick={handleMinimizecustomerClassPage}>
                                                                        <i className={`fa ${isMinimizedCustomerClassMasterTable ? 'fa-plus' : 'fa-minus'}`}></i>
                                                                </button>
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeCustomerClass}>
                                                                {isMaximizedCustomerClass ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                            </button>

                                                            <button type="button" className="close" onClick={handleCloseMediumCustomerClass}>
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
                                            <div className="customer-newbold">Customer Class</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="medium-modal-section">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            {isLoading ? (
                                                "Loading..."
                                            ) : (
                                                <Grid
                                                    id="e4ktblCustomerClassGrid"
                                                    onEndEdit={handleEndEdit}
                                                    header={header}
                                                    dataSource={dataGridCustomerClass}
                                                    filtering={filtering}
                                                    columns={columns}
                                                    behavior={behavior}
                                                    paging={paging}
                                                    pager={pager}
                                                    sorting={sorting}
                                                    selection={selection}
                                                    editing={editing}
                                                    appearance={appearance}
                                                    dataSourceSettings={dataSourceSettings}
                                                    messages={message}
                                                    
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
                </ResizableBox>
            </div>
            </CustomerclassDraggable>
            {showConfirmCustomerClass && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header justify-content-center modal-header-error">
                                    <div class="icon-box">
                                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setshowConfirmCustomerClass(false)}>&times;</button>
                            </div>

                                <div class="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setshowConfirmCustomerClass(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmedClass}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default E4kCustomerClassGrid;
