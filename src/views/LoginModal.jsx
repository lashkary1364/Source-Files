import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import swal from 'sweetalert';
import axios from 'axios'
import { Button, FormSelect } from 'shards-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoadingBootstrap } from './LoadingBootstrap';
export const LoginModal = ({ userId, show, onClose }) => {

    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    const [mohitItems, setMohitItems] = useState([]);
    const [salMaliItems, setSalMaliItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        GetAllMohit();
        console.log("show");
        console.log(show);
    }, []);


    const GetAllMohit = () => {
        console.log("user....");
        console.log(userId);
        axios(
            {
                url: serverAdress + `GetAllMohit?userId=${userId}`,
                method: "get",
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            }).then(function (response) {

                setIsLoading(false);
                console.log("get all mohit ....")
                const resultItems = response.data;
                console.log(resultItems);
                setMohitItems([]);
                resultItems.map(data => {
                    setMohitItems(mohitItems => [...mohitItems, { MohitId: data.mohitID, MohitOnvan: data.mohitOnvan }]);
                });

            }).catch(function (error) {
                setIsLoading(false);
                if (error.response.status == 401) {
                    window.location.replace('/');
                    return;
                }
                console.log("error.response.status");
                console.log(error.response.status);
                console.log(error);
                swal("خطای " + error.response.status, error.response.data, "error");
            })
    }

    const changeMohit = (e) => {
        var index = e.nativeEvent.target.selectedIndex;
        formik.setFieldValue("mohit", e.target.value);
        console.log("change mohit ...")
        sessionStorage.setItem("mohitId", e.target.value);
        sessionStorage.setItem("mohitName", e.nativeEvent.target[index].text);
        GetAllSalMali(e.target.value);

    }

    const changeSalMali = (e) => {
        console.log("salMali");
        console.log(e.target.value);
        console.log("salMali");
        console.log(e.target.innerText);
        var index = e.nativeEvent.target.selectedIndex;
        sessionStorage.setItem("salMali", e.nativeEvent.target[index].text);
        formik.setFieldValue("salMali", e.target.value);
        sessionStorage.setItem("salId", e.target.value);
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
                setSalMaliItems([]);
                resultItems.map(data => {
                    setSalMaliItems(salMaliItems => [...salMaliItems, { SalId: data.salId, SalMali: data.salMali }]);
                });

            }).catch(function (error) {
                console.log("error");
                console.log(error);
                if (error.response.status == 401) {
                    window.location.replace('/');
                    return;
                }
                //   console.log(error.response.status);
                //   console.log(error.response.data);
                //   console.log(error.response);
                swal("خطای " + error.response.status, error.response.data, "error");
            })
    }

    const validationSchema = Yup.object().shape({
        mohit: Yup.string().required('فیلد اجباری'),
        salMali: Yup.string().required('فیلد اجباری'),
    });

    const formik = useFormik({
        initialValues:
        {
            mohit: '',
            salMali: '',
        },
        validationSchema,
        // validateOnChange: false,
        // validateOnBlur: false,
        onSubmit: (data) => {
            window.location.replace('/home');
        }
    });

    return (

        <Modal dir="rtl" centered
            show={show} onHide={onClose}
            backdrop="static"
            keyboard={false}>

            <Modal.Header closeButton>
                <Modal.Title>انتخاب محیط کاربری و سال مالی</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    isLoading == true ? <LoadingBootstrap></LoadingBootstrap> :
                        <form onSubmit={formik.handleSubmit}>
                            <div className='form-group'>
                                <label>انتخاب محیط کاربری</label>
                                <FormSelect id="mohit" name="mohit" onChange={(e) => changeMohit(e)} className={'form-control' + (formik.errors.mohit && formik.touched.mohit ? ' is-invalid' : '')}
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
                            </div>
                            <div className='form-group'>
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
                            </div>
                            <div className='form-inline'>
                                <Button variant="primary">تایید و ورود به سیستم</Button>
                                {/* <Button  variant="secondary" onClick={onClose}  className="ml-3">
                            بستن
                        </Button> */}

                            </div>
                        </form>
                }
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}
