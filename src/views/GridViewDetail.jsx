
import React , {useState} from 'react'
import { Button } from "shards-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Component, ServerSideTransactionResultStatus } from 'ag-grid-community';
import { Link } from 'react-router-dom';



export const GridViewDetail = (props) => {
    const [parameters,setParameters]=useState({OperationType:"detail" , data:props.data})

    return (

      // <div>
      //   <Link size="sm" theme="success" className="mb-2 mr-1" title="جزئیات" to={props.path+"?id="+props.data.soratID}    >
      //   <FontAwesomeIcon icon="fa-solid fa-cart-plus" />
      //   </Link>             
      // </div>
<div className="btn-group" role="group" aria-label="Button group with nested dropdown">
   <div className="btn-group" role="group">
    <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
  عملیات
    </button>
    <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
      <li><a className="dropdown-item" href="#">Dropdown link</a></li>
      <li><a className="dropdown-item" href="#">Dropdown link</a></li>
    </ul>
  </div>
</div>
    
      
      )
}
