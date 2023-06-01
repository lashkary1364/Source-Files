import React from 'react'
import { Preview, print } from 'react-html2pdf';
export const Htm2PDF = () => {
  return (
    <div>
    <Preview id={'jsx-template'} >
       <p>شبنم لشمری باویل علیایی</p>
   </Preview>
   <button onClick={()=>print('a', 'jsx-template')}> print</button>
       </div>
  )
}
