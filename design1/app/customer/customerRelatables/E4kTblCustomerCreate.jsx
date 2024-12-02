// "use client";
"use client";
import { useState,useEffect,useRef } from 'react';
import { Input } from 'smart-webcomponents-react/input'; 
import { useDispatch, useSelector} from 'react-redux';
// import {setBusinessid} from '../store/slices/CreatedbusinessidSlice';
import { toast } from 'react-toastify';
import { useSearchbusinessidQuery,useCreateCustomerAndAccountMutation } from '../../store/services/Customer/e4kTblCustomer';
// import {useCreateCustomerAndAccountMutation} from '../../store/services/Customer/e4kTblcustomeraccountApi';

// import {useCreateCustomerAccountMutation} from '../store/services/e4kTblcustomeraccountApi';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';




const E4kTblCustomerCreate = ({ showcreatenewCustomer, handleClosecreatenewCustomer }) => {
  // const dispatch = useDispatch();
  const [isMaximizedNewProduct, setIsMaximizedNewProduct] = useState(false);
  const inputRefNewbusinessid = useRef()
  const [businessid, setbusinessid] = useState('')
  const [isNewbusinessid, setIsNewbusinessid] = useState(false)
  const CompanySelectCustomerUpdate = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyid, setCompanyid] = useState(CompanySelectCustomerUpdate);


  const { data: searchCustomerData } = useSearchbusinessidQuery({ companyid : companyid, businessid: businessid });
  const [createCustomerNew, { isLoading: isCreating }] = useCreateCustomerAndAccountMutation();  
  // const [createAccount] = useCreateCustomerAccountMutation();

  // const [createNewAccount] = useCreateCustomerAccountMutation();
 
useEffect(() => {
    if (searchCustomerData && (businessid !=="")) {
      console.log("FJJJJJJJJJJJJJJ",searchCustomerData )
      if(searchCustomerData.E4kBusinessidSearch==="Success"){
        console.log("JKKKKKK" ,searchCustomerData )
        setIsNewbusinessid(true);

      }else{
        if (searchCustomerData.E4kBusinessidSearch==="Failed"){
        //setProductid('')
        setIsNewbusinessid(false);
      }}
    }
  }, [searchCustomerData]);

  const toggleMaximizeNewProduct = () => {
    setIsMaximizedNewProduct(!isMaximizedNewProduct);
  };



  // // //////////////////////


  const handlebuttonCreateNewCustomer = async () => {
    const businessid1 = inputRefNewbusinessid.current.value;
  
    if (isNewbusinessid && businessid1 !== '') {
      
        handleNewBusinessidCreate({
          CompanyID: companyid,
          businessid: businessid1,
          // name: '',
          // category1id: 0,
          // category2id: 0,
          // category3id: 0,
          // classid: 0,
          // countryid: 0,
          // groupid: 0,
          islive: false,
          isextract: false,
          isstop: false,
          // // name: null,
          // defaultNominal: 0,
          // discount: 0, 
          // monthlyForecast :0,
          // repComission :0,
          vatflag : 'N',
          // vatno : '', 
          note:'',
          userid:'ABE01',                                
        });
      }
  

  }
  


const handleNewBusinessidCreate = async (businessid1) => {
    try {
        const result = await createCustomerNew(businessid1);
        console.log("HJJJJJJG",result);
        if (result.data.E4kCustomerandaccountCreate.error) {
            console.error('Mutation Error:', result.error);
        } else {
            //console.log('Mutation Success:', result.data);
            if(result.data.E4kCustomerandaccountCreate.success===true) {
                console.log(" Customer ID created Sucessfully "  )
                toast.success('Created Successfully',{position: "top-center", hideProgressBar: true, autoClose: 5000});
                setIsNewbusinessid(false);
                setbusinessid('')
                handleClosecreatenewCustomer(businessid1);
              
            }else{
                toast.error('Failed',{position: "top-center"});
            }
        }
    } catch (error) {
        console.error('Mutation Error:', error);
    }

  };



  const  handleOnchangeEventNewBusinessId =(event) => {
    const businessid = inputRefNewbusinessid.current.value
    setbusinessid(businessid)



  }



 const modalDialogclassNameNewProduct = isMaximizedNewProduct ? 'modal-content modal-fullscreen' : 'modal-content medium-popup';



 const [isMinimizedCustomerCategory1, setisMinimizedCustomerCategory1]= useState(false);

 
 const CustomerCategory1Dragable = ({ isMinimizedCustomercategory1mastertable, children }) => (
   isMinimizedCustomercategory1mastertable ? children : <Draggable handle=".e4kmodal-headercustomercategory1">{children}</Draggable>

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
 const heightPercentage = 20; // 30% of screen height

 const resizableWidth = (screenSize.width * widthPercentage) / 100;
 const resizableHeight = (screenSize.height * heightPercentage) / 100;
  

  return (
    <>

   <CustomerCategory1Dragable isMinimizedCustomercategory1mastertable={isMinimizedCustomerCategory1}>
    <div className={`modal fade mymodal ${(isMinimizedCustomerCategory1 === true) ? 'min min-subpopup-footerbar' : 'in'}`} style={{ display: showcreatenewCustomer ? 'block' : 'none' }}>
    <ResizableBox width={resizableWidth} height={resizableHeight} className={modalDialogclassNameNewProduct}>

    {/* <div className={`modal fade ${showcreatenewCustomer ? 'in' : ''}`} style={{ display: showcreatenewCustomer ? 'block' : 'none' }}> */}
        {/* <div className={modalDialogclassNameNewProduct}> */}
          {/* <div className="modal-dialog medium-popup"> */}
          <div className="modal-content-min medium-popup-div">
            <div className="modal-body">

              {/* <!-- Breadcomb area Start--> */}
              <div className="breadcomb-area e4kmodal-headercustomercategory1">
                <div className="container-fluid remove-padding">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="breadcomb-list">
                        <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="popup-topbar-title">
                            New Customer
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">

                            <div className='popup-top-rightdiv'>
                            <button className="close modalMinimize" onClick={handleMinimizecustomerCategory1page}>
                                                                        <i className={`fa ${isMinimizedCustomerCategory1 ? 'fa-plus' : 'fa-minus'}`}></i>
                                                                </button>
                              <button type="button" className="btn-link" onClick={toggleMaximizeNewProduct}>
                                {isMaximizedNewProduct ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i>}
                              </button>
                              <button type="button" className="close" onClick={() => handleClosecreatenewCustomer()}>
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
              {/* <!-- Breadcomb area End-->		 */}
              {/* </div> */}

              <div className="breadcomb-area">
                <div className="container-fluid remove-padding">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grid-flex">
                      <div className="customer-newbold">New Customer</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Main Area Start-->	 */}
              <div className="medium-modal-section">
                <div className="container-fluid">

                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                      <div className='input-lable'>
                        <span>Customer ID</span>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                      <div className="form-group">
                        <Input
                          ref={inputRefNewbusinessid}
                          placeholder="Enter Customer ID"
                          onChange={(e) => handleOnchangeEventNewBusinessId(e)}
                          value={isNewbusinessid ? businessid : ''}
                        >
                        </Input>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <button style={{ display: (businessid !== '' && isNewbusinessid === true) ? 'inline-block' : "none" }} className="btn alter-button" data-dismiss="modal" onClick={() => handlebuttonCreateNewCustomer()}>
                        <span>Create</span>
                      </button>

                      <div className="" style={{ display: (businessid !== '' && !isNewbusinessid) ? 'inline-block' : "none" }}>
                        <span className="alert-text">Already Exists...</span>
                      </div>


                    </div>


                  </div>


                </div>
              </div>
              {/* <!-- Main Area End-->	 */}

            </div>
          </div>
          </ResizableBox>
        </div>
     
      {/* </div> */}
      </CustomerCategory1Dragable>

    </>
  );
};

export default E4kTblCustomerCreate;