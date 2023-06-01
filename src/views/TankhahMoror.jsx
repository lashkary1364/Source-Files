import React, { useState, useEffect, useRef } from 'react'
import {
    Container, Row, Col, Card, ListGroup,
    FormCheckbox,
    ListGroupItem,
    Button, FormSelect
} from "shards-react";
import axios from 'axios';
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_en from "react-date-object/locales/persian_en"
import {TankhahMororInfo} from './TankhahMororInfo'


export const TankhahMoror = () => {

    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    const [tankhahItems, setTankhahItems] = useState([]);
    const [state, setState] = useState(new DateObject({ calendar: persian, locale: persian_en }));
    const [user] = useState(JSON.parse(sessionStorage.getItem("LoginTocken")));
    const calendarRef = useRef();
    const[items,setItems]=useState(items);

    useEffect(() => {

        GetAllTankhah();

    }, []);

    const convert = (date, format = state.format) => {
        let object = { date, format }
        setState(new DateObject(object).convert(persian, persian_en).format());
    }

    const GetAllTankhahInfo = (tankhahId) => {


        console.log("sal mali")
        console.log(sessionStorage.getItem("SalMali"))

        axios(
            {
                url: serverAdress + `GetAllTankhahFinanceInfo?tankhahId=${tankhahId}&salId=${sessionStorage.getItem("SalMali")}`,
                method: "get",
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            }).then(function (response) {
                console.log(response)

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
                console.log("tankhah get all ...")
                console.log(resultItems)
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
        console.log(serverAdress + "GetTankhahMoror");
        // const form = new FormData();
        // form.append("fromDate", "1402/01/01");
        // form.append("toDate", "1402/03/30");
        // form.append("salId", 12);
        // form.append("tankhahId", 55);
        // form.append("showMande", false);


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
                    "fromDate": "1402/01/30",
                    "toDate": "1402/12/30",
                    "salId": 12,
                    "tankhahId": 55,
                    "showMande": false
                }
            }).then(function (response) {

                console.log(response)
                const resultItems = response.data;
                setItems(resultItems);

                console.log("tankhah get all ...");
                console.log(resultItems);
                // resultItems.map(data => {
                //     setTankhahItems(tankhahItems => [...tankhahItems, { tankhah_name: data.tankhah_name, tankhah_ID: data.tankhah_ID }]);
                // });

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
                        <span className="breadcrumb-item active">گزارش مرور تنخواه</span>
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
                                            <FormSelect id="tankhah" name="tankhah" onChange={(e) => GetAllTankhahInfo(e.target.value)} className='form-control'>
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
                                    
                                       <div class="form-group mx-sm-3 mb-2">
                                            <label htmlFor="mande" > از تاریخ :</label>
                                          
                                                <DatePicker inputClass='form-control'
                                                    ref={calendarRef}
                                                    calendar={persian}
                                                    locale={persian_en}
                                                    format={"YYYY/MM/DD"}
                                                    value={state}
                                                    onChange={convert}
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
                                                    value={state}
                                                    onChange={convert}
                                                    id="tarikh" name="tarikh"
                                                    calendarPosition="bottom-right"
                                                />
                                           </div>
                                      
                                        <div class="form-group mx-sm-3 mb-2">
                                           
                                                <input type="checkbox" defaultValue={true} name="vehicle1" />
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
                    <TankhahMororInfo   resultItems={items}></TankhahMororInfo>
                </Col>
            </Row>

        </Container>
    )
}
