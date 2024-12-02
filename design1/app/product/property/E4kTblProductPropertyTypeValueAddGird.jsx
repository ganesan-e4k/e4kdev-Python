
import { Smart, Grid } from 'smart-webcomponents-react/grid';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import { 
  addSelectProductPropertyTypesValues, 
  removeSelectProductPropertyTypesValues, 
  resetSelectProductPropertyTypesValues 
} from '../../store/slices/e4kTblProductProductPropertyTypeValues';
import { 
  useGetProductPropertiesValuesSelectlevelQuery, 
  useCreateProductPropertiesValueslevelMutation, 
  useUpdateProductPropertiesValueslevelMutation, 
  useDeleteProductPropertiesValueslevelMutation 
} from '../../store/services/e4kTblProductProductPropertyLevelAPI';


import {
  useGetProductPropertyTypesValuesQuery,
} from '../../store/services/e4kTblProductPropertyTypesValues';


const E4kTblProductPropertyTypeValueAddGrid = ({ propdata }) => {
  const [gridData, setGridData] = useState(propdata);
  const ProductAddPropertyTypeValues = useSelector((state) => state.selectProductAddPropertyTypesValues.selectProductPropertyTypeValues);
  const gridPropertyValueColour = useRef(null);
  const [dataselectProperty, setDataSelectProperty] = useState([]);

  const [dataGridAllpropvalue, setDataGridAllpropvalue] = useState([]);

  const ProductidSelectC = useSelector((state) => state.selectProduct.selectProduct);

  const CompanyProductPropertyTypeValue = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyid, setCompanyid] = useState('');
  const [propertyid, setPropertyid] = useState(propdata[0].propid);
  const gridProductPropertiesColourSelect = useRef();
  const dispatch_Property = useDispatch();


  useEffect(() => {
    if (CompanyProductPropertyTypeValue) {
      setCompanyid(CompanyProductPropertyTypeValue);
    }
  }, [CompanyProductPropertyTypeValue]);

  const skipQuery = !ProductidSelectC?.productid?.trim();


  const { data: ProductSelectPropertyValue, error: selectPropertyValueError, isLoading: selectPropertyValueisLoading, isError: selectPropertyValueisError } = useGetProductPropertiesValuesSelectlevelQuery({
    companyid: companyid,
    productid: ProductidSelectC.productid,
    propertyid: propertyid
  }, { skip: skipQuery });

  // const { data: ProductSelectPropertyValue, error: selectPropertyValueError, isLoading: selectPropertyValueisLoading, isError: selectPropertyValueisError } = useGetProductPropertiesValuesSelectlevelQuery({
  //   companyid: companyid,
  //   productid: ProductidSelectC.productid,
  //   propertyid: propertyid
  // }, { skip: (ProductidSelectC.productid === '') });


  

  const { data : PropertyTypeValue,
     error:PropertyTypeValueError, 
     isLoading: PropertyTypeValueisloading, 
     isError :PropertyTypeValueiserror } = useGetProductPropertyTypesValuesQuery({
    companyid:companyid,
    propertyid:propertyid,
    propertyvalue:''

},{skip:(companyid === '' ) ? true: ((typeof(propertyid) === String || propertyid === "") ? true : false)});




  const [showConfirmPropertiesTypeValue, setShowConfirmPropertiesTypeValue] = useState(false);
  const [recordToDeletePropertiesTypeValue, setRecordToDeletePropertiesTypeValue] = useState(null);

  const [createProductColourProperties, { isLoading: isCreatingProductColourProperties }] = useCreateProductPropertiesValueslevelMutation();
  const [updateProductColourProperties, { isLoading: isUpdatingProductColourProperties }] = useUpdateProductPropertiesValueslevelMutation();
  const [deleteProductColourProperties, { isLoading: isDeletingProductColourProperties }] = useDeleteProductPropertiesValueslevelMutation();

  useEffect(() => {
    setGridData(propdata);
    setPropertyid(propdata[0].propid);
  }, [propdata]);

  useEffect(() => {
    if (ProductSelectPropertyValue) {
     

      transformDataProductPropertyTypeValues()
    }
  }, [ProductSelectPropertyValue]);



  ////////////////// all property values added
  useEffect(() => {
    if (PropertyTypeValue) {
        transformData();
    }
}, [PropertyTypeValueisloading, PropertyTypeValue]);

const transformData = () => {
    if (!PropertyTypeValue) return [];
    const datagrid = PropertyTypeValue.e4kTblproductProductPropertyTypesValues.map(category => ({
        propertyid: category.proptypeid.propertyid,
        id : category.id,
        proptypeValues: category.proptypeValues,
        }));
        setDataGridAllpropvalue(datagrid);

};




  
///////////mount and unmount 
useEffect(() => {
  ///dispatch_Property(resetSelectProductPropertyTypesValues());
  setDataSelectProperty([]);
 // setDataGridAllColour([]);
  setShowConfirmPropertiesTypeValue(false)
  setRecordToDeletePropertiesTypeValue(null);
}, [dispatch_Property]);

useEffect(() => {
  return () => {
   // dispatch_Property(resetSelectProductPropertyTypesValues());
   setDataSelectProperty([]);
  // setDataGridAllColour([]);
   setShowConfirmPropertiesTypeValue(false)
   setRecordToDeletePropertiesTypeValue(null);
  };
}, [dispatch_Property]);




const transformDataProductPropertyTypeValues = () => {
  if (!ProductSelectPropertyValue) return [];

  if (ProductSelectPropertyValue.e4kTblproductProductPropertyValues) {
    const datagrid1 = ProductSelectPropertyValue.e4kTblproductProductPropertyValues.map((category) => {
      // const fitids = dataGridAllFit.find(prop => prop.description === category.productPropValue)
        
          if (category.productPropValue) {
            dispatch_Property(addSelectProductPropertyTypesValues({
              propertyid: propertyid,
              proptypeValues: category.productPropValue,
            }));
  
        }
        return {
          proptypeValues: category.productPropValue
        };
      });
  
  
      setDataSelectProperty(datagrid1);

  } else {
    setDataSelectProperty([]);
  }
}




  const findExtraPropertiesTypeValues = (data111) => {
    if (!ProductAddPropertyTypeValues || !ProductSelectPropertyValue) return;
    const productSelectPropertyIds = ProductSelectPropertyValue.e4kTblproductProductPropertyValues.map(prop => prop.productPropValue);
    
    

   // console.log(productSelectPropertyIds,'Propery value nwew added@@@@@@@@@ ', ProductAddPropertyTypeValues)
    
    
    data111.forEach(prop => {
      if (!productSelectPropertyIds.includes(prop.proptypeValues)) {
        const checkprop = dataGridAllpropvalue.filter(prop1 => prop1.proptypeValues === prop.proptypeValues)
        
        //console.log('Propery value checkprop ', checkprop)
        
        
        if(checkprop[0].propertyid === propertyid) {

        let newProperty = {
          companyid: companyid,
          productid: ProductidSelectC.productid,
          propertyid: propertyid,
          productPropValue: prop.proptypeValues,
        };

        //console.log('Propery value nwew added@@@@@@@@@ ', newProperty)
        handleProductPropertiesTypeValueCreate(newProperty);
      }
    }
    });
  };

  useEffect(() => {
    if (ProductAddPropertyTypeValues ) {
      const data11 = ProductAddPropertyTypeValues.filter(prop2 => prop2.propertyid === gridData[0].propid)
      const Data = data11.map((prop) => ({
        propertyid: prop.propertyid,
        proptypeValues: prop.proptypeValues
      }));
     

//      if (Data.length > 0 && Data[0].propertyid === gridData[0].propid && ProductSelectPropertyValue.e4kTblproductProductPropertyValues) {
        if (Data.length > 0 && Data[0].propertyid === gridData[0].propid && ProductSelectPropertyValue) {
        //console.log(ProductSelectPropertyValue.e4kTblproductProductPropertyValues,'Property id = ',gridData[0].propid,' -> Proeprty values = ',Data)
        

        const response = ProductSelectPropertyValue.e4kTblproductProductPropertyValues[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
              data11.forEach(prop => {

                const checkprop = dataGridAllpropvalue.filter(prop1 => prop1.proptypeValues === prop.proptypeValues)
              
             // console.log('Propery value checkprop ', checkprop)
              
              
              if(checkprop[0].propertyid === propertyid) {
      
                let newProperty = {
                  companyid: companyid,
                  productid: ProductidSelectC.productid,
                  propertyid: propertyid,
                  productPropValue: prop.proptypeValues,
                };
                
                handleProductPropertiesTypeValueCreate(newProperty);
              }
              })
            } else if (responseKeys.includes('productPropValue')) {

              findExtraPropertiesTypeValues(data11);
            }





      // if (ProductSelectPropertyValue && ProductSelectPropertyValue.e4kTblproductProductPropertyValues) {
        
      // }else{
        
      // }
    }


      //findExtraPropertiesTypeValues();
      setDataSelectProperty(Data);
    }
  }, [ProductAddPropertyTypeValues]);




  ///////////// Editing Grid 
  useEffect(() => {
    window.commandColumnCustomCommandPropertyTypeValuesAdd = function (row) {
      //console.log("Successfully selected", row.data);
      if (ProductAddPropertyTypeValues) {
        
          let deletedata = {
            companyid: companyid,
            productid:ProductidSelectC.productid,
            propertyid: propertyid,
            productPropValue:row.data.proptypeValues
          }
          setRecordToDeletePropertiesTypeValue(deletedata);
          setShowConfirmPropertiesTypeValue(true);

        
      }
    };
  }, [ProductAddPropertyTypeValues,ProductSelectPropertyValue]);



  const sorting = { enabled: true };
  const dataSourcePropertyValue = useMemo(() => dataselectProperty, [dataselectProperty]);
  const behavior = { allowRowReorder: true };
  const filtering = {
    enabled: true,
    filterRow: { visible: true },
  };
  const appearance1 = {
    showRowHeader: true,
    showRowHeaderDragIcon: true
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


  const editing = {
    enabled: true,
    mode: 'row',
    commandColumn: {
      visible: true,
      dataSource: {
        'commandColumnDelete': { visible: false },
        'commandColumnEdit': { visible: false },
        'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommandPropertyTypeValuesAdd', visible: true, label: '' },
      },
    },
  };

  const columnsColour = useMemo(() => {
    return gridData.map(item => ({
      label: item.propname,
      dataField: 'proptypeValues',
      allowEdit: false,
    }));
  }, [gridData]);

  const handleProductPropertiesTypeValueCreate = async (category) => {
    try {
      const result = await createProductColourProperties(category);
      if (result.error) {
        console.error('Mutation Error:', result.error);
      } else {
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

  const handleConfirmPropertiesTypeValueDelete = async () => {
    setShowConfirmPropertiesTypeValue(false);
    if (recordToDeletePropertiesTypeValue) {
      try {
        const result = await deleteProductColourProperties(recordToDeletePropertiesTypeValue);
        if (result.error) {
          console.error('Mutation Error:', result.error);
        } else {
          if (result.data.E4kTblproductProductpropertiesValuesDelete.deletePropertyValues === "Success") {
            toast.success('Attribute Value Deleted Successfully', {
              position: "top-center",
              autoClose: 500,
              hideProgressBar: true,
            });
            //const colurid = dataGridAllColour.find(prop => prop.description === recordToDeleteColourProperties.productPropValue)
            dispatch_Property(removeSelectProductPropertyTypesValues({ proptypeValues: recordToDeletePropertiesTypeValue.productPropValue }));
           
          } else {
            toast.error(result.data.E4kTblproductProductpropertiesValuesDelete.deletePropertyValues, { position: "top-center", autoClose: 3000 });
          }
        }
      } catch (error) {
        console.error('Mutation Error:', error);
      }
    }
  };

  const handlePropertyValuesGridChange = (event) => {
    console.log('Row data:', event.detail.data.colourid);
    if (gridPropertyValueColour.current && gridPropertyValueColour.current.props) {
      console.log('Change grid data:', gridPropertyValueColour.current.props.dataSource);
    }
    dispatch_Property(addSelectProductPropertyColour({
      colourid: event.detail.data.colourid,
      description: event.detail.data.colourid,
      colourcode: event.detail.data.colourid
    }));
  }

  return (
    <>


      {gridData.map((gridItem, index) => {
        const propertyid = gridItem.propid;
        const columns = [
          {
            label: gridItem.propname,
            dataField: 'proptypeValues',
            allowEdit: false,
          },
        ];

        return (
          <Grid
          key={ProductidSelectC.productid ? gridData[0].idname : gridData[0].idname}
          id={ProductidSelectC.productid ? gridData[0].idname : gridData[0].idname}
          ref={ProductidSelectC.productid ? gridProductPropertiesColourSelect : gridPropertyValueColour}
          dataSource={dataSourcePropertyValue}
          sorting={sorting}
          behavior={behavior}
          appearance={appearance}
          columns={columns}
          filtering={filtering}
          editing={editing}
      />
        );
      })}
  




      
      {showConfirmPropertiesTypeValue && (
        <div className="modal fade in" style={{ display: 'block' }}>
          <div className="modal-dialog modal-confirm">
            <div className="modal-content">
              <div className="modal-header justify-content-center modal-header-error">
                <div className="icon-box">
                  <i className="fa fa-exclamation" aria-hidden="true"></i>
                </div>
                <button type="button" className="close" onClick={() => setShowConfirmPropertiesTypeValue(false)}>&times;</button>
              </div>
              <div className="modal-body text-center">
                <h4>Confirm Delete</h4>
                <p>Are you sure you want to delete this record?</p>
                <button type="button" className="btn btn-default" onClick={() => setShowConfirmPropertiesTypeValue(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmPropertiesTypeValueDelete}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default E4kTblProductPropertyTypeValueAddGrid;
