import React, { useMemo, useCallback, useRef, useState, useEffect } from "react";
import {
  Row, Col,
} from "shards-react";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { AG_GRID_LOCALE_FA } from '../../constants/global'
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/view-css.css';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { faSubscript, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import swal from "sweetalert";
import { Rowing } from "@material-ui/icons";



export const ExpenseDetailList = ({ gridData, editDetail, handleNew, deleteSouratHazineDetail }) => {

  const [sumPrice, setSumPrice] = useState(0);
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState();
  const [isAction, setIsAction] = useState(false);
  const history = useHistory();
  const [selectedRow, setSelectedRow] = useState();
  const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    {
      field: 'ID', filter: 'agTextColumnFilter', headerName: 'ردیف', headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    { field: 'ShomareBarge', headerName: 'شماره فاکتور', },
    { field: 'TarikhPardakht', headerName: 'تاریخ پرداخت', },
    { field: 'Mablagh1', headerName: 'مبلغ', },
    { field: 'Sharh', headerName: 'شرح', },
    { field: 'State', hide: true },
    { field: 'Tozihat', headerName: 'توضیحات', },
    { field: 'okDesc', headerName: 'وضعیت', },
  ]);

  useEffect(() => {
    setRowData([]);
    let p = 0;

    gridData.map((data, index) => {
      p = p + data?.Mablagh;
      setSumPrice()
      setRowData(rowData => [...rowData, {
        "ID": data?.ID,
        "RowIndex": index,
        "ShomareBarge": data?.ShomareBarge,
        "TarikhPardakht": data?.TarikhPardakht,
        "Mablagh1": data?.Mablagh.toLocaleString(),
        "Mablagh": data?.Mablagh,
        "CodeHesab": data?.CodeHesab,
        "Mrkaz1Code": data?.Mrkaz1Code,
        "Mrkaz2Code": data?.Mrkaz2Code,
        "Mrkaz3Code": data?.Mrkaz3Code,
        "Sharh": data?.Sharh,
        "SoratID": data?.SoratID,
        "Tozihat": data?.Tozihat,
        "item_ID": data?.item_ID,
        "State": data?.State,
        "ok": data?.ok,// == 0 ? 'بررسی نشده' : data?.ok == 1 ? 'تایید شده' : 'رد شده'
        "okDesc": data?.okDesc,
        "sumPrice": data?.sumPrice
      }]);
    });

    setSumPrice(p);
  }, [gridData]);

  useEffect(() => {
    getWindowDimensions();
  });

  const gridStyle = useMemo(() => ({ height: '600px', width: '100%', }), []);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    // resizable: true,
    //  floatingFilter: true,
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

  const handleSaveDetail = () => {

    //setIsAction(true);
    if (gridData.length == 0) {
      swal("توجه", "ردیفی ثبت نشده است", "error");
      setIsAction(false);
      return;
    }

    const newRow = rowData.filter(m => m.State == 0);

    axios(
      {
        url: serverAdress + "InsertSoratHazineDetail",
        method: "post",
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
          'Content-Type': 'application/json',
        },
        data: newRow,
      }).then(function (response) {

        toast.success('عملیات با موفقیت انجام پذیرفت', {
          position: toast.POSITION.TOP_LEFT,
          className: 'toast-message'
        });

        setTimeout(() => {
          setIsAction(false);
          history.push("/expencelist");
        }, 1000);

      }).catch(function (error) {
        if (error.response.status == 401) {
          window.location.replace('/');
          return;
        }
        setIsAction(false);
        swal("خطای " + error.response.status, error.response.data, "error");

      })

  }

  const onSelectionChanged = useCallback(() => {
    var selectedRows = gridRef.current.api.getSelectedRows();
    setSelectedRow(selectedRows[0]);
  });

  const handleDelete = () => {
    console.log(selectedRow.SoratID);

    if (selectedRow.ok != 0) {
      swal("توجه", "این سند قابل حذف نیست", "warning");
      return;
    }

    axios(
      {
        url: serverAdress + `GetAllShomareName?list=${selectedRow.SoratID}`,
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
        if (resultItems > 0) {
          swal("توجه", "برای این سند نامه صادر شده است و قابل حذف نمیباشد", "warning");
          return;
        } else {
          swal({
            title: "آیا از حذف اطمینان دارید؟",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {

              if (visible) {
                gridRef.current.api.redrawRows();
                gridRef.current.api.redrawRows({ rowNodes: rowData });
              }
              deleteSouratHazineDetail(selectedRow.ID);
            }
            else {
            }
          });

        }
      }).catch(function (error) {
        if (error.response.status == 401) {
          window.location.replace('/');
          return;
        }
        // handle error
        console.log("axois error: ");
        console.log(error);
        swal("خطای " + error.response.status, error.response.data, "error");

      });
  }

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    console.log({
      width,
      height
    });

    if (width <= 500) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    return {
      width,
      height
    };

  }

  window.addEventListener('resize', function () {
    setTimeout(function () {
      if (window.innerWidth <= 500) {
        //alert("window resize .....");
        // gridOptions.setColumnDefs(mobileColumn);
        // params.api.sizeColumnsToFit();

        setVisible(false);
      } else {
        setVisible(true);
      }


    })
  });

  const handelChangeSoratId = (item) => {

    console.log(item);
    setSelectedRow([]);
    setSelectedRow(item);
    console.log("checked ....");
    console.log("selectedRow");
    console.log(selectedRow);
    setSelected((prev) => (item === prev ? null : item));

  }



  return (
    <Row>
      <Col lg="12" >
        <div style={{ borderStyle: "solid", padding: "10px", borderColor: "#d9d9d9" }}>
          <div className="btn-group mb-2" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-secondary" onClick={handleNew}>جدید</button>
            <button type="button" className="btn btn-secondary" onClick={handleSaveDetail} disabled={isAction == true ? true : false}>  <span className='form-inline'>
              ذخیره
              {isAction == true ? <ReactLoading type="spin" color="red" height={20} width={20} className="ml-2" /> : ''}
            </span>
            </button>
            <button type="submit" className="btn btn-secondary" onClick={() => {
              // console.log("selectedRow");
              // console.log(selectedRow);
              // console.log(selectedRow.State);
              if (selectedRow.State == 1)
                editDetail(selectedRow, "edit");
              else
                swal("توجه", "این ردیف در دیتابیس ذخیر نشده است دمیتوانید آن را حذف و دوباره وارد نمایید", "warning");
            }}>ویرایش</button>
            <button type="button" className="btn btn-secondary" onClick={handleDelete}>حذف</button>

          </div>
          <span className="ml-5" style={{ fontSize: "15pt" , fontFamily:"b nazanin" }}>
            جمع مبلغ فاکتورها:
            <span className="ml-2 mr-2 " style={{backgroundColor:"#adf7e6" , fontWeight:"bold"}} >{sumPrice == 0 ? 0 : sumPrice.toLocaleString()}</span></span><span className="ml-2" style={{ fontSize: "15pt" ,fontFamily:"b nazanin" }}>ریال</span>
          {visible ?
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
                rowSelection="single"
                rowData={rowData}
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
                //onSelectionChanged={onSelectionChanged}
                //  onCellClicked={onCellClicked}
                //  onSelectionChanged={onSelectionChanged}
                onSelectionChanged={onSelectionChanged}
              >
              </AgGridReact>
            </div>
            :
            <table dir="rtl" className="table table-bordered table-hover table-expense "  >
              <thead>
                <tr style={{ backgroundColor: "#d1d3d5" }} >
                  <th scope="col" >ردیف</th>
                  <th scope="col">شماره فاکتور</th>
                  <th scope="col">تاریخ پرداخت </th>
                  <th scope="col">مبلغ </th>
                  <th scope="col">شرح</th>
                  <th scope="col">توضیحات</th>
                  <th scope="col">وضعیت</th>
                </tr>
              </thead>
              <tbody  >
                {
                  rowData.map((item, index) => (
                    <tr key={index}>
                      <td scope="row" data-label="ردیف:"><input type="checkbox" checked={item === selected} onChange={() => handelChangeSoratId(item)}></input></td>
                      <td data-label="شماره فاکتور :">{item.ShomareBarge}</td>
                      <td data-label="تاریخ پرداخت:">{item.TarikhPardakht}</td>
                      <td data-label="مبلغ :">{item.Mablagh1}</td>
                      <td data-label="شرح :">{item.Sharh}</td>
                      <td data-label=" توضیحات :">{item.Tozihat}</td>
                      <td data-label=" وضعیت :">{item.okDesc}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          }


        </div>
      </Col>
      <ToastContainer />
    </Row>

  )

}
