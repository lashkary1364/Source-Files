import React, { useState } from 'react'
import {
    Container, Row, Col,
} from "shards-react";
import axios from 'axios';
import { TankhahReportListExpense } from './TankhahReportListExpense';
import swal from 'sweetalert';
import { FilterReport } from './FilterReport';
import { Spinner } from 'react-bootstrap';

export const MororListHaineha = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isVisible,setIsVisible]=useState(false);
    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [items, setItems] = useState([]);
    

    const getAllReports = (dateFrom, dateTo, salId, tankhahId, mandeKhat) => {

        setIsLoading(true);   
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
