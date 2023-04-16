import React, { useMemo, useCallback, useRef, useState, useEffect } from "react";
import { Card, CardHeader} from "shards-react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CellRenderer from './CellRender';
import DetailTest from "./DetailTest";
import DeleteTest from "./DeleteTest";
import { AG_GRID_LOCALE_FA } from '../constants/global'
import '../../src/login/css/fontiran.css'
import '../assets/ag-grid.css'

export const TestList = () => {

    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [columnDefs] = useState([
        {
            field: 'make', filter: 'agTextColumnFilter', headerName: 'Gold', headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
        },
        { field: 'model', filter: 'agTextColumnFilter', },
        { field: 'price', filter: 'agNumberColumnFilter', },

        { field: 'Detail', headerName: 'جزییات', maxWidth: 80, resizable: false, cellRenderer: DetailTest, },
        { field: 'Edit', maxWidth: 80, headerName: 'ویرایش', cellRenderer: CellRenderer },
        { field: 'Delete', maxWidth: 80, headerName: 'حذف', cellRenderer: DeleteTest }

    ])

    const onSelectionChanged = useCallback(() => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        console.log("selected:");
        console.log(selectedRows);
        // document.querySelector('#selectedRows').innerHTML =
        //   selectedRows.length === 1 ? selectedRows[0].athlete : '';
    }, []);


    const gridStyle = useMemo(() => ({ height: '500px', width: '100%', }), []);


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

    return (
        <Card small className="mb-2">
            <CardHeader className="border-bottom">
                <h6 className="m-0">لیست تحصیلات</h6>
            </CardHeader>
            <div className="container-fluid">
                <div className="ag-theme-alpine mb-10" style={gridStyle}>
                    <div className="example-wrapper">
                        <div className="form-inline m-2">
                            <span className="mr-3">سایز صفحه</span>
                            <select className="form-contro mr-5" onChange={onPageSizeChanged} id="page-size">
                                <option value="10" selected={true}>
                                    10
                                </option>
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

                    <AgGridReact direction="rtl" style={{ fontFamily: "IRANSans", height: '90%' }}
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
                    >
                    </AgGridReact>
                </div>


            </div>
        </Card>
    )
}
