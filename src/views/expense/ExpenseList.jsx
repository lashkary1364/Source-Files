import React, { useMemo, useCallback, useRef, useState, useEffect } from "react";
import {
  Container, Row, Col, Card, FormSelect,
  CardBody
} from "shards-react";
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react';
import { AG_GRID_LOCALE_FA } from '../../constants/global'
import {  useHistory } from "react-router-dom";


export const ExpenseList = () => {

  const history = useHistory();
  const [selectedRow, setSelectedRow] = useState();
  const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
  const [user] = useState(JSON.parse(sessionStorage.getItem("LoginTocken")));
  const [tankhahItems, setTankhahItems] = useState([]);
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    {
      field: 'index', filter: 'agTextColumnFilter', headerName: 'ردیف', headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    { field: 'shomare', headerName: 'شماره', },
    { field: 'sharh', headerName: 'شرح', },
    { field: 'tarikh', headerName: 'تاریخ', },
    { field: 'str_status', headerName: 'وضعیت', },
    { field: 'shomare_name', headerName: 'شماره نامه', filter: 'agNumberColumnFilter', },
    { field: 'tarikh_name', headerName: 'تاریخ نامه', filter: 'agNumberColumnFilter', },
    { field: 'sanadID', headerName: 'شماره سند', filter: 'agNumberColumnFilter', },
 
  ]);

  const gridStyle = useMemo(() => ({ height: '600px', width: '100%', }), []);

  const getAllData = (tankhahId) => {

    console.log("tankhahId: " + tankhahId);
    console.log( 'salId'+ sessionStorage.getItem("SalMali"))
    axios({
      'method': 'GET',
      'url': serverAdress + 'GetAllTankhahHazine',
      'headers': {
        Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      'params': {
        'tankhahId': tankhahId,
        'salId': sessionStorage.getItem("SalMali")
      },
    }).then(function (response) {
      console.log("response for getAllData")
      console.log(response);
      console.table(response.data);
      setRowData(response.data);
      console.log("row data ===>");
      console.table(rowData);
    }).catch(function (error) {
      console.log("axois error: " + error);
      alert(error);
    })
  }

  const getAllTankhah = () => {

    axios(
      {
        url: serverAdress + `GetAllTankhah?userId=${user.UserId}`,
        method: "get",
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }).then(function (response) {

        console.log("get all tankhah ...")
        const resultItems = response.data;
        resultItems.map(data => {
          setTankhahItems(tankhahItems => [...tankhahItems, { tankhah_name: data.tankhah_name, tankhah_ID: data.tankhah_ID , shomare_name:data.shomare_name , tarikh_name:data.tarikh_name , sanadID:data.sanadID }]);
        });

      }).catch(function (error) {
        // handle error
        console.log("axois error: ");
        console.log(error);
        alert(error);
      })
  }

  useEffect(() => {
   getAllTankhah();
  }, []);

  //DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    // resizable: true,
    // floatingFilter: true,
    wrapText: true,
    autoHeight: true,
    flex: 1,
    rowSelection: 'single'
    //width: 100,
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

  const handleAdd = () => {
    history.push("/expense?operation=add");
  }

  const handleEdit = () => {
    console.log("selectedRow")
    console.log(selectedRow)
    if (selectedRow == null || selectedRow == undefined) {
      alert("یک ردیف انتخاب کنید")
      return;
    }
    history.push("/expense?id=" + selectedRow.soratID + "&operation=edit")
  }

  const handleDetail = () => {
    console.log("selectedRow")
    console.log(selectedRow)
    if (selectedRow == null || selectedRow == undefined) {
      alert("یک ردیف انتخاب کنید")
      return;
    }
    history.push("/expenceDetail?id=" + selectedRow.soratID + "&operation=detail")
  }

  const handleDelete = () => {
    console.log("selectedRow")
    console.log(selectedRow)
    if (selectedRow == null || selectedRow == undefined) {
      alert("یک ردیف انتخاب کنید")
      return;
    }
    history.push("/expense?id=" + selectedRow.soratID + "&operation=delete")
  }

  function onRowSelected(event) {
    setSelectedRow(event.data)
    console.log(selectedRow)
  }

  // function onSelectionChanged(event) {
  //   // var rowCount = event.api.getSelectedNodes().length;
  //   // window.alert('selection changed, ' + rowCount + ' rows selected');
  // }

  return (
    <Container fluid className="main-content-container">
      <Row className="page-header mt-2 ">
        <Col lg="12" >
          <nav className="breadcrumb">
          <a className="breadcrumb-item" href="/home">خانه</a>
            <span className="breadcrumb-item active">مدیریت صورت هزینه ها</span>
          </nav>
        </Col>
      </Row>
      <Card small className="h-100">
        <CardBody className="pt-0">
          <Row>
            <Col md="6" className="form-group">
              <div className="form-inline mt-3 mr-3">
                <label htmlFor="tankhah" className="mr-2"> انتخاب تنخواه*:</label>
                <FormSelect className="form-control" id="tankhah" name="tankhah" onChange={(e) => getAllData(e.target.value)}>
                  <option value={""}>یک موردانتخاب کنید</option>
                    {
                    tankhahItems.map((item, index) => (
                      <option key={index}
                        value={item.tankhah_ID}>
                        {item.tankhah_name}
                      </option>
                    ))
                  }
                </FormSelect>

              </div>
            </Col>
          </Row>

          <div style={{ borderStyle: "solid", padding: "5px", borderColor: "#d9d9d9" }}>
              <div className="btn-group mb-2" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-secondary" onClick={handleAdd}>جدید</button>
              <button type="button" className="btn btn-secondary" onClick={handleEdit}>ویرایش</button>
              <button type="button" className="btn btn-secondary" onClick={handleDetail}>جزئیات</button>
              <button type="button" className="btn btn-secondary" onClick={handleDelete}>حذف</button>
            </div>

            <div className="ag-theme-alpine mb-5" style={gridStyle}>
              <div className="example-wrapper">
                <div className="form-inline mb-2">
                  <span >سایز صفحه:</span>
                  <select className="form-contro ml-2" onChange={onPageSizeChanged} id="page-size" defaultValue={5}>
                    <option value="5" >5</option>
                    <option value="10" >10</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                  </select>
                  <input
                    type="text"
                    className="form-control ml-2"
                    onInput={onQuickFilterChanged}
                    id="quickFilter"
                    placeholder="جستجو..."
                  />
                </div>
              </div>

              <AgGridReact id="ExpenseListGrid" direction="rtl" style={{ fontFamily: "IRANSans", height: '100%' }}
                ref={gridRef}
                rowData={rowData} // Row Data for Rows
                defaultColDef={defaultColDef}
                enableRtl="true"
                columnDefs={columnDefs}
                localeText={AG_GRID_LOCALE_FA}
                pivotPanelShow={'always'}
                pagination={true}
                paginationPageSize={5}
                paginationNumberFormatter={paginationNumberFormatter}
                alwaysShowBothConditions={true}
                caseSensitive={false}
                checkboxSelection={true}
                animateRows={true}
               // onSelectionChanged={onSelectionChanged}
                onRowSelected={onRowSelected}
              // onCellClicked={onCellClicked}
              >
              </AgGridReact>

            </div>
          </div>

        </CardBody>
      </Card>


    </Container>

  )

}
