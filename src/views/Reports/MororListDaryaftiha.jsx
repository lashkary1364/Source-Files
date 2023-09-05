import React, { useState, useEffect, useRef } from 'react'
import {
    Container, Row, Col, Card, ListGroup,
    ListGroupItem,
    Button, FormSelect
} from "shards-react";
import axios from 'axios';
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_fa";
import { TankhahMororListDaryaftiha } from './TankhahMororListDaryaftiha';
import swal from 'sweetalert';
import { FilterReport } from './FilterReport';
import { Spinner } from 'react-bootstrap';


export const MororListDaryaftiha = () => {

    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [items, setItems] = useState([]);    
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
   
    const getAllReports = (dateFrom, dateTo, salId, tankhahId, mandeKhat) => {

        setDateFrom(dateFrom);
        setDateTo(dateTo);
        setIsLoading(true);
        // e.preventDefault();
        console.log({
            "fromDate": dateFrom,
            "toDate": dateTo,
            "salId": salId,
            "tankhahId": tankhahId,
            "showMande": false

        });
        axios(
            {
                url: serverAdress + "GetMororListDaryaftiha",
                method: "get",
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
                    // 'Content-Type': 'application/json',
                    // "Content-Type": "multipart/form-data"
                    // 'Cache-Control': 'no-cache',
                    // 'Pragma': 'no-cache',
                    // 'Expires': '0',
                },
                params:
                {
                    "fromDate": dateFrom,
                    "toDate": dateTo,
                    "salId": salId,
                    "tankhahId": tankhahId,
                    "showMande": mandeKhat
                }
            }).then(function (response) {

                const resultItems = response.data;
                console.log(resultItems);
                setItems([]);
                resultItems.map((item) => {
                    //console.log(item);
                    setItems(items => [
                        ...items, {
                            radif: item.radif, SHarh: item.sHarh, BankName: item.bankName,
                            SHobe: item.sHobe, daryafti_be_tankhah: item.daryafti_be_tankhah.toLocaleString(),
                            pardakhti_az_tankhah: item.pardakhti_az_tankhah.toLocaleString(), dpTarikh: item.dpTarikh,
                            VajhType: item.vajhType, vajh_type_title: item.vajh_type_title,
                            CkSerial: item.ckSerial, DateNumber: item.dateNumber, SandogName: item.sandogName,
                            SandogNO: item.sandogNO
                        }]);
                });
                setIsVisible(true);
                window.setTimeout(() => {
                    setIsLoading(false);
                }, 2000);

            }).catch(function (error) {
                if(error.response.status==401){
                    window.location.replace('/');
                    return;
                  }
                // handle error
                // console.log("axois error: ");
                // console.log(error);
                swal("خطای "+ error.response.status, error.response.data, "error");
            })

    }

    return (
        <Container fluid className="main-content-container px-4">
            <Row className="page-header mt-2 ">
                <Col lg="12" >
                    <nav className="breadcrumb">
                        <a className="breadcrumb-item" href="/home">خانه</a>
                        <span className="breadcrumb-item active">گزارش مرور - لیست دریافتی ها</span>
                    </nav>
                </Col>

                <Col lg="12" >
                    <FilterReport getAllReports={getAllReports} ></FilterReport>
                    {
                        isVisible ?
                            isLoading == true ? <div className="text-center" style={{ paddingTop: "50px", margin: "auto", width: "50%" }} >
                                <Spinner animation="grow" size="sm" variant="primary" />
                                <Spinner animation="grow" variant="primary" />
                                <div className='text-primary text-center' dir="rtl">در حال بارگزاری...</div>
                            </div> :
                                <TankhahMororListDaryaftiha resultItems={items} dateFrom={dateFrom} dateTo={dateTo}></TankhahMororListDaryaftiha>
                            : ''
                    }                  
                </Col>
            </Row>
        </Container>
    )
}
