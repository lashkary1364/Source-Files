import React, { useMemo, useCallback, useRef, useState, useEffect, useContext } from "react";
import {
    Container, Row, Col, Card, CardHeader, ListGroup,
    ListGroupItem, FormInput,
    Button,
} from "shards-react";

import { AgGridReact } from 'ag-grid-react';
import { AG_GRID_LOCALE_FA } from '../../constants/global'

import { GridDataEdit } from "./GridDataEdit";
import { GridDataDelete } from "./GridDataDelete";
import { GridDataDetail } from './GridDataDetail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CustomerContext from "./CustomeContexct";
import { faTrash } from "@fortawesome/fontawesome-free-solid";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

// import { TestList } from "./TestList";
export const CustomerList = ({ handleClick }) => {

    const productsContext = useContext(CustomerContext);

    const [rowValue, setRowValue] = useState({ Operation: "", Gold: "", Model: "", Price: 0 })

    const gridRef = useRef();
    const make = useRef();
    const [rowData, setRowData] = useState();

    const [columnDefs] = useState([
        {
            field: 'make', filter: 'agTextColumnFilter', headerName: 'Gold', headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
        },
        { field: 'model', filter: 'agTextColumnFilter', },
        { field: 'price', filter: 'agNumberColumnFilter', },
        {
            field: 'detail', headerName: 'جزییات', maxWidth: 80, resizable: false, cellRenderer: GridDataDetail ,cellRendererParams:
            {
                handleClick: handleClick
            }
            // p => <Button size="sm" theme="primary" className="mb-2 mr-1" title="جزئیات" onClick={event => handleClick("detail")} ><FontAwesomeIcon icon={faCircleInfo} /></Button>,
            // cellRendererParams: {
            //     color: "jjjjjj"
            // },
        },
        {
            field: 'edit', maxWidth: 80, headerName: 'ویرایش', cellRenderer: GridDataEdit,
            cellRendererParams:
            {
                handleClick: handleClick
            }
            //      p=> <Button size="sm" theme="warning" className="mb-2 mr-1"  title="ویرایش"  onClick={event => handleClick("edit")}><FontAwesomeIcon icon={faEdit} />
            // </Button>

        },
        {
            field: 'delete', maxWidth: 80, headerName: 'حذف', cellRenderer: GridDataDelete,
            cellRendererParams: {
                handleClick: handleClick
            },
            // p=>  <Button size="sm" theme="danger" className="mb-2 mr-1" title="حذف" onClick={event => handleClick("delete")}>  
            // <FontAwesomeIcon icon={faTrash} />
            // </Button> 

        }
        ,
        
      
        

    ])

    // const onSelectionChanged = useCallback(() => {
    //     // const selectedRows = gridRef.current.api.getSelectedRows();
    //     // console.log("selected:");
    //     // console.log(selectedRows);
    //     // document.querySelector('#selectedRows').innerHTML =
    //     //   selectedRows.length === 1 ? selectedRows[0].athlete : '';
    // }, []);


    const gridStyle = useMemo(() => ({ height: '600px', width: '100%', }), []);


    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/row-data.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData))
    }, []);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true,
        resizable: true,
        floatingFilter: true,
        wrapText: true,
        autoHeight: true,
        flex: 1,
        rowSelection:"single"

    }));

    const paginationNumberFormatter = useCallback((params) => {
        return '[' + params.value.toLocaleString() + ']';
    }, []);

    const onPageSizeChanged = useCallback(() => {
        var value = document.getElementById('page-size').value;
        gridRef.current.api.paginationSetPageSize(Number(value));
    }, []);

    const onQuickFilterChanged = useCallback(() => {
        gridRef.current.api.setQuickFilter(
            document.getElementById('quickFilter').value
        );
    }, []);


    function onRowSelected(event) {
        window.alert(
          'row ' + event.node.data.athlete + ' selected = ' + event.node.isSelected()
        );
      }
      
      function onSelectionChanged(event) {
        var rowCount = event.api.getSelectedNodes().length;
        window.alert('selection changed, ' + rowCount + ' rows selected');
      }
    // const onCellClicked = (params: CellClickedEvent) => {

    //     // console.log('Cell was clicked');
    //     // console.log(params)
    //     // console.log(params.data);
    //     // //make.current.value=params.data.make;
    //     // //formik.setFieldValue('title', params.data.make);
    //     // console.log("grid ref current")
    //     // console.log(params.data.make)
    //     // console.log(params.data.price)

    //     // // rowValue.Gold = params.data.make
    //     // // rowValue.Model = params.data.model
    //     // // rowValue.Price = params.data.price


    //     // productsContext.StateCrud="detail"
    //     // setRowValue({ Operation: "detail", Gold: params.data.make , Model: params.data.model, Price: params.data.price })

    //     // //CustomerContext.sta

    //     // // setRowValue({Operation:"" , Gold:params.data.make , Model:params.data.model , Price:params.data.price})

    //     // console.log("row value")
    //     // console.log(rowValue)
    // }


    return (
        <Row>
            {/* <Container fluid className="main-content-container px-4 mt-3 mb-3"> */}
            <Col lg="12" >
                <Card small className="mb-2">
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">لیست مشتریان</h6>
                    </CardHeader>
                    <div className="container-fluid">
                        <div className="ag-theme-alpine mb-5" style={gridStyle}>
                            <div className="example-wrapper">
                                <div className="form-inline m-2">
                                    <span className="mr-3">سایز صفحه</span>
                                    <select className="form-contro mr-5" onChange={onPageSizeChanged} id="page-size" defaultValue={10}>
                                        <option value="10" >10</option>
                                        <option value="100">100</option>
                                        <option value="500">500</option>
                                        <option value="1000">1000</option>
                                    </select>
                                    <input
                                        type="text"
                                        className="form-control mr-5"
                                        onInput={onQuickFilterChanged}
                                        id="quickFilter"
                                        placeholder="جستجو..."
                                    />
                                </div>
                            </div>

                            <AgGridReact direction="rtl" style={{ fontFamily: "IRANSans", height: '100%' }}
                                ref={gridRef}
                                rowSelection="multiple"
                                rowData={rowData} // Row Data for Rows
                                defaultColDef={defaultColDef}
                                enableRtl="true"
                                columnDefs={columnDefs}
                                localeText={AG_GRID_LOCALE_FA}
                                pivotPanelShow={'always'}
                                pagination={true}
                                paginationPageSize={10}
                                paginationNumberFormatter={paginationNumberFormatter}
                                alwaysShowBothConditions={true}
                                caseSensitive={false}
                                checkboxSelection={true}
                                animateRows={true}
                                onSelectionChanged={onSelectionChanged}
                                onRowSelected={onRowSelected} 
                             
                               //onCellClicked={onCellClicked}
                            >
                            </AgGridReact>
                        </div>
                    </div>
                </Card>
            </Col>
            {/* </Container> */}
        </Row>
    )
}
