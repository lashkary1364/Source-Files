import React , {useEffect} from 'react'
import { useState } from 'react';

export const TankhahMororInfo = (items) => {
    console.log("items");
    console.log(items);


    const [arrayItems,setArrayItems]=useState([]);

    useEffect(() => {
      setArrayItems([...arrayItems,items]);
      console.log(arrayItems)
    }, [])
    


  return (
    <table class="table table-bordered  table-hover">
    <thead>
      <tr class="table-secondary">
        <th scope="col">#</th>
        <th scope="col">شرح</th>
        <th scope="col">تاریخ</th>
        <th scope="col">بدهکار</th>
        <th scope="col">بستانکار</th>
        <th scope="col">مانده</th>
      </tr>
    </thead>
    <tbody>
     {
        
     }
    </tbody>
  </table>
  )
}
