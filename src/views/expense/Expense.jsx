import React, { useState, useEffect, useRef } from 'react'
import { Field, useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Container, Row, Col, Card, CardHeader, ListGroup,
  ListGroupItem, FormInput,
  Button, FormSelect, Alert
} from "shards-react";
import ReactLoading from 'react-loading';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { faHouseMedicalCircleCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import persian_en from "react-date-object/locales/persian_en"
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/view-css.css';
import { ToastContainer, toast } from 'react-toastify';
import {
  Link,
  Routes,
  Route,
  useHistory
} from 'react-router-dom';
import * as moment from 'jalali-moment';
import swal from 'sweetalert';
import GetAllShomareName from './ShomareName';



export const Expense = () => {

  const history = useHistory();
  const [isAction, setIsAction] = useState(false);
  const queryParameters = new URLSearchParams(window.location.search);
  const soratId = queryParameters.get("id");
  const operation = queryParameters.get("operation");
  const calendarRef = useRef();
  const [tarikhError, setTarikhError] = useState(false);
  const [tankhahItems, setTankhahItems] = useState([]); 
  const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
  const user = JSON.parse(sessionStorage.getItem("LoginTocken"));
  const salId=sessionStorage.getItem("salId");
  const salMali=sessionStorage.getItem("salMali");
  const mohitId=sessionStorage.getItem("mohitId"); 
  const [state, setState] = useState(new DateObject({ calendar: persian, locale: persian_en }))
  const date = new DateObject({ calendar: persian, locale: persian_en })
  const [dateHeader, setDateHeader] = useState(date.format());
  const [status, setStatus] = useState(0); 
  const [year, setYear] = useState(state.year);

  const convert = (date, format = state.format) => {
    let object = { date, format }
    if (date == null)
      setTarikhError(true);
    else {
      setTarikhError(false);
    }
    setState(new DateObject(object).convert(persian, persian_en).format());
    setYear(new DateObject(object).convert(persian, persian_en).format("YYYY"));
    setDateHeader(new DateObject(object).convert(persian, persian_en).format());

  }

  useEffect(() => {

    GetAllTankhah();

    if (operation == "delete" || operation == "edit")
      setInfo();

  }, []);


  const GetAllTankhah = () => {

    console.log(mohitId);
    console.log(user.UserId);
    console.log(salId);

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
        console.log("GetAllTankhah.....")
        console.log(response.data);
        const resultItems = response.data;
        resultItems.map(data => {
          setTankhahItems(tankhahItems => [...tankhahItems, { tankhah_name: data.tankhah_name, tankhah_ID: data.tankhah_ID }]);
        });

      }).catch(function (error) {
        swal("error", error.message, "error");
      })
  }

  const GetAllTankhahInfo = (tankhahId) => {

    formik.setFieldValue("tankhah", tankhahId);

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
      }).catch(function (error) {
        // handle error      
        swal("error", error.message, "error");

      });


    axios(
      {
        url: serverAdress + `GetAllTankhahFinanceInfo?tankhahId=${tankhahId}&salId=${salId}`,
        method: "get",

        headers:
        {
          Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }).then(function (response) {
        formik.setFieldValue("shomare", response.data.shomare)
        formik.setFieldValue("etebarMax", response.data.etebarMax)
        formik.setFieldValue("mande", response.data.mojodi)

      }).catch(function (error) {
        // handle error      
        swal("error", error.message, "error");

      });
  }

  const validationSchema = Yup.object().shape({   
    tankhah: Yup.string().required('فیلد اجباری است'),
    sharh: Yup.string().required('فیلد شرح اجباری است'),
  });

  const formik = useFormik({
    initialValues:
    {
      tankhah: '',
      mande: '',
      etebarMax: '',
      shomare: '',
      tarikh: new Date() || null,
      sharh: '',
      tozihat: '',  
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    isInitialValid: true,
    onSubmit: (data) => {

      switch (operation) {

        case 'add':

          return addSouratHazineHeader(data);

        case 'edit':

          return updateSouratHazineHeader(data);

        case 'delete':

          return deleteSouratHazineHeader(soratId);

        default:
          return '';
      }
    }

  });

  const setInfo = () => {
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
        console.log(response.data.mohidID)
        console.log("set info ....");
        console.log(response.data);
        formik.setFieldValue("tozihat", response.data.tozihat);
        formik.setFieldValue("sharh", response.data.sharh);
        formik.setFieldValue("tarikh", response.data.tarikh);
        formik.setFieldValue("shomare", response.data.shomare);        
        GetAllTankhah(response.data.mohidID, response.data.salID);
        setState(response.data.tarikh);
        setDateHeader(response.data.tarikh);
        setStatus(response.data.status);      
        GetAllTankhahInfo(response.data.tankhah_ID);        
      }).catch(function (error) {
        swal("error", error.message, "error");
      })
  }

  const addSouratHazineHeader = (data) => {

    if (year != salMali) {
      swal("توجه", "تاریخ و سال مالی یکسان نیست", "warning");
      return;
    }

    setIsAction(true);

    axios(
      {
        url: serverAdress + 'InsertTankhahSoratHazineHeader',
        method: "post",
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
        data:
        {
          "soratID": 0,
          "mohidID": parseInt(mohitId),
          "shomare": parseInt(data.shomare),
          "tankhah_ID": parseInt(data.tankhah),
          "status": 0,
          "total": 0,
          "sharh": data.sharh,
          "tozihat": data.tozihat,
          "tarikh": dateHeader,
          "sanadID": 0,
          "shomare_name": 0,
          "salID": parseInt(salMali),
          "tarikh_name": ""
        }
      }).then(function (response) {
        //console.log("response : " + response.data);
        toast.success('عملیات با موفقیت انجام پذیرفت', {
          position: toast.POSITION.TOP_LEFT,
          className: 'toast-message'
        });

        setTimeout(() => {
          setIsAction(false);
          history.push("/expencelist");
        }, 1000);

      }).catch(function (error) {
        setIsAction(false);
        swal("error", error.message, "error");
      });

  }

  const deleteSouratHazineHeader = async (id) => {

    if (status != 0) {
      swal("توجه", "این سند قابل حذف نمیباشد", "warning");
      return;
    }

    GetAllShomareName(soratId).then(response => {
      console.log("get all tankhah ...");
      const resultItems = response.data;

      if (resultItems > 0) {
        swal("توجه", "برای این سند نامه صادر شده است و قابل حذف نمیباشد", "warning");
        return;
      } else {
        setIsAction(true);

        swal({
          title: "آیا از حذف اطمینان دارید؟",
          text: "",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
          .then((willDelete) => {

            if (willDelete) {
              const headers = {
                Authorization: `Bearer ${localStorage.getItem("access-tocken")}`
              };

              axios.delete(serverAdress + `DeleteSouratHazineHeader?id=${id}`, { headers })
                .then(function (res) {
                  toast.success('عملیات با موفقیت انجام پذیرفت', {
                    position: toast.POSITION.TOP_LEFT,
                    className: 'toast-message'
                  });

                  setTimeout(() => {
                    setIsAction(false);
                    history.push("/expencelist");
                  }, 1000);

                })
                .catch(function (error) {
                  setIsAction(false);
                  swal("error", error.message, "error");
                });

            }

            else {
              setIsAction(false);
            }
          });

      }

    }).catch(error => {
      swal("error", error.message, "error");
    });

  }

  const updateSouratHazineHeader = (data) => {
    console.log("year");
    console.log(year);
  

    if (year != salMali) {
      swal("توجه", "بازه تاریخی و سال مالی یکسان نیست", "warning");
      return;
    }
    if (status != 0) {
      swal("توجه", "این سند قابل ویرایش نمی باشد", "warning");
      return;
    }

    GetAllShomareName(soratId).then(response => {
      console.log(response);
      if (response > 0) {
        swal("توجه", "برای این سند نامه صادر شده است و قابل ویرایش نمیباشد", "warning");
        return;
      } else {
        setIsAction(true);
        axios(
          {
            url: serverAdress + 'UpdateSouratHazineHeader',
            method: "put",
            headers:
            {
              Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': '0',
            },
            data:
            {
              "soratID": parseInt(soratId),
              "mohidID": parseInt(mohitId),
              "shomare": parseInt(data.shomare),
              "tankhah_ID": parseInt(data.tankhah),
              "status": 0,
              "total": 0,
              "sharh": data.sharh,
              "tozihat": data.tozihat,
              "tarikh": dateHeader,
              "sanadID": 0,
              "shomare_name": 0,
              "salID": parseInt(salMali),
              "tarikh_name": ""
            }
          }).then(function (response) {

            toast.success('عملیات با موفقیت انجام پذیرفت', {
              position: toast.POSITION.TOP_LEFT,
              className: 'toast-message'
            });

            setTimeout(() => {
              setIsAction(false);
              history.push("/expencelist");
            }, 1000);

          }).catch(function (error) {
            setIsAction(false);
            swal("error", error.message, "error");
          })
      }
    }).catch(error => {
      console.log(error);
      swal("error", error.message, "error")
    });
  }


  return (
    <Container fluid className="main-content-container px-4">
      <Row className="page-header mt-2 ">
        <Col lg="12" >
          <nav className="breadcrumb">
            <a className="breadcrumb-item" href="/home">خانه</a>
            <a className="breadcrumb-item" style={{ color: "#007bff" }} href="/expencelist">مدیریت صورت هزینه ها</a>
            {operation == "delete" ? <span className="breadcrumb-item active">حذف صورت هزینه</span> :
              operation == "edit" ? <span className="breadcrumb-item active">ویرایش صورت هزینه</span> :
                <span className="breadcrumb-item active">افزودن صورت هزینه</span>}
          </nav>
        </Col>
        <Col lg="12" >
          <Card small className="mb-2">
            <ListGroup flush>
              <ListGroupItem >
                <form onSubmit={formik.handleSubmit}>
                  <Row>
                    {/* <Col md="4" className="form-group">
                      <label htmlFor="mohit">اتتخاب محیط کاربری*:</label>
                      <FormSelect id="mohit" name="mohit" onChange={(e) => changeMohit(e.target.value)} className={'form-control' + (formik.errors.mohit && formik.touched.mohit ? ' is-invalid' : '')}
                        value={formik.values.mohit}>
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
                      <div className="invalid-feedback">
                        {
                          formik.errors.mohit && formik.touched.mohit
                            ? formik.errors.mohit
                            : null
                        }
                      </div>
                    </Col>
                    <Col md="4" className="form-group">
                      <label htmlFor="salMali">اتتخاب  سال مالی*:</label>
                      <FormSelect id="salMali" name="salMali" onChange={(e) => changeSalMali(e)} className={'form-control' + (formik.errors.salMali && formik.touched.salMali ? ' is-invalid' : '')}
                        value={formik.values.salMali}>
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
                      <div className="invalid-feedback">
                        {
                          formik.errors.salMali && formik.touched.salMali
                            ? formik.errors.salMali
                            : null
                        }
                      </div>
                    </Col> */}
                    <Col md="4" className="form-group">
                      <label htmlFor="tankhah">اتتخاب تنخواه*:</label>
                      <FormSelect id="tankhah" name="tankhah" onChange={(e) => GetAllTankhahInfo(e.target.value)} className={'form-control' + (formik.errors.tankhah && formik.touched.tankhah ? ' is-invalid' : '')}
                        value={formik.values.tankhah}>
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
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4" className="form-group">
                      <label htmlFor="mande" > مانده تنخواه:</label>
                      <FormInput type="text" id="mande" name="mande" disabled="disabled" className={'form-control' + (formik.errors.mande && formik.touched.mande ? ' is-invalid' : '')}
                        onChange={formik.handleChange} value={formik.values.mande} placeholder="مانده" />
                    </Col>
                    <Col md="4" className="form-group">
                      <label htmlFor="etebarMax">سقف تنخواه :</label>
                      <FormInput type="text" id="etebarMax" name="etebarMax" disabled="disabled" className={'form-control' + (formik.errors.etebarMax && formik.touched.etebarMax ? ' is-invalid' : '')}
                        onChange={formik.handleChange} value={formik.values.etebarMax} placeholder="Price" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4" className="form-group">
                      <label htmlFor="shomare">شماره صورت هزینه:</label>
                      <FormInput type="text" name="shomare" id="shomare" disabled="disabled" className={'form-control' + (formik.errors.shomare && formik.touched.shomare ? ' is-invalid' : '')}
                        onChange={formik.handleChange} value={formik.values.shomare} placeholder="شماره صورت هزینه"
                      />
                    </Col>
                    <Col md="4" className="form-group">
                      <label htmlFor="tarikh">تاریخ*:</label>
                      <div>
                        <DatePicker inputClass='form-control'
                          ref={calendarRef}
                          calendar={persian}
                          locale={persian_fa}
                          style={tarikhError == true ? { borderColor: "#c4183c", fontFamily: 'tahoma' } : { borderColor: "#e1e5eb", fontFamily: 'tahoma' }}
                          format={"YYYY/MM/DD"}
                          value={state}
                          onChange={convert}
                          id="tarikh" name="tarikh"
                          calendarPosition="bottom-right"
                          disabled={operation == "delete" ? true : false}
                        />
                      </div>
                      {tarikhError == true ? <div style={{ marginTop: "0.25rem", fontSize: "80%", color: "#c4183c", fontFamily: 'IRANSans', }}>فیلد تاریخ اجباری است</div> : ''}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4" className="form-group">
                      <label htmlFor="sharh">شرح*:</label>
                      <textarea id="sharh" name="sharh" className={'form-control' + (formik.errors.sharh && formik.touched.sharh ? ' is-invalid' : '')}
                        onChange={formik.handleChange} value={formik.values.sharh}
                        disabled={operation == "delete" ? true : false}
                        maxLength="250">
                      </textarea>
                      <div className="invalid-feedback">
                        {
                          formik.errors.sharh && formik.touched.sharh
                            ? formik.errors.sharh
                            : null
                        }
                      </div>
                    </Col>
                    <Col md="4" className="form-group">
                      <label htmlFor="tozihat">توضیحات</label>
                      <textarea className='form-control' id="tozihat" name="tozihat" onChange={formik.handleChange} value={formik.values.tozihat}
                        disabled={operation == "delete" ? true : false} maxLength="1000"
                      ></textarea>
                      <div className="invalid-feedback">
                        {
                          formik.errors.tozihat && formik.touched.tozihat
                            ? formik.errors.tozihat
                            : null
                        }
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="form-group">
                      <div className='form-inline'>
                        {operation == "add" ?
                          <Button theme="primary" className="mb-2 mr-1" type="submit" disabled={isAction == true ? true : false} >
                            <span className='form-inline'>
                              ثبت
                              {isAction == true ? <ReactLoading type="spin" color="red" height={20} width={20} className="ml-2" /> : ''}
                            </span>
                          </Button>
                          : operation == "edit" ?
                            <Button theme="warning" className="mb-2 mr-1" type="submit" disabled={isAction == true ? true : false}>
                              <span className='form-inline'>
                                ثبت
                                {isAction == true ? <ReactLoading type="spin" color="red" height={20} width={20} className="ml-2" /> : ''}
                              </span>
                            </Button>
                            : operation == "delete" ?
                              <Button theme="danger" className="mb-2 mr-1" type="submit" disabled={isAction == true ? true : false} >
                                <span className='form-inline'>
                                  حذف
                                  {isAction == true ? <ReactLoading type="spin" color="red" height={20} width={20} className="ml-2" /> : ''}
                                </span>
                              </Button>
                              : ""
                        }

                      </div>
                    </Col>
                  </Row>
                </form>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>

  )
}
