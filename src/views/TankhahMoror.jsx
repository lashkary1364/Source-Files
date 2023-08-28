import React, { useState, useEffect, useRef } from 'react'
import {
    Container, Row, Col, Card, ListGroup,
    ListGroupItem,
    Button, FormSelect
} from "shards-react";
import axios from 'axios';
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_en from "react-date-object/locales/persian_en"
import { TankhahReport } from './TankhahReport';
import swal from 'sweetalert';
import { FilterReport } from './FilterReport';
import { Spinner } from 'react-bootstrap';

export const TankhahMoror = () => {

    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    const [tankhahItems, setTankhahItems] = useState([]);
    const [state, setState] = useState(new DateObject({ calendar: persian, locale: persian_en }));
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [user] = useState(JSON.parse(sessionStorage.getItem("LoginTocken")));
    const calendarRef = useRef();
    const [items, setItems] = useState([]);
    const salId = sessionStorage.getItem("salId");
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        GetAllTankhah();
     
    }, []);

    const GetAllTankhah = () => {
        axios(
            {
                url: serverAdress + `GetAllTankhah?userId=${user.userId}`,
                method: "get",
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            }).then(function (response) {

                const resultItems = response.data;
                resultItems.map(data => {
                    setTankhahItems(tankhahItems => [...tankhahItems, { tankhah_name: data.tankhah_name, tankhah_ID: data.tankhah_ID }]);
                });

            }).catch(function (error) {
                swal("error", error.message, "error");
            })
    }

    const getAllReports = (dateFrom, dateTo, salId, tankhahId, mandeKhat) => {
       
        console.log("moror ...");
        setDateFrom(dateFrom);
        setDateTo(dateTo);
        setIsLoading(true);
        setIsLoading(true);
        setIsVisible(true)

        axios(
            {
                url: serverAdress + "GetTankhahMoror",
                method: "get",
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
                    //'Content-Type': 'application/json',
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
                var mande = 0;
                setItems([]);
                const resultItems = response.data;
                console.log(resultItems);
                resultItems.map((item, index) => {
                    if (index == 0) {
                        mande = (item.bed) - (item.bes);
                    } else {
                        mande = mande + (item.bed) - (item.bes);
                    }
                    setItems(items => [...items, { bed: item.bed.toLocaleString(), bes: item.bes.toLocaleString(), radif: item.radif, sharh: item.tpSHarh, tarikh: item.dptarikh, mande: mande }])
                });

                window.setTimeout(() => {
                    setIsLoading(false);
                }, 2000);

            }).catch(function (error) {                
                swal("error", error.message, "error");
                setIsLoading(false);
            });
    }

    return (
        <Container fluid className="main-content-container px-4">
            <Row className="page-header mt-2 ">
                <Col lg="12" >
                    <nav className="breadcrumb">
                        <a className="breadcrumb-item" href="/home">خانه</a>
                        <span className="breadcrumb-item active">گزارش مرور تنخواه</span>
                    </nav>
                </Col>
                <Col lg="12" >
                    <FilterReport getAllReports={getAllReports}></FilterReport>
                    {isVisible ?
                        isLoading == true ? <div className="text-center" style={{ paddingTop: "50px", margin: "auto", width: "50%" }} >
                            <Spinner animation="grow" size="sm" variant="primary" />
                            <Spinner animation="grow" variant="primary" />
                            <div className='text-primary text-center' dir="rtl">در حال بارگزاری...</div>
                        </div> :
                            <TankhahReport resultItems={items} dateFrom={dateFrom} dateTo={dateTo}></TankhahReport>
                        : ''
                    }                   
                </Col>
            </Row>

        </Container>
    )
}
