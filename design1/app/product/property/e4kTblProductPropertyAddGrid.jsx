
import { Grid } from 'smart-webcomponents-react/grid';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';


import { useGetProductPropertieslevelQuery,
  useCreateProductPropertieslevelMutation,
  useUpdateProductPropertieslevelMutation,
  useDeleteProductPropertieslevelMutation} from '../../store/services/e4kTblProductProductPropertyLevelAPI';

  import { addSelectProductProperty, 
  removeSelectProductProperty,
  resetSelectProductProperty ,
  setSelectProductAddProperty
} from '../../store/slices/e4kTblProductPropertyAddSelect';


import { 
  removeSelectProductPropertyTypesValues, 
  resetSelectProductPropertyTypesValues

} from '../../store/slices/e4kTblProductProductPropertyTypeValues';

const E4kTblProductPropertyAddGrid = () => {
  const ProductAddProperty = useSelector((state) => state.selectProductAddProperty.selectProductProperty);
  const ProductidSelect = useSelector((state) => state.selectProduct.selectProduct);


  const skip = !ProductidSelect.productid || ProductidSelect.productid.trim() === '';


  const [dataGridPropertiesSelect, setDataGridPropertiesSelect] = useState([]);
  const [dataselect, setDataSelect] = useState([]);
  const gridProductPropertiesSelect = useRef();
  const addpropertynewgridref = useRef(null);
  const [newSeqNo, setSeqNo] = useState([0]);
  const CompanyProductPropertyAdd = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyid, setCompanyid] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (CompanyProductPropertyAdd) {
      setCompanyid(CompanyProductPropertyAdd);
    }
  }, [CompanyProductPropertyAdd]);

  const skipQuery = !ProductidSelect?.productid?.trim();



  const { data: ProductSelectPropertiesData,
    isLoading:ProductSelectPropertiesDataisLoading, 
   } = useGetProductPropertieslevelQuery({
    companyid: companyid,
    productid: ProductidSelect.productid,
    propertyid: null,
  },{skip:skipQuery});


  // const { data: ProductSelectPropertiesData,
  //   isLoading:ProductSelectPropertiesDataisLoading, 
  //  } = useGetProductPropertieslevelQuery({
  //   companyid: companyid,
  //   productid: ProductidSelect.productid,
  //   propertyid: null,
  // },{skip:(ProductidSelect.productid === '') ? true:false});

  //////////////pop up delete
  const [showConfirmProperties, setShowConfirmProperties] = useState(false);
  const [recordToDeleteProperties, setRecordToDeleteProperties] = useState(null);

  /////////////// Create and delete product properties API
  const [createProductProperties, { isLoading: isCreatingProductProperties }] = useCreateProductPropertieslevelMutation();
  const [deleteProductProperties, { isLoading: isDeletingProductProperties }] = useDeleteProductPropertieslevelMutation();
  const [updateProductProperties, { isLoading: isUpdatingProductProperties }] = useUpdateProductPropertieslevelMutation();

  useEffect(() => {
    if (ProductSelectPropertiesData) {
      const transformDataProductSelect = () => {
        if (!ProductSelectPropertiesData) return;
        const datagrid = ProductSelectPropertiesData.e4kTblproductProductProperties.map((category) => {
        
          
          dispatch(addSelectProductProperty({
            propertyid: category.propertyid.propertyid,
            description: category.propertyid.description,
            isstatic: category.propertyid.isstatic,
          }));
          setSeqNo(category.seqno);
          return {
            description: category.propertyid.description,
          };
        });
    
        setDataSelect(datagrid);
      };

      if (ProductidSelect.productid !==''  && ProductSelectPropertiesData.e4kTblproductProductProperties.length > 0){

        //console.log('******************************************',ProductSelectPropertiesData)

            const response = ProductSelectPropertiesData.e4kTblproductProductProperties[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
              setDataSelect([]);
            } else if (responseKeys.includes('propertyid')) {
              transformDataProductSelect();
            }



        
      }

      
    }
  }, [ProductSelectPropertiesData]);

  

  const findExtraProperties = () => {
    if (!ProductAddProperty || !ProductSelectPropertiesData) return;

    const productSelectPropertyIds = ProductSelectPropertiesData.e4kTblproductProductProperties.map(prop => prop.propertyid.propertyid);
    ProductAddProperty.forEach(prop => {
      if (!productSelectPropertyIds.includes(prop.propertyid)) {
        //console.log(`Extra propertyid found: ${prop.propertyid} - `, prop.description, 'new seq no :', newSeqNo + 1);
        let newProperty = {
          companyid: companyid,
          productid: ProductidSelect.productid,
          propertyid: prop.propertyid,
          seqNo: Number(newSeqNo + 1),
        };
        handleProductPropertiesCreate(newProperty);
      }
    });
  };

  useEffect(() => {

    if (ProductidSelect.productid !==''){
      
      if (ProductAddProperty) {
        const Data = ProductAddProperty.map((prop) => ({
          description: prop.description,
        }));
  
        if (ProductSelectPropertiesData && ProductSelectPropertiesData.e4kTblproductProductProperties) {
          findExtraProperties();
        }
  
        
        setDataSelect(Data);
      }


    }else{
      if (ProductAddProperty) {
        const Data = ProductAddProperty.map((prop) => ({
          description: prop.description,
        }));
  
        
        setDataSelect(Data);
      }
    }


    
  }, [ProductAddProperty]);

  useEffect(() => {
    dispatch(resetSelectProductProperty());
    setDataGridPropertiesSelect([]);
    setDataSelect([]);
    setSeqNo(0);
    setShowConfirmProperties(false)
    setRecordToDeleteProperties(null);
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetSelectProductProperty());
      setDataGridPropertiesSelect([]);
      setDataSelect([]);
      setSeqNo(0)
      setShowConfirmProperties(false)
      setRecordToDeleteProperties(null);
    };
  }, [dispatch]);

  ///////////// Editing Grid 
  useEffect(() => {
    window.commandColumnCustomCommandPropertiesDeleteGrid = function (row) {
    

      if (ProductAddProperty) {
        const propid = ProductAddProperty.find(prop => prop.description === row.data.description);
        if (propid) {
          const productSelectPropertydelete = ProductSelectPropertiesData.e4kTblproductProductProperties.find(prop => prop.propertyid.propertyid === propid.propertyid);
          let deletedata = {
            companyid: companyid,
            productid:ProductidSelect.productid,
            propertyid: propid.propertyid,
            productPropId:Number(productSelectPropertydelete.productPropid)
          }
          setRecordToDeleteProperties(deletedata);
          setShowConfirmProperties(true);

        } else {
          console.error('Property id not found for description:', row.data.description);
        }
      }
    };
  }, [ProductAddProperty,ProductSelectPropertiesData]);

  const sorting = { enabled: true };
  const dataSource12 = useMemo(() => dataselect, [dataselect]);

  const behavior = { allowRowReorder: true };
  const filtering = {
    enabled: true,
    filterRow: { visible: true },
  };

  // const appearance = {
  //   alternationCount: 2,
  //   alternationStart: -1,
  //   showRowHeader: true,
  //   showRowHeaderSelectIcon: true,
  //   showRowHeaderFocusIcon: true,
  //   showRowHeaderEditIcon: true,
  //   autoShowColumnFilterButton: false,
  //   showColumnLines: true,
  //   showRowLines: false,
  //   showRowHeaderDragIcon: true,
  // };
  const appearance1 = {
		showRowHeader: true,
		showRowHeaderDragIcon: true,
    // autoShowColumnFilterButton: false,
	};

  const columns = [
    { label: 'Properties', dataField: 'description' ,allowEdit: false },
  ];

  //////////////// Editing
  const editing = {
    enabled: true,
    mode: 'row',
    commandColumn: {
      visible: true,
      dataSource: {
        'commandColumnDelete': { visible: false },
        'commandColumnEdit': { visible: false },
        'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommandPropertiesDeleteGrid', visible: true, label: '' },
      },
    },
  };

  /////////////// Product Properties create
  const handleProductPropertiesCreate = async (category) => {
    try {
      const result = await createProductProperties(category);
      if (result.error) {
        console.error('Mutation Error:', result.error);
      } else {
        console.log('Mutation Success:', result.data);
        if (result.data.E4kTblproductProductpropertiesCreate.productProperties === "Success") {
          toast.success('Attribute Saved Successfully', {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
          });
          
        } else {
          toast.error(result.data.E4kTblproductProductpropertiesCreate.productProperties, { position: "top-center" });
        }
      }
    } catch (error) {
      console.error('Mutation Error:', error);
    }
  };


  //////////////////////////////////////////pop up delete 
  const handleConfirmPropertiesDelete = async () => {
    setShowConfirmProperties(false);
    if (recordToDeleteProperties) {
        try {
            const result = await deleteProductProperties(recordToDeleteProperties);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                if (result.data.E4kTblproductProductpropertiesDelete.deleteProperties === "Success") {
                  toast.success('Attribute Deleted Successfully', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                  });
                  setSeqNo(newSeqNo - 1)
                  const productSelectPropertydelete = ProductSelectPropertiesData.e4kTblproductProductProperties.find(prop => prop.propertyid.propertyid === recordToDeleteProperties.propertyid);

                  dispatch(removeSelectProductProperty({ propertyid: recordToDeleteProperties.propertyid }));
                  dispatch(resetSelectProductPropertyTypesValues());
           
                } else {
                    toast.error(result.data.E4kTblproductProductpropertiesDelete.deleteProperties,{position: "top-center",autoClose: 3000});
            }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    }
};
////////////////////////////Update Product Properties
const handleProductPropertiesUpdate = async (category) => {
          try {
              const result = await updateProductProperties(category);
              if (result.error) {
                  console.error('Mutation Error:', result.error);
              } else {
                  console.log('Mutation Success:', result.data);
                  if(result.data.E4kTblproductProductpropertiesUpdate.UpdateProperty === "Success"){
                      toast.success('Attribute Updated Successfully', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                      });
                      dispatch(resetSelectProductProperty())
                  }else{
                      toast.error(result.data.E4kTblproductProductpropertiesUpdate.UpdateProperty,{position: "top-center"});
                  }
              }
          } catch (error) {
              console.error('Mutation Error:', error);
          }
      };


///////////////////////// handle Row Dragging
const handProductPropertiesRowDragEnd =(ev) => {
          let old_row = ev.detail.index+1;
          let new_row = ev.detail.newIndex+1;
          const data1 = ev.detail.row.data
          data1.companyid = companyid
  

          const propid = ProductAddProperty.find(prop => prop.description === data1.description);
          if (new_row && data1){
              //console.log("Data for update = ",data1)
              let UpdateData = {
          
                  companyid: data1.companyid,
                  productid : ProductidSelect.productid,
                  propertyid:propid.propertyid,
                  newSeqNo:Number(new_row),
                  
                          
                }
              handleProductPropertiesUpdate(UpdateData);
              dispatch(resetSelectProductProperty())
              
          }
  
  
      }

  return (
    <>
    
      <Grid
        id={ProductidSelect.productid ? "E4kTblProductPropertiesproductSelectGrid" : "E4kTblProductPropertiesAddingGrid"}
        ref={ProductidSelect.productid ? gridProductPropertiesSelect : addpropertynewgridref}
        //dataSource={ProductidSelect.productid ? dataSource12 : [{}]}
        dataSource={dataSource12}
        sorting={sorting}
        behavior={behavior}
        appearance={appearance1}
        columns={columns}
        filtering={filtering}
        editing={editing}
        onRowDragEnd = {handProductPropertiesRowDragEnd}
      />

       {/* <<<<<<<<<<<<Pop up code >>>>>>>>>                         */}
       {showConfirmProperties && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmProperties(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmProperties(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmPropertiesDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
    </>
  );
};

export default E4kTblProductPropertyAddGrid;




