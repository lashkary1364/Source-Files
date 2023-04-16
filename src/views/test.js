import React, { useMemo, useCallback, useRef, useState, useEffect } from "react";
import { setNestedObjectValues, useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Container, Row, Col, Card, CardHeader, ListGroup,
  ListGroupItem, FormInput,
  Button,
} from "shards-react";

import { AgGridReact } from 'ag-grid-react';
import CellRenderer from './CellRender';
import DetailTest from "./DetailTest";
import DeleteTest from "./DeleteTest";
import { AG_GRID_LOCALE_FA } from '../constants/global'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../../src/login/css/fontiran.css'
import '../assets/ag-grid.css'
// import { TestList } from "./TestList";


const Test = () => {

  //   const [rowData] = useState([

  //     {make: "Toyota", model: "Celica", price: 35000},
  //     {make: "Ford", model: "Mondeo", price: 32000},
  //     {make: "Porsche", model: "Boxster", price: 72000}
  // ]);

  // const gridRef = useRef();
  // const [rowData, setRowData] = useState();
  // const [columnDefs] = useState([
  //   {
  //     field: 'make', filter: 'agTextColumnFilter', headerName: 'Gold', headerCheckboxSelection: true,
  //     checkboxSelection: true,
  //     showDisabledCheckboxes: true,
  //   },
  //   { field: 'model', filter: 'agTextColumnFilter', },
  //   { field: 'price', filter: 'agNumberColumnFilter', },

  //   { field: 'Detail', headerName: 'جزییات', maxWidth: 80, resizable: false, cellRenderer: DetailTest, },
  //   { field: 'Edit', maxWidth: 80, headerName: 'ویرایش', cellRenderer: CellRenderer },
  //   { field: 'Delete', maxWidth: 80, headerName: 'حذف', cellRenderer: DeleteTest }

  // ])

  // const onSelectionChanged = useCallback(() => {
  //   const selectedRows = gridRef.current.api.getSelectedRows();
  //   console.log("selected:");
  //   console.log(selectedRows);
  //   // document.querySelector('#selectedRows').innerHTML =
  //   //   selectedRows.length === 1 ? selectedRows[0].athlete : '';
  // }, []);


  // const gridStyle = useMemo(() => ({ height: '500px', width: '100%', }), []);


  // useEffect(() => {
  //   fetch('https://www.ag-grid.com/example-assets/row-data.json')
  //     .then(result => result.json())
  //     .then(rowData => setRowData(rowData))
  // }, []);

  // // DefaultColDef sets props common to all Columns
  // const defaultColDef = useMemo(() => ({
  //   sortable: true,
  //   resizable: true,
  //   floatingFilter: true,
  //   wrapText: true,
  //   autoHeight: true,
  //   flex: 1,

  // }));


  // const paginationNumberFormatter = useCallback((params) => {
  //   return '[' + params.value.toLocaleString() + ']';
  // }, []);

  // const onPageSizeChanged = useCallback(() => {
  //   var value = document.getElementById('page-size').value;
  //   gridRef.current.api.paginationSetPageSize(Number(value));
  // }, []);

  
  const setValues = (data) => {
    console.log("make :");
    console.log(data.make);
  }

  const gridRef = useRef();
  const make=useRef();
  const [rowData, setRowData] = useState();
  const [columnDefs] = useState([
    {
      field: 'make', filter: 'agTextColumnFilter', headerName: 'Gold', headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    { field: 'model', filter: 'agTextColumnFilter', },
    { field: 'price', filter: 'agNumberColumnFilter', },

    {
      field: 'Detail', headerName: 'جزییات', maxWidth: 80, resizable: false, cellRenderer: DetailTest,
      cellRendererParams: {
        color: "jjjjjj"
      },
     
      
    },
    { field: 'Edit', maxWidth: 80, headerName: 'ویرایش', cellRenderer: CellRenderer },
    { field: 'Delete', maxWidth: 80, headerName: 'حذف', cellRenderer: DeleteTest }

  ])

  const onSelectionChanged = useCallback(() => {
    // const selectedRows = gridRef.current.api.getSelectedRows();
    // console.log("selected:");
    // console.log(selectedRows);
    // document.querySelector('#selectedRows').innerHTML =
    //   selectedRows.length === 1 ? selectedRows[0].athlete : '';
  }, []);


  const gridStyle = useMemo(() => ({ height: '500px', width: '100%', }), []);


  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then(result => result.json())
      .then(rowData => setRowData(rowData))
  }, []);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    floatingFilter: true,
    wrapText: true,
    autoHeight: true,
    flex: 1,

  }));


  const paginationNumberFormatter = useCallback((params) => {
    return '[' + params.value.toLocaleString() + ']';
  }, []);

  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById('page-size').value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

  const onQuickFilterChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('quickFilter').value
    );
  }, []);


  const onCellClicked = (params: CellClickedEvent) => {
    console.log('Cell was clicked');
    console.log(params.data);
  //make.current.value=params.data.make;
  formik.setFieldValue('title',params.data.make);
    
  }
  

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('فیلد نام کاربری اجباری است'),
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
      title: '',
      //password: '',
      //email: '',
      //password: '',
      // confirmPassword: '',
      // acceptTerms: false,
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
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

  //formik.setFieldValue('title','hjjhjhjh');
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header mt-2 ">
        {/* <PageTitle title="تحصیلات" md="12" className="ml-sm-auto mr-sm-auto " /> */}
        <nav className="breadcrumb">
          <a className="breadcrumb-item" href="#">خانه</a>
          {/*<a class="breadcrumb-item" href="#">Profile</a>
             <a class="breadcrumb-item" href="#">Data</a> */}
          <span className="breadcrumb-item active">تحصیلات</span>
        </nav>
      </Row>

      <Row>

        <Col lg="12" >
          <Card small className="mb-2">
            <CardHeader className="border-bottom">
              <h6 className="m-0">ثبت تحصیلات</h6>
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem className="p-3">
                <Row>
                  <Col>
                    <form onSubmit={formik.handleSubmit}>
                      <Row>
                        <Col md="6" className="form-group">
                          <label htmlFor="title">عنوان</label>
                          {/* <input type="text" name="title" id="title" className={'form-control' + (formik.errors.title && formik.touched.title  ? ' is-invalid': '') }
                                 onChange={formik.handleChange} value={formik.values.title} placeholder="عنوان" ></input>
                        */}

                          <FormInput type="text" name="title" id="title" className={'form-control' + (formik.errors.title && formik.touched.title ? ' is-invalid' : '')}
                            onChange={formik.handleChange} value={formik.values.title} placeholder="عنوان"  ref={make} />

                          <div className="invalid-feedback">
                            {
                              formik.errors.title && formik.touched.title
                                ? formik.errors.title
                                : null
                            }
                          </div>
                        </Col>
                      </Row>
                      <Button type="submit">ذخیره</Button>
                    </form>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>


          <Card small className="mb-2">
            <CardHeader className="border-bottom">
              <h6 className="m-0">لیست تحصیلات</h6>
            </CardHeader>
            <div className="container-fluid">
              <div className="ag-theme-alpine mb-10" style={gridStyle}>
                <div className="example-wrapper">
                  <div className="form-inline m-2">
                    <span className="mr-3">سایز صفحه</span>
                    <select className="form-contro mr-5" onChange={onPageSizeChanged} id="page-size">
                      <option value="10" selected={true}>
                        10
                      </option>
                      <option value="100">100</option>
                      <option value="500">500</option>
                      <option value="1000">1000</option>
                    </select>
                    <input
                      type="text"
                      className="form-control mr-5"
                      onInput={onQuickFilterChanged}
                      id="quickFilter"
                      placeholder="جستجو..."
                    />
                  </div>
                </div>

                <AgGridReact direction="rtl" style={{ fontFamily: "IRANSans", height: '90%' }}
                  ref={gridRef}
                  rowSelection="multiple"
                  rowData={rowData} // Row Data for Rows
                  defaultColDef={defaultColDef}
                  enableRtl="true"
                  columnDefs={columnDefs}
                  localeText={AG_GRID_LOCALE_FA}
                  pivotPanelShow={'always'}
                  pagination={true}
                  paginationPageSize={10}
                  paginationNumberFormatter={paginationNumberFormatter}
                  alwaysShowBothConditions={true}
                  caseSensitive={false}
                  checkboxSelection={true}
                  animateRows={true}
                  onSelectionChanged={onSelectionChanged}
                  onCellClicked={onCellClicked}
                 
                >
                </AgGridReact>
              </div>


            </div>
          </Card>



        </Col>



      </Row>


    </Container>

  );


}


export default Test;