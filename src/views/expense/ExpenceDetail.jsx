import React, { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import {
    Container, Row, Col, Card,
    FormInput,
    Button, CardBody
} from "shards-react";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from 'axios';
import CurrencyInput from 'react-currency-input-field';
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_en from "react-date-object/locales/persian_en"
import persian_fa from "react-date-object/locales/persian_fa"
import ReactLoading from 'react-loading';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/view-css.css';
import { toast } from 'react-toastify';
import { ExpenseDetailList } from './ExpenceDetailList';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';


export const ExpenceDetail = () => {

    const [isAction, setIsAction] = useState(false);
    const history = useHistory();
    const [operation, setOperation] = useState("add");
    const queryParameters = new URLSearchParams(window.location.search);
    const soratId = queryParameters.get("id")
    const calendarRef = useRef();
    const [user] = useState(JSON.parse(sessionStorage.getItem("LoginTocken")));
    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    const [tarikhError, setTarikhError] = useState(false);
    const date = new DateObject({ calendar: persian, locale: persian_en })
    const [state, setState] = useState(new DateObject({ calendar: persian, locale: persian_en }))
    const [dateDetail, setDateDetail] = useState(date.format());
    const [rowGrid, setRowGrid] = useState([]);
    const [options, setOptions] = useState([]);
    const [rowIndex, setRowIndex] = useState(0);
    const [selectedRow, setSelectedRow] = useState();
    const [values, setValues] = React.useState(null);
    const [ok, setOk] = useState();
    const [tankhahSoratHazineH, setTankhahSoratHazineH] = useState();
    const [mohitId, setMohitId] = useState();
    const [year, setYear] = useState(state.year);
    const [salText, setSalText] = useState();
    const convert = (date, format = state.format) => {

        console.log(dateDetail);

        if (date == null)
            setTarikhError(true);
        else {
            setTarikhError(false);
        }

        let object = { date, format }
        setState(new DateObject(object).convert(persian, persian_en).format());
        setYear(new DateObject(object).convert(persian, persian_en).format("YYYY"));
        setDateDetail(new DateObject(object).convert(persian, persian_en).format());
    }

    const onChange = (_, a) => {
        formik.setFieldValue("sharhDetail", a.name);
        setValues(a);
    };

    const handleChangeShmare = (id) => {
        const result = id.replace(/\D/g, '');
        formik.setFieldValue("id", result);
    }

    useEffect(() => {

        getSouratHazineHeader();
        getAllSoratHazineDetail();

    }, []);

    const getSouratHazineHeader = () => {

        axios(
            {
                url: serverAdress + `GetAllSouratHazineHeader?souratId=${soratId}`,
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
                console.log(resultItems);
                setTankhahSoratHazineH({ "status": resultItems.status })
                setMohitId(response.data.mohidID);
                setSalText(response.data.salMali);
                GetAllSoratHazineSharh(response.data.mohidID);
            }).catch(function (error) {

                swal("error", error.message, "error");
            });

    }

    const getAllSoratHazineDetail = () => {

        axios(
            {
                url: serverAdress + `GetAllSouratHazineDetail?souratId=${soratId}`,
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
                setRowGrid([]);

                resultItems.map(data => {
                    setRowGrid(rowGrid => [...rowGrid, {
                        "ID": data?.id,
                        "SoratID": data?.hazine_ID, "ShomareBarge": data?.shomare_barge,
                        "TarikhPardakht": data?.tarikh_pardakht, "Sharh": data?.sharh, "CodeHesab": data?.code_hesab
                        , "Mrkaz1Code": data?.mrkaz1_code, "Mrkaz2Code": data?.mrkaz2_code, "Mrkaz3Code": data?.mrkaz3_code
                        , "Mablagh": data?.mab, "Tozihat": data?.tozihat,
                        "item_ID": data?.item_ID,
                        "State": data?.state,
                        "ok": data?.ok,
                        "okDesc": data?.ok == 0 ? 'بررسی نشده' : data?.ok == 1 ? 'تایید شده' : 'رد شده'
                    }]);
                });

            }).catch(function (error) {
                swal("error", error.message, "error");

            });

    }

    const GetAllSoratHazineSharh = (mohitId) => {
       
        console.log(serverAdress + `GetAllSouratHazineSharh?mohitId=${mohitId}`);
       
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
                swal("error", error.message, "error");
            })

    }

    const handleChangePrice = (value) => {

        if (value == undefined) {
            formik.setFieldValue("price", '');
        } else {
            formik.setFieldValue("price", value);
        }

    }

    const validationSchema = Yup.object().shape({
        sharhDetail: Yup.string().required('فیلد شرح اجباری است'),
        id: Yup.string().required('فیلد شماره فاکتور اجباری است'),
        tarikhDetail: Yup.string().required('فیلد تاریخ اجباری است'),
        price: Yup.string().required('فیلد مبلغ پرداختی اجباری است'),
    });

    const formik = useFormik({
        initialValues:
        {
            id: '',
            tarikhDetail: new Date() || null,
            price: '',
            sharhDetail: options,
            tozihatDetail: ''
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        isInitialValid: true,
        onSubmit: (data) => {

            if (operation == "add") {

                console.log(dateDetail);
                if (tankhahSoratHazineH.status != 0) {
                    swal("توجه", "این سند قابل ویرایش نمیباشد", "warning");
                    return;
                }

                console.log(year);
                console.log(salText);
                if (year != salText) {
                    swal("توجه", " تاریخ و سال مالی یکسان نیست", "warning");
                    return;
                }



                setRowIndex(rowIndex + 1);
                const ids = rowGrid.map(object => {
                    return object.ID;
                });

                let max = 0;

                if (ids.length == 0) {

                } else {
                    max = Math.max(...ids);
                }

                setRowGrid([...rowGrid, {
                    "ID": max + 1, "SoratID": parseInt(soratId), "ShomareBarge": parseInt(data.id) == NaN ? null : parseInt(data.id), "TarikhPardakht": dateDetail, "Sharh": values.name, "CodeHesab": values.codeHesab, "Mrkaz1Code": values.markaz1, "Mrkaz2Code": values.markaz2, "Mrkaz3Code": values.markaz3, "Mablagh": parseInt(data.price), "Tozihat": data.tozihatDetail
                    , "item_ID": values?.value, "State": 0, "ok": 0
                }]);

                setValues(null);

                formik.setFieldValue("id", "");
                formik.setFieldValue("price", "");
                formik.setFieldValue("tozihatDetail", "");
                formik.setFieldValue("sharhDetail", options)
                formik.setFieldError({});
                formik.resetForm({ values: formik.initialValues, errors: {}, touched: { message: false } });

                return;
            }

            if (operation == "edit") {

                if (ok != 0) {
                    swal("توجه", "این سند قابل ویرایش نیست", "warning")
                    return;
                }
                if (year != salText) {
                    swal("توجه", " تاریخ و سال مالی یکسان نیست", "warning");
                    return;
                }

                axios(
                    {
                        url: serverAdress + `GetAllShomareName?list=${parseInt(soratId)}`,
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

                        if (resultItems > 0) {
                            swal("توجه", "برای این سند نامه صادر شده است و قابل ویرایش نمیباشد", "warning");
                            return;
                        } else {
                            axios(
                                {
                                    url: serverAdress + 'UpdateSouratHazineDetail',
                                    method: "put",
                                    headers:
                                    {
                                        Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
                                        'Cache-Control': 'no-cache',
                                        'Pragma': 'no-cache',
                                        'Expires': '0',
                                        //'Content-Type': 'application/json',
                                    },
                                    data:
                                    {
                                        "ID": parseInt(selectedRow.ID),
                                        "hazine_ID": parseInt(soratId),
                                        "shomare_barge": parseInt(data.id),
                                        "tarikh_pardakht": dateDetail,
                                        "sharh": data.sharhDetail,
                                        "code_hesab": values.codeHesab,
                                        "mrkaz1_code": values.markaz1,
                                        "mrkaz2_code": values.markaz2,
                                        "mrkaz3_code": values.markaz3,
                                        "mab": parseInt(data.price),
                                        "tozihat": data.tozihatDetail,
                                    }
                                }).then(function (response) {

                                    toast.success('عملیات با موفقیت انجام پذیرفت', {
                                        position: toast.POSITION.TOP_LEFT,
                                        className: 'toast-message'
                                    });

                                    setTimeout(() => {
                                        setIsAction(false);
                                        getAllSoratHazineDetail();
                                        // history.push("/expencelist");
                                    }, 1000);

                                }).catch(function (error) {
                                    setIsAction(false);
                                    swal("error", error.message, "error");

                                });


                        }

                    }).catch(function (error) {

                        swal("Error", error.message, "error");
                        return null;
                    });

            }
        }

    });

    const convertEnglishToPersian = (str) => {
        var newTarikh = "";
        for (var i = 0; i < str.length; i++) {

            switch (str[i]) {
                case "1":
                    var newStr = str[i].replace("1", '۱');

                    break;
                case "2":
                    var newStr = str[i].replace("2", '۲');

                    break;
                case "3":
                    var newStr = str[i].replace("3", '۳');

                    break;
                case "4":
                    var newStr = str[i].replace("4", '۴');

                    break;
                case "5":
                    var newStr = str[i].replace("5", '۵');

                    break;
                case "6":
                    var newStr = str[i].replace("6", '۶');

                    break;
                case "7":
                    var newStr = str[i].replace("7", '۷');

                    break;
                case "8":
                    var newStr = str[i].replace("8", '۸');

                    break;
                case "9":
                    var newStr = str[i].replace("9", '۹');

                    break;
                case "0":
                    var newStr = str[i].replace("0", '۰');

                    break;
                case "/":
                    var newStr = str[i].replace("/", '/');

                    break;
            }

            newTarikh += newStr;
        }

        return newTarikh;
    }

    const editSoratHazineDetail = (data, op) => {

        formik.setFieldValue("id", data?.ShomareBarge);
        formik.setFieldValue("tarikhDetail", data?.TarikhPardakht);
        formik.setFieldValue("price", data?.Mablagh);
        formik.setFieldValue("tozihatDetail", data?.Tozihat);
        setValues({ codeHesab: data?.CodeHesab, value: data?.item_ID, name: data?.Sharh, markaz1: data?.Mrkaz1Code, markaz2: data?.Mrkaz2Code, markaz3: data?.Mrkaz3Code });
        formik.setFieldValue("sharhDetail", data?.Sharh);
        setSelectedRow(data);
        setOperation(op);
        setOk(data?.ok);
        setState(data?.TarikhPardakht);
        setDateDetail(data?.TarikhPardakht);

    }

    const handleCancel = () => {

        formik.setFieldValue("id", "");
        formik.setFieldValue("price", "");
        formik.setFieldValue("tozihatDetail", "");
        formik.setFieldValue("sharhDetail", options)
        formik.setFieldError({});
        formik.resetForm({ values: formik.initialValues, errors: {}, touched: { message: false } });

    }

    const handleNew = () => {

        formik.setFieldValue("id", "");
        formik.setFieldValue("price", "");
        formik.setFieldValue("tozihatDetail", "");
        formik.setFieldValue("sharhDetail", options)
        formik.setFieldError({});
        formik.resetForm({ values: formik.initialValues, errors: {}, touched: { message: false } });
        setOperation("add");
    }

    const deleteSouratHazineDetail = (id) => {

        const newRowData = rowGrid.filter(m => m.ID !== id);
        setRowGrid(newRowData);

        const headers = {
            Authorization: `Bearer ${localStorage.getItem("access-tocken")}`
        };

        axios.delete(serverAdress + `DeleteSouratHazineDetail?id=${id}`, { headers })
            .then(function (res) {
                toast.success('عملیات با موفقیت انجام پذیرفت', {
                    position: toast.POSITION.TOP_LEFT,
                    className: 'toast-message'
                });
            }).catch(error => {
                swal("error", error.message, "error");
            });
    }


    return (
        <Container fluid className="main-content-container px-4">
            <Row className="page-header mt-2 ">
                <Col lg="12" >
                    <nav className="breadcrumb">
                        <a className="breadcrumb-item" href="/home">خانه</a>
                        <a className="breadcrumb-item" style={{ color: "#007bff" }} href="/expencelist">مدیریت صورت هزینه ها</a>
                        <span className="breadcrumb-item active">جزییات صورت هزینه</span>
                    </nav>
                </Col>
            </Row>

            <Card small className="h-100">
                <CardBody className="pt-0">
                    <Row>
                        <Col lg="12" >
                            <form onSubmit={formik.handleSubmit}>
                                <Row>
                                    <Col>
                                        <form onSubmit={formik.handleSubmit}>
                                            <Row>
                                                <Col md="3" className="form-group">
                                                    <label htmlFor="title">شماره فاکتور/دستور :</label>
                                                    <FormInput type="text" name="id" id="id" className={'form-control' + (formik.errors.id && formik.touched.id ? ' is-invalid' : '')} maxLength="4"
                                                        onChange={(e) => handleChangeShmare(e.target.value)} value={formik.values.id}
                                                        placeholder="شماره فاکتور" />
                                                    <div className="invalid-feedback">
                                                        {
                                                            formik.errors.id && formik.touched.id
                                                                ? formik.errors.id
                                                                : null
                                                        }
                                                    </div>
                                                </Col>
                                                <Col md="3" className="form-group">
                                                    <label htmlFor="tarikhDetail">تاریخ *:</label>
                                                    <div>
                                                        <DatePicker inputClass='form-control'
                                                            ref={calendarRef}
                                                            calendar={persian}
                                                            locale={persian_fa}
                                                            style={tarikhError == true ? { borderColor: "#c4183c", fontFamily: 'tahoma' } : { borderColor: "#e1e5eb", fontFamily: 'tahoma' }}
                                                            format={"YYYY/MM/DD"}
                                                            value={state}
                                                            onChange={convert}
                                                            id="tarikhDetail" name="tarikhDetail"
                                                            calendarPosition="bottom-right"
                                                            disabled={operation == "delete" ? true : false} />
                                                        {/* <span>{dateDetail}</span> */}
                                                    </div>
                                                    {tarikhError == true ? <div style={{ marginTop: "0.25rem", fontSize: "80%", color: "#c4183c", fontFamily: 'IRANSans', }}>فیلد تاریخ اجباری است</div> : ''}
                                                </Col>
                                                <Col md="3" className="form-group">
                                                    <label htmlFor="price">مبلغ پرداختی *: </label>
                                                    <CurrencyInput
                                                        id="price"
                                                        name="price" maxLength={10}
                                                        placeholder="مبلغ پرداختی"
                                                        className={'form-control' + (formik.errors.price && formik.touched.price ? ' is-invalid' : '')}
                                                        value={formik.values.price}
                                                        onValueChange={(name, value) => handleChangePrice(name, value)} />
                                                    <div className="invalid-feedback">
                                                        {
                                                            formik.errors.price && formik.touched.price
                                                                ? formik.errors.price
                                                                : null
                                                        }
                                                    </div>
                                                </Col>
                                                <Col md="3" className="form-group">
                                                    <label htmlFor="sharhDetail">شرح *:</label>
                                                    <Autocomplete
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

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="4" className="form-group">
                                                    <label htmlFor="tozihatDetail">توضیحات :</label>
                                                    <textarea className='form-control' rows="1" id="tozihatDetail" name='tozihatDetail' onChange={formik.handleChange} value={formik.values.tozihatDetail} maxLength="300"  ></textarea>
                                                </Col>
                                            </Row>
                                        </form>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4" className="form-group">
                                        <div className='form-inline'>
                                            <Button theme="primary" className="mb-2 mr-1" type="submit" disabled={isAction == true ? true : false} >
                                                <span className='form-inline'>
                                                    {operation == "add" ? " افزودن به لیست تنخواه" : "ثبت"}
                                                    {isAction == true ? <ReactLoading type="spin" color="red" height={20} width={20} className="ml-2" /> : ''}
                                                </span>
                                            </Button>
                                            <Button theme="primary" className="mb-2 mr-1" type="button" onClick={handleCancel} >
                                                <span className='form-inline'>
                                                    لغو
                                                </span>
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </form>

                            <ExpenseDetailList gridData={rowGrid} editDetail={editSoratHazineDetail} handleNew={handleNew} deleteSouratHazineDetail={deleteSouratHazineDetail} ></ExpenseDetailList>

                        </Col>
                    </Row>
                </CardBody>

            </Card>


        </Container >
    )
}
