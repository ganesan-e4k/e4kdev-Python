// import { useEffect, useState } from 'react';
// import { Smart, Grid } from 'smart-webcomponents-react/grid';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchProduct } from '../store/slices/productSlice';

// const ProductGrid = () => {
//   const [data, setData] = useState([]);
//   const dispatch = useDispatch();
//   const items = useSelector((state) => state.data.items);
//   const status = useSelector((state) => state.data.status);
//   const error = useSelector((state) => state.data.error);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchProduct({ companyid: '001', productid: '', first: 1000, skip: 0 }));
//     }
//   }, [status, dispatch]);

//   useEffect(() => {
//     if (status === 'succeeded') {
//       const processedData = items.map(item => ({
//         productid: item.productid,
//                 description: item.description,
//                 category1id: item.category1id?.description,
//                 category2id: item.category2id?.description,
//                 category3id: item.category3id?.description,
//                 weight: item.weight,
//                 classid: item.classid?.description,
//                 commodityCode: item.commodityCode?.description,
//                 issueuom: item.issueuom?.description,
//                 notes: item.notes,
//                 obsoleteClass: item.obsoleteClass?.description,
//                 styleimage: item.styleimage,
//                 supplimentaryunits: item.supplimentaryunits,
//                 batchcontrol: item.batchcontrol,
//                 live: item.live,
//                 stockingtype: item.stockingtype?.description,
//                 country: item.countryid?.country,
//       }));
//       setData(processedData);
//     }
//   }, [items, status]);

//   const dataSource = new Smart.DataAdapter({
//     dataSource: data,
//     dataFields: [
//       'productid: string',
//       'description: string',
//       'category1id: string',
//       'category2id: string',
//       'category3id: string',
//       'weight: number',
//       'classid: string',
//       'commodityCode: string',
//       'issueuom: string',
//       'notes: string',
//       'obsoleteClass: string',
//       'styleimage: string',
//       'supplimentaryunits: string',
//       'batchcontrol: string',
//       'live: bool',
//       'stockingtype: string',
//       'country: string',
//     ],
//   });

//   const columns = [
//     { label: 'Product ID', dataField: 'productid', width: 150, freeze: 'near' },
//     { label: 'Description', dataField: 'description', width: 150 },
//     { label: 'Category 1', dataField: 'category1id', width: 120 },
//     { label: 'Category 2', dataField: 'category2id', width: 120 },
//     { label: 'Category 3', dataField: 'category3id', width: 110 },
//     { label: 'Weight', dataField: 'weight', width: 100,visible:false,},
//     { label: 'Class', dataField: 'classid', width: 100 },
//     { label: 'Commodity Code', dataField: 'commodityCode', width: 130 },
//     { label: 'Issue UOM', dataField: 'issueuom', width: 100,visible:false, },
//     { label: 'Notes', dataField: 'notes',visible:false, },
//     { label: 'Obsolete Class', dataField: 'obsoleteClass',width: 150 },
//     { label: 'Style Image', dataField: 'styleimage',visible:false, },
//     { label: 'Supplimentary Units', dataField: 'supplimentaryunits',visible:false,},
//     { label: 'Batch Control', dataField: 'batchcontrol' ,visible:false,},
//     { label: 'Live', dataField: 'live', width: 50 ,visible:false,},
//     { label: 'Stocking Type', dataField: 'stockingtype', width: 50,visible:false, },
//     { label: 'Country', dataField: 'country', width: 100 },
//   ];

//   const behavior = {
//     columnResizeMode: 'growAndShrink',
//   };

//   const filtering = {
//     enabled: true,
//     filterRow: {
//       visible: true,
//     },
//   };

//   const appearance = {
//     alternationCount: 2,
//     showRowHeader: true,
//   };

//   const paging = {
//     enabled: true,
//     pageSize: 50,
//   };

//   const pager = {
//     visible: true,
//   };

//   const sorting = {
//     enabled: true,
//   };

//   const editing = {
//     enabled: false,
//   };

//   const selection = {
//     enabled: true,
//     allowCellSelection: true,
//     allowRowHeaderSelection: true,
//     allowColumnHeaderSelection: true,
//     mode: 'extended',
//   };

//   const header = {
//     visible: true,
//     //buttons: ['columns', 'filter', 'sort', 'delete', 'search','groups']
//   };

//   const grouping = {
//     enabled: true,
//   };

//   return (
//     <>
//       <Grid
//         header={header}
//         dataSource={dataSource}
//         columns={columns}
//         appearance={appearance}
//         behavior={behavior}
//         selection={selection}
//         paging={paging}
//         pager={pager}
//         sorting={sorting}
//         editing={editing}
//         filtering={filtering}
//         grouping={grouping}
//         className="lg w-full"
//       />
//     </>
//   );
// };

// export default ProductGrid;

import { useEffect, useState } from 'react';
import { Smart, Grid } from 'smart-webcomponents-react/grid';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductpage } from '../store/slices/productSlicePagination';

const ProductGridPagination = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.data.items);
  const status = useSelector((state) => state.data.status);
  const endcursor = useSelector((state) => state.data.endCursor);
  const hasnextpage = useSelector((state) => state.data.hasNextPage);
  
  const error = useSelector((state) => state.data.error);
  const CompanyProductGrid = useSelector((state) => state.selectCompanyid.Companyid);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductpage({ after: '', companyid: CompanyProductGrid, first: 1000 }));
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      if (items) {
        
        console.log(endcursor,'###########################product')
        const processedData_ = items.map(item => ({
            productid: item.productid,
                    description: item.description,
                    category1id: item.category1id?.description,
                    category2id: item.category2id?.description,
                    category3id: item.category3id?.description,
                    weight: item.weight,
                    classid: item.classid?.description,
                    commodityCode: item.commodityCode?.description,
                    issueuom: item.issueuom?.description,
                    notes: item.notes,
                    obsoleteClass: item.obsoleteClass?.description,
                    styleimage: item.styleimage,
                    supplimentaryunits: item.supplimentaryunits,
                    batchcontrol: item.batchcontrol,
                    live: item.live,
                    stockingtype: item.stockingtype?.description,
                    country: item.countryid?.country,
          }));
          setData(processedData_);
      }
    }
  }, [endcursor,items, status]);
  

  const dataSource = new Smart.DataAdapter({
    dataSource: data,
    dataFields: [
      'productid: string',
      'description: string',
      'category1id: string',
      'category2id: string',
      'category3id: string',
      'weight: number',
      'classid: string',
      'commodityCode: string',
      'issueuom: string',
      'notes: string',
      'obsoleteClass: string',
      'styleimage: string',
      'supplimentaryunits: string',
      'batchcontrol: string',
      'live: bool',
      'stockingtype: string',
      'country: string',
    ],
  });

  const columns = [
    { label: 'Product ID', dataField: 'productid', width: 150, freeze: 'near' },
    { label: 'Description', dataField: 'description', width: 150 },
    { label: 'Category 1', dataField: 'category1id', width: 120 },
    { label: 'Category 2', dataField: 'category2id', width: 120 },
    { label: 'Category 3', dataField: 'category3id', width: 110 },
    { label: 'Weight', dataField: 'weight', width: 100,visible:false,},
    { label: 'Class', dataField: 'classid', width: 100 },
    { label: 'Commodity Code', dataField: 'commodityCode', width: 130 },
    { label: 'Issue UOM', dataField: 'issueuom', width: 100,visible:false, },
    { label: 'Notes', dataField: 'notes',visible:false, },
    { label: 'Obsolete Class', dataField: 'obsoleteClass',width: 150 },
    { label: 'Style Image', dataField: 'styleimage',visible:false, },
    { label: 'Supplimentary Units', dataField: 'supplimentaryunits',visible:false,},
    { label: 'Batch Control', dataField: 'batchcontrol' ,visible:false,},
    { label: 'Live', dataField: 'live', width: 50 ,visible:false,},
    { label: 'Stocking Type', dataField: 'stockingtype', width: 50,visible:false, },
    { label: 'Country', dataField: 'country', width: 100 },
  ];

  const behavior = {
    columnResizeMode: 'growAndShrink',
  };

  const filtering = {
    enabled: true,
    filterRow: {
      visible: true,
    },
  };

  const appearance = {
    alternationCount: 2,
    showRowHeader: true,
  };

  const paging = {
    enabled: true,
    pageSize: 50,
  };

  const pager = {
    visible: true,
  };

  const sorting = {
    enabled: true,
  };

  const editing = {
    enabled: false,
  };

  const selection = {
    enabled: true,
    allowCellSelection: true,
    allowRowHeaderSelection: true,
    allowColumnHeaderSelection: true,
    mode: 'extended',
  };

  const header = {
    visible: true,
    //buttons: ['columns', 'filter', 'sort', 'delete', 'search','groups']
  };

  const grouping = {
    enabled: true,
  };
  const fetchMoreProducts = () => {
    dispatch(fetchProductpage({ after: endcursor, companyid: CompanyProductGrid, first: 1000 }));
  };

  return (
    <>
     <div>
      {hasnextpage && <button onClick={() => fetchMoreProducts()}>Load More</button>}
    </div>
      <Grid
        header={header}
        dataSource={dataSource}
        columns={columns}
        appearance={appearance}
        behavior={behavior}
        selection={selection}
        paging={paging}
        pager={pager}
        sorting={sorting}
        editing={editing}
        filtering={filtering}
        grouping={grouping}
        className="lg w-full"
      />
      
    </>
  );
};

export default ProductGridPagination;

