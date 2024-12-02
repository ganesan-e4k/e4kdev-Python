// "use client";
"use client";
import { useState,useEffect,useRef } from 'react';
import { Input } from 'smart-webcomponents-react/input';
import { useDispatch, useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import { useSearchSupplierbusinessidQuery,useCreateSupplierMutation } from '../../store/services/Supplier/e4kTblSupplierlist';

const E4kcreateNewSupplier = ({ showcreatenewSupplier, handleClosecreatenewSupplier }) => {
  const [isMaximizedNewProduct, setIsMaximizedNewProduct] = useState(false);
  const inputRefNewbusinessid = useRef()
  const [businessid, setbusinessid] = useState('')
  const [isNewbusinessid, setIsNewbusinessid] = useState(false)
  const supplierCompanyid = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyid, setcompanyid] = useState(supplierCompanyid)


///////////// Search Product id
  const { data: searchCustomerData } = useSearchSupplierbusinessidQuery({ companyid : companyid, businessid: businessid });
  const [createCustomerNew, { isLoading: isCreating }] = useCreateSupplierMutation();

useEffect(() => {
    if (searchCustomerData && (businessid !=="")) {
      console.log("FJJJJJJJJJJJJJJ",searchCustomerData )
      if(searchCustomerData.E4kSearchsupplierbusinessid==="Sucess"){
        console.log("JKKKKKK" ,searchCustomerData )
        setIsNewbusinessid(true);

      }else{
        if (searchCustomerData.E4kSearchsupplierbusinessid==="Failed"){
        //setProductid('')
        setIsNewbusinessid(false);
      }}
    }
  }, [searchCustomerData]);

  const toggleMaximizeNewProduct = () => {
    setIsMaximizedNewProduct(!isMaximizedNewProduct);
  };




  const handlebuttonCreateNewCustomer =() => {
    
    const businessid1 = inputRefNewbusinessid.current.value

    if (isNewbusinessid === true && businessid1 !==''){
      handleNewBusinessidCreate({
        CompanyID:companyid,
        BusinessID:businessid1,
        // vatno: "",
        vatflag: "N",
        // vatcode: 0,
        // paymenttermsid: "",
        // name: "",
        isstop: false,
        islive: false,
        isextract: false,
        // discount: 0,
        // defaultNominal: 0,
        // currencyCode: 1,
        // creditLimit:0,
        // countryid: 0,
        // classid: 0,
        // category3id: 0,
        // category2id: 0,
        // category1id: 0,
        // bankSortCode: "",
        // bankName: "",
        // bankAccountNum: 0,
        // bankAccountName: "",
    })
    }
  
  }

  const handleNewBusinessidCreate = async (businessid1) => {
    try {
        const result = await createCustomerNew(businessid1);
        if (result.data.E4kSupplierandaccountCreate.error) {
            toast.error('Mutation Error:',result.data.E4kSupplierandaccountCreate.error);
        } else {
            if(result.data.E4kSupplierandaccountCreate.success === true){
                toast.success('Supplier Create Successfully!',{position : 'top-center', hideProgressBar : true,autoClose: 500,})
                setIsNewbusinessid(false);
                setbusinessid('')
                handleClosecreatenewSupplier(businessid1);
    


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



 const modalDialogclassNameNewProduct = isMaximizedNewProduct ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';


  

  return (
    <>
    <div className={`modal fade ${showcreatenewSupplier ? 'in' : ''}`} style={{ display: showcreatenewSupplier ? 'block' : 'none' }}>
        <div className={modalDialogclassNameNewProduct}>
          {/* <div className="modal-dialog medium-popup"> */}
          <div className="modal-content medium-popup-div">
            <div className="modal-body">

              {/* <!-- Breadcomb area Start--> */}
              <div className="breadcomb-area">
                <div className="container-fluid remove-padding">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="breadcomb-list">
                        <div className="row">
                          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">

                            <div className='popup-top-rightdiv'>
                              <button type="button" className="btn-link" onClick={toggleMaximizeNewProduct}>
                                {isMaximizedNewProduct ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i>}
                              </button>
                              <button type="button" className="close" onClick={() => handleClosecreatenewSupplier()}>
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
                      <div className="customer-newbold">New Supplier</div>
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
                        <span>Supplier ID</span>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                      <div className="form-group">
                        <Input
                          ref={inputRefNewbusinessid}
                          placeholder="Enter Supplier ID"
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
        </div>

      </div>

    </>
  );
};

export default E4kcreateNewSupplier;