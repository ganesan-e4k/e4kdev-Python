import { useState, useEffect,useMemo } from 'react';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import { useSelector } from 'react-redux';
import { Grid } from 'smart-webcomponents-react/grid';
import { toast } from 'react-toastify';
import {
  useGetTblCustomerGroupQuery,
  useCreateTblCustomerGroupMutation,
  useUpdateTblCustomerGroupMutation,
  useDeleteTblCustomerGroupMutation,
} from '../../store/services/Customer/e4kTblCustomerGroup';

const E4kTblCustomerGroupGrid = ({ showModalMediumCustomerGroup, handleCloseMediumCustomerGroup }) => {
  const [dataGridCustomerGroup, setdataGridCustomerGroup] = useState([]);
  const CompanySelectTblCustomerGroup = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyId, setCompanyId] = useState(CompanySelectTblCustomerGroup);
  const { data, error, isLoading, refetch } = useGetTblCustomerGroupQuery(companyId);
  const [createCustomerGroup, { isLoading: isCreating }] = useCreateTblCustomerGroupMutation();
  const [updateCustomerGroup, { isLoading: isUpdating }] = useUpdateTblCustomerGroupMutation();
  const [deleteCustomerGroup, { isLoading: isDeleting }] = useDeleteTblCustomerGroupMutation();
  const [isMaximizedCustomerGroup, setisMaximizedCustomerGroup] = useState(false);
 
  const [showConfirmDeleteCustomerGroup, setShowConfirmCustomerGroup] = useState(false);
  const [recordToDeleteCustomerGroup, setrecordToDeleteCustomerGroup] = useState(null);
  // const [showConfirmDeleteCustomerGroup, setShowConfirmCustomerGroup] = useState(false);

  useEffect(() => {
    if (data) {
      transformDataCustomerGrooup();
    }
  }, [data]);

  const transformDataCustomerGrooup = () => {
    if (!data) return [];
    const dataGridCustomerGroup = data.E4kGroup.map(group => ({
      groupid: parseInt(group.groupid, 10), // Ensure groupid is an integer
      companyid: group.companyid.companyid,
      // country: group.companyid.country,
      groupid : group.groupid ,//
      groupname: group.groupname, //
    }));
    setdataGridCustomerGroup(dataGridCustomerGroup);
  };

  useEffect(() => {
    window.commandColumnCustomCommandtblcustomerGroup = function (row) {
      
      let deletedata = {
        companyid: row.data.companyid,
        groupid: parseInt(row.data.groupid, 10), 
      };
      setrecordToDeleteCustomerGroup(deletedata);
      setShowConfirmCustomerGroup(true);
    };
  }, []);







  const handleGroupCreate = async (group)=>{
    if(group.groupname == ''){
      toast.error("Please Enter all Required Feilds");
      return;
    }

    try{
      const result = await createCustomerGroup({
        ...group,
      });
      if(result.data.E4kTblbusgroupcreate.success === true){
        toast.success("Group Created Sucessfully!" ,{position: "top-center",
          autoClose: 500,
          hideProgressBar: true,})
      }
      else{
        toast.error(`Error Created Group: ${result.data.E4kTblbusgroupcreate.error}`, {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
         });
      }
    }
    catch(error){
      toast.error(`Error Created Group: ${error.message}`,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        }
      )
    }
  };


  const handleGroupUpdate = async (group) =>{
    try{
      const result = await updateCustomerGroup({
        ...group,
        groupid : parseInt(group.groupid)
      });
      if(result.data.E4kTblbusgroupupdate.success === true){
        toast.success("Group Updated Sucessfully!", {position: "top-center",
          autoClose: 500,
          hideProgressBar: true,})
      }
      else{
        toast.error(`Error updating Group: ${result.data.E4kTblbusgroupupdate.error}`, {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
         });
      }
    }
    catch(error)
    {
      toast.error(`Error updateing group: ${error.message}`, {  position: "top-center",
        autoClose: 500,
        hideProgressBar: true, });
    }
    // setShowConfirmGroup(false)
  };

  const handleDeleteConfirmedGroup = async()=>{
    if(recordToDeleteCustomerGroup){
      try{
        const result = await deleteCustomerGroup({
          ...recordToDeleteCustomerGroup,
          groupid : parseInt(recordToDeleteCustomerGroup.groupid)
        })
        if(result.data.E4kTblbusgroupdelete.success === true){
          toast.success("Group Delete Successfully !",{
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true, 
           });
    

        }
        
        else{
          toast.error(`Error deleting Group: ${result.data.E4kTblbusgroupdelete.error}`, {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true, 
           });

        }
  

      }
      catch(error){
        toast.error(`Error deleting group:${error.message}` , {position: "top-center",
          autoClose: 500,
          hideProgressBar: true, });
      }
      
    }
    setShowConfirmCustomerGroup(false);
  };



  const handleEndEdit = async (e) => {
    e.preventDefault();
    const newGroup = e.detail.data;
    newGroup.companyid = companyId;
    if (newGroup.groupid!='') {
      await handleGroupUpdate(newGroup);
    } else {
      await handleGroupCreate(newGroup);
    }
  };


  const modalDialogClassName = isMaximizedCustomerGroup ? 'modal-content modal-fullscreen' : 'modal-content medium-popup';
  const toggleMaximizeCustomerGroup = () => {
    setisMaximizedCustomerGroup(!isMaximizedCustomerGroup);
  };


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
    rowResizeMode: 'growAndShrink',
    columnResizeMode: 'growAndShrink'
  };

  const appearance = {
    showRowHeaderNumber: false,
    showRowHeader: true,
    showRowHeaderSelectIcon: true,
     showRowHeaderFocusIcon: true
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

  const dataSourceSettings = {
		dataFields: [
			'companyid: string',
			'groupid: number',
			'groupname: string',
           
			
		]
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
            'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommandtblcustomerGroup', visible: true, label: '' },
        },
    },
};


  const selection = {
    enabled: true,
    mode: 'extended',
    allowCellSelection: true,
  };

  const columns = [
    { label: 'CompanyId', dataField: 'companyid',  allowEdit: false, visible: false },
    { label: 'Group ID', dataField: 'groupid', allowEdit: false },
    { label: 'Group Name', dataField: 'groupname' },
  ];

  const [isMaximizedCustomerGroup1, setisMaximizedCustomerGroup1] = useState(false);

  const handleMinimizeCustomerGroup = ()=>{
    setisMaximizedCustomerGroup1(!isMaximizedCustomerGroup1);
  };



  
  const DraggablecustomerGroup = ({ isMaximizedCustomerGroup1, children }) => (
    isMaximizedCustomerGroup1 ? children : <Draggable handle=".e4kmodal-customergroup">{children}</Draggable>
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
 const heightPercentage = 80; // 30% of screen height

 const resizableWidth = (screenSize.width * widthPercentage) / 100;
 const resizableHeight = (screenSize.height * heightPercentage) / 100;

  return (
    <>
     <DraggablecustomerGroup isMaximizedCustomerGroup1={isMaximizedCustomerGroup1} >
     <div className={`modal fade mymodal ${(isMaximizedCustomerGroup1 === true) ? 'min min-subpopup-footerbar' : 'in'}`} style={{ display: showModalMediumCustomerGroup ? 'block' : 'none' }}>
      <ResizableBox width={resizableWidth} height={resizableHeight} className={modalDialogClassName}>

      {/* <div className={`modal fade ${showModalMediumCustomerGroup ? 'in' : ''}`} style={{ display: showModalMediumCustomerGroup ? 'block' : 'none' }}> */}
        {/* <div className={modalDialogClassName}> */}
          <div className="modal-content-min medium-popup-div">
            <div className="modal-body">
              {/* <div className="breadcomb-area"> */}
              <div className="breadcomb-area e4kmodal-headers e4kmodal-customergroup">
                <div className="container-fluid remove-padding">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="breadcomb-list">
                        <div className="row">
                          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="popup-topbar-title">
                             Tbl Customer Group
                            </div>

                          </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className='popup-top-rightdiv'>
                            <button className="close modalMinimize" onClick={handleMinimizeCustomerGroup}>
                                    <i className={`fa ${isMaximizedCustomerGroup1 ? 'fa-plus' : 'fa-minus'}`}></i>
                            </button>

                                <button type="button" className="btn-link popup-topbar-hidden" onClick={toggleMaximizeCustomerGroup}>
                                    {isMaximizedCustomerGroup ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                </button>
                              <button type="button" className="close" onClick={handleCloseMediumCustomerGroup}>
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
                      <div className="customer-newbold">Tbl Customer Group</div>
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
                          id="e4kTblCustomerGroupGrid"
                          onEndEdit={handleEndEdit}
                          header={header}
                          dataSource={dataGridCustomerGroup}
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
      </DraggablecustomerGroup>

      {/* Confirm Delete Modal */}
      {showConfirmDeleteCustomerGroup && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header justify-content-center modal-header-error">
                                    <div class="icon-box">
                                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmCustomerGroup(false)}>&times;</button>
                            </div>

                                <div class="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmCustomerGroup(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmedGroup}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
                
            )}
            
    </>
  );
};

export default E4kTblCustomerGroupGrid;

                     
