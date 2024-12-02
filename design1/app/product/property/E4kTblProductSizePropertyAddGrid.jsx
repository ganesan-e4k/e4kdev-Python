


import { Grid } from 'smart-webcomponents-react/grid';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import {
  addSelectProductPropertySize,
  removeSelectProductPropertySize,
  resetSelectProductPropertySize,
} from '../../store/slices/e4kTblProductPropertySizeRangeSelect';

import {
  useGetProductPropertiesValuesSelectlevelQuery,
    useCreateProductPropertiesValueslevelMutation,
    useUpdateProductPropertiesValueslevelMutation,
    useDeleteProductPropertiesValueslevelMutation,
} from '../../store/services/e4kTblProductProductPropertyLevelAPI';

const E4kTblProductSizePropertyValueAddGrid = () => {
  const ProductAddPropertySize = useSelector(
    (state) => state.selectProductAddPropertySize.selectProductPropertySize
  );
  const gridPropertyValueSize = useRef(null);
  const [dataselectSize, setDataSelectSize] = useState([]);

  const ProductidSelectS = useSelector((state) => state.selectProduct.selectProduct);
  const [dataGridPropertiesSizeSelect, setDataGridPropertiesSizeSelect] = useState([]);
  const CompanyProductSizePropertyAdd = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyid, setCompanyid] = useState('');
  const [propertyid, setPropertyid] = useState(2);
  const gridProductPropertiesSizeSelect = useRef();

  useEffect(() => {
    if (CompanyProductSizePropertyAdd) {
      setCompanyid(CompanyProductSizePropertyAdd);
    }
  }, [CompanyProductSizePropertyAdd]);

  const skipQuery = !ProductidSelectS?.productid?.trim();





  
  const {
    data: ProductSelectPropertiesSizeData,
    error: selectSizeError,
    isLoading: selectSizeisLoading,
    isError: selectSizeisError,
    refetch: refetchSelectSizeProperties,
  } = useGetProductPropertiesValuesSelectlevelQuery({
    companyid: companyid,
    productid: ProductidSelectS.productid,
    propertyid: propertyid,
  },{skip:skipQuery});

  // const {
  //   data: ProductSelectPropertiesSizeData,
  //   error: selectSizeError,
  //   isLoading: selectSizeisLoading,
  //   isError: selectSizeisError,
  //   refetch: refetchSelectSizeProperties,
  // } = useGetProductPropertiesValuesSelectlevelQuery({
  //   companyid: companyid,
  //   productid: ProductidSelectS.productid,
  //   propertyid: propertyid,
  // },{skip:(ProductidSelectS.productid === '') ? true:false});

  const [showConfirmSizeProperties, setShowConfirmSizeProperties] = useState(false);
  const [recordToDeleteSizeProperties, setRecordToDeleteSizeProperties] = useState(null);

  const [createProductSizeProperties, { isLoading: isCreatingProductSizeProperties }] =
  useCreateProductPropertiesValueslevelMutation();
  const [updateProductSizeProperties, { isLoading: isUpdatingProductSizeProperties }] =
  useUpdateProductPropertiesValueslevelMutation();
  const [deleteProductSizeProperties, { isLoading: isDeletingProductSizeProperties }] =
  useDeleteProductPropertiesValueslevelMutation();

  const dispatch_Property = useDispatch();

  useEffect(() => {
    if (ProductSelectPropertiesSizeData && ProductSelectPropertiesSizeData.e4kTblproductProductPropertyValues) {
      const transformDataProductSizeSelect = () => {
        if (!ProductSelectPropertiesSizeData) return [];

        const datagrid1 = ProductSelectPropertiesSizeData.e4kTblproductProductPropertyValues.map(
          (category) => {
            if (category && category.productPropValue !== '' && category.productPropValue !== undefined) {
              dispatch_Property(
                addSelectProductPropertySize({
                  rangeid: 1,
                  values: category.productPropValue,
                })
              );
            }

            return {
              values: category.productPropValue,
            };
          }
        );

        setDataSelectSize(datagrid1);
      };


      const response = ProductSelectPropertiesSizeData.e4kTblproductProductPropertyValues[0];
      const responseKeys = Object.keys(response);

      if (responseKeys.includes('message')) {
      
        setDataSelectSize([]);
      } else if (responseKeys.includes('productPropValue')) {
        transformDataProductSizeSelect();
      }



      
    }
  }, [ProductSelectPropertiesSizeData]);

  useEffect(() => {
    dispatch_Property(resetSelectProductPropertySize());
    setDataGridPropertiesSizeSelect([]);
    setDataSelectSize([]);
    setShowConfirmSizeProperties(false);
    setRecordToDeleteSizeProperties(null);
  }, [dispatch_Property]);

  useEffect(() => {
    return () => {
      dispatch_Property(resetSelectProductPropertySize());
      setDataGridPropertiesSizeSelect([]);
      setDataSelectSize([]);
      setShowConfirmSizeProperties(false);
      setRecordToDeleteSizeProperties(null);
    };
  }, [dispatch_Property]);

  

  useEffect(() => {
    if (ProductAddPropertySize && ProductAddPropertySize.length > 0) {
      const Data = ProductAddPropertySize.map((prop) => ({
        values: prop.values,
      }));

      const existing_store = ProductAddPropertySize.map(prop => prop.values)


      
      if (ProductAddPropertySize.length > 0) {
        const existing_store_values = existing_store.filter(item =>!dataselectSize.some(i => i.values === item));
        
        if (existing_store_values.length > 0) {
          findExtraSizeProperties();
        }
       
      }
      
      setDataSelectSize(Data);
    }
  }, [ProductAddPropertySize]);

  useEffect(() => {
    window.commandColumnCustomCommandPropertySizeValuesAdd = function (row) {
      if (ProductAddPropertySize) {
        let deletedata = {
          companyid: companyid,
          productid: ProductidSelectS.productid,
          propertyid: propertyid,
          productPropValue: row.data.values,
        };

        setRecordToDeleteSizeProperties(deletedata);
        setShowConfirmSizeProperties(true);
      }
    };
  }, [ProductAddPropertySize,ProductSelectPropertiesSizeData]);


  const findExtraSizeProperties = () => {
    if (!ProductAddPropertySize || !ProductSelectPropertiesSizeData) return;

    const propvalues = ProductAddPropertySize.map((prop) => prop.values);

    let newProperty = {
      companyid: companyid,
      productid: ProductidSelectS.productid,
      propertyid: propertyid,
      productPropValue: propvalues,
    };
    handleProductSizePropertiesCreate(newProperty);
  };

  const sorting = {
    enabled: true,
  };
  const dataSourceSettingsAddSize = {
    dataFields: ['values: string'],
  };

  const dataSourceSize = useMemo(() => dataselectSize, [dataselectSize]);

  const behavior = {
    allowRowReorder: true,
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
    showRowHeaderDragIcon: true,
  };

  const appearance1 = {
    showRowHeader: true,
    showRowHeaderDragIcon: true,
  };

  const editing = {
    enabled: true,
    mode: 'row',
    addNewRow: {
      visible: true,
      position: 'near',
    },
    commandColumn: {
      visible: true,
      dataSource: {
        commandColumnDelete: { visible: false },
        commandColumnEdit: { visible: false },
        commandColumnCustom: {
          icon: 'fa fa-trash',
          command: 'commandColumnCustomCommandPropertySizeValuesAdd',
          visible: true,
          label: '',
        },
      },
    },
  };

  const columns = [
    {
      label: 'Size Values',
      dataField: 'values',
    },
  ];

  const handleProductSizePropertiesCreate = async (category) => {
    try {
      const result = await createProductSizeProperties(category);
      if (result.error) {
        console.error('Mutation Error:', result.error);
      } else {
        console.log('Mutation Success:', result.data);
        if (result.data.E4kTblproductProductpropertiesValuesCreate.createPropertyValues === 'Success') {
          toast.success('Attribute Values Saved Successfully', {
            position: 'top-center',
            autoClose: 500,
            hideProgressBar: true,
          });
        } else {
          toast.error(result.data.E4kTblproductProductpropertiesValuesCreate.createPropertyValues, {
            position: 'top-center',
          });
        }
      }
    } catch (error) {
      console.error('Mutation Error:', error);
    }
  };

  const handleConfirmSizePropertiesDelete = async () => {
    setShowConfirmSizeProperties(false);
    if (recordToDeleteSizeProperties) {
      try {
        const result = await deleteProductSizeProperties(recordToDeleteSizeProperties);
        if (result.error) {
          console.error('Mutation Error:', result.error);
        } else {
          if (result.data.E4kTblproductProductpropertiesValuesDelete.deletePropertyValues === 'Success') {
            toast.success('Attribute Value Deleted Successfully', {
              position: 'top-center',
              autoClose: 500,
              hideProgressBar: true,
            });
            dispatch_Property(removeSelectProductPropertySize({ values: recordToDeleteSizeProperties.productPropValue }));
            setDataSelectSize((prevData) =>
              prevData.filter((item) => item.values !== recordToDeleteSizeProperties.productPropValue)
            );
          } else {
            toast.error(result.data.E4kTblproductProductpropertiesValuesDelete.deletePropertyValues, {
              position: 'top-center',
              autoClose: 3000,
            });
          }
        }
      } catch (error) {
        console.error('Mutation Error:', error);
      }
    }
  };

  const handlePropertyValuesGridChange = (event) => {
    //console.log('Row data:', event.detail.data.values);
    let newSize = event.detail.data.values;

    const newSizecompare = dataselectSize.some(data => data.values === newSize);
    //console.log('Row size:', newSize, '  sizecompare:', newSizecompare)
    if (!newSizecompare && newSize !=='') {

      let newProperty = {
        companyid: companyid,
        productid: ProductidSelectS.productid,
        propertyid: propertyid,
        productPropValue: [newSize],
      };
      //console.log('Row new size:', newSize, '  newProperty :', newProperty)
      handleProductSizePropertiesCreate(newProperty)
    }else{
      refetchSelectSizeProperties()
    }




  };

  return (
    <>
      <Grid
        id={ProductidSelectS.productid ? 'E4kTblProductPropertyValueGridSizeSelect' : 'E4kTblProductPropertyValueGridSize'}
        onEndEdit={handlePropertyValuesGridChange}
        ref={ProductidSelectS.productid ? gridProductPropertiesSizeSelect : gridPropertyValueSize}
        dataSource={dataSourceSize}
        sorting={sorting}
        behavior={behavior}
        appearance={appearance1}
        columns={columns}
        filtering={filtering}
        editing={editing}
      />
      {showConfirmSizeProperties && (
        <div className="modal fade in" style={{ display: 'block' }}>
          <div className="modal-dialog modal-confirm">
            <div className="modal-content">
              <div className="modal-header justify-content-center modal-header-error">
                <div className="icon-box">
                  <i className="fa fa-exclamation" aria-hidden="true"></i>
                </div>
                <button type="button" className="close" onClick={() => setShowConfirmSizeProperties(false)}>
                  &times;
                </button>
              </div>
              <div className="modal-body text-center">
                <h4>Confirm Delete</h4>
                <p>Are you sure you want to delete this record?</p>
                <button type="button" className="btn btn-default" onClick={() => setShowConfirmSizeProperties(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmSizePropertiesDelete}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default E4kTblProductSizePropertyValueAddGrid;
