import { useState,useEffect,useRef } from 'react';
import { Input } from 'smart-webcomponents-react/input';
import { useSelector,useDispatch} from 'react-redux';
import {useSearchProductidQuery,
    useDuplicateTblProductMutation,
  } from '../../store/services/e4kTblProduct';
import { toast } from 'react-toastify';
import {setSelectProduct} from '../../store/slices/e4kTblProductSelectSlice';


const E4kTblProductProductDuplicate = ({ showModalMediumNewProductDuplicate, handleCloseMediumNewProductDuplicate }) => {
  const [isMaximizedNewProductDuplicate, setIsMaximizedNewProductDuplicate] = useState(false);
  const inputRefNewProductIDDuplicate = useRef()
  const [productidDuplicate, setProductidDuplicate] = useState('')
  const [isNewProductDuplicate, setIsNewProductDuplicate] = useState(false)
  const dispatch_newDuplicate = useDispatch()
  const CompanyProductDuplicate = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyid, setCompanyid] = useState(CompanyProductDuplicate);

  const SourceProductSelect = useSelector((state) => state.selectProduct.selectProduct);
  




///////////// Search Product id
    const { data: searchiddataDuplicate, 
        error: searchiderrorDuplicate, 
        isLoading: searchidloadingDuplicate,
        isError: searchidiserrorDuplicate,
        } = useSearchProductidQuery({ companyid:companyid, productid:productidDuplicate });

  //////////////// Create Product
  const [createProductNewDuplicate, { isLoading: isCreatingDuplicate }] =  useDuplicateTblProductMutation();



///////////////////// New product use effect
useEffect(() => {
    if (searchiddataDuplicate && (productidDuplicate !=="")) {
      if(searchiddataDuplicate.e4kTblproductProductSearch==="Success"){
        console.log('New Product')
        setIsNewProductDuplicate(true)
        
        // handleNewProductCreateDuplicate({
        //   companyid:companyid,
        //   sourceProductid:SourceProductSelect?.productid ? SourceProductSelect.productid : '',
        //   targetProductid: productidDuplicate,
          
        // })

      }else{
        if (searchiddataDuplicate.e4kTblproductProductSearch==="Failed"){
        setIsNewProductDuplicate(false)
      }}
    }
  }, [searchidloadingDuplicate, searchiddataDuplicate]);

  const toggleMaximizeNewProductDuplicate = () => {
    setIsMaximizedNewProductDuplicate(!isMaximizedNewProductDuplicate);
  };



  //////////// Create new product api call
  /////////////////////////////////////// Create new Product
const handleNewProductCreateDuplicate = async (product1) => {
    try {
        const result = await createProductNewDuplicate(product1);
        if (result.error) {
            console.error('Mutation Error:', result.error);
        } else {
            //console.log('Mutation Success:', result.data);
            if(result.data.E4kTblproductCopyExistingProduct.success === "Success"){
                //console.log('######################asdas',product1)
                //  dispatch_new(setSelectProduct(product1))
                setIsNewProductDuplicate(false)
                toast.success( 'Duplicated Successfully',{
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                });
                handleCloseMediumNewProductDuplicate({
                        "productid": product1.targetProductid,
                        "description": SourceProductSelect.description,
                        "category1id": SourceProductSelect.category1id,
                        "category2id": SourceProductSelect.category2id,
                        "category3id": SourceProductSelect.category3id,
                        "classid": SourceProductSelect.classid,
                        "commodityCode": SourceProductSelect.commodityCode,
                        "Nominal": SourceProductSelect.Nominal,
                        "obsoleteClass": SourceProductSelect.obsoleteClass,
                        "issueuom": SourceProductSelect.issueuom,
                        "StockingUOM": SourceProductSelect.StockingUOM,
                        "stockingtype": SourceProductSelect.stockingtype,
                        "weight": SourceProductSelect.weight,
                        "supplimentaryunits": SourceProductSelect.supplimentaryunits,
                        "notes": SourceProductSelect.notes,
                        "live": SourceProductSelect.live,
                        "batchcontrol": SourceProductSelect.batchcontrol,
                        "styleimage": SourceProductSelect.styleimage,
                        "country": SourceProductSelect.country
                    }
                    
                  )
                
            }else{
                toast.error( result.data.E4kTblproductCopyExistingProduct.success,{
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

  ///////////////////////////

  const handleCreateNewProductDuplicate =() => {
    
    const productid1 = inputRefNewProductIDDuplicate.current.value

    if (isNewProductDuplicate === true && productid1 !==''){
      handleNewProductCreateDuplicate({
        companyid:companyid,
        sourceProductid:SourceProductSelect?.productid ? SourceProductSelect.productid : '',
        targetProductid: productidDuplicate,
        
      })
    }
    //setProductidDuplicate(productid1)



  }

  const  handleOnchangeEventDuplicateProduct =(event) => {
    const productid1 = inputRefNewProductIDDuplicate.current.value
    setProductidDuplicate(productid1)



  }

 

 const modalDialogclassNameNewProductDuplicate = isMaximizedNewProductDuplicate ? 'modal-dialog modal-fullscreen' : 'modal-dialog small-popup';


  

  return (
    <>
    <div className={`modal fade ${showModalMediumNewProductDuplicate ? 'in' : ''}`} style={{ display: showModalMediumNewProductDuplicate ? 'block' : 'none' }}>
        <div className={modalDialogclassNameNewProductDuplicate}>
          {/* <div className="modal-dialog medium-popup"> */}
          <div className="modal-content small-popup-div">
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
                              <button type="button" className="btn-link" onClick={toggleMaximizeNewProductDuplicate}>
                                {isMaximizedNewProductDuplicate ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i>}
                              </button>
                              <button type="button" className="close" onClick={() => handleCloseMediumNewProductDuplicate()}>
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
                      <div className="customer-newbold">Duplicate the Product - {SourceProductSelect.productid}</div>
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
                        <span>New Product ID</span>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                      <div className="form-group">
                        <Input
                          ref={inputRefNewProductIDDuplicate}
                          placeholder="Enter Product ID"
                          onChange={(e) => handleOnchangeEventDuplicateProduct(e)}
                          value={isNewProductDuplicate ? productidDuplicate : ''}
                          
                        >
                        </Input>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <button style={{ display: (productidDuplicate !== '' && isNewProductDuplicate === true) ? 'inline-block' : "none" }} className="btn alter-button" data-dismiss="modal" onClick={() => handleCreateNewProductDuplicate()}>
                        <span>Duplicate</span>
                      </button>

                      <div className="" style={{ display: (productidDuplicate !== '' && !isNewProductDuplicate) ? 'inline-block' : "none" }}>
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

export default E4kTblProductProductDuplicate;