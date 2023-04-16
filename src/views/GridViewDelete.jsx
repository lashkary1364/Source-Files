import React , {useState} from 'react'
import { Button } from "shards-react";
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash } from "@fortawesome/fontawesome-free-solid"
import { Link } from 'react-router-dom';

export const GridViewDelete = (props) => {
    const [parameters,setParameters]=useState({OperationType:"delete" , data:props.data})      
    

    return (
    <div>       
  
        <Link size="sm" theme="danger" className="mb-2 mr-1" title="حذف" to={props.path+"?id="+props.data.soratID+"&operation=delete"}   style={{color:"red"}}  >  
        <FontAwesomeIcon icon={faTrash} />
        </Link>

    </div>)
}
