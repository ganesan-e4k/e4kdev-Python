


import { Grid } from 'smart-webcomponents-react/grid';
import { useSelector, useDispatch } from 'react-redux';
import { DropDownList } from 'smart-webcomponents-react/dropdownlist';
import { useEffect, useState, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import { 
   
    
    useGetProductPropertiesSelectLevelQuery,
 } from '../../store/services/e4kTblProductProductPropertyLevelAPI';


import {useGetProductSupplierLevelSettingsSelectQuery,
    useCreateProductSupplierLevelSettingsMutation,
    useUpdateProductSupplierlevelSettingsMutation,
    useDeleteProductSupplierlevelSettingsMutation
} from '../../store/services/e4kTblProductSupplierLevelSettings';

// import {useGetProductProductPropertiesLevelTypesQuery} from '../../store/services/e4kTblProductPropertyLevelTypesGetAPI';
import {useGetAllSupplierQuery} from '../../store/services/e4kTblSupplier';

import E4kTblProductSupplierlevelMatirxGrid from './E4kTblProductSupplierlevelMatirxGrid';


export default function E4kTblProductSupplierLevelSettingsGrid() {
    const ProductAddSupplierLevelSet = useSelector((state) => state.selectProductAddProperty.selectProductProperty);
    const ProductidSelectSupplierlevel = useSelector((state) => state.selectProduct.selectProduct);


    const [dataselectlevel, setDataSelectLevel] = useState([]);
    const [dataGridSupplierLevelSet, setDataGridSupplierLevelSet] = useState([]);
    const gridProductSupplierLevelSetGrid = useRef();
    const CompanyProductSupplierLevelset = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState('');
    const [dataselectSupplierlevelSet, setDataSelectSupplierLevelset] = useState([]);
    const [allsupplierlists, setAllSupplierlists] = useState([]);
    const inputRefProductSupplierSettingsSupplierList = useRef();
    const [SelectSupplierSetDropDownChange,setSelectSupplierSetDropDownChange] = useState('');
    const [selectSupplierID,setSelectSupplierID] = useState('')

    //////////////pop up refresh
    const [showConfirmSupplierLevelReset, setShowConfirmSupplierLevelReset] = useState(false);
    const [updatedataSupplierlevel, setUpdatedataSupplierlevel] = useState(null);

    const [clickrowpopupdata, setClickRowPopupData] = useState({});
    
//////////////pop up delete
const [showConfirmSupplierLevelDelete, setShowConfirmSupplierLevelDelete] = useState(false);
const [recordToDeleteSupplierLevelDelete, setRecordToDeleteSupplierLevelDelete] = useState(null);
    
////////////////Open Supplier level Matrix
const [showModalMediumSupplierLevelMatrix, setShowModalMediumSupplierLevelMatrix] = useState(false);
const [supplierCellClick, setSupplierCellClick] = useState(false)

    useEffect(() => {
        if (CompanyProductSupplierLevelset) {
            setCompanyid(CompanyProductSupplierLevelset);
        }
        }, [CompanyProductSupplierLevelset]);
        
    
    const skipQuery = !ProductidSelectSupplierlevel?.productid?.trim();


    const { data :AllSupplierLeveldata,
        error:AllSupplierLeveldataerror, 
        isLoading :AllSupplierLeveldataisloading,
       isError :AllSupplierLeveldataiserror,
       refetch :AllSupplierLeveldatarefetch
       } = useGetAllSupplierQuery(companyid);


         ////////
    const { data: ProductproeprtiesDataSeq,
        isLoading:ProductproeprtiesDataSeqisLoading, 
       } = useGetProductPropertiesSelectLevelQuery({
        companyid: companyid,
        productid: ProductidSelectSupplierlevel.productid,
        propertyid: null,
      },{skip:skipQuery});
   

    const { data: ProductSupplierLevelSetData, 
        error: ProductSupplierLevelSetDataError, 
        isLoading: ProductSupplierLevelSetDataisLoading, 
        isError: ProductSupplierLevelSetDataisError,
        refetch: ProductSupplierLevelSetDatarefetch} = useGetProductSupplierLevelSettingsSelectQuery({
                                                                            companyid: companyid,
                                                                            productid: ProductidSelectSupplierlevel.productid,
                                                                            supplierid: ''
                                                                        },{skip:skipQuery});



////////////// Update Product Property level
const [updateProductSupplierLevelSet, { isLoading: isUpdatingProductSupplierLevelSet }] = useUpdateProductSupplierlevelSettingsMutation();


/////////////// Create property level
const [createProductSupplierLevelSet, { isLoading: isCreatingProductSupplierLevelSet }] = useCreateProductSupplierLevelSettingsMutation();

/////////////// Delete property level
const [deleteProductSupplierLevelSet, { isLoading: isDeletingProductSupplierLevelSet }] = useDeleteProductSupplierlevelSettingsMutation();



    useEffect(() => {
        if (ProductAddSupplierLevelSet) {
            const Data = ProductAddSupplierLevelSet.map((prop) => ({
                description: prop.description,
            }));
            setDataSelectLevel(Data);
           //console.log(`ProductAddSupplierLevelSet`, Data);

        }
    }, [ProductAddSupplierLevelSet]);

    ////////////// properties and seqno
    useEffect(() => {
        if (ProductproeprtiesDataSeq) {
          const transformDataProductpropertiesSelect = () => {
            if (!ProductproeprtiesDataSeq) return;
            const datagrid = ProductproeprtiesDataSeq.e4kTblproductProductProperties.map((category) => {
              return {
                seqno: category.seqno,
                propertyid: category.propertyid.propertyid,
                description: category.propertyid.description,
              };
            });
        
            setDataSelectSupplierLevelset(datagrid);
        
          };
          if (ProductidSelectSupplierlevel.productid !== ''  && ProductproeprtiesDataSeq.e4kTblproductProductProperties.length > 0){
            
          
            const response = ProductproeprtiesDataSeq.e4kTblproductProductProperties[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataSelectSupplierLevelset([]);
            } else if (responseKeys.includes('propertyid')) {
                transformDataProductpropertiesSelect();
            }


          }

          
        }
      }, [ProductproeprtiesDataSeq,ProductAddSupplierLevelSet]);


    useEffect(() => {
        if (ProductSupplierLevelSetData) {
            // const transformDataProductSupplierLevelSelect = () => {
            //     // if (!ProductSupplierLevelSetData) return [];

                

            //     const datagrid1 = ProductSupplierLevelSetData.e4kTblproductProductSupplierLevel.map((category) => {
            //         //console.log('ProductSupplierLevelSetData, ->>>>>>>>>>>>>> ' ,category)
                    
            //         return {
            //             "supplierid": category.supplierid.businessid,
            //             "suppliermatrix": JSON.parse(category.suppliermatrix),
                        
            //         };
            //     });

               
            //     setDataGridSupplierLevelSet(datagrid1);
            // };
            const transformDataProductSupplierLevelSelect = () => {
                if (!ProductSupplierLevelSetData) return;
            
                
                const supplierIdsToRemove = ProductSupplierLevelSetData.e4kTblproductProductSupplierLevel.map(
                    (category) => category.supplierid.businessid
                );
            
                
                const filteredSupplierList = allsupplierlists.filter(
                    (sup) => !supplierIdsToRemove.includes(sup.businessid)
                );
            
                
                setAllSupplierlists(filteredSupplierList);
            
                
                const datagrid1 = ProductSupplierLevelSetData.e4kTblproductProductSupplierLevel.map((category) => {
                    return {
                        
                        supplierid: category.supplierid.businessid,
                        suppliermatrix: JSON.parse(category.suppliermatrix),
                    };
                });
            
                console.log('Datagrid Supplier Level Setting data --->' , datagrid1);

                // Update the state with the transformed data
                setDataGridSupplierLevelSet(datagrid1);
            };
            


            const response = ProductSupplierLevelSetData.e4kTblproductProductSupplierLevel[0];
            const responseKeys = Object.keys(response);
            
    
            if (responseKeys.includes('message') && ProductproeprtiesDataSeq.e4kTblproductProductProperties.length > 0) {
                
                const propertyMap = ProductproeprtiesDataSeq.e4kTblproductProductProperties.reduce((acc, prop) => {
                    acc[prop.propertyid.description] = prop.seqno;
                    return acc;
                }, {});
                
                
               

            //} else if (responseKeys.includes('suppliermatrix') && allsupplierlists.length > 0) { change line on 16 sep 2024
            } else if (responseKeys.includes('suppliermatrix') && allsupplierlists.length > 0) {
                
                transformDataProductSupplierLevelSelect();
            }

        }
    }, [ProductSupplierLevelSetData,ProductAddSupplierLevelSet]); ///////// this was change on 03-08-24 added ProductAddSupplierLevelSet


    useEffect(() => {
        if (AllSupplierLeveldata) {
            
            if (!AllSupplierLeveldata) return [];
            if (ProductSupplierLevelSetData?.e4kTblproductProductSupplierLevel) {
            const datagrid11 = AllSupplierLeveldata.e4kTblsupplierAll.map(category => ({
                name: category.name,
                businessid: category.businessid,
                supplier : category.businessid +  " - "+ category.name
                
                }));

                const supplierIdsToRemove = ProductSupplierLevelSetData.e4kTblproductProductSupplierLevel?.map(
                    (category) => category?.supplierid?.businessid
                );
            
                
                const filteredSupplierList = datagrid11.filter(
                    (sup) => !supplierIdsToRemove.includes(sup.businessid)
                );
            
                
                setAllSupplierlists(filteredSupplierList);

                
            }
        }
    }, [AllSupplierLeveldataisloading, AllSupplierLeveldata,ProductSupplierLevelSetData]);

/////////////////////Delete Prodct Supplier 
  ///////////// Editing Grid 
  useEffect(() => {
    window.commandColumnCustomCommandProductSupplierlevelsetdelete = function (row) {
      
      if (ProductAddSupplierLevelSet) {
        
          let deletedata = {
            companyid: companyid,
            productid: ProductidSelectSupplierlevel.productid,
            supplierid: row.data.supplierid,
          }
          console.log("Successfully selected record to delete ", deletedata);
          setRecordToDeleteSupplierLevelDelete(deletedata);
          setShowConfirmSupplierLevelDelete(true);
          
        
      }
    };
  }, [ProductSupplierLevelSetData,ProductAddSupplierLevelSet]);


    const selection = {
        enabled: true,
        allowCellSelection: true,
        allowRowHeaderSelection: true,
        allowColumnHeaderSelection: true,
        mode: 'extended'
    };

    const behavior = {
        columnResizeMode: 'split'
    };

    const sorting = {
        enabled: true
    };

    const filtering = {
        enabled: true
    };

    const editing = {
        enabled: true,
        mode: 'row',
        commandColumn: {
            visible: true,
            dataSource: {
                'commandColumnDelete': { visible: false },
                'commandColumnEdit': { visible: false },
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommandProductSupplierlevelsetdelete', visible: true, label: '' },
            },
        },
    };

    const columns = [{
        label: 'Supplier',
        dataField: 'supplierid',
        allowEdit: false,
    }];

    const columns1 = useMemo(() => {
        return columns.concat(ProductAddSupplierLevelSet.map((prop) => ({
            label: prop.description,
            dataField: prop.description,
            template: 'checkBox',
            editor: 'checkBox'
        })));
    }, [ProductAddSupplierLevelSet,dataGridSupplierLevelSet]);


  

    const datasource = useMemo(() => {
        
        const dataGridSupplierLevelSetArray = Array.isArray(dataGridSupplierLevelSet) 
            ? dataGridSupplierLevelSet 
            : dataGridSupplierLevelSet ? [dataGridSupplierLevelSet] : [];
    
        

       // console.log(dataGridSupplierLevelSet,' ------> Dtatgrids: dataGridSupplierLevelSetArray = ', dataGridSupplierLevelSetArray)

        if (!Array.isArray(ProductAddSupplierLevelSet)) {
            return [];
        }
    
        

        const sourcedata = dataGridSupplierLevelSetArray.map((row) => {
            const rowData = { supplierid: row.supplierid };
    
            ProductAddSupplierLevelSet.forEach((prop) => {
                const propDescription = prop.description; 
    
                
                const matchingData = row.suppliermatrix?.find(
                    (item) => item[propDescription] !== undefined
                );
    
                if (matchingData) {
                    rowData[propDescription] = false; 
                } else {
                    rowData[propDescription] = null;
                }
            });
    
            return rowData;
        });
    
        return sourcedata;
    }, [ProductAddSupplierLevelSet, dataGridSupplierLevelSet]);
    
    
  
    
    


    const dataSource10level = useMemo(() => new Smart.DataAdapter({
        dataSource: datasource,
    }), [dataGridSupplierLevelSet,ProductAddSupplierLevelSet]);//// added ProductAddSupplierLevelSet on 08_03_24

//////////////////// row Click events
    const handleRowClickPropertiesLevelSet = (event) => {
        const rowClickdata = event.detail.data;
        const field = rowClickdata.supplierid; 

        let updatedDataGridLevelSet = { ...dataGridSupplierLevelSet };



        for (let prop in updatedDataGridLevelSet){
            for (let inprops in updatedDataGridLevelSet[prop][0]){
                updatedDataGridLevelSet[prop][0][inprops] = Number(updatedDataGridLevelSet[prop][0][inprops]);
            }
        }

    
        // Initialize the dictionaries if they don't exist
        if (!updatedDataGridLevelSet[field]) updatedDataGridLevelSet[field] = {};
       
        let selectedProperties = {};
        for (let key in rowClickdata) {
            if (rowClickdata[key] === true) {
                let property = dataselectSupplierlevelSet.find(prop => prop.description === key);
              
               if (property) {
                    selectedProperties[key] = property.seqno;
                }
            }
        }
    
        // Replace the entire content of updatedDataGridLevelSet[field] with selectedProperties
        if (field && selectedProperties) {
            updatedDataGridLevelSet[field] = [selectedProperties];
        }
        let dataUpdate = {
            companyid:companyid,
            productid: ProductidSelectSupplierlevel.productid,
            supplierid: rowClickdata.supplierid,
            "suppliermatrix":JSON.stringify(updatedDataGridLevelSet[rowClickdata.supplierid][0]),
            

        }

        
        setShowConfirmSupplierLevelReset(true);
        setUpdatedataSupplierlevel(dataUpdate)
        setSupplierCellClick(true);


    };
    
////////////////// Update the levels via api functions
 /////////////// Product Properties level update
 const handleProductPropertieslevelsetUpdate = async () => {

    setShowConfirmSupplierLevelReset(false);
    if (updatedataSupplierlevel) {
            try {
            const result = await updateProductSupplierLevelSet(updatedataSupplierlevel);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductsupplierlevelUpdate.updateProductSupplierLevel === "Success") {
                toast.success('Supplier Level Updated', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                    
                });
                setShowConfirmSupplierLevelReset(false);
                setSelectSupplierID('')
                setSelectSupplierSetDropDownChange('')
                setUpdatedataSupplierlevel(null)
                
                } else {
                toast.error(result.data.E4kTblproductProductsupplierlevelUpdate.updateProductSupplierLevel,{
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    
                });
                }
            }
            } catch (error) {
            console.error('Mutation Error:', error);
            }

        }
  };


  /////////////// Product Properties Level create
 const handleProductSupplierlevelsettingsCreate = async (createdata) => {

    
   // if (updatedataSupplierlevel) {
            try {
            const result = await createProductSupplierLevelSet(createdata);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductsupplierlevelCreate.createProductSupplierLevel === "Success") {
                toast.success('Supplier Level Created Successfully', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                    
                });
                setSelectSupplierID('')
                setSelectSupplierSetDropDownChange('')
                
                } else {
                toast.error(result.data.E4kTblproductProductsupplierlevelCreate.createProductSupplierLevel,  {
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


  //////////////////////////////////////////pop up delete 
const handleConfirmSupplierLevelDelete = async () => {
    setShowConfirmSupplierLevelDelete(false);
    if (recordToDeleteSupplierLevelDelete) {
        try {
            const result = await deleteProductSupplierLevelSet(recordToDeleteSupplierLevelDelete);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                if (result.data.E4kTblproductProductsupplierlevelDelete.deleteProductSupplierLevel === "Success") {
                  toast.success('Supplier Level Deleted Successfully', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                  });
                  
                  setShowConfirmSupplierLevelDelete(false)
                  setRecordToDeleteSupplierLevelDelete(null)
                } else {
                    toast.error(result.data.E4kTblproductProductsupplierlevelDelete.deleteProductSupplierLevel,{
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                      });
            }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    }
  };

  const handleAddSupplierLevel = () => {

    console.log('Adding Supplier ',selectSupplierID)
    if (selectSupplierID !=='' && ProductproeprtiesDataSeq?.e4kTblproductProductProperties) {
        const isCreateNewSupplier = dataGridSupplierLevelSet.some(sup => sup.supplierid === selectSupplierID)
        
        if (isCreateNewSupplier === false || isCreateNewSupplier === undefined) {

            const propertyMap1 = ProductproeprtiesDataSeq.e4kTblproductProductProperties.reduce((acc, prop) => {
                acc[prop.propertyid.description] = prop.seqno;
                return acc;
            }, {});
            let dataCreate = {
                companyid:companyid,
                productid: ProductidSelectSupplierlevel.productid,
                supplierid: selectSupplierID,
                "suppliermatrix":JSON.stringify(propertyMap1),
                
    
            }
            handleProductSupplierlevelsettingsCreate(dataCreate)
        }
    }

  }

  const handleDropDownonChangeAllSupplierlist = (event) => {
    const value = event.detail.value;

    const suppdata = value.split(' -')[0];
    setSelectSupplierID(suppdata);
    setSelectSupplierSetDropDownChange(value)
    
  }

  const handleRowSupplierlevelcellclickevent = (ev) => {
    
    if (ev.detail.dataField === 'supplierid'){
        let popupdataclick = {
            companyid:companyid,
            productid: ProductidSelectSupplierlevel.productid,
            supplierid: ev.detail.value,

        }
        setClickRowPopupData(popupdataclick)
        
        setSupplierCellClick(true)
        setShowModalMediumSupplierLevelMatrix(true)
        gridProductSupplierLevelSetGrid.current.editing.enabled = false;
    }else{
        gridProductSupplierLevelSetGrid.current.editing.enabled = true;
        setShowModalMediumSupplierLevelMatrix(false)
        
    }

  }


  ///////////////// Supplier matrix Popup Open and Close method 
const handleOpenModalMediumSupplierLevelMatrix = () => {
    setShowModalMediumSupplierLevelMatrix(true);
   };
  
   const handleCloseModalMediumSupplierLevelMatrix = () => {
    gridProductSupplierLevelSetGrid.current.editing.enabled = true;
    setShowConfirmSupplierLevelReset(false)
    setShowModalMediumSupplierLevelMatrix(false);
    setSupplierCellClick(false)

    ProductSupplierLevelSetDatarefetch()

    gridProductSupplierLevelSetGrid.current.render()
  
   };


    return (
        <>

    <div className='popupmasterpage-topfield'>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className='input-lable'>
                    <span>Supplier : </span>
                </div>
            </div>    
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="display-inline">
                <div className='form-group master-option'>                                
                    <DropDownList
                        ref={inputRefProductSupplierSettingsSupplierList}
                        id="tblproductproductSupplierlevelsetdropdownsupplierlists"
                        filterable
                        placeholder="Select Supplier"
                        dataSource={allsupplierlists.length > 0 ? allsupplierlists.map(cus => cus.supplier) : []}
                        onChange={(e) => handleDropDownonChangeAllSupplierlist(e)}
                        value = {SelectSupplierSetDropDownChange} 
                    />

                    
                    
                    
                </div>

                {/* <span onClick={() => handleAddSupplierLevel()}><a href="#"> Add</a></span> */}
                <button className="btn alter-button margin-left15" onClick={() => handleAddSupplierLevel()} >Add</button>
            </div>
            </div>


    </div> 



    <div>         

        {(!AllSupplierLeveldataisloading && dataGridSupplierLevelSet.length > 0) ? (
            <Grid id="tblproductsupplierlevelmatrixsettingsgrids"
                ref={gridProductSupplierLevelSetGrid}
                dataSource={ dataSource10level }
                selection={selection}
                behavior={behavior}
                sorting={sorting}
                filtering={filtering}
                editing={editing}
                columns={columns1}
                onEndEdit={handleRowClickPropertiesLevelSet}
                onCellClick={handleRowSupplierlevelcellclickevent}
            ></Grid>
            ) : null}
           </div>         
       
            {/* <<<<<<<<<<<<Pop up code >>>>>>>>>                         */}
            {supplierCellClick && (showConfirmSupplierLevelReset ) && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => {
                                        ProductSupplierLevelSetDatarefetch()
                                        setShowConfirmSupplierLevelReset(false)
                                        
                                        }}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Update Level</h4>	
                                <p> Please wait till page get refreshed</p>
                                {/* <button type="button" className="btn btn-default" onClick={() => setShowConfirmSupplierLevelReset(false)}>Cancel</button> */}
                                    <button type="button" className="btn btn-danger" onClick={() => handleProductPropertieslevelsetUpdate()}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}



            {/* <<<<<<<<<<<<Pop up code >>>>>>>>>                         */}
       {showConfirmSupplierLevelDelete && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmSupplierLevelDelete(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this Supplier record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmSupplierLevelDelete(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmSupplierLevelDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        <E4kTblProductSupplierlevelMatirxGrid 
            showModalMediumSupplierLevelMatrix={showModalMediumSupplierLevelMatrix} 
            handleCloseMediumSupplierLevelMatrix={handleCloseModalMediumSupplierLevelMatrix} 
            supplieleveldata = {clickrowpopupdata} />

</>
    );
}
