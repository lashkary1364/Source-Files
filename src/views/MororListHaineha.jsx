import React, { useState, useEffect, useRef } from 'react'
import {
    Container, Row, Col, Card, ListGroup,
    ListGroupItem,
    Button, FormSelect
} from "shards-react";
import axios from 'axios';
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import { TankhahReportListExpense } from './TankhahReportListExpense';


export const MororListHaineha = () => {

    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    const [tankhahItems, setTankhahItems] = useState([]);
    const [state, setState] = useState(new DateObject({ calendar: persian, locale: persian_en }));
    const [dateFrom, setDateFrom] = useState(null);   
    const [dateTo, setDateTo] = useState(null);
    const [user] = useState(JSON.parse(sessionStorage.getItem("LoginTocken")));
    const calendarRef = useRef();
    const [items, setItems] = useState([]);
    const [salId, setSalId] = useState()
    const [tankhahId, setTankhahId] = useState();
    const [mandeKhat, setMandeKhat] = useState(false);

    useEffect(() => {
        GetAllTankhah();
        GetCurrentFinanceYear();
    }, []);

    const convertFrom = (date, format = state.format) => {
        let object = { date, format }
        setState(new DateObject(object).convert(persian, persian_en).format());
        setDateFrom(new DateObject(object).convert(persian, persian_en).format());
    }

    const convertTo = (date, format = state.format) => {
        let object = { date, format }
        setState(new DateObject(object).convert(persian, persian_en).format());
        setDateTo(new DateObject(object).convert(persian, persian_en).format());
    }

    const GetAllTankhahInfo = (tankhahId) => {
        setTankhahId(tankhahId);
    }

    const GetCurrentFinanceYear = () => {
        axios(
            {
                url: serverAdress + "GetFinanceYearById?salMali=" + parseInt(sessionStorage.getItem("SalMali")),
                method: "get",
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
                    // 'Cache-Control': 'no-cache',
                    // 'Pragma': 'no-cache',
                    // 'Expires': '0',
                }
            }).then(function (response) {
                    if (response.data != null) {
                    setDateFrom(response.data.salStart);
                    setDateTo(response.data.salEnd);
                    setSalId(response.data.salId);
                }

            }).catch(function (error) {
                // handle error
                console.log("axois error: ");
                console.log(error);
                alert(error);
            })
    }

    const GetAllTankhah = () => {
        axios(
            {
                url: serverAdress + `GetAllTankhah?userId=${user.UserId}`,
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
                setTankhahId(resultItems[0].tankhah_ID)
                resultItems.map(data => {
                    setTankhahItems(tankhahItems => [...tankhahItems, { tankhah_name: data.tankhah_name, tankhah_ID: data.tankhah_ID }]);
                });

            }).catch(function (error) {
                // handle error
                console.log("axois error: ");
                console.log(error);
                alert(error);
            })
    }

    const getAllTankhahMoror = (e) => {
        e.preventDefault();
        console.log({
            "fromDate": dateFrom,
            "toDate": dateTo,
            "salId": salId,
            "tankhahId": tankhahId,
            "showMande": mandeKhat

        });
        
        axios(
            {
                url: serverAdress + "GetListHazineha",
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
                    "showMande": false

                }
            }).then(function (response) {
              console.log("'chva ....")
                console.log(response)
                const resultItems = response.data;
                   resultItems.map((item) => {
                   setItems(items=>[...items,{total: item.total, shomare: item.shomare , proname:item.proname, sharh: item.sharh, TankhahId: item.TankhahId, proname: item.proname, tankhah: item.tankhah, tarikh: item.tarikh }])
                });
             
            }).catch(function (error) {
                // handle error
                console.log("axois error: ");
                console.log(error);
                alert(error);
            })

    }

    return (
        <Container fluid className="main-content-container px-4">
            <Row className="page-header mt-2 ">
                <Col lg="12" >
                    <nav className="breadcrumb">
                        <a className="breadcrumb-item" href="/home">خانه</a>
                        <span className="breadcrumb-item active">گزارش مرور - لیست صورت هزینه ها</span>
                    </nav>
                </Col>

                <Col lg="12" >
                    <Card small className="mb-2">
                        <ListGroup flush>
                            <ListGroupItem >
                                <form className="form-inline">
                                        <div className="form-group mb-2">
                                        <label htmlFor="tankhah">اتتخاب تنخواه*:</label>
                                        <FormSelect id="tankhah" name="tankhah" className='form-control' onChange={(e) => GetAllTankhahInfo(e.target.value)}>
                                               {
                                                tankhahItems.map((item, index) => (
                                                    <option key={index}
                                                        value={item.tankhah_ID}>
                                                        {item.tankhah_name}
                                                    </option>
                                                ))
                                            }
                                        </FormSelect>
                                    </div>

                                    <div className="form-group mx-sm-3 mb-2">
                                        <label htmlFor="mande" > از تاریخ :</label>
                                        <DatePicker inputClass='form-control'
                                            ref={calendarRef}
                                            calendar={persian}
                                            locale={persian_en}
                                            format={"YYYY/MM/DD"}
                                            value={dateFrom}
                                            onChange={convertFrom}
                                            id="tarikh" name="tarikh"
                                            calendarPosition="bottom-right"
                                        />
                                    </div>

                                    <div className="form-group mx-sm-3 mb-2">
                                        <label htmlFor="etebarMax">تا تاریخ:</label>
                                        <DatePicker inputClass='form-control'
                                            ref={calendarRef}
                                            calendar={persian}
                                            locale={persian_en}
                                            format={"YYYY/MM/DD"}
                                            value={dateTo}
                                            onChange={convertTo}
                                            id="tarikh" name="tarikh"
                                            calendarPosition="bottom-right"
                                        />
                                    </div>

                                    <div className="form-group mx-sm-3 mb-2">
                                        <input type="checkbox" name="vehicle1" onChange={(e) => setMandeKhat(e.target.checked)} />
                                        <label > محاسبه مانده در خط</label>
                                    </div>

                                    <Button theme="primary" className="mb-2 mr-1" type="submit" onClick={(e) => getAllTankhahMoror(e)} >
                                        <span className='form-inline'>
                                            گزارش
                                        </span>
                                    </Button>

                                </form>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                    
                    {/* {items.length > 0 ?\ */}
                     <TankhahReportListExpense resultItems={items} dateFrom={dateFrom} dateTo={dateTo}></TankhahReportListExpense> 
                     {/* : ''} */}
                </Col>
            </Row>

        </Container>
    )
}
