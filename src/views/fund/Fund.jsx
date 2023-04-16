import React, { useContext, useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Container, Row, Col, Card, CardHeader, ListGroup,
  ListGroupItem, FormInput,
  Button, Alert, FormSelect, FormCheckbox
} from "shards-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactLoading from 'react-loading';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { faCircleExclamation, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export const Fund = () => {
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
      price: "",
      model: ""
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


  return (
    <Container fluid className="main-content-container px-4">
      <Row className="page-header mt-2 ">
        <Col lg="12" >
          <nav className="breadcrumb">
            <a className="breadcrumb-item" href="#">خانه</a>
            <span className="breadcrumb-item active">مدیریت تنخواه</span>
          </nav>
        </Col>
      </Row>
      <Row>
        <Col lg="12" >
          <Card small className="mb-2">
            <CardHeader className="border-bottom">
              <h6 className="m-0">اطلاعات تنخواه گردان</h6>
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem >
                {/* <Row>
                              <Col>
                                  <FormSelect>
                                      {items.map(item => (
                                          <option
                                              key={item.value}
                                              value={item.value}>
                                              {item.label}
                                          </option>
                                      ))}
                                  </FormSelect>
                              </Col>
                          </Row> */}
                <Row>
                  <Col>
                    <form onSubmit={formik.handleSubmit}>
                      <Row>
                        <Col md="4" className="form-group">
                          <label htmlFor="title">نام تنخواه</label>
                          <FormInput type="text" name="gold" id="gold" className={'form-control' + (formik.errors.gold && formik.touched.gold ? ' is-invalid' : '')}
                            onChange={formik.handleChange} value={formik.values.gold} placeholder="Gold" />

                          <div className="invalid-feedback">
                            {
                              formik.errors.gold && formik.touched.gold
                                ? formik.errors.gold
                                : null
                            }
                          </div>
                        </Col>
                        <Col md="4" className="form-group">
                          <label htmlFor="title">تاریخ افتتاح</label>
                          <FormInput type="text" name="model" id="model" className={'form-control' + (formik.errors.model && formik.touched.model ? ' is-invalid' : '')}
                            onChange={formik.handleChange} value={formik.values.model} placeholder="Model" />

                          <div className="invalid-feedback">
                            {
                              formik.errors.model && formik.touched.model
                                ? formik.errors.model
                                : null
                            }
                          </div>
                        </Col>
                        <Col md="4" className="form-group">
                          <label htmlFor="price">پروژه</label>
                          <FormInput type="text" name="price" id="price" className={'form-control' + (formik.errors.price && formik.touched.price ? ' is-invalid' : '')}
                            onChange={formik.handleChange} value={formik.values.price} placeholder="Price" />

                          <div className="invalid-feedback">
                            {
                              formik.errors.price && formik.touched.price
                                ? formik.errors.price
                                : null
                            }
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4" className="form-group">
                          <label htmlFor="price">انتخاب تنخواه</label>
                          <FormInput type="text" name="price" id="price" className={'form-control' + (formik.errors.price && formik.touched.price ? ' is-invalid' : '')}
                            onChange={formik.handleChange} value={formik.values.price} placeholder="Price" />

                          <div className="invalid-feedback">
                            {
                              formik.errors.price && formik.touched.price
                                ? formik.errors.price
                                : null
                            }
                          </div>
                        </Col>
                        <Col md="4" className="form-group" >
                          <div class="form-check mt-3 ml-3">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" defaultChecked="true" />
                            <label class="form-check-label" for="defaultCheck1">
                              حساب فعال است
                            </label>
                          </div>
                          {/* <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                          Default checkbox
                        </label> */}
                          {/* //<FormCheckbox>حساب فعال است</FormCheckbox> */}
                        </Col>
                      </Row>
                    </form>
                    {/* <Alert className="mb-0 bg-danger">
                                      <i className="fa fa-warning mx-2"></i> How you doin'? I'm just a friendly, good-looking notification message and I come in all the colors you can see below. Pretty cool, huh?
                                  </Alert> */}
                  </Col>
                </Row>



              </ListGroupItem>
            </ListGroup>
            <CardHeader className="border-bottom">
              <h6 className="m-0">اطلاعات مالی</h6>
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem>

                <Row>
                  <Col md="4" className="form-group">
                    <label htmlFor="title">اعتبار مانده</label>
                    <FormInput type="text" name="gold" id="gold" className={'form-control' + (formik.errors.gold && formik.touched.gold ? ' is-invalid' : '')}
                      onChange={formik.handleChange} value={formik.values.gold} placeholder="Gold" />

                    <div className="invalid-feedback">
                      {
                        formik.errors.gold && formik.touched.gold
                          ? formik.errors.gold
                          : null
                      }
                    </div>
                  </Col>
                  <Col md="4" className="form-group">
                    <label htmlFor="title">سقف مجاز</label>
                    <FormInput type="text" name="model" id="model" className={'form-control' + (formik.errors.model && formik.touched.model ? ' is-invalid' : '')}
                      onChange={formik.handleChange} value={formik.values.model} placeholder="Model" />

                    <div className="invalid-feedback">
                      {
                        formik.errors.model && formik.touched.model
                          ? formik.errors.model
                          : null
                      }
                    </div>
                  </Col>
                  <Col md="4" className="form-group" >
                    <div class="form-check mt-3 ml-3">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" defaultChecked="true" />
                      <label class="form-check-label" for="defaultCheck1">
                        کنتربل سقف اعتبار
                      </label>
                    </div>
                    {/* <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
        <label class="form-check-label" for="flexCheckDefault">
          Default checkbox
        </label> */}
                    {/* //<FormCheckbox>حساب فعال است</FormCheckbox> */}
                  </Col>
                </Row>
                <Row>

                  <Col md="4" className="form-group">
                    <label htmlFor="price">جمع تایید نشده</label>
                    <FormInput type="text" name="price" id="price" className={'form-control' + (formik.errors.price && formik.touched.price ? ' is-invalid' : '')}
                      onChange={formik.handleChange} value={formik.values.price} placeholder="Price" />

                    <div className="invalid-feedback">
                      {
                        formik.errors.price && formik.touched.price
                          ? formik.errors.price
                          : null
                      }
                    </div>
                  </Col>
                  <Col md="4" className="form-group">
                    <label htmlFor="price">جمع تایید شده</label>
                    <FormInput type="text" name="price" id="price" className={'form-control' + (formik.errors.price && formik.touched.price ? ' is-invalid' : '')}
                      onChange={formik.handleChange} value={formik.values.price} placeholder="Price" />

                    <div className="invalid-feedback">
                      {
                        formik.errors.price && formik.touched.price
                          ? formik.errors.price
                          : null
                      }
                    </div>
                  </Col>

                  <Col md="4" className="form-group">
                    <label htmlFor="price">موجودی اول دوره</label>
                    <FormInput type="text" name="price" id="price" className={'form-control' + (formik.errors.price && formik.touched.price ? ' is-invalid' : '')}
                      onChange={formik.handleChange} value={formik.values.price} placeholder="Price" />

                    <div className="invalid-feedback">
                      {
                        formik.errors.price && formik.touched.price
                          ? formik.errors.price
                          : null
                      }
                    </div>
                  </Col>



                </Row>
                <Row>
                  <Col>
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
    </Container>

  )
}

