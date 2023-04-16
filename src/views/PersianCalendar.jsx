
import React ,{ useState }  from 'react'
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"


export const PersianCalendar = ({handleChangeDate}) => {
  


  return (
  
    <div    style={{ direction: "rtl"  }} >
        <DatePicker
        // style={{
        //   direction: "rtl",
        //   height: "auto",
        //   padding: "0.4375rem 0.75rem",
        //   fontSize: "0.8125rem",
        //   lineHeight: "1.5",
        //   color: "#495057",
        //   border: "1px solid #e1e5eb",
        //   fontWeight: "300",
        //   borderRadius: "0.25rem",
        //   boxShadow: "none",
        //   width: "100%",
        //   transition: "box-shadow 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06), border 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06)"
        // }}
           format={"YYYY/MM/DD"}
           onChange={(date)=>handleChangeDate(date)}  
           inputClass='form-control'         
          // onChange={(date) => 
          //   console.log("datetime: " + date.format("YYYY/MM/DD"))} 
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
      /> 
                          
    </div>
  )
}
