import '../src/login/fonts/font-awesome-4.7.0/css/font-awesome.css'
import '../src/login/css/main.css'
import '../src/login/css/fontiran.css'
import React, { useState } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {
    FormSelect
} from "shards-react";
import { useEffect } from 'react';
import { useCallback } from 'react';
import persian from "react-date-object/calendars/persian"
//import persian_fa from "react-date-object/locales/persian_fa"
import DatePicker, { DateObject } from "react-multi-date-picker";
import {
    useHistory
} from 'react-router-dom';

const Login = () => {

    const history = useHistory();
    const [ErrorFlag, setErrorFlag] = useState(false);
    const [mohitItems, setMohitItems] = useState([]);
    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    const [resultItems] = [];

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required('فیلد نام کاربری اجباری است'),
        //test test
        // username: Yup.string()
        //   .required('Username is required')
        //   .min(6, 'Username must be at least 6 characters')
        //   .max(20, 'Username must not exceed 20 characters'),
        //email: Yup.string().required('Email is required').email('Email is invalid'),
        password: Yup.string()
            .required('فیلد پسورد الزامی است')
            .min(1, 'Password must be at least 6 characters'),
        mohit: Yup.string().required('محیط کاربری الزامی است'),
        //.max(40, 'Password must not exceed 40 characters'),
        // confirmPassword: Yup.string()
        //   .required('Confirm Password is required')
        //   .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
    });

    const formik = useFormik({
        initialValues:
        {
            userName: '',
            password: '',
            mohit: ''
            //email: '',
            //password: '',
            // confirmPassword: '',
            // acceptTerms: false,
        },
        validationSchema,
        // validateOnChange: false,
        // validateOnBlur: false,
        onSubmit: (data) => {
            axios(
                {
                    url: serverAdress + 'login',
                    method: "post",
                    data:
                    {
                        "UserName": data.userName,
                        "UserPasss": data.password,
                        "Imei": "1"
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(function (response) {
                    // response.setHeader("Access-Control-Allow-Origin", "*");
                    // response.setHeader("Access-Control-Allow-Credentials", "true");
                    // response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD");
                    // response.setHeader("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, "
                    //     + "Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");

                    console.log("response: ")
                    console.log(response);
                    console.log(response.data.access_token)

                    sessionStorage.setItem("LoginTocken", JSON.stringify({
                        userFirstName: response.data.userFName,
                        userLastName: response.data.userLName,
                        UserId: response.data.userId,
                        userTocken: response.data.access_token,
                        lastMohitID: response.data.lastMohitID
                    }));

                    console.log("login token")
                    console.log(sessionStorage.getItem("LoginTocken"))


                    const date = new DateObject({ calendar: persian })
                    console.log(date.year)
                    sessionStorage.setItem("SalMali", date.year);

                    // sessionStorage.getItem("LoginTocken");
                    // console.log("get session item:")
                    // const xxx=sessionStorage.getItem("LoginTocken");
                    // console.log("xxx:");
                    // console.log(JSON.parse(xxx).userFirstName)

                    if (response.data.access_token != null) {
                        //  window.location = '/blog-overview'
                        //  this.props.history.replace('/blog-overview')
                        console.log("acess tocken")
                        console.log(response.data.access_token)
                        localStorage.setItem("access-tocken", response.data.access_token);
                        window.location.replace('/home')
                        // history.push("/home");
                        //window.location.replace('http://192.168.0.254:1212/home')
                        // window.location.replace('/blog-overview')
                        // window.location.assign('http://localhost:3000/blog-overview')
                        // window.open('http://localhost:3000/blog-overview')

                    } else {
                        setErrorFlag(true);
                    }

                    //window.location = '/dashboard'
                    //response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))

                }).catch(function (error) {
                    // handle error
                    setErrorFlag(true);
                    console.log("axois error: " + error);
                    console.log(ErrorFlag);
                    localStorage.clear();
                })
        }

    });

    useEffect(() => {

        getWorkEnvironment();

    }, []);

    useEffect(() => {
        getWorkEnvironment();


    }, [formik.values.userName], [formik.values.password])



    useEffect(
        () => {
            console.log("gggggggggggggggg11111111111")
            mohitItems.map(data => {
                console.log(data.Id);
                console.log(data.Name)
            })
        },
        [mohitItems],
    )


    const getWorkEnvironment = () => {

        setMohitItems([])
        axios(
            {
                url: serverAdress + `GetAllWorkEnvironment`,
                method: "get",
                headers:
                {
                    //Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            }).then(function (response) {

                console.log("response : ");
                console.log(response.data);
                const resultItems = response.data;

                resultItems.map((data) => {
                    setMohitItems(mohitItems => [...mohitItems, { Id: data.mohitID, Name: data.fullMohitOnvan }]);
                });

            }).catch(function (error) {
                setErrorFlag(true);
                // handle error
                console.log("axois error: ");
                console.log(error)
            })
    }


    // const handleChangeUserName = (value) => {

    //     console.log("............................")
    //     formik.setFieldValue("userName", value)
    //     getWorkEnvironment();


    // }



    return (

        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100" style={{ padding: "0px", paddingBottom: "60px" }}>
                    <label height="100%" width="100%" runat="server"></label>
                    <div style={{ width: "500px", height: "215px", margin: "auto", marginTop: "40px", textAlign: "center" }}>
                        <label className="login100-form-title" style={{ margin: "auto", marginBottom: "0px", paddingBottom: "25px", direction: "rtl", color: "white", fontFamily: "IRANSans", fontSize: "20px" }}>اطلاعیه ها</label>
                        <div style={{ textAlign: "right", marginTop: "0px" }}>
                            <span style={{ color: "white", fontWeight: "500", fontSize: "13px", fontFamily: "IRANSans" }}>. ١.كليه عمليات مربوط به ثبت ورود و خروج و تسهيم كاركرد در همان روز انجام مي گردد</span>
                            <br />
                            <span style={{ color: "white", fontWeight: "500", fontSize: "12px", fontFamily: "IRANSans" }}>.٢.درصورت مشكل درعدم ثبت پشتيباني سيستم توسط خانم رستمي تايك ساعت بعدانجام مي گردد</span>
                            <br />
                            <span style={{ color: "white", fontWeight: "500", fontSize: "12px", fontFamily: "IRANSans" }}>. ٣.در قسمت ورود اطلاعات جديد محل خدمت همان محل حضور فيزيكي شماست</span>
                            <br />
                            <span style={{ color: "white", fontWeight: "500", fontSize: "12px", fontFamily: "IRANSans" }}>. ٤.در تسهيم كاركرد قسمت نام شركت همان فعاليتي هست كه در طي روز كاركرد داشته ايد</span>
                            <br />
                            <span style={{ color: "white", fontWeight: "500", fontSize: "12px", fontFamily: "IRANSans" }}>. ٥.عنوان قرارداد و عنوان فعاليت با توجه به محاسبه بهاي تمام شده به دقت و صحيح وارد شود</span>
                            <br />
                            <span style={{ color: "white", fontWeight: "500", fontSize: "12px", fontFamily: "IRANSans" }}>. ٦.مرخصي ها در موعد مقرر و با تاييد سرپرست انجام شود</span>
                        </div>
                    </div>

                    <form className="login100-form validate-form" style={{ margin: "auto", marginTop: "40px" }} onSubmit={formik.handleSubmit} >
                        <span className="login100-form-title" style={{ color: "white", fontFamily: "IRANSans", fontSize: "20px" }}>
                            ورود به سامانه
                        </span>
                        <div className={formik.errors.userName && formik.touched.userName ? 'wrap-input100 validate-input alert-validate' : ' wrap-input100 validate-input'} style={{ direction: "rtl", fontSize: "20px", fontFamily: "IRANSans" }} data-validate="نام کاربری ضروری می باشد">
                            <input name="userName" className="input100" onChange={formik.handleChange} value={formik.values.userName} id="userName" type="text" placeholder="نام کاربری" style={{ direction: "rtl", height: "40px", fontFamily: "IRANSans" }} />
                            <span className="focus-input100" style={{ direction: "rtl" }}></span>
                            <span className="symbol-input100" style={{ direction: "rtl" }}>
                                <i className="fa fa-envelope" aria-hidden="true" style={{ direction: "rtl", marginRight: "10px" }}></i>
                            </span>
                        </div>
                        <div className={formik.errors.password && formik.touched.password ? 'wrap-input100 validate-input alert-validate' : ' wrap-input100 validate-input'} style={{ direction: "rtl", fontFamily: "IRANSans" }} data-validate="رمز عبور ضروری می باشد" >
                            <input name="password" type="password" className="input100" onChange={formik.handleChange} value={formik.values.password} id="password" placeholder="رمز عبور" style={{ direction: "rtl", height: "40px", fontFamily: "IRANSans" }} />
                            <span className="focus-input100" style={{ direction: "rtl" }}></span>
                            <span className="symbol-input100" style={{ direction: "rtl" }}>
                                <i className="fa fa-lock" aria-hidden="true" style={{ direction: "rtl", marginRight: "10px" }}></i>
                            </span>
                        </div>
                        {
                            ErrorFlag == true ?
                                <div style={{ direction: "rtl", color: "red", textAlign: "right" }}><i className='fa fa-warning pl-2'></i><span>نام کاربری یا رمز عبور اشتباه میباشد</span></div>
                                :
                                ''
                        }

                        <div className={formik.errors.mohit && formik.touched.mohit ? 'wrap-input100 validate-input alert-validate' : ' wrap-input100 validate-input'}
                            style={{ direction: "rtl", fontFamily: "IRANSans" }} data-validate="محیط کاربری ضروری است" >
                            <FormSelect style={{ direction: "rtl", height: "40px", fontFamily: "IRANSans", borderRadius: "25px" }}
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mohit}
                                id="mohit" name="mohit"
                                className={'form-control'}>
                                <option value="" style={{ fontFamily: "IRANSans", direction: "rtl", height: "40px" }}>محیط کاری را انتخاب نمایید ...</option>

                                {mohitItems.map((item) => (

                                    <option key={item.Id} value={item.Id}>{item.Name}</option>

                                ))}

                            </FormSelect>
                            <span className="focus-input100" style={{ direction: "rtl" }}></span>
                            <span className="symbol-input100" style={{ direction: "rtl" }}>
                                <i className="fa fa-home" aria-hidden="true" style={{ direction: "rtl", marginRight: "10px" }}></i>
                            </span>
                        </div>
                        {/* {
                            ErrorFlag == true ?
                                <div style={{ direction: "rtl", color: "red", textAlign: "right" }}><i className='fa fa-warning pl-2'></i><span>وارد کردن محیط کاربری الزامی است</span></div>
                                :
                                ''
                        } */}


                        <div className="container-login100-form-btn" style={{ fontFamily: "IRANSans" }}>
                            <button className="login100-form-btn" type='submit' style={{ height: "40px", width: "150px", fontFamily: "IRANSans" }}>ورود</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
