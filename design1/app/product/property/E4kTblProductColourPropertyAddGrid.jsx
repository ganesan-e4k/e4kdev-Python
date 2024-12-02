import {Smart, Grid } from 'smart-webcomponents-react/grid';
import { useSelector ,useDispatch} from 'react-redux';
import { useEffect, useState ,useRef,useMemo} from 'react';
import { toast } from 'react-toastify';
import {addSelectProductPropertyColour,
  removeSelectProductPropertyColour,
  resetSelectProductPropertyColour} from '../../store/slices/e4kTblProductPropertyColourSelect'

import {
  useGetProductPropertiesValuesSelectlevelQuery,
    useCreateProductPropertiesValueslevelMutation,
    useUpdateProductPropertiesValueslevelMutation,
    useDeleteProductPropertiesValueslevelMutation,
} from '../../store/services/e4kTblProductProductPropertyLevelAPI';

import {
  useGetProductColoursQuery,
} from '../../store/services/e4kTblProductColours';

const E4kTblProductColourPropertyValueAddGrid = () => {

  const ProductAddPropertyColour = useSelector((state) => state.selectProductAddPropertyColour.selectProductPropertyColour);
  const gridPropertyValueColour = useRef(null);
  const [dataselectColour,setDataSelectColour] = useState([])
  const [dataGridAllColour, setDataGridAllColour] = useState([]);


  /////////////////////////// product Select Properties values datasource
  const ProductidSelectC = useSelector((state) => state.selectProduct.selectProduct);
  
  const [dataGridPropertiesColourSelect, setDataGridPropertiesColourSelect] = useState([]);

  const CompanyProductColourPropertyADD = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyid, setCompanyid] = useState('');
  const [propertyid, setPropertyid] = useState(1);
  const gridProductPropertiesColourSelect = useRef()



  useEffect(() => {
    if (CompanyProductColourPropertyADD) {
      setCompanyid(CompanyProductColourPropertyADD);
    }
  }, [CompanyProductColourPropertyADD]);

  const skipQuery = !ProductidSelectC?.productid?.trim();



  const { data:ProductSelectPropertiesColourData, 
    error:selectColourError, 
    isLoading:selectColourisLoading, 
    isError:selectColourisError } = useGetProductPropertiesValuesSelectlevelQuery({companyid:companyid,
                                                          productid:ProductidSelectC.productid,
                                                          propertyid:propertyid},{skip:skipQuery});


  // const { data:ProductSelectPropertiesColourData, 
  //         error:selectColourError, 
  //         isLoading:selectColourisLoading, 
  //         isError:selectColourisError } = useGetProductPropertiesValuesSelectlevelQuery({companyid:companyid,
  //                                                               productid:ProductidSelectC.productid,
  //                                                               propertyid:propertyid},{skip:(ProductidSelectC.productid === '') ? true:false});


  const { data:ProductAllColourData, 
    error:ProductAllError, 
    isLoading:ProductAllisLoading, 
    isError:ProductAllisError } = useGetProductColoursQuery({companyid:companyid},{skip:(companyid === '') ? true: false});  
    
    

//////////////pop up delete
const [showConfirmColourProperties, setShowConfirmColourProperties] = useState(false);
const [recordToDeleteColourProperties, setRecordToDeleteColourProperties] = useState(null);

  /////////////// Create and delete product properties API
  const [createProductColourProperties, { isLoading: isCreatingProductColourProperties }] = useCreateProductPropertiesValueslevelMutation();
  const [updateProductColourProperties, { isLoading: isUpdatingProductColourProperties }] = useUpdateProductPropertiesValueslevelMutation();
  const [deleteProductColourProperties, { isLoading: isDeletingProductColourProperties }] = useDeleteProductPropertiesValueslevelMutation();
  


  ///////////////// colour all
  useEffect(() => {
    if (ProductAllColourData) {
        const datagridcolour = ProductAllColourData.e4kTblproductProductColours.map((category, index) => ({
          companyid: category.companyid.companyid,
          colourid: category.colourid,
          description: category.description,
          colourcode: category.colourcode || "none",
      }));
      setDataGridAllColour(datagridcolour);
        
    }
}, [ProductAllisLoading, ProductAllColourData]);

  //////////////// Use dispatch only for delete 
  const dispatch_Property = useDispatch();
  //////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (ProductSelectPropertiesColourData && ProductSelectPropertiesColourData.e4kTblproductProductPropertyValues ) {
        
      const transformDataProductColourSelect = () => {
        if (!ProductSelectPropertiesColourData) return [];
        
            const datagrid1 = ProductSelectPropertiesColourData.e4kTblproductProductPropertyValues.map((category) => {
              const colurid = dataGridAllColour.find(prop => prop.description === category.productPropValue)
              if (colurid){
                dispatch_Property(addSelectProductPropertyColour({
                  colourid: colurid.colourid,
                  description: category.productPropValue,
                  colourcode: colurid.colourcode,
                }));

              }
              return {
                colourid: category.productPropValue,
              };
            });
      
            //setDataGridPropertiesColourSelect(datagrid);
            setDataSelectColour(datagrid1);
      };
      const response = ProductSelectPropertiesColourData.e4kTblproductProductPropertyValues[0];
      const responseKeys = Object.keys(response);

      if (responseKeys.includes('message')) {
      
        setDataSelectColour([]);
      } else if (responseKeys.includes('productPropValue')) {
        transformDataProductColourSelect();
      }



      
    }
}, [ProductSelectPropertiesColourData]);



/////////////mount and unmount 
useEffect(() => {
  dispatch_Property(resetSelectProductPropertyColour()); 
  setDataGridPropertiesColourSelect([]);
  setDataSelectColour([]);
  setShowConfirmColourProperties(false)
  setRecordToDeleteColourProperties(null);
}, [dispatch_Property]);

useEffect(() => {
  return () => {
    dispatch_Property(resetSelectProductPropertyColour());
    setDataGridPropertiesColourSelect([]);
    setDataSelectColour([]);
    setShowConfirmColourProperties(false)
    setRecordToDeleteColourProperties(null);
  };
}, [dispatch_Property]);

const findExtraColourProperties = () => {
  if (!ProductAddPropertyColour || !ProductSelectPropertiesColourData) return;

  const productSelectPropertyIds = ProductSelectPropertiesColourData.e4kTblproductProductPropertyValues.map(prop => prop.productPropValue);
  ProductAddPropertyColour.forEach(prop => {
    if (!productSelectPropertyIds.includes(prop.description)) {
      let newProperty = {
        companyid: companyid,
        productid: ProductidSelectC.productid,
        propertyid: propertyid,
        productPropValue: prop.description,
      };
      //console.log(typeof(prop.description),`New  colour Added:`, newProperty);
      handleProductColourPropertiesCreate(newProperty);
    }
  });
};


  useEffect(() => {
    if (ProductAddPropertyColour) {
      const Data = ProductAddPropertyColour.map((prop) => ({
        colourid: prop.description,
      }));

      if (ProductSelectPropertiesColourData && ProductSelectPropertiesColourData.e4kTblproductProductPropertyValues) {
        findExtraColourProperties();
      }

      //console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%ProductAddColourProperty', ProductAddPropertyColour);
      setDataSelectColour(Data);
    }
  }, [ProductAddPropertyColour]);

  


  ///////////// Editing Grid 
  useEffect(() => {
    window.commandColumnCustomCommandPropertyColourValuesAdd = function (row) {
      //console.log("Successfully selected", row.data);
      if (ProductAddPropertyColour) {
        
          let deletedata = {
            companyid: companyid,
            productid:ProductidSelectC.productid,
            propertyid: propertyid,
            productPropValue:row.data.colourid
          }
          setRecordToDeleteColourProperties(deletedata);
          setShowConfirmColourProperties(true);

        
      }
    };
  }, [ProductAddPropertyColour,ProductSelectPropertiesColourData]);



    const sorting = {
		enabled: true
	};
  

//  const dataSourceColour = useMemo(() => dataselectColour, [dataselectColour]);
  // const dataSourceColour = useMemo(() => new Smart.DataAdapter({
  //   dataSource: dataselectColour,
  //   dataFields: [
      
  //     'colourid: string',
      
  //   ],
  // }), [dataselectColour]);


  const dataSourceColour = useMemo(() => dataselectColour, [dataselectColour]);



	const behavior = {
		allowRowReorder: true
	};
      const filtering = {
        enabled: true,
        filterRow: {
            visible: true,
        },
    };

   
    const appearance1 = {
      showRowHeader: true,
      showRowHeaderDragIcon: true
    };

    //////////////// Editing
    const editing =  {
      enabled: true,
      mode:'row',
      commandColumn: {
          visible: true,
          dataSource: {
              'commandColumnDelete': { visible: false },
              'commandColumnEdit': { visible: false },
              'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommandPropertyColourValuesAdd', visible: true, label: '' },
          },
      },
  }


    const columnsColour = [
  
      {
        label: 'ColourID',
        dataField: 'colourid',
        allowEdit: false,
      }
  ];


  ////////
   /////////////// Product Properties Colour create
   const handleProductColourPropertiesCreate = async (category) => {
    try {
      const result = await createProductColourProperties(category);
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
const handleConfirmColourPropertiesDelete = async () => {
  setShowConfirmColourProperties(false);
  if (recordToDeleteColourProperties) {
      try {
          const result = await deleteProductColourProperties(recordToDeleteColourProperties);
          if (result.error) {
              console.error('Mutation Error:', result.error);
          } else {
              if (result.data.E4kTblproductProductpropertiesValuesDelete.deletePropertyValues === "Success") {
                toast.success('Attribute Value Deleted Successfully', {
                  position: "top-center",
                  autoClose: 500,
                  hideProgressBar: true,
                });
                const colurid = dataGridAllColour.find(prop => prop.description === recordToDeleteColourProperties.productPropValue)
                dispatch_Property(removeSelectProductPropertyColour({ colourid: colurid.colourid }));
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
    //event.preventDefault();
    console.log('Row data:', event.detail.data.colourid);
    if (gridPropertyValueColour.current && gridPropertyValueColour.current.props) {
        console.log('Change grid data@@@@@@@@@@@@', gridPropertyValueColour.current.props.dataSource);
      }
    dispatch_Property(addSelectProductPropertyColour({
        colourid: event.detail.data.colourid,
        description: event.detail.data.colourid,
        colourcode: event.detail.data.colourid
    }));

  }

   
    return (
        <>
        <Grid
            id={ProductidSelectC.productid ? "E4kTblProductPropertyValueGridColourSelect": "E4kTblProductPropertyValueGridColour"}
            //dataSourceSettings={dataSourceSettingsAddColour}
            //onEndEdit={handlePropertyValuesGridChange}
            ref={ProductidSelectC.productid ? gridProductPropertiesColourSelect: gridPropertyValueColour}
            //dataSource={ProductidSelectC.productid ? dataSourceProductColourSelect : dataSourceColour}
            dataSource={dataSourceColour}
            sorting={sorting}
            behavior={behavior}
            appearance={appearance1}
            columns={columnsColour}
            filtering={filtering}
            editing={editing}
            
        />

        {/* <<<<<<<<<<<<Pop up code >>>>>>>>>                         */}
       {showConfirmColourProperties && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmColourProperties(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmColourProperties(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmColourPropertiesDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}


        </>
  )
}

export default E4kTblProductColourPropertyValueAddGrid