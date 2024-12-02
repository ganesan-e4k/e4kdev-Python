// "use client";

import { useState,useEffect,useRef } from 'react';
import { Input } from 'smart-webcomponents-react/input';
import { useSelector} from 'react-redux';
import {useSearchProductidQuery,
    useCreateProductMutation,
  } from '../../store/services/e4kTblProduct';
import { toast } from 'react-toastify';
// import {setSelectProduct} from '../../store/slices/e4kTblProductSelectSlice';

const E4kNewProductCreate = ({ showModalMediumNewProduct, handleCloseMediumNewProduct }) => {
  const [isMaximizedNewProduct, setIsMaximizedNewProduct] = useState(false);
  const inputRefNewProductID = useRef()
  const [productid, setProductid] = useState('')
  const [isNewProduct, setIsNewProduct] = useState(false)
  // const dispatch_new = useDispatch()
  const CompanyProductNewCreate = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyid, setCompanyid] = useState(CompanyProductNewCreate);
  

///////////// Search Product id
    const { data: searchiddata, 
        error: searchiderror, 
        isLoading: searchidloading,
        isError: searchidiserror,
        } = useSearchProductidQuery({ companyid, productid });

  //////////////// Create Product
  const [createProductNew, { isLoading: isCreating }] = useCreateProductMutation();



///////////////////// New product use effect
useEffect(() => {
    if (searchiddata && (productid !=="")) {
      if(searchiddata.e4kTblproductProductSearch==="Success"){
        setIsNewProduct(true)

      }else{
        if (searchiddata.e4kTblproductProductSearch==="Failed"){
        //setProductid('')
        setIsNewProduct(false)
      }}
    }
  }, [searchidloading, searchiddata]);

  const toggleMaximizeNewProduct = () => {
    setIsMaximizedNewProduct(!isMaximizedNewProduct);
  };



  //////////// Create new product api call
  /////////////////////////////////////// Create new Product
const handleNewProductCreate = async (product1) => {
    try {
        const result = await createProductNew(product1);
        if (result.error) {
            console.error('Mutation Error:', result.error);
        } else {
            //console.log('Mutation Success:', result.data);
            if(result.data.E4kTblproductProductCreate.productId === "Success"){
                setIsNewProduct(false);
                setProductid('')
                handleCloseMediumNewProduct(product1)
                
            }else{
                toast.error('Failed',{position: "top-center"});
            }
        }
    } catch (error) {
        console.error('Mutation Error:', error);
    }
  };

  ///////////////////////////

  // const handleCreateNewProduct =() => {
  //   console.log('new product create button clicked')
  //   const productid1 = inputRefNewProductID.current.value

  //   console.log('productid: ', productid1)
  //   setProductid(productid1)



  // }

  const handlebuttonCreateNewProduct =() => {
    
    const productid1 = inputRefNewProductID.current.value

    if (isNewProduct === true && productid1 !==''){
      handleNewProductCreate({
        companyid:companyid,
        productid:productid,
        description: productid,
        category1id: null,
        category2id:    null,
        category3id: null,
        weight: null,
        supplimentaryunits: '',
        nominalCode: '',
        commodityCode: '',
        notes: '',
        classid: null,
        obsoleteClass: null,
        live: false,
        styleimage: '',
        batchcontrol: false,
        stockinguom:null,
        issueuom:null,
        stockingtype: '',
        countryid: null 
      })
    }
  



  }

  const  handleOnchangeEventNewProduct =(event) => {
    const productid1 = inputRefNewProductID.current.value
    setProductid(productid1)



  }

 const modalDialogclassNameNewProduct = isMaximizedNewProduct ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';


  

  return (
    <>
    <div className={`modal fade ${showModalMediumNewProduct ? 'in' : ''}`} style={{ display: showModalMediumNewProduct ? 'block' : 'none' }}>
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
                              <button type="button" className="close" onClick={() => handleCloseMediumNewProduct()}>
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
                      <div className="customer-newbold">New Product</div>
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
                        <span>Product ID</span>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                      <div className="form-group">
                        <Input
                          ref={inputRefNewProductID}
                          placeholder="Enter Product ID"
                          onChange={(e) => handleOnchangeEventNewProduct(e)}
                          value={isNewProduct ? productid : ''}
                        >
                        </Input>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <button style={{ display: (productid !== '' && isNewProduct === true) ? 'inline-block' : "none" }} className="btn alter-button" data-dismiss="modal" onClick={() => handlebuttonCreateNewProduct()}>
                        <span>Create</span>
                      </button>

                      <div className="" style={{ display: (productid !== '' && !isNewProduct) ? 'inline-block' : "none" }}>
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

export default E4kNewProductCreate;