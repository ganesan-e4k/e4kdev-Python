'use client'
import React from 'react';
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState,useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetCountriesQuery,
  useGetGroupNamesQuery,
  useCreateCountryMutation,
  useUpdateCountryMutation,
  useDeleteCountryMutation,

} from '../../store/services/Customer/e4kTblCountry';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';


const E4kCountryGrid = React.memo(({ showModalMediumCountry, handleCloseMediumCountry }) => {
  const [dataGridCountry, setdataGridCountry] = useState([]);
  const [groupmember,setgroupmember] = useState([]);
  console.log("groupname ", groupmember)
  const CompanySelectCusCountry = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyId, setCompanyId] = useState(CompanySelectCusCountry);
  const { data, error, isLoading, isError } = useGetCountriesQuery(companyId);
  const [createCountry, { isLoading: isCreating }] = useCreateCountryMutation();
  const [updateCountry, { isLoading: isUpdating }] = useUpdateCountryMutation();
  const [deleteCountry, { isLoading: isDeleting }] = useDeleteCountryMutation();
  const {data :groupmemberdata} = useGetGroupNamesQuery(companyId)
//   const {data :groupNamedata } = useGetGroupNamesQuery(companyId)
  const [isMaximizedCountry, setisMaximizedCountry] = useState(false);
  
  const [showConfirmCountry, setShowConfirmCountry] = useState(false);
  const [recordToDeleteCountry, setRecordToDeleteCountry] = useState(null);

  useEffect(() => {
    if (data) {
        transformDataCountry();
    }
}, [data]);

  useEffect(()=>{
    if(groupmemberdata){
      const dropdownDataSource= groupmemberdata.E4kCountryMember.map(country =>({
        value : country.groupid,
        text : country.groupName
      }))
      setgroupmember(dropdownDataSource);
      console.log("JKHHHHHH", dropdownDataSource)
    }
  },[groupmemberdata])



  const transformDataCountry = () => {
    if (!data) return [];
  
    const dataGridCountry = data.E4kCountry.map(Country => ({
      countryid: parseInt(Country.countryid, 10),
      companyid: Country.companyid.companyid,
      country: Country.country,
      member : Country.member?.groupName,
      // groupName: Country.member ? Country.member.groupName : null,
    }));
    setdataGridCountry(dataGridCountry);
  };
  

  useEffect(() => {
    window.commandColumnCustomCommandtblCountry = function(row) {
      let deletedata = {
        companyid: row.data.companyid,
        countryid: parseInt(row.data.countryid, 10),
      };
      setRecordToDeleteCountry(deletedata);
      setShowConfirmCountry(true);
    };
  }, []);

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

  const dataSourceSettings = {
    dataFields: [
      'companyid: string',
      'countryid: number',
      'country: string',
      'member: string',
      
    ]
  };

  const selection = {
    enabled: true,
    mode: 'extended',
    allowCellSelection: true,
  };

  const message = useMemo(() => ({
    en: {
        addNewRow: '+New',
    },
}), [companyId]);


  const header = {
    visible: true,
    buttons: ['filter', 'sort', 'search']
  };

  const editing = {
    enabled: true,
    mode:'row',
    addNewRow: {
      visible: true,
      position: 'near',
    },
    commandColumn: {
      visible: true,
      // displayMode: 'icon',
      dataSource: {
        'commandColumnDelete': { visible: false },
        'commandColumnEdit': { visible: true },
        'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommandtblCountry', visible: true, label: '' },
      },
    },
  };

  const columns = [
    { label: 'Company ID', dataField: 'companyid', allowEdit: false, visible: false },
    { label: 'Country ID', dataField: 'countryid', allowEdit: false },
    { label: 'Country', dataField: 'country' },
    {
      label: 'Member',
      dataField: 'member',
      editor: {
        template: 'dropDownList',
        dataSource: groupmember.map(ff => ff.text)
      }
      
    },

  ];
  

  const handleCountryCreate = async (country) => {
    const { member } = country;
    // console.log("PPPIO", country) 

    const selectedgroup = groupmember.find(item => item.text === member);
    console.log("GHHHHHHHHHHH", selectedgroup)
    const memberid = selectedgroup ? selectedgroup.value : null;
    console.log("Country updated", memberid)
    if(!memberid){
      toast.error('please Fill all the Feilds',{
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
      });
      return;
    }

   
    try {
      const result = await createCountry({
        ...country,
        member: memberid,
      
    
      });
      console.log("Country created, ",{
        ...country,
        member: memberid,
      
    
      })
      console.log("Create Country Result:", result);
      if(result.data.E4kCountrycreate.success === true) {
        toast.success('Country created successfully',{
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
        });
      }
        else{
          toast.error(`Error creating country :${result.data.E4kCountrycreate.error}`,{
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
          });
        }
      
    } catch (error) {
      
      toast.error('Error creating country',{
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
    });
    }
  };

  const handleCountryUpdate = async (country) => {
    
    const { companyid, countryid,member } = country; 
    console.log("you have updated", country)
    const selectedgroup = groupmember.find(item => item.text === member);
    console.log("GHHHHHHHHHHH", selectedgroup)
    const memberid = selectedgroup ? selectedgroup.value : null;
    console.log("Country updated", memberid)

    try {
      const result = await updateCountry({
        ...country,
        countryid: parseInt(country.countryid, 10),
        member: memberid,
      });
      if(result.data.E4kCountryupdate.success === true) {
        toast.success('Country updated successfully',{
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        });
      }
      else{
        toast.error(`Faild to update country: ${result.data.E4kCountryupdate.error}`,{
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
          });
      }
      
    } catch (error) {
      toast.error('Error updating country',{
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
    });
    }
};

const handleDeleteConfirmedCountry = async () => {
  if (recordToDeleteCountry) {
    try {
      const result = await deleteCountry({
        ...recordToDeleteCountry,
        countryid: parseInt(recordToDeleteCountry.countryid, 10),
      });

      if(result.data.E4kCountrydelete.success === true){
        toast.success('Country deleted successfully',{
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        });


      }
      else{
        toast.error("Faild to delete country",{
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
          });
      }
    } catch (error) {
      toast.error('Error deleting country',{
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
    });
    }
  }
  setShowConfirmCountry(false);
};
const handleEndEdit = (e) => {
  console.log('fdg', e.detail.data)
 // e.preventDefault();
  const editedCountry = e.detail.data;
  console.log("edit", editedCountry);
  editedCountry.companyid = companyId;
  if(editedCountry.countryid != ''){
    handleCountryUpdate(editedCountry);
  }
  else{
    handleCountryCreate(editedCountry);
  }


};

const [isMaximizedCountryTable,setisMaximizedCountryTable]= useState(false);
const modalDialogClassName= isMaximizedCountry ? 'modal-content modal-fullscreen' : 'modal-content medium-popup';

const toggleMaximizeCountry = () => {
  setisMaximizedCountry(!isMaximizedCountry);
};

const CountryDragable = ({ isMaximizedCountryMasterTable, children }) => (
  isMaximizedCountryMasterTable ? children : <Draggable handle=".e4kmodal-headercountry">{children}</Draggable>
);   

const handleMinimizedcountry = ()=>{
  setisMaximizedCountryTable(!isMaximizedCountryTable);
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
const heightPercentage = 75; // 30% of screen height

const resizableWidth = (screenSize.width * widthPercentage) / 100;
const resizableHeight = (screenSize.height * heightPercentage) / 100;




return (
  <>

   <CountryDragable isMaximizedCountryMasterTable = {isMaximizedCountryTable}>
    <div className={`modal fade mymodal ${(isMaximizedCountryTable === true) ? 'min min-subpopup-footerbar' : 'in'}`} style={{ display: showModalMediumCountry ? 'block' : 'none' }}>
    <ResizableBox width={resizableWidth} height={resizableHeight} className={modalDialogClassName}>
      {/* <div className={isMaximizedCountry ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup'}> */}
        <div className="modal-content-min medium-popup-div">
          <div className="modal-body">
            <div className="breadcomb-area e4kmodal-headers e4kmodal-headercountry">
              <div className="container-fluid remove-padding">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="breadcomb-list">
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <div className='popup-topbar-title'>
                         Country
                        </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div className='popup-top-rightdiv'>
                          <button className="close modalMinimize" onClick={handleMinimizedcountry}>
                                <i className={`fa ${isMaximizedCountryTable ? 'fa-plus' : 'fa-minus'}`}></i>
                        </button>
                            <button type="button" className="btn-link" onClick={toggleMaximizeCountry}>
                                 {isMaximizedCountry ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                            </button>
                            <button type="button" className="close" onClick={handleCloseMediumCountry}>
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
                    <div className="customer-newbold">Country</div>
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
                        id="E4ktblCountrygrididmaster"
                        onEndEdit={handleEndEdit}
                        header={header}
                        dataSource={dataGridCountry}
                        filtering={filtering}
                        columns={columns}
                        behavior={behavior}
                        paging={paging}
                        pager={pager}
                        sorting={sorting}
                        selection={selection}
                        dataSourceSettings={dataSourceSettings}
                        editing={editing}
                        appearance={appearance}
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
    </CountryDragable>
    {showConfirmCountry && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header justify-content-center modal-header-error">
                                    <div class="icon-box">
                                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmCountry(false)}>&times;</button>
                            </div>

                                <div class="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmCountry(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmedCountry}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
  </>
);
});

export default E4kCountryGrid;

