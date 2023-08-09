import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import { useDownloadExcel, DownloadTableExcel } from "react-export-table-to-excel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel, faFilePdf, faFileExport } from '@fortawesome/free-solid-svg-icons';

export const PrintListDetail = ({ headerItems }) => {
  const fileType = "application/vnd.openxmlformats-officedocumnet.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const refDetail = useRef(null);

  const exportToExcelDetail = async (e) => {
    e.preventDefault();
    const ws = XLSX.utils.json_to_sheet(headerItems);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "exportexcel" + fileExtension);
  };


  return (
    <div>  <div className="form-inline">
      <div>
        <ReactToPrint
          trigger={() => <button className="btn btn-primary mb-2 mr-1">
            <FontAwesomeIcon icon={faFilePdf} className="text-warning mr-2" />
            خروجی پی دی اف</button>}
          content={() => refDetail.current}
        />
      </div>

      <div>
        <button onClick={(e) => exportToExcelDetail(e)} type="button" className="btn btn-primary mb-2 mr-1">
          <FontAwesomeIcon icon={faFileExport} className="text-warning mr-2" />
          خروجی اکسل
        </button>
      </div>
    </div>
      

        <div id="table-to-xls" className="table-to-xls"  ref={refDetail} >
          <div className="border-tankhah-header p-2">
            <h4>محیط کاربری اولیه</h4>
            <h5>چاپ لیست صورت هزینه</h5>
            <h6>لیست صورت هزینه از تاریخ 1402/01/01 الی تاریخ 1402/05/09</h6>
          </div>
          {console.log(headerItems)}
          {
            headerItems.map((item, index) => (

              <div key={index}>
                <table>
                  <thead>
                    <tr>
                      <th scope="col" >ردیف</th>
                      <th scope="col" >شماره</th>
                      <th scope="col">نام تنخواه</th>
                      <th scope="col" >نام پروژه</th>
                      <th scope="col" >شرح</th>
                      <th scope="col" >تاریخ</th>
                      <th scope="col" >جمع مبلغ تایید شده</th>
                      <th scope="col" >مبلغ (ریال)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ background: "#ebe7e7" }}>
                      <td scope="row" data-label="ردیف">{index + 1}</td>
                      <td data-label="شماره :" >{item.Shomare}</td>
                      <td data-label="نام تنخواه :">{item.TankhahName}</td>
                      <td data-label="نام پروژه :">{item.ProjectName}</td>
                      <td data-label=" شرح :" >{item.Sharh}</td>
                      <td data-label="تاریخ :"  >{item.Tarikh}</td>
                      <td data-label="جمع مبلغ تایید شده :"  >{item.TaeedShode}</td>
                      <td data-label="مبلغ (ریال) :"  >{item.Total}</td>
                    </tr>
                  </tbody>
                </table>
                <table >
                  <thead>
                    <tr >
                      {/* <th scope="col" ></th> */}
                      <th scope="col" >ردیف</th>
                      <th scope="col" >شماره برگه</th>
                      <th scope="col" >تاریخ</th>
                      <th scope="col" >شرح</th>
                      <th scope="col" >وضعیت</th>
                      <th scope="col" >مبلغ ریز هزینه (ریال)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {console.log(item.Details)}
                   { item.Details.length>0?
                    item.Details.map((itemdetail, index) => (
                        <tr key={index} >
                          {/* <td scope="row" data-label="" >*</td> */}
                          <td scope="row" data-label="ردیف:" >{index+1}</td>
                          <td scope="row" data-label="شماره برگه:" >{itemdetail.ShomareBarge}</td>
                          <td scope="row" data-label="تاریخ:" >{itemdetail.TarikhPardakht}</td>
                          <td scope="row" data-label="شرح:" >{itemdetail.Sharh}</td>
                          <td scope="row" data-label="وضعیت:" >{itemdetail.OkStr}</td>
                          <td scope="row" data-label="مبلغ ریز هزینه (ریال):" >
                            {itemdetail.Mablagh.toLocaleString()}
                            </td>
                        </tr>
                      )):''

                    }

                  </tbody>
                </table>

              </div>
            ))
          }

        </div>
      </div>
   
  )
}
