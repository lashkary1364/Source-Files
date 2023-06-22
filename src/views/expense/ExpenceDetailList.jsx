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
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';



export const ExpenseDetailList = ({ gridData, editDetail, handleNew, deleteSouratHazineDetail }) => {

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
  ])

  useEffect(() => {
    console.log("grid data .......")
    console.log(gridData)
    setRowData([])

    gridData.map((data, index) => {

      console.log("data....")
      console.log(data)
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
        "okDesc":data?.okDesc
      }]);
    });

    console.log("grid data .......")
    console.log(gridData)

    // setRowData(gridData);
  }, [gridData]);

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

    console.log("handle save detail ... ");
    console.log(rowData);

    setIsAction(true);

    if (gridData.length == 0) {
      toast.error("ردیفی ثبت نشده است", {
        position: toast.POSITION.TOP_LEFT
      });
      setIsAction(false);
      return;
    }


    console.log("row data ...")
    console.log(rowData)
    axios(
      {
        url: serverAdress + "InsertSoratHazineDetail",
        method: "post",
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
          'Content-Type': 'application/json',
        },
        data: rowData,
      }).then(function (response) {

        toast.success('عملیات با موفقیت انجام پذیرفت', {
          position: toast.POSITION.TOP_LEFT,
          className: 'toast-message'
        });

        setTimeout(() => {
          setIsAction(false);
          history.push("/expencelist");
        }, 1000)

      }).catch(function (error) {
        console.log("axios error insert:")
        console.log(error)
        setIsAction(false);
        alert(error);
        // toast.error('خطا در انجام عملیات', {
        //   position: toast.POSITION.TOP_LEFT
        // });
      })
  }


  function onRowSelected(event) {
    console.log("event")
    console.log(event.data)
    setSelectedRow(event.data)
  }

  const handleDelete = (row) => {

    console.log("row ...")
    console.log(row)

    confirmAlert({
      closeOnEscape: false,
      closeOnClickOutside: false,
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui' dir="rtl">
            <h3><FontAwesomeIcon icon={faTriangleExclamation} />توجه</h3>
            <p>آیا از حذف اطمینان دارید ؟</p>
            <button className='btn btn-sm btn-secondary mr-2' onClick={onClose}>خیر</button>
            <button className='btn btn-sm btn-danger'
              onClick={() => {

                if (selectedRow.ok!=0){
                  alert("این سند قابل حذف نیست");
                  onClose();
                  return;
                }
                gridRef.current.api.redrawRows();
                gridRef.current.api.redrawRows({ rowNodes: rowData });
                console.log("row.ID");
                console.log(selectedRow.ID);
                deleteSouratHazineDetail(selectedRow.ID);
                onClose();
              }}
            > بلی
            </button>
          </div>
        )
      }
    })
  }


  return (

    <Row>
      <Col lg="12" >
        <div style={{ borderStyle: "solid", padding: "10px", borderColor: "#d9d9d9" }}>
          <div class="btn-group mb-2" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-secondary" onClick={handleNew}>جدید</button>
            <button type="button" className="btn btn-secondary" onClick={handleSaveDetail} disabled={isAction == true ? true : false}>  <span className='form-inline'>
              ذخیره
              {isAction == true ? <ReactLoading type="spin" color="red" height={20} width={20} className="ml-2" /> : ''}
            </span>
            </button>
            <button type="submit" className="btn btn-secondary" onClick={() => {
              console.log("selectedRow")
              console.log(selectedRow)
              if (selectedRow.State == 1)
                editDetail(selectedRow, "edit")
              else
                alert("این ردیف در دیتابیس ذخیر نشده است دمیتوانید آن را حذف و دوباره وارد نمایید")
            }}>ویرایش</button>
            <button type="button" className="btn btn-secondary" onClick={handleDelete}>حذف</button>
          </div>

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
              onRowSelected={onRowSelected}
            >
            </AgGridReact>
          </div>
        </div>
      </Col>
      <ToastContainer />
    </Row>

  )

}
