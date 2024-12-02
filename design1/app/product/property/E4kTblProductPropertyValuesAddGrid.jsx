import { Grid } from 'smart-webcomponents-react/grid';
import { useSelector ,useDispatch} from 'react-redux';
import { useEffect, useState ,useRef,useMemo} from 'react';
import {  
  removeSelectProductPropertySize, 
  
  } from '../../store/slices/e4kTblProductPropertySizeRangeSelect';

import {removeSelectProductPropertyColour} from '../../store/slices/e4kTblProductPropertyColourSelect'

const E4kTblProductPropertyValuesAddGrid = ({property}) => {

  const ProductAddPropertyColour = useSelector((state) => state.selectProductAddPropertyColour.selectProductPropertyColour);
  const ProductAddPropertySize = useSelector((state) => state.selectProductAddPropertySize.selectProductPropertySize);
  const gridPropertyValueColour = useRef(null);
  const gridPropertyValueSize = useRef(null);
  const gridPropertyValueFit = useRef(null);

  const [dataselectColour,setDataSelectColour] = useState([])
  const [dataselectSize,setDataSelectSize] = useState([])
    const [dataselect,setDataSelect] = useState([
        {"values":1},
        {"values":2},
        {"values":3},
    ])

    
  //////////////// Use dispatch only for delete 
  const dispatch_Property = useDispatch();

  useEffect(() => {
    if(ProductAddPropertyColour){
      const Data = ProductAddPropertyColour.map(prop => ({
        "colourid": prop.colourid

      }))

      
      setDataSelectColour(Data)

    }
  }, [ProductAddPropertyColour]);

  useEffect(() => {
    if(ProductAddPropertySize){
      const Data = ProductAddPropertySize.map(prop => ({
        "values": prop.values

      }))

      
      setDataSelectSize(Data)

    }
  }, [ProductAddPropertySize]);

  /////////////// Editing Grid 
  // useEffect(() => {
  //       window.commandColumnCustomCommandPropertyValuesAdd = function (row) {
  //         console.log("Successfully selected", row.data);
         
  //         if(gridPropertyValueSize.current!==undefined){
  //           console.log("Successfully selected Size = ", gridPropertyValueSize.current.props.dataSource);
  //           dispatch_Property(removeSelectProductPropertySize(row.data.values));
  //         }
  //         else if(gridPropertyValueColour.current!==undefined){
  //           console.log("Successfully selected Colour = ", gridPropertyValueColour.current.props.dataSource);
  //           dispatch_Property(removeSelectProductPropertyColour({colourid: row.data.colourid}));
  //         }
          
  //     };
  // }, [property]);

    const sorting = {
		enabled: true
	};

  

  const dataSource = useMemo(() => dataselect, [dataselect]);
  //const dataSourceColour = useMemo(() => dataselectColour, [dataselectColour]);
  const dataSourceColour = useMemo(() => new Smart.DataAdapter({
    dataSource: dataselectColour,
    dataFields: [
      
      'colourid: string',
      
    ],
  }), [dataselectColour]);

  const dataSourceSize = useMemo(() => new Smart.DataAdapter({
    dataSource: dataselectSize,
    dataFields: [
      
      'values: string',
      
    ],
  }), [dataselectSize]);

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

    //////////////// Editing
    const editing =  {
      enabled: true,
      mode:'row',
      addNewRow: {
          visible: true,
          position: 'near'
      },
      commandColumn: {
          visible: true,
          dataSource: {
              'commandColumnDelete': { visible: true },
              'commandColumnEdit': { visible: false },
              //'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommandPropertyValuesAdd', visible: true, label: '' },
          },
      },
  }

  const columns = [
  
    {
      label: `${property} Values`,
      dataField: 'values',
      
    }
  ]
    const columnsColour = [
  
      {
        label: 'ColourID',
        dataField: 'colourid',
        
      }
  ];

  const handlePropertyValuesGridChange = (event) => {
    event.preventDefault();
    console.log('Row data:', event.detail.data);
    console.log('Change grid data@@@@@@@@@@@@',gridPropertyValueColour.current)
    console.log('Change grid@@@@@@@@@@@@@@',gridPropertyValueSize.current)
  }

   
    return (
        <>
            

{property === 'Colour' ? (
        <Grid
          id={`E4kTblProductPropertyValueGridColour`}
          ref={gridPropertyValueColour}
          dataSource={dataSourceColour}
          sorting={sorting}
          behavior={behavior}
          appearance={appearance}
          columns={columnsColour}
          filtering={filtering}
          editing={editing}
          onEndEdit={handlePropertyValuesGridChange}
        />
      ) : property === 'Size' ? (
        <Grid
          id={`E4kTblProductPropertyValueGridSize`}
          ref={gridPropertyValueSize}
          dataSource={dataSourceSize}
          sorting={sorting}
          behavior={behavior}
          appearance={appearance}
          columns={columns}
          filtering={filtering}
          editing={editing}
          onEndEdit={handlePropertyValuesGridChange}
        />
      ) : (
        <Grid
          id={`E4kTblProductPropertyValueGridFit`}
          ref={gridPropertyValueFit}
          dataSource={dataSource}
          sorting={sorting}
          behavior={behavior}
          appearance={appearance}
          columns={columns}
          filtering={filtering}
          editing={editing}
          onEndEdit={handlePropertyValuesGridChange}
        />
      )}
        </>
  )
}

export default E4kTblProductPropertyValuesAddGrid