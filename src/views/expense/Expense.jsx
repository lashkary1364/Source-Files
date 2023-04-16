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
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import persian from "react-date-object/calendars/persian"
//import persian_fa from "react-date-object/locales/persian_fa"
import DatePicker, { DateObject } from "react-multi-date-picker";
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/view-css.css';
import { ToastContainer, toast } from 'react-toastify';
import {
  Link,
  Routes,
  Route,
  useHistory
} from 'react-router-dom';


export const Expense = () => {
 // test commit 1
  const history = useHistory();
  const [isAction, setIsAction] = useState(false);

  const queryParameters = new URLSearchParams(window.location.search);
  const soratId = queryParameters.get("id");
  //const operation = queryParameters.get("operation");
  const [operation, setOperation] = useState(queryParameters.get("operation"));
  const calendarRef = useRef();
  // const [submittedDate, setSubmittedDate] = useState();
  //const [items, setItems] = useState([]);
  const [tarikhError, setTarikhError] = useState(false);
  const [tankhahItems, setTankhahItems] = useState([]);
  const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
  const [user] = useState(JSON.parse(sessionStorage.getItem("LoginTocken")));
  const [headerDate, setHeaderDate] = useState(new DateObject({ calendar: persian }).format());

  const handleChangeDate = (date) => {
    if (date == null)
      setTarikhError(true);
    else
      setTarikhError(false);

    console.log()
    setHeaderDate(date.format("YYYY/MM/DD"));
  }

  useEffect(() => {

    GetAllTankhah();
    //GetAllSoratHazineSharh();

    if (operation == "delete" || operation == "edit")
      setInfo();

  }, []);


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
        console.log(user.UserId)
        resultItems.map(data => {
          setTankhahItems(tankhahItems=>[...tankhahItems, { tankhah_name: data.tankhah_name, tankhah_ID: data.tankhah_ID }]);
        });

      }).catch(function (error) {
        // handle error
        console.log("axois error: ");
        console.log(error)
      })
  }

  const GetAllTankhahInfo = (tankhahId) => {

    formik.setFieldValue("tankhah", tankhahId);
    console.log("GetAllTankhahInfo")

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
        formik.setFieldValue("shomare", response.data.shomare)
        formik.setFieldValue("etebarMax", response.data.etebarMax)
        formik.setFieldValue("mande", response.data.mojodi)
      }).catch(function (error) {
        // handle error
        console.log("axois error: ");
        console.log(error)
      })
  }

  // const GetAllSoratHazineSharh = () => {

  //   axios(
  //     {
  //       url: serverAdress + `GetAllSouratHazineSharh?mohitId=${user.lastMohitID}&sharh=${"11111"}`,
  //       method: "get",
  //       headers:
  //       {
  //         Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
  //       }
  //     }).then(function (response) {

  //       const resultItems = response.data;      
  //       resultItems.map(data => {

  //         setItems(sharhItems => [...sharhItems,
  //         {
  //           codeHesab: data.code_Hesab,
  //           id: data.item_ID,
  //           name: data.item_Title_text,
  //           markaz1: data.markaz1,
  //           markaz2: data.markaz2,
  //           markaz3: data.markaz3
  //         }]);

  //       });

  //     }).catch(function (error) {
  //       // handle error
  //       console.log("axois error: ");
  //       console.log(error)
  //     })

  // }

  const validationSchema = Yup.object().shape({
    tankhah: Yup.string().required('فیلد نام کاربری اجباری است'),
    //.oneOf(validProductValues),
    //tarikh: Yup.date().required('فیلد تاریخ اجباری است'),
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
      tozihat: ''
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

        console.log("response: ")
        console.log(response)

        formik.setFieldValue("tozihat", response.data.tozihat);
        formik.setFieldValue("sharh", response.data.sharh);
        formik.setFieldValue("tarikh", response.data.tarikh);
        formik.setFieldValue("shomare", response.data.shomare);
        formik.setFieldValue("tankhah", response.data.tankhah_ID);
       
        GetAllTankhahInfo(response.data.tankhah_ID);

      }).catch(function (error) {
        // handle error
        console.log("axois error: ");
        console.log(error)
      })
  }

  const addSouratHazineHeader = (data) => {
    setIsAction(true);
    console.log("data")
    console.log( {
      "SoratID": 0,
      "MohidID": user.lastMohitID,
      "Shomare": parseInt(data.shomare),
      "Tankhah_ID": parseInt(data.tankhah),
      "status": 0,
      "total": 0,
      "Sharh": data.sharh,
      "tozihat": data.tozihat,
      "tarikh": headerDate,
      "sanadID": 0,
      "shomare_name": 0,
      "SalID":parseInt(sessionStorage.getItem("SalMali")) ,
      "tarikh_name": ""
    })


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
          "mohidID": parseInt(user.lastMohitID),
          "shomare": parseInt(data.shomare),
          "tankhah_ID": parseInt(data.tankhah),
          "status": 0,
          "total": 0,
          "sharh": data.sharh,
          "tozihat": data.tozihat,
          "tarikh": headerDate,
          "sanadID": 0,
          "shomare_name": 0,
          "salID":  parseInt(sessionStorage.getItem("SalMali")),
          "tarikh_name": ""
        }
      }).then(function (response) {
       // console.log("response : " + response.data);
        toast.success('عملیات با موفقیت انجام پذیرفت', {
          position: toast.POSITION.TOP_LEFT,
          className: 'toast-message'
        });

        setTimeout(() => {
          setIsAction(false);
          history.push("/expencelist");
        }, 1000);

      }).catch(function (error) {
        console.log("addSouratHazineHeader:")
        console.log(error)
        setIsAction(false);
        //console.log("axois error: " + error);
        toast.error('خطا در انجام عملیات', {
          position: toast.POSITION.TOP_LEFT
        });
      });

  }

  const deleteSouratHazineHeader = (id) => {
    setIsAction(true);
    // console.log("delete sorat hazine ....");

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
                    console.log("axois error: " + error);
                    toast.error('خطا در انجام عملیات', {
                      position: toast.POSITION.TOP_LEFT
                    });
                  });
                onClose();
              }}
            >
              بلی
            </button>
          </div>
        )
      }
    })
  }

  const updateSouratHazineHeader = (data) => {
    setIsAction(true);
    console.log({
      "soratID": parseInt(soratId),
      "mohidID": parseInt(user.lastMohitID),
      "shomare": parseInt(data.shomare),
      "tankhah_ID": parseInt(data.tankhah),
      "status": 0,
      "total": 0,
      "sharh": data.sharh,
      "tozihat": data.tozihat,
      "tarikh": headerDate,
      "sanadID": 0,
      "shomare_name": 0,
      "salID": parseInt(sessionStorage.getItem("SalMali")),
      "tarikh_name": ""
    })

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
          "mohidID": parseInt(user.lastMohitID),
          "shomare": parseInt(data.shomare),
          "tankhah_ID": parseInt(data.tankhah),
          "status": 0,
          "total": 0,
          "sharh": data.sharh,
          "tozihat": data.tozihat,
          "tarikh": headerDate,
          "sanadID": 0,
          "shomare_name": 0,
          "salID":  parseInt(sessionStorage.getItem("SalMali")),
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
        console.log("axois error: " + error);
        toast.error('خطا در انجام عملیات', {
          position: toast.POSITION.TOP_LEFT
        });
      });
  }


  return (

    <Container fluid className="main-content-container px-4">
      <Row className="page-header mt-2 ">
        <Col lg="12" >
          <nav className="breadcrumb">
            <a className="breadcrumb-item" href="#">خانه</a>
            <span className="breadcrumb-item active">مدیریت صورت هزینه ها</span>          
          </nav>
        </Col>

        <Col lg="12" >
          <Card small className="mb-2">
            <ListGroup flush>
              <ListGroupItem >
                <form onSubmit={formik.handleSubmit}>
                  <Row>
                    <Col md="4" className="form-group">
                      <label htmlFor="tankhah">اتتخاب تنخواه*:</label>
                      <FormSelect id="tankhah" name="tankhah" onChange={(e) => GetAllTankhahInfo(e.target.value)} className={'form-control' + (formik.errors.tankhah && formik.touched.tankhah ? ' is-invalid' : '')}
                        // disabled={operation == "delete" ? true : false}
                        value={formik.values.tankhah}
                      >
                        {/* {operation=="delete"||operation=="edit"? */}
                        <option value={""}>یک موردانتخاب کنید</option>
                        {/* onChange={(e) =>  GetAllTankhahInfo(e.target.value) } */}
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
                        {/* <PersianCalendar></PersianCalendar> */}
                        <DatePicker inputClass='form-control'
                          ref={calendarRef}
                          calendar={persian}
                          // locale={persian_fa}
                          style={tarikhError == true ? { borderColor: "#c4183c", fontFamily: 'tahoma' } : { borderColor: "#e1e5eb", fontFamily: 'tahoma' }}
                          format={"YYYY/MM/DD"}
                          onChange={handleChangeDate}
                          id="tarikh" name="tarikh"
                          value={formik.values.tarikh}
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
                        maxLength="250"
                      >
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
