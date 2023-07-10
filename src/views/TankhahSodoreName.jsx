import React, { useEffect } from 'react'
import {
    Card, ListGroup,
    ListGroupItem,
} from "shards-react";
import ReactToPrint from 'react-to-print';
import Pdf from 'react-to-pdf';
import { useRef, useState } from 'react';
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import { useDownloadExcel, DownloadTableExcel } from "react-export-table-to-excel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel, faFilePdf, faFileExport } from '@fortawesome/free-solid-svg-icons';
import Num2persian from 'num2persian';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/view-css.css';
import swal from 'sweetalert';
import { Spinner } from 'react-bootstrap';

export const TankhahSodoreName = () => {

    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    const queryParameters = new URLSearchParams(window.location.search);
    const [shomareName, setShomareName] = useState(0);
    const [sodoreName, setSodoreName] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [listId, setListId] = useState([]);
    const [isLoading,setIsloading]=useState(true);

    useEffect(() => {
        setListId(queryParameters.get("listId"));
        sodoreNameReport();
    }, []);


    const sodoreNameReport = () => {
        console.log(queryParameters.get("listId"));
        axios(
            {
                url: serverAdress + `GetAllSodorName?list=${queryParameters.get("listId")}`,
                method: "get",
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            }).then(function (response) {

                //console.log("get all GetAllSodorName ...")
                const resultItems = response.data;
                //console.log(response);
                var tempPrice = 0;
                setSodoreName([]); 
                setShomareName([]);    
                
                resultItems.map(item => {
                   // console.log(item.SodoreNameDetails);
                    var detailSouratHazine = [];

                    item.sodoreNameDetails.map(detail => {
                        detailSouratHazine.push({ sharh: detail.sharh, price: detail.mablagh });
                    });

                    // console.log(item.totalPrice);
                    tempPrice += item.totalPrice;
                    // console.log(tempPrice);

                    // console.log("details...")
                    // console.log(sss);
                    setShomareName(item.shomareName);
                    setSodoreName([]); 
                    setSodoreName(sodoreName => [...sodoreName, {
                        soratId: item.soratId, shomare: item.shomare, ShomareName: item.ShomareName, tarikh: item.tarikh,
                        totalPrice: item.totalPrice, sharh: item.sharh, mablag: item.mablagh, tozihat: item.tozihat, details: detailSouratHazine
                    }]);
                });


                //console.log(tempPrice);
                setTotalPrice(tempPrice);

                window.setTimeout(()=>{
                    setIsloading(false);
                },2000);

            }).catch(function (error) {
                // handle error
                // console.log("axois error: ");
                // console.log(error);
                swal("Error", error.message, "error");
            })

    }

    const fileType = "application/vnd.openxmlformats-officedocumnet.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ref = useRef(null);
    const exportToExcel = async (e) => {
        e.preventDefault();
        // const ws = XLSX.utils.json_to_sheet(resultItems);
        // const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        // const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        // const data = new Blob([excelBuffer], { type: fileType });
        // FileSaver.saveAs(data, "exportexcel" + fileExtension);
    };


    return (
        <div >
            <Card small >
                <ListGroup flush>
                    <ListGroupItem >
                        <div className="form-inline">
                            <div>
                                {/* <Pdf targetRef={ref} filename="document.pdf" >
                                    {({ toPdf }) => (
                                        <button onClick={toPdf} type="button" className="btn btn-primary mb-2 mr-1">
                                            <FontAwesomeIcon icon={faFilePdf} className="text-warning mr-2" />
                                            خروجی پی دی اف
                                        </button>
                                    )}
                                </Pdf> */}
                                <ReactToPrint
                                    trigger={() => <button className="btn btn-primary mb-2 mr-1">
                                        <FontAwesomeIcon icon={faFilePdf} className="text-warning mr-2" />
                                        خروجی پی دی اف</button>}
                                    content={() => ref.current}
                                />
                            </div>
                            {/* <div>
                                <button onClick={(e) => exportToExcel(e)} type="button" className="btn btn-primary mb-2 mr-1">
                                    <FontAwesomeIcon icon={faFileExport} className="text-warning mr-2" />
                                    خروجی اکسل
                                </button>
                            </div> */}
                            {/* <div>
                                <DownloadTableExcel
                                    filename="export-html-pdf"
                                    sheet="tankhah"
                                    currentTableRef={ref.current}>
                                    <button type="button" className="btn btn-primary mb-2 mr-1" >
                                        <FontAwesomeIcon icon={faFileExcel} className="text-warning mr-2" />
                                        صدور html به اکسل
                                    </button>
                                </DownloadTableExcel>
                            </div> */}
                        </div>
                    </ListGroupItem>
                </ListGroup>
            </Card>
            {
                        isLoading == true ? <div className="text-center" style={{ paddingTop: "50px", margin: "auto", width: "50%" }} >
                            <Spinner animation="grow" size="sm" variant="primary" />
                            <Spinner animation="grow" variant="primary" />
                            <div className='text-primary text-center' dir="rtl">در حال بارگزاری...</div>
                        </div> :
                      <div id="table-to-xls" className="table-to-xls" style={{ padding: "40px", margin: "50px" }} ref={ref}>
                      <div className="border-tankhah-header" >
                          <table style={{ border: "1px solid rgb(40, 39, 39)" }}>
                              <tbody>
                                  <tr>
                                      <td rowSpan={2} style={{ verticalAlign: "middle", border: "1px solid rgb(40, 39, 39)" }}>
                                          <img   src={require("./../images/deka.png")}></img> 
                                      </td>
                                      <td scope="row" rowSpan={2} style={{ verticalAlign: "middle", border: "1px solid rgb(40, 39, 39)", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "12pt" }}  ><h3>فرم تنخواه گردان</h3></td>
                                      <td style={{ border: "1px solid rgb(40, 39, 39)", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "12pt" }}>شماره :{shomareName}</td>
                                  </tr>
                                  <tr>
                                      <td style={{ border: "1px solid rgb(40, 39, 39)", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "12pt" }}>تاریخ :{queryParameters.get("tarikh")}</td>
                                  </tr>
                              </tbody>
                          </table>
                          <h3 style={{ marginLeft: "5px", marginRight: "5px", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "15pt" }} dir="rtl">امور مالی محترم:</h3>
                          <p style={{ marginLeft: "5px", marginRight: "5px", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "13pt" }} dir="rtl">احتراما صورت هزینه های پرداخت شده جهت تایید تقدیم میگردد.</p>
                          {
                              sodoreName.map((item, index) => (
      
                                  <div key={index}>
                                      <table>
                                          <thead>
                                              <tr>
                                                  <th scope="col" style={{ textAlign: "center", border: "1px solid rgb(40, 39, 39)", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "14.5pt" }}>ردیف</th>
                                                  <th scope="col" style={{ textAlign: "center", border: "1px solid rgb(40, 39, 39)", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "14.5pt" }}>شرح سند</th>
                                                  <th scope="col" style={{ textAlign: "center", border: "1px solid rgb(40, 39, 39)", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "14.5pt" }}>شماره صورت</th>
                                                  <th scope="col" style={{ textAlign: "center", border: "1px solid rgb(40, 39, 39)", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "14.5pt" }}>تاریخ صورت هزینه</th>
                                                  <th scope="col" style={{ textAlign: "center", border: "1px solid rgb(40, 39, 39)", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "14.5pt" }}>مبلغ صورت هزینه</th>
                                                  <th scope="col" style={{ textAlign: "center", border: "1px solid rgb(40, 39, 39)", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "14.5pt" }}>توضیحات</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              <tr style={{ background: "#ebe7e7" }}>
                                                  <td scope="row" data-label="ردیف" style={{ border: "1px solid rgb(40, 39, 39)", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "12pt" }}>{index + 1}</td>
                                                  <td data-label="شرح سند:" style={{ border: "1px solid rgb(40, 39, 39)", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "12pt" }}>{item.sharh}</td>
                                                  <td data-label="شماره صورت:" style={{ border: "1px solid rgb(40, 39, 39)", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "12pt" }}>{item.shomare}</td>
                                                  <td data-label="تاریخ صورت هزینه:" style={{ border: "1px solid rgb(40, 39, 39)", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "12pt" }}>{item.tarikh}</td>
                                                  <td data-label="مبلغ صورت هزینه:" style={{ border: "1px solid rgb(40, 39, 39)", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "12pt" }}>{item.totalPrice.toLocaleString()}</td>
                                                  <td data-label="توضیحات:" style={{ border: "1px solid rgb(40, 39, 39)", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "12pt" }} >{item.tozihat}</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <table >
                                          <thead>
                                              <tr >
                                                  <th scope="col" style={{ textAlign: "center", border: "1px solid rgb(40, 39, 39)", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "14.5pt" }}>شرح</th>
                                                  <th scope="col" style={{ textAlign: "center", border: "1px solid rgb(40, 39, 39)", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "14.5pt" }}>مبلغ ریز هزینه (ریال)</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              {
                                                  item.details.map((itemdetail, index) => (
                                                      <tr key={index} >
                                                          <td scope="row" data-label="شرح:" style={{ border: "1px solid rgb(40, 39, 39) ", background: "#dbd7d7", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "11.5pt" }}>{itemdetail.sharh}</td>
                                                          <td scope="row" data-label="مبلغ ریز هزینه (ریال):" style={{ border: "1px solid rgb(40, 39, 39)", background: "#dbd7d7", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "11.5pt" }}>{itemdetail.price.toLocaleString()}</td>
                                                      </tr>
                                                  ))
      
                                              }
                                              <tr>
                                                  <td scope="row" data-label="جمع:" style={{ background: "#a8a8a8", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "13pt", border: "1px solid rgb(40, 39, 39)" }}>جمع:</td>
                                                  <td scope="row" data-label="مبلغ ریز هزینه (ریال):" style={{ background: "#a8a8a8", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "13pt", border: "1px solid rgb(40, 39, 39)" }}>{item.totalPrice.toLocaleString()}</td>
                                              </tr>
                                          </tbody>
                                      </table>
      
                                  </div>
                              ))
      
      
                          }
                          <table >
                              <tbody>
                                  <tr >
                                      <td scope="row" rowSpan={2} style={{ verticalAlign: "middle", fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "14pt", border: "1px solid rgb(40, 39, 39)" }}  ><h3>جمع به حروف:</h3><h5><span>{Num2persian(totalPrice)}</span><span className='ml-1'>ریال</span>  </h5></td>
                                      <td style={{ border: "1px solid rgb(40, 39, 39)" }}><h3 style={{ fontFamily: "B Nazanin", fontWeight: "bold", fontSize: "14pt" }}>{totalPrice.toLocaleString()}</h3></td>
                                  </tr>
      
                              </tbody>
                          </table>
                      </div>
                  </div>   
                    }
            
        </div >
    )
}
