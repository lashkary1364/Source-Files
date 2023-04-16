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
import { ModalAccountCodes } from './ModalAccountCodes';


export const Description = () => {

    const [tankhahItems,setTankhahItems] = React.useState([
        {
            tankhah_name: "انتخاب کنید ..",
            tankhah_ID: "-1"
        },
       
    ]);

    
    useEffect(() => {
        // fetch data from tankah
       GetAllTankhah();

      }); 



      const GetAllTankhah=()=>{

        fetch('https://localhost:44307/api/DOTMobileApi/GetAll_Tankhah?userId=1100001')
        .then(result => result.json())
        .then(tankhahItems => setTankhahItems(tankhahItems))




      }

    const submit = () => {
       
    }
   

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
            model: ''
            //password: '',
            //email: '',
            //password: '',
            // confirmPassword: '',
            // acceptTerms: false,
        },
        values: {
            gold: "kkk",
            price:"",
            model:""
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


    const [modal, setModal] = useState(false);
   
    const handleAccountCode = () =>{
        setModal(true);

        console.log("show modal ...")
        console.log(modal)
    } 



    return (
       <>
       <Row className="page-header mt-2 ">
            <Col lg="12" >
                <nav className="breadcrumb">
                    <a className="breadcrumb-item" href="#">خانه</a>
                    <span className="breadcrumb-item active">شرح هزینه</span>
                </nav>
            </Col>

            <Col lg="12" >
                <Card small className="mb-2">
                    <CardHeader className="border-bottom">
                        <h6 className="m-0"></h6>
                    </CardHeader>
                    <ListGroup flush>
                        <ListGroupItem >
                            <Row>
                                <Col>
                                    {/* <FormSelect>
                                        {items.map(item => (
                                            <option
                                                key={tankhahItems.tankhah_ID}
                                                value={tankhahItems.tankhah_name}>
                                                {item.tankhah_name}
                                            </option>
                                        ))}
                                    </FormSelect> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <form onSubmit={formik.handleSubmit}>
                                        <Row>
                                            <Col md="4" className="form-group">
                                                <label htmlFor="title">عنوان هزینه ها</label>
                                                <FormInput type="text" name="gold" id="gold" className={'form-control' + (formik.errors.gold && formik.touched.gold ? ' is-invalid' : '')}
                                                    onChange={formik.handleChange} value={formik.values.gold} placeholder="Gold"  />

                                                <div className="invalid-feedback">
                                                    {
                                                        formik.errors.gold && formik.touched.gold
                                                            ? formik.errors.gold
                                                            : null
                                                    }
                                                </div>
                                            </Col>
                                            <Col md="4" className="form-group">
                                                <label htmlFor="title">کد حساب</label>
                                                {/* <FormInput type="text" name="model" id="model" className={'form-control' + (formik.errors.model && formik.touched.model ? ' is-invalid' : '')}
                                                    onChange={formik.handleChange} value={formik.values.model} placeholder="Model"  />

                                                <div className="invalid-feedback">
                                                    {
                                                        formik.errors.model && formik.touched.model
                                                            ? formik.errors.model
                                                            : null
                                                    }
                                                </div> */}

<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button" onClick={handleAccountCode}>...</button>
  </div>
</div>                                    </Col>
                                        </Row>
                                        <Row>
                                            
                                            <Col md="4" className="form-group">
                                                <label htmlFor="price">کد حساب مرکز یک</label>
                                                <FormInput type="text" name="price" id="price" className={'form-control' + (formik.errors.price && formik.touched.price ? ' is-invalid' : '')}
                                                    onChange={formik.handleChange} value={formik.values.price} placeholder="Price"  />

                                                <div className="invalid-feedback">
                                                    {
                                                        formik.errors.price && formik.touched.price
                                                            ? formik.errors.price
                                                            : null
                                                    }
                                                </div>
                                            </Col>
                                            <Col md="4" className="form-group">
                                                <label htmlFor="price">کد حساب مرکز دو</label>
                                                <FormInput type="text" name="price" id="price" className={'form-control' + (formik.errors.price && formik.touched.price ? ' is-invalid' : '')}
                                                    onChange={formik.handleChange} value={formik.values.price} placeholder="Price"  />

                                                <div className="invalid-feedback">
                                                    {
                                                        formik.errors.price && formik.touched.price
                                                            ? formik.errors.price
                                                            : null
                                                    }
                                                </div>
                                            </Col>
                                            <Col md="4" className="form-group">
                                                <label htmlFor="price">کد حساب مرکز سه</label>
                                                <FormInput type="text" name="price" id="price" className={'form-control' + (formik.errors.price && formik.touched.price ? ' is-invalid' : '')}
                                                    onChange={formik.handleChange} value={formik.values.price} placeholder="Price"  />

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
                                            {/* {
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
                                            } */}

<Button theme="primary" className="mb-2 mr-1" >
                                                    <span className='form-inline'>
                                                        Add
                                                        <ReactLoading type="spin" color="red" height={20} width={20} className="ml-2" />
                                                    </span>
                                                </Button>
                                        </div>
                                    </form>
                                    {/* <Alert className="mb-0 bg-danger">
                                        <i className="fa fa-warning mx-2"></i> How you doin'? I'm just a friendly, good-looking notification message and I come in all the colors you can see below. Pretty cool, huh?
                                    </Alert> */}
                                </Col>
                            </Row>

                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
       
        </Row>
  <ModalAccountCodes modalProp={modal}></ModalAccountCodes>
       </>
     

    )
}
