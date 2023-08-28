import React, { useState, useEffect, useRef } from 'react'
import {
    Container, Row, Col, Card, ListGroup,
    ListGroupItem,
    Button, FormSelect
} from "shards-react";
import axios from 'axios';
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import { TankhahReportListExpense } from './TankhahReportListExpense';
import swal from 'sweetalert';
import e from 'cors';
export const FilterReport = ({ getAllReports }) => {

    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    const [tankhahItems, setTankhahItems] = useState([]);
    const [state, setState] = useState(new DateObject({ calendar: persian, locale: persian_fa }));
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();    
    const calendarRef = useRef();
    const salText=sessionStorage.getItem("salMali")
    const [yearFrom,setYearFrom]=useState();
    const [yearTo,setYearTo]=useState();
    const [tankhahId, setTankhahId] = useState();
    const [mandeKhat, setMandeKhat] = useState(false);
    const salMali=sessionStorage.getItem("salMali");
    const salId=sessionStorage.getItem("salId");
    const mohitId=sessionStorage.getItem("salId");
    const user = JSON.parse(sessionStorage.getItem("LoginTocken"));

    useEffect(() => {
        GetAllTankhah();       
    }, []);

    const convertFrom = (date, format = state.format) => {
        let object = { date, format }
        setState(new DateObject(object).convert(persian, persian_en).format());
        console.log(new DateObject(object).convert(persian, persian_en).format("YYYY"));
        setYearFrom(new DateObject(object).convert(persian, persian_en).format("YYYY"));
        setDateFrom(new DateObject(object).convert(persian, persian_en).format());
    }

    const convertTo = (date, format = state.format) => {
        let object = { date, format }
        setState(new DateObject(object).convert(persian, persian_en).format());
        setYearTo(new DateObject(object).convert(persian, persian_en).format("YYYY"));
        setDateTo(new DateObject(object).convert(persian, persian_en).format());
    }

    const changeTankhah = (tankhahId) => {
        setTankhahId(tankhahId);
    }

    const getAllReport = (e) => {
          e.preventDefault();

        if (dateFrom==undefined || dateTo==undefined||tankhahId==undefined ){
            swal("توجه", "وارد کردن تنخواه و تاریخ الزامی است", "warning"); 
            return;
        }

        if (dateFrom>dateTo){
            swal("توجه", "بازه تاریخی درست وارد نشده است", "warning"); 
            return; 
        }

        if(yearFrom!=salText || yearTo!=salText){
            swal("توجه", "بازه تاریخی و سال ملی یکسان نیست", "warning"); 
            return;
        }
        
        console.log(dateFrom?.format?.("YYYY"));
        console.log(dateFrom.year);
        console.log(dateTo);    
        console.log(salMali);
        console.log(tankhahId);

        getAllReports(dateFrom, dateTo, salMali, tankhahId, mandeKhat);
    }
  
    const GetAllTankhah = () => {

        console.log(mohitId)
        console.log(user.userId)
        console.log(salId)
        axios(
            {
                url: serverAdress + `GetAllTankhah?mohitId=${mohitId}&userId=${user.userId}&salId=${salId}`,
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



    return (
        <Card small className="mb-2">
            <ListGroup flush>
                <ListGroupItem >
                    <form >
                        <Row>
                            <Col md="3" className="form-group">
                                <div className="form-inline mr-3">
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
                      
                            <Col md="3" className="form-group">
                                <div className="form-group mx-sm-3 mb-2">
                                    <label htmlFor="mande" > از تاریخ :</label>
                                    <DatePicker inputClass='form-control'
                                        ref={calendarRef}
                                        calendar={persian}
                                        locale={persian_fa}
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
                                        locale={persian_fa}
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
