import React, { useState } from 'react'
import {
    Container, Row, Col,
    // Card, ListGroup,
    // ListGroupItem,
    // Button, FormSelect
} from "shards-react";
import axios from 'axios';
// import DatePicker, { DateObject } from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_en from "react-date-object/locales/persian_en";
import { TankhahReportListExpense } from './TankhahReportListExpense';
import swal from 'sweetalert';
import { FilterReport } from './FilterReport';
import { Spinner } from 'react-bootstrap';

export const MororListHaineha = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isVisible,setIsVisible]=useState(false);
    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    // const [tankhahItems, setTankhahItems] = useState([]);
    // const [state, setState] = useState(new DateObject({ calendar: persian, locale: persian_en }));
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    // const [user] = useState(JSON.parse(sessionStorage.getItem("LoginTocken")));
    // const calendarRef = useRef();
    const [items, setItems] = useState([]);
    // const [salId, setSalId] = useState()
    // const [tankhahId, setTankhahId] = useState();
    // const [mandeKhat, setMandeKhat] = useState(false);
    // const [mohitItems, setMohitItems] = useState([]);
    // const [salMali, setSalMali] = useState([]);
    // const [mohitId, setMohitId] = useState();
    // const [salMaliItems, setSalMaliItems] = useState([]);

    // useEffect(() => {
    //     GetAllMohit();
    //     //GetCurrentFinanceYear();
    // }, []);

    // const convertFrom = (date, format = state.format) => {
    //     let object = { date, format }
    //     setState(new DateObject(object).convert(persian, persian_en).format());
    //     setDateFrom(new DateObject(object).convert(persian, persian_en).format());
    // }

    // const convertTo = (date, format = state.format) => {
    //     let object = { date, format }
    //     setState(new DateObject(object).convert(persian, persian_en).format());
    //     setDateTo(new DateObject(object).convert(persian, persian_en).format());
    // }
    // const GetCurrentFinanceYear = () => {
    //     axios(
    //         {
    //             url: serverAdress + "GetFinanceYearById?salMali=" + parseInt(sessionStorage.getItem("SalMali")),
    //             method: "get",
    //             headers:
    //             {
    //                 Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
    //                 // 'Cache-Control': 'no-cache',
    //                 // 'Pragma': 'no-cache',
    //                 // 'Expires': '0',
    //             }
    //         }).then(function (response) {
    //             if (response.data != null) {
    //                 setDateFrom(response.data.salStart);
    //                 setDateTo(response.data.salEnd);
    //                 setSalId(response.data.salId);
    //             }

    //         }).catch(function (error) {
    //             // handle error
    //             //     console.log("axois error: ");
    //             //     console.log(error);
    //             //     alert(error);
    //             swal("error", error.message, "error");
    //         })
    // }


    // const changeTankhah = (tankhahId) => {
    //     setTankhahId(tankhahId);
    // }

    // const getAllTankhahMoror = (e) => {
    //     e.preventDefault();

    //     axios(
    //         {
    //             url: serverAdress + "GetListHazineha",
    //             method: "get",
    //             headers:
    //             {
    //                 Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
    //                 // 'Content-Type': 'application/json',
    //                 // "Content-Type": "multipart/form-data"
    //                 // 'Cache-Control': 'no-cache',
    //                 // 'Pragma': 'no-cache',
    //                 // 'Expires': '0',
    //             },
    //             params:
    //             {
    //                 "fromDate": dateFrom,
    //                 "toDate": dateTo,
    //                 "salId": salId,
    //                 "tankhahId": tankhahId,
    //                 "showMande": false

    //             }
    //         }).then(function (response) {
    //             // console.log("'chva ....")
    //             // console.log(response)
    //             const resultItems = response.data;
    //             setItems([]);
    //             resultItems.map((item) => {
    //                 setItems(items => [...items, { total: item.total, shomare: item.shomare, proname: item.proname, sharh: item.sharh, TankhahId: item.TankhahId, proname: item.proname, tankhah: item.tankhah, tarikh: item.tarikh }])
    //             });

    //         }).catch(function (error) {
    //             // handle error
    //             // console.log("axois error: ");
    //             // console.log(error);
    //             // alert(error);
    //             swal("error", error.message, "error");
    //         })

    // }

    // const GetAllMohit = () => {
    //     console.log("user....");
    //     console.log(user);
    //     console.log(localStorage.getItem("access-tocken"));

    //     axios(
    //         {
    //             url: serverAdress + `GetAllMohit?userId=${user.UserId}`,
    //             method: "get",
    //             headers:
    //             {
    //                 Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
    //                 'Cache-Control': 'no-cache',
    //                 'Pragma': 'no-cache',
    //                 'Expires': '0',
    //             }
    //         }).then(function (response) {

    //             console.log("get all mohit ....")
    //             const resultItems = response.data;
    //             console.log(resultItems);
    //             resultItems.map(data => {
    //                 setMohitItems(mohitItems => [...mohitItems, { MohitId: data.mohitID, MohitOnvan: data.mohitOnvan }]);
    //             });

    //         }).catch(function (error) {
    //             swal("error", error.message, "error");
    //         })



    // }

    // const GetAllSalMali = (mohitId) => {
    //     axios(
    //         {
    //             url: serverAdress + `GetAllSalMali?mohitId=${mohitId}`,
    //             method: "get",
    //             headers:
    //             {
    //                 Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
    //                 'Cache-Control': 'no-cache',
    //                 'Pragma': 'no-cache',
    //                 'Expires': '0',
    //             }
    //         }).then(function (response) {

    //             console.log("get all sal mali ....")
    //             const resultItems = response.data;
    //             resultItems.map(data => {
    //                 setSalMaliItems(salMaliItems => [...salMaliItems, { SalId: data.salId, SalMali: data.salMali }]);
    //             });

    //         }).catch(function (error) {
    //             swal("error", error.message, "error");
    //         })
    // }

    // const GetAllTankhah = (salId) => {

    //     console.log(mohitId)
    //     console.log(user.UserId)
    //     console.log(salId)
    //     axios(
    //         {
    //             url: serverAdress + `GetAllTankhah?mohitId=${mohitId}&userId=${user.UserId}&salId=${salId}`,
    //             method: "get",
    //             headers:
    //             {
    //                 Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
    //                 'Cache-Control': 'no-cache',
    //                 'Pragma': 'no-cache',
    //                 'Expires': '0',
    //             }
    //         }).then(function (response) {

    //             const resultItems = response.data;
    //             resultItems.map(data => {
    //                 setTankhahItems(tankhahItems => [...tankhahItems, { tankhah_name: data.tankhah_name, tankhah_ID: data.tankhah_ID }]);
    //             });

    //         }).catch(function (error) {
    //             swal("error", error.message, "error");
    //         })
    // }

    // const changeMohit = (mohitId) => {
    //     console.log("change mohit ...")
    //     setMohitId(mohitId);
    //     GetAllSalMali(mohitId);
    // }

    // const changeSalMali = (salId) => {
    //     console.log("change sal mali");
    //     setSalMali(salId);
    //     GetAllTankhah(salId)
    // }


    const getAllReports = (dateFrom, dateTo, salId, tankhahId, mandeKhat) => {

        setIsLoading(true);
        
        console.log("clicked ...........");
        console.log(dateFrom);
        console.log(dateTo);
        console.log(salId);
        console.log(tankhahId);
        console.log(mandeKhat);
        setDateFrom(dateFrom);
        setDateTo(dateTo);


        axios(
            {
                url: serverAdress + "GetListHazineha",
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
                    "fromDate": dateFrom,
                    "toDate": dateTo,
                    "salId": salId,
                    "tankhahId": tankhahId,
                    "showMande": false
                }
            }).then(function (response) {
                // console.log("'chva ....")
                // console.log(response)
                const resultItems = response.data;
                setItems([]);

                resultItems.map((item) => {
                    setItems(items => [...items, { total: item.total, shomare: item.shomare, proname: item.proname, sharh: item.sharh, TankhahId: item.TankhahId, proname: item.proname, tankhah: item.tankhah, tarikh: item.tarikh }])
                });


                setIsVisible(true);
                window.setTimeout(() => {
                    setIsLoading(false);
                }, 2000)


            }).catch(function (error) {
                // handle error
                // console.log("axois error: ");
                // console.log(error);
                // alert(error);
                swal("error", error.message, "error");
                setIsLoading(false);
            })



    }

    return (
        <Container fluid className="main-content-container px-4">
            <Row className="page-header mt-2 ">
                <Col lg="12" >
                    <nav className="breadcrumb">
                        <a className="breadcrumb-item" href="/home">خانه</a>
                        <span className="breadcrumb-item active">گزارش مرور - لیست صورت هزینه ها</span>
                    </nav>
                </Col>

                <Col lg="12" >
                   <FilterReport getAllReports={getAllReports}  ></FilterReport>
                    {
                        isVisible?
                        isLoading == true ? <div className="text-center" style={{ paddingTop: "50px", margin: "auto", width: "50%" }} >
                            <Spinner animation="grow" size="sm" variant="primary" />
                            <Spinner animation="grow" variant="primary" />
                            <div className='text-primary text-center' dir="rtl">در حال بارگزاری...</div>
                        </div> :
                            <TankhahReportListExpense resultItems={items} dateFrom={dateFrom} dateTo={dateTo}></TankhahReportListExpense>
                    :''
                        }
                </Col>
            </Row>

        </Container>
    )
}
