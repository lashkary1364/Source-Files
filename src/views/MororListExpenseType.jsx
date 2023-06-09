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
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TankhahMororListExpenseType } from "./TankhahMororListExpenseType";
import swal from 'sweetalert';
import { Spinner } from 'react-bootstrap';



export const MororListExpenseType = () => {

    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    const [tankhahItems, setTankhahItems] = useState([]);
    const [state, setState] = useState(new DateObject({ calendar: persian, locale: persian_en }));
    const [dateFrom, setDateFrom] = useState(new DateObject({ calendar: persian, locale: persian_en }).format());
    const [dateTo, setDateTo] = useState(new DateObject({ calendar: persian, locale: persian_en }).format());
    const [user] = useState(JSON.parse(sessionStorage.getItem("LoginTocken")));
    const calendarRef = useRef();
    const [items, setItems] = useState([]);
    const [dateFromError, setDateFromError] = useState(false);
    const [dateToError, setDateToError] = useState(false);
    const [tankhahId, setTankhahId] = useState();
    const [options, setOptions] = useState([]);
    const [values, setValues] = React.useState(null);
    const [mohitId, setMohitId] = useState();
    const [mohitItems, setMohitItems] = useState([]);
    const [salMaliItems, setSalMaliItems] = useState([]);
    const [salMali, setSalMali] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [yearFrom, setYearFrom] = useState(state.year);
    const [yearTo, setYearTo] = useState(state.year);
    const [salText, setSalText] = useState();

    useEffect(() => {

        GetAllMohit();

        //GetAllTankhah();
        // GetCurrentFinanceYear();
        // GetAllSoratHazineSharh();
    }, []);

    const validationSchema = Yup.object().shape({
        sharhDetail: Yup.string().required('فیلد شرح اجباری است'),
        tankhah: Yup.string().required('فیلد  تنخواه اجباری است'),
    });

    const formik = useFormik({
        initialValues:
        {
            sharhDetail: options,
            tankhah: ''
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        isInitialValid: true,
        onSubmit: (data) => {
            console.log("data")
            console.log(data);
            console.log("sharh ...");
            console.log(options);
            console.log(dateFrom);
            console.log(yearFrom);
            console.log(dateTo);
            console.log(yearTo);
            if (tankhahId == undefined || dateFrom == undefined || dateTo == undefined) {
                swal("error", "وارد کردن تنخواه و بازه تاریخی و شرح الزامی است", "warning");
                return;
            }
    
            if (dateFrom > dateTo) {
                swal("توجه", "بازه تاریخی درست وارد نشده است", "warning");
                return;
            }
    
            if (yearFrom != salText || yearTo != salText) {
                swal("توجه", "بازه تاریخی و سال ملی یکسان نیست", "warning");
                return;
            }
            getAllTankhahMoror();

        }
    });

    const onChange = (_, a) => {
        formik.setFieldValue("sharhDetail", a.name);

        setValues(a);

    };

    const convertFrom = (date, format = state.format) => {
        let object = { date, format }
        if (date == null)
            setDateFromError(true);
        else {
            setDateFromError(false);
        }
        setYearFrom(new DateObject(object).convert(persian, persian_en).format("YYYY"));
       // setState(new DateObject(object).convert(persian, persian_en).format());
        setDateFrom(new DateObject(object).convert(persian, persian_en).format())
    }

    const convertTo = (date, format = state.format) => {
        let object = { date, format }
        if (date == null)
            setDateToError(true);
        else {
            setDateToError(false);
        }

        setYearTo(new DateObject(object).convert(persian, persian_en).format("YYYY"));
        //setState(new DateObject(object).convert(persian, persian_en).format());
        setDateTo(new DateObject(object).convert(persian, persian_en).format())
    }

    const GetAllTankhahInfo = (tankhahId) => {
        setTankhahId(tankhahId);


        axios(
            {
                url: serverAdress + `GetMohitId?tankhahId=${tankhahId}`,
                method: "get",
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            }).then(function (response) {
                console.log(response.data);

                setMohitId(response.data)

            }).catch(function (error) {
                // handle error      
                swal("error", error.message, "error");

            });


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
                }

            }).catch(function (error) {
                // handle error
                // console.log("axois error: ");
                // console.log(error);
                // alert(error);
                swal("error", error.message, "error");
            })
    }

    const GetAllTankhah = (salId) => {

        console.log(mohitId);
        console.log(user.UserId);
        console.log(salId);

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

    const GetAllSoratHazineSharh = (mohitId) => {

        axios(
            {
                url: serverAdress + `GetAllSouratHazineSharh?mohitId=${mohitId}`,
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
                // console.log("axois error: ");
                // console.log(error);
                // alert(error);
                swal("error", error.message, "error");
            })

    }

    const getAllTankhahMoror = () => {
       
        setIsLoading(true);
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
                    "hazine": values.name
                }
            }).then(function (response) {
                const resultItems = response.data;
                setItems([]);
                // console.log(response.data);            
                resultItems.map((item) => {
                    setItems(items => [...items, { radif: item.radif, Mablagh: item.mab.toLocaleString(), Sharh: item.sharh, Shomare: item.shomare, ShomareBarge: item.shomare_barge, TarikhPardakht: item.tarikh_pardakht }])
                });

                setIsVisible(true);
                window.setTimeout(() => {
                    setIsLoading(false);
                }, 2000);


            }).catch(function (error) {
                // handle error
                // console.log("axois error: ");
                // console.log(error);
                // alert(error);
                swal("error", error.message, "error");
                setIsLoading(false);
            });

    }

    const changeTankhah = (tankhahId) => {
        setTankhahId(tankhahId);
        formik.setFieldValue("tankhah", tankhahId);
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

    const changeMohit = (mohitId) => {
        console.log("change mohit ...")
        console.log(mohitId);
        setMohitId(mohitId);
        GetAllSalMali(mohitId);
        GetAllSoratHazineSharh(mohitId);
    }

    const changeSalMali = (event) => {
        console.log("change sal mali");
        var index = event.nativeEvent.target.selectedIndex;
        console.log(event.nativeEvent.target[index].text);
        console.log(event.target.value)

        setSalText(event.nativeEvent.target[index].text);
        // console.log(salId);
        setSalMali(event.target.value);
        GetAllTankhah(event.target.value)
    }



    return (
        <Container fluid className="main-content-container px-4">
            <Row className="page-header mt-2 ">
                <Col lg="12" >
                    <nav className="breadcrumb">
                        <a className="breadcrumb-item" href="/home">خانه</a>
                        <span className="breadcrumb-item active">گزارش مرور- لیست نوع هزینه ها</span>
                    </nav>
                </Col>

                <Col lg="12" >
                    <Card small className="mb-2">
                        <ListGroup flush>
                            <ListGroupItem>
                                <form onSubmit={formik.handleSubmit}>
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
                                                <FormSelect id="salMali" name="salMali" onChange={(e) => changeSalMali(e)} className='form-control'>
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
                                                <FormSelect id="tankhah" name="tankhah" value={formik.values.tankhah} onChange={(e) => changeTankhah(e.target.value)} className={'form-control' + (formik.errors.tankhah && formik.touched.tankhah ? ' is-invalid' : '')}>
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
                                                <div className="invalid-feedback">
                                                    {
                                                        formik.errors.tankhah && formik.touched.tankhah
                                                            ? formik.errors.tankhah
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>


                                    <Row>
                                        <Col md="4" className="form-group">
                                            <div className="form-inline mt-3 mr-3">
                                                <label htmlFor="mande" > از تاریخ :</label>
                                                <DatePicker inputClass='form-control'
                                                    ref={calendarRef}
                                                    calendar={persian}
                                                    locale={persian_fa}
                                                    style={dateFromError == true ? { borderColor: "#c4183c", fontFamily: 'tahoma' } : { borderColor: "#e1e5eb", fontFamily: 'tahoma' }}
                                                    format={"YYYY/MM/DD"}
                                                    value={dateFrom}
                                                    onChange={convertFrom}
                                                    id="tarikh" name="tarikh"
                                                    calendarPosition="bottom-right"

                                                />

                                                {/* <DatePicker inputClass='form-control'
                                            </div>
                                           
                                                    ref={calendarRef}
                                                    calendar={persian}
                                                    locale={persian_en}
                                                    format={"YYYY/MM/DD"}
                                                    value={dateFrom}
                                                    onChange={convertFrom}
                                                    id="tarikh" name="tarikh"
                                                    calendarPosition="bottom-right"
                                                />
                                                <div className="invalid-feedback">
                                                    {
                                                        formik.errors.dateFrom && formik.touched.dateFrom
                                                            ? formik.errors.dateFrom
                                                            : null
                                                    }
                                                </div> */}
                                            </div>
                                            <div>
                                                {dateFromError == true ? <div style={{ marginTop: "0.25rem", fontSize: "80%", color: "#c4183c", fontFamily: 'IRANSans', }}>فیلد تاریخ اجباری است</div> : ''}
                                            </div>
                                        </Col>

                                        <Col md="4" className="form-group">
                                            <div className="form-inline mt-3 mr-3">
                                                <label htmlFor="etebarMax">تا تاریخ:</label>
                                                <DatePicker inputClass='form-control'
                                                    ref={calendarRef}
                                                    calendar={persian}
                                                    locale={persian_fa}
                                                    style={dateToError == true ? { borderColor: "#c4183c", fontFamily: 'tahoma' } : { borderColor: "#e1e5eb", fontFamily: 'tahoma' }}
                                                    format={"YYYY/MM/DD"}
                                                    value={dateTo}
                                                    onChange={convertTo}
                                                    id="tarikh" name="tarikh"
                                                    calendarPosition="bottom-right"
                                                />
                                            </div>
                                            <div>
                                                {dateToError == true ? <div style={{ marginTop: "0.25rem", fontSize: "80%", color: "#c4183c", fontFamily: 'IRANSans', }}>فیلد تاریخ اجباری است</div> : ''}
                                            </div>
                                        </Col>

                                        <Col md="4" className="form-group">
                                            <div className="form-inline mt-3 mr-3">
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
                                        </Col>
                                    </Row>
                                    {/* <div className="form-group mx-sm-3 mb-2">
                                        <label htmlFor="tankhah">اتتخاب تنخواه*:</label>
                                        <FormSelect id="tankhah" name="tankhah" className='form-control' onChange={(e) => GetAllTankhahInfo(e.target.value)}>
                                            {/* <option value={""}>یک موردانتخاب کنید</option> */}
                                    {/* {
                                                tankhahItems.map((item, index) => (
                                                    <option key={index}
                                                        value={item.tankhah_ID}>
                                                        {item.tankhah_name}
                                                    </option>
                                                ))
                                            }
                                        </FormSelect>
                                    </div> */}



                                    <Button theme="primary" className="mb-2 mr-1" type="submit"  >
                                        <span className='form-inline'>
                                            گزارش
                                        </span>
                                    </Button>

                                </form>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                    {isVisible ?
                        isLoading == true ? <div className="text-center" style={{ paddingTop: "50px", margin: "auto", width: "50%" }} >
                            <Spinner animation="grow" size="sm" variant="primary" />
                            <Spinner animation="grow" variant="primary" />
                            <div className='text-primary text-center' dir="rtl">در حال بارگزاری...</div>
                        </div> :
                            <TankhahMororListExpenseType resultItems={items} dateFrom={dateFrom} dateTo={dateTo}></TankhahMororListExpenseType>
                        : ''
                    }
                </Col>
            </Row>
        </Container >
    )
}
