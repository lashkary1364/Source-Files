import React, { useState, useEffect, useRef } from 'react'
import {
    Container, Row, Col, Card, ListGroup,
    ListGroupItem,
    Button, FormSelect
} from "shards-react";
import axios from 'axios';
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import swal from 'sweetalert';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";


export const FilterSoratHazine = ({ getAllReports  }) => {


    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    const [state, setState] = useState(new DateObject({ calendar: persian, locale: persian_fa }));
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const user = JSON.parse(sessionStorage.getItem("LoginTocken"));
    const calendarRef = useRef();
    const tozihatRef = useRef();
    const mohitId = sessionStorage.getItem("mohitId");
    const [projectItems, setProjectItems] = useState([]);
    const [projectId, setProjectId] = useState(null);
    const [soratHazineState, setSoratHazineState] = useState(2);
    const [order, setOrder] = useState(1);
    const salId = sessionStorage.getItem("salId");
    const [sanadState, setSanadState] = useState(0);
    const [values, setValues] = React.useState([]);
    const [options, setOptions] = useState([]);
    const [mohitName, setMohitName] = useState("");
    const [parameter,setParameter]=useState({MohitName:"" , FromDate:"" , ToDate:""});




    useEffect(() => {
        getAllProjects();
        GetAllSoratHazineSharh();
       
    }, []);

    const convertFrom = (date, format = state.format) => {
        let object = { date, format }
        setState(new DateObject(object).convert(persian, persian_en).format());
        console.log(new DateObject(object).convert(persian, persian_en).format("YYYY"));
        // setYearFrom(new DateObject(object).convert(persian, persian_en).format("YYYY"));
        setDateFrom(new DateObject(object).convert(persian, persian_en).format());
    }

    const convertTo = (date, format = state.format) => {
        let object = { date, format }
        setState(new DateObject(object).convert(persian, persian_en).format());
        // setYearTo(new DateObject(object).convert(persian, persian_en).format("YYYY"));
        setDateTo(new DateObject(object).convert(persian, persian_en).format());
    }

   

    const getAllProjects = () => {
        axios(
            {
                url: serverAdress + `tankhah_GetAllProjects?mohitId=${mohitId}`,
                method: "get",
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            }).then(function (response) {

                console.log("get all project ....")
                const resultItems = response.data;
                console.log(resultItems);
                resultItems.map(data => {
                    setProjectItems(projectItems => [...projectItems, { ProjectId: data.projectID, ProjectName: data.projectName }]);
                });


                console.log("project items ...");
                console.log(projectItems);


            }).catch(function (error) {
                swal("error", error.message, "error");
            });

    }

    useEffect(() => {
        console.log("project items ...");
        console.log(projectItems);
    }, [projectItems])


    const getAllReport = (e) => {

        e.preventDefault();

        console.log(parseInt(user.userId));
        console.log(values.name);

        if (salId == undefined || mohitId == undefined) {
            swal("توجه", "وارد کردن محیط کاربری و سال مالی الزامی است", "warning");
            return;
        }

        parameter.FromDate=dateFrom;
        parameter.ToDate=dateTo;

        var data = {
            "MohitId": parseInt(mohitId),
            "SalId": parseInt(salId),
            "UserId": parseInt(user.userId),
            "FromDate": dateFrom,
            "ToDate": dateTo,
            "ProjectId": parseInt(projectId),
            "SoratHazineState": parseInt(soratHazineState),
            "Sharh": values.name,
            "SanadState": parseInt(sanadState),  //sanadState,
            "Tozihat": tozihatRef.current.value,
            "Orederd": parseInt(order), //order ,
            "MohitName":mohitName
        }
     
        getAllReports(data);
    }






    const changeProject = (event) => {
        console.log(event.target.value);
        setProjectId(event.target.value);
    }

    const changesoratHazineState = (e) => {
        setSoratHazineState(e.target.value);
    }

    const changeOrder = (e) => {
        setOrder(e.target.value);
    }

    const changeSanad = (e) => {
        setSanadState(e.target.value);
    }

    const onChange = (_, a) => {
        setValues(a);
    };

    const GetAllSoratHazineSharh = () => {

        axios(
            {
                url: serverAdress + `GetAllSouratHazineSharh?mohitId=${mohitId}`,
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
                resultItems.map(data => {
                    setOptions(options => [...options,
                    {
                        codeHesab: data.code_Hesab,
                        value: data.item_ID,
                        name: data.item_Title_text,
                        markaz1: data.markaz1,
                        markaz2: data.markaz2,
                        markaz3: data.markaz3
                    }]);

                });

            }).catch(function (error) {
               swal("error", error.message, "error");
            })

    }

    return (
        <Card small className="mb-2">
            <ListGroup flush>
                <ListGroupItem >
                    <form>
                        <Row>
                            <Col md="4" className="form-group">
                                <div className="form-inline mt-3 mr-3">
                                    <label style={{ width: "30%" }} htmlFor="project">انتخاب پروژه :</label>
                                    <FormSelect id="project" style={{ width: "70%" }} name="project" onChange={(e) => changeProject(e)} className='form-control'>
                                        <option value={""}>یک موردانتخاب کنید</option>
                                        {
                                            projectItems.map((item, index) => (
                                                <option key={index}
                                                    value={item.ProjectId}>
                                                    {item.ProjectName}
                                                </option>
                                            ))
                                        }
                                    </FormSelect>
                                </div>
                            </Col>

                            <Col md="4" className="form-group">
                                <div className="form-inline mt-3 mr-3">
                                    <label htmlFor="project" style={{ width: "30%" }}> وضعیت صورت هزینه :</label>
                                    <FormSelect style={{ width: "70%" }} id="project" name="project" onChange={(e) => changesoratHazineState(e)} className='form-control'>
                                        <option value="2" >
                                            همه
                                        </option>
                                        <option value="0" >
                                            بررسی نشده
                                        </option>
                                        <option value="1" >
                                            تایید شده
                                        </option>
                                        <option value="-1" >
                                            تایید نشده
                                        </option>
                                    </FormSelect>
                                </div>
                            </Col>
                            <Col md="4" className="form-group">
                                <div className="form-inline mt-3 mr-3">
                                    <label htmlFor="sanad" style={{ width: "30%" }}> وضعیت سند :</label>
                                    <FormSelect id="sanadId" style={{ width: "70%" }} name="sanadId" onChange={(e) => changeSanad(e)} className='form-control'>
                                        <option value="0">
                                            همه
                                        </option>
                                        <option value="1">
                                            دارای سند حسابداری
                                        </option>
                                        <option value="2">
                                            بدون سند حسابداری
                                        </option>
                                    </FormSelect>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4" className="form-group mt-3">
                                <div className="form-inline mr-3">
                                    <label htmlFor="mande"  > از تاریخ :</label>
                                    <DatePicker inputClass='form-control  ml-3'
                                        ref={calendarRef}
                                        calendar={persian}
                                        locale={persian_fa}
                                        format={"YYYY/MM/DD"}
                                        value={dateFrom}
                                        onChange={convertFrom}
                                        id="tarikh" name="tarikh"
                                        calendarPosition="bottom-right"
                                    />
                                </div>
                            </Col>

                            <Col md="4" className="form-group mt-3" >
                                <div className="form-inline  mr-3">
                                    <label htmlFor="etebarMax">تا تاریخ:</label>
                                    <DatePicker inputClass='form-control ml-3'
                                        ref={calendarRef}
                                        calendar={persian}
                                        locale={persian_fa}
                                        format={"YYYY/MM/DD"}
                                        value={dateTo}
                                        onChange={convertTo}
                                        id="tarikh" name="tarikh"
                                        calendarPosition="bottom-right"
                                    />
                                </div>
                            </Col>
                            <Col md="4" className="form-group">
                                <div className="form-inline mt-3 mr-3">
                                    <label htmlFor="mande" style={{ width: "30%" }} > مرتب سازی بر اساس  :</label>
                                    <FormSelect id="project" name="project" onChange={(e) => changeOrder(e)} className='form-control' style={{ width: "70%" }}>
                                        <option value="1">
                                            شماره - صعودی
                                        </option>
                                        <option value="2">
                                            شماره - نزولی
                                        </option>
                                        <option value="3">
                                            تاریخ - صعودی
                                        </option>
                                        <option value="4">
                                            تاریخ - نزولی
                                        </option>
                                    </FormSelect>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4" className="form-group">
                                <div className="form-inline mt-3 mr-3">
                                    <label htmlFor="mande" style={{ width: "30%" }} > توضیحات :</label>
                                    <textarea type="text" className="form-control" ref={tozihatRef} style={{ width: "70%" }} rows="2" cols="50"></textarea>
                                </div>
                            </Col>
                            <Col md="4" className="form-group">
                                <div className="form-inline mt-3 mr-3">
                                    <label htmlFor="sharhDetail" style={{ width: "30%" }}>شرح *:</label>
                                    <Autocomplete style={{ width: "70%" }}
                                        id="tags-outlined"
                                        options={options}
                                        getOptionLabel={(option) => option.name || ""}
                                        className='form-control'
                                        value={values}
                                        getOptionSelected={(option, value) => option.name === value.name}
                                        onChange={onChange}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                            <TextField {...params} variant="outlined" placeholder="شرح" />
                                        )}
                                    />
                                </div>
                            </Col>
                            <Col md="4" className="form-group">
                                <Button theme="primary" className="mt-10 mr-1" type="submit" onClick={(e) => { getAllReport(e) }} style={{ marginTop: "30px" }}>
                                    <span className='form-inline'>
                                        گزارش
                                    </span>
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </ListGroupItem>
            </ListGroup>
        </Card>
    )
}
