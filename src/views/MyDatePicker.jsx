import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Formik, Form, useField } from "formik";
// Styles

import "react-datepicker/dist/react-datepicker.css";
const MyDatePicker=()=>{
 

  const[startDate,setStartDate]=useState();

  return (
    <DatePicker
    
      selected={startDate}
     
    />
 
  );
              }

export default MyDatePicker;