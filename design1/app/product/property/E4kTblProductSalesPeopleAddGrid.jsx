
import { Grid } from 'smart-webcomponents-react/grid';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';

import { useGetProductProductRepsSelectQuery,
  useCreateProductProductRepsMutation,
  useUpdateProductProductRepsMutation,
  useDeleteProductProductRepsMutation} from '../../store/services/e4kTblProductProductReps';

  import {  addSelectProductSalesPeople, 
    removeSelectProductSalesPeople,
    resetSelectProductSalesPeople
} from '../../store/slices/e4kTblProductSalesPeopleAdd';

const E4kTblProductSalesPeopleAddGrid = () => {
  const ProductAddPropertySalesPeopleAdd = useSelector((state) => state.selectProductSalesPeopleAdd.selectProductSalesPeople);
  const ProductidSelectSalesPeople = useSelector((state) => state.selectProduct.selectProduct);

  const [dataGridSalesPeopleSelect, setDataGridSalesPeopleSelect] = useState([]);
  const [dataSalesPeopleselect, setDataSalesPeopleSelect] = useState([]);
  const gridProductSalesPeopleSelect = useRef();
  const addSalesPeoplenewgridref = useRef(null);
  const [newSeqNo, setSeqNo] = useState([0]);
  const dispatchSalesPeople = useDispatch();
  const CompanyProductSalesPeopleAdd = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyid, setCompanyid] = useState('');

  useEffect(() => {
    if (CompanyProductSalesPeopleAdd) {
      setCompanyid(CompanyProductSalesPeopleAdd);
    }
  }, [CompanyProductSalesPeopleAdd]);

  const skipQuery = !ProductidSelectSalesPeople?.productid?.trim();

 
  const { data: ProductSelectSalesPeopleData,
    isLoading:ProductSelectSalesPeopleDataisLoading, 
   } = useGetProductProductRepsSelectQuery({
    companyid: companyid,
    productid: ProductidSelectSalesPeople.productid,
    repid: null,
  },{skip:skipQuery});

  //////////////pop up delete
  const [showConfirmSalesPeople, setShowConfirmSalesPeople] = useState(false);
  const [recordToDeleteSalesPeople, setRecordToDeleteSalesPeople] = useState(null);

  /////////////// Create and delete product properties API
  const [createProductSalesPeople, { isLoading: isCreatingProductSalesPeople}] = useCreateProductProductRepsMutation();
  const [deleteProductSalesPeople, { isLoading: isDeletingProductSalesPeople }] = useDeleteProductProductRepsMutation();
  const [updateProductSalesPeople, { isLoading: isUpdatingProductSalesPeople}] = useUpdateProductProductRepsMutation();

  useEffect(() => {
    if (ProductSelectSalesPeopleData) {
      const transformDataProductSalesPeopleSelect = () => {
        if (!ProductSelectSalesPeopleData) return;
        
        const datagrid = ProductSelectSalesPeopleData.e4kTblproductProductReps.map((category) => {
            dispatchSalesPeople(addSelectProductSalesPeople({
                repid: category.repid.repid, 
                repkey: category.repid.repkey, 
                forename:category.repid.forename,
                surname:category.repid.surname,
                live: category.repid.live 
          }));
          setSeqNo(category.seqno);
          return {

            repkey: category.repid.repkey,
            repname : category.repid.forename + ' ' + category.repid.surname
          };
        });
    
        setDataSalesPeopleSelect(datagrid);
      };
      if (ProductSelectSalesPeopleData.e4kTblproductProductReps ){
        
        dispatchSalesPeople(resetSelectProductSalesPeople())
        setDataSalesPeopleSelect([]);
      }
      
      if (ProductidSelectSalesPeople.productid !=='' &&  ProductSelectSalesPeopleData.e4kTblproductProductReps.length > 0){
        
        const response = ProductSelectSalesPeopleData.e4kTblproductProductReps[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
              setDataSalesPeopleSelect([]);
            } else if (responseKeys.includes('repid')) {
              transformDataProductSalesPeopleSelect();
            }



       
      }

      
    }
  }, [ProductSelectSalesPeopleData]);

  

  const findExtraProperties = () => {
    if (!ProductAddPropertySalesPeopleAdd || !ProductSelectSalesPeopleData) return;

    const productSelectPropertyIds = ProductSelectSalesPeopleData.e4kTblproductProductReps.map(prop => prop.repid.repkey);
    ProductAddPropertySalesPeopleAdd.forEach(prop => {
      if (!productSelectPropertyIds.includes(prop.repkey)) {
        //console.log(`Extra propertyid found: ${prop.propertyid} - `, prop.description, 'new seq no :', newSeqNo + 1);
        let newSalesPeople = {
          companyid: companyid,
          productid: ProductidSelectSalesPeople.productid,
          repid: prop.repid,
          seqNo: Number(newSeqNo + 1),
        };
        console.log('Extra propertyid found: - new seq no :', newSeqNo + 1,newSalesPeople);
        handleProductSalesPeopleCreate(newSalesPeople);
      }
    });
  };

  useEffect(() => {

    if (ProductidSelectSalesPeople.productid !==''){
      
      if (ProductAddPropertySalesPeopleAdd) {
        const Data = ProductAddPropertySalesPeopleAdd.map((prop) => ({
          repkey: prop.repkey,
          repname: prop.forename + ' ' + prop.surname
        }));
  
        if (ProductSelectSalesPeopleData && ProductSelectSalesPeopleData.e4kTblproductProductReps) {
          findExtraProperties();
        }
  
        
        setDataSalesPeopleSelect(Data);
      }


    }


    
  }, [ProductAddPropertySalesPeopleAdd]);

  useEffect(() => {
    dispatchSalesPeople(resetSelectProductSalesPeople());
    setDataGridSalesPeopleSelect([]);
    setDataSalesPeopleSelect([]);
    setSeqNo(0);
    setShowConfirmSalesPeople(false)
    setRecordToDeleteSalesPeople(null);
  }, [dispatchSalesPeople]);

  useEffect(() => {
    return () => {
        dispatchSalesPeople(resetSelectProductSalesPeople());
        setDataGridSalesPeopleSelect([]);
        setDataSalesPeopleSelect([]);
        setSeqNo(0);
        setShowConfirmSalesPeople(false)
        setRecordToDeleteSalesPeople(null);
    };
  }, [dispatchSalesPeople]);

  ///////////// Editing Grid 
  useEffect(() => {
    window.commandColumnCustomCommandPropertiesSalesPeoplDeleteGrid = function (row) {
    

      if (ProductAddPropertySalesPeopleAdd) {
        const propid = ProductAddPropertySalesPeopleAdd.find(prop => prop.repkey === row.data.repkey);
        if (propid) {
          const productSelectPropertydelete = ProductSelectSalesPeopleData.e4kTblproductProductReps.find(prop => prop.repid.repkey === propid.repkey);
          let deletedata = {
            companyid: companyid,
            productid:ProductidSelectSalesPeople.productid,
            id:Number(productSelectPropertydelete.id)
          }
          setRecordToDeleteSalesPeople(deletedata);
          setShowConfirmSalesPeople(true);

        } else {
          console.error('Property id not found for description:', row.data.description);
        }
      }
    };
  }, [ProductAddPropertySalesPeopleAdd,ProductSelectSalesPeopleData]);

  const sorting = { enabled: true };
  const dataSource12 = useMemo(() => dataSalesPeopleselect, [dataSalesPeopleselect]);

  const behavior = { allowRowReorder: true };
  const filtering = {
    enabled: true,
    filterRow: { visible: true },
  };

  const appearance = {
    alternationCount: 2,
    alternationStart: -1,
    showRowHeader: true,
    showRowHeaderSelectIcon: true,
    showRowHeaderFocusIcon: true,
    showRowHeaderEditIcon: true,
    autoShowColumnFilterButton: false,
    showColumnLines: true,
    showRowLines: false,
    showRowHeaderDragIcon: true,
  };
  const appearance1 = {
		showRowHeader: true,
		showRowHeaderDragIcon: true
	};

  const columns = [
    { label: 'Rep Key', dataField: 'repkey' ,allowEdit: false },
    { label: 'Rep Name', dataField: 'repname' ,allowEdit: false },
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
        'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommandPropertiesSalesPeoplDeleteGrid', visible: true, label: '' },
      },
    },
  };

  /////////////// Product Properties create
  const handleProductSalesPeopleCreate = async (category) => {
    try {
      const result = await createProductSalesPeople(category);
      if (result.error) {
        console.error('Mutation Error:', result.error);
      } else {
        console.log('Mutation Success:', result.data);
        if (result.data.E4kTblproductProductrepsCreate.createProductRep === "Success") {
          toast.success('Product Sales People Assigned Successfully', {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
          });
          
        } else {
          toast.error(result.data.E4kTblproductProductrepsCreate.createProductRep, { position: "top-center" });
        }
      }
    } catch (error) {
      console.error('Mutation Error:', error);
    }
  };


  //////////////////////////////////////////pop up delete 
  const handleConfirmSalesPeopleDelete = async () => {
    setShowConfirmSalesPeople(false);
    if (recordToDeleteSalesPeople) {
        try {
            const result = await deleteProductSalesPeople(recordToDeleteSalesPeople);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                if (result.data.E4kTblproductProductrepsDelete.deleteProductRep === "Success") {
                  toast.success('Product Rep Assign Deleted Successfully', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                  });
                  setSeqNo(newSeqNo - 1)
                  const productSelectPropertydelete = ProductSelectSalesPeopleData.e4kTblproductProductReps.find(prop => prop.id === recordToDeleteSalesPeople.id);
                  dispatchSalesPeople(removeSelectProductSalesPeople({ repkey: productSelectPropertydelete.repkey }));
                
                
                } else {
                    toast.error(result.data.E4kTblproductProductrepsDelete.deleteProductRep,{position: "top-center",autoClose: 3000});
            }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    }
};
////////////////////////////Update Product Properties
const handleProductSalesPeopleUpdate = async (category) => {
          try {
              const result = await updateProductSalesPeople(category);
              if (result.error) {
                  console.error('Mutation Error:', result.error);
              } else {
                  console.log('Mutation Success:', result.data);
                  if(result.data.E4kTblproductProductrepsUpdate.updateProductRep === "Success"){
                      toast.success('Sales People Updated Successfully', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                      });
                  }else{
                      toast.error(result.data.E4kTblproductProductrepsUpdate.updateProductRep,{position: "top-center"});
                  }
              }
          } catch (error) {
              console.error('Mutation Error:', error);
          }
      };


///////////////////////// handle Row Dragging
const handProductSalesPeopleRowDragEnd =(ev) => {
          let old_row = ev.detail.index+1;
          let new_row = ev.detail.newIndex+1;
          const data1 = ev.detail.row.data
          data1.companyid = companyid
  

          const propid = ProductAddPropertySalesPeopleAdd.find(prop => prop.repkey === data1.repkey);
          if (new_row && data1){
              //console.log("Data for update = ",data1)
              let UpdateData = {
          
                  companyid: data1.companyid,
                  productid : ProductidSelectSalesPeople.productid,
                  repid:propid.repid,
                  newSeqNo:Number(new_row),
                          
                }
                handleProductSalesPeopleUpdate(UpdateData);
                dispatchSalesPeople(resetSelectProductSalesPeople())
              
          }
  
  
      }

  return (
    <>
    
      <Grid
        id={ProductidSelectSalesPeople.productid ? "E4kTblProductSalesPeopleproductSelectGrid" : "E4kTblProductSalesPeopleAddingGrid"}
        ref={ProductidSelectSalesPeople.productid ? gridProductSalesPeopleSelect : addSalesPeoplenewgridref}
        dataSource={dataSource12}
        sorting={sorting}
        behavior={behavior}
        appearance={appearance1}
        columns={columns}
        filtering={filtering}
        editing={editing}
        onRowDragEnd = {handProductSalesPeopleRowDragEnd}
      />

       {/* <<<<<<<<<<<<Pop up code >>>>>>>>>                         */}
       {showConfirmSalesPeople && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmSalesPeople(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmSalesPeople(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmSalesPeopleDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
    </>
  );
};

export default E4kTblProductSalesPeopleAddGrid;




