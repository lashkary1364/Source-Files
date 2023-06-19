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
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TankhahMororListExpenseType } from "./TankhahMororListExpenseType";

export const MororListExpenseType = () => {

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
    const [options, setOptions] = useState([]);
    const [values, setValues] = React.useState(null);
    useEffect(() => {
        GetAllTankhah();
        GetCurrentFinanceYear();
        GetAllSoratHazineSharh();
    }, []);

    const validationSchema = Yup.object().shape({
        sharhDetail: Yup.string().required('فیلد شرح اجباری است'),

    });

    const formik = useFormik({
        initialValues:
        {
            sharhDetail: options,
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        isInitialValid: true,
        onSubmit: (data) => {

            getAllTankhahMoror();

        }
    });

    const onChange = (_, a) => {
        formik.setFieldValue("sharhDetail", a.name);
        setValues(a);
    };

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

    const GetAllSoratHazineSharh = () => {

        axios(
            {
                url: serverAdress + `GetAllSouratHazineSharh?mohitId=${user.lastMohitID} &sharh=${"11111"}`,
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
                    setOptions(options => [...options,
                    {
                        codeHesab: data.code_Hesab,
                        value: data.item_ID,
                        name: data.item_Title_text,
                        markaz1: data.markaz1,
                        markaz2: data.markaz2,
                        markaz3: data.markaz3
                    }]);

                });

            }).catch(function (error) {
                // handle error
                console.log("axois error: ");
                console.log(error)
            })

    }

    const getAllTankhahMoror = (e) => {
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
                url: serverAdress + "GetMororListHazineType",
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
                    "dateFrom": dateFrom,
                    "dateTo": dateTo,
                    "tankhahId": tankhahId,
                    "hazine": ""

                }
            }).then(function (response) {
                console.log("'chva ....")
                console.log(response)
                const resultItems = response.data;              
                resultItems.map((item) => {
                    console.log(item);                  
                    setItems([{ ...items, radif: item.radif, Mablagh: item.mab, Sharh: item.sharh, Shomare: item.shomare, ShomareBarge: item.shomare_barge, TarikhPardakht: item.tarikh_pardakht }])
                });                
            }).catch(function (error) {
                // handle error
                console.log("axois error: ");
                console.log(error)
            });

    }

    return (
        <Container fluid className="main-content-container px-4">
            <Row className="page-header mt-2 ">
                <Col lg="12" >
                    <nav className="breadcrumb">
                        <a className="breadcrumb-item" href="#">خانه</a>
                        <span className="breadcrumb-item active">گزارش مرور- لیست نوع هزینه ها</span>
                    </nav>
                </Col>

                <Col lg="12" >
                    <Card small className="mb-2">
                        <ListGroup flush>
                            <ListGroupItem >
                                <form class="form-inline" onSubmit={formik.handleSubmit}>
                                                                      
                                    <div class="form-group mx-sm-3 mb-2">
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

                                    <div class="form-group mx-sm-3 mb-2" >
                                        <label htmlFor="sharhDetail">شرح *:</label>
                                        <Autocomplete style={{ width: "300px" }}
                                            id="tags-outlined"
                                            options={options}
                                            getOptionLabel={(option) => option.name || ""}
                                            className={'form-control' + (formik?.errors?.sharhDetail && formik?.touched?.sharhDetail ? ' is-invalid' : '')}
                                            value={values}
                                            getOptionSelected={(option, value) => option.name === value.name}
                                            onChange={onChange}
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                                <TextField {...params} variant="outlined" placeholder="شرح" />
                                            )}
                                        />
                                        {
                                            values == null ? <div className="invalid-feedback">
                                                {
                                                    'فیلد شرح الزامی است'
                                                }

                                            </div> : ''
                                        }
                                    </div>

                                    <Button theme="primary" className="mb-2 mr-1" type="submit"  >
                                        <span className='form-inline'>
                                            گزارش
                                        </span>
                                    </Button>

                                </form>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                    {items.length > 0 ? <TankhahMororListExpenseType resultItems={items} dateFrom={dateFrom} dateTo={dateTo}></TankhahMororListExpenseType> : ''}
                </Col>
            </Row>
        </Container>
    )
}
