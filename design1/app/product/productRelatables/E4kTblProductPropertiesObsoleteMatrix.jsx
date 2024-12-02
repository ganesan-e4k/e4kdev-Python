

'use client';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'smart-webcomponents-react/table';
import { toast } from 'react-toastify';
import Draggable from 'react-draggable';


import {
    useGetProductObsoleteTypesQuery,
} from '../../store/services/e4kTblProductObsoleteTypes';

import { 
    useGetProductPropertiesLevelColMatrixLevelQuery,
    useGetProductObsoleteTypeMatrixLevelQuery,
    useUpdateProductObsoleteTypeMatrixLevelMutation,

 } from '../../store/services/e4kTblProductProductPropertyLevelAPI';


const E4kTblProductPropertiesObsoleteTypeMatrix = ({ showModalMediumObsoleteTypeMatrix, handleCloseMediumObsoleteTypeMatrix }) => {
    const [dataGridObsoleteType, setDataGridObsoleteType] = useState([]);
    const [dataGridObsoleteTypecol, setDataGridObsoleteTypecol] = useState([]);
    const [ObsoleteTypeAllData, setObsoleteTypeAllData] = useState([]);
    const CompanyProductObsoletetypematrix = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState('');
    const tableObsoleteTypeRef = useRef();
    const [filterRowObsoleteType, setFilterrowObsoleteType] = useState(true);

    
    const [filterColumnsObsoleteType,setFilterColumnsObsoleteType]  = useState([]);
    const [filterValuesObsoleteType ,setFilterValuesObsoleteType]= useState([]);
    const ProductIDSelectObsolete = useSelector((state) => state.selectProduct.selectProduct);

    useEffect(() => {
        if (CompanyProductObsoletetypematrix) {
            setCompanyid(CompanyProductObsoletetypematrix);
        }
        }, [CompanyProductObsoletetypematrix]);
    
    const skipQuery = !ProductIDSelectObsolete?.productid?.trim();
    ////////////// Api call from propeties level set api
    const {
         data: ObsoleteTypematrixdata, 
         error: ObsoleteTypematrixerror, 
         isLoading: ObsoleteTypematrixisLoading,
          isError: ObsoleteTypematrixisError } = useGetProductObsoleteTypeMatrixLevelQuery({
                                                companyid: companyid,
                                                productid: ProductIDSelectObsolete.productid
                                            },{skip:skipQuery});

    const { 
        data: ObsoleteTypecolmatrixdata,
         error: ObsoleteTypecolmatrixerror, 
         isLoading: ObsoleteTypecolmatrixisLoading,
          isError: ObsoleteTypecolmatrixisError } = useGetProductPropertiesLevelColMatrixLevelQuery({
                                                        companyid: companyid,
                                                        productid: ProductIDSelectObsolete.productid
                                                    },{skip:skipQuery});



//      ////////////// Api call from propeties level set api
//      const {
//         data: ObsoleteTypematrixdata, 
//         error: ObsoleteTypematrixerror, 
//         isLoading: ObsoleteTypematrixisLoading,
//          isError: ObsoleteTypematrixisError } = useGetProductObsoleteTypeMatrixLevelQuery({
//                                                companyid: companyid,
//                                                productid: ProductIDSelectObsolete.productid
//                                            },{skip:(ProductIDSelectObsolete.productid === '') ? true:false});

//    const { 
//        data: ObsoleteTypecolmatrixdata,
//         error: ObsoleteTypecolmatrixerror, 
//         isLoading: ObsoleteTypecolmatrixisLoading,
//          isError: ObsoleteTypecolmatrixisError } = useGetProductPropertiesLevelColMatrixLevelQuery({
//                                                        companyid: companyid,
//                                                        productid: ProductIDSelectObsolete.productid
//                                                    },{skip:(ProductIDSelectObsolete.productid === '') ? true:false});

    const [isMaximizedObsoleteType, setIsMaximizedObsoleteType] = useState(false);

    ///////////// Stocking type table data for dropdow
    const { 
        data:ObsoleteTypeData, 
        error :ObsoleteTypeDataerror,
        isLoading : ObsoleteTypeDataIsLoading, 
        isError:ObsoleteTypeDataisError } = useGetProductObsoleteTypesQuery(companyid);

  
    ////////////// Update Product stoking type
const [updateProductObsoleteTypeMatrixlevel,
    { isLoading: isUpdatingupdateProductObsoleteTypeMatrixlevel }
   ] = useUpdateProductObsoleteTypeMatrixLevelMutation();
 
    useEffect(() => {
        if (ObsoleteTypeData) {
            transformDataObsolete();
        }
    }, [ObsoleteTypeDataIsLoading, ObsoleteTypeData]);



    const transformDataObsolete = () => {
        if (!ObsoleteTypeData) return [];
        const datagrid = ObsoleteTypeData.e4kTblproductProductObsoleteTypes.map((category, index) => ({
            obsoleteid: category.obsoleteid,
            companyid: category.companyid.companyid,
            description: category.description,
            allowSale: category.allowSale,
        }));
        setObsoleteTypeAllData(datagrid);
    };                                                       




    useEffect(() => {
        // Clear the data and columns when either of the API data is loading or changes
        setDataGridObsoleteType([]);
        setDataGridObsoleteTypecol([]);
        setFilterrowObsoleteType(true);

        
        if (!ObsoleteTypematrixisLoading && ObsoleteTypematrixdata && ObsoleteTypecolmatrixdata && ProductIDSelectObsolete.productid) {
            

            const response = ObsoleteTypematrixdata.e4kTblproductProductObsoletetypeMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridObsoleteType([]);
            } else if (responseKeys.includes('obslmatix')) {
                transformDataObsoleteTypematrix();
            }


        }

        if (!ObsoleteTypecolmatrixisLoading && ObsoleteTypecolmatrixdata && ObsoleteTypematrixdata && ProductIDSelectObsolete.productid) {
            


            const response = ObsoleteTypematrixdata.e4kTblproductProductObsoletetypeMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridObsoleteTypecol([]);
            } else if (responseKeys.includes('obslmatix')) {
                transformDataObsoleteTypeColmatrix();
                setFilterrowObsoleteType(true);
            }


        }
    }, [ObsoleteTypematrixisLoading, ObsoleteTypematrixdata, ObsoleteTypecolmatrixisLoading, ObsoleteTypecolmatrixdata, ProductIDSelectObsolete.productid]);



    const transformDataObsoleteTypematrix = () => {
        if (!ObsoleteTypematrixdata) return [];
        setDataGridObsoleteType(JSON.parse(ObsoleteTypematrixdata.e4kTblproductProductObsoletetypeMatrix[0].obslmatix));

        if (!ObsoleteTypeAllData) return [];


        const transformedObsoleteType = JSON.parse(ObsoleteTypematrixdata.e4kTblproductProductObsoletetypeMatrix[0].obslmatix).map(column => {

            if (ObsoleteTypeAllData.length > 0 && column['obsoleteID'] !== null && column['obsoleteID'] >= 0){
               // console.log(ObsoleteTypeAllData,'Obsolete = !!!!!!!!!',(ObsoleteTypeAllData.filter(ObsoleteType => (ObsoleteType.obsoleteid) === column['obsoleteID'])))
            column['obsoleteID'] = (ObsoleteTypeAllData.filter(ObsoleteType => ObsoleteType.obsoleteid === column['obsoleteID']))[0].description
            }

            return column;
        });

        setDataGridObsoleteType(transformedObsoleteType)
    };


    const transformDataObsoleteTypeColmatrix = () => {
        
        if (!ObsoleteTypecolmatrixdata && ObsoleteTypecolmatrixdata.e4kTblproductProductPropertyLevelColmatrix.length === 0) return [];

        const transformedColumns = JSON.parse(ObsoleteTypecolmatrixdata.e4kTblproductProductPropertyLevelColmatrix[0].obslcolmatrix)
        const standCostcolumns = transformedColumns.filter(column => column.dataField  && !column.dataField.includes('summary'));
        
        const transformedColumns1 = standCostcolumns.map(column => {
            const { dataField, dataType, label } = column;
            let newColumn = { label, dataField, dataType };

            if (dataField === "obsoleteID") {
                newColumn = { 
                    label, 
                    dataField, 
                    dataType: "string",
                    editor: {
                        template: '<smart-drop-down-list></smart-drop-down-list>',
                        onInit(row, column, editor, value) {
                            editor.dataSource = ObsoleteTypeAllData.map(Obsolete => Obsolete.description)
                            editor.dropDownAppendTo = 'body';
                            editor.dropDownOpenMode = 'auto';
                        },
                        onRender(row, column, editor, value) {
                            editor.selectedValues = [value];
                            
                        },
                        getValue(editor) {
                            //return ObsoleteTypeAllData.find(Obsolete => Obsolete.description === editor.selectedValues[0]).obsoleteid;
                            return editor.selectedValues[0];
                        }
                    }
                    
                 };
            } else {
                newColumn.allowEdit = false;
            }

            return newColumn;
        });

        setDataGridObsoleteTypecol(transformedColumns1);
    };



    const header = {
        visible: true,
        buttons: ['filter', 'sort', 'search']
    };



    const toggleMaximizeObsoleteType = () => {
        setIsMaximizedObsoleteType(!isMaximizedObsoleteType);
    };

    const dataSourceObsoleteType = useMemo(() => dataGridObsoleteType, [dataGridObsoleteType]);

    
    const handleCellEditObsoleteType = (event) => {
        const detail = event.detail,
            id = detail.id,
            dataField = detail.dataField,
            row = detail.row,
            value = detail.value;


        tableObsoleteTypeRef.current.updateRow(id, detail.row)

        // const newData = [...dataGridObsoleteType];
        // newData[id][dataField] = value;
        // setDataGridObsoleteType(newData);
    
        
    };


 //////////// Copy first
 const handleCopyFirstObsoleteType = () => {
       
    const tableObsoleteType = document.getElementById('E4kTblProductPropertiesObsoleteTypematrixTable') 
    const statObsoletetype = tableObsoleteType.getState();

    //if (filterButtonClick && state.filtered && state.filtered.rowFilters) {
        if (statObsoletetype.filtered && statObsoletetype.filtered.rowFilters) {
        const filters = statObsoletetype.filtered.rowFilters;
        const filterColumns = [];
        const filterValues = [];
        
    
        filters.forEach(([column, filterInfo]) => {
            filterColumns.push(column);
            filterValues.push(filterInfo.filters.map(f => f.value.toUpperCase()));
        });
    
        const filteredRows = dataGridObsoleteType.filter(row => {
            return filterColumns.every((column, index) => {
                return filterValues[index].some(value => row[column].toUpperCase().includes(value));
            });
        });
         if (filteredRows.length > 0) {
                const firstRecord = filteredRows[0];
        
                const updatedDataGridObsoleteType = dataGridObsoleteType.map(row => {
                    const isMatch = filterColumns.every((column, index) => {
                        return filterValues[index].some(value => row[column].toUpperCase().includes(value));
                    });
        
                    if (isMatch) {
                        return {
                            ...row,
                            obsoleteID: firstRecord.obsoleteID,
                           
                           
                        };
                    }
                    return row;
                });


                const updatedDataGridobsoletematupdate = updatedDataGridObsoleteType.map((row, index) => {

                    tableObsoleteTypeRef.current.updateRow(index,row);


                })

        
                //setDataGridObsoleteType(updatedDataGridObsoleteType);
            } else {
                console.log('No rows found matching the filters.');
            }
        

    }else {

    if (filterColumnsObsoleteType.length === 0) {
        if (dataGridObsoleteType.length > 0) {
            //const firstRecord = dataGridObsoleteType[0];
            const firstRecord = tableObsoleteTypeRef.current.props.dataSource[0]

            const updatedDataGridObsoleteType = dataGridObsoleteType.map(row => {
                return {
                    ...row,
                    'obsoleteID': firstRecord['obsoleteID'],
                };
            });

            const updatedDataGridobsoletematupdate = updatedDataGridObsoleteType.map((row, index) => {

                tableObsoleteTypeRef.current.updateRow(index,row);


            })

            //setDataGridObsoleteType(updatedDataGridObsoleteType);
           

        } else {
            console.log('No rows found in the data grid.');
        }
        
     } 
    }
};

///////////////// Handle save buttonclick 
const handleSaveObsoleteType = () => {

    let update_Obsolete_Type_save = []

    const data_Obsolete_type  = dataGridObsoleteType.map(row => {

        if (row.obsoleteID.length > 1){
           //console.log(StockingTypeAllData.filter(stock => stock.description === row.stocktype),'Stock type update change = ')
            let Obsolete_type = (ObsoleteTypeAllData.filter(Obsolete => Obsolete.description === row.obsoleteID))[0].obsoleteid;
           // console.log(StockingTypeAllData.filter(stock => stock.description === row.stocktype),'Stock type update change = ', stock_type)
            row.obsoleteID = Number(Obsolete_type)
            return row;
        }else {
            return row;
        }

    })

    data_Obsolete_type.map(row => {
        update_Obsolete_Type_save.push(JSON.stringify(row))

    })
    
    let UpdateObsoletetype_save = {
            companyid: companyid,
            productid: ProductIDSelectObsolete.productid,
            "obslmatix": update_Obsolete_Type_save,
        };
        handleProductObsoletetypelevelUpdate(UpdateObsoletetype_save)

}


     /////////////// Product Stocking type update
 const handleProductObsoletetypelevelUpdate = async (category) => {
    try {
      const result = await updateProductObsoleteTypeMatrixlevel(category);
      if (result.error) {
        console.error('Mutation Error:', result.error);
      } else {
        console.log('Mutation Success:', result.data);
        if (result.data.E4kTblproductProductobsoletetypematrixUpdate.success === "Success") {
          toast.success('Obsolete type Updated', {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
          });
          
          
        } else {
          toast.error(result.data.E4kTblproductProductobsoletetypematrixUpdate.success, { position: "top-center" });
        }
      }
    } catch (error) {
      console.error('Mutation Error:', error);
    }
  };


  const handlecloseObsoleteType = () =>{
    setFilterrowObsoleteType(false);
    setFilterColumnsObsoleteType([])
    setFilterValuesObsoleteType([])
  
    handleCloseMediumObsoleteTypeMatrix()
  }

    const modalDialogclassNameObsolete = isMaximizedObsoleteType ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
        <Draggable>
            <div className={`modal fade ${showModalMediumObsoleteTypeMatrix ? 'in' : ''}`} style={{ display: showModalMediumObsoleteTypeMatrix ? 'block' : 'none' }}>
                <div className={modalDialogclassNameObsolete}>
                    <div className="modal-content medium-popup-div">
                        <div className="modal-body">
                            <div className="breadcomb-area">
                                <div className="container-fluid remove-padding">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="breadcomb-list">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className='popup-topbar-title'>
                                                            {ProductIDSelectObsolete.productid} - Obsolete Type
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                            <div className="breadcomb-wp">
                                                                <div className="breadcomb-ctn">
                                                                <span onClick={() => handleSaveObsoleteType()}><a href="#"> <i className="fa fa-check" ></i> Save</a></span>
                                                                </div>
                                                            </div>



                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                       

                                                        <div className='popup-top-rightdiv'>
                                                                <button type="button" className="btn-link" onClick={toggleMaximizeObsoleteType}>
                                                                {isMaximizedObsoleteType ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                                </button>
                                                                <button type="button" className="close" onClick={() => handlecloseObsoleteType()}>
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
                            <div className="breadcomb-area">
                                <div className="container-fluid remove-padding">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grid-flex">
                                            <div className="customer-newbold">{ProductIDSelectObsolete.productid} - Obsolete Type </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className='height-alignment'> 
                            <div className='popupmasterpage-topfield'>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    
                                </div>    
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className='form-group master-option button-right'>                                
                                        <span>
                                            <button className="btn alter-button" onClick={() => handleCopyFirstObsoleteType()} >Copy Frist</button>
                                        </span>
                                    </div>
                                </div>
                            </div>  




                            <div className="medium-modal-section">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            {ObsoleteTypematrixisLoading || ObsoleteTypecolmatrixisLoading ? (
                                                "Loading..."
                                            ) : (dataSourceObsoleteType.length > 0) ? (
                                                <Table
                                                    ref={tableObsoleteTypeRef}
                                                    id="E4kTblProductPropertiesObsoleteTypematrixTable"
                                                    dataSource={dataSourceObsoleteType}
                                                    freezeHeader
                                                    keyboardNavigation
                                                    columns={dataGridObsoleteTypecol}
                                                    editing
                                                    editMode={'row'}
                                                    filtering={true}
                                                    filterRow={showModalMediumObsoleteTypeMatrix ? true : filterRowObsoleteType}
                                                    //paging={true}
                                                    //pageIndex={0}
                                                    //pageSize={10}
                                                    sortMode='many'
                                                    onCellEndEdit={(e) => handleCellEditObsoleteType(e)}
                                                   // onFilter= {(e) => handleonFileterObsoleteType(e)}
                                                />
                                            ) : (null)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
        </>
    );
};

export default E4kTblProductPropertiesObsoleteTypeMatrix;

