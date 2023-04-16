import React, { useContext, useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
    Container, Row, Col, Card, CardHeader, ListGroup,
    ListGroupItem, FormInput,
    Button, Alert, FormSelect
} from "shards-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactLoading from 'react-loading';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { faCircleExclamation, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { PersianCalendar } from '../PersianCalendar';
import { useRef } from 'react';


export const Customer = ({ dataParentToChild }) => {

    const [tankhahItems, setTankhahItems] = React.useState([
        {
            tankhah_name: "انتخاب کنید ..",
            tankhah_ID: "-1"
        },

    ]);


    useEffect(() => {
        // fetch data from tankah
        GetAllTankhah();

    });



    const GetAllTankhah = () => {

        fetch('https://localhost:44307/api/DOTMobileApi/GetAll_Tankhah?userId=1100001')
            .then(result => result.json())
            .then(tankhahItems => setTankhahItems(tankhahItems))
    }

    const dateRef = new useRef(null)
    // console.log("dataParentToChild")
    // console.log(dataParentToChild)
    // console.log(dataParentToChild.OperationType)
    // console.log(dataParentToChild.data)

    const submit = () => {
        confirmAlert({
            closeOnEscape: false,
            closeOnClickOutside: false,
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui' dir="rtl">
                        <h3><FontAwesomeIcon icon={faTriangleExclamation} />توجه</h3>
                        <p>آیا از حذف اطمینان دارید ؟</p>
                        <button className='btn btn-sm btn-secondary mr-2' onClick={onClose}>خیر</button>
                        <button className='btn btn-sm btn-danger'
                            onClick={() => {
                                onClose();
                            }}
                        >
                            بلی
                        </button>
                    </div>
                )
            }
            //   title: 'هشدار',
            //   message: 'آیا از حذف اطمینان دارید',
            //   buttons: [
            //     {
            //       label: 'بلی',
            //       onClick: () => alert('Click Yes')
            //     },
            //     {
            //       label: 'خیر',
            //       onClick: () => alert('Click No')
            //     }
            //   ]

            // customUI: ({ onClose }) => {
            //     return (
            //         <div className='custom-ui'>
            //             <h1>Are you sure?</h1>
            //             <p>You want to delete this file?</p>
            //             <button onClick={onClose}>No</button>
            //             <button
            //                 onClick={() => {
            //                     this.handleClickDelete();
            //                     onClose();
            //                 }}
            //             >
            //                 Yes, Delete it!
            //             </button>
            //         </div>
            //     );
            // }

        });
    };

    const [items] = React.useState([
        {
            label: "Luke Skywalker",
            value: "Luke Skywalker"
        },
        { label: "C-3PO", value: "C-3PO" },
        { label: "R2-D2", value: "R2-D2" }
    ]);

    useEffect(() => {


        formik.setFieldValue("model", dataParentToChild.data.model)
        formik.setFieldValue("price", dataParentToChild.data.price)
        formik.setFieldValue("gold", dataParentToChild.data.make)
        
        console.log("dataParentToChild.data.make")

        return () => {
            //second
        }
    }, [dataParentToChild.data])


    // setMake(make=>"jjj")
    // // useEffect(() => {
    // //     alert(formik.values.gold)

    // //     return () => {

    // //     }
    // // }, [make])




    //console.log(dataParentToChild.data.make)


    const validationSchema = Yup.object().shape({
        gold: Yup.string().required('فیلد نام کاربری اجباری است'),
        // username: Yup.string()
        //   .required('Username is required')
        //   .min(6, 'Username must be at least 6 characters')
        //   .max(20, 'Username must not exceed 20 characters'),
        //email: Yup.string().required('Email is required').email('Email is invalid'),
        //password: Yup.string()
        // .required('فیلد پسورد الزامی است')
        //   .min(3, 'Password must be at least 6 characters')
        //.max(40, 'Password must not exceed 40 characters'),
        // confirmPassword: Yup.string()
        //   .required('Confirm Password is required')
        //   .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),

    });

    const formik = useFormik({

        initialValues:
        {
            gold: '',
            price: '',
            model: '',
            profession: ''
            //password: '',
            //email: '',
            //password: '',
            // confirmPassword: '',
            // acceptTerms: false,
        },
        values: {
            gold: "kkk",
            price: dataParentToChild.data.price,
            model: dataParentToChild.data.model
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        isInitialValid: true,
        onSubmit: (data) => {
            console.log("title submit");
            //var count = gridRef.current.api.getDisplayedRowCount();
            // console.log('getDisplayedRowCount() => ' + count);

            // refresh all data
            //gridRef.current.api.redrawRows();
            // axios(
            //   {
            //     url: 'http://192.168.0.111:3333/api/DOTMobileApi/login',
            //     method: "post",
            //     data:
            //     {
            //       "UserName": data.userName,
            //       "UserPass": data.password,
            //       "Imei": "12345"
            //     },
            //     headers: {
            //     },
            //   }).then(function (response) {        
            //     console.log(response);
            //     console.log(response.data.access_token)
            //     sessionStorage.setItem("LoginTocken", JSON.stringify({
            //       userFirstName: response.data.userFName,
            //       userLastName: response.data.userLName,
            //       UserId: response.data.userId,
            //       userTocken: response.data.access_token
            //     }));

            //     if (response.data.access_token != null) {        
            //       window.location.replace('/blog-overview')         
            //     } else {
            //       setErrorFlag(true);
            //     }

            //   }).catch(function (error) {

            //     setErrorFlag(true);
            //     console.log("axois error: " + error);
            //     console.log(ErrorFlag);

            //   })
        }
    })

    const handleDateChange = () => {
        alert(dateRef.current?.value)
        console.log("dsdsdssd")
    }


    //formik.setFieldValue('model', "kkkkkkkkk");
    // formik.setFieldValue('price', dataParentToChild.data.price);
    // formik.setFieldValue('model', dataParentToChild.data.model);

    return (


        <Row className="page-header mt-2 ">
            {/* <PageTitle title="تحصیلات" md="12" className="ml-sm-auto mr-sm-auto " /> */}

            <Col lg="12" >
                <nav className="breadcrumb">
                    <a className="breadcrumb-item" href="#">خانه</a>
                    {/*<a class="breadcrumb-item" href="#">Profile</a>
           <a class="breadcrumb-item" href="#">Data</a> */}
                    <span className="breadcrumb-item active">تحصیلات</span>
                </nav>
                {/* // </Row>


            //<Row> */}

            </Col>


            <Col lg="12" >
                <Card small className="mb-2">
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">ثبت تحصیلات</h6>
                    </CardHeader>
                    <ListGroup flush>
                        <ListGroupItem >
                            <Row>
                                <Col>
                                    <form onSubmit={formik.handleSubmit}>
                                        <Row>
                                            <Col md="4" className="form-group">
                                                <FormSelect onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.profession} className={'form-control' + (formik.errors.profession && formik.touched.profession ? ' is-invalid' : '')}   >
                                                    <option value="" >انتخاب کنید ...</option>
                                                    {items.map(item => (
                                                        <option
                                                            key={item.value}
                                                            value={item.value}
                                                        >
                                                            {item.label}
                                                        </option>
                                                    ))}
                                                </FormSelect>
                                            </Col>
                                            <Col md="4" className="form-group">
                                                <PersianCalendar ref={dateRef} onChange={handleDateChange}></PersianCalendar>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="4" className="form-group">
                                                <label htmlFor="title">Gold</label>
                                                {/* <input type="text" name="title" id="title" className={'form-control' + (formik.errors.title && formik.touched.title  ? ' is-invalid': '') }
                               onChange={formik.handleChange} value={formik.values.title} placeholder="عنوان" ></input>
                      */}

                                                <FormInput type="text" name="gold" id="gold" className={'form-control' + (formik.errors.gold && formik.touched.gold ? ' is-invalid' : '')}
                                                    onChange={formik.handleChange} value={formik.values.gold} placeholder="Gold" disabled={dataParentToChild.OperationType == "detail" || dataParentToChild.OperationType == "delete" ? true : false} />

                                                <div className="invalid-feedback">
                                                    {
                                                        formik.errors.gold && formik.touched.gold
                                                            ? formik.errors.gold
                                                            : null
                                                    }
                                                </div>
                                            </Col>

                                            <Col md="4" className="form-group">
                                                <label htmlFor="title">Model</label>
                                                {/* <input type="text" name="title" id="title" className={'form-control' + (formik.errors.title && formik.touched.title  ? ' is-invalid': '') }
                               onChange={formik.handleChange} value={formik.values.title} placeholder="عنوان" ></input>
                      */}

                                                <FormInput type="text" name="model" id="model" className={'form-control' + (formik.errors.model && formik.touched.model ? ' is-invalid' : '')}
                                                    onChange={formik.handleChange} value={formik.values.model} placeholder="Model" disabled={dataParentToChild.OperationType == "detail" || dataParentToChild.OperationType == "delete" ? true : false} />

                                                <div className="invalid-feedback">
                                                    {
                                                        formik.errors.model && formik.touched.model
                                                            ? formik.errors.model
                                                            : null
                                                    }
                                                </div>
                                            </Col>
                                            <Col md="4" className="form-group">
                                                <label htmlFor="price">Price</label>
                                                {/* <input type="text" name="title" id="title" className={'form-control' + (formik.errors.title && formik.touched.title  ? ' is-invalid': '') }
                               onChange={formik.handleChange} value={formik.values.title} placeholder="عنوان" ></input>
                      */}

                                                <FormInput type="text" name="price" id="price" className={'form-control' + (formik.errors.price && formik.touched.price ? ' is-invalid' : '')}
                                                    onChange={formik.handleChange} value={formik.values.price} placeholder="Price" disabled={dataParentToChild.OperationType == "detail" || dataParentToChild.OperationType == "delete" ? true : false} />

                                                <div className="invalid-feedback">
                                                    {
                                                        formik.errors.price && formik.touched.price
                                                            ? formik.errors.price
                                                            : null
                                                    }
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className='form-inline'>
                                            {
                                                dataParentToChild.OperationType == "add" ? <Button theme="primary" className="mb-2 mr-1" >
                                                    <span className='form-inline'>
                                                        Add
                                                        <ReactLoading type="spin" color="red" height={20} width={20} className="ml-2" />
                                                    </span>
                                                </Button>
                                                    : dataParentToChild.OperationType == "edit" ? <Button theme="warning" className="mb-2 mr-1">
                                                        Update
                                                    </Button>
                                                        :
                                                        dataParentToChild.OperationType == "delete" ?
                                                            <Button theme="danger" className="mb-2 mr-1" onClick={submit}>
                                                                حذف
                                                            </Button>
                                                            :
                                                            ''
                                            }
                                        </div>
                                    </form>
                                    <Alert className="mb-0 bg-danger">
                                        <i className="fa fa-warning mx-2"></i> How you doin'? I'm just a friendly, good-looking notification message and I come in all the colors you can see below. Pretty cool, huh?
                                    </Alert>
                                </Col>
                            </Row>

                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>

    )
}
