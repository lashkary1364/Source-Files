// import React from "react"
// import DatePicker from "react-multi-date-picker"
// import persian from "react-date-object/calendars/persian"
// import persian_en from "react-date-object/locales/persian_fa"

// export const Picker = () => {
//   return (
//     <DatePicker
//     calendar={persian}
//     locale={persian_en}
//     calendarPosition="bottom-right"
//   />
//   )
// }


import React from "react"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_en from "react-date-object/locales/persian_en"

export  function Picker() {
  return (
    <DatePicker
      calendar={persian}
      locale={persian_en}
      calendarPosition="bottom-right"
    />
  )
}