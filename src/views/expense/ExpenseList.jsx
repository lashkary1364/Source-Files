import React, { useMemo, useCallback, useRef, useState, useEffect } from "react";
import {
  Container, Row, Col, Card, FormSelect,
  CardBody
} from "shards-react";
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react';
import { AG_GRID_LOCALE_FA } from '../../constants/global'
import { useHistory } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/view-css.css';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_en from "react-date-object/locales/persian_fa"

export const ExpenseList = () => {

  const history = useHistory();
  const [selectedRow, setSelectedRow] = useState();
  const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
  const [user] = useState(JSON.parse(sessionStorage.getItem("LoginTocken")));
  const [tankhahItems, setTankhahItems] = useState([]);
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [ids, setIds] = useState([]);
  const [listId, setListId] = useState("");
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
  const calendarRef = useRef();
  const [state, setState] = useState(new DateObject({ calendar: persian, locale: persian_en }))
  const date = new DateObject({ calendar: persian, locale: persian_en })
  const convert = (date, format = state.format) => {
    console.log("convert....")
    console.log(date.format)
    console.log(state)
    console.log(format)
    let object = { date, format }
    console.log("object")
    console.log(object)
    setState(new DateObject(object).convert(persian, persian_en).format())
    console.log("state ... ")
    console.log(new DateObject(object).convert(persian, persian_en).format())
    setDateHeader(new DateObject(object).convert(persian, persian_en).format())

  }
  const [dateHeader, setDateHeader] = useState(date.format());
  const gridStyle = useMemo(() => ({ height: '600px', width: '100%', }), []);
  const getAllData = (tankhahId) => {

    console.log("tankhahId: " + tankhahId);
    console.log('salId' + sessionStorage.getItem("SalMali"))
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
          setTankhahItems(tankhahItems => [...tankhahItems, { tankhah_name: data.tankhah_name, tankhah_ID: data.tankhah_ID, shomare_name: data.shomare_name, tarikh_name: data.tarikh_name, sanadID: data.sanadID }]);
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
    rowSelection: 'multiple'
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
      swal("خطا","لطفا یک ردیف انتخاب نمایید" , "warning")
      return;
    }
    if(selectedRow.length>1){
      swal("خطا","تعداد ردیف های انتخابی برای حذف بیشتر از یک ردیف میباشد" , "warning");
      return;
    }
    history.push("/expense?id=" + selectedRow[0].soratID + "&operation=edit")
  }

  const handleDetail = () => {
    console.log("selectedRow")
    console.log(selectedRow)
    if (selectedRow == null || selectedRow == undefined) {
      swal("خطا","لطفا یک ردیف انتخاب نمایید" , "warning")
      return;
    }
    if(selectedRow.length>1){
      swal("خطا","تعداد ردیف های انتخابی برای حذف بیشتر از یک ردیف میباشد" , "warning");
      return;
    }

    history.push("/expenceDetail?id=" + selectedRow[0].soratID + "&operation=detail")
  }

  const handleDelete = () => {
   
  
    if (selectedRow == null || selectedRow == undefined || selectedRow.length==0) {
      swal("خطا","لطفا یک ردیف انتخاب نمایید" , "warning")
      return;
    }
    if(selectedRow.length>1){
      swal("خطا","تعداد ردیف های انتخابی برای حذف بیشتر از یک ردیف میباشد" , "warning");
      return;
    }
    history.push("/expense?id=" + selectedRow[0].soratID + "&operation=delete")
  }

  const handleSodoreName = () => {
    console.log("sodore name ....")
    console.log(selectedRow);
    console.log(ids);
    console.log(listId);

    axios(
      {
        url: serverAdress + `GetAllShomareName?list=${listId}`,
        method: "get",
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }).then(function (response) {
        console.log("get all tankhah ...");
        const resultItems = response.data;
        if (resultItems.length > 0) {
          swal("بعضی از صورت هزینه های انتخابی دارای شماره نامه میباشند ابتدا نامه ها را باطل کنید");
          return;
        } else {

          history.push("/sodorename?listId=" + listId+"&tarikh="+dateHeader);
        }
        // resultItems.map(data => {
        //   setTankhahItems(tankhahItems => [...tankhahItems, { tankhah_name: data.tankhah_name, tankhah_ID: data.tankhah_ID, shomare_name: data.shomare_name, tarikh_name: data.tarikh_name, sanadID: data.sanadID }]);
        // });

      }).catch(function (error) {
        // handle error
        console.log("axois error: ");
        console.log(error);
        swal("Error", error.message, "error");
      })

  }

  const handleEbtaleName = () => {

    axios(
      {
        url: serverAdress + `AllowEbtalName?list=${listId}`,
        method: "get",
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }).then(function (response) {
        console.log("Allow Ebtal Name ...");
        const resultItems = response.data;
        if (resultItems.length > 0) {
          swal("بعضی از صورت هزینه های انتخابی در وضعیت تایید شده هستند و قابل برگشت نمیباشند");
          return;
        } else {
          BargashtName();
        }
        // resultItems.map(data => {
        //   setTankhahItems(tankhahItems => [...tankhahItems, { tankhah_name: data.tankhah_name, tankhah_ID: data.tankhah_ID, shomare_name: data.shomare_name, tarikh_name: data.tarikh_name, sanadID: data.sanadID }]);
        // });

      }).catch(error => {
        console.log("axois error: ");
        console.log(error);
        swal("Error", error.message, "error");
        return;
      }
      )

  }

  const BargashtName = () => {
    axios(
      {
        url: serverAdress + `EbtalName?list=${listId}`,
        method: "post",
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }).then(function (response) {
        console.log("bargasht Name ...");
        toast.success('عملیات با موفقیت انجام پذیرفت', {
          position: toast.POSITION.TOP_LEFT,
          className: 'toast-message'
        });


      }).catch(function (error) {
        // handle error
        console.log("axois error: ");
        console.log(error);
        swal("Error", error.message, "error");
      });




  }


  function onSelectionChanged(event) {
    var selected = event.api.getSelectedNodes();
    console.log(selected);
    setSelectedRow([]);
    setIds([]);
    var idStr = "";
    for (var i = 0; i < selected.length; i++) {
      console.log(selected[i].data)
      setSelectedRow(selectedRow => [...selectedRow, selected[i].data]);
      setIds(ids => [...ids, selected[i].data.soratID]);
      idStr += selected[i].data.soratID;
      if (i != selected.length - 1) {
        idStr += ",";
      }
    }

    console.log(idStr);
    setListId(idStr);

  }

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


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
              <button type="button" className="btn btn-secondary" onClick={toggle}>صدور نامه تحویل</button>
              <button type="button" className="btn btn-secondary" onClick={handleEbtaleName}>ابطال نامه تحویل</button>
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
                rowSelection='multiple'
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
                onSelectionChanged={onSelectionChanged}
              //onRowSelected={onRowSelected}
              // onCellClicked={onCellClicked}
              >
              </AgGridReact>
            </div>
          </div>
        </CardBody>
      </Card>
      <ToastContainer />
      <Modal isOpen={modal} toggle={toggle} dir="rtl" >
        <ModalHeader toggle={toggle}>صدور نامه تحویل</ModalHeader>
        <ModalBody>
          <label>تاریخ نامه:</label>
          <DatePicker inputClass='form-control ml-2'
            ref={calendarRef}
            calendar={persian}
            locale={persian_en}
            format={"YYYY/MM/DD"}
            value={state}
            onChange={convert}
            id="tarikh" name="tarikh"
            calendarPosition="bottom-right"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSodoreName}>
            چاپ
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            لغو
          </Button>
        </ModalFooter>
      </Modal>
    </Container>

  )

}
