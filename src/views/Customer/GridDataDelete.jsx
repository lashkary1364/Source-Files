import React , {useState} from 'react'
import { Button } from "shards-react";
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash } from "@fortawesome/fontawesome-free-solid";
import { Link } from 'react-router-dom';

export const GridDataDelete = (props) => {
    
    const [parameters,setParameters]=useState({OperationType:"delete" , data:props.data})      
  
    console.log(props);

    return (
    <div>       
  
        <Button size="sm" theme="danger" className="mb-2 mr-1" title="حذف" onClick={event => props.handleClick(parameters)} >  
        <FontAwesomeIcon icon={faTrash} />
        </Button> 

        {/* // <Link   size="sm" theme="danger" className="mb-2 mr-1" title="حذف" to={props.path+"id="+props.soratID} >  
        // <FontAwesomeIcon icon={faTrash} />
        // </Link> */}

    </div>)
}
