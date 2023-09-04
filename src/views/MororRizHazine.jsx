import React, { useState, useEffect, useRef } from 'react'
import {
    Container, Row, Col,
} from "shards-react";
import axios from 'axios';
import { TankhahReportListHazineha } from './TankhahReportListHazineha';
import swal from 'sweetalert';
import { Spinner } from 'react-bootstrap';
import { FilterSoratHazine } from "./FilterSoratHazine";


export const MororRizHazine = () => {

    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [reportItems, setReportItems] = useState([]);
    const [reportRizItems, setReportRizItems] = useState([]);
    const [sumTaeedShode, setSumTaeedShode] = useState(0);
    const [sumTaeedNaShode, setSumTaeedNaShode] = useState(0);
    const [sumTotal, setSumTotal] = useState(0);
    const [sumMablagh, setSumMablagh] = useState(0);
    const [data, setData] = useState();




    const getAllReports = (data) => {

       
        setData(data);
        setReportItems([]);
        setReportRizItems([]);
        setIsLoading(true);




        
        axios(
            {
                url: serverAdress + `GetAllReportSoratHazine`,
                method: "post",
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
                    // 'Cache-Control': 'no-cache',
                    // 'Pragma': 'no-cache',
                    // 'Expires': '0',
                },
                data: data,
            }).then(function (response) {
               
                const resultItems = response.data;
                var sumTaeedShode = 0;
                var sumTaeedNashode = 0;
                var sumTotal = 0;
                setReportItems([]);
                var detailItems = [];
                resultItems.map(data => (
                    detailItems = [],
                    data.details.map(i =>
                        detailItems.push({
                            Mablagh: i.mablagh,
                            Ok: i.ok,
                            OkStr: i.okStr,
                            Sharh: i.sharh,
                            ShomareBarge: i.shomareBarge,
                            ShomareSoratHazine: i.shomareSoratHazine,
                            SoratID: i.soratID,
                            TankhahName: i.tankhahName,
                            TarikhPardakht: i.tarikhPardakht,
                            Tozihat: i.tozihat
                        })
                    ),
                 
                    sumTaeedShode += data.taeed_shode,
                    sumTaeedNashode += data.taeed_Nashode,
                    sumTotal += data.total,

                    setReportItems(reportItems => [...reportItems, {
                        TankhahName: data.tankhah_name,
                        Sharh: data.sharh, Shomare: data.shomare,
                        ShomareName: data.shomare_name, ShomareSanad: data.shomare_sanad, SoratID: data.soratID,
                        StrStatus: data.str_status, TaeedNashode: data.taeed_Nashode, ProjectName: data.projectName,
                        TaeedShode: data.taeed_shode,
                        Tarikh: data.tarikh, TarikhName: data.tarikh_name,
                        Total: data.total,
                        Details: detailItems

                    }])
                ));

                setSumTaeedNaShode(sumTaeedNashode);
                setSumTaeedShode(sumTaeedShode);
                setSumTotal(sumTotal);
                
            }).catch(function (error) {
                if(error.response.status==401){
                    window.location.replace('/');
                    return;
                  }
                  swal("خطای "+ error.response.status, error.response.data, "error");
                setIsLoading(false);
            })


        axios(
            {
                url: serverAdress + `GetAllReportRizSoratHazine`,
                method: "post",
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
                    // 'Cache-Control': 'no-cache',
                    // 'Pragma': 'no-cache',
                    // 'Expires': '0',
                },
                data: data,
            }).then(function (response) {

                console.log("GetAllReportRizSoratHazine....")
                console.log(response.data);
                const resultItems = response.data;
                var sumMablagh = 0;
                setReportRizItems([]);
                resultItems.map(data => (
                    sumMablagh += data.mablagh,
                    setReportRizItems(reportItems => [...reportItems, {
                        TankhahName: data.tankhahName,
                        ShomareSoratHazine: data.shomareSoratHazine,
                        ShomareBarge: data.shomareBarge,
                        TarikhPardakht: data.tarikhPardakht,
                        Sharh: data.sharh, Mablagh: data.mablagh,
                        Tozihat: data.tozihat, Ok: data.ok, OkStr: data.okStr,
                    }])

                ));
                setSumMablagh(sumMablagh);
                setIsVisible(true);

            }).catch(function (error) {
                if(error.response.status==401){
                    window.location.replace('/');
                    return;
                  }
                  swal("خطای "+ error.response.status, error.response.data, "error");
                setIsLoading(false);
            })

        window.setTimeout(() => {
            setIsLoading(false);
        }, 1000)


    }

    return (
        <Container fluid className="main-content-container px-4">
            <Row className="page-header mt-2 ">
                <Col lg="12" >
                    <nav className="breadcrumb">
                        <a className="breadcrumb-item" href="/home">خانه</a>
                        <span className="breadcrumb-item active">گزارش  لیست صورت هزینه ها</span>
                    </nav>
                </Col>
                <Col lg="12" >
                    <FilterSoratHazine getAllReports={getAllReports} ></FilterSoratHazine>
                    {isVisible ?
                        isLoading == true ? <div className="text-center" style={{ paddingTop: "50px", margin: "auto", width: "50%" }} >
                            <Spinner animation="grow" size="sm" variant="primary" />
                            <Spinner animation="grow" variant="primary" />
                            <div className='text-primary text-center' dir="rtl">در حال بارگزاری...</div>
                        </div> :
                            <TankhahReportListHazineha reportItems={reportItems} reportRizItems={reportRizItems} sumMablagh={sumMablagh} sumTotal={sumTotal} sumTaeedNashode={sumTaeedNaShode} sumTaeedShode={sumTaeedShode} data={data}></TankhahReportListHazineha>
                        : ''
                    }
                </Col>
            </Row>
        </Container>
    )
}
