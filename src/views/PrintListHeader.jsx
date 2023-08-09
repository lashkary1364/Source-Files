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

export const PrintListHeader = ({headerItems , sumTaeedNashode , sumTaeedShode , sumTotal}) => {

    const fileType = "application/vnd.openxmlformats-officedocumnet.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ref = useRef(null);

    const exportToExcel = async (e) => {
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
        content={() => ref.current}
      />
    </div>

    <div>
      <button onClick={(e) => exportToExcel(e)} type="button" className="btn btn-primary mb-2 mr-1">
        <FontAwesomeIcon icon={faFileExport} className="text-warning mr-2" />
        خروجی اکسل
      </button>
    </div>

  </div>
  <div ref={ref} className="table-to-xls" style={{ margin: "10px" }}>
    <div className="border-tankhah-header p-2">
      <h4>محیط کاربری اولیه</h4>
      <h5>چاپ لیست صورت هزینه</h5>
      <h6>لیست صورت هزینه از تاریخ 1402/01/01 الی تاریخ 1402/05/09</h6>
    </div>
    <table  >
      <thead>
        <tr style={{ backgroundColor: "#d1d3d5" }}>
          <th scope="col">ردیف</th>
          <th scope="col">نام تنخواه</th>
          <th scope="col"> نام پروژه </th>
          <th scope="col">شرح</th>
          <th scope="col">تاریخ</th>
          <th scope="col">شماره نامه</th>
          <th scope="col">تاریخ نامه</th>
          <th scope="col">شماره سند</th>
          <th scope="col"> جمع مبلغ تایید شده</th>
          <th scope="col">جمع مبلغ تایید نشده </th>
          <th scope="col">جمع کل مبلغ صورت هزینه</th>
        </tr>
      </thead>
      <tbody>
        {
          headerItems.length == 0 ? <tr><td className='text-center' colSpan={11}> داده ای برای نمایش وجود ندارد </td></tr> :
          headerItems.map((item, index) =>
              <tr key={index}>
                <td scope="row" data-label="ردیف:">{index + 1}</td>
                <td data-label="نام تنخواه:">{item.TankhahName}</td>
                <td data-label="نام پروژه">{item.ProjectName}</td>
                <td data-label="شرح:">{item.Sharh}</td>
                <td data-label="تاریخ:">{item.Tarikh}</td>
                <td data-label="شماره نامه:">{item.ShomareName}</td>
                <td data-label="تاریخ نامه:">{item.TarikhName}</td>
                <td data-label="شماره سند:">{item.ShomareSanad}</td>
                <td data-label="جمع مبلغ تایید شده:">{item.TaeedShode.toLocaleString()}</td>
                <td data-label="جمع مبلغ تایید نشده:">{item.TaeedNashode.toLocaleString()}</td>
                <td data-label="جمع کل مبلغ صورت هزینه:">{item.Total.toLocaleString()}</td>
              </tr>

            )
        }
        <tr>
          <td colSpan="8"></td>
          <td data-label="جمع مبلغ تایید شده :">{sumTaeedShode.toLocaleString()}</td>
          <td data-label="جمع مبلغ تایید نشده :">{sumTaeedNashode.toLocaleString()}</td>
          <td data-label="جمع کل مبلغ :">{sumTotal.toLocaleString()}</td>
        </tr>
      </tbody>
    </table>
  </div></div>
  )
}
