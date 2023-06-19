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


export const TankhahMororListDaryaftiha = ({ resultItems, dateFrom, dateTo }) => {

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
                        <div class="form-inline">
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
                                    currentTableRef={ref.current}
                                >
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

                <table class="table table-bordered  table-hover" dir="rtl" >
                    <thead>
                        <tr class="table-secondary" >
                            <th scope="col">#</th>
                            <th scope="col">تاریخ</th>
                            <th scope="col">نوع دریافت / پرداخت</th>
                            <th scope="col">شرح</th>
                            <th scope="col">شماره صندوق</th>
                            <th scope="col">نام صندوق</th>
                            <th scope="col">نام بانک</th>
                            <th scope="col">نام شعبه</th>
                            <th scope="col">سریال چک</th>
                            <th scope="col">تاریخ چک</th>
                            <th scope="col">مبلغ دریافتی تنخواه</th>
                            <th scope="col">مبلغ پرداختی توسط تنخواه</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            resultItems.map((item, index) =>
                                <tr key={index}>
                                    <td>{item.radif}</td>
                                    <td>{item.dpTarikh}</td>
                                    <td>{item.vajh_type_title}</td>
                                    <td>{item.SHarh}</td>
                                    <td>{item.SandogNO}</td>
                                    <td>{item.SandogName}</td>
                                    <td>{item.BankName}</td>
                                    <td>{item.SHobe}</td>
                                    <td>{item.CkSerial}</td>
                                    <td>{item.CkSerial}</td>                                   
                                    <td>{item.daryafti_be_tankhah}</td>
                                    <td>{item.pardakhti_az_tankhah}</td>
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
