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
import swal from 'sweetalert';
import e from 'cors';
export const FilterReport = ({ getAllReports }) => {

    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    const [tankhahItems, setTankhahItems] = useState([]);
    const [state, setState] = useState(new DateObject({ calendar: persian, locale: persian_en }));
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [user] = useState(JSON.parse(sessionStorage.getItem("LoginTocken")));
    const calendarRef = useRef();
    // const [items, setItems] = useState([]);
    // const [salId, setSalId] = useState()
    const [tankhahId, setTankhahId] = useState();
    const [mandeKhat, setMandeKhat] = useState(false);
    const [mohitItems, setMohitItems] = useState([]);
    const [salMali, setSalMali] = useState([]);
    const [mohitId, setMohitId] = useState();
    const [salMaliItems, setSalMaliItems] = useState([]);

    useEffect(() => {
        GetAllMohit();
        //GetCurrentFinanceYear();
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

    // const GetCurrentFinanceYear = () => {
    //     axios(
    //         {
    //             url: serverAdress + "GetFinanceYearById?salMali=" + parseInt(sessionStorage.getItem("SalMali")),
    //             method: "get",
    //             headers:
    //             {
    //                 Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
    //                 // 'Cache-Control': 'no-cache',
    //                 // 'Pragma': 'no-cache',
    //                 // 'Expires': '0',
    //             }
    //         }).then(function (response) {
    //             if (response.data != null) {
    //                 setDateFrom(response.data.salStart);
    //                 setDateTo(response.data.salEnd);
    //                 setSalId(response.data.salId);
    //             }

    //         }).catch(function (error) {
    //             // handle error
    //             //     console.log("axois error: ");
    //             //     console.log(error);
    //             //     alert(error);
    //             swal("error", error.message, "error");
    //         })
    // }


    const changeTankhah = (tankhahId) => {
        setTankhahId(tankhahId);
    }

    const getAllReport = (e) => {
        e.preventDefault();
        console.log(dateFrom);
        console.log(dateTo);
        console.log(salMali);
        console.log(tankhahId);
        getAllReports(dateFrom, dateTo, salMali, tankhahId, false);
    }

    const GetAllMohit = () => {
        console.log("user....");
        console.log(user);
        console.log(localStorage.getItem("access-tocken"));

        axios(
            {
                url: serverAdress + `GetAllMohit?userId=${user.UserId}`,
                method: "get",
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            }).then(function (response) {

                console.log("get all mohit ....")
                const resultItems = response.data;
                console.log(resultItems);
                resultItems.map(data => {
                    setMohitItems(mohitItems => [...mohitItems, { MohitId: data.mohitID, MohitOnvan: data.mohitOnvan }]);
                });



            }).catch(function (error) {
                swal("error", error.message, "error");
            })



    }

    const GetAllSalMali = (mohitId) => {
        axios(
            {
                url: serverAdress + `GetAllSalMali?mohitId=${mohitId}`,
                method: "get",
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            }).then(function (response) {

                console.log("get all sal mali ....")
                const resultItems = response.data;
                resultItems.map(data => {
                    setSalMaliItems(salMaliItems => [...salMaliItems, { SalId: data.salId, SalMali: data.salMali }]);
                });

            }).catch(function (error) {
                swal("error", error.message, "error");
            })
    }

    const GetAllTankhah = (salId) => {

        console.log(mohitId)
        console.log(user.UserId)
        console.log(salId)
        axios(
            {
                url: serverAdress + `GetAllTankhah?mohitId=${mohitId}&userId=${user.UserId}&salId=${salId}`,
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
                    console.log(data);
                    setTankhahItems(tankhahItems => [...tankhahItems, { tankhah_name: data.tankhah_name, tankhah_ID: data.tankhah_ID }]);
                });

            }).catch(function (error) {
                swal("error", error.message, "error");
            })
    }

    const changeMohit = (mohitId) => {
        console.log("change mohit ...")
        console.log(mohitId);
        setMohitId(mohitId);
        GetAllSalMali(mohitId);
    }

    const changeSalMali = (salId) => {
        console.log("change sal mali");
        setSalMali(salId);
        GetAllTankhah(salId)
    }


    return (
        <Card small className="mb-2">
            <ListGroup flush>
                <ListGroupItem >
                    <form >
                        <Row>
                            <Col md="4" className="form-group">
                                <div className="form-inline mt-3 mr-3">
                                    <label htmlFor="mohit"> محیط کاربری*:</label>
                                    <FormSelect id="mohit" name="mohit" onChange={(e) => changeMohit(e.target.value)} className='form-control' selectedIndex={0}>
                                        <option value={""}>یک موردانتخاب کنید</option>
                                        {
                                            mohitItems.map((item, index) => (
                                                <option key={index}
                                                    value={item.MohitId}>
                                                    {item.MohitOnvan}
                                                </option>
                                            ))
                                        }
                                    </FormSelect>
                                </div>
                            </Col>
                            <Col md="4" className="form-group">
                                <div className="form-inline mt-3 mr-3">
                                    <label htmlFor="salMali">  سال مالی*:</label>
                                    <FormSelect id="salMali" name="salMali" onChange={(e) => changeSalMali(e.target.value)} className='form-control'>
                                        <option value={""}>یک موردانتخاب کنید</option>
                                        {
                                            salMaliItems.map((item, index) => (
                                                <option key={index}
                                                    value={item.SalId}>
                                                    {item.SalMali}
                                                </option>
                                            ))
                                        }
                                    </FormSelect>
                                </div>
                            </Col>
                            <Col md="4" className="form-group">
                                <div className="form-inline mt-3 mr-3">
                                    <label htmlFor="tankhah"> تنخواه*:</label>
                                    <FormSelect id="tankhah" name="tankhah" onChange={(e) => changeTankhah(e.target.value)} className='form-control'>
                                    <option value={""}>یک موردانتخاب کنید</option>
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
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3" className="form-group">
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
                            </Col>
                            <Col md="3" className="form-group">
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
                            </Col>
                            <Col md="3" className="form-group">
                                <div className="form-group mx-sm-3 mb-2">
                                    <input type="checkbox" name="vehicle1" onChange={(e) => setMandeKhat(e.target.checked)} />
                                    <label > محاسبه مانده در خط</label>
                                </div>
                            </Col>
                            <Col md="3" className="form-group">
                                <Button theme="primary" className="mb-2 mr-1" type="submit" onClick={(e) => { getAllReport(e) }} >
                                    <span className='form-inline'>
                                        گزارش
                                    </span>
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </ListGroupItem>
            </ListGroup>
        </Card>
    )
}
