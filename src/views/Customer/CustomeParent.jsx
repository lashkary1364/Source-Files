import React, { useState } from 'react'
import { Customer } from './Customer'
import { CustomerList } from './CustomerList'
import CustomerContext from './CustomeContexct'
import {
    Container
} from "shards-react";




export const CustomeParent = () => {      
   
    const [crudOperation, setcrudOperation] = useState({OperationType:"add" , data:{make:"", model:"" , price:""}});
    
    const handleClick = (crudOperationType) => {
      // 👇️ take the parameter passed from the Child component
      setcrudOperation(crudOperationType);     
    };

    return (
        <>
            {/* <CustomerContext.Provider value={{ StateCrud:"add"}}> */}
                <Container fluid className="main-content-container px-4">                    
                    <Customer dataParentToChild = {crudOperation} ></Customer> 
                    <CustomerList handleClick={handleClick}></CustomerList>
                    {/* <div>count : {count}</div> */}
                </Container>
            {/* </CustomerContext.Provider> */}
        </>
    )
}
