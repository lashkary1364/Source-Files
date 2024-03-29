import '../src/login/fonts/font-awesome-4.7.0/css/font-awesome.css'
import '../src/login/css/main.css'
import '../src/login/css/fontiran.css'
import React, { useState } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useEffect } from 'react';
import persian from "react-date-object/calendars/persian"
import { DateObject } from "react-multi-date-picker";
import swal from 'sweetalert';

const Login = () => {


    const [ErrorFlag, setErrorFlag] = useState(false);
    const [mohitItems, setMohitItems] = useState([]);
    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    const [errorMessage, setErrorMessage] = useState("");

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
        // mohit: Yup.string().required('محیط کاربری الزامی است'),
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
        },
        validationSchema,
        // validateOnChange: false,
        // validateOnBlur: false,
        onSubmit: (data) => {
            console.log({
                "UserName": data.userName,
                "UserPasss": data.password,
                "Imei": "1",

            })
            axios(
                {
                    url: serverAdress + 'login',
                    method: "post",
                    data:
                    {
                        "UserName": data.userName,
                        "UserPasss": data.password,
                        "Imei": "1",
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(function (response) {
                    console.log("response");
                    console.log(response);
                    if(response.data==401){
                        setErrorFlag(true);
                        setErrorMessage("نام کاربری یا رمز عبور نادرست است");
                        return false;
                    }else
                    if (response.data.isAdmin == true) {
                        swal("توجه", "این کاربر مجاز به ورود به سیستم تنخواه تحت وب نمی باشد", "warning");
                        return;
                    }

                    console.log("response: ")
                    console.log(response.data);
                    console.log(response.data.access_token)

                    sessionStorage.setItem("LoginTocken", JSON.stringify({
                        userFirstName: response.data.userFName,
                        userLastName: response.data.userLName,
                        UserId: response.data.userId,
                        userTocken: response.data.access_token,
                        LastMohitName: response.data.lastMohitName
                    }));

                    console.log("login token")
                    console.log(JSON.parse(sessionStorage.getItem("LoginTocken")).LastMohitName);
                    const date = new DateObject({ calendar: persian });
                    console.log(date.year);
                    sessionStorage.setItem("SalMali", date.year);

                    if (response.data.access_token != null) {
                        console.log("acess tocken");
                        console.log(response.data.access_token);
                        localStorage.setItem("access-tocken", response.data.access_token);
                        window.location.replace('/home');

                    } else {
                        setErrorFlag(true);
                        setErrorMessage("نام کاربری یا رمز عبور نادرست است")
                    }


                }).catch(function (error) {
                    // handle error
                    setErrorFlag(true);
                    console.log("axois error: " + error);
                    swal("error", error.message, "error");
                    setErrorMessage(error.message)
                    localStorage.clear();

                })
        }

    });


    // const getWorkEnvironment = () => {

    //     setMohitItems([])
    //     axios(
    //         {
    //             url: serverAdress + `GetAllWorkEnvironment`,
    //             method: "get",
    //             headers:
    //             {
    //                 //Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
    //                 'Cache-Control': 'no-cache',
    //                 'Pragma': 'no-cache',
    //                 'Expires': '0',
    //             }
    //         }).then(function (response) {

    //             console.log("response : ");
    //             console.log(response.data);                              

    //             const resultItems = response.data;

    //             resultItems.map((data) => {
    //                 setMohitItems(mohitItems => [...mohitItems, { Id: data.mohitID, Name: data.fullMohitOnvan }]);
    //             });

    //         }).catch(function (error) {
    //             setErrorFlag(true);
    //             // handle error
    //             console.log("axois error: ");
    //             console.log(error)
    //         })
    // }


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
                    <form className="login100-form validate-form" style={{ margin: "auto", marginTop: "40px" }} onSubmit={formik.handleSubmit} >
                        <span className="login100-form-title" style={{ color: "white", fontFamily: "IRANSans", fontSize: "20px" }}>
                            ورود به سامانه تنخواه گردان
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
                                <div style={{ direction: "rtl", color: "red", textAlign: "right" }}><i className='fa fa-warning pl-2'></i><span>{errorMessage}</span></div>
                                :
                                ''
                        }

                        {/* <div className={formik.errors.mohit && formik.touched.mohit ? 'wrap-input100 validate-input alert-validate' : ' wrap-input100 validate-input'}
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
                        */}


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
