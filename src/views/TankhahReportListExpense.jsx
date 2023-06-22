import React, { useEffect } from 'react'
import {
    Card, ListGroup,
    ListGroupItem,
} from "shards-react";
import ReactToPrint from 'react-to-print';
import { useRef, useState } from 'react';
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import { useDownloadExcel, DownloadTableExcel } from "react-export-table-to-excel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel, faFilePdf, faFileExport } from '@fortawesome/free-solid-svg-icons';


export const TankhahReportListExpense = ({ resultItems, dateFrom, dateTo }) => {

    const fileType = "application/vnd.openxmlformats-officedocumnet.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    //const excelData = [{ id: 1, name: "shabnam", family: "lashkary" }, { id: 2, name: "arezoo", family: "asadzadeh" }, { id: 3, name: "hamid", family: "soltani" }]
    const ref = useRef(null);
    const exportToExcel = async (e) => {
        e.preventDefault();
        const ws = XLSX.utils.json_to_sheet(resultItems);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "exportexcel" + fileExtension);
    };
    const[mandeKhat,setMandeKhat]=useState(false);

    const [inputValue, setInputValue] = useState({
        note: '',
        date: '',
        issued: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            [name]: value,
        });
    };


    return (

        <div >
            <Card small >
                <ListGroup flush>
                    <ListGroupItem >
                        <div className="form-inline">
                            <div>
                                <ReactToPrint
                                    trigger={() => <button className="btn btn-primary mb-2 mr-1">
                                        <FontAwesomeIcon icon={faFilePdf} className="text-warning mr-2" />
                                        خروجی پی دی اف</button>}
                                    content={() => ref.current}
                                />
                            </div>

                            <div>
                                <button onClick={(e) => exportToExcel(e)} type="button" className="btn btn-primary mb-2 mr-1">
                                    <FontAwesomeIcon icon={faFileExport} className="text-warning mr-2" />
                                    خروجی اکسل
                                </button>
                            </div>

                            <div>
                                <DownloadTableExcel
                                    filename="export-html-pdf"
                                    sheet="tankhah"
                                    currentTableRef={ref.current}>
                                    <button type="button" className="btn btn-primary mb-2 mr-1" >
                                        <FontAwesomeIcon icon={faFileExcel} className="text-warning mr-2" />
                                        صدور html به اکسل
                                    </button>
                                </DownloadTableExcel>
                            </div>
                        </div>
                    </ListGroupItem>
                </ListGroup>
            </Card>
            <div id="table-to-xls" ref={ref} className="table-to-xls" >
                <div className="border-tankhah-header">
                    <div className="text-center">{JSON.parse(sessionStorage.getItem("LoginTocken")).LastMohitName}</div>
                    <div className="text-center">
                        <span >لیست گردش حساب:تنخواه </span>
                        <span>{" " + JSON.parse(sessionStorage.getItem("LoginTocken")).userFirstName + " " + JSON.parse(sessionStorage.getItem("LoginTocken")).userLastName + " "} </span>
                    </div>
                    <div className="text-center">
                        <span>از : </span>
                        <span>{" " + dateFrom + " "}</span>
                        <span>تا :</span>
                        <span>{" " + dateTo + " "}</span>
                    </div>
                </div>

                <table className="table table-bordered  table-hover" dir="rtl" >
                    <thead>
                        <tr className="table-secondary" >
                            <th scope="col">#</th>
                            <th scope="col">تاریخ</th>
                            <th scope="col">شماره</th>
                            <th scope="col">نام پروژه</th>
                            <th scope="col">شرح</th>
                            <th scope="col">تنخواه</th>
                            <th scope="col">مبلغ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            resultItems.map((item, index) =>
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{item.tarikh}</td>
                                    <td>{item.shomare}</td>
                                    <td>{item.proname}</td>
                                    <td>{item.sharh}</td>
                                    <td>{item.tankhah.toLocaleString()}</td>
                                    <td>{item.total.toLocaleString()}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                {/* <CSVLink data={resultItems}>Download me</CSVLink> */}
            </div>
        </div>


    )
}

