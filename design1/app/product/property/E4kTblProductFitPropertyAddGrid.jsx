

import { Smart, Grid } from 'smart-webcomponents-react/grid';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import {
  addSelectProductPropertyFit,
  removeSelectProductPropertyFit,
  resetSelectProductPropertyFit
} from '../../store/slices/e4kTblProductPropertyFItSelect';
// import {useGetProductPropertiesValuesSelectQuery,
//   useCreateProductPropertiesValuesMutation,
//   useUpdateProductPropertiesValuesMutation,
//   useDeleteProductPropertiesValuesMutation,
// } from '../../store/services/e4kTblProductPropertiesValuesSelectAPI';

import {
  useGetProductPropertiesValuesSelectlevelQuery,
    useCreateProductPropertiesValueslevelMutation,
    useUpdateProductPropertiesValueslevelMutation,
    useDeleteProductPropertiesValueslevelMutation,
} from '../../store/services/e4kTblProductProductPropertyLevelAPI';

import {
  useGetProductFitsQuery,
} from '../../store/services/e4kTblProductFits';


const E4kTblProductFitPropertyValueAddGrid = () => {
  const ProductAddPropertyFit = useSelector(
    (state) => state.selectProductAddPropertyFit.selectProductPropertyFit
  );
  const gridPropertyValueFit = useRef(null);
  const [dataselectFit, setDataSelectFit] = useState([]);
  const [dataGridAllFit, setDataGridAllFit] = useState([]);

  const ProductidSelectF = useSelector((state) => state.selectProduct.selectProduct);
  const [dataGridPropertiesFitSelect, setDataGridPropertiesFitSelect] = useState([]);

  const CompanyProductFitPropertyADD = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyid, setCompanyid] = useState('');
  const [propertyid, setPropertyid] = useState(3);
  const gridProductPropertiesFitSelect = useRef();



  useEffect(() => {
    if (CompanyProductFitPropertyADD) {
      setCompanyid(CompanyProductFitPropertyADD);
    }
  }, [CompanyProductFitPropertyADD]);

  const skipQuery = !ProductidSelectF?.productid?.trim();


  const {
    data: ProductSelectPropertiesFitData,
    error: selectFitError,
    isLoading: selectFitisLoading,
    isError: selectFitisError
  } = useGetProductPropertiesValuesSelectlevelQuery({
    companyid: companyid,
    productid: ProductidSelectF.productid,
    propertyid: propertyid
  },{skip:skipQuery});


  // const {
  //   data: ProductSelectPropertiesFitData,
  //   error: selectFitError,
  //   isLoading: selectFitisLoading,
  //   isError: selectFitisError
  // } = useGetProductPropertiesValuesSelectlevelQuery({
  //   companyid: companyid,
  //   productid: ProductidSelectF.productid,
  //   propertyid: propertyid
  // },{skip:(ProductidSelectF.productid === '') ? true:false});



  /////////// Property fit data
  const { data:ProductAllFitData, 
    error:ProductAllFitError, 
    isLoading:ProductAllFitisLoading, 
    isError:ProductAllFitisError } = useGetProductFitsQuery({companyid:companyid},{skip:(companyid === '') ? true: false});  

  //////////////pop up delete
const [showConfirmFitProperties, setShowConfirmFitProperties] = useState(false);
const [recordToDeleteFitProperties, setRecordToDeleteFitProperties] = useState(null);

  /////////////// Create and delete product properties API
  const [createProductFitProperties, { isLoading: isCreatingProductFitProperties }] = useCreateProductPropertiesValueslevelMutation();
  const [updateProductFitProperties, { isLoading: isUpdatingProductFitProperties }] = useUpdateProductPropertiesValueslevelMutation();
  const [deleteProductFitProperties, { isLoading: isDeletingProductFitProperties }] = useDeleteProductPropertiesValueslevelMutation();
  


  const dispatch_Property = useDispatch();


///////////////// Fit all
useEffect(() => {
  if (ProductAllFitData) {
      const datagridFit = ProductAllFitData.e4kTblproductProductFits.map((category, index) => ({
        fitid: category.fitid,
        description: category.description,
        
    }));
    setDataGridAllFit(datagridFit);
      
  }
}, [ProductAllFitisLoading, ProductAllFitData]);



  useEffect(() => {
    if (ProductSelectPropertiesFitData && ProductSelectPropertiesFitData.e4kTblproductProductPropertyValues) {

      const response = ProductSelectPropertiesFitData.e4kTblproductProductPropertyValues[0];
      const responseKeys = Object.keys(response);

      if (responseKeys.includes('message')) {
      
        setDataSelectFit([]);
      } else if (responseKeys.includes('productPropValue')) {
        transformDataProductFitSelect();
      }


      
    }
  }, [ProductSelectPropertiesFitData]);

  useEffect(() => {
    dispatch_Property(resetSelectProductPropertyFit());
    setDataGridPropertiesFitSelect([]);
    setDataSelectFit([]);
    setShowConfirmFitProperties(false)
    setRecordToDeleteFitProperties(null);    

  }, [dispatch_Property]);

  useEffect(() => {
    return () => {
    dispatch_Property(resetSelectProductPropertyFit());
    setDataGridPropertiesFitSelect([]);
    setDataSelectFit([]);
    setShowConfirmFitProperties(false)
    setRecordToDeleteFitProperties(null);    
    };
  }, [dispatch_Property]);






  const transformDataProductFitSelect = () => {
    if (!ProductSelectPropertiesFitData) return [];

    if (ProductSelectPropertiesFitData.e4kTblproductProductPropertyValues) {
      const datagrid1 = ProductSelectPropertiesFitData.e4kTblproductProductPropertyValues.map((category) => {
        const fitids = dataGridAllFit.find(prop => prop.description === category.productPropValue)
          if (fitids){
            dispatch_Property(addSelectProductPropertyFit({
              fitid: fitids.fitid,
              description: category.productPropValue,
            }));
    
          }
          return {
            description: category.productPropValue,
          };
        });
    
    
        setDataSelectFit(datagrid1);

    } else {
      setDataSelectFit([]);
    }



    // const datagrid1 = ProductSelectPropertiesFitData.e4kTblproductProductPropertyValues.map((category) => {
    // const fitids = dataGridAllFit.find(prop => prop.description === category.productPropValue)
    //   if (fitids){
    //     dispatch_Property(addSelectProductPropertyFit({
    //       fitid: fitids.fitid,
    //       description: category.productPropValue,
    //     }));

    //   }
    //   return {
    //     description: category.productPropValue,
    //   };
    // });


    // setDataSelectFit(datagrid1);
  };





  const findExtraFitProperties = () => {
    if (!ProductAddPropertyFit || !ProductSelectPropertiesFitData) return;
  
    const productSelectPropertyIds = ProductSelectPropertiesFitData.e4kTblproductProductPropertyValues.map(prop => prop.productPropValue);
    ProductAddPropertyFit.forEach(prop => {
      if (!productSelectPropertyIds.includes(prop.description)) {
        let newProperty = {
          companyid: companyid,
          productid: ProductidSelectF.productid,
          propertyid: propertyid,
          productPropValue: prop.description,
        };
        
        handleProductFitPropertiesCreate(newProperty);
      }
    });
  };


  useEffect(() => {
    // if (ProductAddPropertyFit && Array.isArray(ProductAddPropertyFit)) {
    //   const Data = ProductAddPropertyFit.map(prop => ({
    //     description: prop.description || ''
    //   })).filter(item => item.description);
    //   setDataSelectFit(Data);
    // }

    if (ProductAddPropertyFit) {
      const Data = ProductAddPropertyFit.map((prop) => ({
        description: prop.description,
      }));

      if (ProductSelectPropertiesFitData && ProductSelectPropertiesFitData.e4kTblproductProductPropertyValues) {
        findExtraFitProperties();
      }else{
        ProductAddPropertyFit.forEach(prop => {
          let newProperty = {
            companyid: companyid,
            productid: ProductidSelectF.productid,
            propertyid: propertyid,
            productPropValue: prop.description,
          };
          
          handleProductFitPropertiesCreate(newProperty);

        })
      }
      

      
      setDataSelectFit(Data);
    }




  }, [ProductAddPropertyFit]);

  useEffect(() => {
    window.commandColumnCustomCommandPropertyFitValuesAdd = function (row) {
      //console.log("Successfully selected", row.data);
      if (ProductAddPropertyFit) {
        
          let deletedata = {
            companyid: companyid,
            productid:ProductidSelectF.productid,
            propertyid: propertyid,
            productPropValue:row.data.description
          }
          setRecordToDeleteFitProperties(deletedata);
          setShowConfirmFitProperties(true);

        
      }
    };
  }, [ProductAddPropertyFit,ProductSelectPropertiesFitData]);

  const sorting = {
    enabled: true
  };
  const dataSourceSettingsAddFit = {
    dataFields: [
      'description: string',
    ]
  };

  // const dataSourceFit = useMemo(() => new Smart.DataAdapter({
  //   dataSource: dataselectFit,
  //   dataFields: [
  //     'description: string',
  //   ],
  // }), [dataselectFit]);

  //const dataSourceProductFitSelect = useMemo(() => dataGridPropertiesFitSelect, [dataGridPropertiesFitSelect]);

  const dataSourceFit = useMemo(() => dataselectFit, [dataselectFit]);

  const behavior = {
    allowRowReorder: true
  };
  const filtering = {
    enabled: true,
    filterRow: {
      visible: true,
    },
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
    showRowHeaderDragIcon: true
  };
  
  const appearance1 = {
    showRowHeader: true,
    showRowHeaderDragIcon: true
  };


  const editing = {
    enabled: true,
    mode: 'row',
    
    commandColumn: {
      visible: true,
      dataSource: {
        'commandColumnDelete': { visible: false },
        'commandColumnEdit': { visible: false },
        'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommandPropertyFitValuesAdd', visible: true, label: '' },
      },
    },
  };

  const columnsColour = [
    {
      label: 'Fit Values',
      dataField: 'description',
    }
  ];


   /////////////// Product Properties Fit create
   const handleProductFitPropertiesCreate = async (category) => {
    try {
      const result = await createProductFitProperties(category);
      if (result.error) {
        console.error('Mutation Error:', result.error);
      } else {
        console.log('Mutation Success:', result.data);
        if (result.data.E4kTblproductProductpropertiesValuesCreate.createPropertyValues === "Success") {
          toast.success('Attribute Values Saved Successfully', {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
          });
          
        } else {
          toast.error(result.data.E4kTblproductProductpropertiesValuesCreate.createPropertyValues, { position: "top-center" });
        }
      }
    } catch (error) {
      console.error('Mutation Error:', error);
    }
  };



//////////////////////////////////////////pop up delete 
const handleConfirmFitPropertiesDelete = async () => {
  setShowConfirmFitProperties(false);
  if (recordToDeleteFitProperties) {
      try {
          const result = await deleteProductFitProperties(recordToDeleteFitProperties);
          if (result.error) {
              console.error('Mutation Error:', result.error);
          } else {
              if (result.data.E4kTblproductProductpropertiesValuesDelete.deletePropertyValues === "Success") {
                toast.success('Attribute Value Deleted Successfully', {
                  position: "top-center",
                  autoClose: 500,
                  hideProgressBar: true,
                });
                //const colurid = dataGridAllFit.find(prop => prop.description === recordToDeleteFitProperties.productPropValue)
                dispatch_Property(removeSelectProductFitColour({ description: recordToDeleteFitProperties.productPropValue }));
              } else {
                  toast.error(result.data.E4kTblproductProductpropertiesValuesDelete.deletePropertyValues,{position: "top-center",autoClose: 3000});
          }
          }
      } catch (error) {
          console.error('Mutation Error:', error);
      }
  }
};



  const handlePropertyValuesGridChange = (event) => {
    //console.log('Row data:', event.detail.data.description);

    dispatch_Property(addSelectProductPropertyFit({
      fitid: event.detail.data.description,
      description: event.detail.data.description,
    }));
  };

  return (
    <>
      <Grid
        id={ProductidSelectF.productid ? "E4kTblProductPropertyValueGridSizeSelect" : "E4kTblProductPropertyValueGridSize"}
        onEndEdit={handlePropertyValuesGridChange}
        ref={ProductidSelectF.productid ? gridProductPropertiesFitSelect : gridPropertyValueFit}
        dataSource={dataSourceFit}
        sorting={sorting}
        behavior={behavior}
        appearance={appearance}
        columns={columnsColour}
        filtering={filtering}
        editing={editing}
      />


    {/* <<<<<<<<<<<<Pop up code >>>>>>>>>                         */}
    {showConfirmFitProperties && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmFitProperties(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmFitProperties(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmFitPropertiesDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}

    </>
  )
}

export default E4kTblProductFitPropertyValueAddGrid;

