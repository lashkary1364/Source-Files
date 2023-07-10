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
import '../assets/table.css'

export const TankhahReport = ({ resultItems, dateFrom, dateTo }) => {

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
            <div id="table-to-xls" ref={ref} className="table-to-xls" style={{margin:"50px"}} >
                <div className="border-tankhah-header">
                    <div >{JSON.parse(sessionStorage.getItem("LoginTocken")).LastMohitName}</div>
                    <div>
                        <span >لیست گردش حساب:تنخواه </span>
                        <span>{" " + JSON.parse(sessionStorage.getItem("LoginTocken")).userFirstName + " " + JSON.parse(sessionStorage.getItem("LoginTocken")).userLastName + " "} </span>
                    </div>
                    <div >
                        <span>از : </span>
                        <span>{" " + dateFrom + " "}</span>
                        <span>تا :</span>
                        <span>{" " + dateTo + " "}</span>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr style={{backgroundColor: "#d1d3d5"}} >
                            <th scope="col">ردیف</th>
                            <th scope="col">شرح</th>
                            <th scope="col">تاریخ</th>
                            <th scope="col">بدهکار</th>
                            <th scope="col">بستانکار</th>
                            <th scope="col">مانده</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            resultItems.length == 0 ? <tr><td className='text-center' colSpan={5}> داده ای برای نمایش وجود ندارد </td></tr> :
                                resultItems.map((item, index) =>
                                    <tr key={index}>
                                        <td scope="row" data-label="ردیف">{item.radif}</td>
                                        {/* <td>{item.radif}</td> */}
                                        <td data-label="شرح:">{item.sharh}</td>
                                        <td data-label="تاریخ:">{item.tarikh}</td>
                                        <td data-label="بدهکار:">{item.bed.toLocaleString()}</td>
                                        <td data-label="بستانکار:">{item.bes.toLocaleString()}</td>
                                        <td data-label="مانده:">   {item.mande<0 ? `(${Math.abs(item.mande.toLocaleString())})` :item.mande.toLocaleString()} </td>
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

