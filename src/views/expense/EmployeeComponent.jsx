// import React, { useState } from "react";
// import DatePicker from "react-multi-date-picker";
// import { useForm, Controller } from "react-hook-form";


// export const EmployeeComponent=()=> {
//   const { control, handleSubmit } = useForm();
//   const [submittedDate, setSubmittedDate] = useState();

//   const onSubmit = ({ date }) => {
//    // setSubmittedDate(date);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Controller
//           control={control}
//           name="date"
//           rules={{ required: true }} //optional
//           render={({
//             field: { onChange, name, value },
//             //fieldState: { invalid, isDirty }, //optional
//             formState: { errors }, //optional, but necessary if you want to show an error message
//           }) => (
//             <>
//               <DatePicker
//                 value={value || ""}
//                 onChange={(date) => {
//                   onChange(date?.isValid ? date : "");
//                 }}
//                 format={"YYYY/MM/DD"}
//               />
//               {errors && errors[name] && errors[name].type === "required" && (
//                 //if you want to show an error message
//                 <span>your error message !</span>
//               )}
//             </>
//           )}
//         />
//         <input type="submit" />
//       </form>
//       <p>Submitted Date:  {submittedDate?.format?.("MMMM D YYYY")}</p>
//     </>
//   )
// }


//////////////////////////////////////////////////////////////////////////////////////////////////

//import libraries
// import React from 'react'
// import { render } from 'react-dom';
// import { Formik, Form } from 'formik'
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css";


//Class component
// export class EmployeeComponent extends React.Component {
//   render() {
//     return (
//       <div id="main-content">
//         <Formik
//           initialValues={{ startDate: new Date() }}
//           validate={(props, a) => console.log('a',props, a)}
//           onSubmit={(values, { setSubmitting }) => {
//             setTimeout(() => {
//               alert(JSON.stringify(values, null, 2));
//               setSubmitting(false);
//             }, 400);
//           }}

//         >
//           {({ isSubmitting, values, setFieldValue }) => (
//             <div className="row clearfix">
//               <div className="header">
//               </div>
//               <Form>
//                 <div className="row ml-4 mr-4">
//                   <div className="form-group col-3 mb-2">
//                     <DatePicker 
//                       selected={values.startDate}
//                       dateFormat="MMMM d, yyyy"
//                       className="form-control"
//                       name="startDate"
//                       onChange={date => setFieldValue('startDate', date)}
//                     />
//                   </div>

//                 </div>
//                 <div className="row mb-3">
//                   <div className="col-5 mb-4"></div>
//                   <button type="submit" className="btn btn-lg btn-outline-success mt-4 mb-4" disabled={isSubmitting}>insert item</button>
//                 </div>
//               </Form>
//             </div>
//           )}
//         </Formik>
//       </div>
//     )
//   }
// }


/////////////////////////////////////////////////////////////////////////////////////////////////

// import React from "react";
// import DatePicker from "react-datepicker";
// import { useFormik } from "formik";

// export const EmployeeComponent=()=> {
//   const formik = useFormik({
//     initialValues: {
//         departureTime: Date.now(),
//     },
//     //validate,
//     onSubmit: values => {
//         alert(JSON.stringify(values, null, 2));
//     },
// });
//   return (
//   <div>
//     <DatePicker
// 		label="Departure Date"
//         id="departureDate"
//         name="departureDate"
//         value={formik.values.departureDate}
//         onChange={(value) => {
//         		formik.setFieldValue('departureDate', Date.parse(value));
//         		}}
// 	//	renderInput={(params) => <TextField {...params} />}
// />
//     </div>
//   );

// }



