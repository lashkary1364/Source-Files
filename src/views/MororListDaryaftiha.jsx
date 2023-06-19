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
import { TankhahMororListDaryaftiha } from './TankhahMororListDaryaftiha';


export const MororListDaryaftiha = () => {

    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    const [tankhahItems, setTankhahItems] = useState([]);
    const [state, setState] = useState(new DateObject({ calendar: persian, locale: persian_en }));
    const [dateFrom, setDateFrom] = useState(null);
    //new DateObject({ calendar: persian, locale: persian_en })
    const [dateTo, setDateTo] = useState(null);
    //new DateObject({ calendar: persian, locale: persian_en })
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
        setDateFrom(new DateObject(object).convert(persian, persian_en).format())
    }

    const convertTo = (date, format = state.format) => {
        let object = { date, format }
        setState(new DateObject(object).convert(persian, persian_en).format());
        setDateTo(new DateObject(object).convert(persian, persian_en).format())
    }

    const GetAllTankhahInfo = (tankhahId) => {
        //console.log(tankhahId);
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
                //console.log("GetCurrentFinanceYear")
                const resultItems = response.data;
                //console.log(response.data)
                //console.log(response.data.salStart);
                //console.log(response.data.salEnd);
                if (response.data != null) {
                    setDateFrom(response.data.salStart);
                    setDateTo(response.data.salEnd);
                    setSalId(response.data.salId);
                }

            }).catch(function (error) {
                // handle error
                console.log("axois error: ");
                console.log(error)
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
                //console.log("tankhah get all ...")
                //console.log(resultItems)
                //console.log(resultItems[0].tankhah_ID);
                setTankhahId(resultItems[0].tankhah_ID)
                resultItems.map(data => {
                    setTankhahItems(tankhahItems => [...tankhahItems, { tankhah_name: data.tankhah_name, tankhah_ID: data.tankhah_ID }]);
                });

            }).catch(function (error) {
                // handle error
                console.log("axois error: ");
                console.log(error)
            })
    }

    const getAllTankhahMoror = (e) => {
        e.preventDefault();
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
                    "showMande": false

                }
            }).then(function (response) {
                console.log("'chva ....")
                console.log(response)
                const resultItems = response.data;
                //console.log(resultItems);
                resultItems.map((item) => {
                   console.log(item);
                    //console.log(item.radif)
                    setItems([{ ...items, radif:item.radif, SHarh: item.sHarh , BankName:item.bankName, SHobe: item.sHobe, daryafti_be_tankhah: item.daryafti_be_tankhah, pardakhti_az_tankhah: item.pardakhti_az_tankhah, dpTarikh: item.dpTarikh, VajhType: item.vajhType , vajh_type_title:item.vajh_type_title , CkSerial:item.ckSerial , DateNumber:item.dateNumber , SandogName:item.sandogName , SandogNO:item.sandogNO  }])
                });
                //console.log(items.length)
                //console.log("11111111111");
                //console.log(items);
            }).catch(function (error) {
                // handle error
                console.log("axois error: ");
                console.log(error)
            })



    }

    return (
        <Container fluid className="main-content-container px-4">
            <Row className="page-header mt-2 ">
                <Col lg="12" >
                    <nav className="breadcrumb">
                        <a className="breadcrumb-item" href="#">خانه</a>
                        <span className="breadcrumb-item active">گزارش مرور - لیست دریافتی ها</span>
                    </nav>
                </Col>

                <Col lg="12" >
                    <Card small className="mb-2">
                        <ListGroup flush>
                            <ListGroupItem >
                                <form class="form-inline">
                                    {/* <Row>
                                        <Col md="4" className="form-inline"> */}
                                    <div class="form-group mb-2">
                                        <label htmlFor="tankhah">اتتخاب تنخواه*:</label>
                                        <FormSelect id="tankhah" name="tankhah" className='form-control' onChange={(e) => GetAllTankhahInfo(e.target.value)}>
                                            {/* <option value={""}>یک موردانتخاب کنید</option> */}
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

                                    <div class="form-group mx-sm-3 mb-2">
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

                                    <div class="form-group mx-sm-3 mb-2">
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

                                    <div class="form-group mx-sm-3 mb-2">
                                        <input type="checkbox" name="vehicle1" onChange={(e) => setMandeKhat(e.target.checked)} />
                                        <label for="vehicle1"> محاسبه مانده در خط</label>
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
                    { items.length > 0 ? <TankhahMororListDaryaftiha resultItems={items}  dateFrom={dateFrom}  dateTo={dateTo}></TankhahMororListDaryaftiha> : ''}
                </Col>
            </Row>
        </Container>
    )
}
